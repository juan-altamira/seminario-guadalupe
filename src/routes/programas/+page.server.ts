import type { PageServerLoad } from './$types';
import { fetchPageBySlug, fetchPrograms } from '$lib/sanity/content.server';

export const prerender = false;

export const load: PageServerLoad = async () => {
  const [programas, page] = await Promise.all([fetchPrograms(), fetchPageBySlug('programas')]);
  return { programas, page };
};
