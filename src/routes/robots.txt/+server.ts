import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
  const body = `User-agent: *\nAllow: /\nSitemap: https://seminarioguadalupe.org/sitemap.xml`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=3600'
    }
  });
};
