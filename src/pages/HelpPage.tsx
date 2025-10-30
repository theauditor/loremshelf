import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  HelpCircle,
  BookOpen,
  ShoppingCart,
  Package,
  Mail,
  Phone,
  MessageSquare,
  Search,
  CreditCard
} from 'lucide-react'

export function HelpPage() {
  const faqCategories = [
    {
      icon: BookOpen,
      title: 'Publishing & Submissions',
      description: 'Everything you need to know about submitting your manuscript and the publishing process.',
      questions: [
        'How do I submit my manuscript?',
        'What genres do you accept?',
        'How long does the review process take?',
        'Do you provide editorial feedback?'
      ]
    },
    {
      icon: ShoppingCart,
      title: 'Ordering & Payment',
      description: 'Questions about purchasing books, payment methods, and order processing.',
      questions: [
        'What payment methods do you accept?',
        // 'How do I track my order?',
        'Can I cancel or modify my order?',
        'Do you ship internationally?'
      ]
    },
    {
      icon: Package,
      title: 'Shipping & Returns',
      description: 'Information about delivery times, shipping costs, and our return policy.',
      questions: [
        'How long does shipping take?',
        'What are your shipping rates?',
        'How do I return a book?',
        'Do you offer gift wrapping?'
      ]
    },
    {
      icon: CreditCard,
      title: 'Account & Technical',
      description: 'Help with account management, website issues, and technical support.',
      questions: [
        'How do I create an account?',
        'I forgot my password',
        'How do I update my information?',
        'Is my payment information secure?'
      ]
    }
  ]

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'hello@lorem.com',
      availability: '24-48 hour response'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '+91 98765 43210',
      availability: 'Mon-Fri, 9 AM - 6 PM IST'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with us online',
      contact: 'Available on website',
      availability: 'Mon-Fri, 9 AM - 6 PM IST'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Help Center
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl font-normal text-black mb-6">
              How Can We{' '}
              <span className="text-brown-700">Help You?</span>
            </h1>

            <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
              Find answers to common questions or get in touch with our support team.
              We're here to help you have the best experience with Lorem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" asChild className="flex-1">
                <Link to="/contact">
                  Contact Support
                  <MessageSquare className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Browse our most common questions organized by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-black mb-3">
                    {category.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-500 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.questions.map((question, questionIndex) => (
                      <div key={questionIndex} className="flex items-start gap-2">
                        <HelpCircle className="size-4 text-brown-700 flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-sm text-gray-600">{question}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Get in Touch
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is ready to help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <option.icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-black mb-2">
                    {option.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-500 mb-3">
                    {option.description}
                  </p>
                  <div className="font-sans text-sm font-medium text-brown-700 mb-2">
                    {option.contact}
                  </div>
                  <div className="font-sans text-xs text-gray-500">
                    {option.availability}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Quick Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Package className="size-8 text-brown-700 mx-auto mb-4" />
                  <h3 className="font-serif text-lg font-medium text-black mb-2">
                    Track Your Order
                  </h3>
                  <p className="font-sans text-sm text-gray-500 mb-4">
                    Get real-time updates on your shipment status
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/track">Track Order</Link>
                  </Button>
                </CardContent>
              </Card> */}

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <BookOpen className="size-8 text-brown-700 mx-auto mb-4" />
                  <h3 className="font-serif text-lg font-medium text-black mb-2">
                    Submit Manuscript
                  </h3>
                  <p className="font-sans text-sm text-gray-500 mb-4">
                    Ready to publish your book? Start here
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/submit">Submit Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              Still Need Help?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Our support team is standing by to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Contact Support
                  <MessageSquare className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <a href="mailto:hello@lorem.com">
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
