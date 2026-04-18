<template>
  <div class="flex flex-col gap-4">
    <!-- Search -->
    <div class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Search products..."
        class="w-full pl-12 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-zinc-400 dark:focus:border-zinc-500 rounded-xl outline-none text-sm font-medium transition-colors" />
    </div>

    <!-- Category pills -->
    <div class="flex gap-2 flex-wrap">
      <button @click="selectCategory('')"
        :class="selected === '' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'"
        class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors">
        All
      </button>
      <button v-for="cat in categories" :key="cat.slug" @click="selectCategory(cat.slug)"
        :class="selected === cat.slug ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'"
        class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors capitalize">
        {{ cat.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '../types'

defineProps<{ categories: Category[], selected: string }>()
const emit = defineEmits<{
  (e: 'search', query: string): void
  (e: 'filter', category: string): void
}>()

const searchQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout>

function onSearch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => emit('search', searchQuery.value), 400)
}

function selectCategory(slug: string) {
  searchQuery.value = ''
  emit('filter', slug)
}
</script>