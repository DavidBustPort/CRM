import { SianwebService } from '@/core/services'
import { useAppStore } from '@/core/store/appStore'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { useAuthStore } from '@/core/store/authStore'
import type { RouteLocationNormalized } from 'vue-router'

export const authGuard = async (to: RouteLocationNormalized) => {
    const authSianwebStore = useAuthSianwebStore()
    const authStore = useAuthStore()
    const appStore = useAppStore()

    const sesionSianweb = await SianwebService.verifySianwebSession()
    authSianwebStore.setSianwebLoginData(sesionSianweb)

    const isAuthorized = authSianwebStore.loggedIn && authStore.isLoggedIn
    const isGoingToUnauthorized = to.name === 'no-autorizado'
    
    if (appStore.isPageLoading) return true

    if (!isAuthorized && !isGoingToUnauthorized) {
        //si el usuario no esta logeado en sianweb, no existe token y se encuentra en una ruta
        //privada, redirecionar a no-autorizado
        return { name: 'no-autorizado' }
    }

    if (isAuthorized && isGoingToUnauthorized) {
        //si el usuario esta logeado pero se encuentra en no-autorizado enviarlo a inicio
        return { name: 'Inicio' }
    }

    return true
}