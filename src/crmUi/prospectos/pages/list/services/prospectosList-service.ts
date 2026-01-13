import { apiInstance } from '@/core/services'
import type { ProspectosListApiRequest } from '../types/prospectosListApiRequest'
import type { ProspectosList } from '../types/prospectos'
import type { ApiWrapper } from '@/core/types/api/apiWrapper'

let abortController: AbortController | null = null

export const ProspectosListService = {
    getProspectosList: async (query: ProspectosListApiRequest): Promise<ProspectosList> => {
        const defaultResponse: ProspectosList = {
            prospectos: [],
            totalRows: 0
        }

        if (!query) return defaultResponse
        if (abortController) abortController.abort()
        
        abortController = new AbortController()
        const signal = abortController.signal

        try {
            let url = 'prospectos' +
                `?page=${query.page}` +
                `&itemsPerPage=${query.itemsPerPage}` +
                `&filterEstatus=${query.filterEstatus}` +
                `&isGte=${query.isGte}`

            if (query.filterFuente) url += `&filterFuente=${query.filterFuente}`
            if (query.filterRegistro === 0 || query.filterRegistro === 1) url += `&filterRegistro=${query.filterRegistro}`
            if (query.filterNombreProspecto) url += `&filterNombreProspecto=${query.filterNombreProspecto}`
            if (query.filterEtapaLead) url += `&filterEtapaLead=${query.filterEtapaLead}`
            if (query.filterRik) url += `&filterRik=${query.filterRik}`
            if (query.filterMes) url += `&filterMes=${query.filterMes}`
            if (query.filterAnio) url += `&filterAnio=${query.filterAnio}`
            if (query.filterEtapaOportunidad) url += `&filterEtapaOportunidad=${query.filterEtapaOportunidad}`
            
            const res = await apiInstance.get<ApiWrapper<ProspectosList>>(url, {
                signal
            })

            return res.data.succeeded ? res.data.data || defaultResponse : defaultResponse
        }
        catch { return defaultResponse }
        finally { abortController = null }
    },

    getProspectosListFromExcel: async (query: ProspectosListApiRequest): Promise<void> => {
        try {
            let url = `/prospectos/excel` +
            `?filterEstatus=${query.filterEstatus}` +
            `&isGte=${query.isGte}`

            if (query.filterFuente) url += `&filterFuente=${query.filterFuente}`
            if (query.filterRegistro === 0 || query.filterRegistro === 1) url += `&filterRegistro=${query.filterRegistro}`
            if (query.filterNombreProspecto) url += `&filterNombreProspecto=${query.filterNombreProspecto}`
            if (query.filterEtapaLead) url += `&filterEtapaLead=${query.filterEtapaLead}`
            if (query.filterRik) url += `&filterRik=${query.filterRik}`
            if (query.filterMes) url += `&filterMes=${query.filterMes}`
            if (query.filterAnio) url += `&filterAnio=${query.filterAnio}`
            if (query.filterEtapaOportunidad) url += `&filterEtapaOportunidad=${query.filterEtapaOportunidad}`

            const response = await apiInstance.get(url, {
                responseType: 'blob'
            })

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            
            const downloadUrl = window.URL.createObjectURL(blob)
            
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = `prospectos_${new Date().toISOString().split('T')[0]}.xlsx`
            
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            window.URL.revokeObjectURL(downloadUrl)
        } catch { /*no action or error */}
    }
}

