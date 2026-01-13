<template>
    <div class="border rounded shadow mb-4 p-3">
        <DetailFilterEvolucionEtapas v-if="authSianwebStore.isGte" />
        <div class="row align-items-end mt-3">
            <div class="col-12 col-md-3">
                <FilterPeriodo
                    :format="'single'"
                    :label-italics="true"
                    title="Periodo de registro"
                    v-model="store.prospectosFilters.date"
                />
            </div>
            <div class="col-12 col-md-3">
                <DetailFilterNombreProspecto :label-italics="true" />
            </div>
            <div class="col-12 col-md-3">
                <FilterTipoProspectos
                    :format="'single'"
                    v-model="store.prospectosFilters.tipoProspecto"
                    :label-italics="true" />
            </div>
            <div class="col-12 col-md-3">
                <DetailFilterRegistro
                    :label-italics="true" />
            </div>
            <div class="col-md-3">
                <DetailFilterEstatusProspecto :label-italics="true" />
            </div>
            <div class="col-md-3" v-if="store.prospectosFilters.showGteDetails">
                <DetailFilterEtapaLead :label-italics="true" />
            </div>
            <div class="col-md-3" v-if="store.prospectosFilters.showGteDetails">
                <FilterEtapasProyecto
                    v-model="store.prospectosFilters.etapa"
                    :label-italics="true" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col text-end">
                <button
                    title="Limpiar filtros"
                    :disabled="!activeFilters"
                    @click="store.clearFilters"
                    class="btn btn-outline-danger btn-sm"
                >
                    <FontAwesomeIcon icon="fa-circle-xmark" class="me-1" />
                    <span>Limpiar filtros</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterPeriodo from '@/shared/common/FilterPeriodo.vue'
import DetailFilterEvolucionEtapas from './DetailFilterEvolucionEtapas.vue'
import DetailFilterNombreProspecto from './DetailFilterNombreProspecto.vue'
import DetailFilterRegistro from './DetailFilterRegistro.vue'
import DetailFilterEstatusProspecto from './DetailFilterEstatusProspecto.vue'
import DetailFilterEtapaLead from './DetailFilterEtapaLead.vue'
import FilterEtapasProyecto from '@/shared/common/FilterEtapasProyecto.vue'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { useProspectosListStore } from '../../store/prospectosListStore'
import FilterTipoProspectos from '@/shared/common/FilterTipoProspectos.vue'
import { computed, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const authSianwebStore = useAuthSianwebStore()
const store = useProspectosListStore()

const activeFilters = computed(() => {
    return Object.entries(store.prospectosFilters).some(
        ([key, value]) =>
            value !== -1 &&
            value &&
            value !== '' &&
            key !== 'showGteDetails' &&
            key !== 'rik'
    )
})

watch(() => store.prospectosFilters, () => store.getProspectosList(), {
    deep: true
})
</script>