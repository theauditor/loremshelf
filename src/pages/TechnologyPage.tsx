import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  Cpu,
  BookOpen,
  Users,
  Globe,
  Award,
  Star,
  Zap,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react'

export function TechnologyPage() {
  const technologies = [
    {
      icon: Cpu,
      title: 'AI-Powered Content Analysis',
      description: 'Advanced machine learning algorithms analyze manuscripts for market potential, genre classification, and reader preferences.',
      features: ['Automated genre detection', 'Market trend analysis', 'Readability scoring']
    },
    {
      icon: Users,
      title: 'Smart Author Matching',
      description: 'Our platform connects authors with the right editors, designers, and marketing specialists based on content analysis.',
      features: ['Editor recommendations', 'Designer pairing', 'Marketing strategy']
    },
    {
      icon: Globe,
      title: 'Global Distribution Network',
      description: 'Automated distribution to 50+ platforms worldwide with real-time sales tracking and royalty calculations.',
      features: ['Multi-platform publishing', 'Real-time analytics', 'Automated royalty calculation']
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecast book performance using historical data and market trends to optimize pricing and marketing strategies.',
      features: ['Sales forecasting', 'Price optimization', 'Marketing ROI tracking']
    }
  ]

  const features = [
    {
      icon: Clock,
      title: '10-Day Response Time',
      description: 'All manuscript submissions receive detailed feedback within 10 business days.'
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your work is protected with enterprise-grade security and confidentiality agreements.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Multi-stage review process ensures only the highest quality books reach publication.'
    },
    {
      icon: Zap,
      title: 'Streamlined Process',
      description: 'From submission to publication in as little as 30 days with our optimized workflow.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Generation 5 Publishing Technology
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-8 leading-tight">
              Publishing Technology for the{' '}
              <span className="text-brown-700">AI Age</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Our proprietary AI-powered platform revolutionizes every aspect of publishing,
              from manuscript analysis to global distribution. Experience the future of publishing today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/submit">
                  Submit Your Manuscript
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/books">
                  Explore Our Books
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6">
              Our Technology Stack
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Five generations of publishing innovation, powered by cutting-edge AI and machine learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8">
                  <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mb-6">
                    <tech.icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-black mb-4">
                    {tech.title}
                  </h3>
                  <p className="font-sans text-base text-gray-500 mb-6 leading-relaxed">
                    {tech.description}
                  </p>
                  <div className="space-y-2">
                    {tech.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="size-4 text-brown-700 flex-shrink-0" />
                        <span className="font-sans text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Why Authors Choose Our Technology
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Our platform doesn't just publish books—it creates publishing success stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-medium text-black mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              Ready to Experience the Future of Publishing?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Join thousands of authors who've transformed their publishing journey with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/submit">
                  Submit Your Manuscript
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/books">
                  View Our Books
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
