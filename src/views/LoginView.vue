<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-950">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="w-14 h-14 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
          <span class="text-white dark:text-zinc-900 font-black text-2xl">LM</span>
        </div>
        <h1 class="text-3xl font-black uppercase tracking-tight">Welcome Back</h1>
        <p class="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">Sign in to your LUXMART account</p>
      </div>

      <!-- Card -->
      <div class="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-100 dark:border-zinc-800">
        <!-- Error -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
          {{ error }}
        </div>

        <div class="flex flex-col gap-5">
          <!-- Username -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Username</label>
            <input v-model="username" type="text" placeholder="e.g. emilys"
              class="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-transparent focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-sm font-medium transition-colors" />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Password</label>
            <div class="relative">
              <input v-model="password" :type="showPass ? 'text' : 'password'" placeholder="••••••••"
                class="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-transparent focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-sm font-medium transition-colors pr-12" />
              <button @click="showPass = !showPass" class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors text-xs font-bold uppercase">
                {{ showPass ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button @click="handleLogin" :disabled="loading"
            class="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black uppercase tracking-widest rounded-xl hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
            <svg v-if="loading" class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </div>

        <!-- Hint -->
        <div class="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
          <p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium text-center">
            🧪 Test credentials: <span class="font-black text-zinc-700 dark:text-zinc-300">emilys</span> / <span class="font-black text-zinc-700 dark:text-zinc-300">emilyspass</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPass = ref(false)

async function handleLogin() {
  if (!username.value || !password.value) {
    error.value = 'Please enter both username and password.'
    return
  }
  loading.value = true
  error.value = ''
  const success = await auth.login(username.value, password.value)
  loading.value = false
  if (success) {
    router.push('/')
  } else {
    error.value = 'Invalid username or password. Try: emilys / emilyspass'
  }
}
</script>