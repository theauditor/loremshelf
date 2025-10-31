import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Send,
  AlertCircle,
  Loader2,
  MessageCircle
} from 'lucide-react'

export function ContactPage() {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    mobile: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    console.log('=== Contact Form Submission Started ===')
    console.log('Form Data:', formData)

    try {
      // Step 1: Create Customer
      console.log('Step 1: Creating Customer...')
      const customerResponse = await fetch('https://fox.lorempress.co/api/resource/Customer', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_type: 'Individual',
          customer_group: 'All Customer Groups',
          territory: 'All Territories',
          mobile_no: formData.mobile,
          email_id: formData.email
        })
      })

      console.log('Customer API response status:', customerResponse.status)
      const customerResponseText = await customerResponse.text()
      console.log('Customer API raw response:', customerResponseText)

      if (!customerResponse.ok) {
        throw new Error(`Failed to create customer: ${customerResponse.status} - ${customerResponseText}`)
      }

      const customerData = JSON.parse(customerResponseText)
      console.log('Customer created successfully:', customerData)
      const customerId = customerData.data.name

      // Step 2: Create Issue
      console.log('Step 2: Creating Issue...')
      const issueResponse = await fetch('https://fox.lorempress.co/api/resource/Issue', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: formData.subject,
          customer: customerId,
          raised_by: formData.email,
          description: formData.message,
          issue_type: 'Contact',
          status: 'Open',
          priority: 'Medium'
        })
      })

      console.log('Issue API response status:', issueResponse.status)
      const issueResponseText = await issueResponse.text()
      console.log('Issue API raw response:', issueResponseText)

      if (!issueResponse.ok) {
        throw new Error(`Failed to create issue: ${issueResponse.status} - ${issueResponseText}`)
      }

      const issueData = JSON.parse(issueResponseText)
      console.log('Issue created successfully:', issueData)

      setSubmitted(true)
      console.log('=== Contact Form Submission Completed Successfully ===')
    } catch (err) {
      console.error('=== Error submitting contact form ===', err)
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setError(null)
    setFormData({
      subject: '',
      name: '',
      email: '',
      mobile: '',
      message: ''
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <section className="section-padding bg-cream-100">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="max-w-2xl mx-auto text-center">
              <div className="size-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-8">
                <CheckCircle className="size-10 text-green-600" />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
                Message Submitted Successfully!
              </h1>

              <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
                Thank you for contacting us. We've received your message and will get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                <Button size="lg" onClick={resetForm}>
                  Send Another Message
                </Button>
                <div>
                  <Link to="/" className="font-sans text-brown-600 hover:underline">
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-8">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Get In Touch
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6">
              Contact{' '}
              <span className="text-brown-700">Us</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Have a question or need assistance? We're here to help. Fill out the form below and our team will get back to you as soon as possible.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <a
                  href="https://wa.me/919995683304"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Mail className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-medium text-black mb-4">
                  Email Us
                </h3>
                <a
                  href="mailto:hi@lorempress.co"
                  className="font-sans text-brown-700 hover:underline"
                >
                  hi@lorempress.co
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Phone className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-medium text-black mb-4">
                  Call Us
                </h3>
                <a
                  href="tel:+919876543210"
                  className="font-sans text-brown-700 hover:underline"
                >
                  +91 99956 83304
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <MapPin className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-medium text-black mb-4">
                  Visit Us
                </h3>
                <address className="font-sans text-brown-700 not-italic">
                  Kochi, Kerala, India
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl font-normal text-black text-center">
                  Send Us a Message
                </CardTitle>
                <p className="font-sans text-gray-500 text-center">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans font-medium text-red-900 mb-1">
                          Error Submitting Form
                        </h4>
                        <p className="font-sans text-sm text-red-800">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject */}
                  <div>
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans font-medium text-sm text-black mb-2">
                        Name *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-medium text-sm text-black mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Mobile *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="size-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}