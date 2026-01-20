<template>
    <div
        v-if="!props.isRegisterCompleted && !authSianwebStore.isGte" 
        class="d-flex align-items-center justify-content-between p-3 mb-4 rounded-3 bg-warning-subtle border-start border-warning border-4"
    >
        <div class="d-flex align-items-center text-warning-emphasis">
            <FontAwesomeIcon icon="fa-triangle-exclamation" class="fs-4 me-3" />
            <div class="small">
                <span class="d-block fw-bold">Perfil Incompleto</span>
                <span>Faltan datos clave en este prospecto.</span>
            </div>
        </div>
        <RouterLink
            class="btn btn-warning btn-sm fw-bold shadow-sm"
            :to="{ path: `/prospectos/edit/${props.prospectoId}` }"
        >
            Completar
        </RouterLink>
    </div>
</template>

<script lang="ts" setup>
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
    prospectoId: number
    isRegisterCompleted: boolean
}>()

const authSianwebStore = useAuthSianwebStore()
</script>