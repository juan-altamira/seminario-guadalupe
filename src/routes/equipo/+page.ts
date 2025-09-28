import type { PageLoad } from './$types';
import { personas } from '$content/data/personas';
import { findPage } from '$content/site';

export const prerender = true;

export const load: PageLoad = async () => {
  const page = findPage('equipo');
  return { personas, page };
};
