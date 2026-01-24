<template>
    <div class="d-flex align-items-center mb-3">
        <FontAwesomeIcon icon="fa-list" class="me-2 text-muted" />
        <h5 class="mb-0 text-muted fw-semibold">Listado de prospectos</h5>
    </div>
    <div class="row">
        <div class="col">
            <BaseTable
                class="mb-3 mb-md-0"
                :loading="store.isApiBusy"
                :colspan="colspan"
                :items="prospectosList"
                :row-class="(item) => !item.registro ? 'incomplete-row' : ''"
                :pagination-config="store.pagination"
                @change:current-page="store.pagination.currentPage = $event"
                @change:set-items-per-page="($event) => store.setItemsPerPage($event)"
            >
                <template #header>
                    <DetailTableThead @change-columns="colspan = $event" />
                </template>
                <template #row="{ item }">
                    <tr>
                        <td :title="!item.registro ? 'Registro incompleto' : ''">
                            <span>{{ item.id }}</span>
                        </td>
                        <td>
                            <span v-if="store.prospectosFilters.showGteDetails">{{ truncate(item.empresa, 20) }}</span>
                            <span v-else>{{ item.empresa }}</span>
                        </td>
                        <td>{{ item.fuente }}</td>
                        <td class="text-end fw-bold">{{ formatCurrency(item.vpo) }}</td>
                        <td v-if="store.prospectosFilters.showGteDetails" :class="{ 'text-success': showGteEstatusClass(item) }">
                            {{ item.gteEstatus }}
                        </td>
                        <td v-if="store.prospectosFilters.showGteDetails" :class="{ 'text-success': showRikEstatusClass(item) }">
                            {{ item.rikEstatus }}
                        </td>

                        <DetailTableTotalesProyectos v-if="store.prospectosFilters.showGteDetails" :prospecto="item" />

                        <td :title="item.observacionesRik">
                            {{ truncate(item.observacionesRik, store.prospectosFilters.showGteDetails ? 10 : 30) }}
                        </td>
                        <td>
                            <OptionsDetails
                                :fuente="item.fuente"
                                :prospecto-id="item.id"
                                :is-register-completed="item.registro"
                            />
                        </td>
                    </tr>
                </template>
            </BaseTable>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseTable from '@/shared/components/baseTable/BaseTable.vue'
import DetailTableThead from './DetailTableThead.vue'
import DetailTableTotalesProyectos from './DetailTableTotalesProyectos.vue'
import OptionsDetails from './optionsDetail/OptionsDetail.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref, watch } from 'vue'
import { useProspectosListStore } from '../../store/prospectosListStore'
import { truncate } from '@/core/utils/text'
import { formatCurrency } from '@/core/utils/numbers'
import type { Prospectos } from '../../types/prospectos'

const store = useProspectosListStore()
const colspan = ref<number>(0)

const prospectosList = computed(() => store.prospectos.prospectos)

const showGteEstatusClass = (s: Prospectos): boolean => {
    return s.gteEstatus === 'Enviado' &&
    s.mktEstatus === 'Enviado' &&
    s.rikEstatus === 'No Procesado'
}
const showRikEstatusClass = (s: Prospectos): boolean => {
    return s.gteEstatus === 'Enviado' &&
    s.mktEstatus === 'Enviado' &&
    s.rikEstatus === 'Procesado'
}

watch(() => store.pagination.currentPage, async () => {
    await store.getProspectosListDebounce(false)
})
</script>

<style scoped>
.incomplete-row {
    background: linear-gradient(90deg, 
        rgba(255, 193, 7, 0.15) 0%, 
        rgba(255, 193, 7, 0.05) 5%, 
        transparent 15%
    ) !important;
    
    border-left: 4px solid #ffc107 !important;
    transition: background 0.3s ease;
}
</style>