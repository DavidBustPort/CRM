import { computed, ref, type Ref } from 'vue'
import type { ProspectosFormValidation } from '../../types/prospectosFormValidation'
import { useProspectosFormStore } from '../../store/prospectosFormStore'
import { useAlert } from '@/core/composables/useAlert'
import { useRouter } from 'vue-router'
import type { ProspectosAddApiRequest, ProspectosEditApiRequest } from '../../types/prospectosApiRequest'
import { ProspectosFormService } from '../../services/prospectosForm-service'

interface ProspectosForm {
    submitted: Ref<boolean>
    formValidation: Ref<ProspectosFormValidation>
    handleFormSubmit: () => Promise<void>
}
export function useProspectosForm(): ProspectosForm {
    const store = useProspectosFormStore()
    const router = useRouter()
    const submitted = ref<boolean>(false)
    const { loading, success, error } = useAlert()

    const formValidation = computed<ProspectosFormValidation>(() => ({
        isRazonSocialRequired: store.formData.razonSocial?.trim() !== '',
        isContactoRequired: store.hasSelectedLead ? store.formData.contacto?.trim() !== '' : true,
        isCorreoRequired: store.hasSelectedLead ? store.formData.correo?.trim() !== '' : true,
        isValidCorreo: store.hasSelectedLead ? /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/.test(store.formData.correo) : true,
        isTelefonoRequired: store.hasSelectedLead ? store.formData.telefono?.trim() !== '' : true,
        isUenRequired: store.formData.uenId !== null,
        isSegmentoRequired: store.formData.segmentoId !== null,
        isTipoClienteRequired: store.formData.tipoClienteId !== null,
        isVPORequired: store.formData.vpo > 0,
        isTerritorioRequired: store.formData.territorioId !== null,
        isObservacionesRequired: store.hasSelectedLead ? store.formData.observaciones.trim() !== '' : true
    }))

    const handleFormSubmit = async (): Promise<void> => {
        submitted.value = true

        const isFormValid = Object.values(formValidation.value).every(v => v)
        if (isFormValid) {
            loading()

            const req = buildRequest()
            const res = store.mode === 'create'
                ? await ProspectosFormService.addProspecto(req as ProspectosAddApiRequest)
                : await ProspectosFormService.editProspecto(req as ProspectosEditApiRequest)
            
            if (res.succeeded) {
                if (res.data) {
                    const confirmed = await success()
                    if (confirmed) {
                        store.$reset()
                        router.push('/prospectos')
                    }
                } else error('Error desconocido')
            } else error(res.message ?? 'Error desconocido')
        }
    }

    const buildRequest = (): ProspectosAddApiRequest | ProspectosEditApiRequest => {
        const req = store.mode === 'create'
            ? store.getProspectosAddApiRequest()
            : store.getProspectosEditApiRequest()

        return req
    }

    return {
        submitted,
        formValidation,
        handleFormSubmit
    }
}