import type { ApiWrapper } from '@/core/types/api/apiWrapper'
import type { Rik, Segmento, Territorio, TipoCliente, Uen } from '../types/catalogos'
import { apiInstance } from '@/core/services'

export const CatalogoService = {
    getRiks: async(): Promise<Rik[]> => {
        try {
            const response = await apiInstance.get<ApiWrapper<Rik[]>>('/catalogos/riks')
            return response.data.succeeded ? response.data.data || [] : []
        } catch { return [] }
    },

    getUens: async(): Promise<Uen[]> => {
        try {
            const response = await apiInstance.get<ApiWrapper<Uen[]>>('/catalogos/uens')
            return response.data.succeeded ? response.data.data || [] : []
        } catch { return [] }
    },

    getSegmentos: async(idUen: number): Promise<Segmento[]> => {
        try {
            const response = await apiInstance.get<ApiWrapper<Segmento[]>>(`/catalogos/segmentos/${idUen}`)
            return response.data.succeeded ? response.data.data || [] : []
        } catch { return [] }
    },

    getTipoClientes: async(): Promise<TipoCliente[]> => {
        try {
            const response = await apiInstance.get<ApiWrapper<TipoCliente[]>>('/catalogos/tipos-cliente')
            return response.data.succeeded ? response.data.data || [] : []
        } catch { return [] }
    },

    getTerritorios: async(): Promise<Territorio[]> => {
        try {
            const response = await apiInstance.get<ApiWrapper<Territorio[]>>('/catalogos/territorios')
            return response.data.succeeded ? response.data.data || [] : []
        } catch { return [] }
    }
}