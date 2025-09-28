// See https://kit.svelte.dev/docs/types#app
declare global {
  namespace App {
    interface Locals {
      consentLog: (entry: { email: string; consent: boolean; timestamp: string; ip?: string }) => Promise<void>;
    }
    interface PageData {
      site?: import('$content/models').SiteSettings;
    }
  }
}

declare module '$env/static/private' {
  export const SANITY_PROJECT_ID: string;
  export const SANITY_DATASET: string;
  export const SANITY_API_VERSION: string;
  export const SANITY_TOKEN: string;
  export const SANITY_USE_CDN: string;
}

declare module '$env/static/public' {
  export const PUBLIC_SANITY_PROJECT_ID: string;
  export const PUBLIC_SANITY_DATASET: string;
  export const PUBLIC_SANITY_USE_CDN: string;
}

export {};
