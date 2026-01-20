import { apiInstance } from '@/core/services'
import type { ApiWrapper } from '@/core/types/api/apiWrapper'
import type { Prospecto } from '../types/prospecto'

export const ProspectosService = {
    getProspectoById: async (id: number): Promise<ApiWrapper<Prospecto>> => {
        try {
            const response = await apiInstance.get<ApiWrapper<Prospecto>>(`prospectos/${id}`)
            return response.data
        } catch {
            return {
                succeeded: false,
                message: 'Error desconocido',
                data: null
            } as ApiWrapper<Prospecto>
        }
    }
}