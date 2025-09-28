import type { LayoutServerLoad } from './$types';
import { fetchSiteSettings } from '$lib/sanity/content.server';

export const prerender = false;
export const ssr = true;

export const load: LayoutServerLoad = async () => {
  const site = await fetchSiteSettings();
  return { site };
};
