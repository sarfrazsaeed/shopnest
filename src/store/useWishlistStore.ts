import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem, Product } from '../types'

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  toggle: (product: Product) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set(s => ({ items: [...s.items, { product, addedAt: new Date().toISOString() }] }))
        }
      },
      removeItem: (productId) => set(s => ({ items: s.items.filter(i => i.product.id !== productId) })),
      isWishlisted: (productId) => get().items.some(i => i.product.id === productId),
      toggle: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
    }),
    { name: 'shopnest-wishlist' }
  )
)