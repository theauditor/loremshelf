import { Link } from 'react-router-dom'
import { Separator } from '../components/ui/separator'
import { Mail, Phone, BookOpen, Edit3 } from 'lucide-react'

export function TermsPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brown-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Terms & Privacy
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed">
              Our commitment to transparency and your rights.
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

      {/* Terms of Service Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-8">
              Terms of Service
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                  These Terms of Service ("Terms") govern your use of lipsum.store ("Website") operated by Float Business Accelerator Pvt. Ltd. ("Company", "we", "us", or "our"). By accessing or using the Website, you agree to be bound by these Terms.
                </p>
              </div>

              <div className="space-y-8">
                {/* Section 1 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    1. Acceptance of Terms
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed">
                    By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    2. Products and Services
                  </h3>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>All products are sold on an "as is" basis</li>
                    <li>Prices are listed in Indian Rupees (INR) and include applicable GST</li>
                    <li>We reserve the right to modify prices without prior notice</li>
                    <li>Product images are for illustrative purposes only</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    3. Order Acceptance and Fulfillment
                  </h3>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>All orders are subject to acceptance and availability</li>
                    <li>We reserve the right to refuse or cancel any order for any reason</li>
                    <li>Delivery timelines are estimates and not guaranteed</li>
                    <li>Risk of loss and title for items pass to you upon delivery</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    4. Payment Terms
                  </h3>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Payments are processed through secure third-party payment gateways</li>
                    <li>All transactions are in Indian Rupees (INR)</li>
                    <li>Orders will not be processed until payment is confirmed</li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    5. Intellectual Property
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed">
                    All content on the Website, including text, graphics, logos, images, and software, is the property of the Company or its content suppliers and is protected by Indian and international copyright laws.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    6. User Conduct
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed mb-3">
                    You agree not to:
                  </p>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Use the Website for any unlawful purpose</li>
                    <li>Attempt to gain unauthorized access to any portion of the Website</li>
                    <li>Interfere with the proper working of the Website</li>
                    <li>Circumvent any security features</li>
                  </ul>
                </div>

                {/* Section 7 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    7. Limitation of Liability
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed">
                    To the maximum extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    8. Governing Law
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed">
                    These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kerala, India.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    9. Consumer Protection Rights
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed">
                    These Terms do not affect your statutory rights as a consumer under Indian law, including the Consumer Protection Act, 2019.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto px-6 md:px-[67px]" />

      {/* Privacy Policy Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-8">
              Privacy Policy
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                {/* Section 1 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    1. Information We Collect
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed mb-3">
                    When you browse the Website, we may collect:
                  </p>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6 mb-4">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address</li>
                    <li>Pages visited and time of visit</li>
                  </ul>
                  <p className="font-sans text-base text-gray-700 leading-relaxed mb-3">
                    When purchasing Products, we collect:
                  </p>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Shipping address</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    2. Use of Information
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed mb-3">
                    We use collected information to:
                  </p>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Process and fulfill orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Provide customer support</li>
                    <li>Improve our services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    3. Data Protection
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed">
                    We implement appropriate security measures to protect your personal information in accordance with the Information Technology Act, 2000 and applicable data protection laws.
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-black mb-4">
                    4. Your Rights
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed mb-3">
                    You have the right to:
                  </p>
                  <ul className="font-sans text-base text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                  </ul>
                </div>
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
                For questions about these Terms or Privacy Policy, contact us at:
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

