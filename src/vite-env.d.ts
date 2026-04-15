/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_URL?: string;
  readonly VITE_STRAPI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
