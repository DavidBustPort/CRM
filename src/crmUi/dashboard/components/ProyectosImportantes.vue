<template>
    <div class="card shadow-sm border-0 h-100">
        <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-bold text-dark">Proyectos Importantes</h6>
            <FontAwesomeIcon icon="fa-star" class="text-warning small" />
        </div>
        <div class="card-body pt-0">
            <div class="table-responsive">
                <table class="table align-middle table-hover table-borderless">
                    <thead class="text-muted small text-uppercase" style="font-size: 0.75rem; letter-spacing: 0.5px;">
                        <tr>
                            <th class="ps-0">ID</th>
                            <th>Cliente</th>
                            <th class="text-end">VPO</th>
                            <th class="text-center">Etapa</th>
                        </tr>
                    </thead>
                    <tbody style="font-size: 0.9rem;">
                        <tr v-for="(p, index) in proy" :key="index">
                            <td class="ps-0 text-muted fw-bold">#{{ p.idOportunidad }}</td>
                            <td>
                                <div class="d-flex flex-column">
                                    <span :title="p.cliente" class="fw-bold text-dark text-truncate" style="max-width: 180px;">
                                        {{ p.cliente }}
                                    </span>
                                    <small class="text-muted" style="font-size: 0.75rem;">ID: {{ p.idCliente }}</small>
                                </div>
                            </td>
                            <td class="text-end fw-bold" :style="index === 0 ? { color: EtapasOportunidadesColor[p.etapa] } : {}">
                                {{ formatCurrency(p.vpoAlCierre) }}
                            </td>
                            <td class="text-center">
                                <span
                                    class="badge rounded-pill px-2 py-1"
                                    :style="{ backgroundColor: EtapasOportunidadesColor[p.etapa] }"
                                    style="font-size: 0.7rem; min-width: 45px; color: white; text-shadow: 0px 1px 2px rgba(0,0,0,0.2);"
                                >
                                    {{ EtapasOportunidadesAbbreviation[p.etapa] }}
                                </span>
                            </td>  
                        </tr>
                    </tbody>
                </table>
                <div v-if="!proy?.length" class="text-center py-4 text-muted small">
                    No hay proyectos relevantes este mes.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import { formatCurrency } from '@/core/utils/numbers'
import { EtapasOportunidadesColor, EtapasOportunidadesAbbreviation } from '@/shared/types/etapasOportunidades'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = useDashboardStore()
const proy = computed(() => store.data?.proyectosImportantes)
</script>