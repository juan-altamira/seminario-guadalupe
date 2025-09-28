import type { LayoutLoad } from './$types';
import { siteSettings } from '$content/data/site';

export const prerender = true;
export const ssr = true;

export const load: LayoutLoad = async () => {
  return { site: siteSettings };
};
