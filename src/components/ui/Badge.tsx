import type { ReactNode } from 'react'
type Variant = 'gold' | 'red' | 'green' | 'blue'
interface Props { children: ReactNode; variant?: Variant; className?: string }
const v: Record<Variant, string> = { gold: 'badge-gold', red: 'badge-red', green: 'badge-green', blue: 'badge-blue' }
export default function Badge({ children, variant = 'gold', className = '' }: Props) {
  return <span className={`badge ${v[variant]} ${className}`}>{children}</span>
}