<template>
    <button @click.prevent="openModal" class="btn btn-primary text-white w-75 py-2 shadow-sm fw-bold">
        <FontAwesomeIcon icon="fa-user-tie" class="me-2" />
        Asignar Representante
    </button>
    <Modal ref="modalRef">
        <div class="p-4 text-center">
            <div class="icon-box-primary mb-3 mx-auto">
                <FontAwesomeIcon icon="fa-user-tie" class="text-primary fs-3" />
            </div>

            <h4 class="fw-bold text-dark">Asignar Representante</h4>
            <p class="text-muted">
                Seleccione el representante que se encargará del seguimiento de este Lead.
            </p>

            <div class="text-start">
                <label for="representante" class="form-label small fw-bold text-muted text-uppercase">Representantes</label>
                <select
                    id="representante"
                    class="form-select"
                    v-model="selectedRik"
                >
                    <option :value="null" selected disabled>Seleccione un representante</option>
                    <option v-for="rik in appStore.riks" :key="rik.id">
                        {{ rik.id }} - {{ rik.nombre }}
                    </option>
                </select>
                <div v-if="isSaving && selectedRik === null" class="d-flex justify-content-end mt-1">
                    <span class="small text-danger">Debe seleccionar un representante</span>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Modal from '@/shared/components/modal/Modal.vue'
import { ref } from 'vue'
import { useAppStore } from '@/core/store/appStore'
import type { Rik } from '@/shared/types/catalogos'
import { LeadsService } from '../../services/leads-service'
import { useAlert } from '@/core/composables/useAlert'
import { useLeadsStore } from '../../store/leadsStore'

const props = defineProps<{
    idLead: number
}>()

const store = useLeadsStore()
const appStore = useAppStore()
const selectedRik = ref<Rik | null>(null)
const modalRef = ref<InstanceType<typeof Modal>>()
const isSaving = ref<boolean>(false)
const { error, toastSuccess } = useAlert()

const openModal = (): void => {
    modalRef.value?.open({
        title: 'Asignar Representante',
        animation: 'fade',
        showCloseButtonInHeader: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar asignación',
        closeButtonText: 'Cancelar',
        onConfirm: async () => {
            await save()
        },
        onClose: () => {
            selectedRik.value = null
        }
    })
}

const save = async () => {
    isSaving.value = true

    if (!selectedRik.value) return

    try {
        const res = await LeadsService.assingRik(props.idLead, selectedRik.value.id)
        if (res) {
            modalRef.value?.close()
            store.getLeads()
            toastSuccess('Lead asignado correctamente')
        } else error('Error al asignar el representante')
        
    } catch { error('Error al asignar el representante') }
    finally { isSaving.value = false }
}
</script>