<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Back -->
    <button @click="$router.back()"
      class="flex items-center gap-2 text-sm font-black uppercase tracking-wider mb-8 hover:opacity-60 transition-opacity">
      ← Back
    </button>

    <!-- Loading -->
    <div v-if="loading" class="grid lg:grid-cols-2 gap-12">
      <div class="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl animate-pulse"></div>
      <div class="flex flex-col gap-4">
        <div class="h-6 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-1/3"></div>
        <div class="h-10 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse"></div>
        <div class="h-10 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-2/3"></div>
      </div>
    </div>

    <div v-else-if="product" class="grid lg:grid-cols-2 gap-12">
      <!-- Images -->
      <div class="flex flex-col gap-4">
        <div class="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden">
          <img :src="selectedImage" :alt="product.title" class="w-full h-full object-cover" />
        </div>
        <div class="grid grid-cols-4 gap-3">
          <button v-for="img in product.images" :key="img" @click="selectedImage = img"
            :class="selectedImage === img ? 'ring-2 ring-zinc-900 dark:ring-white' : 'opacity-60 hover:opacity-100'"
            class="aspect-square rounded-xl overflow-hidden transition-all">
            <img :src="img" :alt="product.title" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div class="flex flex-col">
        <p class="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{{ product.brand ?? product.category }}</p>
        <h1 class="text-4xl font-black uppercase tracking-tight leading-tight mb-4">{{ product.title }}</h1>

        <!-- Rating -->
        <div class="flex items-center gap-3 mb-6">
          <div class="flex">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5" :class="i <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-300 fill-zinc-300'"
              viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <span class="font-bold">{{ product.rating }}/5</span>
          <span class="text-zinc-400 text-sm">· {{ product.stock }} in stock</span>
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-4 mb-6">
          <span class="text-5xl font-black">${{ product.price.toFixed(2) }}</span>
          <div class="flex flex-col">
            <span class="text-zinc-400 line-through text-lg">
              ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
            </span>
            <span class="text-green-500 font-black text-sm">{{ Math.round(product.discountPercentage) }}% OFF</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">{{ product.description }}</p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span class="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-wider capitalize">
            {{ product.category }}
          </span>
          <span v-if="product.brand" class="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-wider">
            {{ product.brand }}
          </span>
        </div>

        <!-- Quantity + Add to cart -->
        <div class="flex items-center gap-4 mb-4">
          <div class="flex items-center border-2 border-zinc-900 dark:border-white rounded-xl overflow-hidden">
            <button @click="qty = Math.max(1, qty - 1)"
              class="px-4 py-3 font-black text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">−</button>
            <span class="px-6 py-3 font-black text-lg border-x-2 border-zinc-900 dark:border-white">{{ qty }}</span>
            <button @click="qty++"
              class="px-4 py-3 font-black text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">+</button>
          </div>
          <button @click="handleAddToCart"
            class="flex-1 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black uppercase tracking-widest hover:opacity-80 transition-all rounded-xl text-sm">
            {{ added ? '✓ Added to Cart!' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types'

const route = useRoute()
const { fetchProduct } = useProducts()
const cart = useCartStore()

const product = ref<Product | null>(null)
const selectedImage = ref('')
const loading = ref(true)
const qty = ref(1)
const added = ref(false)

onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await fetchProduct(id)
  selectedImage.value = product.value.thumbnail
  loading.value = false
})

function handleAddToCart() {
  if (!product.value) return
  for (let i = 0; i < qty.value; i++) cart.addToCart(product.value)
  added.value = true
  setTimeout(() => added.value = false, 1500)
}
</script>