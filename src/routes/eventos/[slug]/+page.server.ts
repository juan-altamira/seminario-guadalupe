import type { PageServerLoad } from './$types';
import { fetchEventBySlug } from '$lib/sanity/content.server';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
  const evento = await fetchEventBySlug(params.slug);
  if (!evento) {
    throw error(404, 'Evento no encontrado');
  }
  return { evento };
};
