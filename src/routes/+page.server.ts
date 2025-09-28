import type { PageServerLoad } from './$types';
import { fetchEvents, fetchResources } from '$lib/sanity/content.server';

export const prerender = false;

export const load: PageServerLoad = async () => {
  const [eventos, recursos] = await Promise.all([fetchEvents(), fetchResources()]);
  const proximo = eventos
    .filter((evento) => evento.estado === 'proximo')
    .toSorted((a, b) => a.fechaInicio.localeCompare(b.fechaInicio))[0];

  const recientes = recursos
    .toSorted((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion))
    .slice(0, 3);

  return { proximo, recientes };
};
