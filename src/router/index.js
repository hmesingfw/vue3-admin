import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/dashboard',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/page/table.vue'),
        meta: { title: '首页', icon: 'dashboard', affix: true }

    },
    {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/page/form.vue'),
        meta: { title: '首页', icon: 'dashboard', affix: true }

    },
    {
        path: '/matting',
        name: 'Matting',
        component: () => import('@/views/page/matting.vue'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRoutes
})

export default router
