import { createClient, type ClientConfig } from '@sanity/client';
import {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION,
  SANITY_TOKEN,
  SANITY_USE_CDN
} from '$env/static/private';

const projectId = SANITY_PROJECT_ID;
const dataset = SANITY_DATASET || 'production';
const apiVersion = SANITY_API_VERSION || '2024-01-01';

const useCdnEnv = (SANITY_USE_CDN ?? '').toLowerCase();
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

  if (SANITY_TOKEN) {
    config.token = SANITY_TOKEN;
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
