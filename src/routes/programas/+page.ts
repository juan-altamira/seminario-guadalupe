import type { PageLoad } from './$types';
import { programas } from '$content/data/programas';
import { findPage } from '$content/site';

export const prerender = true;

export const load: PageLoad = async () => {
  const page = findPage('programas');
  return { programas, page };
};
