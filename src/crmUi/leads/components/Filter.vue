<template>
    <div class="row mb-3">
        <div class="col-md-8">
            <div class="input-group shadow-sm border rounded">
                <span class="input-group-text w-100 bg-white border-0 pe-1">
                    <FontAwesomeIcon icon="fa-magnifying-glass" class="text-muted" />
                    <input
                        type="text"
                        class="form-control border-0 ps-2"
                        placeholder="Buscar lead por nombre"
                        style="box-shadow: none;"
                        v-model="store.searchFilter"
                    >
                    <button
                        class="btn btn-outline-secondary border-0 text-muted"
                        type="button"
                        @click="store.searchFilter = ''"
                    >
                        <FontAwesomeIcon icon="fa-xmark" />
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { watch } from 'vue'
import { useLeadsStore } from '../store/leadsStore'

const store = useLeadsStore()

watch(() => store.searchFilter, () => {
    store.getLeads()
})
</script>