import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown, Search } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import { ProductCardSkeleton } from '../components/ui/Skeleton'
import { products, brands as allBrands, categories as allCats, MAX_PRICE } from '../data/products'
import { useDebounce } from '../hooks/useDebounce'
import type { SortOption, FilterState, Category } from '../types'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'Newest First' },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'popular',    label: 'Most Popular' },
]

export default function ProductsPage() {
  const [params] = useSearchParams()
  const initCat = params.get('category') as Category | null
  const initSearch = params.get('search') || ''

  const [sort, setSort]   = useState<SortOption>('featured')
  const [search, setSearch] = useState(initSearch)
  const [view, setView]   = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [loading]         = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: initCat ? [initCat] : [],
    priceRange: [0, MAX_PRICE],
    minRating: 0,
    brands: [],
    sizes: [],
    inStockOnly: false,
  })

  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    let result = [...products]

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }
    if (filters.categories.length > 0)
      result = result.filter(p => filters.categories.includes(p.category))
    if (filters.brands.length > 0)
      result = result.filter(p => filters.brands.includes(p.brand))
    if (filters.inStockOnly)
      result = result.filter(p => p.inStock)
    if (filters.minRating > 0)
      result = result.filter(p => p.rating >= filters.minRating)

    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    switch (sort) {
      case 'price-low':  result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break
      case 'popular':    result.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)); break
      case 'newest':     result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew)); break
    }

    return result
  }, [debouncedSearch, filters, sort])

  const toggleCat = (cat: Category) =>
    setFilters(f => ({
      ...f,
      categories: f.categories.includes(cat) ? f.categories.filter(c => c !== cat) : [...f.categories, cat],
    }))

  const toggleBrand = (brand: string) =>
    setFilters(f => ({
      ...f,
      brands: f.brands.includes(brand) ? f.brands.filter(b => b !== brand) : [...f.brands, brand],
    }))

  const clearFilters = () => setFilters({ categories: [], priceRange: [0, MAX_PRICE], minRating: 0, brands: [], sizes: [], inStockOnly: false })
  const activeFilters = filters.categories.length + filters.brands.length + (filters.inStockOnly ? 1 : 0) + (filters.minRating > 0 ? 1 : 0)

  return (
    <main className="pt-24 pb-20">
      <div className="container-shop">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">All Sneakers</h1>
          <p className="text-gray-500">{filtered.length} styles available</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input className="input-dark pl-11" placeholder="Search sneakers, brands..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="flex gap-3 shrink-0">
            {/* Filter btn */}
            <button onClick={() => setShowFilters(s => !s)}
              className={`btn-outline gap-2 relative ${showFilters ? 'border-gold text-gold' : ''}`}>
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select value={sort} onChange={e => setSort(e.target.value as SortOption)}
                className="input-dark pr-10 appearance-none cursor-pointer min-w-[160px]">
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* View toggle */}
            <div className="flex border border-surface-border rounded-xl overflow-hidden">
              <button onClick={() => setView('grid')}
                className={`px-3 py-2.5 transition-colors ${view === 'grid' ? 'bg-gold text-dark' : 'text-gray-400 hover:text-white'}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setView('list')}
                className={`px-3 py-2.5 transition-colors ${view === 'list' ? 'bg-gold text-dark' : 'text-gray-400 hover:text-white'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8">
              <div className="card-dark p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Categories */}
                <div>
                  <p className="label-dark mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {allCats.map(cat => (
                      <button key={cat} onClick={() => toggleCat(cat as Category)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize ${
                          filters.categories.includes(cat as Category)
                            ? 'bg-gold text-dark border-gold font-semibold'
                            : 'border-surface-border text-gray-400 hover:border-gold hover:text-gold'
                        }`}>{cat}</button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <p className="label-dark mb-3">Brand</p>
                  <div className="flex flex-wrap gap-2">
                    {allBrands.map(b => (
                      <button key={b} onClick={() => toggleBrand(b)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          filters.brands.includes(b)
                            ? 'bg-gold text-dark border-gold font-semibold'
                            : 'border-surface-border text-gray-400 hover:border-gold hover:text-gold'
                        }`}>{b}</button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <p className="label-dark mb-3">Price: $0 — ${filters.priceRange[1]}</p>
                  <input type="range" min={0} max={MAX_PRICE} step={10}
                    value={filters.priceRange[1]}
                    onChange={e => setFilters(f => ({ ...f, priceRange: [0, Number(e.target.value)] }))}
                    className="w-full accent-gold" />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>$0</span><span>${MAX_PRICE}</span>
                  </div>
                </div>

                {/* Others */}
                <div className="space-y-3">
                  <p className="label-dark">Other</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={filters.inStockOnly}
                      onChange={e => setFilters(f => ({ ...f, inStockOnly: e.target.checked }))}
                      className="accent-gold rounded" />
                    <span className="text-sm text-gray-400">In Stock Only</span>
                  </label>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Min Rating</p>
                    <div className="flex gap-1">
                      {[0,3,4,4.5].map(r => (
                        <button key={r} onClick={() => setFilters(f => ({ ...f, minRating: r }))}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            filters.minRating === r ? 'bg-gold text-dark border-gold' : 'border-surface-border text-gray-400 hover:border-gold'
                          }`}>{r === 0 ? 'All' : `${r}+⭐`}</button>
                      ))}
                    </div>
                  </div>
                  {activeFilters > 0 && (
                    <button onClick={clearFilters}
                      className="flex items-center gap-1.5 text-xs text-accent-red hover:text-red-400 transition-colors mt-2">
                      <X className="w-3 h-3" /> Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.categories.map(c => (
              <button key={c} onClick={() => toggleCat(c)}
                className="flex items-center gap-1.5 text-xs bg-gold/10 text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/20 transition-colors capitalize">
                {c} <X className="w-3 h-3" />
              </button>
            ))}
            {filters.brands.map(b => (
              <button key={b} onClick={() => toggleBrand(b)}
                className="flex items-center gap-1.5 text-xs bg-gold/10 text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/20 transition-colors">
                {b} <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">👟</div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">No sneakers found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
            <button onClick={clearFilters} className="btn-gold">Clear Filters</button>
          </div>
        ) : (
          <div className={view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
          }>
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </main>
  )
}