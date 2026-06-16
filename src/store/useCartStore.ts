import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, Color } from '../types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, color: Color, size: string) => void
  removeItem: (productId: string, size: string, colorName: string) => void
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, color, size) => {
        const existing = get().items.find(
          i => i.product.id === product.id && i.selectedSize === size && i.selectedColor.name === color.name
        )
        if (existing) {
          set(s => ({
            items: s.items.map(i =>
              i.product.id === product.id && i.selectedSize === size && i.selectedColor.name === color.name
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }))
        } else {
          set(s => ({ items: [...s.items, { product, quantity: 1, selectedColor: color, selectedSize: size }] }))
        }
      },

      removeItem: (productId, size, colorName) => {
        set(s => ({
          items: s.items.filter(
            i => !(i.product.id === productId && i.selectedSize === size && i.selectedColor.name === colorName)
          ),
        }))
      },

      updateQuantity: (productId, size, colorName, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, colorName)
          return
        }
        set(s => ({
          items: s.items.map(i =>
            i.product.id === productId && i.selectedSize === size && i.selectedColor.name === colorName
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      total:      () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      itemCount:  () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'shopnest-cart' }
  )
)