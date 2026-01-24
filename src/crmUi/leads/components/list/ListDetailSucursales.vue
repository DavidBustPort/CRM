<template>
    <button @click.prevent="openModal" class="btn btn-secondary text-dark w-75 shadow-sm py-2">
        <FontAwesomeIcon icon="fa-store" class="me-2" />
        Cambiar de Sucursal
    </button>
    <Modal ref="modalRef">
        <div class="p-4 text-center">
            <div class="icon-box-primary mb-3 mx-auto">
                <FontAwesomeIcon icon="fa-store" class="text-primary fs-3" />
            </div>

            <h4 class="fw-bold text-dark">Cambiar Sucursal</h4>
            <p class="text-muted">
                Seleccione la sucursal a la cual el Lead será asignado
            </p>

            <div class="text-start">
                <label for="representante" class="form-label small fw-bold text-muted text-uppercase">Sucursales</label>
                <select
                    id="representante"
                    class="form-select"
                    v-model="selectedSucursal"
                >
                    <option :value="null" selected disabled>Seleccione una sucursal</option>
                    <option
                        v-for="s in store.sucursales ?? []"
                        :key="s.id"
                        :value="s"
                        :disabled="s.id === props.currentSucursalId"
                    >
                        {{ s.id }} - {{ s.nombre }}
                        {{ s.id === props.currentSucursalId ? '(Actual)' : '' }}
                    </option>
                </select>
                <div v-if="isSaving && selectedSucursal === null" class="d-flex justify-content-end mt-1">
                    <span class="small text-danger">Debe seleccionar una sucursal</span>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Modal from '@/shared/components/modal/Modal.vue'
import { ref } from 'vue'
import { useAlert } from '@/core/composables/useAlert'
import { useLeadsStore } from '../../store/leadsStore'
import type { Sucursales } from '@/shared/types/catalogos'
import { LeadsService } from '../../services/leads-service'

const props = defineProps<{
    idLead: number,
    currentSucursalId: number
}>()

const store = useLeadsStore()
const modalRef = ref<InstanceType<typeof Modal>>()
const isSaving = ref<boolean>(false)
const selectedSucursal = ref<Sucursales | null>(null)
const { error, toastSuccess } = useAlert()

const openModal = (): void => {
    modalRef.value?.open({
        title: 'Cambiar Sucursal',
        animation: 'fade',
        showCloseButtonInHeader: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar Sucursal',
        closeButtonText: 'Cancelar',
        onConfirm: async () => {
            if (isSaving.value) return
            await save()
        },
        onClose: () => {
            selectedSucursal.value = null
        }
    })
}

const save = async () => {
    isSaving.value = true

    if (!selectedSucursal.value) return
    if (selectedSucursal.value.id === props.currentSucursalId) return

    try {
        const res = await LeadsService.updateSucursal(props.idLead, selectedSucursal.value.id)
        if (res) {
            modalRef.value?.close()
            store.getLeads()
            toastSuccess('Sucursal cambiada correctamente')
        } else error('Error al cambiar de sucursal')
        
    } catch { error('Error al cambiar de sucursal') }
    finally { isSaving.value = false }
}
</script>