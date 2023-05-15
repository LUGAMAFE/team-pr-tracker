/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_REST_API: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
