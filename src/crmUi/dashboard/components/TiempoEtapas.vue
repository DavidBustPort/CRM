<template>
    <div class="card shadow-sm border-0 h-100">
        <div class="card-header bg-white border-0 py-3">
            <h6 class="mb-0 fw-bold text-dark">Ciclo de Vida (Días)</h6>
            <small class="text-muted">Tiempo promedio de transición entre etapas</small>
        </div>
        <div class="card-body d-flex flex-column justify-content-center">
            <div class="table-responsive">
                <table class="table table-borderless align-middle mb-0">
                    <thead class="text-uppercase">
                        <tr>
                            <th class="small fw-bold text-muted ps-0">Transición</th>
                            <th class="small fw-bold text-muted text-center">Promedio</th>
                            <th class="small fw-bold text-muted text-end">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="ps-0">
                                <div class="d-flex align-items-center">
                                    <div class="transicion-icon etapa-a">A</div>
                                    <i class="bi bi-arrow-right mx-2 text-muted"></i>
                                    <div class="transicion-icon etapa-p">P</div>
                                    <span class="ms-3 fw-medium text-dark">Análisis → Promoción</span>
                                </div>
                            </td>
                            <td class="text-center">
                                <span class="fs-5 fw-bold text-primary">{{ data?.analisisPromocion || 0 }}</span>
                            </td>
                            <td class="text-end">
                                <span :class="getSpeedClass(data?.analisisPromocionDias)" class="dot-indicator"></span>
                            </td>
                        </tr>

                        <tr>
                            <td class="ps-0">
                                <div class="d-flex align-items-center">
                                    <div class="transicion-icon etapa-p">P</div>
                                    <i class="bi bi-arrow-right mx-2 text-muted"></i>
                                    <div class="transicion-icon etapa-n">N</div>
                                    <span class="ms-3 fw-medium text-dark">Promoción → Negociación</span>
                                </div>
                            </td>
                            <td class="text-center">
                                <span class="fs-5 fw-bold text-primary">{{ data?.promocionNegociacion || 0 }}</span>
                            </td>
                            <td class="text-end">
                                <span :class="getSpeedClass(data?.promocionNegociacionDias)" class="dot-indicator"></span>
                            </td>
                        </tr>

                        <tr>
                            <td class="ps-0">
                                <div class="d-flex align-items-center">
                                    <div class="transicion-icon etapa-n">N</div>
                                    <i class="bi bi-arrow-right mx-2 text-muted"></i>
                                    <div class="transicion-icon etapa-c">C</div>
                                    <span class="ms-3 fw-medium text-dark">Negociación → Cierre</span>
                                </div>
                            </td>
                            <td class="text-center">
                                <span class="fs-5 fw-bold text-primary">{{ data?.negociacionCierre || 0 }}</span>
                            </td>
                            <td class="text-end">
                                <span :class="getSpeedClass(data?.negociacionCierreDias)" class="dot-indicator"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                <span class="fw-bold text-uppercase small text-muted">Velocidad Media Total</span>
                <div class="bg-light px-3 py-1 rounded-pill">
                    <span class="h4 mb-0 fw-black text-dark">{{ data?.promedio || 0 }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'

const store = useDashboardStore()

const data = computed(() => store.data?.tiempoPorEtapa || null)

const getSpeedClass = (dias: number | undefined) => {
    if (!dias) return 'bg-secondary'
    if (dias <= 5) return 'bg-success'
    if (dias <= 15) return 'bg-warning'
    return 'bg-danger'
}
</script>

<style scoped>
.transicion-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
}

.dot-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.table > :not(caption) > * > * {
    padding: 1rem 0.5rem;
}

.fw-black {
    font-weight: 900;
}
</style>