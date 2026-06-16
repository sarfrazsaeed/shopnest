import { Link } from 'react-router-dom'
import { Zap, Instagram, Twitter, Youtube, Github } from 'lucide-react'

const links = {
  Shop:    [['All Sneakers','/products'],['Running','/products?category=running'],['Lifestyle','/products?category=lifestyle'],['Limited','/products?category=limited']],
  Company: [['About Us','#'],['Careers','#'],['Press','#'],['Contact','#']],
  Support: [['Size Guide','#'],['Shipping Info','#'],['Returns','#'],['FAQ','#']],
}

export default function Footer() {
  return (
    <footer className="bg-dark-50 border-t border-surface-border mt-24">
      <div className="container-shop py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center">
                <Zap className="w-5 h-5 text-dark" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl text-white">Shop<span className="text-gold">Nest</span></span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-6">
              Premium sneakers and fashion for those who move with purpose. Authentic products, unbeatable style.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube, Github].map((Icon, i) => (
                <a key={i} href="#" className="btn-icon w-9 h-9 rounded-lg">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-gray-500 hover:text-gold transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 ShopNest. All rights reserved. Built with React + TypeScript.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className="text-xs text-gray-600 hover:text-gold transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}