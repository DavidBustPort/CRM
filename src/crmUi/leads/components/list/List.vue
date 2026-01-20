<template>
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
                <tr>
                    <th
                        class="text-uppercase small fw-bold text-muted"
                        v-if="authSianwebStore.isGte"
                    >Estatus</th>
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
                    <tr class="custom-row">
                        <td v-if="authSianwebStore.isGte" class="ps-4">
                            <div class="d-flex align-items-center">
                                <button
                                    class="btn btn-icon btn-light btn-sm me-2"
                                    @click="toggleRow(index)"
                                >
                                    <FontAwesomeIcon :icon="isRowExpanded(index) ? 'fa-minus' : 'fa-plus'" />
                                </button>
                                <span :class="['badge', statusClass(l.estatusId)]" class="p-2">{{ l.estatus }}</span>
                            </div>
                        </td>
                        <td class="text-secondary small">
                            {{ formatDate(l.fechaAlta) }}
                        </td>
                        <td>
                            <div class="fw-bold text-dark">{{ l.nombreEmpresa ?? '...'}}</div>
                            <div class="text-muted small">Lead ID: #</div>
                        </td>
                        <td>
                            <div class="text-dark">{{ l.giroEmpresa ?? '---'}}</div>
                            <div class="text-primary small fw-medium">
                                <FontAwesomeIcon icon="fa-tag" />
                                {{ l.productoInteres ?? 'No especificado' }}
                            </div>
                        </td>
                    </tr>
                </template>

                <NoRowsTable v-if="!store.isApiBusy && store.leads.totalRows === 0" :colspan="colspan" />
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import LoadingTable from '@/shared/components/LoadingTable.vue'
import NoRowsTable from '@/shared/components/NoRowsTable.vue'
import { useLeadsStore } from '../../store/leadsStore'
import { formatDate } from '@/core/utils/dates'
import { useList } from './useList'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = useLeadsStore()
const authSianwebStore = useAuthSianwebStore()
const {
    isRowExpanded,
    statusClass,
    toggleRow } = useList()

const colspan = authSianwebStore.isGte ? 4 : 3
</script>

<style scoped src="./styles.scss"></style>