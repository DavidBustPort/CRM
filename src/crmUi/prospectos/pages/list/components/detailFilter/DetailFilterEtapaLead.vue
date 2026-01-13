<template>
    <div class="mb-2">
        <label for="etapaLeads" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Etapa Leads
        </label>
        <select
            v-model.number="store.prospectosFilters.etapaLead"
            class="form-select p-2"
            id="etapaLeads"
        >
            <option :value="null">Todos</option>
            <option value="gte">CDI -> GTE</option>
            <option value="rik">CDI -> RIK</option>
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