import type { RequestHandler } from '@sveltejs/kit';
import { getSiteContent } from '$content/site';

const baseUrl = 'https://seminarioguadalupe.org';

export const GET: RequestHandler = () => {
  const { eventos, recursos } = getSiteContent();

  const staticRoutes = [
    '/',
    '/institucion',
    '/equipo',
    '/programas',
    '/eventos',
    '/recursos',
    '/donar',
    '/contacto',
    '/legales/privacidad',
    '/legales/cookies',
    '/legales/aviso'
  ];

  const urls = [
    ...staticRoutes.map((path) => ({ loc: `${baseUrl}${path}`, lastmod: new Date().toISOString() })),
    ...eventos.map((evento) => ({ loc: `${baseUrl}/eventos/${evento.slug}`, lastmod: evento.fechaInicio })),
    ...recursos.map((recurso) => ({ loc: `${baseUrl}/recursos/${recurso.slug}`, lastmod: recurso.fechaPublicacion }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => `<url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod></url>`)
    .join('')}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
};
