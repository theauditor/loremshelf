import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  Truck,
  Shield
} from 'lucide-react'

export function ReturnsPage() {
  const policies = [
    {
      icon: Clock,
      title: '30-Day Return Window',
      description: 'Return any book within 30 days of delivery for a full refund or exchange.',
      details: ['Books must be in original condition', 'Free return shipping included', 'Instant refund processing']
    },
    {
      icon: Package,
      title: 'Easy Returns Process',
      description: 'Simple, hassle-free returns with prepaid shipping labels.',
      details: ['Prepaid return shipping', 'Multiple return methods', 'Quick processing time']
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'We stand behind the quality of every book we publish and sell.',
      details: ['Damaged books replaced', 'Printing defect coverage', 'Customer satisfaction guarantee']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Customer Satisfaction Guaranteed
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl font-normal text-black mb-6">
              Returns &{' '}
              <span className="text-brown-700">Refunds</span>
            </h1>

            <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
              We're committed to your satisfaction. If you're not completely happy with your purchase,
              our hassle-free return policy makes it easy to get a refund or exchange.
            </p>
          </div>
        </div>
      </section>

      {/* Main Policy */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-brown-50 border-brown-200 mb-8">
              <CardContent className="p-8 text-center">
                <div className="size-16 bg-brown-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="size-8 text-white" />
                </div>
                <h2 className="font-serif text-2xl font-normal text-black mb-4">
                  30-Day Money-Back Guarantee
                </h2>
                <p className="font-sans text-lg text-gray-500 mb-6">
                  Not satisfied with your book? Return it within 30 days for a full refund.
                  No questions asked.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center gap-2 text-brown-700">
                    <CheckCircle className="size-4" />
                    <span>Free return shipping</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brown-700">
                    <CheckCircle className="size-4" />
                    <span>Instant refund processing</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brown-700">
                    <CheckCircle className="size-4" />
                    <span>No restocking fees</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {policies.map((policy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="size-10 bg-brown-700 rounded-lg flex items-center justify-center mb-4">
                      <policy.icon className="size-5 text-white" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-black mb-3">
                      {policy.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 mb-4 leading-relaxed">
                      {policy.description}
                    </p>
                    <div className="space-y-2">
                      {policy.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-brown-700 flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-sm text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
                How to Return
              </h2>
              <p className="font-sans text-lg text-gray-500">
                Returning a book is simple and straightforward
              </p>
            </div>

            <div className="space-y-6">
              {[
                { step: '01', title: 'Contact Us', description: 'Email us at orders@lorem.com or use the contact form to initiate your return.' },
                { step: '02', title: 'Get Return Label', description: 'We\'ll send you a prepaid return shipping label within 24 hours.' },
                { step: '03', title: 'Ship Your Book', description: 'Pack your book securely and drop it off at any shipping location.' },
                { step: '04', title: 'Receive Refund', description: 'Once we receive your return, your refund will be processed within 3-5 business days.' }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center">
                          <span className="font-serif text-white font-medium">{item.step}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-medium text-black mb-2">
                          {item.title}
                        </h3>
                        <p className="font-sans text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              Need to Make a Return?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              We're here to help. Contact our customer service team to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Start Return Process
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/track">
                  Track Your Order
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
