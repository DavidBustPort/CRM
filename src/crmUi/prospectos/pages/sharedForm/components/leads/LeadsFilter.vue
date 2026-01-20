<template>
    <div class="row mb-3">
        <div class="col-md-8 mx-auto">
            <div class="input-group shadow-sm border rounded">
                <span class="input-group-text w-100 bg-white border-0 pe-1">
                    <FontAwesomeIcon icon="fa-magnifying-glass" class="text-muted" />
                    <input
                        type="text"
                        class="form-control border-0 ps-2"
                        placeholder="Buscar por nombre"
                        v-model="store.fromLeads.searchFilter"
                        style="box-shadow: none;"
                    >
                    <button
                        class="btn btn-outline-secondary border-0 text-muted"
                        type="button"
                        @click="store.fromLeads.searchFilter = ''"
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
import { useProspectosFormStore } from '../../store/prospectosFormStore'
import { watch } from 'vue'

const store = useProspectosFormStore()

watch(() => store.fromLeads.searchFilter, () => {
    store.getLeads()
})
</script>