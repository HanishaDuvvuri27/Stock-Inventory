import type { Product } from '@/types'

const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts(params: {
  limit?: number
  skip?: number
  category?: string
}): Promise<{ products: Product[]; total: number; skip: number; limit: number }> {
  const { limit = 20, skip = 0, category } = params
  const url = category
    ? `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
    : `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }
  return response.json()
}

export async function searchProducts(query: string): Promise<{ products: Product[]; total: number; skip: number; limit: number }> {
  const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error(`Failed to search products: ${response.statusText}`)
  }
  return response.json()
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }
  return response.json()
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/category-list`)
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }
  return response.json()
}

export async function fetchProductsByCategory(category: string, limit = 6): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch products by category: ${response.statusText}`)
  }
  const data = await response.json()
  return data.products || []
}
