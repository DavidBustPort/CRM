<template>
    <BaseTable
        :items="store.leads.leads"
        :loading="store.isApiBusy"
        :colspan="4"
        :pagination-config="store.pagination"
        @change:current-page="store.pagination.currentPage = $event"
        @change:set-items-per-page="($event) => handleItemsPerPage($event)"
    >
        <template #header>
            <th class="text-uppercase small fw-bold">Estatus</th>
            <th class="text-uppercase small fw-bold">Fecha alta</th>
            <th class="text-uppercase small fw-bold">Nombre de la empresa</th>
            <th class="text-uppercase small fw-bold">Giro / Producto</th>
        </template>
        <template #row="{ item }">
            <tr class="custom-row" :class="{ 'is-expanded': isRowExpanded(item.id) }">
                <td>
                    <div class="d-flex align-items-center">
                        <button
                            class="btn btn-icon btn-light btn-sm me-2"
                            @click="toggleRow(item.id)"
                        >
                            <FontAwesomeIcon :icon="isRowExpanded(item.id) ? 'fa-minus' : 'fa-plus'" />
                        </button>
                        <span :class="['badge', statusClass(item.estatusId)]" class="p-2 text-uppercase">{{ statusTitle(item.estatusId) }}</span>
                    </div>
                </td>
                <td class="small text-nowrap">
                    {{ formatDate(item.fechaAlta) }}
                </td>
                <td>
                    <div class="fw-bold text-dark">{{ item.nombreEmpresa ?? '...'}}</div>
                    <div class="text-muted small">Lead ID: #{{ item.id }}</div>
                </td>
                <td>
                    <div class="text-dark">{{ item.giroEmpresa ?? '---'}}</div>
                    <div v-if="item.giroEmpresa" class="text-primary small fw-medium">
                        <FontAwesomeIcon icon="fa-tag" />
                        {{ item.productoInteres ?? 'No especificado' }}
                    </div>
                </td>
            </tr>
            <ListDetail
                v-if="isRowExpanded(item.id)"
                :colspan="4"
                :lead="item"
            />
        </template>
    </BaseTable>
</template>

<script lang="ts" setup>
import BaseTable from '@/shared/components/baseTable/BaseTable.vue'
import ListDetail from './ListDetail.vue'
import { useLeadsStore } from '../../store/leadsStore'
import { formatDate } from '@/core/utils/dates'
import { useList } from './useList'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = useLeadsStore()
const {
    isRowExpanded,
    statusClass,
    toggleRow,
    statusTitle } = useList()

const handleItemsPerPage = (itemsPerPage: number) => {
    store.pagination.itemsPerPage = itemsPerPage
    store.pagination.currentPage = 1
    store.getLeads()
}
</script>

<style scoped src="./styles.scss"></style>