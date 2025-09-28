import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.consentLog = async (entry) => {
    console.log('AUDIT_CONSENT', entry);
  };
  return resolve(event);
};
