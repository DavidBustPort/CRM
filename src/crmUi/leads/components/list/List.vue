<template>
    <div :class="{ 'table-responsive': isMobile }">
        <table class="table align-middle">
            <thead class="table-light">
                <tr>
                    <th class="text-uppercase small fw-bold text-muted">Estatus</th>
                    <th class="text-uppercase small fw-bold text-muted">Fecha alta</th>
                    <th class="text-uppercase small fw-bold text-muted">Nombre de la empresa</th>
                    <th class="text-uppercase small fw-bold text-muted">Giro / Producto</th>
                </tr>
            </thead>
            <tbody>
                <LoadingTable v-if="store.isApiBusy" :colspan="colspan" />

                <template
                    v-else-if="!store.isApiBusy && store.leads.totalRows > 0"
                    v-for="(l, index) in store.leads.leads"
                    :key="index"
                >
                    <tr class="custom-row" :class="{ 'is-expanded': isRowExpanded(l.id) }">
                        <td>
                            <div class="d-flex align-items-center">
                                <button
                                    class="btn btn-icon btn-light btn-sm me-2"
                                    @click="toggleRow(l.id)"
                                >
                                    <FontAwesomeIcon :icon="isRowExpanded(l.id) ? 'fa-minus' : 'fa-plus'" />
                                </button>
                                <span :class="['badge', statusClass(l.estatusId)]" class="p-2 text-uppercase">{{ statusTitle(l.estatusId) }}</span>
                            </div>
                        </td>
                        <td class="small text-nowrap">
                            {{ formatDate(l.fechaAlta) }}
                        </td>
                        <td>
                            <div class="fw-bold text-dark">{{ l.nombreEmpresa ?? '...'}}</div>
                            <div class="text-muted small">Lead ID: #{{ l.id }}</div>
                        </td>
                        <td>
                            <div class="text-dark">{{ l.giroEmpresa ?? '---'}}</div>
                            <div v-if="l.giroEmpresa" class="text-primary small fw-medium">
                                <FontAwesomeIcon icon="fa-tag" />
                                {{ l.productoInteres ?? 'No especificado' }}
                            </div>
                        </td>
                    </tr>
                    <ListDetail
                        v-if="isRowExpanded(l.id)"
                        :colspan="colspan"
                        :lead="l"
                    />
                </template>

                <NoRowsTable v-if="!store.isApiBusy && store.leads.totalRows === 0" :colspan="colspan" />
            </tbody>
        </table>
        <Pagination
            v-if="store.leads.totalRows > 0"
            :config="store.pagination"
            @change:set-items-per-page="($event) => handleItemsPerPage($event)"
            @change:current-page="store.pagination.currentPage = $event"
        />
    </div>
</template>

<script lang="ts" setup>
import LoadingTable from '@/shared/components/LoadingTable.vue'
import ListDetail from './ListDetail.vue'
import NoRowsTable from '@/shared/components/NoRowsTable.vue'
import { useLeadsStore } from '../../store/leadsStore'
import { formatDate } from '@/core/utils/dates'
import { useList } from './useList'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Pagination from '@/shared/components/pagination/Pagination.vue'
import { useResize } from '@/core/composables/useResize'

const store = useLeadsStore()
const {
    isRowExpanded,
    statusClass,
    toggleRow,
    statusTitle } = useList()
const { isMobile } = useResize()

const colspan = 4

const handleItemsPerPage = (itemsPerPage: number) => {
    store.pagination.itemsPerPage = itemsPerPage
    store.pagination.currentPage = 1
    store.getLeads()
}
</script>

<style scoped src="./styles.scss"></style>