import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { SianwebService } from '../services'
import { useAuthStore } from '../store/authStore'
import axios from 'axios'

let isRefreshing: boolean = false
let refreshSubscribers: Array<(token: string) => void> = []

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach(callback => callback(token))
    refreshSubscribers = []
}

export default async (config: AxiosError) => {
    const authStore = useAuthStore()
    const originalRequest: InternalAxiosRequestConfig<AxiosError> = config.config as InternalAxiosRequestConfig<AxiosError>

    if (config.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true

        if (!isRefreshing) {
            isRefreshing = true
            try {
                //verificamos sesion sianweb
                const sesionSianweb = await SianwebService.verifySianwebSession()
                if (sesionSianweb.loggedIn) {
                    //refresh api token
                    const isRefreshTokenValid = await authStore.refreshToken()
                    if (isRefreshTokenValid) {
                        onRefreshed(authStore.apiToken)
                        isRefreshing = false

                        originalRequest.headers.Authorization = `Bearer ${authStore.apiToken}`
                        return await axios(originalRequest)
                    }
                }

                isRefreshing = false
                authStore.logout()
                return Promise.reject(config)

            } catch (error) {
                isRefreshing = false
                authStore.logout()
                return Promise.reject(error)
            }
        } else {
            return new Promise(resolve => {
                refreshSubscribers.push((token: string) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    resolve(axios(originalRequest))
                })
            })
        }
    }
    return Promise.reject(config)
}