import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/prospectos',
        name: 'Prospectos',
        component: () => import('./Prospectos.vue'),
        meta: {
            sidebarMenu: true,
            isSidebarMenuParent: true,
            icon: 'fa-person-walking-dashed-line-arrow-right',
            canFilterRik: true
        },
        children: [
            {
                path: '',
                name: 'Lista de Prospectos',
                component: () => import('./pages/list/List.vue'),
                meta: {
                    canExtendContainer: true,
                    requiresHeavyLoading: true
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
            },
            {
                path: 'editar/:id',
                name: 'Editar Prospecto',
                component: () => import('./pages/sharedForm/EditProspecto.vue'),
                meta: {
                    mainContainerColumn: 'col-xxl-8 offset-xxl-2',
                    requiresHeavyLoading: true
                },
                beforeEnter: (to, _, next) => {
                    const id = to.params.id
                    if (!id || isNaN(Number(id))) {
                        next({ name: 'Lista de Prospectos' })
                    } else next()
                }
            }
        ]
    }
]

export default routes