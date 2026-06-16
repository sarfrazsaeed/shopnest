import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Search, Menu, X, Zap } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useScrolled } from '../../hooks/useScrolled'

const links = [
  { label: 'Home',      to: '/' },
  { label: 'Shop',      to: '/products' },
  { label: 'Sneakers',  to: '/products?category=lifestyle' },
  { label: 'Running',   to: '/products?category=running' },
  { label: 'Wishlist',  to: '/wishlist' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ]       = useState('')
  const scrolled  = useScrolled(20)
  const location  = useLocation()
  const itemCount = useCartStore(s => s.itemCount())
  const wishCount = useWishlistStore(s => s.items.length)
  const openCart  = useCartStore(s => s.openCart)

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-dark/95 backdrop-blur-xl border-b border-surface-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
        }`}
      >
        <nav className="container-shop flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}
              className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center shadow-gold-sm">
              <Zap className="w-5 h-5 text-dark" fill="currentColor" />
            </motion.div>
            <span className="font-display font-bold text-xl text-white group-hover:text-gold transition-colors">
              Shop<span className="text-gold">Nest</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === l.to
                    ? 'text-gold bg-gold/10'
                    : 'text-gray-400 hover:text-white hover:bg-surface'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <AnimatePresence>
              {searchOpen ? (
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  className="hidden sm:flex items-center overflow-hidden">
                  <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && searchQ.trim()) { window.location.href = `/products?search=${searchQ}`; setSearchOpen(false) } }}
                    placeholder="Search sneakers..." className="input-dark py-2 text-xs" />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <button onClick={() => setSearchOpen(s => !s)} className="btn-icon hidden sm:flex">
              {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn-icon relative hidden sm:flex">
              <Heart className="w-4 h-4" />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={openCart} className="btn-icon relative">
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <motion.span key={itemCount} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(s => !s)} className="btn-icon md:hidden">
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-dark-50/95 backdrop-blur-xl border-t border-surface-border">
              <div className="container-shop py-4 space-y-1">
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search sneakers..." className="input-dark mb-3" />
                {links.map(l => (
                  <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === l.to ? 'text-gold bg-gold/10' : 'text-gray-400 hover:text-white hover:bg-surface'
                    }`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}