import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, ShoppingBag } from 'lucide-react'
import { useToastStore } from '../../store/useToastStore'

const icons = {
  success: <CheckCircle className="w-4 h-4 text-accent-green" />,
  error:   <AlertCircle className="w-4 h-4 text-accent-red" />,
  info:    <ShoppingBag className="w-4 h-4 text-gold" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
}

const borders = {
  success: 'border-accent-green/30',
  error:   'border-accent-red/30',
  info:    'border-gold/30',
  warning: 'border-yellow-400/30',
}

export default function ToastContainer() {
  const { toasts, remove } = useToastStore()
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`flex items-start gap-3 bg-surface border ${borders[t.type]} rounded-2xl px-4 py-3 shadow-card`}
          >
            <span className="mt-0.5 shrink-0">{icons[t.type]}</span>
            <p className="text-sm text-white flex-1">{t.message}</p>
            <button onClick={() => remove(t.id)} className="text-gray-600 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}