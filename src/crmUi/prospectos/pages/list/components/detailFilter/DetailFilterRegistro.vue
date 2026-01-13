<template>
    <div class="mb-2">
        <label for="registro" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Registro
        </label>
        <select
            v-model.number="store.prospectosFilters.registro"
            class="form-select p-2"
            id="registro"
        >
            <option value="-1">Todos</option>
            <option value="1">Completo</option>
            <option value="0">Incompleto</option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { useProspectosListStore } from '../../store/prospectosListStore'

const props = withDefaults(defineProps<{
    labelItalics?: boolean
}>(), {
    labelItalics: false
})

const store = useProspectosListStore()
</script>