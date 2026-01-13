<template>
    <button type="button" @click="initModal" class="dropdown-item">
        <FontAwesomeIcon icon="fa-eye" class="me-2" />
        Ver información completa
    </button>
    <Modal ref="modalRef">
        <div v-if="!props.isRegisterCompleted && !authSianwebStore.isGte" class="alert alert-warning text-center mb-4">
            <FontAwesomeIcon icon="fa-exclamation-triangle" class="me-2" />
            <span>
                Algunos campos no están definidos. <br />
                <strong>Editar prospecto para completar información.</strong>
            </span>
            <div class="mt-2">
                <RouterLink
                    class="btn btn-outline-warning btn-sm"
                    :to="{ path: `/prospectos/edit/${props.prospectoId}` }"
                >
                    <FontAwesomeIcon icon="fa-edit" class="me-1" />
                    Editar Prospecto
                </RouterLink>
            </div>
        </div>
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
                        class="list-group-item d-flex justify-content-between px-0 align-items-center"
                    >
                        <div>
                            <span class="text-muted">{{ p.title }}:</span>
                            <em class="ms-2 fw-bold">
                                {{ p.value }}
                            </em>
                        </div>
                        
                        <FontAwesomeIcon
                            :icon="p.isComplete ? 'fa-check' : 'fa-exclamation-triangle'"
                            :class="p.isComplete ? 'text-success' : 'text-warning'"
                            class="status-icon"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import { useAuthSianwebStore } from '@/core/store/authSianwebStore';
import Modal from '@/shared/components/modal/Modal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const props = defineProps<{
    prospectoId: number
    isRegisterCompleted: boolean
}>()

interface ProspectoDisplay {
    title: string
    value: unknown
    isComplete: boolean
}

const authSianwebStore = useAuthSianwebStore()

const modalRef = ref<InstanceType<typeof Modal>>()
const prospectoDisplay = ref<ProspectoDisplay[]>([])

const initModal = async () => {
    modalRef.value?.open({
        title: 'Prospecto Detalle',
        size: 'md',
        animation: 'bounce',
        showConfirmButton: false,
        closeButtonText: 'Cerrar'
    })
}
</script>