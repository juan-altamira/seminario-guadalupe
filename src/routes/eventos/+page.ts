import type { PageLoad } from './$types';
import { eventos } from '$content/data/eventos';

export const prerender = false;

const PAGE_SIZE = 6;

export const load: PageLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') ?? '1');

  const proximos = eventos
    .filter((evento) => evento.estado === 'proximo')
    .toSorted((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));

  const pasados = eventos
    .filter((evento) => evento.estado === 'pasado')
    .toSorted((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));

  const start = (page - 1) * PAGE_SIZE;
  const paginados = pasados.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(pasados.length / PAGE_SIZE));

  return { proximos, pasados: paginados, page, totalPages };
};
