import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpDown, Search, ArrowUp, ArrowDown, Star, ArrowLeft } from 'lucide-react'
import { fetchProducts, searchProducts, fetchCategories } from '@/api/client'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { StockBadge } from '@/components/StockBadge'
import { ErrorState } from '@/components/ErrorState'
import { EmptyState } from '@/components/EmptyState'
import { ProductSkeleton } from '@/components/ProductSkeleton'
import { ProductCard } from '@/components/ProductCard'
import { useDebounce } from '@/hooks/useDebounce'
import { normalizeCategoryLabel } from '@/lib/utils'
import type { SortField, SortOrder } from '@/types'

const INITIAL_LIMIT = 20

export default function InventoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const category = searchParams.get('category') || ''
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('title')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [skip, setSkip] = useState(0)

  const debouncedSearch = useDebounce(searchQuery, 300)

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: debouncedSearch
      ? ['products', { search: debouncedSearch }]
      : ['products', { category, skip, limit: INITIAL_LIMIT }],
    queryFn: () => {
      if (debouncedSearch) {
        return searchProducts(debouncedSearch)
      }
      return fetchProducts({ limit: INITIAL_LIMIT, skip, category: category || undefined })
    },
    enabled: !categoriesLoading,
  })

  const displayedProducts = useMemo(() => {
    if (!productsData?.products) return []
    if (debouncedSearch) {
      return productsData.products.slice(0, skip + INITIAL_LIMIT)
    }
    return productsData.products
  }, [productsData?.products, skip, debouncedSearch])

  const sortedProducts = useMemo(() => {
    if (displayedProducts.length === 0) return []
    const products = [...displayedProducts]
    products.sort((a, b) => {
      let aValue: string | number = a[sortField]
      let bValue: string | number = b[sortField]
      if (sortField === 'title') {
        aValue = (aValue as string).toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      }
      return aValue < bValue ? 1 : -1
    })
    return products
  }, [displayedProducts, sortField, sortOrder])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams(newCategory ? { category: newCategory } : {})
    setSkip(0)
    setSearchQuery('')
  }

  const handleLoadMore = () => {
    setSkip(prev => prev + INITIAL_LIMIT)
  }

  const hasMore = productsData
    ? debouncedSearch
      ? productsData.total > skip + INITIAL_LIMIT
      : productsData.total > skip + INITIAL_LIMIT
    : false

  if (categoriesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState message="Failed to load categories" onRetry={() => window.location.reload()} />
      </div>
    )
  }

  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState message="Failed to load products" onRetry={() => refetchProducts()} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Inventory Overview</h1>
        <p className="text-muted-foreground">Manage and view your product inventory</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setSkip(0)
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={category}
          onChange={e => handleCategoryChange(e.target.value)}
          className="w-full sm:w-48"
        >
          <option value="">All Categories</option>
          {categoriesData?.map(cat => (
            <option key={cat} value={cat}>
              {normalizeCategoryLabel(cat)}
            </option>
          ))}
        </Select>
      </div>

      {productsLoading && skip === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse bg-card">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold text-sm">Image</th>
                  <th className="text-left p-4 font-semibold text-sm">
                    <button
                      onClick={() => handleSort('title')}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      Product Name
                      {sortField === 'title' ? (
                        sortOrder === 'asc' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="text-left p-4 font-semibold text-sm">Brand</th>
                  <th className="text-left p-4 font-semibold text-sm">Category</th>
                  <th className="text-left p-4 font-semibold text-sm">
                    <button
                      onClick={() => handleSort('price')}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      Price
                      {sortField === 'price' ? (
                        sortOrder === 'asc' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="text-left p-4 font-semibold text-sm">Stock Status</th>
                  <th className="text-left p-4 font-semibold text-sm">Rating</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map(product => (
                  <tr
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="border-b hover:bg-muted/50 cursor-pointer transition-colors group"
                  >
                    <td className="p-4">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-md border"
                        loading="lazy"
                      />
                    </td>
                    <td className="p-4 font-medium group-hover:text-primary transition-colors">{product.title}</td>
                    <td className="p-4 text-muted-foreground">{product.brand}</td>
                    <td className="p-4 text-muted-foreground">{normalizeCategoryLabel(product.category)}</td>
                    <td className="p-4">
                      {product.discountPercentage > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                        </div>
                      ) : (
                        <span className="font-semibold">${product.price}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <StockBadge stock={product.stock} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden grid grid-cols-1 gap-4">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <Button onClick={handleLoadMore} variant="outline" disabled={productsLoading}>
                {productsLoading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
