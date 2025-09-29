import { createClient, type ClientConfig } from '@sanity/client';
import { env } from '$env/dynamic/private';

const projectId = env.SANITY_PROJECT_ID ?? env.SANITY_STUDIO_PROJECT_ID ?? '';
const dataset = env.SANITY_DATASET ?? env.SANITY_STUDIO_DATASET ?? 'production';
const apiVersion = env.SANITY_API_VERSION ?? '2024-01-01';

const useCdnEnv = (env.SANITY_USE_CDN ?? '').toLowerCase();
const useCdn = useCdnEnv === 'true' || useCdnEnv === '1';

let clientInstance: ReturnType<typeof createClient> | null = null;

function createSanityClient() {
  if (!projectId || !dataset) {
    return null;
  }

  const config: ClientConfig = {
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published'
  };

  if (env.SANITY_TOKEN) {
    config.token = env.SANITY_TOKEN;
  }

  return createClient(config);
}

export function getSanityClient() {
  if (!clientInstance) {
    clientInstance = createSanityClient();
  }
  return clientInstance;
}

export function isSanityConfigured() {
  return Boolean(projectId && dataset && apiVersion);
}
