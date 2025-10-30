import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  Quote,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Star,
  BookOpen
} from 'lucide-react'

export function SuccessStoriesPage() {
  const successStories = [
    {
      id: 'digital-dharma',
      title: 'Digital Dharma: From Manuscript to Global Phenomenon',
      author: 'Dr. Priya Nair',
      category: 'Technology & Philosophy',
      story: 'Dr. Priya Nair\'s groundbreaking exploration of technology and spirituality started as a personal journey. Within 35 days of submission, "Digital Dharma" became a global bestseller, translated into 12 languages and reaching over 100,000 readers worldwide.',
      metrics: {
        daysToPublish: '35 days',
        languages: '12 languages',
        readers: '100,000+ readers',
        rating: '4.8 stars'
      },
      quote: 'Lorem Press didn\'t just publish my book—they transformed my entire career. The AI-powered insights helped me understand my audience in ways I never thought possible.',
      image: '/images/books/digital-dharma.jpg'
    },
    {
      id: 'kerala-2040',
      title: 'Kerala 2040: Regional Story, Global Impact',
      author: 'രവിചന്ദ്രൻ കെ',
      category: 'Regional Fiction',
      story: 'A Malayalam author\'s vision of Kerala\'s future resonated far beyond regional boundaries. The book\'s success in multiple languages proved that powerful storytelling transcends cultural barriers.',
      metrics: {
        daysToPublish: '42 days',
        languages: '8 languages',
        readers: '75,000+ readers',
        rating: '4.7 stars'
      },
      quote: 'I never imagined my regional story would find such a global audience. Lorem\'s technology made the impossible possible.',
      image: '/images/books/kerala-2040.jpg'
    },
    {
      id: 'quantum-minds',
      title: 'Quantum Minds: Academic Excellence Meets Popular Appeal',
      author: 'Dr. Amit Sharma',
      category: 'Science & Philosophy',
      story: 'Dr. Sharma\'s complex exploration of quantum physics and consciousness became an unexpected bestseller. The book\'s success proved that academic rigor and accessibility can coexist.',
      metrics: {
        daysToPublish: '28 days',
        languages: '6 languages',
        readers: '50,000+ readers',
        rating: '4.9 stars'
      },
      quote: 'The editorial process was incredibly thorough. They helped me make complex ideas accessible without losing their depth.',
      image: '/images/books/quantum-minds.jpg'
    }
  ]

  const testimonials = [
    {
      quote: 'Lorem Press transformed my manuscript into a globally recognized work in just 35 days.',
      author: 'Dr. Priya Nair',
      book: 'Digital Dharma',
      rating: 5
    },
    {
      quote: 'As a Malayalam author, I never imagined my work would reach global readers. Lorem Press made it effortless.',
      author: 'രവിചന്ദ്രൻ കെ',
      book: 'Kerala 2040',
      rating: 5
    },
    {
      quote: 'With Lorem\'s 20-year support vision, I finally feel safe writing for the future.',
      author: 'Dr. Amit Sharma',
      book: 'Quantum Minds',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Author Success Stories
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-8 leading-tight">
              From Manuscript to{' '}
              <span className="text-brown-700">Bestseller</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover how authors like you have transformed their writing careers with Lorem.
              These success stories showcase the power of our AI-powered publishing platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/submit">
                  Start Your Success Story
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/books">
                  Browse Our Books
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Featured Success Stories
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Real authors, real results. Discover how our platform has transformed publishing careers
            </p>
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="aspect-[3/4] lg:aspect-square">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="mb-4">
                        <Badge className="mb-3 bg-brown-700 text-white hover:bg-brown-800">
                          {story.category}
                        </Badge>
                        <h3 className="font-serif text-2xl font-normal text-black mb-2">
                          {story.title}
                        </h3>
                        <p className="font-sans text-lg text-brown-700 mb-4">
                          by {story.author}
                        </p>
                      </div>

                      <p className="font-sans text-gray-500 mb-6 leading-relaxed">
                        {story.story}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-cream-100 rounded-lg">
                          <div className="font-serif text-lg font-medium text-black">
                            {story.metrics.daysToPublish}
                          </div>
                          <div className="font-sans text-xs text-gray-500">to publish</div>
                        </div>
                        <div className="text-center p-3 bg-cream-100 rounded-lg">
                          <div className="font-serif text-lg font-medium text-black">
                            {story.metrics.languages}
                          </div>
                          <div className="font-sans text-xs text-gray-500">translations</div>
                        </div>
                        <div className="text-center p-3 bg-cream-100 rounded-lg">
                          <div className="font-serif text-lg font-medium text-black">
                            {story.metrics.readers}
                          </div>
                          <div className="font-sans text-xs text-gray-500">readers reached</div>
                        </div>
                        <div className="text-center p-3 bg-cream-100 rounded-lg">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="size-3 fill-brown-700 text-brown-700" />
                            <span className="font-serif text-lg font-medium text-black">
                              {story.metrics.rating}
                            </span>
                          </div>
                          <div className="font-sans text-xs text-gray-500">average rating</div>
                        </div>
                      </div>

                      <blockquote className="bg-brown-50 border-l-4 border-brown-700 p-4 rounded-r-lg">
                        <div className="flex items-start gap-3">
                          <Quote className="size-5 text-brown-700 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-sans text-gray-700 italic mb-2">
                              "{story.quote}"
                            </p>
                            <div className="font-serif text-sm font-medium text-brown-700">
                              — {story.author}
                            </div>
                          </div>
                        </div>
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              What Authors Say
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Hear directly from authors who've experienced success with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8 flex flex-col">
                  <div className="flex text-brown-700 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-sans text-base text-gray-700 leading-relaxed mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-serif text-base font-medium text-black mb-1">
                      {testimonial.author}
                    </div>
                    <div className="font-sans text-sm text-gray-500">
                      Author of "{testimonial.book}"
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
                Award Winners
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-normal text-black mb-2">
                35
              </div>
              <div className="font-sans text-sm md:text-base text-gray-500">
                Days Average
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
              Ready to Write Your Success Story?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Join thousands of authors who've transformed their publishing journey with Lorem.
              Your success story starts with a single submission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/submit">
                  Submit Your Manuscript
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brown-800" asChild>
                <Link to="/submit">
                  Read Guidelines
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
