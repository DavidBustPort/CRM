<template>
    <div class="row mb-3">
        <div class="col-12 text-center text-md-start col-md-6">
            <h2 class="text-primary fw-bold ps-3 border-start border-4 border-primary">{{ route.name }}</h2>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <div class="border rounded shadow mb-4 p-4">
                <div class="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon="fa-filter" class="me-2 text-primary" />
                    <h5 class="mb-0 fw-bold text-dark">Filtros de búsqueda</h5>
                </div>
                <hr class="opacity-10 mb-3 mt-0">
                <Filter />
            </div>
            <List />
        </div>
    </div>
</template>

<script lang="ts" setup>
import List from './components/list/List.vue'
import Filter from './components/Filter.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLeadsStore } from './store/leadsStore'
import { useAlert } from '@/core/composables/useAlert'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = useLeadsStore()
const route = useRoute()
const { close } = useAlert()

onMounted(async () => {
    try {
        await Promise.all([
            store.getLeads(),
            store.getSucursales()
        ])
    }
    finally {
        close()
    }
})
</script>