<template>
    <div :class="appStore.pageContainerMode">
        <div class="row">
            <div :class="route.meta.mainContainerColumn ?? 'col-12'">
                <div class="row mb-3">
                    <AppContainerBreadcrumb />
                </div>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/core/store/appStore'
import AppContainerBreadcrumb from './AppContainerBreadcrumb.vue'
import { useRoute } from 'vue-router'

const appStore = useAppStore()
const route = useRoute()
</script>