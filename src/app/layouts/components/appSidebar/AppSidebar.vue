<template>
    <nav class="sidebar" :class="{ 'collapsed': !appStore.sidebarCollapsed }">
        <div class="sidebar-content">
            <a class="sidebar-brand text-center" href="#">
                <img src="/src/assets/logo.png" alt="logo">
            </a>
            <AppSidebarMenu />
        </div>
    </nav>
</template>

<script lang="ts" setup>
import AppSidebarMenu from './AppSidebarMenu.vue'
import { useAppStore } from '@/core/store/appStore'

const appStore = useAppStore()
</script>