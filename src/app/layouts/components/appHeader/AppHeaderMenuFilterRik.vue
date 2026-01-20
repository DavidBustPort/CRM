<template>
    <li class="nav-item dropdown">
        <a href="" role="button" class="nav-link dropdown-toggle d-none d-sm-inline-block" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="me-2">Riks:</span>
            <strong class="text-danger">{{ selectedRikName }}</strong>
        </a>
        <div class="dropdown-menu dropdown-menu-end rik-gerente-dropdown">
            <div class="dropdown-header d-flex align-items-center">
                <FontAwesomeIcon icon="fa-user-tie" class="me-2 text-primary" />
                <strong>Ejecutivos de Ventas</strong>
            </div>
            <div class="dropdown-divider"></div>
            <div class="search-container mb-3">
                <div class="input-group">
                    <span class="input-group-text">
                        <FontAwesomeIcon icon="fa-search" class="text-muted" />
                    </span>
                    <input
                        v-model="searchTerm"
                        type="text"
                        class="form-control"
                        placeholder="Buscar ejecutivo..."
                        @click.stop
                    >
                </div>
            </div>
            <div v-for="(rik, index) in filteredRiks" :key="index">
                <button
                    class="dropdown-item rik-option"
                    @click="selectRik(rik)"
                    :class="{ 'active': selectedRik?.id === rik.id }"
                >
                    <div class="d-flex align-items-center">
                        <FontAwesomeIcon icon="fa-users" v-if="rik.id === null" />
                        <div class="rik-option-name">
                            <span v-if="rik.id !== null">
                                <strong>{{ rik.id }}</strong> - {{ rik.nombre }}
                            </span>
                            <span v-else class="ms-3">{{ rik.nombre }}</span>
                        </div>
                        <div class="rik-option-status ms-3">
                            <FontAwesomeIcon icon="fa-check" v-if="selectedRik?.id === rik.id" />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref } from 'vue'
import { CatalogoService } from '@/shared/services/catalogos-service'
import { useAppStore } from '@/core/store/appStore'

interface customRiks {
    id: number | null
    nombre: string
}

const appStore = useAppStore()
const riks = ref<customRiks[]>([])
const selectedRik = ref<customRiks>()
const searchTerm = ref<string>('')

const selectedRikName = computed(() =>
    selectedRik.value?.id ? `${selectedRik.value?.id} - ${selectedRik.value?.nombre}` : selectedRik.value?.nombre
)

const filteredRiks = computed<customRiks[]>(() => {
    if (!searchTerm.value) return riks.value
    return riks.value
    .filter(rik => rik.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

const selectRik = (rik: customRiks) => {
    selectedRik.value = rik
    searchTerm.value = ''
    appStore.selectedRik = rik?.id ?? null
}

onMounted(async () => {
    const riksResponse = await CatalogoService.getRiks()
    riks.value.push(...riksResponse)
    riks.value.unshift({
        id: null,
        nombre: 'Todos los ejecutivos'
    })
    selectedRik.value = riks.value[0]
})
</script>

<style scoped lang="scss">

</style>