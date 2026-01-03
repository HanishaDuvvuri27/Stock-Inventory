import { getStockStatus } from '@/utils/stock'
import { cn } from '@/lib/utils'

interface StockBadgeProps {
  stock: number
}

export function StockBadge({ stock }: StockBadgeProps) {
  const status = getStockStatus(stock)
  
  const variantClasses = {
    default: 'border-transparent bg-green-500 text-white hover:bg-green-600',
    secondary: 'border-transparent bg-orange-500 text-white hover:bg-orange-600',
    destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
  }
  
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variantClasses[status.variant]
      )}
    >
      {status.label}
    </div>
  )
}
