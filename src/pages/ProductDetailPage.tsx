import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Share2, Minus, Plus } from 'lucide-react'
import { products } from '../data/products'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { useToastStore } from '../store/useToastStore'
import StarRating from '../components/ui/StarRating'
import ProductCard from '../components/product/ProductCard'
import type { Color } from '../types'

export default function ProductDetailPage() {
  const { id } = useParams()
  
  const product = products.find(p => p.id === id)

  const [imgIdx, setImgIdx]       = useState(0)
  const [selColor, setSelColor]   = useState<Color | null>(product?.colors[0] || null)
  const [selSize, setSelSize]     = useState<string | null>(null)
  const [qty, setQty]             = useState(1)
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'shipping'>('desc')

  const { addItem, openCart } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const { add: addToast } = useToastStore()

  if (!product) return (
    <div className="pt-32 text-center">
      <p className="text-white text-xl mb-4">Product not found</p>
      <Link to="/products" className="btn-gold">Back to Shop</Link>
    </div>
  )

  const wishlisted = isWishlisted(product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    if (!selSize) { addToast('Please select a size', 'error'); return }
    if (!selColor) return
    for (let i = 0; i < qty; i++) addItem(product, selColor, selSize)
    addToast(`${product.name} added to cart!`, 'info')
    openCart()
  }

  const savings = product.originalPrice ? product.originalPrice - product.price : 0

  return (
    <main className="pt-24 pb-20">
      <div className="container-shop">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl bg-dark-50 aspect-square group">
              <AnimatePresence mode="wait">
                <motion.img key={imgIdx}
                  src={product.images[imgIdx]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 btn-icon bg-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 btn-icon bg-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isNew && <span className="badge-gold">NEW</span>}
                {product.discount && <span className="badge-red">-{product.discount}%</span>}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    imgIdx === i ? 'border-gold' : 'border-surface-border hover:border-gold/50'
                  }`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">{product.brand}</p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">{product.name}</h1>

            <StarRating rating={product.rating} count={product.reviewCount} size="md" />

            {/* Price */}
            <div className="flex items-center gap-4 my-6">
              <span className="font-display font-black text-4xl text-white">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-600 line-through">${product.originalPrice}</span>
                  <span className="badge-green">Save ${savings}</span>
                </>
              )}
            </div>

            {!product.inStock && (
              <div className="badge-red mb-4 inline-flex">Out of Stock</div>
            )}

            {/* Colors */}
            <div className="mb-6">
              <p className="label-dark mb-3">Color: <span className="text-white normal-case tracking-normal font-medium">{selColor?.name}</span></p>
              <div className="flex gap-3">
                {product.colors.map(c => (
                  <button key={c.name} onClick={() => setSelColor(c)} title={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                      selColor?.name === c.name ? 'border-gold ring-2 ring-gold ring-offset-2 ring-offset-dark-50' : 'border-surface-border'
                    }`}
                    style={{ background: c.hex }} />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="label-dark">Size (US)</p>
                <button className="text-xs text-gold hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(sz => (
                  <button key={sz} onClick={() => setSelSize(sz)}
                    className={`min-w-[48px] h-10 px-3 rounded-xl border text-sm font-medium transition-all ${
                      selSize === sz
                        ? 'bg-gold text-dark border-gold font-bold'
                        : 'border-surface-border text-gray-400 hover:border-gold hover:text-gold'
                    }`}>{sz}</button>
                ))}
              </div>
              {!selSize && <p className="text-xs text-accent-red mt-2">Please select a size</p>}
            </div>

            {/* Qty + Actions */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-surface-border rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-white">{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))}
                  className="w-11 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button onClick={handleAddToCart} disabled={!product.inStock}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 btn-gold py-3 text-base rounded-xl disabled:opacity-50">
                <ShoppingBag className="w-5 h-5" />
                {product.inStock ? `Add to Cart — $${(product.price * qty).toFixed(2)}` : 'Out of Stock'}
              </motion.button>

              <motion.button onClick={() => { toggle(product); addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', 'success') }}
                whileTap={{ scale: 0.9 }}
                className={`btn-icon w-12 h-12 rounded-xl ${wishlisted ? 'bg-accent-red border-accent-red text-white' : ''}`}>
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </motion.button>

              <button className="btn-icon w-12 h-12 rounded-xl">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck,      text: 'Free shipping over $100' },
                { icon: Shield,     text: '100% authentic' },
                { icon: RefreshCw,  text: '30-day returns' },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 text-center p-3 bg-surface rounded-xl">
                  <p.icon className="w-4 h-4 text-gold" />
                  <span className="text-xs text-gray-500">{p.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border border-surface-border rounded-2xl overflow-hidden">
              <div className="flex border-b border-surface-border">
                {(['desc', 'reviews', 'shipping'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab ? 'text-gold bg-gold/5 border-b-2 border-gold' : 'text-gray-500 hover:text-white'
                    }`}>
                    {tab === 'desc' ? 'Description' : tab === 'reviews' ? 'Reviews' : 'Shipping'}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {activeTab === 'desc' && (
                  <div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>
                    <ul className="space-y-2">
                      {product.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-gold mt-0.5">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="text-center py-4">
                    <div className="font-display font-black text-5xl text-gold mb-1">{product.rating}</div>
                    <StarRating rating={product.rating} count={product.reviewCount} />
                    <p className="text-sm text-gray-500 mt-4">Based on {product.reviewCount.toLocaleString()} verified reviews</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-3 text-sm text-gray-400">
                    <p>🚚 <strong className="text-white">Standard Shipping:</strong> 5-7 business days — FREE over $100</p>
                    <p>⚡ <strong className="text-white">Express Shipping:</strong> 2-3 business days — $14.99</p>
                    <p>🌍 <strong className="text-white">International:</strong> 7-14 business days — from $19.99</p>
                    <p>🔄 <strong className="text-white">Returns:</strong> Free returns within 30 days</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}