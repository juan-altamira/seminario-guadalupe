import type { PageLoad } from './$types';
import { findEvento } from '$content/site';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const evento = findEvento(params.slug);
  if (!evento) {
    return { status: 404 };
  }
  return { evento };
};
