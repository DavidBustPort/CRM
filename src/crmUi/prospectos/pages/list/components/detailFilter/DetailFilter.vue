<template>
    <div class="border rounded shadow mb-4 p-4">
        <div class="d-flex justify-content-between mb-1 align-items-center">
            <div class="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon="fa-filter" class="me-2 text-primary" />
                <h5 class="mb-0 fw-bold text-dark">Filtros de búsqueda</h5>
                <span v-if="activeFilters" class="badge rounded-pill bg-primary-subtle text-primary ms-2 small">
                    Activos
                </span>
            </div>
            <button
                v-if="activeFilters"
                title="Restablecer todos los filtros"
                @click="store.clearFilters"
                class="btn btn-link btn-sm text-danger text-decoration-none fw-bold"
            >
                <FontAwesomeIcon icon="fa-trash-can" class="me-1" />
                Limpiar todo
            </button>
        </div>
        <hr class="opacity-10 mb-3 mt-0">
        <DetailFilterEvolucionEtapas v-if="authSianwebStore.isGte" />
        <div class="row align-items-end g-3 mt-1">
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

watch(() => store.prospectosFilters, () => store.getProspectosListDebounce(false), {
    deep: true
})
</script>