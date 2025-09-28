import type { RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
  amount: z.coerce.number().min(1),
  method: z.enum(['online', 'transferencia', 'app'])
});

export const POST: RequestHandler = async ({ request, url }) => {
  const form = Object.fromEntries(await request.formData());
  const parsed = schema.safeParse(form);
  if (!parsed.success) {
    return new Response('Invalid donation', { status: 400 });
  }

  if (parsed.data.method !== 'online') {
    // Non-online methods se completan en el sitio
    return new Response('ok');
  }

  const redirectUrl = new URL('/donar?status=ok', url.origin);
  redirectUrl.searchParams.set('monto', parsed.data.amount.toString());
  return Response.redirect(redirectUrl, 303);
};
