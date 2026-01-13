import type { Pagination } from '@/shared/components/pagination/types'
import type { ProspectosList } from '../types/prospectos'
import type { ProspectosListFilters } from '../types/prospectosListFilters'

export interface ProspectosListState {
    prospectos: ProspectosList
    isApiBusy: boolean
    prospectosFilters: ProspectosListFilters
    pagination: Pagination
}

export const state = (): ProspectosListState => ({
    prospectos: {
        prospectos: [],
        totalRows: 0
    },
    isApiBusy: false,
    prospectosFilters: {
        date: null,
        showGteDetails: false,
        tipoProspecto: null,
        etapa: -1,
        rik: null,
        etapaLead: null,
        registro: -1,
        nombreProspecto: '',
        estatus: -1
    },
    pagination: {
        currentPage: 1,
        totalRows: 0,
        itemsPerPage: 10,
        title: 'Prospectos',
        showTitle: true,
        arrayItemsPerPage: [10, 25, 50]
    }
})