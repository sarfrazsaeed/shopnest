import { Star } from 'lucide-react'

interface Props { rating: number; count?: number; size?: 'sm' | 'md' }

export default function StarRating({ rating, count, size = 'sm' }: Props) {
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} className={`${sz} ${i <= Math.round(rating) ? 'text-gold fill-gold' : 'text-gray-700'}`} />
        ))}
      </div>
      <span className="text-xs text-gray-400">{rating.toFixed(1)}</span>
      {count && <span className="text-xs text-gray-600">({count.toLocaleString()})</span>}
    </div>
  )
}