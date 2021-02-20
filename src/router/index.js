import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        meta: { title: '首页1', icon: 'dashboard', },
        children: [
            {
                path: '',
                component: () => import('@/views/page/item'),
                name: '1',
                meta: { title: '首页1', icon: 'dashboard', affix: true }
            }, {
                path: '/table',
                name: 'Table',
                component: () => import('@/views/page/table'),
                meta: { title: '首页2', icon: 'dashboard', }

            }, {
                path: '/form',
                name: 'Form',
                component: () => import('@/views/page/form'),
                meta: { title: '首页3', icon: 'dashboard', }

            },
            {
                path: '/matting',
                name: 'Matting',
                component: () => import('@/views/page/matting'),
                meta: { title: '首页4', icon: 'dashboard', }
            },
        ]
    },
    {
        path: '/2',
        component: Layout,
        meta: { title: '首页1', icon: 'dashboard', },
        children: [
            {
                path: '',
                component: () => import('@/views/page/table'),
                name: 'Dashboard',
                meta: { title: '首页1', icon: 'dashboard', affix: true }
            },
        ]
    },
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes: constantRoutes
})

export default router
