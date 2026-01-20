<template>
    <div class="row mb-3">
        <div class="col-12 text-center text-md-start col-md-6">
            <h2 class="text-primary fw-bold ps-3 border-start border-4 border-primary">{{ route.name }}</h2>
        </div>
        <div class="col-12 col-md-6 mt-3 mt-md-0 text-end">
            <div class="d-md-flex justify-content-center justify-content-md-end align-items-center align-items-md-end gap-2">
                <div class="btn-md-group">
                    <button @click="exportToExcel" class="btn btn-success text-white p-2" :class="{ 'me-md-2': !authSianwebStore.isGte }">
                        <FontAwesomeIcon icon="fa-file-export" class="me-2" /> Exportar tabla a Excel
                    </button>
                    <RouterLink
                        v-if="!authSianwebStore.isGte"
                        to="/prospectos/crear"
                        class="btn btn-primary mt-2 mt-md-0 text-white p-2"
                    >
                        <FontAwesomeIcon icon="fa-user-plus" class="me-2" /> Nuevo prospecto
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <DetailFilter />
            <hr class="my-4">
            <DetailTable />
        </div>
    </div>
</template>

<script lang="ts" setup>
import DetailFilter from './components/detailFilter/DetailFilter.vue'
import DetailTable from './components/detailTable/DetailTable.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProspectosListStore } from './store/prospectosListStore'
import { useAppStore } from '@/core/store/appStore'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { ProspectosListService } from './services/prospectosList-service'

const route = useRoute()
const store = useProspectosListStore()
const appStore = useAppStore()
const authSianwebStore = useAuthSianwebStore()

const exportToExcel = async (): Promise<void> => {
    const req = store.buildProspectosListApiRequest()
    await ProspectosListService.getProspectosListFromExcel(req)
}

watch(() => appStore.selectedRik, () => {
    store.prospectosFilters.rik = appStore.selectedRik
})

onMounted(() => store.getProspectosListDebounce())
</script>

<style scoped>
hr {
    border: none;
    height: 2px;
    margin: 2rem 0;
    background: linear-gradient(90deg, transparent, #007bff, transparent);
}
</style>