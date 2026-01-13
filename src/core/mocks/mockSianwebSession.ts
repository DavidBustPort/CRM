import type { SianwebSession } from '../types/sianwebSession'

export type UserRole = 'rik' | 'gte'
export const MOCK_SIANWEBSESSION: Record<UserRole, SianwebSession> = {
    rik: {
        loggedIn: true,
        userId: 1140,
        userName: 'Lyhbett Hernandez',
        role: 'rik',
        cd: 110
    },
    gte: {
        loggedIn: true,
        userId: 1202,
        userName: 'Lydia Arriaga',
        role: 'gte',
        cd: 110
    }
}

export const getMockSianwebSession = (role: UserRole): SianwebSession => {
    return MOCK_SIANWEBSESSION[role]
}