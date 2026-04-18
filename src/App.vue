<template>
  <div :class="{ dark: isDark }" class="min-h-screen">
    <div class="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <NavBar :is-dark="isDark" @toggle-dark="isDark = !isDark" />
      <CartDrawer />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import CartDrawer from './components/CartDrawer.vue'

const isDark = ref(localStorage.getItem('darkMode') === 'true')
</script>