import type { PageLoad } from './$types';
import { programas } from '$content/data/programas';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const programa = programas.find((item) => item.slug === params.slug);
  if (!programa) {
    return { status: 404 };
  }

  const relacionados = programas.filter((item) => item.slug !== params.slug).slice(0, 3);

  return { programa, relacionados };
};
