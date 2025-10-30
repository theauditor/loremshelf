import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { BooksPage } from './pages/BooksPage'
import { BookDetailPage } from './pages/BookDetailPage'
import { ContactPage } from './pages/ContactPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TechnologyPage } from './pages/TechnologyPage'
import { AuthorsPage } from './pages/AuthorsPage'
import { SubmitPage } from './pages/SubmitPage'
import { SuccessStoriesPage } from './pages/SuccessStoriesPage'
import { TrackPage } from './pages/TrackPage'
import { TermsPrivacyPage } from './pages/TermsPrivacyPage'
import { ShippingPolicyPage } from './pages/ShippingPolicyPage'
import { HelpPage } from './pages/HelpPage'
import { PressPage } from './pages/PressPage'
import { CareersPage } from './pages/CareersPage'
import { ReturnsPage } from './pages/ReturnsPage'
import { AwardsPage } from './pages/AwardsPage'
import { CartProvider } from './context/CartContext'
import { SSRDataProvider } from './context/SSRDataContext'

interface AppProps {
  initialData?: any
}

function App({ initialData = {} }: AppProps = {}) {
  return (
    <SSRDataProvider initialData={initialData}>
      <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/terms-privacy" element={<TermsPrivacyPage />} />
            <Route path="/terms" element={<TermsPrivacyPage />} />
            <Route path="/privacy" element={<TermsPrivacyPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
    </SSRDataProvider>
  )
}

export default App
