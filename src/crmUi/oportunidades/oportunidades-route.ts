import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/oportunidades',
        name: 'Oportunidades',
        component: () => import('./Oportunidades.vue'),
        meta: {
            sidebarMenu: true,
            icon: 'fa-diagram-project'
        },
        children: [
            
        ]
    }
]

export default routes