import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  Award,
  Star,
  Calendar,
  Users,
  BookOpen,
  TrendingUp
} from 'lucide-react'

export function AwardsPage() {
  const awardCategories = [
    {
      title: 'Emerging Voices Award',
      description: 'Recognizing debut authors who demonstrate exceptional storytelling and fresh perspectives.',
      criteria: ['First-time authors', 'Innovative storytelling', 'Market potential', 'Literary excellence']
    },
    {
      title: 'Digital Innovation in Literature',
      description: 'Celebrating works that explore the intersection of technology and human experience.',
      criteria: ['Technology themes', 'Contemporary relevance', 'Cultural impact', 'Reader engagement']
    },
    {
      title: 'Global Impact Award',
      description: 'Honoring books that transcend cultural boundaries and reach international audiences.',
      criteria: ['Multi-language success', 'Cross-cultural appeal', 'Social impact', 'Market performance']
    }
  ]

  const recentWinners = [
    {
      title: 'Digital Dharma',
      author: 'Dr. Priya Nair',
      award: 'Digital Innovation in Literature 2024',
      category: 'Technology & Philosophy',
      description: 'A groundbreaking exploration of technology\'s role in spiritual growth and human consciousness.'
    },
    {
      title: 'Kerala 2040',
      author: 'രവിചന്ദ്രൻ കെ',
      award: 'Regional Excellence Award 2024',
      category: 'Regional Fiction',
      description: 'A visionary look at Kerala\'s future through the eyes of ordinary people.'
    },
    {
      title: 'Quantum Minds',
      author: 'Dr. Amit Sharma',
      award: 'Scientific Communication Award 2024',
      category: 'Science & Philosophy',
      description: 'Making complex quantum concepts accessible to general audiences.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Award-Winning Books' },
    { number: '25', label: 'Different Categories' },
    { number: '12', label: 'Countries Represented' },
    { number: '100K+', label: 'Readers Reached' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Excellence in Publishing
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-8 leading-tight">
              Celebrating Literary{' '}
              <span className="text-brown-700">Excellence</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Our awards recognize outstanding authors and books that push the boundaries of storytelling,
              challenge conventions, and inspire readers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/submit">
                  Submit for Consideration
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/books">
                  Browse Award Winners
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-normal text-black mb-2">
                  {stat.number}
                </div>
                <div className="font-sans text-sm md:text-base text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Award Categories */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Award Categories
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              We recognize excellence across multiple categories of literary achievement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {awardCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8">
                  <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mb-6">
                    <Award className="size-6 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-black mb-4">
                    {category.title}
                  </h3>
                  <p className="font-sans text-base text-gray-500 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    <div className="font-sans text-sm font-medium text-brown-700 mb-2">
                      Judging Criteria:
                    </div>
                    {category.criteria.map((criterion, criterionIndex) => (
                      <div key={criterionIndex} className="flex items-center gap-2">
                        <div className="size-1.5 bg-brown-700 rounded-full" />
                        <span className="font-sans text-sm text-gray-600">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Recent Award Winners
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Celebrating the authors and books that have earned recognition for their outstanding contributions
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {recentWinners.map((winner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden">
                        <img
                          src={`/images/books/${winner.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                          alt={winner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 flex flex-col justify-center">
                      <div className="mb-4">
                        <Badge className="mb-3 bg-brown-700 text-white hover:bg-brown-800">
                          {winner.award}
                        </Badge>
                        <h3 className="font-serif text-2xl font-normal text-black mb-2">
                          {winner.title}
                        </h3>
                        <p className="font-sans text-lg text-brown-700 mb-3">
                          by {winner.author}
                        </p>
                        <Badge variant="outline" className="mb-4">
                          {winner.category}
                        </Badge>
                      </div>
                      <p className="font-sans text-gray-500 leading-relaxed">
                        {winner.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              Ready to Be Recognized?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Submit your work for award consideration and join the ranks of our celebrated authors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/submit">
                  Submit for Awards
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/books">
                  Browse Winners
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
