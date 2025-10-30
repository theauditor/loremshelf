import { Link } from 'react-router-dom'
import { Separator } from '../components/ui/separator'
import { Mail, Phone, BookOpen, Edit3, Package, Clock, AlertCircle } from 'lucide-react'

export function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brown-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <Package className="size-12 md:size-16" />
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
                Shipping Policy
              </h1>
            </div>
            <p className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed">
              Everything you need to know about shipping, delivery, cancellations, and returns.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 md:py-16 border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="flex items-center justify-center gap-12">
            <Link
              to="/"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="size-8">
                <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" fill="black" r="12" />
                </svg>
              </div>
              <span className="font-serif text-2xl md:text-3xl text-black font-medium">
                Lorem
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 md:gap-16 mt-8">
            <div className="flex items-center gap-3">
              <BookOpen className="size-5 text-brown-800" />
              <span className="font-sans text-sm md:text-base font-medium text-gray-700">
                Read
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Edit3 className="size-5 text-brown-800" />
              <span className="font-sans text-sm md:text-base font-medium text-gray-700">
                Write
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Clock className="size-8 text-brown-800" />
              <h2 className="font-serif text-3xl md:text-4xl text-black">
                Shipping
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-6">
                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                  Orders typically ship within <span className="font-semibold">4-9 business days</span> from the order date. Pre-orders will ship within 4 days of the publishing date mentioned on the product page.
                </p>

                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                  Pending orders shall receive priority.
                </p>

                <div className="bg-brown-50 p-6 md:p-8 rounded-lg border border-brown-200 mt-6">
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    Expected Delivery Time
                  </h3>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Minimum delivery time:</span>
                      <span>5 days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Maximum delivery time:</span>
                      <span>25 days</span>
                    </li>
                  </ul>
                </div>

                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed mt-6">
                  We will use a reputable carrier to deliver your order.
                </p>

                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                  Shipping costs will be calculated at checkout and depend on the weight of your order and your delivery location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto px-6 md:px-[67px]" />

      {/* Cancellation Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <AlertCircle className="size-8 text-brown-800" />
              <h2 className="font-serif text-3xl md:text-4xl text-black">
                Cancellation
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                We understand that plans change, but unfortunately, we are unable to process cancellations after an order has been placed. This is because we fulfill orders quickly to ensure fast delivery times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto px-6 md:px-[67px]" />

      {/* Returns & Refunds Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Package className="size-8 text-brown-800" />
              <h2 className="font-serif text-3xl md:text-4xl text-black">
                Returns & Refunds
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-6">
                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                  If your book arrives damaged, we will gladly replace it with a new copy free of charge. To initiate a return, please contact us within <span className="font-semibold">14 days</span> of receiving your order.
                </p>

                <div className="bg-brown-50 p-6 md:p-8 rounded-lg border border-brown-200 mt-6">
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    Refund Processing Time
                  </h3>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Minimum processing time:</span>
                      <span>7 days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Maximum processing time:</span>
                      <span>16-20 days</span>
                    </li>
                  </ul>
                </div>

                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed mt-6">
                  You can contact us (FLOAT BUSINESS ACCELERATOR PRIVATE LIMITED) by email at{' '}
                  <a href="mailto:hi@lorempress.co" className="text-brown-800 hover:text-brown-900 font-semibold">
                    hi@lorempress.co
                  </a>{' '}
                  or by phone at{' '}
                  <a href="tel:+919995683304" className="text-brown-800 hover:text-brown-900 font-semibold">
                    +91 9995683304
                  </a>. We will provide you with instructions on how to return the damaged book and receive your replacement or refund.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 md:p-8 mt-8">
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    Please Note:
                  </h3>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-3 list-disc pl-6">
                    <li>We will only accept returns for books that are damaged in transit.</li>
                    <li>We are responsible for the cost of returning the damaged book.</li>
                    <li>We will ship the replacement book to you free of charge.</li>
                  </ul>
                </div>

                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed mt-8 italic">
                  We hope this policy is clear and concise. If you have any questions, please don't hesitate to contact us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-brown-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-8">
              Contact Us
            </h2>
            <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200">
              <p className="font-sans text-base text-gray-700 leading-relaxed mb-6">
                For questions about shipping, returns, or refunds, contact us at:
              </p>
              <div className="space-y-4">
                <p className="font-serif text-xl text-black">
                  Float Business Accelerator Pvt. Ltd.
                </p>
                <div className="flex items-center gap-3">
                  <Mail className="size-5 text-brown-800 flex-shrink-0" />
                  <a
                    href="mailto:hi@lorempress.co"
                    className="font-sans text-base text-brown-800 hover:text-brown-900 transition-colors"
                  >
                    hi@lorempress.co
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-5 text-brown-800 flex-shrink-0" />
                  <a
                    href="tel:+919995683304"
                    className="font-sans text-base text-brown-800 hover:text-brown-900 transition-colors"
                  >
                    +91 9995683304
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-sm text-gray-500 text-center">
              Last updated: October 30, 2025
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

