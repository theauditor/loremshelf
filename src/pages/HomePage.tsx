import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Users,
  Globe,
  Award,
  Star,
  Zap
} from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { books } from '../data/books'
import { Book } from '../types'

interface APIBook {
  name: string
  item_code: string
  custom_price_tag: number
  custom_front_cover: string | null
  custom_title: string
  custom_author_alias: string | null
  custom_slug: string | null
  custom_genere: string | null
  custom_rating: string
  description: string | null
  custom_date_of_publication: string | null
}

interface APIResponse {
  data: APIBook[]
}

export function HomePage() {
  // Get initial data from SSR if available
  const ssrData = typeof window !== 'undefined' 
    ? (window as any).__INITIAL_DATA__?.homePage 
    : null

  const [latestBooks, setLatestBooks] = useState<Book[]>(ssrData?.latestBooks || [])
  const [loading, setLoading] = useState(!ssrData)

  useEffect(() => {
    // Skip fetch if we already have SSR data
    if (ssrData) {
      console.log('Using SSR data for HomePage')
      return
    }

    const fetchLatestReleases = async () => {
      try {
        const params = new URLSearchParams({
          filters: JSON.stringify([["item_group", "=", "Lorem Paperback Book"]]),
          fields: JSON.stringify([
            "name",
            "item_code",
            "custom_price_tag",
            "custom_front_cover",
            "custom_title",
            "custom_author_alias",
            "custom_slug",
            "custom_genere",
            "custom_rating",
            "description",
            "custom_date_of_publication"
          ])
        })

        const response = await fetch(
          `https://fox.lorempress.co/api/resource/Item?${params.toString()}`,
          {
            headers: {
              'Authorization': 'token 37555e836101c2f:84dd7d46d343106'
            }
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }

        const result: APIResponse = await response.json()

        // Helper function to strip HTML tags
        const stripHtml = (html: string | null): string => {
          if (!html) return ''
          const tmp = document.createElement('div')
          tmp.innerHTML = html
          return tmp.textContent || tmp.innerText || ''
        }

        // Transform API response to Book interface
        const transformedBooks: Book[] = result.data.map((apiBook) => ({
          id: apiBook.custom_slug || apiBook.item_code,
          title: apiBook.custom_title,
          author: apiBook.custom_author_alias || 'Unknown Author',
          description: stripHtml(apiBook.description),
          price: apiBook.custom_price_tag || 0,
          image: apiBook.custom_front_cover 
            ? `https://fox.lorempress.co${apiBook.custom_front_cover}` 
            : '',
          category: apiBook.custom_genere || 'General',
          genres: apiBook.custom_genere ? [apiBook.custom_genere] : [],
          rating: parseFloat(apiBook.custom_rating) || 0,
          reviewCount: 0,
          releaseDate: apiBook.custom_date_of_publication || new Date().toISOString(),
          pages: 0,
          languages: ['English'],
          format: ['Paperback']
        }))

        // Sort books by publishing date (most recent first)
        const sortedBooks = transformedBooks.sort((a, b) => {
          const dateA = new Date(a.releaseDate).getTime()
          const dateB = new Date(b.releaseDate).getTime()
          return dateB - dateA // Descending order (newest first)
        })

        console.log('Fetched books from API (sorted by date):', sortedBooks)
        setLatestBooks(sortedBooks.slice(0, 3))
      } catch (error) {
        console.error('Error fetching latest releases:', error)
        // Fallback to static books on error
        setLatestBooks(books.slice(0, 3))
      } finally {
        setLoading(false)
      }
    }

    fetchLatestReleases()
  }, [])
  const features = [
    {
      icon: BookOpen,
      title: 'AI Submission Management',
      description: 'Instant classification and editorial routing powered by advanced AI'
    },
    {
      icon: Users,
      title: 'AI + Human Editing',
      description: 'Precision corrections without loss of voice, combining technology with expertise'
    },
    {
      icon: Globe,
      title: 'Global Distribution',
      description: 'Multi-format, multi-language distribution reaching readers worldwide'
    },
    {
      icon: Award,
      title: 'Transparent Royalties',
      description: 'Know exactly how your royalties are calculated with full transparency'
    },
    {
      icon: Zap,
      title: 'Market Prediction',
      description: 'Advanced analytics to understand your target audience before launch'
    },
    {
      icon: Star,
      title: '20-Year Support',
      description: 'Comprehensive author support ecosystem for your entire career'
    }
  ]

  const stats = [
    { number: '7', label: 'Books Published' },
    { number: '18+', label: 'Languages Supported' },
    { number: '1', label: 'Award Winner' },
    { number: '20+', label: 'Upcoming' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              India's First Generation 5 Full-Stack Publishing House
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-8 leading-tight">
              Transcending Publishing in the{' '}
              <span className="text-brown-700">AI & Tech Age</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Lorem exists to challenge the norms, bypass gatekeepers, and bring author-first publishing to life.<br/>
              We don't just publish books—we design legacies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base px-8 py-4">
                <Link to="/books">
                  Browse Our Books
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild className="text-base px-8 py-4">
                <Link to="/submit">
                  Submit Your Manuscript
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Releases */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-4">
              Latest Releases
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto">
              Discover our newest titles, fresh from the press and ready to inspire
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-700"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {latestBooks.map((book) => (
                  <Card key={book.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                    <CardContent className="p-0">
                      <Link to={`/books/${book.id}`}>
                        <div className="aspect-[3/4] rounded-t-lg overflow-hidden bg-gray-200 flex items-center justify-center relative">
                          {book.image ? (
                            <>
                              <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  const target = e.currentTarget
                                  target.style.display = 'none'
                                  const parent = target.parentElement
                                  if (parent) {
                                    const placeholder = document.createElement('div')
                                    placeholder.className = 'flex flex-col items-center justify-center w-full h-full text-gray-400 absolute inset-0'
                                    placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg><span class="text-sm">No Cover</span>'
                                    parent.appendChild(placeholder)
                                  }
                                }}
                              />
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                              <BookOpen className="size-16 mb-2" />
                              <span className="text-sm">No Cover</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <Badge className="mb-2 bg-brown-700 text-white hover:bg-brown-800">
                            {book.category}
                          </Badge>
                          <h3 className="font-serif text-base font-medium text-black mb-1 group-hover:text-brown-800 transition-colors line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="font-sans text-sm text-gray-500 mb-2">
                            by {book.author}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-sans text-base font-medium text-black">
                              {book.price > 0 ? `₹${book.price}` : 'Price TBA'}
                            </span>
                            {book.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="size-3 fill-brown-800 text-brown-800" />
                                <span className="font-sans text-xs text-gray-500">
                                  {book.rating}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/books">
                    View All Books
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-8">
              Are You an Author With a Story That Deserves the World?
            </h2>

            <p className="font-sans text-lg md:text-xl text-gray-500 mb-12 leading-relaxed">
              At Lorem, we've dismantled outdated traditions and rebuilt the process,
              powered by AI, optimized for speed, and engineered for author autonomy.
            </p>

            <div className="text-center">
              <p className="font-serif text-xl md:text-2xl font-medium text-black">
                This is visionary publishing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Why Authors Choose Us */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-black text-center mb-16">
            Why Authors Choose Lorem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Manuscript feedback within 10 days',
              'Constructive responses, even for rejections',
              'Global, multi-format, multi-language distribution',
              'Know exactly how your royalties are calculated',
            ].map((text, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="size-6 text-brown-700 flex-shrink-0 mt-1" />
                  <span className="font-sans text-base font-medium text-black">
                    {text}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6">
              Powered by Full-Stack AI, Crafted With Soul
            </h2>
            <p className="font-sans text-lg md:text-xl text-gray-500 max-w-4xl mx-auto leading-relaxed">
              From manuscript ingestion to global launch, every layer of Lorem is optimized by advanced technology.<br/>
              while maintaining the human touch that makes stories resonate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8 flex flex-col">
                  <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-base text-gray-500 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="font-sans text-lg font-semibold text-black max-w-3xl mx-auto">
              You write. We handle the rest—beautifully, transparently, and globally.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6">
              Voices That Echo Across Borders
            </h2>
            <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto">
              Hear from authors who've transformed their writing careers with Lorem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8 flex flex-col">
                  <div className="flex text-brown-700 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-sans text-base text-gray-700 leading-relaxed mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-serif text-lg font-medium text-black mb-1">
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


      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal mb-8">
              Ready to Submit Your Manuscript?
            </h2>

            <p className="font-sans text-lg md:text-xl mb-8 opacity-90">
              Join thousands of authors who've found their publishing home with Lorem.
              Submit your manuscript today and let's create something extraordinary together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-base px-8 py-4">
                <Link to="/submit">
                  Submit Your Manuscript
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild className="text-base px-8 py-4 border-white text-white hover:bg-white hover:text-brown-800">
                <a href="mailto:hello@lorem.com">
                  Get in Touch
                </a>
              </Button>
            </div>

            <div className="mt-8 text-sm opacity-75">
              <p>Questions? Reach out to us at{' '}
                <a href="mailto:hello@lorem.com" className="underline hover:no-underline">
                  hello@lorem.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
