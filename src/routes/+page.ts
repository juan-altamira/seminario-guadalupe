import type { PageLoad } from './$types';
import { getSiteContent } from '$content/site';

export const prerender = true;

export const load: PageLoad = async () => {
  const { eventos, recursos } = getSiteContent();
  const proximo = eventos
    .filter((evento) => evento.estado === 'proximo')
    .toSorted((a, b) => a.fechaInicio.localeCompare(b.fechaInicio))[0];

  const recientes = recursos
    .toSorted((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion))
    .slice(0, 3);

  return { proximo, recientes };
};
