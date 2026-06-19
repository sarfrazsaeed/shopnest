import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import ToastContainer from './components/ui/Toast'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark flex flex-col">
        <Navbar />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/"               element={<HomePage />} />
              <Route path="/products"       element={<ProductsPage />} />
              <Route path="/product/:id"    element={<ProductDetailPage />} />
              <Route path="/wishlist"       element={<WishlistPage />} />
              <Route path="/checkout"       element={<CheckoutPage />} />
              <Route path="*"              element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
        <CartDrawer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}