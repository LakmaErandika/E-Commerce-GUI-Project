<template>
  <div @click="$router.push(`/product/${product.id}`)"
    class="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <!-- Image -->
    <div class="relative overflow-hidden aspect-square bg-zinc-100 dark:bg-zinc-800">
      <img :src="product.thumbnail" :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <!-- Discount badge -->
      <div v-if="product.discountPercentage > 10"
        class="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded">
        -{{ Math.round(product.discountPercentage) }}%
      </div>
      <!-- Quick add overlay -->
      <div class="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button @click.stop="handleAddToCart"
          class="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black uppercase tracking-wider text-sm hover:opacity-80 transition-opacity rounded">
          {{ added ? '✓ Added!' : 'Add to Cart' }}
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <p class="text-xs text-zinc-400 uppercase tracking-widest mb-1">{{ product.brand ?? product.category }}</p>
      <h3 class="font-bold text-sm leading-tight mb-2 line-clamp-2">{{ product.title }}</h3>

      <!-- Rating -->
      <div class="flex items-center gap-1 mb-3">
        <div class="flex">
          <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg"
            class="w-3 h-3" :class="i <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-300 fill-zinc-300'"
            viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <span class="text-xs text-zinc-500">({{ product.rating }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-2">
        <span class="font-black text-lg">${{ product.price.toFixed(2) }}</span>
        <span v-if="product.discountPercentage > 0" class="text-xs text-zinc-400 line-through">
          ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../types'
import { useCartStore } from '../stores/cartStore'

const props = defineProps<{ product: Product }>()
const cart = useCartStore()
const added = ref(false)

function handleAddToCart() {
  cart.addToCart(props.product)
  added.value = true
  setTimeout(() => added.value = false, 1500)
}
</script>