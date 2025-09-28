import type { PageServerLoad } from './$types';
import { fetchPageBySlug } from '$lib/sanity/content.server';

export const prerender = false;

export const load: PageServerLoad = async () => {
  const page = await fetchPageBySlug('institucion');
  return { page };
};
