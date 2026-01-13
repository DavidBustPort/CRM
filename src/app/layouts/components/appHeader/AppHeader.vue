<template>
    <nav class="navbar navbar-expand navbar-bg">
        <a href="#" role="button" class="sidebar-toggle" @click.prevent="appStore.toggleSidebar">
            <i class="hamburger align-self-center"></i>
        </a>
        <div class="d-flex align-items-center">
            <em class="me-3">CRM</em>
        </div>
        <div class="navbar-collapse collapse">
            <AppHeaderMenu />
        </div>
    </nav>
</template>

<script lang="ts" setup>
import AppHeaderMenu from './AppHeaderMenu.vue'
import { useAppStore } from '@/core/store/appStore'

const appStore = useAppStore()
</script>