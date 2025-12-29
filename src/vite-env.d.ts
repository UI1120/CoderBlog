/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FRONT_ROOT_PATH: string;
    readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}