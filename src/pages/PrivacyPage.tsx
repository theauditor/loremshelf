import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  Shield,
  Eye,
  Lock,
  Users,
  FileText,
  Mail
} from 'lucide-react'

export function PrivacyPage() {
  const privacyFeatures = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'Your personal information and manuscript data are protected with enterprise-grade security measures.',
      details: ['256-bit SSL encryption', 'Secure cloud storage', 'Regular security audits']
    },
    {
      icon: Eye,
      title: 'Transparent Practices',
      description: 'We believe in complete transparency about how we collect, use, and protect your data.',
      details: ['Clear data usage policies', 'No hidden data sharing', 'User control over data']
    },
    {
      icon: Lock,
      title: 'Privacy by Design',
      description: 'Privacy considerations are built into every aspect of our platform from the ground up.',
      details: ['Privacy-first architecture', 'Data minimization', 'Secure by default']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Privacy & Security
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl font-normal text-black mb-6">
              Privacy{' '}
              <span className="text-brown-700">Policy</span>
            </h1>

            <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
              Your privacy is paramount to us. Learn how Float Business Accelerator Pvt Ltd
              collects, uses, and protects your personal information when you use our publishing platform.
            </p>

            <div className="text-sm text-gray-400">
              Last updated: January 2025
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl font-normal text-black mb-6">
                  Our Commitment to Privacy
                </h2>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    At Lorem (operated by Float Business Accelerator Pvt Ltd), we are committed to protecting
                    your privacy and ensuring the security of your personal information. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your information when you visit
                    our website or use our publishing services.
                  </p>
                  <p>
                    We comply with applicable privacy laws including the Information Technology Act, 2000
                    and the Digital Personal Data Protection Act when they come into effect. Your trust is
                    important to us, and we are dedicated to maintaining the confidentiality of your personal
                    information and manuscripts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {privacyFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="size-10 bg-brown-700 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="size-5 text-white" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center gap-2">
                          <div className="size-1.5 bg-brown-700 rounded-full" />
                          <span className="font-sans text-xs text-gray-600">{detail}</span>
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

      {/* Data Usage */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
                How We Use Your Information
              </h2>
              <p className="font-sans text-lg text-gray-500">
                We only collect information necessary to provide our publishing services
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Manuscript Processing',
                  description: 'We use AI technology to analyze, categorize, and process manuscript submissions for editorial review.'
                },
                {
                  title: 'Account Management',
                  description: 'Personal information is used to create and manage user accounts, process orders, and provide customer support.'
                },
                {
                  title: 'Platform Improvement',
                  description: 'Aggregated, anonymized data helps us improve our services and develop new features.'
                },
                {
                  title: 'Legal Compliance',
                  description: 'We may use information as required by law or to protect our rights and the rights of our users.'
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="size-8 bg-brown-700 rounded-lg flex items-center justify-center">
                          <span className="font-serif text-white font-medium text-sm">{index + 1}</span>
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

      {/* Contact */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Privacy Questions?
            </h2>
            <p className="font-sans text-lg text-gray-500 mb-8">
              If you have any questions about our privacy practices or data handling, please don't hesitate to contact us.
            </p>

            <Card className="bg-brown-50 border-brown-200 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Mail className="size-5 text-brown-700" />
                  <span className="font-serif text-lg font-medium text-brown-700">Privacy Team</span>
                </div>
                <p className="font-sans text-gray-500 mb-4">
                  Float Business Accelerator Pvt Ltd
                </p>
                <a
                  href="mailto:privacy@lorem.com"
                  className="font-sans text-brown-700 hover:underline"
                >
                  privacy@lorem.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              Your Privacy Matters
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              We are committed to protecting your privacy and maintaining your trust in our publishing platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Contact Privacy Team
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/terms">
                  Terms of Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
