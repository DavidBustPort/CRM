<template>
    <div class="card shadow-sm border-0 h-100 d-flex flex-column">
        <div class="card-header bg-white border-0 py-3">
            <h6 class="mb-0 fw-bold text-dark">Embudo de Ventas</h6>
            <small class="text-muted">Distribución de oportunidades por etapa</small>
        </div>
        <div class="card-body d-flex flex-column">
            <div class="text-center mb-2">
                <h5 class="text-muted small mb-1">Importe Total General</h5>
                <h4 class="text-success fw-bold mb-0">{{ formatCurrency(totalOportunidades) }}</h4>
                <small class="text-muted fw-bold">{{ totalCantidadOportunidades }} oportunidades totales</small>
            </div>

            <div class="flex-grow-1">
                <apexchart
                    type="bar"
                    height="450"
                    :options="chartOptions"
                    :series="chartSeries"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import { formatCurrency } from '@/core/utils/numbers'
import type { ApexOptions } from 'apexcharts'

const store = useDashboardStore()
const ETAPAS_ORDEN = ['Análisis', 'Promoción', 'Negociación', 'Cierre']

const processedData = computed(() => {
    const rawData = store.data?.embudo || []
    return ETAPAS_ORDEN.map(etapaNombre => {
        const found = rawData.find(d => d.etapa.toLowerCase().includes(etapaNombre.toLowerCase()))
        return {
            etapa: etapaNombre,
            total: found?.total ?? 0,
            cantidad: found?.cantidad ?? 0,
            porcentaje: found?.porcentaje ?? 0,
            chartValue: found?.total
        }
    })
})

const totalOportunidades = computed(() =>
    processedData.value.reduce((sum, item) => sum + item.total, 0)
)

const totalCantidadOportunidades = computed(() =>
    processedData.value.reduce((sum, item) => sum + item.cantidad, 0)
)

const chartSeries = computed(() => {
    const escalaVisual = [100, 80, 60, 40]

    return [{
        name: 'Embudo',
        data: escalaVisual
    }]
})

const chartOptions = computed((): ApexOptions => ({
    chart: {
        type: 'bar',
        toolbar: { show: false },
        redrawOnParentResize: true,
        animations: { enabled: true }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '90%',
            isFunnel: true,
            distributed: true,
            dataLabels: {
                position: 'center'
            }
        },
    },
    colors: ['#00a3ff', '#008be6', '#0072cc', '#005bb3'],
    dataLabels: {
        enabled: true,
        offsetY: -20,
        textAnchor: 'middle',
        formatter: function (_, opt) {
            const info = processedData.value[opt.dataPointIndex]
            if (!info) return ''

            return [
                info.etapa.toUpperCase(),
                `${info.porcentaje}%`
                
            ]
        },
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            colors: ['#fff']
        },
        dropShadow: { 
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
        }
    },
    tooltip: {
        enabled: true,
        custom: function ({ dataPointIndex, w }) {
            const info = processedData.value[dataPointIndex]
            if (!info) return ''

            return `<div class="p-2 shadow border-0">
                <strong style="color: ${w.config.colors[dataPointIndex]}">${info.etapa}</strong><br/>
                <span>Total: ${formatCurrency(info.total)}</span><br/>
                <span>${info.cantidad} oportunidades</span>
            </div>`
        }
    },
    xaxis: { categories: ETAPAS_ORDEN, labels: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false },
    grid: { show: false },
    legend: { show: false }
}))
</script>