<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div v-if="cart.isOpen" @click="cart.isOpen = false"
      class="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
  </Transition>

  <!-- Drawer -->
  <Transition name="slide">
    <div v-if="cart.isOpen"
      class="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 z-50 shadow-2xl flex flex-col">

      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
        <h2 class="text-xl font-black uppercase tracking-wider">Your Cart ({{ cart.totalItems }})</h2>
        <button @click="cart.isOpen = false" class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="cart.items.length === 0" class="flex-1 flex flex-col items-center justify-center gap-4 text-zinc-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <p class="font-semibold">Your cart is empty</p>
        <button @click="cart.isOpen = false; $router.push('/products')"
          class="mt-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity">
          Start Shopping
        </button>
      </div>

      <!-- Items -->
      <div v-else class="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        <div v-for="item in cart.items" :key="item.product.id"
          class="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <img :src="item.product.thumbnail" :alt="item.product.title"
            class="w-20 h-20 object-cover rounded-md flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm truncate">{{ item.product.title }}</p>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm">${{ item.product.price.toFixed(2) }}</p>
            <!-- Quantity controls -->
            <div class="flex items-center gap-3 mt-2">
              <button @click="cart.updateQuantity(item.product.id, item.quantity - 1)"
                class="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-bold">−</button>
              <span class="font-bold w-4 text-center">{{ item.quantity }}</span>
              <button @click="cart.updateQuantity(item.product.id, item.quantity + 1)"
                class="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-bold">+</button>
            </div>
          </div>
          <div class="flex flex-col items-end justify-between">
            <button @click="cart.removeFromCart(item.product.id)" class="text-zinc-400 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <p class="font-bold text-sm">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cart.items.length > 0" class="p-6 border-t border-zinc-200 dark:border-zinc-700 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold uppercase tracking-wider">Total</span>
          <span class="text-2xl font-black">${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <button class="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
          Checkout
        </button>
        <button @click="cart.clearCart()" class="w-full py-2 text-sm text-zinc-500 hover:text-red-500 transition-colors font-semibold uppercase tracking-wider">
          Clear Cart
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
const cart = useCartStore()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>