import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import Swal from 'sweetalert2'

export const loadingGuard = (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    if (to.meta.requiresHeavyLoading) {
        Swal.fire({
            title: 'Cargando módulo',
            text: 'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
    }
    next()
}