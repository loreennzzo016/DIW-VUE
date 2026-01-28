import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/books',
        name: 'Books',
        component: () => import('../views/Books.vue')
    },
    {
        path: '/add-book',
        name: 'AddBook',
        component: () => import('../views/AddBook.vue'),
        meta: { requiresAdmin: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/auth/LoginForm.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/auth/RegisterForm.vue')
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/User.vue')
    },
    {
        path: '/reports',
        name: 'Reports',
        component: () => import('../views/Reports.vue'),
        meta: { requiresAdmin: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router