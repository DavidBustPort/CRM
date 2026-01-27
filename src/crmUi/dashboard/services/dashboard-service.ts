import { apiInstance } from '@/core/services'
import type { ApiWrapper } from '@/core/types/api/apiWrapper'
import type { Dashboard } from '../types/dashboard'

export const DashabordService = {
    getDashboard: async (
        isGte: boolean,
        filterMesInicio: number,
        filterAnioInicio: number,
        filterMesFin: number,
        filterAnioFin: number
    ): Promise<ApiWrapper<Dashboard>> => {
        try {
            const url = `/dashboard?isGte=${isGte}` +
                `&mesInicio=${filterMesInicio}` +
                `&anioInicio=${filterAnioInicio}` +
                `&mesFin=${filterMesFin}` +
                `&anioFin=${filterAnioFin}`

            const res = await apiInstance.get<ApiWrapper<Dashboard>>(url)
            return res.data
        } catch {
            return {
                succeeded: false,
                message: 'Error desconocido',
                data: null
            } as ApiWrapper<Dashboard>
        }
    }
}