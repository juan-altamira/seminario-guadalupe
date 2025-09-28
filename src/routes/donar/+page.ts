import type { PageLoad } from './$types';
import { donacionConfig } from '$content/data/donaciones';

export const prerender = false;
export const ssr = true;

export const load: PageLoad = async ({ url }) => {
  const status = (url.searchParams.get('status') ?? 'idle') as 'idle' | 'ok' | 'cancel' | 'error';
  return { config: donacionConfig, status };
};
