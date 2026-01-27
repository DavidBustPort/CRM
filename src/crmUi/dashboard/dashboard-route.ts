import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Inicio',
        component: () => import('./Dashboard.vue'),
        meta: {
            sidebarMenu: true,
            isSidebarMenuParent: true,
            icon: 'fa-house',
            requiresHeavyLoading: true
        }
    }
]

export default routes