<template>
    <div class="card shadow-sm border-0 h-100">
        <div class="card-header bg-white border-0 py-3">
            <h6 class="mb-0 fw-bold text-dark">Cumplimiento de Presupuesto</h6>
        </div>
        <div class="card-body">
            <div class="row g-2 mb-4">
                <div class="col-6">
                    <div class="p-2 rounded-3 bg-light border-start border-primary border-4">
                        <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">PPTO. EMBUDO</small>
                        <span class="h6 fw-bold text-dark mb-0">{{ formatCurrency(data?.pptoEmbudo ?? 0) }}</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="p-2 rounded-3 bg-light border-start border-success border-4">
                        <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">PROY. ACTUAL</small>
                        <span class="h6 fw-bold text-dark mb-0">{{ formatCurrency(data?.proyectoEmbudo ?? 0) }}</span>
                    </div>
                </div>
            </div>
            <div v-if="(data?.pptoEmbudo ?? 0) > 0" id="chart" class="d-flex justify-content-center">
                <apexchart
                    type="radialBar"
                    height="250"
                    :options="chartOptions"
                    :series="chartSeries"
                />
            </div>

            <div v-else class="pb-5">
                <div class="p-3 rounded-3 bg-light border border-dashed text-muted">
                    <i class="fas fa-exclamation-circle mb-2 d-block fs-4 text-warning"></i>
                    <span class="small fw-medium">Falta configurar el presupuesto para este periodo</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import { formatCurrency } from '@/core/utils/numbers'
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

const apexchart = VueApexCharts
const store = useDashboardStore()
const data = computed(() => store.data?.cumplimientoPresupuesto || null)

const porcentajeCumplimiento = computed(() => {
    if (!data.value || !data.value.pptoEmbudo || data.value.pptoEmbudo === 0) return 0

    const value = (data.value.proyectoEmbudo / data.value.pptoEmbudo) * 100
    return Math.max(0, Math.min(Math.round(value), 100))
})

const chartOptions = computed((): ApexOptions => ({
    chart: {
        type: 'radialBar',
        sparkline: { enabled: true }
    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
                size: '65%'
            },
            track: {
                background: "#e7e7e7",
                strokeWidth: '100%',
                margin: 5,
            },
            dataLabels: {
                name: { show: false },
                value: {
                    offsetY: -2,
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#373d3f',
                    formatter: (val: number) => val + '%'
                }
            }
        }
    },
    grid: {
        padding: {
            bottom: -130
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: [
                {
                    offset: 0,
                    color: porcentajeCumplimiento.value >= 80 ? '#198754' : (porcentajeCumplimiento.value >= 50 ? '#ffc107' : '#dc3545'),
                    opacity: 1
                },
                {
                    offset: 100,
                    color: porcentajeCumplimiento.value >= 80 ? '#20c997' : (porcentajeCumplimiento.value >= 50 ? '#fadb7d' : '#ff7979'),
                    opacity: 1
                }
            ]
        }
    },
    labels: ['Progreso'],
}))

console.log(porcentajeCumplimiento.value)
const chartSeries = computed(() => [porcentajeCumplimiento.value])
</script>