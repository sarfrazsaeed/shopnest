import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useWishlistStore } from '../store/useWishlistStore'
import { useCartStore } from '../store/useCartStore'
import { useToastStore } from '../store/useToastStore'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { addItem, openCart } = useCartStore()
  const { add: addToast } = useToastStore()

  const moveToCart = (productId: string) => {
    const item = items.find(i => i.product.id === productId)
    if (!item) return
    addItem(item.product, item.product.colors[0], item.product.sizes[4] || item.product.sizes[0])
    removeItem(productId)
    addToast(`${item.product.name} moved to cart!`, 'info')
    openCart()
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container-shop">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-white mb-1">My Wishlist</h1>
            <p className="text-gray-500">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
          </div>
          {items.length > 0 && (
            <Link to="/products" className="btn-outline text-sm py-2.5 px-5">
              Continue Shopping
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-3xl bg-surface border border-surface-border flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-600" />
            </motion.div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save your favourite sneakers to buy them later</p>
            <Link to="/products" className="btn-gold px-8 py-4">
              Explore Sneakers <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <motion.div key={item.product.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.08 }}
                className="card-dark p-0 overflow-hidden group"
              >
                <div className="relative overflow-hidden bg-dark-50 h-56">
                  <img src={item.product.images[0]} alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button onClick={() => removeItem(item.product.id)}
                    className="absolute top-3 right-3 btn-icon bg-dark/80 backdrop-blur-sm hover:bg-accent-red hover:border-accent-red hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {!item.product.inStock && (
                    <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
                      <span className="badge bg-gray-700 text-gray-300 border-gray-600">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gold font-semibold">{item.product.brand}</p>
                  <p className="text-sm font-semibold text-white mb-1">{item.product.name}</p>
                  <p className="font-bold text-white mb-3">${item.product.price}</p>
                  <div className="flex gap-2">
                    <button onClick={() => moveToCart(item.product.id)} disabled={!item.product.inStock}
                      className="flex-1 btn-gold py-2 text-sm rounded-xl disabled:opacity-50">
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                    <Link to={`/product/${item.product.id}`} className="btn-icon rounded-xl">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}