import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'
import Admin from '../views/Admin.vue'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'home',
            auth: false
        }
    },
    {
        path: '/post/:id',
        name: 'Request',
        component: () => import('../views/Request.vue'),
        meta: {
            layout: 'home',
            auth: false
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            layout: 'admin',
            auth: true
        }
    },
    {
        path: '/admin/create',
        name: 'Create',
        component: () => import('../views/Create.vue'),
        meta: {
            layout: 'admin',
            auth: true
        }
    },
    {
        path: '/admin/post/:id/edit',
        name: 'Edit',
        component: () => import('../views/RequestEdit.vue'),
        meta: {
            layout: 'admin',
            auth: true
        }
    },
    {
        path: '/admin/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'auth',
            auth: false
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth

    if (requireAuth && store.getters['auth/isAuthenticated']) {
        next()
    } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
        next('admin/auth?message=auth')
    } else {
        next()
    }
})

export default router
