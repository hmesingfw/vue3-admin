import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/page/table.vue')
    },
    {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/page/form.vue')
    },
    {
        path: '/capi',
        name: 'Capi',
        component: () => import('@/views/capi/page.vue')
    },
    {
        path: '/matting',
        name: 'Matting',
        component: () => import('@/views/page/matting.vue')
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
