<template>
    <div class="row">
        <div class="col">
            <div class="d-flex justify-content-between align-items-end">
                <div>
                    <div v-if="!loading && !errorMsg" class="mb-3">
                        <StatusBadge type="edit" label="Modo Edición" />
                    </div>
                    
                    <h2 class="text-primary fw-bold ps-3 border-start border-4 border-primary mb-0">
                        Editar prospecto 
                        <small v-if="!loading && !errorMsg" class="text-muted fs-5 ms-2">
                            #{{ id }}
                        </small>
                    </h2>
                </div>
                <BackToList v-if="!loading && !errorMsg" />
            </div>
        </div>
    </div>

    <Transition 
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
    >
        <div v-if="!loading && errorMsg" class="card border-0 shadow-sm mt-3 bg-white">
            <div class="card-body p-5 text-center">
                <div class="mb-4">
                    <div class="bg-light d-inline-block p-4 rounded-circle">
                        <FontAwesomeIcon icon="fa-user-slash" class="fs-1 text-muted opacity-50" />
                    </div>
                </div>
                <h4 class="fw-bold text-dark">Prospecto no disponible</h4>
                <p class="text-muted mx-auto" style="max-width: 450px;">
                    No se pudo cargar la información del prospecto solicitado. 
                    Es posible que el registro haya sido inactivado o no cuente con los permisos necesarios para editarlo.
                </p>
                <div class="mt-4">
                    <BackToList class="btn btn-primary px-4 shadow-sm" />
                </div>
            </div>
        </div>
    </Transition>

    <div v-if="!errorMsg && !loading" class="card shadow-sm border-0 mt-3">
        <div class="card-body">
            <ProspectosForm />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import BackToList from './components/BackToList.vue'
import { onMounted, ref } from 'vue'
import { ProspectosService } from '../../services/prospectos-service'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProspectosForm from './components/prospectosForm/ProspectosForm.vue'
import StatusBadge from '@/shared/components/StatusBadge.vue'
import { useProspectosFormStore } from './store/prospectosFormStore'
import { useAlert } from '@/core/composables/useAlert'

const store = useProspectosFormStore()
const { close } = useAlert()
const route = useRoute()
const id = route.params.id
const errorMsg = ref<string>('')
const loading = ref<boolean>(false)

const fetchProspecto = async (): Promise<void> => {
    loading.value = true
    errorMsg.value = ''
    try {
        const res = await ProspectosService.getProspectoById(Number(id))
        if (res.succeeded && res.data) {
            const prospecto = res.data
            store.loadProspectoForEdit(prospecto)

        } else errorMsg.value = 'Prospecto no encontrado'
    } catch {
        errorMsg.value = ''
    } finally {
        loading.value = false
        close()
    }
}

onMounted(fetchProspecto)
</script>