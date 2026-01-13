/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_MOCK_USER: string
    readonly VITE_AUTH_ENDPOINT: string
    readonly VITE_AUTH_REFRESH_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}