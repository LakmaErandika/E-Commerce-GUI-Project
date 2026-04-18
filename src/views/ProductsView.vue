<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header -->
    <div class="mb-8">
      <p class="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Catalogue</p>
      <h1 class="text-4xl font-black uppercase tracking-tight">
        {{ activeCategory ? activeCategory.replace(/-/g, ' ') : 'All Products' }}
        <span class="text-zinc-400 text-2xl font-medium">({{ total }})</span>
      </h1>
    </div>

    <!-- Filter bar -->
    <div class="mb-8">
      <FilterBar :categories="categories" :selected="activeCategory"
        @search="onSearch" @filter="onFilter" />
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 12" :key="i" class="bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden">
        <div class="aspect-square animate-pulse bg-zinc-200 dark:bg-zinc-700"></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-1/2"></div>
          <div class="h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div class="h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- No results -->
    <div v-else-if="products.length === 0" class="text-center py-24">
      <p class="text-6xl mb-4">🔍</p>
      <p class="text-xl font-black uppercase">No products found</p>
      <p class="text-zinc-500 mt-2">Try a different search or category</p>
    </div>

    <!-- Products grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <!-- Pagination -->
    <div v-if="!loading && products.length > 0" class="flex items-center justify-center gap-4 mt-12">
      <button @click="prevPage" :disabled="skip === 0"
        class="px-6 py-3 border-2 border-zinc-900 dark:border-white font-black uppercase tracking-wider text-sm hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        ← Prev
      </button>
      <span class="text-sm font-bold text-zinc-500">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button @click="nextPage" :disabled="skip + limit >= total"
        class="px-6 py-3 border-2 border-zinc-900 dark:border-white font-black uppercase tracking-wider text-sm hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        Next →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const route = useRoute()
const { products, categories, loading, total, fetchProducts, fetchCategories } = useProducts()

const limit = 12
const skip = ref(0)
const activeCategory = ref('')
const searchQuery = ref('')

const currentPage = computed(() => Math.floor(skip.value / limit) + 1)
const totalPages = computed(() => Math.ceil(total.value / limit))

function onSearch(query: string) {
  searchQuery.value = query
  activeCategory.value = ''
  skip.value = 0
  fetchProducts(limit, 0, '', query)
}

function onFilter(category: string) {
  activeCategory.value = category
  searchQuery.value = ''
  skip.value = 0
  fetchProducts(limit, 0, category, '')
}

function nextPage() {
  skip.value += limit
  fetchProducts(limit, skip.value, activeCategory.value, searchQuery.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function prevPage() {
  skip.value = Math.max(0, skip.value - limit)
  fetchProducts(limit, skip.value, activeCategory.value, searchQuery.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await fetchCategories()
  // Support coming from home page category click
  const cat = route.query.category as string ?? ''
  activeCategory.value = cat
  fetchProducts(limit, 0, cat, '')
})

watch(() => route.query.category, (cat) => {
  activeCategory.value = (cat as string) ?? ''
  skip.value = 0
  fetchProducts(limit, 0, activeCategory.value, '')
})
</script>