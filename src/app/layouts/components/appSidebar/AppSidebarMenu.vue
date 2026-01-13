<template>
    <ul class="sidebar-nav">
        <li class="sidebar-header">Páginas</li>
        <template v-for="route in routes" :key="route.path">
            <li
                class="sidebar-item"
                :class="{ 
                    'has-submenu': hasChildren(route),
                    'active': route.path === currentRoute.value.path
                }"
            >
                <div
                    v-if="hasChildren(route)"
                    @click="toggleSubmenu(route.path)"
                    class="d-flex align-items-center sidebar-link"
                >
                    <FontAwesomeIcon :icon="route.meta.icon ?? 'fa-circle-user'" />
                    <span class="ms-2">{{ route.name }}</span>
                    <FontAwesomeIcon class="ms-auto" :icon="isOpenSubmenu[route.path] ? 'fa-chevron-down': 'fa-chevron-up'" />
                </div>
                <RouterLink
                    v-else
                    :to="route.path"
                    @click="appStore.toggleSidebar"
                    class="sidebar-link"
                >
                    <FontAwesomeIcon :icon="route.meta.icon ?? 'fa-circle-user'" />
                    {{ route.name }}
                </RouterLink>

                <AppSidebarMenuSubMenu
                    :childrens="route.children"
                    v-if="hasChildren(route) && isOpenSubmenu[route.path]"
                />
            </li>
        </template>
    </ul>
</template>

<script lang="ts" setup>
import AppSidebarMenuSubMenu from './AppSidebarMenuSubMenu.vue'
import { computed, reactive } from 'vue'
import { useRouter, type RouteRecordNormalized } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAppStore } from '@/core/store/appStore'

const router = useRouter()
const appStore = useAppStore()

const routes = computed(() => 
    router
    .getRoutes()
    .filter(route => route.meta?.sidebarMenu)
)

const currentRoute = computed(() => router.currentRoute)

const hasChildren = (route: RouteRecordNormalized): boolean =>
    route.children &&
    route.children.length > 0 &&
    route.children.some(child => child.meta?.sidebarMenu)

const isOpenSubmenu = reactive<{ [key: string]: boolean }>({})
const toggleSubmenu = (path: string) => isOpenSubmenu[path] = !isOpenSubmenu[path]
</script>

<style scoped>
.has-submenu {
    .sidebar-link {
        user-select: none;
    }
}
</style>