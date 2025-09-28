import { siteSettings } from '$content/data/site';
import { paginas } from '$content/data/paginas';
import { personas } from '$content/data/personas';
import { programas } from '$content/data/programas';
import { eventos } from '$content/data/eventos';
import { recursos } from '$content/data/recursos';
import type { Evento, PageContent, Persona, Programa, Recurso, SiteSettings } from '$content/models';

export type SiteContent = {
  site: SiteSettings;
  paginas: PageContent[];
  personas: Persona[];
  programas: Programa[];
  eventos: Evento[];
  recursos: Recurso[];
};

export function getSiteContent(): SiteContent {
  return {
    site: siteSettings,
    paginas,
    personas,
    programas,
    eventos,
    recursos
  };
}

export function findPage(slug: string) {
  return paginas.find((page) => page.slug === slug);
}

export function findEvento(slug: string) {
  return eventos.find((evento) => evento.slug === slug);
}

export function findRecurso(slug: string) {
  return recursos.find((recurso) => recurso.slug === slug);
}

export { siteSettings };
