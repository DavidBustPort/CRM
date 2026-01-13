import type { RouteRecordRaw } from 'vue-router'
import oportunidadesRoute from '@/crmUi/oportunidades/oportunidades-route'
import prospectosRoute from '@/crmUi/prospectos/prospectos-route'
import dashboardRoute from '@/crmUi/dashboard/dashboard-route'
import reportesRoute from '@/crmUi/reportes/reportes-route'

const routes: RouteRecordRaw[] = [
    ...dashboardRoute,
    ...prospectosRoute,
    ...oportunidadesRoute,
    ...reportesRoute,
    {
        path: '/no-autorizado',
        name: 'no-autorizado',
        component: () => import('../views/NoAutorizado.vue')
    }
]

export default routes