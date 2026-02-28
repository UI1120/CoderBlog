/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_MEDIA_BASE_URL: string
    readonly VITE_FRONT_ROOT_PATH: string
    readonly VITE_ENABLE_MOCK: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}