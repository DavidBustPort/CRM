import axios, { type AxiosInstance } from 'axios'

const apiInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

//sianweb
import { sianwebService } from './sianweb-service'
import { sianwebMockService } from './mocks/sianweb.mock-service'

const modeDev = import.meta.env.MODE === 'development'

export const SianwebService = modeDev
    ? sianwebMockService
    : sianwebService


import { authService } from './auth-service'
export const AuthService = authService

export { apiInstance }