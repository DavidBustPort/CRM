<template>
    <div class="row g-3">
        <div
            v-for="(card, index) in stages"
            :key="index"
            class="col-12 col-sm-6 col-md-4 col-xl-2"    
        >
            <div class="card h-100 border-0 shadow-sm custom-card">
                <div :style="{ backgroundColor: card.color }" class="card-indicator"></div>
                <div class="card-body p-3">
                    <div class="d-flex align-items-center mb-2">
                        <div
                            class="icon-shape rounded-circle me-2 d-flex align-items-center justify-content-center"
                            :style="{ backgroundColor: card.color + '15', color: card.color }"
                        >
                            <FontAwesomeIcon :icon="card.icon" class="fs-6" />
                        </div>
                        <h6 class="text-muted mb-0 small fw-bold text-uppercase">
                            {{ card.title }}
                        </h6>
                    </div>

                    <div class="text-center mt-3">
                        <h3 class="mb-0 fw-extabold tracking-tight" :style="{ color: card.color }">
                            {{ formatCurrency(card.value) }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { formatCurrency } from '@/core/utils/numbers'
import { useDashboardStore } from '../store/dashboardStore'
import type { TotalesEtapas } from '../types/totalesEtapas'

const store = useDashboardStore()
const totales = computed(() => store.data?.totalesEtapas)

interface CardConfig {
    title: string
    key: keyof TotalesEtapas
    color: string
    icon: string
    value?: number
}

const CONFIG: CardConfig[] = [
    { title: 'Análisis', key: 'totalAnalisis', color: '#00a3ff', icon: 'fa-search' },
    { title: 'Promoción', key: 'totalPromocion', color: '#008be6', icon: 'fa-bullhorn' },
    { title: 'Negociación', key: 'totalNegociacion', color: '#0072cc', icon: 'fa-handshake' },
    { title: 'Embudo', key: 'totalEmbudo', color: '#dc3545', icon: 'fa-filter' },
    { title: 'Cierres', key: 'totalCierre', color: '#28a745', icon: 'fa-check-double' },
    { title: 'Meta Mensual', key: 'pptoMetaMensual', color: '#6f42c1', icon: 'fa-trophy' }
]

const stages = computed(() => {
    return CONFIG.map(item => ({
        ...item,
        value: totales.value?.[item.key] ?? 0
    }))
})
</script>

<style scoped lang="scss">
.custom-card {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
    }

    .card-indicator {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
    }

    .icon-shape {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
    }
    .fw-extrabold {
        font-weight: 800;
    }

    .tracking-tight {
        letter-spacing: -0.025em;
    }
}
</style>