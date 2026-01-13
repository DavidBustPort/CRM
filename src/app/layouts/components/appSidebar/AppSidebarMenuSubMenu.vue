<template>
    <ul class="sidebar-subnav">
        <li
            v-for="child in props.childrens"
            :key="child.path"
            class="sidebar-item"
            :class="{ 'active': isActive(child) }"
        >
            <RouterLink
                :to="child.path"
                class="sidebar-link"
                @click="appStore.toggleSidebar"
            >
                <FontAwesomeIcon :icon="child.meta?.icon ?? 'fa-circle-user'" />
                {{ child.name }}
            </RouterLink>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAppStore } from '@/core/store/appStore'

const props = defineProps<{
    childrens: RouteRecordRaw[]
}>()

const router = useRouter()
const appStore = useAppStore()

const isActive = (route: RouteRecordRaw): boolean => router.currentRoute.value.path === route.path
</script>

<style scoped>
.sidebar-subnav {
    padding-left: 1.5rem;
    list-style: none;
}
</style>