<template>
    <div class="mb-2">
        <label for="prospecto" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Nombre de prospecto
        </label>
        <div class="input-group">
            <input
                type="text"
                class="form-control p-2"
                id="prospecto"
                placeholder="..."
                :class="name ? 'select-highlighted' : 'select-default'"
                v-model="name"
            />
            <button
                type="button"
                :disabled="!name"
                @click="name = ''"
                class="btn btn-outline-secondary"
                title="Limpiar"
            >
                <FontAwesomeIcon icon="fa-xmark" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useProspectosListStore } from '../../store/prospectosListStore'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    labelItalics?: boolean
}>(), {
    labelItalics: false
})

const store = useProspectosListStore()
const name = computed({
    get: () => store.prospectosFilters.nombreProspecto,
    set: (value) => store.prospectosFilters.nombreProspecto = value
})
</script>