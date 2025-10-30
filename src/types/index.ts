export interface Book {
  id: string
  title: string
  author: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  genres: string[]
  rating: number
  reviewCount: number
  releaseDate: string
  pages: number
  languages: string[]
  format: string[]
  awards?: string[]
  isbn?: string
  tags?: string[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  book: string
  rating?: number
}

export interface Author {
  id: string
  name: string
  bio: string
  image: string
  books: string[]
  socialLinks?: {
    website?: string
    twitter?: string
    instagram?: string
  }
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ShippingFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
}

export interface Order {
  id: string
  items: Array<{
    bookId: string
    quantity: number
    price: number
  }>
  shipping: ShippingFormData
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}
