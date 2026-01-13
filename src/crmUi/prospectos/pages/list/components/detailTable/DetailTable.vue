<template>
    <div class="d-flex align-items-center mb-3">
        <FontAwesomeIcon icon="fa-list" class="me-2 text-muted" />
        <h5 class="mb-0 text-muted fw-semibold">Listado de prospectos</h5>
    </div>
    <div class="row">
        <div class="col">
            <div class="table-responsive mb-3 mb-md-0">
                <table class="table table-hover">
                    <DetailTableThead @change-columns="colspan = $event" />
                    <tbody>
                        <LoadingTable v-if="store.isApiBusy" :colspan="colspan" />

                        <tr
                            v-else-if="!store.isApiBusy && store.prospectos.totalRows > 0"
                            v-for="row in prospectosList"
                            :key="row.id"
                            :class="{ 'incomplete-row': !row.registro }"
                        >
                            <td :title="!row.registro ? 'Registro incompleto' : ''">
                                <span>{{ row.id }}</span>
                            </td>
                            <td>
                                <span v-if="store.prospectosFilters.showGteDetails">{{ truncate(row.empresa, 20) }}</span>
                                <span v-else>{{ row.empresa }}</span>
                            </td>
                            <td>{{ row.fuente }}</td>
                            <td class="text-end fw-bold">{{ formatCurrency(row.vpo) }}</td>
                            <td v-if="store.prospectosFilters.showGteDetails" :class="{ 'text-success': showGteEstatusClass(row) }">
                                {{ row.gteEstatus }}
                            </td>
                            <td v-if="store.prospectosFilters.showGteDetails" :class="{ 'text-success': showRikEstatusClass(row) }">
                                {{ row.rikEstatus }}
                            </td>

                            <DetailTableTotalesProyectos v-if="store.prospectosFilters.showGteDetails" :prospecto="row" />

                            <td :title="row.observacionesRik">
                                {{ truncate(row.observacionesRik, store.prospectosFilters.showGteDetails ? 10 : 30) }}
                            </td>
                            <td></td>
                            <td>
                                <OptionsDetails
                                    :fuente="row.fuente"
                                    :prospecto-id="row.id"
                                    :is-register-completed="row.registro"
                                />
                            </td>
                        </tr>

                        <NoRowsTable v-if="!store.isApiBusy && store.prospectos.totalRows === 0" :colspan="colspan" />
                    </tbody>
                </table>
            </div>
            <Pagination
                v-if="store.prospectos.totalRows > 0"
                :config="store.pagination"
                @change:current-page="store.pagination.currentPage = $event"
                @change:set-items-per-page="($event) => store.setItemsPerPage($event)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import LoadingTable from '@/shared/components/LoadingTable.vue'
import NoRowsTable from '@/shared/components/NoRowsTable.vue'
import DetailTableThead from './DetailTableThead.vue'
import Pagination from '@/shared/components/pagination/Pagination.vue'
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

watch(() => store.pagination.currentPage, () => {
    store.getProspectosListDebounce()
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