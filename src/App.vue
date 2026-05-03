<template>
  <div class="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
    <NavBar :is-dark="isDark" @toggle-dark="toggleDark" />
    <CartDrawer />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import NavBar from './components/NavBar.vue'
import CartDrawer from './components/CartDrawer.vue'

const isDark = ref(localStorage.getItem('darkMode') === 'true')

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', String(isDark.value))
}

watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })
</script>