import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { fetch } from 'undici'
import App from './App'

// API Configuration
const API_BASE = 'https://fox.lorempress.co'
const API_TOKEN = 'token 37555e836101c2f:84dd7d46d343106'

// Helper function to strip HTML tags (for Node.js environment)
const stripHtml = (html: string | null): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

// Fetch books from API
async function fetchBooks() {
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
      `${API_BASE}/api/resource/Item?${params.toString()}`,
      {
        headers: {
          'Authorization': API_TOKEN
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }

    const result = await response.json()
    
    // Transform API response - use "NULL" for missing data
    return result.data.map((apiBook: any) => ({
      id: apiBook.custom_slug || apiBook.item_code || 'NULL',
      title: apiBook.custom_title || 'NULL',
      author: apiBook.custom_author_alias || 'NULL',
      description: stripHtml(apiBook.description) || 'NULL',
      price: apiBook.custom_price_tag || 0,
      image: apiBook.custom_front_cover 
        ? `${API_BASE}${apiBook.custom_front_cover}` 
        : `${API_BASE}/files/placeholder.png`,
      category: apiBook.custom_genere || 'General',
      genres: apiBook.custom_genere ? [apiBook.custom_genere] : [],
      rating: parseFloat(apiBook.custom_rating) || 0,
      reviewCount: 0,
      releaseDate: new Date().toISOString(),
      pages: 0,
      languages: ['English'],
      format: ['Paperback']
    }))
  } catch (error) {
    console.error('SSR: Error fetching books:', error)
    return []
  }
}

// Fetch book detail by slug
async function fetchBookDetail(slug: string) {
  try {
    // Step 1: Get the item name using filters
    const params = new URLSearchParams({
      filters: JSON.stringify([
        ["item_group", "=", "Lorem Paperback Book"],
        ["custom_slug", "=", slug]
      ]),
      fields: JSON.stringify(["name"])
    })

    const listResponse = await fetch(
      `${API_BASE}/api/resource/Item?${params.toString()}`,
      {
        headers: {
          'Authorization': API_TOKEN
        }
      }
    )

    if (!listResponse.ok) {
      throw new Error('Failed to fetch book list')
    }

    const listResult = await listResponse.json()

    if (!listResult.data || listResult.data.length === 0) {
      return null
    }

    // Step 2: Get full item details
    const itemName = listResult.data[0].name
    const detailResponse = await fetch(
      `${API_BASE}/api/resource/Item/${itemName}`,
      {
        headers: {
          'Authorization': API_TOKEN
        }
      }
    )

    if (!detailResponse.ok) {
      throw new Error('Failed to fetch book details')
    }

    const detailResult = await detailResponse.json()
    const apiBook = detailResult.data

    // Parse tags
    const parseTags = (tags: string | null): string[] => {
      if (!tags) return []
      return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    }

    // Transform to Book interface - use "NULL" for missing data
    const book = {
      id: apiBook.name || apiBook.item_code || apiBook.custom_slug || 'NULL',
      title: apiBook.custom_title || apiBook.custom_native_title || apiBook.item_name || 'NULL',
      author: apiBook.custom_author_alias || apiBook.custom_author || 'NULL',
      description: stripHtml(apiBook.description || apiBook.custom_about_ || '') || 'NULL',
      price: apiBook.custom_price_tag || apiBook.custom_mrp || 0,
      originalPrice: apiBook.custom_mrp && apiBook.custom_mrp > (apiBook.custom_price_tag || 0) 
        ? apiBook.custom_mrp 
        : undefined,
      image: apiBook.custom_front_cover 
        ? `${API_BASE}${apiBook.custom_front_cover}` 
        : (apiBook.image ? `${API_BASE}${apiBook.image}` : `${API_BASE}/files/placeholder.png`),
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
      isbn: apiBook.custom_isbn || 'NULL',
      tags: parseTags(apiBook.custom_tags || null)
    }

    // Extract Amazon ID - use "NULL" if missing
    let amazonId = null
    if (apiBook.custom_amazon_id && apiBook.custom_amazon_id.length > 5) {
      amazonId = apiBook.custom_amazon_id
    } else {
      console.log('SSR: No Amazon ID found for book')
    }

    // Fetch author details if available
    let authorDetails = null
    if (apiBook.custom_author) {
      try {
        const authorResponse = await fetch(
          `${API_BASE}/api/resource/Authors/${apiBook.custom_author}`,
          {
            headers: {
              'Authorization': API_TOKEN
            }
          }
        )
        if (authorResponse.ok) {
          const authorResult = await authorResponse.json()
          authorDetails = authorResult.data
          console.log('SSR: Author details fetched successfully')
        } else {
          console.log('SSR: Author API returned non-OK status')
        }
      } catch (authorError) {
        console.error('SSR: Error fetching author details:', authorError)
      }
    } else {
      console.log('SSR: No custom_author field found for book')
    }

    return { book, authorDetails, amazonId }
  } catch (error) {
    console.error('SSR: Error fetching book detail:', error)
    return null
  }
}

// Main render function with SSR data fetching
export async function render(url: string) {
  let initialData: any = {}

  // Normalize URL to always have a leading slash for React Router
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`

  console.log(`SSR: Rendering URL: ${url} (normalized: ${normalizedUrl})`)

  // Determine route and fetch data accordingly
  if (url === '/' || url === '') {
    console.log('SSR: Fetching data for HomePage')
    const books = await fetchBooks()
    initialData.homePage = {
      latestBooks: books.slice(0, 3),
      loading: false
    }
  } else if (url === '/books' || url === 'books') {
    console.log('SSR: Fetching data for BooksPage')
    const books = await fetchBooks()
    initialData.booksPage = {
      books: books,
      loading: false
    }
    console.log(`SSR: Fetched ${books.length} books for BooksPage`)
  } else if (url.startsWith('/books/') || url.startsWith('books/')) {
    const slug = url.replace('/books/', '').replace('books/', '').split('?')[0]
    console.log(`SSR: Fetching data for BookDetailPage (slug: ${slug})`)
    const bookData = await fetchBookDetail(slug)
    console.log(`SSR: Book data fetched:`, bookData ? 'Success' : 'Failed/Null')
    if (bookData) {
      initialData.bookDetailPage = {
        book: bookData.book,
        authorDetails: bookData.authorDetails,
        amazonId: bookData.amazonId,
        loading: false
      }
      console.log(`SSR: Book title: ${bookData.book?.title}, Author: ${bookData.authorDetails?.alias || 'N/A'}`)
      // Fetch related books
      const allBooks = await fetchBooks()
      initialData.bookDetailPage.relatedBooks = allBooks
        .filter(b => b.id !== slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
      console.log(`SSR: Related books count: ${initialData.bookDetailPage.relatedBooks.length}`)
    } else {
      console.error(`SSR: Failed to fetch book data for slug: ${slug}`)
    }
  }

  // Render the app with normalized URL
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={normalizedUrl}>
        <App initialData={initialData} />
      </StaticRouter>
    </React.StrictMode>
  )

  // Return HTML and initial data
  return { html, initialData }
}
