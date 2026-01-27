<template>
    <UserHeader />
    <TotalesEtapas />
    <Metas />
    <div class="row mt-3 align-items-stretch">
        <div class="col-12 col-lg-6 d-flex flex-column gap-4">
            <ProyectosImportantes class="flex-grow-1" />
            <CumplimientoPresupuesto class="flex-grow-1" />
        </div>
        <div class="col-12 col-lg-6 d-flex flex-column gap-4">
            <Embudo class="flex-grow-1 px-4" />
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-12">
            <EstadisticasEtapa />
        </div>
    </div>

    <div class="row mt-4 align-items-stretch">
        <div class="col-12 col-lg-7">
            <DistribucionFuentes />
        </div>
        
        <div class="col-12 col-lg-5 mt-4 mt-lg-0">
            <TiempoEtapas />
        </div>
    </div>
    <ScrollToTopButton />
</template>

<script lang="ts" setup>
import UserHeader from './components/UserHeader.vue'
import Metas from './components/Metas.vue'
import TotalesEtapas from './components/TotalesEtapas.vue'
import { onMounted } from 'vue'
import { useDashboardStore } from './store/dashboardStore'
import { useAlert } from '@/core/composables/useAlert'
import ProyectosImportantes from './components/ProyectosImportantes.vue'
import CumplimientoPresupuesto from './components/PresupuestoEmbudo.vue'
import Embudo from './components/Embudo.vue'
import EstadisticasEtapa from './components/EstadisticasEtapa.vue'
import TiempoEtapas from './components/TiempoEtapas.vue'
import DistribucionFuentes from './components/DistribucionFuentes.vue'
import ScrollToTopButton from '@/shared/components/ScrollToTopButton.vue'

const store = useDashboardStore()
const { close } = useAlert()

onMounted(async () => {
    try {
        await store.fetchData(false)
    } finally { close() }
})
</script>