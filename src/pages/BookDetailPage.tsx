import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  Star,
  ShoppingCart,
  ExternalLink,
  Calendar,
  FileText,
  Globe,
  Award,
  User,
  CheckCircle
} from 'lucide-react'
import { books } from '../data/books'
import { testimonials } from '../data/testimonials'
import { useCart } from '../context/CartContext'
import { cn } from '../lib/utils'
import { Book } from '../types'

interface APIBook {
  name: string
  item_code?: string
  item_name?: string
  item_group?: string
  custom_price_tag?: number
  custom_mrp?: number
  custom_front_cover?: string | null
  custom_back_cover?: string | null
  custom_field_view?: string | null
  custom_title?: string
  custom_native_title?: string
  custom_author_alias?: string | null
  custom_author?: string | null
  custom_slug?: string | null
  custom_genere?: string | null
  custom_rating?: string
  custom_isbn?: string | null
  custom_pages?: number
  custom_lang?: string | null
  custom_language?: string | null
  custom_format?: string | null
  custom_date_of_publication?: string | null
  custom_release_date?: string | null
  custom_awards?: string | number | boolean | null
  custom_tags?: string | null
  custom_about_?: string | null
  custom_amazon_id?: string | null
  description?: string | null
  image?: string | null
  modified?: string
  creation?: string
  disabled?: number
  published_in_website?: number
  [key: string]: any  // Allow any additional fields from ERPNext
}

interface APIListResponse {
  data: { name: string }[]
}

interface APIDetailResponse {
  data: APIBook
}

interface APIResponse {
  data: APIBook[]
}

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Get initial data from SSR if available
  const ssrData = typeof window !== 'undefined' 
    ? (window as any).__INITIAL_DATA__?.bookDetailPage 
    : null

  const [book, setBook] = useState<Book | null>(ssrData?.book || null)
  const [relatedBooks, setRelatedBooks] = useState<Book[]>(ssrData?.relatedBooks || [])
  const [authorDetails, setAuthorDetails] = useState<any>(ssrData?.authorDetails || null)
  const [amazonId, setAmazonId] = useState<string | null>(ssrData?.amazonId || null)
  const [loading, setLoading] = useState(!ssrData)
  const { addItem } = useCart()

  useEffect(() => {
    // Skip fetch if we already have SSR data
    if (ssrData) {
      console.log('Using SSR data for BookDetailPage')
      return
    }

    const fetchBookDetails = async () => {
      console.log('Fetching book details for slug:', id)
      
      try {
        // Step 1: Get the item name using filters
        const params = new URLSearchParams({
          filters: JSON.stringify([
            ["item_group", "=", "Lorem Paperback Book"],
            ["custom_slug", "=", id]
          ]),
          fields: JSON.stringify(["name"])
        })

        const listResponse = await fetch(
          `https://fox.lorempress.co/api/resource/Item?${params.toString()}`,
          {
            headers: {
              'Authorization': 'token 37555e836101c2f:84dd7d46d343106'
            }
          }
        )

        if (!listResponse.ok) {
          throw new Error('Failed to fetch book list')
        }

        const listResult: APIListResponse = await listResponse.json()
        console.log('List API Response:', listResult)

        if (!listResult.data || listResult.data.length === 0) {
          console.log('No book found with slug:', id, '- Using fallback from books.ts')
          const fallbackBook = books.find(b => b.id === id) || books[0]
          setBook(fallbackBook || null)
          setLoading(false)
          return
        }

        // Step 2: Get full item details using the item name
        const itemName = listResult.data[0].name
        console.log('Found item name:', itemName, '- Fetching full details...')

        const detailResponse = await fetch(
          `https://fox.lorempress.co/api/resource/Item/${itemName}`,
          {
            headers: {
              'Authorization': 'token 37555e836101c2f:84dd7d46d343106'
            }
          }
        )

        if (!detailResponse.ok) {
          throw new Error('Failed to fetch full item details')
        }

        const detailResult: APIDetailResponse = await detailResponse.json()
        console.log('Full Item Details from ERPNext:', detailResult)
        console.log('Complete Item Data Object:', detailResult.data)

        if (detailResult.data) {
          const apiBook = detailResult.data
          console.log('All available fields:', Object.keys(apiBook))
          
          // Helper function to strip HTML tags
          const stripHtml = (html: string | null): string => {
            if (!html) return ''
            const tmp = document.createElement('div')
            tmp.innerHTML = html
            return tmp.textContent || tmp.innerText || ''
          }

          // Helper function to parse comma-separated tags
          const parseTags = (tags: string | null): string[] => {
            if (!tags) return []
            return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
          }

          // Transform API response to Book interface
          const transformedBook: Book = {
            id: apiBook.name || apiBook.item_code || apiBook.custom_slug || 'unknown',
            title: apiBook.custom_title || apiBook.custom_native_title || apiBook.item_name || 'Untitled',
            author: apiBook.custom_author_alias || apiBook.custom_author || 'Unknown Author',
            description: stripHtml(apiBook.description || null) || stripHtml(apiBook.custom_about_ || null) || '',
            price: apiBook.custom_price_tag || apiBook.custom_mrp || 0,
            originalPrice: apiBook.custom_mrp && apiBook.custom_mrp > (apiBook.custom_price_tag || 0) 
              ? apiBook.custom_mrp 
              : undefined,
            image: apiBook.custom_front_cover 
              ? `https://fox.lorempress.co${apiBook.custom_front_cover}` 
              : (apiBook.image ? `https://fox.lorempress.co${apiBook.image}` : ''),
            category: apiBook.custom_genere || apiBook.item_group || 'General',
            genres: apiBook.custom_genere ? [apiBook.custom_genere] : [],
            rating: parseFloat(apiBook.custom_rating || '0') || 0,
            reviewCount: 0,
            releaseDate: apiBook.custom_date_of_publication || apiBook.creation || new Date().toISOString(),
            pages: apiBook.custom_pages || 0,
            languages: apiBook.custom_lang 
              ? [apiBook.custom_lang === 'en' ? 'English' : apiBook.custom_lang === 'ml' ? 'Malayalam' : apiBook.custom_lang]
              : ['English'],
            format: ['Paperback'],
            awards: apiBook.custom_awards && apiBook.custom_awards !== '0' && apiBook.custom_awards !== 0
              ? [apiBook.custom_awards.toString()] 
              : undefined,
            isbn: apiBook.custom_isbn || undefined,
            tags: parseTags(apiBook.custom_tags || null)
          }

          console.log('Transformed book:', transformedBook)
          setBook(transformedBook)

          // Store Amazon ID if available and valid
          if (apiBook.custom_amazon_id && apiBook.custom_amazon_id.length > 5) {
            console.log('Amazon ID found:', apiBook.custom_amazon_id)
            setAmazonId(apiBook.custom_amazon_id)
          }

          // Fetch author details if custom_author is present
          if (apiBook.custom_author) {
            console.log('Fetching author details for ID:', apiBook.custom_author)
            try {
              const authorResponse = await fetch(
                `https://fox.lorempress.co/api/resource/Authors/${apiBook.custom_author}`,
                {
                  headers: {
                    'Authorization': 'token 37555e836101c2f:84dd7d46d343106'
                  }
                }
              )

              if (authorResponse.ok) {
                const authorResult = await authorResponse.json()
                console.log('Full Author Details from ERPNext:', authorResult)
                console.log('Complete Author Data:', authorResult.data)
                setAuthorDetails(authorResult.data)
              } else {
                console.log('Author not found or error fetching author details')
              }
            } catch (authorError) {
              console.error('Error fetching author details:', authorError)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching book details:', error)
        // Fallback to static books on error
        const fallbackBook = books.find(b => b.id === id) || books[0]
        setBook(fallbackBook || null)
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetails()
  }, [id])

  // Fetch related books from API
  useEffect(() => {
    // Skip fetch if we already have SSR data for related books
    if (ssrData?.relatedBooks && ssrData.relatedBooks.length > 0) {
      console.log('Using SSR data for related books')
      return
    }

    const fetchRelatedBooks = async () => {
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
            "description"
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
          throw new Error('Failed to fetch related books')
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
          id: apiBook.custom_slug || apiBook.item_code || apiBook.name,
          title: apiBook.custom_title || apiBook.custom_native_title || apiBook.item_name || 'Untitled',
          author: apiBook.custom_author_alias || apiBook.custom_author || 'Unknown Author',
          description: stripHtml(apiBook.description || null) || stripHtml(apiBook.custom_about_ || null) || '',
          price: apiBook.custom_price_tag || apiBook.custom_mrp || 0,
          originalPrice: apiBook.custom_mrp && apiBook.custom_mrp > (apiBook.custom_price_tag || 0) 
            ? apiBook.custom_mrp 
            : undefined,
          image: apiBook.custom_front_cover 
            ? `https://fox.lorempress.co${apiBook.custom_front_cover}` 
            : (apiBook.image ? `https://fox.lorempress.co${apiBook.image}` : ''),
          category: apiBook.custom_genere || apiBook.item_group || 'General',
          genres: apiBook.custom_genere ? [apiBook.custom_genere] : [],
          rating: parseFloat(apiBook.custom_rating || '0') || 0,
          reviewCount: 0,
          releaseDate: apiBook.custom_date_of_publication || apiBook.creation || new Date().toISOString(),
          pages: apiBook.custom_pages || 0,
          languages: apiBook.custom_lang 
            ? [apiBook.custom_lang === 'en' ? 'English' : apiBook.custom_lang === 'ml' ? 'Malayalam' : apiBook.custom_lang]
            : ['English'],
          format: ['Paperback']
        }))

        // Filter out current book and randomize
        const filteredBooks = transformedBooks.filter(b => b.id !== id)
        
        // Randomize array using Fisher-Yates shuffle
        const shuffled = [...filteredBooks]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }

        console.log('Fetched and randomized related books:', shuffled.slice(0, 4))
        setRelatedBooks(shuffled.slice(0, 4))
      } catch (error) {
        console.error('Error fetching related books:', error)
        // Fallback to static books on error
        const fallbackBooks = books.filter(b => b.id !== id).slice(0, 4)
        setRelatedBooks(fallbackBooks)
      }
    }

    fetchRelatedBooks()
  }, [id])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-700 mx-auto mb-4"></div>
          <p className="font-sans text-gray-500">Loading book details...</p>
        </div>
      </div>
    )
  }

  // If book not found, show error
  if (!book) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-normal text-gray-500 mb-4">
            Book Not Found
          </h1>
          <p className="font-sans text-gray-400 mb-8">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/books">Browse All Books</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image
    })
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group max-w-sm">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
              </div>
            </div>

            {/* Book Info */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-brown-800 text-white">
                  {book.category}
                </Badge>
                {/* Custom Tags - Only first 2 */}
                {book.tags && book.tags.length > 0 && book.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
                {book.originalPrice && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-4">
                {book.title}
              </h1>

              <p className="font-sans text-xl text-gray-500 mb-6">
                by {book.author}
              </p>

              {/* Rating */}
              {book.rating > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-5",
                          i < Math.floor(book.rating)
                            ? "fill-brown-700 text-brown-700"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-base text-gray-600 font-medium">
                    {book.rating.toFixed(1)}
                  </span>
                </div>
              )}

              <p className="font-sans text-base text-gray-600 leading-relaxed mb-8">
                {book.description}
              </p>

              {/* Pricing Card */}
              <Card className="bg-white shadow-lg relative overflow-hidden">
                {/* Award Winner Ribbon */}
                {book.awards && book.awards.length > 0 && (
                  <div className="absolute -left-7 top-2 w-28 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 text-center py-0.5 transform -rotate-45 shadow-md z-10">
                    <span className="font-sans text-[9px] font-bold tracking-tight">AWARD WINNER</span>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="font-sans text-3xl font-bold text-black">
                      ₹{book.price}
                    </span>
                    {book.originalPrice && (
                      <>
                        <span className="font-sans text-lg text-gray-400 line-through">
                          ₹{book.originalPrice}
                        </span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Save ₹{book.originalPrice - book.price}
                        </Badge>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="size-4" />
                      <span>Release: {new Date(book.releaseDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    {book.pages > 0 && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="size-4" />
                      <span>{book.pages} pages</span>
                    </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe className="size-4" />
                      <span>{book.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="size-4" />
                      <span>{book.format.join(', ')}</span>
                    </div>
                    {book.isbn && (
                      <div className="flex items-center gap-2 text-gray-600 col-span-2">
                        <FileText className="size-4" />
                        <span>ISBN: {book.isbn}</span>
                      </div>
                    )}
                  </div>

                  {book.awards && book.awards.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm font-medium text-gray-700 mb-2">Awards & Recognition</div>
                      <div className="flex flex-wrap gap-2">
                        {book.awards.map((award, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {award}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="size-4 text-green-600" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="size-4 text-green-600" />
                      <span>Ships from Kochi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="size-4 text-green-600" />
                      <span>30-day returns</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="size-4 mr-2" />
                      Add to Cart
                    </Button>

                    <Button variant="outline" size="lg" className="w-full" onClick={handleBuyNow}>
                      Buy Now
                    </Button>

                    {/* Amazon Purchase Button */}
                    {amazonId && (
                      <a
                        href={`https://amazon.in/dp/${amazonId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 border-0 text-gray-900 font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                          <img
                            src="/amz.png"
                            alt="Amazon"
                            className="h-6 w-auto mr-2 mix-blend-multiply"
                          />
                          Buy from Amazon
                          <ExternalLink className="size-4 ml-2" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Book Details Tabs */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            {/* About Section */}
            <div className="prose prose-lg max-w-none">
              <h2 className="font-serif text-2xl font-normal text-black mb-6">
                About This Book
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  {book.description}
                </p>
                {book.genres.length > 0 && (
                <p>
                  This compelling narrative explores themes of {book.genres.join(', ').toLowerCase()},
                  offering readers a thought-provoking journey through contemporary issues
                  that resonate with our rapidly changing world.
                </p>
                )}
                {(book.languages.length > 0 || book.format.length > 0) && (
                <p>
                    Available in {book.languages.join(', ')} 
                    {book.format.length > 0 && ` in ${book.format.join(', ')} format`}.
                    This book has been carefully crafted to reach readers,
                  breaking down barriers of language and accessibility.
                </p>
                )}
              </div>
            </div>

            {/* Key Themes */}
            {book.tags && book.tags.length > 2 && (
            <div className="mt-12">
              <h3 className="font-serif text-xl font-normal text-black mb-6">
                Key Themes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {book.tags.slice(2).map((theme, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-brown-700 flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-base text-gray-700">{theme}</span>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* About the Author */}
            {authorDetails && (
              <div className="mt-16">
                <h3 className="font-serif text-2xl font-normal text-black mb-8">
                  About the Author
                </h3>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="h-[50px] w-[50px] rounded-full overflow-hidden bg-gray-100">
                      {authorDetails.image ? (
                        <img
                          src={`https://fox.lorempress.co${authorDetails.image}`}
                          alt={authorDetails.alias || book.author}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>'
                            }
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                          <User className="size-6" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-xl font-medium text-black mb-4">
                      {authorDetails.alias || book.author}
                    </h4>
                    <div className="space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
                      {authorDetails.about_author || (
                        <>
                          <p>
                            {book.author} is a talented author whose work explores contemporary themes
                            and social issues. Their writing has been praised for its depth, authenticity,
                            and ability to connect with readers on a personal level.
                          </p>
                          <p>
                            With a background in literature and a passion for storytelling, {book.author}
                            brings unique perspectives to their work, making them a distinctive voice
                            in modern literature.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section - Hidden */}
      <section className="section-padding bg-cream-50 hidden">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-normal text-black mb-8 text-center">
              What Readers Are Saying
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(0, 4).map((testimonial) => (
                <Card key={testimonial.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex text-brown-700 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="font-sans text-base text-gray-700 leading-relaxed mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="size-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-serif text-base font-medium text-black">
                          {testimonial.author}
                        </div>
                        <div className="font-sans text-sm text-gray-500">
                          Verified Purchase
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-normal text-black mb-4">
                Readers Also Enjoyed
              </h2>
              <p className="font-sans text-gray-500">
                Discover more books in similar genres and themes
              </p>
            </div>

            {relatedBooks.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-700"></div>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedBooks.map((relatedBook) => (
                <Card key={relatedBook.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardContent className="p-0">
                    <Link to={`/books/${relatedBook.id}`}>
                      <div className="aspect-[3/4] rounded-t-lg overflow-hidden">
                        <img
                          src={relatedBook.image}
                          alt={relatedBook.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {relatedBook.category}
                        </Badge>
                        <h3 className="font-serif text-base font-medium text-black mb-1 group-hover:text-brown-700 transition-colors line-clamp-2">
                          {relatedBook.title}
                        </h3>
                        <p className="font-sans text-sm text-gray-500 mb-3">
                          by {relatedBook.author}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-base font-medium text-black">
                            ₹{relatedBook.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="size-3 fill-brown-700 text-brown-700" />
                            <span className="font-sans text-xs text-gray-500">
                              {relatedBook.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brown-800 to-brown-700 text-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              Ready to Experience {book.title}?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Join thousands of readers discovering this transformative story.
              Order now and begin your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 py-4"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="size-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-4 border-white text-white hover:bg-white hover:text-brown-800"
                onClick={handleBuyNow}
              >
                Buy Now
                <ExternalLink className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
