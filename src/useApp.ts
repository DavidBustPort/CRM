import { computed, ref, type Ref } from 'vue'
import { SianwebService } from './core/services'
import { useAuthStore } from './core/store/authStore'
import { useAuthSianwebStore } from './core/store/authSianwebStore'
import { useAppStore } from './core/store/appStore'
import Modal from './shared/components/modal/Modal.vue'

interface App {
    modalRef: Ref<InstanceType<typeof Modal> | null>
    verifySessionSianweb: () => Promise<boolean>
    verifyApiToken: () => Promise<boolean>
    authorized: Ref<boolean>
    authorizationError: Ref<string>
}

export function useApp(): App {
    const appStore = useAppStore()
    const authSianwebStore = useAuthSianwebStore()
    const authStore = useAuthStore()

    const modalRef = ref<InstanceType<typeof Modal> | null>(null)
    const authorized = computed<boolean>(() => authSianwebStore.isLoggedIn && authStore.isLoggedIn)
    const authorizationError = ref<string>('')

    const verifySessionSianweb = async (): Promise<boolean> => {
        const sesion = await SianwebService.verifySianwebSession()
        authSianwebStore.setSianwebLoginData(sesion)

        return authSianwebStore.isLoggedIn
    }

    const verifyApiToken = async (): Promise<boolean> => {
        if (authStore.isLoggedIn) {
            appStore.setPageLoading(false)
            return true
        }

        await authStore.getApiToken({
            userId: authSianwebStore.userId ?? 0,
            idCd: authSianwebStore.idSucursal ?? 0
        })

        authorizationError.value = authStore.errorMessage ?? ''
        appStore.setPageLoading(false)
        return authStore.isLoggedIn
    }

    return {
        modalRef,
        verifySessionSianweb,
        authorized,
        authorizationError,
        verifyApiToken
    }
}