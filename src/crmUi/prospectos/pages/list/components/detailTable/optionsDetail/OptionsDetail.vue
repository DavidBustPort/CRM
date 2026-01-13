<template>
    <div class="dropdown text-end">
        <button
            class="btn btn-link p-1 text-muted"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="Opciones"
        >
            <FontAwesomeIcon icon="fa-ellipsis-vertical" />
        </button>
        <ul class="dropdown-menu">
            <li>
                <OptionsDetailInfoModal
                    :is-register-completed="props.isRegisterCompleted"
                    :prospecto-id="props.prospectoId"
                />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import OptionsDetailInfoModal from './OptionsDetailInfoModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
    prospectoId: number
    fuente: string
    isRegisterCompleted: boolean
}>()
</script>