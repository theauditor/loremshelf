import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Heart,
  Mail
} from 'lucide-react'

export function CareersPage() {
  const positions = [
    {
      title: 'Senior Editor',
      department: 'Editorial',
      location: 'Kochi, Kerala',
      type: 'Full-time',
      description: 'Lead editorial projects and mentor junior editors in our AI-powered publishing workflow.'
    },
    {
      title: 'AI/ML Engineer',
      department: 'Technology',
      location: 'Kochi, Kerala',
      type: 'Full-time',
      description: 'Develop and maintain our proprietary AI systems for manuscript analysis and publishing optimization.'
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Kochi, Kerala',
      type: 'Full-time',
      description: 'Create and execute marketing campaigns for our diverse catalog of books across multiple platforms.'
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs for all employees.'
    },
    {
      icon: Award,
      title: 'Professional Development',
      description: 'Continuous learning opportunities and conference attendance support.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Clear career progression paths in our rapidly expanding company.'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with passionate publishing professionals in an innovative environment.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Join Our Team
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-8 leading-tight">
              Build the Future of{' '}
              <span className="text-brown-700">Publishing</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join Lorem and be part of revolutionizing publishing through AI and technology.
              We're looking for passionate individuals who believe in the power of storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:careers@lorem.com">
                  Send Your Resume
                  <Mail className="ml-2 size-5" />
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Current Openings
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Join our growing team and help shape the future of publishing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {positions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {position.type}
                      </Badge>
                      <Badge className="text-xs bg-brown-100 text-brown-700">
                        {position.department}
                      </Badge>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-black mb-1">
                      {position.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      {position.location}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed">
                    {position.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Why Work With Us
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              We offer competitive benefits and a culture that supports work-life balance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-medium text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="font-sans text-sm text-gray-500">
                  {benefit.description}
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
              Ready to Join Our Team?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Send us your resume and tell us why you're passionate about publishing innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="mailto:careers@lorem.com">
                  Send Your Resume
                  <Mail className="ml-2 size-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
