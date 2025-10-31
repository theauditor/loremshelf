import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  ShoppingCart,
  Menu,
  BookOpen
} from 'lucide-react'
import { useCart } from '../context/CartContext'

export function Header() {
  const location = useLocation()
  const { state: cartState } = useCart()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-300">
      <div className="container mx-auto px-6 md:px-[67px]">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="h-[23px] md:h-[29px]">
              <img src="/Black.svg" alt="Lorem" className="block h-full w-auto" />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-sans text-[16px] transition-colors ${
                  location.pathname === item.href
                    ? 'text-black font-semibold'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/checkout">
                <ShoppingCart className="size-4" />
                {cartState.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-medium size-5 rounded-full flex items-center justify-center">
                    {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {/* Browse Books CTA - Hidden on checkout, books, and book detail pages, and hidden on mobile */}
            {location.pathname !== '/checkout' && 
             location.pathname !== '/books' && 
             !location.pathname.startsWith('/book/') && (
              <Button size="sm" className="hidden md:flex" asChild>
                <Link to="/books">
                  <BookOpen className="size-4 mr-2" />
                  Browse our books
                </Link>
              </Button>
            )}

            {/* Mobile menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="size-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
