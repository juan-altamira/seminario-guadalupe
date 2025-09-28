import type { PageServerLoad } from './$types';
import { fetchPageBySlug, fetchPeople } from '$lib/sanity/content.server';

export const prerender = false;

export const load: PageServerLoad = async () => {
  const [personas, page] = await Promise.all([fetchPeople(), fetchPageBySlug('equipo')]);
  return { personas, page };
};
