<template>
    <div class="row">
        <div class="col">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="text-primary fw-bold ps-3 border-start border-4 border-primary">Nuevo prospecto</h2>
                <BackToList />
            </div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-header text-end">
            <a v-if="viewMode === 'mobile'"  href="">
                
            </a>
            <a v-else href="" type="button" class="text-info fw-bold btn btn-link">
                <FontAwesomeIcon icon="fa-eye-slash" />
                Mostrar Leads
            </a>
        </div>
        <div class="card-body">
            <ProspectosForm />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProspectosForm from './components/prospectosForm/ProspectosForm.vue'
import BackToList from './components/BackToList.vue'
import { computed } from 'vue'
import { useResize } from '@/core/composables/useResize'

const { isMobile } = useResize()
const viewMode = computed(() => isMobile.value ? 'mobile' : 'desktop')
</script>