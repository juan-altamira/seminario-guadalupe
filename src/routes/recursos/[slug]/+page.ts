import type { PageLoad } from './$types';
import { findRecurso } from '$content/site';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const recurso = findRecurso(params.slug);
  if (!recurso) {
    return { status: 404 };
  }
  return { recurso };
};
