import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/reportes',
        name: 'Reportes',
        component: () => import('./Reportes.vue'),
        meta: {
            sidebarMenu: true,
            icon: 'fas fa-chart-line'
        },
        children: [
            {
                path: 'gestion-proyectos',
                name: 'Gestión de Proyectos',
                component: () => import('./pages/gestionProyectos/GestionProyectos.vue'),
                meta: {
                    sidebarMenu: false,
                    icon: 'fas fa-file-excel'
                }
            }
        ]
    }
]

export default routes