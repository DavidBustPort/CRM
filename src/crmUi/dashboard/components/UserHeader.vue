<template>
    <div class="dashboard-header mb-4">
        <div class="card border-0 shadow-sm pt-1">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-12 col-lg-7">
                        <div class="d-flex align-items-center">
                            <div class="icon-box me-3">
                                <FontAwesomeIcon icon="fa-tachometer-alt" class="text-primary fs-4" />
                            </div>
                            <div>
                                <h4 class="text-dark fw-bold mb-1">Dashboard CRM</h4>
                                <div class="user-info-bar d-flex align-items-center gap-3">
                                    <span class="info-item">
                                        <FontAwesomeIcon icon="fa-user" class="text-primary opacity-75" />
                                        <span class="ms-1">{{ authStore.userName }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-5 mt-3 mt-lg-0">
                        <div class="d-flex justify-content-lg-end align-items-end h-100">
                            <div class="header-filter-wrapper">
                                <FilterPeriodo
                                    v-model="store.filters"
                                    :format="'range'"
                                    title="Fecha de consulta" />
                            </div>
                            <button
                                class="btn btn-light ms-2 shadow-xs border-0 text-primary hover-rotate custom-sync-btn"
                                title="Actualizar datos"
                                @click="store.fetchData()"
                            >
                                <FontAwesomeIcon icon="fa-sync-alt" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FilterPeriodo from '@/shared/common/FilterPeriodo.vue'
import { useDashboardStore } from '../store/dashboardStore'
import { watch } from 'vue'

const authStore = useAuthSianwebStore()
const store = useDashboardStore()

watch(() => store.filters, (newValues) => {
    const [start, end] = newValues
    if (start && end) store.fetchData()
}, { deep: true })
</script>

<style scoped lang="scss">
.dashboard-header {
    .card {
        border-radius: 16px;
        background-color: #ffffff !important;
        border: 1px solid #f0f0f0;
    }

    .icon-box {
        width: 46px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f8faff;
        border-radius: 10px;
    }

    .icon-primary {
        color: #0d6efd;
        font-size: 1.25rem;
    }

    .user-info-bar {
        font-size: 0.85rem;
        color: #6c757d;
        
        .info-item svg {
            margin-right: 6px;
            color: #adb5bd;
        }
    }
}

.hover-rotate:hover svg {
    transform: rotate(180deg);
    transition: transform 0.4s ease;
}

.custom-sync-btn {
    height: 38px;
    width: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 0;
}

.header-filter-wrapper {
    :deep(.mb-2) {
        margin-bottom: 0 !important;
    }
}
</style>