<template>
    <ul class="navbar-nav navbar-align custom-nav">
        <li v-if="productionMode" class="nav-item">
            <a type="button" class="btn btn-link text-decoration-underline" href="../inicio.aspx">
                <FontAwesomeIcon icon="fa-home" />
                Volver a SIANWEB
            </a>
        </li>
        <AppHeaderMenuFilterRik v-if="authSianwebStore.isGte" />
        <li class="dropdown nav-item">
            <a href="" role="button" class="nav-link dropdown-toggle d-none d-sm-inline-block" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="text-dark">{{ authSianwebStore?.userName }}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
                <a href="#" class="dropdown-item">Configuración</a>
                <a href="#" class="dropdown-item">...</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" role="button" @click="authStore.logout">
                    <FontAwesomeIcon icon="fa-right-from-bracket" />
                    Salir del CRM
                </a>
            </div>
        </li>
        <li class="nav-item" v-if="currentRoute.meta.canExtendContainer">
            <button
                type="button"
                class="btn btn-outline-secondary ms-2"
                :title="appStore.pageContainerMode === 'container' ? 'Expandir a pantalla completa': 'Reducir a ancho fijo'"
                @click="appStore.togglePageContainerModel"
            >
                <FontAwesomeIcon icon="fa-up-right-and-down-left-from-center" />
            </button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import AppHeaderMenuFilterRik from './AppHeaderMenuFilterRik.vue'
import { useAppStore } from '@/core/store/appStore'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { useAuthStore } from '@/core/store/authStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const authSianwebStore = useAuthSianwebStore()
const authStore = useAuthStore()
const router = useRouter()
const appStore = useAppStore()

const currentRoute = computed(() => router.currentRoute.value)

const productionMode = import.meta.env.MODE === 'production'
</script>

<style scoped>
.custom-nav .nav-item:not(:last-child)::after {
    content: "|";
    color: #6c757d;
    margin: 0 15px;
    font-weight: 300;
}
</style>