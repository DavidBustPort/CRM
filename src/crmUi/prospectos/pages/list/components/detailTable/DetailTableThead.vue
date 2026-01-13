<template>
    <thead class="table-light">
        <tr>
            <template v-for="(col, index) in columns" :key="index">
                <th v-if="col.show" scope="col" :class="col.class">{{ col.name }}</th>
            </template>
        </tr>
    </thead>
</template>

<script lang="ts" setup>
import { watch, computed } from 'vue'
import { useProspectosListStore } from '../../store/prospectosListStore'

const emit = defineEmits<{
    changeColumns: [length: number]
}>()

interface DetailTableColumns {
    name: string,
    show: boolean,
    class?: string
}

const store = useProspectosListStore()
const columns = computed<DetailTableColumns[]>(() => [
    { name: 'Prospecto Id', show: true },
    { name: 'Prospecto', show: true },
    { name: 'Fuente', show: true },
    { name: 'VPO', show: true, class: 'text-end' },
    { name: 'GTE-RIK', show: store.prospectosFilters.showGteDetails },
    { name: 'RIK', show: store.prospectosFilters.showGteDetails },
    { name: 'A', show: store.prospectosFilters.showGteDetails, class: 'text-center etapa-A-bg text-white' },
    { name: 'P', show: store.prospectosFilters.showGteDetails, class: 'text-center etapa-P-bg text-white' },
    { name: 'N', show: store.prospectosFilters.showGteDetails, class: 'text-center etapa-N-bg text-white' },
    { name: 'C', show: store.prospectosFilters.showGteDetails, class: 'text-center etapa-C-bg text-white' },
    { name: 'Observaciones', show: true },
    { name: 'Fecha registro', show: true },
    { name: '', show: true },
])

watch(columns, (newColumns) => {
    emit('changeColumns', newColumns.filter(x => x.show).length)
}, { immediate: true })
</script>