# Lorem Publishing - Modern Publishing Website

A modern, production-ready website for **Lorem** - an award-winning publishing company that transcends publishing in the AI & Tech Age. Built with React, TypeScript, and shadcn/ui components.

## ✨ Features

### 🎨 Modern Design System
- **Colors**: Custom cream palette (#fdfcf9, #f7f5ef, #f2f0eb, #e9e4dd) with purple accent (#4b3f72)
- **Typography**: Instrument Serif and Instrument Sans fonts
- **Components**: shadcn/ui component library with Radix UI primitives
- **Responsive**: Mobile-first design with Tailwind CSS

### 📚 Book Management
- **Catalog**: Browse books with search, filtering, and sorting
- **Book Details**: Comprehensive book pages with reviews and purchase options
- **Shopping Cart**: Full e-commerce cart functionality
- **Multi-language Support**: Books available in 12+ languages
- **Multiple Formats**: Hardcover, eBook, and audiobook options

### 👤 User Experience
- **Authentication**: User registration and login system
- **Wishlist**: Save books for later
- **Order Tracking**: Real-time order status updates
- **Contact Forms**: Manuscript submission and customer support

### 🚀 Technical Features
- **React Router**: Client-side routing with protected routes
- **State Management**: Context API for cart and authentication
- **TypeScript**: Full type safety throughout the application
- **Production Ready**: Optimized builds and proper error handling

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── pages/              # Route components
│   ├── HomePage.tsx    # Landing page
│   ├── BooksPage.tsx   # Book catalog
│   ├── BookDetailPage.tsx # Individual book pages
│   ├── ContactPage.tsx # Contact forms
│   └── CheckoutPage.tsx # Shopping cart & checkout
├── context/            # React context providers
│   ├── CartContext.tsx # Shopping cart state
│   └── AuthContext.tsx # User authentication
├── data/               # Mock data and content
│   ├── books.ts        # Book catalog data
│   └── testimonials.ts # Customer testimonials
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
└── types/              # TypeScript type definitions
    └── index.ts        # Global types
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 Key Pages

### Home Page (`/`)
- Hero section with company mission
- Featured books showcase
- AI-powered publishing features
- Customer testimonials
- Call-to-action sections

### Books Catalog (`/books`)
- Search functionality
- Category and genre filtering
- Sort by price, rating, date
- Responsive grid layout
- Quick preview cards

### Book Details (`/books/:id`)
- Detailed book information
- Customer reviews and ratings
- Purchase options
- Related books suggestions
- Author information

### Contact (`/contact`)
- Manuscript submission form
- Order tracking system
- General inquiry forms
- Contact information display

### Checkout (`/checkout`)
- Shopping cart management
- Multi-step checkout process
- Payment integration ready
- Order confirmation

## 🛠️ Backend Integration Ready

The website is structured for easy backend integration:

### API Endpoints Needed
- `GET /api/books` - Book catalog
- `GET /api/books/:id` - Individual book details
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `POST /api/orders` - Order creation
- `GET /api/orders/:id` - Order tracking
- `POST /api/contact` - Contact form submissions

### State Management
- **Cart Context**: Ready for API integration
- **Auth Context**: Mock authentication with local storage
- **Form Handling**: React Hook Form integration ready

## 🎨 Design System

### Colors
```css
--cream-50: #fdfcf9
--cream-100: #f7f5ef
--cream-200: #f2f0eb
--cream-300: #e9e4dd
--gray-500: #746f69
--purple: #4b3f72
```

### Typography
- **Headings**: Instrument Serif
- **Body Text**: Instrument Sans
- **Responsive sizing**: 14px - 64px scale

### Components
Built with shadcn/ui components:
- Buttons, Cards, Forms
- Navigation, Modals, Tabs
- Responsive layouts
- Accessible by default

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Large tap targets and gestures
- **Performance**: Optimized images and lazy loading

## 🔧 Development

### Available Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality

## 🌟 Features Implemented

✅ Modern React + TypeScript setup
✅ shadcn/ui component system
✅ Responsive design
✅ Book catalog with search/filter
✅ Shopping cart functionality
✅ User authentication system
✅ Contact and submission forms
✅ Order tracking system
✅ Production-ready builds
✅ SEO-friendly structure

## 🚀 Ready for Production

The website is fully functional and ready for:
- Backend API integration
- Payment gateway setup
- Database connections
- User management system
- Content management
- Analytics integration

---

**Built with ❤️ for Lorem Publishing Company**
*Transcending Publishing in the AI & Tech Age*
