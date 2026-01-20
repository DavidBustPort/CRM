import type { Pagination } from '@/shared/components/pagination/types'
import type { ProspectoForm } from '../types/prospectosForm'
import type { SuggestedLeads, SuggestedLeadsData } from '@/crmUi/leads/types/suggestedLeads'

export interface ProspectosFormState {
    formData: ProspectoForm
    mode: 'create' | 'edit',
    fromLeads: {
        pagination: Pagination,
        suggestions: SuggestedLeads,
        selectedLead: SuggestedLeadsData | null
        searchFilter: string | null
    }
}

export const state = (): ProspectosFormState => ({
    formData: {
        razonSocial: '',
        contacto: '',
        correo: '',
        telefono: '',
        uenId: null,
        segmentoId: null,
        tipoClienteId: null,
        vpo: 0,
        territorioId: null,
        observaciones: ''
    },
    mode: 'create',
    fromLeads: {
        pagination: {
            currentPage: 1,
            totalRows: 0,
            itemsPerPage: 10
        },
        suggestions: {
            leads: [],
            totalRows: 0
        },
        selectedLead: null,
        searchFilter: null
    }
})