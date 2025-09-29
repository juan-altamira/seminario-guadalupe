<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { trackEvent } from '$lib/analytics';

  const dispatch = createEventDispatcher();

  let name = '';
  let email = '';
  let message = '';
  let honeypot = '';
  let sending = false;
  let status: 'idle' | 'ok' | 'error' = 'idle';

  const inputIds = {
    name: 'contacto-nombre',
    email: 'contacto-email',
    message: 'contacto-mensaje'
  } as const;

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (honeypot) return;
    sending = true;
    const form = new FormData();
    form.set('name', name);
    form.set('email', email);
    form.set('message', message);
    const res = await fetch('/api/contacto', { method: 'POST', body: form });
    status = res.ok ? 'ok' : 'error';
    sending = false;
    if (res.ok) {
      trackEvent('contacto_enviado');
      dispatch('submitted');
      name = '';
      email = '';
      message = '';
    }
  }
</script>

<form class="space-y-5" on:submit={submit}>
  <div class="hidden">
    <label>Dejar en blanco<input bind:value={honeypot} autocomplete="off" /></label>
  </div>
  <div>
    <label class="text-sm font-medium text-slate-700" for={inputIds.name}>Nombre completo</label>
    <input
      class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500"
      id={inputIds.name}
      name="name"
      required
      bind:value={name}
      autocomplete="name"
    />
  </div>
  <div>
    <label class="text-sm font-medium text-slate-700" for={inputIds.email}>Email</label>
    <input
      class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500"
      id={inputIds.email}
      name="email"
      type="email"
      required
      bind:value={email}
      autocomplete="email"
    />
  </div>
  <div>
    <label class="text-sm font-medium text-slate-700" for={inputIds.message}>Mensaje</label>
    <textarea
      class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500"
      id={inputIds.message}
      name="message"
      rows="5"
      required
      bind:value={message}
    ></textarea>
  </div>

  <button
    class="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
    type="submit"
    disabled={sending}
  >
    {#if sending}
      Enviando…
    {:else}
      Enviar mensaje
    {/if}
  </button>
  {#if status === 'ok'}
    <p aria-live="polite" class="text-sm text-emerald-600">Gracias, tu mensaje fue enviado.</p>
  {:else if status === 'error'}
    <p aria-live="assertive" class="text-sm text-rose-600">Ocurrió un error. Intentá nuevamente.</p>
  {/if}
</form>
