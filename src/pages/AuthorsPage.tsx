import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export function AuthorsPage() {
  const features = [
    {
      icon: FileText,
      title: 'Manuscript Submission Portal',
      description: 'Secure, user-friendly platform for submitting your work with real-time status updates.',
      status: 'coming-soon'
    },
    {
      icon: Users,
      title: 'Editor Collaboration Tools',
      description: 'Work directly with professional editors through our integrated collaboration platform.',
      status: 'coming-soon'
    },
    {
      icon: TrendingUp,
      title: 'Sales Analytics Dashboard',
      description: 'Track your book\'s performance with detailed analytics and market insights.',
      status: 'coming-soon'
    },
    {
      icon: Award,
      title: 'Royalty Management',
      description: 'Transparent royalty tracking and automated payments with detailed breakdowns.',
      status: 'coming-soon'
    }
  ]

  const guidelines = [
    {
      title: 'Manuscript Preparation',
      description: 'Ensure your manuscript is properly formatted and includes all necessary components.',
      details: ['Complete manuscript in Word or PDF format', 'Synopsis and chapter outline', 'Author biography and contact information']
    },
    {
      title: 'Review Process',
      description: 'Our thorough review process ensures every submission receives careful consideration.',
      details: ['Initial technical review within 48 hours', 'Editorial assessment within 10 business days', 'Detailed feedback provided for all submissions']
    },
    {
      title: 'Publication Timeline',
      description: 'From acceptance to publication in the fastest timeframe in the industry.',
      details: ['Editing and design: 2-4 weeks', 'Production and formatting: 1-2 weeks', 'Distribution setup: 1 week']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Badge className="bg-brown-700 text-white hover:bg-brown-800">
                Author Portal
              </Badge>
              <Badge variant="outline">
                Coming Soon
              </Badge>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-8 leading-tight">
              Your Publishing Journey{' '}
              <span className="text-brown-700">Starts Here</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're building the most advanced author platform in publishing. Get early access to our comprehensive
              suite of tools designed to support authors throughout their entire publishing journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/submit">
                  Submit Your Manuscript
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/success-stories">
                  Read Success Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              What to Expect
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Our comprehensive author portal will include everything you need to succeed in publishing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow opacity-75">
                <CardContent className="p-8">
                  <div className="size-12 bg-brown-100 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="size-6 text-brown-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-serif text-xl font-medium text-black">
                      {feature.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                  <p className="font-sans text-base text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Process */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Current Submission Process
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              While our full portal is in development, here's how to submit your work today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {guidelines.map((guideline, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="size-10 bg-brown-700 rounded-lg flex items-center justify-center mb-4">
                    <span className="font-serif text-white font-medium">{index + 1}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-black mb-3">
                    {guideline.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-500 mb-4 leading-relaxed">
                    {guideline.description}
                  </p>
                  <div className="space-y-2">
                    {guideline.details.map((detail, detailIndex) => (
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
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
                Get in Touch
              </h2>
              <p className="font-sans text-lg text-gray-500">
                Ready to start your publishing journey? We're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-medium text-black mb-2">
                  Email Us
                </h3>
                <a
                  href="mailto:submissions@lorem.com"
                  className="font-sans text-brown-700 hover:underline"
                >
                  submissions@lorem.com
                </a>
              </div>

              <div className="text-center">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-medium text-black mb-2">
                  Call Us
                </h3>
                <a
                  href="tel:+919876543210"
                  className="font-sans text-brown-700 hover:underline"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="text-center">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-medium text-black mb-2">
                  Visit Us
                </h3>
                <address className="font-sans text-brown-700">
                  Kochi, Kerala, India
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              Be the First to Know
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Get notified when our author portal launches and be among the first to experience
              the future of publishing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/submit">
                  Submit Your Manuscript
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/success-stories">
                  Read Success Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
