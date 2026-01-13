import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { ProspectosListService } from '../services/prospectosList-service'
import type { ProspectosListApiRequest } from '../types/prospectosListApiRequest'
import { useProspectosListStore } from './prospectosListStore'
import debounce from 'lodash/debounce'

interface ProspectosListActions {
    getProspectosList(): Promise<void>
    getProspectosListDebounce(): void
    buildProspectosListApiRequest(): ProspectosListApiRequest
    setItemsPerPage(itemsPerPage: number): void
    clearFilters(): void
}

const debouncedFetch = debounce(async (store) => {
    await store.getProspectosList()
}, 400)

export const actions: ProspectosListActions = {
    async getProspectosList(): Promise<void> {
        const store = useProspectosListStore()
        
        store.isApiBusy = true
        const data = await ProspectosListService.getProspectosList(store.buildProspectosListApiRequest())
        if (data) {
            store.prospectos = data
            store.pagination.totalRows = data.totalRows
            store.isApiBusy = false
        }
    },

    getProspectosListDebounce() {
        const store = useProspectosListStore()
        debouncedFetch(store)
    },

    buildProspectosListApiRequest(): ProspectosListApiRequest {
        const store = useProspectosListStore()
        const authSianwebStore = useAuthSianwebStore()
        return {
            filterMes: store.prospectosFilters.date ? store.prospectosFilters.date.month + 1 : null,
            filterAnio: store.prospectosFilters.date ? store.prospectosFilters.date.year : null,
            filterFuente: store.prospectosFilters.tipoProspecto ? store.prospectosFilters.tipoProspecto : null,
            filterRegistro: store.prospectosFilters.registro === -1 ? null : store.prospectosFilters.registro,
            filterNombreProspecto: store.prospectosFilters.nombreProspecto,
            filterEtapaLead: store.prospectosFilters.etapaLead ? store.prospectosFilters.etapaLead: null,
            filterRik: store.prospectosFilters.rik,
            filterEstatus: store.prospectosFilters.estatus,
            page: store.pagination.currentPage,
            itemsPerPage: store.pagination.itemsPerPage,
            isGte: authSianwebStore.isGte,
            filterEtapaOportunidad: store.prospectosFilters.etapa === -1 ? null : store.prospectosFilters.etapa
        }
    },

    setItemsPerPage(itemsPerPage: number): void {
        const store = useProspectosListStore()
        store.pagination.itemsPerPage = itemsPerPage
        store.pagination.currentPage = 1
        debouncedFetch(store)
    },

    clearFilters(): void {
        const store = useProspectosListStore()
        store.prospectosFilters.date = null
        store.prospectosFilters.tipoProspecto = null
        store.prospectosFilters.etapa = -1
        store.prospectosFilters.rik = null
        store.prospectosFilters.etapaLead = null
        store.prospectosFilters.registro = -1
        store.prospectosFilters.nombreProspecto = ''
        store.prospectosFilters.estatus = -1

        debouncedFetch(store)
    }
}