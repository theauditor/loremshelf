import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import {
  Search,
  Star,
  ArrowRight,
  BookOpen
} from 'lucide-react'
import { books as fallbackBooks } from '../data/books'
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
}

interface APIResponse {
  data: APIBook[]
}

export function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
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
          throw new Error('Failed to fetch books')
        }

        const result: APIResponse = await response.json()
        console.log('Raw API response:', result)

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
          releaseDate: new Date().toISOString(),
          pages: 0,
          languages: ['English'],
          format: ['Paperback']
        }))

        console.log('Fetched books from API:', transformedBooks)
        console.log('Number of books:', transformedBooks.length)
        setBooks(transformedBooks)
      } catch (error) {
        console.error('Error fetching books:', error)
        // Fallback to static books on error
        setBooks(fallbackBooks)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const categories = ['all', ...new Set(books.map(book => book.category))]
  const genres = ['all', ...new Set(books.flatMap(book => book.genres))]

  const filteredAndSortedBooks = useMemo(() => {
    console.log('Books state in useMemo:', books.length)
    console.log('Filter params:', { searchQuery, selectedCategory, selectedGenre, sortBy })
    
    let filtered = books.filter(book => {
      const matchesSearch = searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
      const matchesGenre = selectedGenre === 'all' || book.genres.includes(selectedGenre)

      return matchesSearch && matchesCategory && matchesGenre
    })

    console.log('Filtered books count:', filtered.length)

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case 'oldest':
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'bestselling':
          return b.reviewCount - a.reviewCount
        default:
          return 0
      }
    })

    return filtered
  }, [books, searchQuery, selectedCategory, selectedGenre, sortBy])

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all' || value === 'newest' || value === '') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    updateSearchParams('search', value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    updateSearchParams('category', value)
  }

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value)
    updateSearchParams('genre', value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    updateSearchParams('sort', value)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6">
              Our Book Collection
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of visionary works that challenge conventions
              and inspire transformation across multiple languages and formats.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                <Input
                  placeholder="Search books, authors, or genres..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.filter(c => c !== 'all').map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedGenre} onValueChange={handleGenreChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.filter(g => g !== 'all').map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="bestselling">Bestselling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleSearchChange('')}>
                  Search: "{searchQuery}" ×
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleCategoryChange('all')}>
                  Category: {selectedCategory} ×
                </Badge>
              )}
              {selectedGenre !== 'all' && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleGenreChange('all')}>
                  Genre: {selectedGenre} ×
                </Badge>
              )}
              {sortBy !== 'newest' && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleSortChange('newest')}>
                  Sort: {sortBy.replace('-', ' ')} ×
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brown-700"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-normal text-black">
                  {filteredAndSortedBooks.length} Book{filteredAndSortedBooks.length !== 1 ? 's' : ''} Found
                </h2>
              </div>

              {filteredAndSortedBooks.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="size-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-medium text-gray-500 mb-4">
                    No books found
                  </h3>
                  <p className="font-sans text-gray-400 mb-8 max-w-md mx-auto">
                    Try adjusting your search criteria or browse our complete collection.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedGenre('all')
                    setSortBy('newest')
                    setSearchParams(new URLSearchParams())
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAndSortedBooks.map((book) => (
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
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {book.category}
                              </Badge>
                              {book.originalPrice && (
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-serif text-lg font-medium text-black mb-1 group-hover:text-brown-700 transition-colors line-clamp-2">
                              {book.title}
                            </h3>
                            <p className="font-sans text-sm text-gray-500 mb-3">
                              by {book.author}
                            </p>
                            {book.description && (
                              <p className="font-sans text-sm text-gray-600 mb-4 line-clamp-2">
                                {book.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-sans text-lg font-medium text-black">
                                  {book.price > 0 ? `₹${book.price}` : 'Price TBA'}
                                </span>
                                {book.originalPrice && (
                                  <span className="font-sans text-sm text-gray-400 line-through">
                                    ₹{book.originalPrice}
                                  </span>
                                )}
                              </div>
                              {book.rating > 0 && (
                                <div className="flex items-center gap-1">
                                  <Star className="size-3 fill-brown-700 text-brown-700" />
                                  <span className="font-sans text-xs text-gray-500">
                                    {book.rating} {book.reviewCount > 0 && `(${book.reviewCount})`}
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
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
              Looking for Something Specific?
            </h2>
            <p className="font-sans text-lg text-gray-500 mb-8">
              Can't find what you're looking for? Get in touch and we'll help you discover your next great read
              or consider publishing your own work with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/submit">
                  Submit Your Manuscript
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
