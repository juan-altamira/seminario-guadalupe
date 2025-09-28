import type { PageLoad } from './$types';
import { findPage } from '$content/site';

export const prerender = true;

export const load: PageLoad = async () => {
  const page = findPage('institucion');
  return { page };
};
