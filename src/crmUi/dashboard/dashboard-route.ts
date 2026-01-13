import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Inicio',
        component: () => import('./Dashboard.vue'),
        meta: {
            sidebarMenu: true,
            icon: 'fa-house'
        }
    }
]

export default routes