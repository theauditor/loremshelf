import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  FileText,
  Shield,
  Users,
  BookOpen,
  Scale
} from 'lucide-react'

export function TermsPage() {
  const sections = [
    {
      icon: BookOpen,
      title: 'Publishing Services',
      content: 'Our terms cover manuscript submission, editorial services, publishing rights, and distribution agreements.'
    },
    {
      icon: Users,
      title: 'Author Rights & Royalties',
      content: 'Detailed information about copyright ownership, royalty calculations, and payment schedules.'
    },
    {
      icon: Shield,
      title: 'Privacy & Data Protection',
      content: 'How we collect, use, and protect your personal information and manuscript data.'
    },
    {
      icon: Scale,
      title: 'Legal Compliance',
      content: 'Our commitment to legal standards, content guidelines, and industry regulations.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Legal Information
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl font-normal text-black mb-6">
              Terms of{' '}
              <span className="text-brown-700">Service</span>
            </h1>

            <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
              Please read these terms carefully before using our services. By accessing or using Lorem,
              you agree to be bound by these terms and conditions.
            </p>

            <div className="text-sm text-gray-400">
              Last updated: January 2025
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl font-normal text-black mb-6">
                  Agreement Overview
                </h2>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    These Terms of Service ("Terms") govern your use of Lorem's publishing platform and services.
                    By using our website, submitting manuscripts, or purchasing books, you agree to comply with
                    and be bound by these terms.
                  </p>
                  <p>
                    Lorem operates as Float Business Accelerator Pvt Ltd, registered in Kochi, Kerala, India.
                    Our mission is to democratize publishing through AI-powered technology while maintaining
                    the highest standards of literary excellence.
                  </p>
                  <p>
                    These terms apply to all users, including authors, readers, and visitors to our platform.
                    By continuing to use our services, you acknowledge that you have read, understood, and
                    agree to be bound by these terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {sections.map((section, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="size-10 bg-brown-700 rounded-lg flex items-center justify-center mb-4">
                      <section.icon className="size-5 text-white" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-black mb-3">
                      {section.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-brown-50 border-brown-200">
              <CardContent className="p-8">
                <h3 className="font-serif text-xl font-normal text-black mb-4">
                  Contact for Legal Inquiries
                </h3>
                <p className="font-sans text-gray-500 mb-4">
                  For legal questions or concerns about these terms, please contact our legal department:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-brown-700">
                    <FileText className="size-4" />
                    <span>Float Business Accelerator Pvt Ltd</span>
                  </div>
                  <div className="flex items-center gap-2 text-brown-700">
                    <span>Legal Department</span>
                  </div>
                  <div className="flex items-center gap-2 text-brown-700">
                    <span>Kochi, Kerala, India</span>
                  </div>
                  <a
                    href="mailto:legal@lorem.com"
                    className="inline-block mt-4 font-sans text-brown-700 hover:underline"
                  >
                    legal@lorem.com
                  </a>
                </div>
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
              Questions About Our Terms?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              We're here to help clarify any questions you may have about our terms of service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Contact Legal Team
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/privacy">
                  Privacy Policy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
