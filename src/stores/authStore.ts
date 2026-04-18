import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthResponse } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthResponse | null>(
    JSON.parse(localStorage.getItem('user') ?? 'null')
  )

  const isLoggedIn = computed(() => !!user.value)

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 })
      })
      if (!res.ok) return false
      const data: AuthResponse = await res.json()
      user.value = data
      localStorage.setItem('user', JSON.stringify(data))
      return true
    } catch {
      return false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isLoggedIn, login, logout }
})