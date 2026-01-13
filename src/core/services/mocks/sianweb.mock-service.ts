import { getMockSianwebSession, type UserRole } from '@/core/mocks/mockSianwebSession'
import type { SianwebSession } from '@/core/types/sianwebSession'

export const sianwebMockService = {
    verifySianwebSession: async (): Promise<SianwebSession> => {
        const mockUserId = import.meta.env.VITE_MOCK_USER || 'rik'
        
        return getMockSianwebSession(mockUserId as UserRole)
    }
}