export interface ApiTokenRequest {
    userId: number
    idCd: number
}
export interface ApiTokenResponse {
    token: string
    refreshToken: string
}