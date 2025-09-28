import type { PageLoad } from './$types';
import { recursos } from '$content/data/recursos';

const PAGE_SIZE = 9;

export const prerender = false;

export const load: PageLoad = async ({ url }) => {
  const tipo = url.searchParams.get('tipo') as 'pdf' | 'articulo' | null;
  const page = Number(url.searchParams.get('page') ?? '1');

  const ordenados = recursos.toSorted((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion));
  const filtrados = tipo ? ordenados.filter((r) => r.tipo === tipo) : ordenados;
  const start = (page - 1) * PAGE_SIZE;
  const paginados = filtrados.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));

  return { recursos: paginados, tipo, page, totalPages, total: filtrados.length };
};
