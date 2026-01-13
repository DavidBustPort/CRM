<template>
	<PageLoading v-if="appStore.isPageLoading" />
	<AppLayout v-else-if="authorized" />
	<RouterView v-else />
	
	<Modal ref="modalRef">
		<h4 class="text-center">{{ authorizationError }}</h4>
	</Modal>
</template>

<script lang="ts" setup>
import AppLayout from './app/layouts/AppLayout.vue'
import Modal from './shared/components/modal/Modal.vue'
import PageLoading from './app/views/PageLoading.vue'
import { onMounted } from 'vue'
import { useApp } from './useApp'
import { useAppStore } from './core/store/appStore'
import { useRouter } from 'vue-router'

const { modalRef, verifySessionSianweb, verifyApiToken, authorized, authorizationError } = useApp()
const appStore = useAppStore()
const router = useRouter()

onMounted(async () => {
	const sesion = await verifySessionSianweb()
	if (!sesion) {
		appStore.setPageLoading(false)
		router.push('/no-autorizado')
		return
	}

	const token = await verifyApiToken()
	if (!token) {
		modalRef.value?.open({
			title: 'Error al iniciar sesión',
			size: 'md',
			animation: 'slide',
			showCloseButtonInHeader: true,
			confirmButtonText: 'Aceptar',
			showCloseButton: false,
			onConfirm: () => {
				modalRef.value?.close()
				router.push('/no-autorizado')
			}
		})
	}
})
</script>