export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags?: string[]
  brand: string
  sku?: string
  weight?: number
  dimensions?: Dimensions
  warrantyInformation?: string
  shippingInformation?: string
  availabilityStatus?: string
  reviews?: Review[]
  returnPolicy?: string
  minimumOrderQuantity?: number
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type SortField = 'title' | 'price'
export type SortOrder = 'asc' | 'desc'

export interface StockStatus {
  label: string
  variant: 'default' | 'secondary' | 'destructive'
}

export interface Category {
  slug: string
  name: string
  url: string
}
