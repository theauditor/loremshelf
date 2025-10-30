import { Book } from '../types'

export const books: Book[] = [
  {
    id: 'the-digital-divide',
    title: 'The Digital Divide',
    author: 'Sarah Chen',
    description: 'In a world increasingly divided by technology, one woman\'s journey to bridge the gap between the connected and disconnected reveals the true cost of progress and the power of human connection.',
    price: 950,
    originalPrice: 1200,
    image: '/images/books/digital-divide.jpg',
    category: 'Contemporary Fiction',
    genres: ['Social Transformation', 'Contemporary Fiction'],
    rating: 4.8,
    reviewCount: 127,
    releaseDate: '2025-03-15',
    pages: 342,
    languages: ['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Gujarati', 'Marathi', 'Punjabi', 'Odia', 'Assamese'],
    format: ['Hardcover', 'eBook', 'Audiobook'],
    awards: ['2024 Emerging Voices Award'],
    isbn: '978-81-1234-567-8'
  },
  {
    id: 'future-echoes',
    title: 'Future Echoes',
    author: 'Marcus Williams',
    description: 'A gripping exploration of artificial intelligence and human consciousness, where one scientist discovers that the future may already be writing itself.',
    price: 875,
    originalPrice: 1100,
    image: '/images/books/future-echoes.jpg',
    category: 'Science Fiction',
    genres: ['Science Fiction', 'Technology', 'Philosophy'],
    rating: 4.6,
    reviewCount: 89,
    releaseDate: '2025-02-28',
    pages: 298,
    languages: ['English', 'Hindi', 'Malayalam'],
    format: ['Hardcover', 'eBook'],
    isbn: '978-81-1234-567-9'
  },
  {
    id: 'quantum-minds',
    title: 'Quantum Minds',
    author: 'Dr. Amit Sharma',
    description: 'An award-winning physicist turns to fiction to explore the intersection of quantum mechanics and human consciousness in this thought-provoking novel.',
    price: 1025,
    image: '/images/books/quantum-minds.jpg',
    category: 'Literary Fiction',
    genres: ['Science', 'Philosophy', 'Literary Fiction'],
    rating: 4.9,
    reviewCount: 203,
    releaseDate: '2025-01-20',
    pages: 376,
    languages: ['English', 'Hindi'],
    format: ['Hardcover', 'eBook', 'Audiobook'],
    awards: ['2024 Quantum Science Fiction Prize'],
    isbn: '978-81-1234-568-0'
  },
  {
    id: 'kerala-2040',
    title: 'Kerala 2040',
    author: 'രവിചന്ദ്രൻ കെ',
    description: 'A visionary look at Kerala\'s future through the eyes of ordinary people, blending social commentary with speculative fiction in Malayalam literature.',
    price: 799,
    originalPrice: 999,
    image: '/images/books/kerala-2040.jpg',
    category: 'Regional Fiction',
    genres: ['Regional Fiction', 'Social Commentary', 'Speculative Fiction'],
    rating: 4.7,
    reviewCount: 156,
    releaseDate: '2025-04-10',
    pages: 324,
    languages: ['Malayalam', 'English'],
    format: ['Paperback', 'eBook'],
    awards: ['2024 Malayalam Literary Award'],
    isbn: '978-81-1234-568-1'
  },
  {
    id: 'digital-dharma',
    title: 'Digital Dharma',
    author: 'Dr. Priya Nair',
    description: 'How ancient wisdom meets modern technology in this groundbreaking exploration of digital ethics and spiritual growth.',
    price: 1125,
    image: '/images/books/digital-dharma.jpg',
    category: 'Non-Fiction',
    genres: ['Technology', 'Philosophy', 'Self-Help'],
    rating: 4.5,
    reviewCount: 78,
    releaseDate: '2025-05-05',
    pages: 288,
    languages: ['English', 'Hindi', 'Sanskrit'],
    format: ['Hardcover', 'eBook'],
    awards: ['2024 Digital Ethics Award'],
    isbn: '978-81-1234-568-2'
  },
  {
    id: 'shadows-tomorrow',
    title: 'Shadows of Tomorrow',
    author: 'Elena Rodriguez',
    description: 'A haunting tale of climate refugees and corporate greed, where one journalist uncovers a conspiracy that could change the world.',
    price: 925,
    originalPrice: 1150,
    image: '/images/books/shadows-tomorrow.jpg',
    category: 'Thriller',
    genres: ['Climate Fiction', 'Political Thriller', 'Mystery'],
    rating: 4.4,
    reviewCount: 134,
    releaseDate: '2025-03-30',
    pages: 356,
    languages: ['English', 'Spanish', 'Hindi'],
    format: ['Hardcover', 'eBook', 'Audiobook'],
    isbn: '978-81-1234-568-3'
  }
]

export function getBookById(id: string): Book | undefined {
  return books.find(book => book.id === id)
}

export function getBooksByCategory(category: string): Book[] {
  return books.filter(book => book.category === category)
}

export function searchBooks(query: string): Book[] {
  const lowercaseQuery = query.toLowerCase()
  return books.filter(book =>
    book.title.toLowerCase().includes(lowercaseQuery) ||
    book.author.toLowerCase().includes(lowercaseQuery) ||
    book.description.toLowerCase().includes(lowercaseQuery) ||
    book.genres.some(genre => genre.toLowerCase().includes(lowercaseQuery))
  )
}
