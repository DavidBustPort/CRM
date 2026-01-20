import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/prospectos',
        name: 'Prospectos',
        component: () => import('./Prospectos.vue'),
        meta: {
            sidebarMenu: true,
            icon: 'fa-person-walking-dashed-line-arrow-right',
        },
        children: [
            {
                path: '',
                name: 'Lista de Prospectos',
                component: () => import('./pages/list/List.vue'),
                meta: {
                    canExtendContainer: true
                }
            },
            {
                path: 'crear',
                name: 'Crear Prospecto',
                component: () => import('./pages/sharedForm/AddProspecto.vue'),
                meta: {
                    canExtendContainer: true,
                    mainContainerColumn: 'col-xxl-8 offset-xxl-2'
                }
            }
        ]
    }
]

export default routes