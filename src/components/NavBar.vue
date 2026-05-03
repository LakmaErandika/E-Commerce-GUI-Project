<template>
  <nav class="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
    <!-- Top bar -->
    <div class="bg-zinc-900 dark:bg-zinc-800 text-white text-xs text-center py-2 tracking-widest uppercase">
      Free shipping on orders over $25 — Limited time
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-zinc-900 dark:bg-white rounded-sm flex items-center justify-center">
            <span class="text-white dark:text-zinc-900 font-black text-sm">LM</span>
          </div>
          <span class="font-black text-xl tracking-tight uppercase">LUXMART</span>
        </RouterLink>

        <!-- Nav Links (desktop) -->
        <div class="hidden md:flex items-center gap-8">
          <RouterLink to="/" class="text-sm font-semibold uppercase tracking-wider hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">Home</RouterLink>
          <RouterLink to="/products" class="text-sm font-semibold uppercase tracking-wider hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">Shop</RouterLink>
          <RouterLink v-if="!auth.isLoggedIn" to="/login" class="text-sm font-semibold uppercase tracking-wider hover:text-zinc-500 transition-colors">Login</RouterLink>
          <button v-else @click="handleLogout" class="text-sm font-semibold uppercase tracking-wider hover:text-red-500 transition-colors">Logout</button>
        </div>

        <!-- Right icons -->
        <div class="flex items-center gap-4">
          <!-- Dark mode toggle -->
          <button @click="$emit('toggle-dark')" class="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
          </button>

          <!-- User avatar if logged in -->
          <div v-if="auth.isLoggedIn" class="hidden md:flex items-center gap-2">
            <img :src="auth.user?.image" class="w-8 h-8 rounded-full object-cover border-2 border-zinc-300" />
            <span class="text-sm font-medium">{{ auth.user?.firstName }}</span>
          </div>

          <!-- Cart button -->
          <button @click="cartStore.isOpen = true" class="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span v-if="cartStore.totalItems > 0"
              class="absolute -top-1 -right-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Mobile menu button -->
          <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileOpen" class="md:hidden border-t border-zinc-200 dark:border-zinc-800 py-4 flex flex-col gap-4">
        <RouterLink to="/" @click="mobileOpen = false" class="text-sm font-semibold uppercase tracking-wider">Home</RouterLink>
        <RouterLink to="/products" @click="mobileOpen = false" class="text-sm font-semibold uppercase tracking-wider">Shop</RouterLink>
        <RouterLink v-if="!auth.isLoggedIn" to="/login" @click="mobileOpen = false" class="text-sm font-semibold uppercase tracking-wider">Login</RouterLink>
        <button v-else @click="handleLogout" class="text-left text-sm font-semibold uppercase tracking-wider text-red-500">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'

defineProps<{ isDark: boolean }>()
defineEmits(['toggle-dark'])

const cartStore = useCartStore()
const auth = useAuthStore()
const router = useRouter()
const mobileOpen = ref(false)

function handleLogout() {
  auth.logout()
  mobileOpen.value = false
  router.push('/')
}
</script>