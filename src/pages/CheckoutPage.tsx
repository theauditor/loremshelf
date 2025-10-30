import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import {
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Truck,
  Shield,
  Minus,
  Plus,
  Trash2,
  Lock,
  X,
  BookOpen
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { books } from '../data/books'
import { parseERPNextError, ParsedError } from '../lib/erpnext-error-handler'

// Razorpay types
declare global {
  interface Window {
    Razorpay: any
  }
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation'

interface APIBook {
  name: string
  custom_slug: string
  custom_front_cover: string | null
}

interface APIResponse {
  data: APIBook[]
}

// Indian States for address validation
const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
]

export function CheckoutPage() {
  // Load saved data from localStorage on mount
  const [step, setStep] = useState<CheckoutStep>(() => {
    const savedStep = localStorage.getItem('loremshelf_checkout_step')
    return (savedStep as CheckoutStep) || 'cart'
  })
  
  const { state: cartState, updateQuantity, removeItem, clearCart } = useCart()
  const [bookCovers, setBookCovers] = useState<Record<string, string>>({})
  const [loadingCovers, setLoadingCovers] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showApiModal, setShowApiModal] = useState(false)
  const [apiResponses, setApiResponses] = useState<{
    customer: { success: boolean; data?: any; error?: ParsedError }
    address: { success: boolean; data?: any; error?: ParsedError }
  } | null>(null)
  const [orderData, setOrderData] = useState<{
    customerName: string
    customerId: string
    addressId: string
    salesOrderId?: string
    paymentId?: string
    deliveryDate?: string
    orderTotal?: number
    orderItems?: typeof cartItemsWithDetails
  } | null>(null)
  const [savedCustomerData, setSavedCustomerData] = useState<{
    customerName: string
    customerId: string
    addressId: string
  } | null>(() => {
    const saved = localStorage.getItem('loremshelf_customer_data')
    return saved ? JSON.parse(saved) : null
  })
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('loremshelf_form_data')
    return savedFormData ? JSON.parse(savedFormData) : {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    }
  })

  const shipping = 0 // Free shipping for all orders
  const subtotal = cartState.total
  const total = subtotal + shipping

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loremshelf_form_data', JSON.stringify(formData))
  }, [formData])

  // Save checkout step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loremshelf_checkout_step', step)
  }, [step])

  // Save customer data to localStorage whenever it changes
  useEffect(() => {
    if (savedCustomerData) {
      localStorage.setItem('loremshelf_customer_data', JSON.stringify(savedCustomerData))
    }
  }, [savedCustomerData])

  // Clear cart and saved data when order is confirmed
  useEffect(() => {
    if (step === 'confirmation') {
      clearCart()
      // Clear all saved checkout data from localStorage
      localStorage.removeItem('loremshelf_form_data')
      localStorage.removeItem('loremshelf_checkout_step')
      localStorage.removeItem('loremshelf_customer_data')
    }
  }, [step, clearCart])

  // Reset to cart step if cart is empty (but not on confirmation page)
  useEffect(() => {
    if (cartState.items.length === 0 && step !== 'cart' && step !== 'confirmation') {
      console.log('=== Cart is empty, resetting to cart step ===')
      setStep('cart')
      // Clear saved checkout progress
      localStorage.removeItem('loremshelf_checkout_step')
    }
  }, [cartState.items.length, step])

  // Prevent browser back button navigation during checkout process
  useEffect(() => {
    if (step === 'payment' || isSubmitting) {
      // Push a dummy state to prevent accidental back navigation
      const handlePopState = (e: PopStateEvent) => {
        if (isSubmitting) {
          console.log('=== Preventing navigation during payment processing ===')
          e.preventDefault()
          window.history.pushState(null, '', window.location.href)
          return
        }
        if (step === 'payment') {
          console.log('=== User tried to navigate back from payment, asking confirmation ===')
          const confirmLeave = window.confirm('Are you sure you want to leave the payment page? Your order will not be completed.')
          if (!confirmLeave) {
            window.history.pushState(null, '', window.location.href)
          } else {
            setStep('shipping')
          }
        }
      }

      // Push current state to history to catch back button
      window.history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', handlePopState)

      return () => {
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [step, isSubmitting])

  // Fetch custom front covers from API for all cart items in a SINGLE REQUEST
  // This is optimized to avoid multiple API calls - uses SQL "IN" operator to fetch all items at once
  useEffect(() => {
    const fetchBookCovers = async () => {
      if (cartState.items.length === 0) return

      setLoadingCovers(true)
      try {
        // Get all item IDs/slugs from cart
        const itemIds = cartState.items.map(item => item.id)
        console.log('=== Fetching Book Covers in SINGLE REQUEST ===')
        console.log(`Fetching ${itemIds.length} book covers at once:`, itemIds)
        
        // OPTIMIZATION: Use "in" operator to fetch ALL cart items in a single API call
        // This avoids N+1 query problem where we'd make one request per book
        // Note: Book IDs in cart are set as apiBook.name (e.g., "ITEM-0001") from BookDetailPage
        const params = new URLSearchParams({
          filters: JSON.stringify([
            ["item_group", "=", "Lorem Paperback Book"],
            ["name", "in", itemIds]  // "in" operator fetches multiple items at once
          ]),
          fields: JSON.stringify(["name", "custom_slug", "custom_front_cover"])
        })

        console.log('Single API Request URL:', `https://fox.lorempress.co/api/resource/Item?${params.toString()}`)

        const response = await fetch(
          `https://fox.lorempress.co/api/resource/Item?${params.toString()}`,
          {
            headers: {
              'Authorization': 'token 37555e836101c2f:84dd7d46d343106'
            }
          }
        )

        console.log('API Response status:', response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('API Error response:', errorText)
          throw new Error(`Failed to fetch book covers: ${response.status}`)
        }

        const result: APIResponse = await response.json()
        console.log('✅ Single API request completed successfully!')
        console.log(`Fetched ${result.data.length} book covers in one request (requested: ${itemIds.length})`)
        console.log('API Response data:', result.data)

        // Create a mapping of item name (ID) -> cover URL
        const coverMap: Record<string, string> = {}
        result.data.forEach((book) => {
          console.log(`Processing book: ${book.name}, slug: ${book.custom_slug}, cover: ${book.custom_front_cover}`)
          if (book.custom_front_cover) {
            const coverUrl = `https://fox.lorempress.co${book.custom_front_cover}`
            // Use 'name' as the key since that's what cart items use as ID
            coverMap[book.name] = coverUrl
            console.log(`✓ Mapped ${book.name} -> ${coverUrl}`)
          } else {
            console.log(`✗ No cover for ${book.name}`)
          }
        })

        console.log('Final cover map:', coverMap)
        setBookCovers(coverMap)
      } catch (error) {
        console.error('=== Error fetching book covers ===', error)
        // On error, covers will remain empty and CSS placeholders will be used
      } finally {
        setLoadingCovers(false)
      }
    }

    fetchBookCovers()
  }, [cartState.items])

  // Get book details for cart items
  const cartItemsWithDetails = cartState.items.map(item => ({
    ...item,
    book: books.find(b => b.id === item.id)
  }))

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  // Create Sales Order after successful payment
  const createSalesOrder = async (
    customerName: string,
    customerId: string,
    addressId: string,
    paymentId: string,
    paymentStatus: string,
    shippingDetails: {
      address: string
      landmark: string
      city: string
      state: string
      pincode: string
      phone: string
      email: string
    }
  ) => {
    try {
      console.log('=== Creating Sales Order ===')
      
      // Calculate delivery date (+14 days from today)
      const today = new Date()
      const deliveryDate = new Date(today)
      deliveryDate.setDate(deliveryDate.getDate() + 14)
      const formattedDeliveryDate = deliveryDate.toISOString().split('T')[0]
      
      console.log('Delivery Date:', formattedDeliveryDate)

      // Prepare items for sales order
      const items = cartItemsWithDetails.map(item => ({
        item_code: item.id,
        item_name: item.title,
        qty: item.quantity,
        rate: item.price,
        delivery_date: formattedDeliveryDate
      }))

      const salesOrderData = {
        customer: customerId,
        customer_name: customerName,
        customer_address: addressId,
        shipping_address_name: addressId,
        address_display: `${shippingDetails.address}\n${shippingDetails.landmark ? shippingDetails.landmark + '\n' : ''}${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}\nPhone: ${shippingDetails.phone}\nEmail: ${shippingDetails.email}`,
        shipping_address: `${shippingDetails.address}\n${shippingDetails.landmark ? shippingDetails.landmark + '\n' : ''}${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}\nPhone: ${shippingDetails.phone}\nEmail: ${shippingDetails.email}`,
        contact_display: `${customerName}\n${shippingDetails.phone}\n${shippingDetails.email}`,
        contact_email: shippingDetails.email,
        contact_mobile: shippingDetails.phone,
        delivery_date: formattedDeliveryDate,
        items: items,
        custom_razorpay_payment_id: paymentId,
        custom_payment_status: paymentStatus,
        naming_series: 'SAL-ORD-.YYYY.-'
      }

      console.log('Sales Order Data:', salesOrderData)

      const response = await fetch('https://fox.lorempress.co/api/resource/Sales Order', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(salesOrderData)
      })

      console.log('Sales Order API response status:', response.status)
      const responseText = await response.text()
      console.log('Sales Order API raw response:', responseText)

      if (!response.ok) {
        throw new Error(`Failed to create sales order: ${response.status} - ${responseText}`)
      }

      const salesOrderResult = JSON.parse(responseText)
      console.log('Sales Order created successfully:', salesOrderResult)
      
      return {
        success: true,
        salesOrderId: salesOrderResult.data?.name,
        deliveryDate: formattedDeliveryDate
      }
    } catch (error) {
      console.error('Error creating sales order:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  const initiateRazorpayPayment = (customerName: string, customerId: string, addressId: string) => {
    // Prepare cart records for notes
    const cartRecords = cartItemsWithDetails.map(item => ({
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity
    }))

    // Save current URL to prevent unwanted navigation
    const currentUrl = window.location.href
    console.log('=== Saving current URL before Razorpay:', currentUrl)

    // Razorpay options
    const options = {
      key: 'rzp_test_RZPCiwMvvYJLJH', // Razorpay test key
      amount: total * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'Lorem Publishing',
      description: 'Book Order Payment',
      image: '/vite.svg',
      handler: async function (response: any) {
        console.log('=== Payment Successful ===')
        console.log('Razorpay Payment ID:', response.razorpay_payment_id)
        console.log('Razorpay Order ID:', response.razorpay_order_id)
        console.log('Razorpay Signature:', response.razorpay_signature)
        
        // Ensure we're still on the checkout page
        if (window.location.href !== currentUrl) {
          console.log('=== URL changed, restoring:', currentUrl)
          window.history.pushState(null, '', currentUrl)
        }
        
        // Create Sales Order
        const salesOrderResult = await createSalesOrder(
          customerName,
          customerId,
          addressId,
          response.razorpay_payment_id,
          'Paid',
          {
            address: formData.address,
            landmark: formData.landmark,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            phone: formData.phone,
            email: formData.email
          }
        )
        
        if (salesOrderResult.success) {
          console.log('=== Sales Order Created Successfully ===')
          console.log('Sales Order ID:', salesOrderResult.salesOrderId)
          
          // Store order data for confirmation page
          setOrderData({
            customerName,
            customerId,
            addressId,
            salesOrderId: salesOrderResult.salesOrderId,
            paymentId: response.razorpay_payment_id,
            deliveryDate: salesOrderResult.deliveryDate,
            orderTotal: total,
            orderItems: cartItemsWithDetails
          })
          
          // Move to confirmation page (DON'T clear cart here to prevent redirect issues)
          setStep('confirmation')
          setIsSubmitting(false)
          
          console.log('=== Order completed successfully - moved to confirmation page ===')
        } else {
          console.error('=== Failed to create Sales Order ===')
          console.error('Error:', salesOrderResult.error)
          
          // Still show confirmation but with limited data
          setOrderData({
            customerName,
            customerId,
            addressId,
            paymentId: response.razorpay_payment_id,
            orderTotal: total,
            orderItems: cartItemsWithDetails
          })
          
          setStep('confirmation')
          setIsSubmitting(false)
          
          alert('Payment successful, but there was an issue creating the order. Please contact support with your payment ID: ' + response.razorpay_payment_id)
        }
      },
      prefill: {
        name: customerName,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        customer_name: customerName,
        customer_id: customerId,
        address_id: addressId,
        cart_items: JSON.stringify(cartRecords),
        total_items: cartItemsWithDetails.length,
        subtotal: subtotal,
        shipping: shipping,
        order_total: total
      },
      theme: {
        color: '#000000'
      },
      modal: {
        ondismiss: function() {
          console.log('=== Payment Cancelled by User ===')
          console.log('=== Current URL:', window.location.href)
          
          // Prevent navigation by restoring URL if it changed
          if (window.location.href !== currentUrl) {
            console.log('=== URL changed during modal, restoring:', currentUrl)
            window.history.pushState(null, '', currentUrl)
          }
          
          setIsSubmitting(false)
          // User can retry by clicking "Place Order" button again
        },
        // Prevent Razorpay from changing browser history
        escape: true,
        backdropclose: false,
        confirm_close: false
      }
    }

    const razorpayInstance = new window.Razorpay(options)
    razorpayInstance.on('payment.failed', function (response: any) {
      console.error('=== Payment Failed ===')
      console.error('Error Code:', response.error.code)
      console.error('Error Description:', response.error.description)
      console.error('Error Source:', response.error.source)
      console.error('Error Step:', response.error.step)
      console.error('Error Reason:', response.error.reason)
      
      // Ensure we're still on the checkout page
      if (window.location.href !== currentUrl) {
        console.log('=== URL changed after failure, restoring:', currentUrl)
        window.history.pushState(null, '', currentUrl)
      }
      
      setIsSubmitting(false)
      // User can retry by clicking "Place Order" button again
      alert(`Payment failed: ${response.error.description}\n\nPlease try again or use a different payment method.`)
    })
    
    razorpayInstance.open()
  }

  const handleSubmitOrder = async () => {
    console.log('=== Place Order Button Clicked ===')
    console.log('Form Data:', formData)
    setIsSubmitting(true)

    // Check if customer and address already created (for retry scenarios)
    if (savedCustomerData) {
      console.log('=== Using existing customer and address data ===')
      console.log('Customer ID:', savedCustomerData.customerId)
      console.log('Address ID:', savedCustomerData.addressId)
      initiateRazorpayPayment(
        savedCustomerData.customerName,
        savedCustomerData.customerId,
        savedCustomerData.addressId
      )
      return
    }

    let customerResult: { success: boolean; data?: any; error?: ParsedError } = { success: false }
    let addressResult: { success: boolean; data?: any; error?: ParsedError } = { success: false }

    try {
      // Step 1: Create Customer
      const customerName = `${formData.firstName} ${formData.lastName}`
      console.log('Creating customer with data:', {
        customer_name: customerName,
        customer_type: 'Individual',
        customer_group: 'All Customer Groups',
        territory: 'All Territories',
        mobile_no: formData.phone,
        email_id: formData.email
      })

      const customerResponse = await fetch('https://fox.lorempress.co/api/resource/Customer', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_name: customerName,
          customer_type: 'Individual',
          customer_group: 'All Customer Groups',
          territory: 'All Territories',
          mobile_no: formData.phone,
          email_id: formData.email
        })
      })

      console.log('Customer API response status:', customerResponse.status)
      console.log('Customer API response ok?:', customerResponse.ok)

      if (!customerResponse.ok) {
        // Parse ERPNext error into user-friendly format
        const parsedError = await parseERPNextError(customerResponse)
        console.log('=== Parsed Error Details ===')
        console.log('Type:', parsedError.type)
        console.log('User Message:', parsedError.userMessage)
        console.log('Technical Message:', parsedError.technicalMessage)
        console.log('Suggestions:', parsedError.suggestions)
        customerResult = { success: false, error: parsedError }
        
        // Show error modal immediately
        setApiResponses({
          customer: customerResult,
          address: {
            success: false,
            error: {
              type: 'unknown',
              userMessage: 'Not attempted due to customer creation failure',
              technicalMessage: 'Skipped',
              suggestions: []
            }
          }
        })
        setShowApiModal(true)
        setIsSubmitting(false)
        return
      }

      const customerData = await customerResponse.json()
      console.log('Customer created successfully:', customerData)
      console.log('Customer ID:', customerData.data?.name)
      customerResult = { success: true, data: customerData }

      const customerId = customerResult.data.data.name

      // Step 2: Create Address linked to Customer
      console.log('Creating address with data:', {
        address_title: customerName,
        address_type: 'Shipping',
        address_line1: formData.address,
        address_line2: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone: formData.phone,
        email_id: formData.email,
        links: [{ link_doctype: 'Customer', link_name: customerId }]
      })

      const addressResponse = await fetch('https://fox.lorempress.co/api/resource/Address', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address_title: customerName,
          address_type: 'Shipping',
          address_line1: formData.address,
          address_line2: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
          email_id: formData.email,
          links: [
            {
              link_doctype: 'Customer',
              link_name: customerId
            }
          ]
        })
      })

      console.log('Address API response status:', addressResponse.status)
      console.log('Address API response ok?:', addressResponse.ok)

      if (!addressResponse.ok) {
        // Parse ERPNext error into user-friendly format
        const parsedError = await parseERPNextError(addressResponse)
        console.error('Address creation failed:', parsedError)
        addressResult = { success: false, error: parsedError }
        
        // Show error modal
        setApiResponses({
          customer: customerResult,
          address: addressResult
        })
        setShowApiModal(true)
        setIsSubmitting(false)
        return
      }

      const addressData = await addressResponse.json()
      console.log('Address created successfully:', addressData)
      console.log('Address ID:', addressData.data?.name)
      addressResult = { success: true, data: addressData }

      // Step 3: Both customer and address successful, initiate Razorpay payment
      console.log('=== Initiating Razorpay Payment ===')
      const addressId = addressResult.data.data.name
      
      // Store customer and address data for potential retries
      setSavedCustomerData({
        customerName,
        customerId,
        addressId
      })
      
      // Store API responses
      setApiResponses({
        customer: customerResult,
        address: addressResult
      })
      
      // Initiate Razorpay payment
      initiateRazorpayPayment(customerName, customerId, addressId)

    } catch (error) {
      console.error('=== Unexpected error submitting order ===', error)
      // Handle unexpected errors (network issues, etc.)
      const errorResult = {
        success: false,
        error: {
          type: 'network' as const,
          userMessage: 'Network error occurred',
          technicalMessage: error instanceof Error ? error.message : String(error),
          suggestions: ['Please check your internet connection', 'Try again']
        }
      }
      
      setApiResponses({
        customer: customerResult.success ? customerResult : errorResult,
        address: customerResult.success ? errorResult : {
          success: false,
          error: {
            type: 'unknown' as const,
            userMessage: 'Not attempted due to customer creation failure',
            technicalMessage: 'Skipped',
            suggestions: []
          }
        }
      })
      setShowApiModal(true)
      setIsSubmitting(false)
    }
  }

  // Empty Cart State
  if (cartState.items.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen bg-white">
        <section className="section-padding bg-cream-100">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="max-w-2xl mx-auto text-center">
              <div className="size-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-8">
                <ShoppingCart className="size-10 text-gray-400" />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-black mb-6">
                Your Cart is Empty
              </h1>

              <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
                Looks like you haven't added any books to your cart yet.
                Discover our collection of transformative books and start building your library.
              </p>

              <Button size="lg" asChild>
                <Link to="/books">
                  Browse Our Books
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Order Confirmation State
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-white">
        <section className="section-padding bg-cream-100">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="max-w-2xl mx-auto text-center">
              <div className="size-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-8">
                <CheckCircle className="size-10 text-green-600" />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-black mb-6">
                Order Confirmed!
              </h1>

              <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
                Thank you for your order! We've received your payment and are preparing your books for shipment.
                You'll receive a confirmation email with tracking details shortly.
              </p>

              <div className="bg-white rounded-lg p-6 mb-8 text-left">
                <h3 className="font-serif text-lg font-semibold text-black mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  {orderData && (
                    <>
                      {orderData.salesOrderId && (
                        <div className="flex justify-between pb-2 border-b border-gray-200">
                          <span className="text-gray-600">Sales Order ID:</span>
                          <span className="font-bold text-green-600">{orderData.salesOrderId}</span>
                        </div>
                      )}
                      {orderData.paymentId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment ID:</span>
                          <span className="font-medium text-xs">{orderData.paymentId}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer Name:</span>
                        <span className="font-medium">{orderData.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer ID:</span>
                        <span className="font-medium">{orderData.customerId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address ID:</span>
                        <span className="font-medium">{orderData.addressId}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">₹{orderData?.orderTotal || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Address:</span>
                    <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  {orderData?.deliveryDate && (
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Expected delivery before:</span>
                      <span className="font-bold text-blue-600">
                        {new Date(orderData.deliveryDate).toLocaleDateString('en-IN', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ordered Items */}
              <div className="bg-white rounded-lg p-6 mb-8 text-left">
                <h3 className="font-serif text-lg font-semibold text-black mb-4">
                  Your Order
                </h3>
                <div className="space-y-4">
                  {(orderData?.orderItems || []).map((item) => (
                    <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <div className="font-sans font-medium text-black">{item.title}</div>
                        <div className="font-sans text-sm text-gray-500">by {item.author}</div>
                        <div className="font-sans text-xs text-gray-400 mt-1">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-sans font-medium text-black">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 border-t-2 border-gray-300">
                    <span className="font-sans font-bold text-black">Total</span>
                    <span className="font-sans font-bold text-black">₹{orderData?.orderTotal || 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <Link to="/track">
                    Track Your Order
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <Link to="/books">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Order Summary Component (reusable across steps)
  const OrderSummary = () => (
    <Card className="bg-cream-50">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-black">
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step !== 'cart' && cartItemsWithDetails.length > 0 && (
          <div className="space-y-4 mb-6">
            {cartItemsWithDetails.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex-1">
                  <div className="font-sans font-medium text-black">{item.title}</div>
                  <div className="font-sans text-gray-500">by {item.author}</div>
                </div>
                <div className="text-right">
                  <div className="font-sans font-medium text-black">₹{item.price * item.quantity}</div>
                  <div className="font-sans text-gray-500">Qty: {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-cream-300 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-black">₹{subtotal}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Shipping</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-400 line-through">₹100</span>
              <Badge className="bg-green-600 text-white hover:bg-green-700 text-xs">
                ₹0 - Free
              </Badge>
            </div>
          </div>
          <div className="border-t border-cream-300 pt-3 flex justify-between text-base">
            <span className="font-semibold text-black">Total</span>
            <span className="font-bold text-black">₹{total}</span>
          </div>
        </div>

        <div className="border-t border-cream-300 pt-4 mt-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="size-4 text-green-600" />
            <span>Secure checkout with SSL encryption</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="size-4 text-blue-600" />
            <span>Ships from Kochi within 2-3 business days</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="size-4 text-green-600" />
            <span>30-day return policy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Cart Step
  if (step === 'cart') {
    return (
      <div className="min-h-screen bg-white">
        <section className="section-padding bg-cream-100">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/books">
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Shopping
                </Link>
              </Button>
              <div>
                <h1 className="font-serif text-3xl font-bold text-black">Your Cart</h1>
                <p className="font-sans text-gray-500">Review your items before checkout</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-bold text-black mb-6">Your Items</h2>

                        <div className="space-y-4">
                  {cartItemsWithDetails.map((item) => {
                    const coverUrl = bookCovers[item.id] || item.book?.image
                    console.log(`Rendering cart item ${item.id}: coverUrl =`, coverUrl)
                    
                    return (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                            {loadingCovers ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="animate-pulse bg-gray-200 w-full h-full" />
                              </div>
                            ) : coverUrl ? (
                              <img
                                src={coverUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.log(`Image failed to load for ${item.id}:`, coverUrl)
                                  // Hide the image and show CSS placeholder
                                  const target = e.currentTarget
                                  target.style.display = 'none'
                                  const parent = target.parentElement
                                  if (parent && !parent.querySelector('.cover-placeholder')) {
                                    const placeholder = document.createElement('div')
                                    placeholder.className = 'cover-placeholder flex flex-col items-center justify-center w-full h-full text-gray-400 absolute inset-0'
                                    placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg><span class="text-xs mt-1">No Cover</span>'
                                    parent.appendChild(placeholder)
                                  }
                                }}
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                                <BookOpen className="size-8" />
                                <span className="text-xs mt-1">No Cover</span>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg font-semibold text-black mb-1 truncate">
                              {item.title}
                            </h3>
                            <p className="font-sans text-sm text-gray-500 mb-4">by {item.author}</p>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                              <div className="flex items-center gap-3">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="size-8 p-0"
                                >
                                  <Minus className="size-3" />
                                </Button>
                                <span className="font-sans font-medium text-black w-8 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="size-8 p-0"
                                >
                                  <Plus className="size-3" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="font-sans text-lg font-bold text-black">
                                  ₹{item.price * item.quantity}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    )
                  })}
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Button variant="outline" asChild>
                    <Link to="/books">Continue Shopping</Link>
                  </Button>
                  <Button type="button" onClick={() => setStep('shipping')}>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <OrderSummary />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Shipping Step
  if (step === 'shipping') {
    return (
      <div className="min-h-screen bg-white">
        <section className="section-padding bg-cream-100">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" onClick={() => setStep('cart')}>
                <ArrowLeft className="size-4 mr-2" />
                Back to Cart
              </Button>
              <div>
                <h1 className="font-serif text-3xl font-bold text-black">Shipping Information</h1>
                <p className="font-sans text-gray-500">Where should we send your order?</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <label className="block font-sans font-semibold text-sm text-black mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans font-semibold text-sm text-black mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-semibold text-sm text-black mb-2">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans font-semibold text-sm text-black mb-2">
                      Address *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address, building, apartment"
                    />
                  </div>

                  <div>
                    <label className="block font-sans font-semibold text-sm text-black mb-2">
                      Landmark
                    </label>
                    <Input
                      type="text"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      placeholder="Nearby landmark (optional)"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-sans font-semibold text-sm text-black mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-semibold text-sm text-black mb-2">
                        State *
                      </label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block font-sans font-semibold text-sm text-black mb-2">
                        PIN Code *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="e.g., 682001"
                        maxLength={6}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter a 6-digit PIN code that matches your selected state
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans font-semibold text-sm text-black mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep('cart')}>
                      Back to Cart
                    </Button>
                    <Button type="button" onClick={() => setStep('payment')}>
                      Continue to Payment
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <OrderSummary />

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Truck className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-serif font-semibold text-green-900 mb-2">
                            Free Shipping 🎉
                          </h3>
                          <p className="font-sans text-sm text-green-800">
                            Enjoy free shipping on all orders! Standard delivery within 5-7 business days.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Payment Step
  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => setStep('shipping')}>
              <ArrowLeft className="size-4 mr-2" />
              Back to Shipping
            </Button>
            <div>
              <h1 className="font-serif text-3xl font-bold text-black">Payment</h1>
              <p className="font-sans text-gray-500">Complete your purchase securely</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-black flex items-center gap-2">
                    <ShoppingCart className="size-5" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItemsWithDetails.map((item) => {
                      const coverUrl = bookCovers[item.id] || item.book?.image
                      
                      return (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                          {loadingCovers ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="animate-pulse bg-gray-200 w-full h-full" />
                            </div>
                          ) : coverUrl ? (
                            <img
                              src={coverUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.log(`Payment page: Image failed to load for ${item.id}:`, coverUrl)
                                // Hide the image and show CSS placeholder
                                const target = e.currentTarget
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent && !parent.querySelector('.cover-placeholder')) {
                                  const placeholder = document.createElement('div')
                                  placeholder.className = 'cover-placeholder flex flex-col items-center justify-center w-full h-full text-gray-400 absolute inset-0'
                                  placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg><span class="text-xs mt-1">No Cover</span>'
                                  parent.appendChild(placeholder)
                                }
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                              <BookOpen className="size-6" />
                              <span className="text-xs mt-1">No Cover</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base font-semibold text-black mb-1">
                            {item.title}
                          </h4>
                          <p className="font-sans text-sm text-gray-500 mb-2">by {item.author}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span>Qty: {item.quantity}</span>
                              <span>×</span>
                              <span>₹{item.price}</span>
                            </div>
                            <span className="font-sans text-lg font-bold text-black">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-black flex items-center gap-2">
                    <Truck className="size-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-cream-50 rounded-lg p-6 space-y-3">
                    <div>
                      <p className="font-sans font-semibold text-black text-lg">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{formData.address}</p>
                      {formData.landmark && <p>Near {formData.landmark}</p>}
                      <p>{formData.city}, {formData.state} - {formData.pincode}</p>
                      <p className="pt-2 font-medium text-black">Phone: {formData.phone}</p>
                      <p className="font-medium text-black">Email: {formData.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-black flex items-center gap-2">
                    <CreditCard className="size-5" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-cream-50 rounded-lg p-6 space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Subtotal ({cartItemsWithDetails.length} items)</span>
                      <span className="font-medium text-black">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-base">
                      <span className="text-gray-600">Shipping & Handling</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-400 line-through">₹100</span>
                        <Badge className="bg-green-600 text-white hover:bg-green-700 text-xs">
                          ₹0 - Free
                        </Badge>
                      </div>
                    </div>
                    <div className="border-t border-cream-300 pt-3 flex justify-between text-lg">
                      <span className="font-sans font-bold text-black">Order Total</span>
                      <span className="font-sans font-bold text-black text-2xl">₹{total}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <Lock className="size-4" />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1 ml-6">
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setStep('shipping')} 
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="size-4 mr-2" />
                      Back to Shipping
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleSubmitOrder} 
                      size="lg" 
                      className="flex-1 bg-black hover:bg-gray-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin size-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="size-4 mr-2" />
                          Place Order — ₹{total}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Response Modal */}
      {showApiModal && apiResponses && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-serif text-2xl font-bold text-black">API Response</h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowApiModal(false)}
                className="size-8 p-0"
              >
                <X className="size-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Customer Response */}
              <div>
                <h3 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
                  {!apiResponses.customer?.success ? (
                    <>
                      <X className="size-5 text-red-600" />
                      <span className="text-red-600">Customer Creation Failed</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-5 text-green-600" />
                      <span className="text-green-600">Customer Created Successfully</span>
                    </>
                  )}
                </h3>
                <div className={`rounded-lg p-4 border ${
                  !apiResponses.customer?.success 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-green-50 border-green-200'
                }`}>
                  {!apiResponses.customer?.success && apiResponses.customer?.error ? (
                    <div className="space-y-3">
                      <p className="font-sans text-red-900">
                        {apiResponses.customer.error.userMessage}
                      </p>
                      
                      <details className="mt-3">
                        <summary className="font-sans text-xs font-medium text-red-700 cursor-pointer hover:text-red-900">
                          Show Technical Details
                        </summary>
                        <pre className="font-mono text-xs text-red-800 bg-red-100 p-2 rounded mt-2 overflow-x-auto whitespace-pre-wrap">
                          {apiResponses.customer.error.technicalMessage}
                        </pre>
                      </details>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-sans text-sm text-green-800">
                        <span className="font-semibold">Customer ID:</span> {apiResponses.customer?.data?.data?.name}
                      </p>
                      <p className="font-sans text-sm text-green-800">
                        <span className="font-semibold">Name:</span> {apiResponses.customer?.data?.data?.customer_name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Response */}
              <div>
                <h3 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
                  {!apiResponses.address?.success ? (
                    <>
                      <X className="size-5 text-red-600" />
                      <span className="text-red-600">Address Creation Failed</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-5 text-green-600" />
                      <span className="text-green-600">Address Created Successfully</span>
                    </>
                  )}
                </h3>
                <div className={`rounded-lg p-4 border ${
                  !apiResponses.address?.success 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-green-50 border-green-200'
                }`}>
                  {!apiResponses.address?.success && apiResponses.address?.error ? (
                    <div className="space-y-3">
                      <p className="font-sans text-red-900">
                        {apiResponses.address.error.userMessage}
                      </p>
                      
                      <details className="mt-3">
                        <summary className="font-sans text-xs font-medium text-red-700 cursor-pointer hover:text-red-900">
                          Show Technical Details
                        </summary>
                        <pre className="font-mono text-xs text-red-800 bg-red-100 p-2 rounded mt-2 overflow-x-auto whitespace-pre-wrap">
                          {apiResponses.address.error.technicalMessage}
                        </pre>
                      </details>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-sans text-sm text-green-800">
                        <span className="font-semibold">Address ID:</span> {apiResponses.address?.data?.data?.name}
                      </p>
                      <p className="font-sans text-sm text-green-800">
                        <span className="font-semibold">Address:</span> {apiResponses.address?.data?.data?.address_line1}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <Button 
                type="button"
                onClick={() => setShowApiModal(false)} 
                className="w-full bg-black hover:bg-gray-800"
                size="lg"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
