import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { StockBadge } from '@/components/StockBadge'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className={cn('block', className)}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="p-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <h3 className="font-semibold line-clamp-2 mb-2">{product.title}</h3>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-lg font-bold">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-lg font-bold">${product.price}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <StockBadge stock={product.stock} />
        </CardContent>
      </Card>
    </Link>
  )
}
