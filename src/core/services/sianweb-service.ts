import axios from 'axios'
import type { SianwebSession } from '../types/sianwebSession'

export const sianwebService = {
    verifySianwebSession: async (): Promise<SianwebSession> => {
        const baseURL = import.meta.env.BASE_URL || '/'
        const response = await axios.get<SianwebSession>(`${baseURL}/authSianweb.ashx`)
        
        return response.data
    }
}