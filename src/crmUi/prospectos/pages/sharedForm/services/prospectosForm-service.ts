import { apiInstance } from '@/core/services'
import type { ApiWrapper } from '@/core/types/api/apiWrapper'
import type { ProspectosAddApiRequest, ProspectosEditApiRequest } from '../types/prospectosApiRequest'

export const ProspectosFormService = {
    addProspecto: async (req: ProspectosAddApiRequest): Promise<ApiWrapper<boolean>> => {
        try {
            const res = await apiInstance.post<ApiWrapper<boolean>>('/prospectos', req)
            return res.data
        } catch {
            return {
                succeeded: false,
                message: 'Error al agregar el prospecto',
                data: false
            } as ApiWrapper<boolean>
        }
    },

    editProspecto: async (req: ProspectosEditApiRequest): Promise<ApiWrapper<boolean>> => {
        try {
            const res = await apiInstance.put<ApiWrapper<boolean>>('/prospectos', req)
            return res.data
        } catch {
            return {
                succeeded: false,
                message: 'Error al actualizar el prospecto',
                data: false
            } as ApiWrapper<boolean>
        }
    }
}