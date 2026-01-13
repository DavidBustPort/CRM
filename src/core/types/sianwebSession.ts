export interface SianwebSession {
    loggedIn: boolean
    userId: number
    userName: string
    role: 'rik' | 'gte' | null
    cd: number
    description?: string
}