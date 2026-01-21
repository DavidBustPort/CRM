import { apiInstance } from '@/core/services'
import type { ApiWrapper } from '@/core/types/api/apiWrapper'
import type { SuggestedLeads } from '../types/suggestedLeads'
import type { Leads } from '../types/leads'

let abortController: AbortController | null = null

export const LeadsService = {
    getSuggestionsLeads: async (
        page: number,
        itemsPerPage: number,
        filter: string | null
    ): Promise<SuggestedLeads> => {
        const defaultResponse: SuggestedLeads = {
            leads: [],
            totalRows: 0
        }

        if (abortController) abortController.abort()
        
        abortController = new AbortController()
        const signal = abortController.signal
        try {
            let url = 'leads/suggestions' +
                `?page=${page}` +
                `&itemsPerPage=${itemsPerPage}`

            if (filter) url += `&filter=${filter}`
            
            const res = await apiInstance.get<ApiWrapper<SuggestedLeads>>(url, {
                signal
            })

            return res.data.succeeded ? res.data.data || defaultResponse : defaultResponse
        }
        catch { return defaultResponse }
        finally { abortController = null }
    },

    getLeads: async (
        page: number,
        itemsPerPage: number,
        isGte: boolean,
        filter: string | null
    ): Promise<Leads> => {
        const defaultResponse: Leads = {
            leads: [],
            totalRows: 0
        }

        if (abortController) abortController.abort()
        
        abortController = new AbortController()
        const signal = abortController.signal
        try {
            let url = 'leads' +
                `?page=${page}` +
                `&itemsPerPage=${itemsPerPage}` +
                `&isGte=${isGte}`

            if (filter) url += `&filter=${filter}`
            
            const res = await apiInstance.get<ApiWrapper<Leads>>(url, {
                signal
            })

            return res.data.succeeded ? res.data.data || defaultResponse : defaultResponse
        }
        catch { return defaultResponse }
        finally { abortController = null }
    },

    rejectLead: async (id: number, reason: number, motive: string): Promise<boolean> => {
        try {
            const res = await apiInstance.post<ApiWrapper<boolean>>('leads/rechazar', {
                idLead: id,
                tipoRechazo: reason,
                motivoRechazo: motive
            })

            return res.data.succeeded
        } catch { return false }
    },

    assingRik: async (idLead: number, idRik: number): Promise<boolean> => {
        try {
            const res = await apiInstance.post<ApiWrapper<boolean>>('leads/asignar-representante', {
                idLead,
                idRik
            })

            return res.data.succeeded
        } catch { return false }
    },

    updateSucursal: async (idLead: number, idSucursal: number): Promise<boolean> => {
        try {
            const res = await apiInstance.put<ApiWrapper<boolean>>('leads/actualizar-sucursal', {
                idLead,
                IdCd: idSucursal
            })

            return res.data.succeeded
        } catch { return false }
    }
}