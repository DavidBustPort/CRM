import type { ApiTokenRequest, ApiTokenResponse } from '@/core/types/api/apiToken'
import type { ApiWrapper } from '@/core/types/api/apiWrapper'
import { apiInstance } from '.'

export const authService = {
    getToken: async (query: ApiTokenRequest): Promise<ApiWrapper<ApiTokenResponse>> => {
        try {
            const response = await apiInstance.post(import.meta.env.VITE_AUTH_ENDPOINT, query)
            return response.data
        } catch (error) {
            return {
                data: null,
                message: error as string,
                succeeded: false
            } as ApiWrapper<ApiTokenResponse>
        }
    },

    refreshToken: async (refreshToken: string): Promise<ApiWrapper<ApiTokenResponse>> => {
        try {
            const response = await apiInstance.post(import.meta.env.VITE_AUTH_REFRESH_ENDPOINT, { refreshToken })
            return response.data
        } catch (error) {
            return {
                data: null,
                message: error as string,
                succeeded: false
            } as ApiWrapper<ApiTokenResponse>        
        }
    }
}