import type { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/authStore'

export default async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const authStore = useAuthStore()
    
    if (authStore.apiToken && config.url !== import.meta.env.VITE_AUTH_ENDPOINT) {
        config.headers.Authorization = `Bearer ${authStore.apiToken}`
    }
    return config
}