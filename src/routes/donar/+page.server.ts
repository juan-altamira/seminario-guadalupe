import type { PageServerLoad } from './$types';
import { fetchDonationConfig } from '$lib/sanity/content.server';

export const prerender = false;
export const ssr = true;

export const load: PageServerLoad = async ({ url }) => {
  const status = (url.searchParams.get('status') ?? 'idle') as 'idle' | 'ok' | 'cancel' | 'error';
  const config = await fetchDonationConfig();
  return { config, status };
};
