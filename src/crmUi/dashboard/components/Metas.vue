<template>
    <div class="row mt-3">
        <div class="col-12">
            <div class="card shadow-sm border-0">
                <div class="card-body py-4"> <div class="row align-items-center">
                        <div class="col-md-3 text-center text-md-start mb-3 mb-md-0">
                            <div class="d-flex align-items-center justify-content-center justify-content-md-start">
                                <i class="fas fa-chart-line fa-2x me-3 text-primary"></i>
                                <div>
                                    <h6 class="mb-0 text-uppercase fw-bold text-dark">Meta Mensual</h6>
                                    <small class="text-muted">Cierre de Ventas</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text-center">
                                <div class="progress mb-2" style="height: 18px; border-radius: 10px;">
                                    <div 
                                        class="progress-bar progress-bar-striped progress-bar-animated" 
                                        :class="`bg-` + statusClass"
                                        :style="{ width: Math.min(metaProgress, 100) + '%'}"
                                    >
                                        {{ metaProgress }}%
                                    </div>
                                </div>
                                <span class="fw-bold text-dark">
                                    {{ formatCurrency(totales?.totalCierre ?? 0) }}
                                </span>
                                <span class="text-muted"> de {{ formatCurrency(totales?.pptoMetaMensual ?? 0)}}</span>
                            </div>
                        </div>
                        <div class="col-md-3 text-center text-md-end mt-3 mt-md-0">
                            <h2 :class="`text-` + statusClass" class="mb-1 fw-black">{{ metaProgress }}%</h2>
                            <span :class="`bg-` + statusClass" class="badge rounded-pill py-2 px-3">
                                <FontAwesomeIcon
                                    :class="{ 'fa-spin': metaProgress < 100 }"
                                    :icon="metaProgress >= 100 ? 'fa-check-circle' : 'fa-spinner'" />
                                <span class="ms-1">{{ metaProgress >= 100 ? ' META LOGRADA' : ' EN CURSO' }}</span>
                            </span>
                        </div>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = useDashboardStore()

const totales = computed(() => store.data?.totalesEtapas)

const metaProgress = computed(() => {
    const cierre = totales.value?.totalCierre ?? 0
    const ppto = totales.value?.pptoMetaMensual ?? 0

    if (ppto <= 0) return 0
    
    const percentage = Math.round((cierre / ppto) * 100)
    return percentage
})

const statusClass = computed(() => {
    if (metaProgress.value >= 80) return 'success'
    if (metaProgress.value >= 50) return 'warning'
    return 'danger'
})
</script>