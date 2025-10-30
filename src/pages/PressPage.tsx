import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  Download,
  Newspaper,
  Award,
  TrendingUp,
  Users,
  Mail
} from 'lucide-react'

export function PressPage() {
  const pressReleases = [
    {
      title: 'Lorem Launches Revolutionary AI-Powered Publishing Platform',
      date: 'January 15, 2025',
      excerpt: 'India\'s first Generation 5 publishing house combines artificial intelligence with human editorial expertise.',
      category: 'Company News'
    },
    {
      title: 'Digital Dharma Wins Innovation in Literature Award',
      date: 'December 20, 2024',
      excerpt: 'Dr. Priya Nair\'s groundbreaking work recognized for its exploration of technology and spirituality.',
      category: 'Awards'
    },
    {
      title: 'Lorem Expands to 12 Languages, Reaching Global Markets',
      date: 'November 10, 2024',
      excerpt: 'Multi-language distribution network now covers major Indian languages and international markets.',
      category: 'Expansion'
    }
  ]

  const mediaKit = [
    { name: 'Company Logo Package', format: 'ZIP', size: '2.5 MB' },
    { name: 'Executive Headshots', format: 'ZIP', size: '15 MB' },
    { name: 'Product Screenshots', format: 'ZIP', size: '8 MB' },
    { name: 'Brand Guidelines', format: 'PDF', size: '1.2 MB' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Press & Media
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl font-normal text-black mb-6">
              Press{' '}
              <span className="text-brown-700">Center</span>
            </h1>

            <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
              Find the latest news, press releases, and media resources about Lorem's
              revolutionary approach to AI-powered publishing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:press@lorem.com">
                  <Mail className="mr-2 size-4" />
                  Contact Press Team
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  General Inquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Latest Press Releases
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Stay updated with the latest announcements and developments from Lorem
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <div className="mb-4">
                        <Badge className="mb-3 bg-brown-100 text-brown-700 hover:bg-brown-200">
                          {release.category}
                        </Badge>
                        <h3 className="font-serif text-2xl font-normal text-black mb-3">
                          {release.title}
                        </h3>
                        <p className="font-sans text-sm text-brown-700 mb-3">
                          {release.date}
                        </p>
                      </div>
                      <p className="font-sans text-gray-500 leading-relaxed mb-4">
                        {release.excerpt}
                      </p>
                      <Button variant="outline" size="sm">
                        Read More
                        <ArrowRight className="ml-2 size-3" />
                      </Button>
                    </div>
                    <div className="md:w-1/3 flex items-center justify-center">
                      <div className="size-24 bg-brown-100 rounded-lg flex items-center justify-center">
                        <Newspaper className="size-12 text-brown-700" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Media Kit
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Download our media kit with logos, images, and brand guidelines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {mediaKit.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Download className="size-6 text-white" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-black mb-2">
                    {item.name}
                  </h3>
                  <div className="font-sans text-sm text-gray-500 mb-3">
                    {item.format} • {item.size}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Download
                    <Download className="ml-2 size-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-normal text-black mb-2">
                127
              </div>
              <div className="font-sans text-sm md:text-base text-gray-500">
                Books Published
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-normal text-black mb-2">
                12
              </div>
              <div className="font-sans text-sm md:text-base text-gray-500">
                Languages
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-normal text-black mb-2">
                50+
              </div>
              <div className="font-sans text-sm md:text-base text-gray-500">
                Awards Won
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-normal text-black mb-2">
                100K+
              </div>
              <div className="font-sans text-sm md:text-base text-gray-500">
                Readers Reached
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
              Media Inquiries
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              For press inquiries, interview requests, or media partnerships, please contact our press team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="mailto:press@lorem.com">
                  Contact Press Team
                  <Mail className="ml-2 size-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/contact">
                  General Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
