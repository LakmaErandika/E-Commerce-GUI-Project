import { ref } from 'vue'
import type { Product, ProductsResponse, Category } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const total = ref(0)

  async function fetchProducts(limit = 20, skip = 0, category = '', search = '') {
    loading.value = true
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      if (search) url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}`
      else if (category) url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
      const res = await fetch(url)
      const data: ProductsResponse = await res.json()
      products.value = data.products
      total.value = data.total
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    const res = await fetch('https://dummyjson.com/products/categories')
    categories.value = await res.json()
  }

  async function fetchProduct(id: number): Promise<Product> {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    return res.json()
  }

  return { products, categories, loading, total, fetchProducts, fetchCategories, fetchProduct }
}