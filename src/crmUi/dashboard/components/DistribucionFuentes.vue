<template>
    <div class="card shadow-sm border-0 h-100">
        <div class="card-header bg-white border-0 py-3">
            <h6 class="mb-0 fw-bold text-dark">Distribución por Origen</h6>
            <small class="text-muted">Análisis de prospectos vs leads convertidos</small>
        </div>
        <div class="card-body d-flex flex-column justify-content-center">
            <div class="row align-items-center">
                <div class="col-12 col-md-7 text-center">
                    <apexchart type="donut" :height="isMobile ? 280 : 320" :options="chartOptions"
                        :series="chartSeries" />
                </div>

                <div class="col-12 col-md-5 mt-4 mt-md-0">
                    <div v-for="item in processedData" :key="item.nombre"
                        class="mb-3 p-2 rounded-3 border-start border-4 shadow-sm"
                        :style="`border-color: ${item.color} !important; background: #fafafa`">
                        <div class="d-flex justify-content-between align-items-center px-2">
                            <div>
                                <small class="text-muted d-block text-uppercase fw-bold" style="font-size: 0.65rem;">{{
                                    item.nombre }}</small>
                                <span class="h5 mb-0 fw-bold text-dark">{{ item.cantidad }}</span>
                            </div>
                            <div class="text-end">
                                <span class="badge rounded-pill bg-white text-dark border">{{ item.porcentaje }}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import { useResize } from '@/core/composables/useResize'
import type { ApexOptions } from 'apexcharts'

const store = useDashboardStore()
const { isMobile } = useResize()

const processedData = computed(() => {
    const fuentes = store.data?.fuentes
    if (!fuentes) return []

    const total = fuentes.prospectos + fuentes.leads
    if (total === 0) return []

    return [
        {
            nombre: 'Prospectos',
            porcentaje: parseFloat(((fuentes.prospectos / total) * 100).toFixed(1)),
            cantidad: fuentes.prospectos,
            color: '#00a3ff'
        },
        {
            nombre: 'Leads',
            porcentaje: parseFloat(((fuentes.leads / total) * 100).toFixed(1)),
            cantidad: fuentes.leads,
            color: '#a855f7'
        }
    ]
})

const chartSeries = computed(() => processedData.value.map(d => d.cantidad))

const chartOptions = computed((): ApexOptions => ({
    chart: {
        type: 'donut',
        redrawOnParentResize: true
    },
    colors: processedData.value.map(d => d.color),
    labels: processedData.value.map(d => d.nombre),
    stroke: { show: false },
    legend: { show: false },
    dataLabels: {
        enabled: true,
        style: { fontSize: '12px', fontWeight: 'bold' },
        dropShadow: { enabled: false }
    },
    plotOptions: {
        pie: {
            donut: {
                size: '75%',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: 'TOTAL',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#6c757d',
                        formatter: (w) => {
                            return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
                        }
                    },
                    value: {
                        show: true,
                        fontSize: '22px',
                        fontWeight: 'bold',
                        offsetY: 5
                    }
                }
            }
        }
    },
    tooltip: {
        y: { formatter: (val) => `${val} registros` }
    }
}))
</script>