import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, Zap } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useToastStore } from '../../store/useToastStore'
import type { Product } from '../../types'

interface Props { product: Product; index?: number }

export default function ProductCard({ product, index = 0 }: Props) {
  const [hovered, setHovered] = useState(false)
  const [imgIdx, setImgIdx]   = useState(0)
  const { addItem, openCart } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const { add: addToast } = useToastStore()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addItem(product, product.colors[0], product.sizes[Math.floor(product.sizes.length / 2)])
    addToast(`${product.name} added to cart!`, 'info')
    openCart()
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
    addToast(wishlisted ? 'Removed from wishlist' : `${product.name} wishlisted!`, wishlisted ? 'info' : 'success')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`}>
        <div
          className="group card-dark p-0 overflow-hidden cursor-pointer shine-effect"
          onMouseEnter={() => { setHovered(true); setImgIdx(1) }}
          onMouseLeave={() => { setHovered(false); setImgIdx(0) }}
        >
          {/* Image */}
          <div className="relative overflow-hidden bg-dark-50 h-64">
            <motion.img
              src={product.images[imgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-dark/40"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="badge-gold text-xs">NEW</span>
              )}
              {product.discount && (
                <span className="badge-red text-xs">-{product.discount}%</span>
              )}
              {!product.inStock && (
                <span className="badge bg-gray-700 text-gray-300 border-gray-600 text-xs">SOLD OUT</span>
              )}
            </div>

            {/* Wishlist */}
            <motion.button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                wishlisted ? 'bg-accent-red text-white' : 'bg-dark/60 text-white hover:bg-accent-red'
              }`}
              whileTap={{ scale: 0.85 }}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Quick Add */}
            <motion.div
              className="absolute bottom-3 left-3 right-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full btn-gold py-2.5 text-sm rounded-xl disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                {product.inStock ? 'Quick Add' : 'Out of Stock'}
              </button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">{product.brand}</p>
            <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1 group-hover:text-gold transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-xs text-gray-400">{product.rating} ({product.reviewCount.toLocaleString()})</span>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.slice(0, 4).map(c => (
                <div key={c.name} title={c.name}
                  className="w-4 h-4 rounded-full border border-surface-border ring-1 ring-transparent hover:ring-gold transition-all"
                  style={{ background: c.hex }} />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-lg">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-600 line-through">${product.originalPrice}</span>
                )}
              </div>
              <button onClick={handleAddToCart} disabled={!product.inStock}
                className="btn-icon disabled:opacity-50">
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}