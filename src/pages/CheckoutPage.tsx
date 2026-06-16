import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, CreditCard, Truck, Package, ArrowRight, ArrowLeft, Lock } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { useToastStore } from '../store/useToastStore'
import type { ShippingInfo } from '../types'

const steps = [
  { id: 1, title: 'Shipping',  icon: Truck },
  { id: 2, title: 'Payment',   icon: CreditCard },
  { id: 3, title: 'Confirm',   icon: Package },
]

const EMPTY_SHIP: ShippingInfo = { firstName: '', lastName: '', email: '', phone: '', address: '', city: '', country: 'Pakistan', zipCode: '' }

export default function CheckoutPage() {
  const [step, setStep]       = useState(1)
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIP)
  const [card, setCard]       = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [ordered, setOrdered] = useState(false)
  const { items, total, clearCart } = useCartStore()
  const { add: addToast } = useToastStore()
  

  const subtotal  = total()
  const shipFee   = subtotal > 100 ? 0 : 9.99
  const orderTotal = subtotal + shipFee

  const placeOrder = () => {
    setOrdered(true)
    clearCart()
    addToast('Order placed successfully! 🎉', 'success')
  }

  if (items.length === 0 && !ordered) {
    return (
      <main className="pt-32 text-center">
        <p className="text-white text-xl mb-4">Your cart is empty</p>
        <Link to="/products" className="btn-gold">Shop Now</Link>
      </main>
    )
  }

  if (ordered) {
    return (
      <main className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center max-w-md">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-accent-green/20 border-2 border-accent-green flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-accent-green" />
          </motion.div>
          <h1 className="font-display font-bold text-3xl text-white mb-3">Order Confirmed! 🎉</h1>
          <p className="text-gray-400 mb-2">Thank you, {shipping.firstName || 'Customer'}!</p>
          <p className="text-gray-500 text-sm mb-8">Your sneakers are being prepared for shipment. You'll receive an email confirmation shortly.</p>
          <div className="card-dark p-5 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Order Total</span><span className="text-white font-bold">${orderTotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span className="text-accent-green">{shipFee === 0 ? 'FREE' : `$${shipFee}`}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Est. Delivery</span><span className="text-white">5-7 business days</span></div>
          </div>
          <Link to="/products" className="btn-gold px-8 py-4">
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container-shop max-w-5xl">
        <h1 className="font-display font-bold text-3xl text-white mb-8">Checkout</h1>

        {/* Step indicators */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${step >= s.id ? 'text-gold' : 'text-gray-600'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                  step > s.id ? 'bg-gold border-gold text-dark' : step === s.id ? 'border-gold text-gold' : 'border-surface-border'
                }`}>
                  {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 transition-colors ${step > s.id ? 'bg-gold' : 'bg-surface-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card-dark p-6 space-y-4">
                  <h2 className="font-semibold text-white text-lg mb-2 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-gold" /> Shipping Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="label-dark">First Name</label><input className="input-dark" placeholder="Sarfraz" value={shipping.firstName} onChange={e => setShipping(s => ({ ...s, firstName: e.target.value }))} /></div>
                    <div><label className="label-dark">Last Name</label><input className="input-dark" placeholder="Saeed" value={shipping.lastName} onChange={e => setShipping(s => ({ ...s, lastName: e.target.value }))} /></div>
                  </div>
                  <div><label className="label-dark">Email</label><input className="input-dark" type="email" placeholder="sarfraz@example.com" value={shipping.email} onChange={e => setShipping(s => ({ ...s, email: e.target.value }))} /></div>
                  <div><label className="label-dark">Phone</label><input className="input-dark" placeholder="+92 300 1234567" value={shipping.phone} onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))} /></div>
                  <div><label className="label-dark">Address</label><input className="input-dark" placeholder="Street address" value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="label-dark">City</label><input className="input-dark" placeholder="Islamabad" value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} /></div>
                    <div><label className="label-dark">ZIP Code</label><input className="input-dark" placeholder="44000" value={shipping.zipCode} onChange={e => setShipping(s => ({ ...s, zipCode: e.target.value }))} /></div>
                  </div>
                  <button onClick={() => setStep(2)} className="btn-gold w-full py-4 mt-2">
                    Continue to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card-dark p-6 space-y-4">
                  <h2 className="font-semibold text-white text-lg mb-2 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gold" /> Payment Details
                  </h2>

                  {/* Credit card visual */}
                  <div className="relative h-44 bg-gradient-to-br from-gold/30 via-gold/10 to-surface border border-gold/30 rounded-2xl p-6 mb-6 overflow-hidden">
                    <div className="absolute top-4 right-4 opacity-20 text-6xl font-bold font-mono">VISA</div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gold/10 translate-x-8 translate-y-8" />
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Credit Card</p>
                    <p className="font-mono text-white text-lg tracking-widest mb-4">
                      {card.number ? card.number.replace(/(.{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                    </p>
                    <div className="flex justify-between">
                      <div><p className="text-gray-500 text-xs">Card Holder</p><p className="text-white text-sm">{card.name || 'YOUR NAME'}</p></div>
                      <div><p className="text-gray-500 text-xs">Expires</p><p className="text-white text-sm">{card.expiry || 'MM/YY'}</p></div>
                    </div>
                  </div>

                  <div><label className="label-dark">Card Number</label><input className="input-dark font-mono" placeholder="1234 5678 9012 3456" maxLength={16} value={card.number} onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g, '') }))} /></div>
                  <div><label className="label-dark">Cardholder Name</label><input className="input-dark" placeholder="Sarfraz Saeed" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="label-dark">Expiry Date</label><input className="input-dark" placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))} /></div>
                    <div><label className="label-dark">CVV</label><input className="input-dark" placeholder="•••" maxLength={3} type="password" value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} /></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-surface rounded-xl px-4 py-3">
                    <Lock className="w-3.5 h-3.5 text-gold" /> Your payment info is encrypted and secure
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3.5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={() => setStep(3)} className="btn-gold flex-1 py-3.5">
                      Review Order <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card-dark p-6">
                  <h2 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-gold" /> Review Your Order
                  </h2>
                  <div className="space-y-3 mb-6">
                    {items.map(item => (
                      <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover bg-dark-50 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Size {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}</p>
                        </div>
                        <p className="text-white font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-surface rounded-xl p-4 mb-6 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Ship to:</span><span className="text-white">{shipping.firstName} {shipping.lastName}, {shipping.city}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Payment:</span><span className="text-white">Card ending ••••{card.number.slice(-4) || '0000'}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-outline flex-1 py-3.5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <motion.button onClick={placeOrder} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="btn-gold flex-1 py-3.5 text-base">
                      Place Order · ${orderTotal.toFixed(2)}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="card-dark p-6 h-fit">
            <h3 className="font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-dark-50 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">×{item.quantity}</p>
                  </div>
                  <p className="text-sm text-white font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-surface-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={shipFee === 0 ? 'text-accent-green font-medium' : 'text-white'}>{shipFee === 0 ? 'FREE' : `$${shipFee}`}</span></div>
              <div className="flex justify-between border-t border-surface-border pt-2 mt-2">
                <span className="font-semibold text-white">Total</span>
                <span className="font-bold text-gold text-lg">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}