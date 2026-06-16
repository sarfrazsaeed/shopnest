import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Truck, Shield, RefreshCw, Headphones, Star, Zap, TrendingUp, Award } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import { featuredProducts, products } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: 'Running',    emoji: '🏃', bg: 'from-blue-900/40 to-blue-800/20',  query: 'running' },
  { name: 'Lifestyle',  emoji: '✨', bg: 'from-gold/20 to-gold/5',            query: 'lifestyle' },
  { name: 'Basketball', emoji: '🏀', bg: 'from-orange-900/40 to-orange-800/20', query: 'basketball' },
  { name: 'Limited',    emoji: '🔥', bg: 'from-red-900/40 to-red-800/20',    query: 'limited' },
  { name: 'Casual',     emoji: '😎', bg: 'from-purple-900/40 to-purple-800/20', query: 'casual' },
  { name: 'Training',   emoji: '💪', bg: 'from-green-900/40 to-green-800/20', query: 'training' },
]

const brands = ['Nike', 'Adidas', 'Jordan', 'Puma', 'New Balance', 'Vans', 'ASICS', 'Converse', 'Reebok', 'Under Armour']

const perks = [
  { icon: Truck,       title: 'Free Shipping',    desc: 'On orders over $100' },
  { icon: Shield,      title: 'Authentic Only',   desc: '100% genuine products' },
  { icon: RefreshCw,   title: 'Easy Returns',     desc: '30-day return policy' },
  { icon: Headphones,  title: '24/7 Support',     desc: 'Always here to help' },
]

export default function HomePage() {
  const heroRef    = useRef<HTMLElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP hero text animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title span', { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.3 })
      gsap.fromTo('.hero-sub', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power3.out' })
      gsap.fromTo('.hero-ctas', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, ease: 'power3.out' })

      // Stats counter animation
      gsap.fromTo('.stat-num', { textContent: 0 },
        {
          textContent: (i: number) => [50000, 200, 98, 4.9][i],
          duration: 2, ease: 'power2.out', snap: { textContent: 1 },
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
        }
      )

      // Scroll reveal cards
      gsap.fromTo('.reveal-card', { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.reveal-section', start: 'top 85%' },
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={heroRef}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(245,184,0,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(245,184,0,0.05) 0%, transparent 40%)' }} />

        {/* Floating circles */}
        <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full border border-gold/10 animate-spin-slow" />
        <div className="absolute top-1/3 right-20 w-40 h-40 rounded-full border border-gold/5 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-gold/5 animate-float" />

        <div className="container-shop relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="section-tag mb-6">
                <Zap className="w-3 h-3" /> New Season Drop 2026
              </motion.div>

              <h1 className="hero-title font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-none mb-8 overflow-hidden">
                {['Step', 'Into', 'Your', 'Best'].map((word, i) => (
                  <span key={i} className={`block ${i === 2 ? 'text-gold-gradient' : 'text-white'}`}>
                    {word}
                  </span>
                ))}
              </h1>

              <p className="hero-sub text-lg text-gray-400 max-w-lg leading-relaxed mb-10">
                Discover the world's most iconic sneakers. From limited drops to everyday essentials —
                authentic, premium, and delivered to your door.
              </p>

              <div className="hero-ctas flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-gold text-base px-8 py-4 rounded-2xl">
                  Shop Collection <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/products?category=limited" className="btn-outline text-base px-8 py-4 rounded-2xl">
                  🔥 Limited Drops
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {['#F87171','#60A5FA','#34D399','#FBBF24'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-50 flex items-center justify-center text-xs font-bold"
                      style={{ background: c }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />)}
                  </div>
                  <p className="text-xs text-gray-500">Trusted by 50,000+ sneaker lovers</p>
                </div>
              </div>
            </div>

            {/* Right — Hero visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl scale-75" />
                {/* Shoe */}
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=90"
                  alt="Featured Sneaker"
                  className="relative w-[500px] h-[400px] object-cover rounded-3xl border border-gold/20 shadow-[0_0_80px_rgba(245,184,0,0.15)]"
                />
                {/* Floating badges */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-6 -right-6 card-glass px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-xs text-gray-400">Today's Drop</p>
                    <p className="text-sm font-bold text-white">Air Max Pulse</p>
                  </div>
                </motion.div>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-6 card-glass px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-accent-green" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Sold this week</p>
                    <p className="text-sm font-bold text-white">+12,400 pairs</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} className="bg-dark-50 border-y border-surface-border py-12">
        <div className="container-shop grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { suffix: '+', label: 'Happy Customers', color: 'text-gold' },
            { suffix: '+', label: 'Sneaker Styles',  color: 'text-accent-blue' },
            { suffix: '%', label: 'Authentic Rate',  color: 'text-accent-green' },
            { suffix: '',  label: 'Avg Rating',      color: 'text-gold' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className={`font-display font-black text-4xl ${s.color}`}>
                <span className="stat-num">0</span>{s.suffix}
              </p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="py-20">
        <div className="container-shop">
          <div className="text-center mb-12">
            <span className="section-tag"><Award className="w-3 h-3" /> Shop by Category</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Find Your Style</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <Link to={`/products?category=${cat.query}`}
                  className={`group block bg-gradient-to-br ${cat.bg} border border-surface-border rounded-2xl p-5 text-center hover:border-gold/40 transition-all duration-300 hover:-translate-y-1`}>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                  <p className="text-sm font-semibold text-white">{cat.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 bg-dark-50/50 reveal-section">
        <div className="container-shop">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-tag"><Zap className="w-3 h-3" /> Featured Drops</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Most Wanted</h2>
            </div>
            <Link to="/products" className="btn-outline text-sm py-2.5 px-5 hidden sm:flex">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((p, i) => (
              <div key={p.id} className="reveal-card">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND MARQUEE ── */}
      <section className="py-12 border-y border-surface-border overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="text-2xl font-display font-black text-gray-700 hover:text-gold transition-colors cursor-pointer">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-20">
        <div className="container-shop">
          <div className="relative overflow-hidden bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/30 rounded-3xl p-10 sm:p-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div>
                <p className="section-tag mb-3"><Zap className="w-3 h-3" /> Limited Time Offer</p>
                <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-3">
                  Up to <span className="text-gold">40% OFF</span>
                </h2>
                <p className="text-gray-400 max-w-md">On selected Nike, Adidas, and Jordan styles. Don't miss out on these incredible deals.</p>
              </div>
              <Link to="/products" className="btn-gold text-base px-10 py-4 rounded-2xl whitespace-nowrap shrink-0">
                Shop the Sale <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="py-20 bg-dark-50/50">
        <div className="container-shop">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-tag">✨ Fresh Stock</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">New Arrivals</h2>
            </div>
            <Link to="/products?sort=newest" className="btn-outline text-sm py-2.5 px-5 hidden sm:flex">
              See All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="py-20">
        <div className="container-shop grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-dark p-6 text-center group hover:border-gold/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <p.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-semibold text-white mb-1">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-dark-50/50">
        <div className="container-shop">
          <div className="text-center mb-12">
            <span className="section-tag"><Star className="w-3 h-3" /> Reviews</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">What Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Ahmed K.',    role: 'Verified Buyer', text: 'The Air Max Pulse is exactly what I needed. Fast delivery, perfect fit, authentic product. ShopNest is my go-to!', rating: 5 },
              { name: 'Sarah M.',   role: 'Sneaker Collector', text: 'Got the Jordan 1 Retro OG and it arrived in perfect condition. The quality check before shipping is top-notch.', rating: 5 },
              { name: 'Omar R.',    role: 'Marathon Runner', text: 'Ultraboost 22 for my marathon training — the cushioning is unreal. Free shipping was a bonus!', rating: 5 },
            ].map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-dark p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold fill-gold" />)}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}