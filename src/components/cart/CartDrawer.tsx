import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount, clearCart } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]" />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-50 border-l border-surface-border z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h2 className="font-display font-bold text-lg text-white">Your Cart</h2>
                {itemCount() > 0 && (
                  <span className="badge-gold">{itemCount()} items</span>
                )}
              </div>
              <button onClick={closeCart} className="btn-icon">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-surface flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-white font-semibold mb-2">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mb-6">Add some sneakers to get started</p>
                  <Link to="/products" onClick={closeCart} className="btn-gold text-sm py-2.5 px-5">
                    Shop Now
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((item, i) => (
                    <motion.div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.05 }}
                      className="flex gap-4 card-dark p-4"
                    >
                      <img src={item.product.images[0]} alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-dark-50 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gold font-semibold">{item.product.brand}</p>
                        <p className="text-sm font-semibold text-white truncate">{item.product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">Size {item.selectedSize}</span>
                          <span className="text-gray-700">·</span>
                          <div className="w-3 h-3 rounded-full border border-surface-border"
                            style={{ background: item.selectedColor.hex }} />
                          <span className="text-xs text-gray-500">{item.selectedColor.name}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-surface-border rounded-xl overflow-hidden">
                            <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                              className="text-gray-600 hover:text-accent-red transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-surface-border px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold text-white text-lg">${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-accent-green font-medium">{total() > 100 ? 'FREE' : '$9.99'}</span>
                </div>
                {total() <= 100 && (
                  <div className="bg-gold/10 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-gold">
                    Add ${(100 - total()).toFixed(2)} more for free shipping! 🎉
                  </div>
                )}
                <Link to="/checkout" onClick={closeCart}
                  className="btn-gold w-full py-4 text-base rounded-2xl">
                  Checkout · ${total().toFixed(2)} <ArrowRight className="w-5 h-5" />
                </Link>
                <button onClick={clearCart}
                  className="w-full text-center text-sm text-gray-600 hover:text-accent-red transition-colors py-1">
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}