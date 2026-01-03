import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchProduct, fetchProductsByCategory } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StockBadge } from '@/components/StockBadge'
import { ErrorState } from '@/components/ErrorState'
import { ProductCard } from '@/components/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { normalizeCategoryLabel } from '@/lib/utils'
import { useState } from 'react'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(Number(id)),
    enabled: !!id,
  })

  const {
    data: similarProducts,
    isLoading: similarLoading,
  } = useQuery({
    queryKey: ['similar-products', product?.category, id],
    queryFn: () => fetchProductsByCategory(product!.category, 7),
    enabled: !!product?.category,
    select: (data) => data.filter(p => p.id !== product!.id).slice(0, 6),
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="aspect-square w-full mb-4" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-20" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState message="Failed to load product" onRetry={() => refetch()} />
      </div>
    )
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted mb-4 border shadow-sm">
            <img
              src={images[selectedImageIndex]}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-muted-foreground">{product.brand}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{normalizeCategoryLabel(product.category)}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
              </div>
              <StockBadge stock={product.stock} />
            </div>
          </div>

          <div className="space-y-2">
            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                <span className="text-sm text-destructive font-semibold">
                  -{product.discountPercentage}% OFF
                </span>
              </div>
            )}
            {!product.discountPercentage && (
              <span className="text-3xl font-bold">${product.price}</span>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground">SKU</div>
                  <div className="font-medium">{product.sku || `SKU-${product.id}`}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="font-medium">{product.weight ? `${product.weight} kg` : 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Dimensions</div>
                  <div className="font-medium">
                    {product.dimensions
                      ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
                      : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Warranty</div>
                  <div className="font-medium">{product.warrantyInformation || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Shipping</div>
                  <div className="font-medium">{product.shippingInformation || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Return Policy</div>
                  <div className="font-medium">{product.returnPolicy || '30 Days Return'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Minimum Order</div>
                  <div className="font-medium">{product.minimumOrderQuantity || 1} unit(s)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <Card className="mb-12 shadow-sm">
          <CardHeader>
            <CardTitle>Reviews ({product.reviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0 pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.reviewerName}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {similarProducts && similarProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          {similarLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
