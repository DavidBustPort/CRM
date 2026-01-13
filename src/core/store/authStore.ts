import { defineStore } from 'pinia'
import type { ApiTokenRequest } from '../types/api/apiToken'
import { AuthService } from '@/core/services'

interface AuthState {
	apiToken: string
	apiRefreshToken: string
    errorMessage?: string
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        apiToken: '',
        apiRefreshToken: '',
    }),
    getters: {
        isLoggedIn: (state) => state.apiToken !== '' && state.apiRefreshToken !== ''
    },
    actions: {
        async getApiToken(query: ApiTokenRequest): Promise<void> {
            const response = await AuthService.getToken(query)
            if (response.succeeded) {
                this.apiToken = response.data?.token ?? ''
                this.apiRefreshToken = response.data?.refreshToken ?? ''
            }
            else this.errorMessage = response.message ?? ''
        },
        
        async refreshToken(): Promise<boolean> {
            const response = await AuthService.refreshToken(this.apiRefreshToken)
            if (response.succeeded) {
                this.apiToken = response.data?.token ?? ''
                this.apiRefreshToken = response.data?.refreshToken ?? ''
                return true
            }
            return false
        },

        logout(): void {
            this.$reset()
            if (import.meta.env.MODE === 'production') window.location.href = '../Inicio.aspx'
        }
    },
    persist: true
})