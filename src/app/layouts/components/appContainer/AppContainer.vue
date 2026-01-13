<template>
    <div :class="appStore.pageContainerMode">
        <div class="row mb-3">
            <AppContainerBreadcrumb />
        </div>
        <RouterView />
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/core/store/appStore'
import AppContainerBreadcrumb from './AppContainerBreadcrumb.vue'

const appStore = useAppStore()
</script>