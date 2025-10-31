import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    explore: [
      { name: 'All Books', href: '/books' },
      { name: 'New Releases', href: '/books?sort=newest' },
      { name: 'Bestsellers', href: '/books?sort=bestselling' },
    ],
    authors: [
      { name: 'Submission Guidelines', href: '/submit' },
      { name: 'Success Stories', href: '/success-stories' },
    ],
    company: [
      { name: 'Our Technology', href: '/technology' },
      { name: 'Press Kit', href: '/press' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      // { name: 'Track Order', href: '/track' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/lorem' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/lorem' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/lorem' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/lorem' },
  ]

  return (
    <footer className="bg-brown-800 border-t border-brown-700">
      <div className="container mx-auto px-6 md:px-[67px]">
        <div className="py-16 md:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="flex items-center mb-8 hover:opacity-80 transition-opacity"
              >
                <div className="h-8 md:h-10">
                  <img src="/White.svg" alt="Lorem" className="block h-full w-auto" />
                </div>
              </Link>

              <div className="space-y-4 max-w-md">
                <p className="font-sans font-medium text-[14px] md:text-[16px] text-gray-300 leading-relaxed">
                  Transcending publishing in the AI & Tech Age. Award-winning books that challenge conventions and inspire transformation.
                </p>
                <p className="font-sans font-medium text-[14px] md:text-[16px] text-gray-300 leading-relaxed">
                  Based in Kochi, Kerala. Publishing for the world.
                </p>
              </div>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="size-4 flex-shrink-0" />
                  <a
                    href="mailto:hi@lorempress.co"
                    className="font-sans text-[14px] text-white hover:text-gray-300 transition-colors"
                  >
                    hi@lorempress.co
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="size-4 flex-shrink-0" />
                  <a
                    href="tel:+919995683304"
                    className="font-sans text-[14px] text-white hover:text-gray-300 transition-colors"
                  >
                    +91 99956 83304
                  </a>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="size-4 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-[14px] text-white">
                    Kochi, Kerala, India
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-4 flex gap-16">
              <div>
                <h3 className="font-sans font-semibold text-[14px] text-white mb-6">
                  Explore
                </h3>
                <ul className="space-y-4">
                  {footerLinks.explore.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="font-sans font-medium text-[14px] text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-sans font-semibold text-[14px] text-white mb-6">
                  Support
                </h3>
                <ul className="space-y-4">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="font-sans font-medium text-[14px] text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Authors section - hidden
              <div>
                <h3 className="font-sans font-semibold text-[14px] text-white mb-6">
                  Authors
                </h3>
                <ul className="space-y-4">
                  {footerLinks.authors.map((link) => (
                    <li key={link.name}>
                      <div className="flex items-center gap-2">
                        <Link
                          to={link.href}
                          className={`font-sans font-medium text-[14px] transition-colors ${
                            link.comingSoon
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {link.name}
                        </Link>
                        {link.comingSoon && (
                          <Badge variant="outline" className="text-xs text-white border-white">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              */}

              {/* Company section - hidden
              <div>
                <h3 className="font-sans font-semibold text-[14px] text-white mb-6">
                  Company
                </h3>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="font-sans font-medium text-[14px] text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              */}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.name}
              >
                <social.icon className="size-5" />
              </a>
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans font-medium text-[14px] text-gray-300 text-center md:text-left">
              © {currentYear} Lorem. All rights reserved. Transcending Publishing in the AI & Tech Age.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/terms-privacy"
                className="font-sans font-medium text-[14px] text-gray-400 hover:text-white transition-colors"
              >
                Terms & Privacy
              </Link>
              <Link
                to="/shipping-policy"
                className="font-sans font-medium text-[14px] text-gray-400 hover:text-white transition-colors"
              >
                Shipping Policy
              </Link>
              <Link
                to="/cookies"
                className="font-sans font-medium text-[14px] text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Sanskrit Text */}
          <div className="mt-8 text-center">
            <p className="font-serif text-[14px] text-brown-600/50">
              Vāk eva viśvasya mukham
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
