import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/leads',
        name: 'Leads',
        component: () => import('./Leads.vue'),
        meta: {
            sidebarMenu: true,
            isSidebarMenuParent: true,
            icon: 'fa-inbox',
            requiresHeavyLoading: true
        }
    }
]

export default routes