// See https://kit.svelte.dev/docs/types#app
declare global {
  namespace App {
    interface Locals {
      consentLog: (entry: { email: string; consent: boolean; timestamp: string; ip?: string }) => Promise<void>;
    }
    interface PageData {
      site?: import('$content/site').SiteSettings;
    }
  }
}

export {};
