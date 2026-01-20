<template>
    <button type="button" @click="initModal" class="dropdown-item">
        <FontAwesomeIcon icon="fa-eye" class="me-2 text-muted" />
        Ver información completa
    </button>
    <Modal ref="modalRef">
        <div v-if="isLoading" class="text-center p-5">
            <div class="spinner-border text-primary" role="status"></div>
            <div class="mt-2 text-muted">Cargando datos...</div>
        </div>
        <div v-else>
            <OptionsDetailInfoModalWarning
                :is-register-completed="props.isRegisterCompleted"
                :prospecto-id="props.prospectoId"
            />
            <div class="p-3">
                <div class="mb-3 h5 d-flex align-items-center">
                    <FontAwesomeIcon icon="fa-user" class="me-2" />
                    Información
                </div>
                <div>
                    <ul class="list-group list-group-flush" v-if="prospectoDisplay.length">
                        <li
                            v-for="p in prospectoDisplay"
                            :key="p.title"
                            class="list-group-item d-flex justify-content-between py-1 border-bottom align-items-center"
                        >
                            <div class="d-flex flex-column">
                                <span
                                    class="text-muted small fw-bold text-uppercase"
                                    style="font-size: 0.65rem; letter-spacing: 0.5px;"
                                >{{ p.title }}</span>
                                <span :class="['fw-medium', p.isComplete ? 'text-dark' : 'text-danger italic']">
                                    {{ p.value }}
                                </span>
                            </div>
                            
                            <FontAwesomeIcon
                                :icon="p.isComplete ? 'fa-circle-check' : 'fa-circle-exclamation'"
                                :class="p.isComplete ? 'text-success' : 'text-warning'"
                                style="font-size: 1.2rem;"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import { ProspectosService } from '@/crmUi/prospectos/services/prospectos-service'
import type { Prospecto } from '@/crmUi/prospectos/types/prospecto'
import Modal from '@/shared/components/modal/Modal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import OptionsDetailInfoModalWarning from './OptionsDetailInfoModalWarning.vue'

const props = defineProps<{
    prospectoId: number
    isRegisterCompleted: boolean
}>()

interface ProspectoDisplay {
    title: string
    value: string
    isComplete: boolean
}

const isLoading = ref<boolean>(false)
const modalRef = ref<InstanceType<typeof Modal>>()
const prospectoDisplay = ref<ProspectoDisplay[]>([])
const propertiesToRender: {
    key: keyof Prospecto,
    label: string
}[] = [
    { key: 'razonSocial', label: 'Razón Social' },
    { key: 'contacto', label: 'Contacto' },
    { key: 'correo', label: 'Correo Electrónico' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'uen', label: 'UEN' },
    { key: 'segmento', label: 'Segmento' },
    { key: 'tipoCliente', label: 'Tipo de Cliente' },
    { key: 'vpo', label: 'VPO' },
    { key: 'territorio', label: 'Territorio' },
    { key: 'observaciones', label: 'Observaciones' }
]

const initModal = async () => {
    modalRef.value?.open({
        title: 'Prospecto Detalle',
        size: 'md',
        animation: 'flip',
        showConfirmButton: false,
        closeButtonText: 'Cerrar'
    })

    isLoading.value = true
    await getProspectoData()
    isLoading.value = false
}

const getProspectoData = async (): Promise<void> => {
    prospectoDisplay.value = []
    if (props.prospectoId) {
        const prospectoRes = await ProspectosService.getProspectoById(props.prospectoId)
        if (prospectoRes.succeeded && prospectoRes.data) {

            const prospecto = prospectoRes.data

            propertiesToRender.forEach(p => {
                const rawValue = prospecto[p.key]
                
                prospectoDisplay.value.push({
                    title: p.label,
                    value: rawValue ? String(rawValue) : '???',
                    isComplete: !!prospecto[p.key]
                })
            })
        }
    } else prospectoDisplay.value = []
}
</script>