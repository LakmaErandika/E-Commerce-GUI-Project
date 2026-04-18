import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: '/products', component: () => import('../views/ProductsView.vue') },
    { path: '/product/:id', component: () => import('../views/ProductDetailView.vue') },
    { path: '/login', component: () => import('../views/LoginView.vue') },
  ]
})

export default router