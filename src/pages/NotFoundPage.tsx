import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ShoppingBag, Zap } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="relative mb-8">
            <span className="font-display font-black text-[160px] leading-none select-none"
              style={{ WebkitTextStroke: '2px rgba(245,184,0,0.2)', color: 'transparent' }}>
              404
            </span>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gold flex items-center justify-center shadow-gold">
              <Zap className="w-10 h-10 text-dark" fill="currentColor" />
            </motion.div>
          </div>
          <h1 className="font-display font-bold text-2xl text-white mb-3">Page Not Found</h1>
          <p className="text-gray-500 max-w-md mx-auto mb-8">The sneaker you're looking for has sold out... or maybe it never existed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-gold px-8 py-3.5"><Home className="w-5 h-5" /> Go Home</Link>
            <Link to="/products" className="btn-outline px-8 py-3.5"><ShoppingBag className="w-5 h-5" /> Shop All</Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}