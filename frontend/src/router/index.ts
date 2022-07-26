import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/user',
            component: () => import('../views/UserView.vue'),
        },
    ]
})

export default router
