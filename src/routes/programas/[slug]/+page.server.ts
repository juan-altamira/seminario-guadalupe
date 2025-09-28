import type { PageServerLoad } from './$types';
import { fetchProgramBySlug, fetchPrograms } from '$lib/sanity/content.server';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
  const [programa, programas] = await Promise.all([
    fetchProgramBySlug(params.slug),
    fetchPrograms()
  ]);
  if (!programa) {
    throw error(404, 'Programa no encontrado');
  }

  const relacionados = programas.filter((item) => item.slug !== params.slug).slice(0, 3);

  return { programa, relacionados };
};
