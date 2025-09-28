import type { RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  consent: z.enum(['true', 'false'])
});

const cooldown = new Map<string, number>();
const WINDOW_MS = 30_000;

export const POST: RequestHandler = async ({ request, getClientAddress, locals }) => {
  const form = Object.fromEntries(await request.formData());
  const parsed = schema.safeParse(form);
  if (!parsed.success || parsed.data.consent !== 'true') {
    return new Response('Datos inválidos', { status: 400 });
  }

  const now = Date.now();
  const key = parsed.data.email.toLowerCase();
  const last = cooldown.get(key);
  if (last && now - last < WINDOW_MS) {
    return new Response('Duplicado reciente', { status: 429 });
  }
  cooldown.set(key, now);

  const ip = getClientAddress?.();
  await locals.consentLog?.({
    email: parsed.data.email,
    consent: true,
    timestamp: new Date(now).toISOString(),
    ip
  });

  console.log('CONTACTO_SUBMIT', { ...parsed.data, ts: new Date(now).toISOString(), ip });

  return new Response('ok');
};
