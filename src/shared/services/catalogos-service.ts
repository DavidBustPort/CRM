import type { ApiWrapper } from '@/core/types/api/apiWrapper'
import type { Rik } from '../types/catalogos'
import { apiInstance } from '@/core/services'

export const catalogoService = {
    getRiks: async(): Promise<Rik[]> => {
        try {
            const response = await apiInstance.get<ApiWrapper<Rik[]>>('/catalogos/riks')
            return response.data.succeeded ? response.data.data || [] : []
        } catch { return [] }
    }
}