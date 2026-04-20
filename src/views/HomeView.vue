<template>
  <div>
    <!-- Hero Banner -->
    <section class="relative bg-zinc-900 text-white overflow-hidden min-h-[85vh] flex items-center">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">New Collection 2026</p>
          <h1 class="text-6xl lg:text-8xl font-black uppercase leading-none tracking-tight mb-6">
            Shop<br/><span class="text-transparent" style="-webkit-text-stroke: 2px white;">Premium.</span><br/>Live<br/>Luxe.
          </h1>
          <p class="text-zinc-400 text-lg mb-8 max-w-md leading-relaxed">
            Discover thousands of products across every category. Quality guaranteed, prices unmatched.
          </p>
          <div class="flex flex-wrap gap-4">
            <RouterLink to="/products"
              class="px-8 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Shop Now →
            </RouterLink>
            <RouterLink to="/products"
              class="px-8 py-4 border-2 border-white text-white font-black uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors">
              Browse All
            </RouterLink>
          </div>
        </div>

        <!-- Featured product cards -->
        <div class="hidden lg:grid grid-cols-2 gap-4">
          <div v-for="(product, i) in featuredProducts.slice(0, 4)" :key="product.id"
            @click="$router.push(`/product/${product.id}`)"
            :class="i % 2 === 1 ? 'mt-8' : ''"
            class="bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
            <img :src="product.thumbnail" :alt="product.title" class="w-full h-40 object-cover" />
            <div class="p-3">
              <p class="text-xs font-bold truncate">{{ product.title }}</p>
              <p class="text-zinc-400 text-xs">${{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="bg-zinc-100 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
      <div class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-2xl font-black">{{ stat.value }}</p>
          <p class="text-xs text-zinc-500 uppercase tracking-widest mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Hand Picked</p>
          <h2 class="text-4xl font-black uppercase tracking-tight">Featured<br/>Products</h2>
        </div>
        <RouterLink to="/products" class="text-sm font-black uppercase tracking-wider hover:opacity-60 transition-opacity">
          View All →
        </RouterLink>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="bg-zinc-100 dark:bg-zinc-800 rounded-xl aspect-square animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Category Showcase -->
    <section class="bg-zinc-50 dark:bg-zinc-900 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <p class="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Explore</p>
          <h2 class="text-4xl font-black uppercase tracking-tight">Shop by Category</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <RouterLink v-for="cat in topCategories" :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="group bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 text-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 hover:border-transparent transition-all duration-300 cursor-pointer">
            <p class="font-black text-sm uppercase tracking-wider capitalize group-hover:scale-105 transition-transform">{{ cat.name }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'

const { products, categories, loading, fetchProducts, fetchCategories } = useProducts()

const featuredProducts = computed(() => products.value.slice(0, 8))
const topCategories = computed(() => categories.value.slice(0, 10))

const stats = [
  { value: '10K+', label: 'Products' },
  { value: '500+', label: 'Brands' },
  { value: '4.8★', label: 'Avg Rating' },
  { value: 'Free', label: 'Shipping $25+' },
]

onMounted(async () => {
  await Promise.all([fetchProducts(8), fetchCategories()])
})
</script>