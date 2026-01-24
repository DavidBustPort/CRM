<template>
    <button @click.prevent="openModal" class="btn btn-link text-danger text-decoration-none fw-medium w-75">
        <FontAwesomeIcon icon="fa-ban" class="me-2" />
        Rechazar Lead
    </button>
    <Modal ref="modalRef">
        <div class="p-4 text-center">
            <div class="icon-box-danger mb-3 mx-auto">
                <FontAwesomeIcon icon="fa-ban" class="text-danger fs-3" />
            </div>

            <h4 class="fw-bold text-dark">¿Rechazar este Lead?</h4>
            <p class="text-muted">
                Está acción marcará al Lead como rechazado.
                Por favor, indica el motivo para el siguimiento administrativo
            </p>

            <div class="text-start">
                <label for="tipoRechazo" class="form-label small fw-bold text-muted text-uppercase">Motivo del rechazo</label>
                <select
                    id="tipoRechazo"
                    class="form-select"
                    v-model.number="rejectionType"
                    @change="errorMessage = ''"
                >
                    <option :value="null" selected disabled>Seleccione un motivo</option>
                    <option value="2">Venta única</option>
                    <option value="4">El prospecto decidió no seguir (por costo)</option>
                    <option value="5">No es prospecto potencial</option>
                    <option value="3">Otro motivo</option>
                </select>
                <textarea
                    v-if="rejectionType === 3"
                    class="form-control mt-3"
                    rows="4"
                    v-model="motive"
                    placeholder="Ej: No estoy interesado en los productos"
                ></textarea>
                <div v-if="errorMessage && isSaving" class="d-flex justify-content-end mt-1">
                    <span class="small text-danger">{{ errorMessage }}</span>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Modal from '@/shared/components/modal/Modal.vue'
import { ref } from 'vue'
import { LeadsService } from '../../services/leads-service'
import { useAlert } from '@/core/composables/useAlert'
import { useLeadsStore } from '../../store/leadsStore'

const props = defineProps<{
    idLead: number
}>()

const store = useLeadsStore()
const modalRef = ref<InstanceType<typeof Modal>>()
const rejectionType = ref<number | null>(null)
const isSaving = ref<boolean>(false)
const motive = ref<string>('')
const { error, toastSuccess } = useAlert()
const errorMessage = ref<string>('')

const openModal = (): void => {
    modalRef.value?.open({
        title: 'Rechazar Lead',
        animation: 'fade',
        showCloseButtonInHeader: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar Rechazo',
        closeButtonText: 'Cancelar',
        onConfirm: async () => {
            if (isSaving.value) return
            await save()
        },
        onClose: () => {
            rejectionType.value = null
            motive.value = ''
        }
    })
}

const save = async () => {
    isSaving.value = true
    if (!rejectionType.value) {
        errorMessage.value = 'Debe seleccionar un motivo de rechazo'
        return
    }
    errorMessage.value = ''

    if (rejectionType.value === 3 && !motive.value) {
        errorMessage.value = 'Debe especificar el motivo del rechazo'
        return
    }
    
    try {
        const res = await LeadsService.rejectLead(props.idLead, rejectionType.value, motive.value)
        if (res) {
            modalRef.value?.close()
            store.getLeads()
            toastSuccess('Lead rechazado correctamente')
        } else error('Error al rechazar Lead')
        
    } catch { error('Error al rechazar Lead') }
    finally { isSaving.value = false }
}
</script>

<style scoped>
.icon-box-danger {
    width: 60px;
    height: 60px;
    background-color: rgba(220, 53, 69, 0.08);;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid rgba(220, 53, 69, 0.15);
    transition: transform 0.3 ease;
    &:hover {
        transform: scale(1.05);
    }
}
</style>