import { defineStore } from 'pinia'
import type { SianwebSession } from '../types/sianwebSession'

interface SianwebLoginData {
    loggedIn: boolean
	userId: number | null
	userName: string | null
	idSucursal: number | null
	role?: 'rik' | 'gte'
}

export const useAuthSianwebStore = defineStore('authSianweb', {
    state: (): SianwebLoginData => ({
        loggedIn: false,
        userId: null,
        userName: null,
        idSucursal: null,
        role: 'rik'
    }),
    getters: {
        isLoggedIn: (state) => state.loggedIn,
        isRik: (state) => state.role === 'rik',
        isGte: (state) => state.role === 'gte'
    },
    actions: {
        setSianwebLoginData(data: SianwebSession) {
            this.loggedIn = data.loggedIn
            this.userId = data.userId
            this.userName = data.userName
            this.idSucursal = data.cd
            this.role = data.role ?? 'rik'
        }
    },
    persist: true
})