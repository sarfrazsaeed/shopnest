export interface Product {
    id: string
    name: string
    brand: string
    category: Category
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    images: string[]
    colors: Color[]
    sizes: string[]
    tags: string[]
    description: string
    features: string[]
    inStock: boolean
    isNew?: boolean
    isFeatured?: boolean
    discount?: number
    soldCount?: number
  }
  
  export type Category = 'running' | 'lifestyle' | 'basketball' | 'training' | 'casual' | 'limited'
  
  export interface Color {
    name: string
    hex: string
  }
  
  export interface CartItem {
    product: Product
    quantity: number
    selectedColor: Color
    selectedSize: string
  }
  
  export interface WishlistItem {
    product: Product
    addedAt: string
  }
  
  export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular'
  
  export interface FilterState {
    categories: Category[]
    priceRange: [number, number]
    minRating: number
    brands: string[]
    sizes: string[]
    inStockOnly: boolean
  }
  
  export interface Review {
    id: string
    author: string
    avatar: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }
  
  export type ToastType = 'success' | 'error' | 'info' | 'warning'
  
  export interface Toast {
    id: string
    message: string
    type: ToastType
  }
  
  export interface ShippingInfo {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    zipCode: string
  }