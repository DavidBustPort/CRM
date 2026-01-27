<template>
    <div class="row mt-4">
        <div class="col-12">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white border-0 py-3 d-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="card-title mb-0 fw-bold text-dark">Estadísticas Detalladas por Etapa</h5>
                        <small class="text-muted">Comparativo: Promedio Trimestre Anterior vs. Mes Actual</small>
                    </div>
                    <span class="badge bg-light text-primary border px-3 py-2">Datos en Tiempo Real</span>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle custom-stats-table">
                            <thead class="table-light">
                                <tr>
                                    <th rowspan="2" class="border-0 rounded-start">Etapa</th>
                                    <th colspan="3" class="text-center border-end py-2">Último trimestre (Promedio)</th>
                                    <th colspan="3" class="text-center border-end py-2">Mes de consulta</th>
                                    <th class="text-center border-0 rounded-end py-2">Diferencia</th>
                                </tr>
                                <tr>
                                    <th class="text-center small text-muted">Cant.</th>
                                    <th class="text-center small text-muted">Total ($)</th>
                                    <th class="text-center small text-muted border-end">%</th>
                                    <th class="text-center small text-muted">Cant.</th>
                                    <th class="text-center small text-muted">Total ($)</th>
                                    <th class="text-center small text-muted border-end">%</th>
                                    <th class="text-center small text-muted">vs Trimestre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="stat in data" :key="stat.etapa">
                                    <td class="fw-bold">
                                        <div class="d-flex align-items-center">
                                            <span :class="getEtapaClass(stat.codigo)" class="etapa-indicator me-2">{{ stat.codigo }}</span>
                                            {{ stat.etapa }}
                                        </div>
                                    </td>
                                    <td class="text-center">{{ stat.trimestre.cantidad }}</td>
                                    <td class="text-center text-dark fw-medium">{{ formatCurrency(stat.trimestre.total)
                                        }}</td>
                                    <td class="text-center border-end"><small class="text-muted">{{
                                            stat.trimestre.porcentaje }}%</small></td>
                                    <td class="text-center">{{ stat.mesActual.cantidad }}</td>
                                    <td class="text-center text-primary fw-bold">{{ formatCurrency(stat.mesActual.total)}}</td>
                                    <td class="text-center border-end"><small class="text-muted">{{ stat.mesActual.porcentaje }}%</small></td>
                                    <td class="text-center">
                                        <div :class="getComparativoClass(stat.comparativo)" class="badge-pill-status">
                                            <i :class="stat.comparativo >= 0 ? 'bi bi-graph-up-arrow' : 'bi bi-graph-down-arrow'"
                                                class="me-1"></i>
                                            {{ stat.comparativo > 0 ? '+' : '' }}{{ stat.comparativo }}%
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="table-light border-top-0">
                                <tr class="fw-bold">
                                    <td class="text-dark">TOTAL GENERAL</td>
                                    <td class="text-center">{{ totalStats.trimestre.cantidad }}</td>
                                    <td class="text-center">{{ formatCurrency(totalStats.trimestre.total) }}</td>
                                    <td class="text-center border-end">100%</td>
                                    <td class="text-center">{{ totalStats.mesActual.cantidad }}</td>
                                    <td class="text-center text-primary">{{ formatCurrency(totalStats.mesActual.total) }}</td>
                                    <td class="text-center border-end">100%</td>
                                    <td class="text-center">
                                        <div :class="getComparativoClass(totalStats.comparativo)"
                                            class="badge-pill-status">
                                            {{ totalStats.comparativo > 0 ? '+' : '' }}{{ totalStats.comparativo }}%
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import { formatCurrency } from '@/core/utils/numbers'

const store = useDashboardStore()

interface EtapaStat {
    etapa: string
    codigo: string
    trimestre: { cantidad: number, total: number, porcentaje: number }
    mesActual: { cantidad: number, total: number, porcentaje: number }
    comparativo: number
}

const data = computed<EtapaStat[]>(() => {
    if (!store.data?.estadisticasEtapas) return []

    return store.data.estadisticasEtapas.map(stat => {
        return {
            etapa: stat.etapa,
            codigo: stat.etapa.charAt(0).toUpperCase(),
            trimestre: {
                cantidad: stat.cantidadTrimestral,
                total: stat.totalTrimestral,
                porcentaje: stat.porcentajeTrimestral
            },
            mesActual: {
                cantidad: stat.cantidad,
                total: stat.total,
                porcentaje: stat.porcentaje
            },
            comparativo: calculateComparative(stat.total, stat.totalTrimestral) // Comparación por monto
        }
    })
})

const totalStats = computed(() => {
    const tCant = data.value.reduce((sum, s) => sum + s.trimestre.cantidad, 0)
    const tTotal = data.value.reduce((sum, s) => sum + s.trimestre.total, 0)
    const mCant = data.value.reduce((sum, s) => sum + s.mesActual.cantidad, 0)
    const mTotal = data.value.reduce((sum, s) => sum + s.mesActual.total, 0)

    return {
        trimestre: { cantidad: tCant, total: tTotal },
        mesActual: { cantidad: mCant, total: mTotal },
        comparativo: calculateComparative(mTotal, tTotal)
    }
})

function calculateComparative(actual: number, baseline: number): number {
    if (!baseline || baseline === 0) return actual > 0 ? 100 : 0
    return parseFloat((((actual - baseline) / baseline) * 100).toFixed(1))
}

const getEtapaClass = (codigo: string) => {
    const map: Record<string, string> = {
        'A': 'etapa-a',
        'P': 'etapa-p',
        'N': 'etapa-n',
        'C': 'etapa-c'
    }
    return map[codigo] || 'bg-secondary'
}

const getComparativoClass = (val: number) => {
    if (val > 0) return 'status-positive'
    if (val < 0) return 'status-negative'
    return 'status-neutral'
}
</script>

<style scoped>
.custom-stats-table th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.etapa-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    font-size: 0.7rem;
    color: white;
    font-weight: bold;
}

.badge-pill-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
}

.status-positive {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.status-negative {
    background-color: #ffebee;
    color: #c62828;
}

.status-neutral {
    background-color: #f5f5f5;
    color: #616161;
}

.table-hover tbody tr:hover {
    background-color: rgba(59, 130, 246, 0.04);
}
</style>