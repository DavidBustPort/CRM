import { apiInstance } from '../services'
import type { AxiosInstance } from 'axios'
import authRequestInterceptor from './authRequestInterceptor'
import authResponseInterceptor from './authResponseInterceptor'

export const setupInterceptors = (): AxiosInstance => {
    apiInstance.interceptors.request.use(authRequestInterceptor)
    apiInstance.interceptors.response.use((response) => response, authResponseInterceptor)
    
    return apiInstance
}