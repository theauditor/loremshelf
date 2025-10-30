import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Home, BookOpen, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <div className="font-serif text-8xl md:text-9xl font-bold text-purple mb-4">
            404
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-black mb-4">
            Page Not Found
          </h1>
          <p className="font-sans text-lg text-gray-500 mb-8 leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved, deleted,
            or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="size-4 mr-2" />
            Go Back
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/">
              <Home className="size-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/books">
              <BookOpen className="size-4 mr-2" />
              Browse Books
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <p className="font-sans text-sm text-gray-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link to="/contact" className="font-sans text-purple hover:underline">
              Contact Us
            </Link>
            <span className="hidden sm:inline text-gray-300">•</span>
            <Link to="/books" className="font-sans text-purple hover:underline">
              Browse All Books
            </Link>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a href="mailto:hello@lorem.com" className="font-sans text-purple hover:underline">
              Get Help
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
