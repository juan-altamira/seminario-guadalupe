import type { PageServerLoad } from './$types';
import { fetchResourceBySlug } from '$lib/sanity/content.server';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
  const recurso = await fetchResourceBySlug(params.slug);
  if (!recurso) {
    throw error(404, 'Recurso no encontrado');
  }
  return { recurso };
};
