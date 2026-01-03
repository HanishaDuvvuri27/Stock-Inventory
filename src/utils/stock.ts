import type { StockStatus } from '@/types'

export function getStockStatus(stock: number): StockStatus {
  if (stock > 20) {
    return { label: 'In Stock', variant: 'default' }
  }
  if (stock > 0 && stock <= 20) {
    return { label: 'Low Stock', variant: 'secondary' }
  }
  return { label: 'Out of Stock', variant: 'destructive' }
}
