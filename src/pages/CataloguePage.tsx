import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { fetchCategories, fetchProductsByCategory } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ErrorState } from '@/components/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { normalizeCategoryLabel } from '@/lib/utils'

export default function CataloguePage() {
  const navigate = useNavigate()

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const categoryImagesQuery = useQuery({
    queryKey: ['category-images', categories],
    queryFn: async () => {
      if (!categories) return {}
      const images: Record<string, string> = {}
      await Promise.all(
        categories.map(async (category) => {
          try {
            const products = await fetchProductsByCategory(category, 1)
            if (products.length > 0) {
              images[category] = products[0].thumbnail
            }
          } catch (e) {
            console.error(`Failed to fetch image for ${category}:`, e)
          }
        })
      )
      return images
    },
    enabled: !!categories,
  })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState message="Failed to load categories" onRetry={() => refetch()} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Catalogue Overview</h1>
        <p className="text-muted-foreground">Browse products by category</p>
      </div>

      {isLoading || categoryImagesQuery.isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <Card
              key={category}
              onClick={() => navigate(`/inventory?category=${category}`)}
              className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border"
            >
              <CardContent className="p-0">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-muted group-hover:opacity-90 transition-opacity">
                  {categoryImagesQuery.data?.[category] ? (
                    <img
                      src={categoryImagesQuery.data[category]}
                      alt={normalizeCategoryLabel(category)}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{normalizeCategoryLabel(category)}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
