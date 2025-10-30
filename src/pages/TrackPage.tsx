import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Truck,
  AlertCircle
} from 'lucide-react'

export function TrackPage() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: ''
  })
  const [trackingResult, setTrackingResult] = useState<{
    status: string
    message: string
    details?: any
  } | null>(null)

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock tracking logic
    const mockTracking = {
      status: 'In Transit',
      message: 'Your order is on the way!',
      details: {
        orderNumber: formData.orderNumber,
        estimatedDelivery: 'March 15, 2025',
        currentLocation: 'Kochi Distribution Center',
        trackingSteps: [
          { status: 'Order Confirmed', completed: true, date: '2025-01-15' },
          { status: 'Processing', completed: true, date: '2025-01-16' },
          { status: 'Shipped', completed: true, date: '2025-01-17' },
          { status: 'In Transit', completed: false, date: 'Expected: 2025-01-20' },
          { status: 'Delivered', completed: false, date: 'Expected: 2025-01-22' }
        ]
      }
    }
    setTrackingResult(mockTracking)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-black mb-6">
              Track Your{' '}
              <span className="text-brown-700">Order</span>
            </h1>
            <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
              Enter your order details below to get real-time updates on your shipment status.
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl font-normal text-black">
                  Order Tracking
                </CardTitle>
                <p className="font-sans text-gray-500">
                  Enter your order details to track your shipment status.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrackOrder} className="space-y-6">
                  <div>
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Order Number *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g., LRM-2025-001234"
                    />
                  </div>

                  <div>
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="The email used during checkout"
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans font-medium text-amber-900 mb-1">
                          Finding Your Order Number
                        </h4>
                        <p className="font-sans text-sm text-amber-800">
                          You can find your order number in the confirmation email we sent you after your purchase,
                          or in your account under "My Orders".
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    <Package className="size-4 mr-2" />
                    Track Order
                  </Button>
                </form>

                {trackingResult && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="size-6 text-green-600" />
                        <h3 className="font-serif font-medium text-green-900">
                          Order Status: {trackingResult.status}
                        </h3>
                      </div>
                      <p className="font-sans text-green-800 mb-6">
                        {trackingResult.message}
                      </p>

                      {trackingResult.details && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-green-900">Order Number:</span>
                              <span className="ml-2 text-green-800">{trackingResult.details.orderNumber}</span>
                            </div>
                            <div>
                              <span className="font-medium text-green-900">Estimated Delivery:</span>
                              <span className="ml-2 text-green-800">{trackingResult.details.estimatedDelivery}</span>
                            </div>
                            <div>
                              <span className="font-medium text-green-900">Current Location:</span>
                              <span className="ml-2 text-green-800">{trackingResult.details.currentLocation}</span>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-green-200">
                            <h4 className="font-sans font-medium text-green-900 mb-3">
                              Tracking History
                            </h4>
                            <div className="space-y-3">
                              {trackingResult.details.trackingSteps.map((step: any, index: number) => (
                                <div key={index} className="flex items-center gap-3">
                                  <div className={`size-3 rounded-full ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
                                  <span className={`font-sans text-sm ${step.completed ? 'text-green-800' : 'text-gray-500'}`}>
                                    {step.status}
                                  </span>
                                  <span className="font-sans text-xs text-gray-400 ml-auto">
                                    {step.date}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Need Help?
            </h2>
            <p className="font-sans text-lg text-gray-500 mb-8">
              Can't find your order or need assistance with tracking?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/help">
                  Help Center
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
