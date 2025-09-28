<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { trackEvent } from '$lib/analytics';

  const dispatch = createEventDispatcher();

  let name = '';
  let email = '';
  let message = '';
  let consent = false;
  let honeypot = '';
  let sending = false;
  let status: 'idle' | 'ok' | 'error' = 'idle';

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (honeypot) return;
    sending = true;
    const form = new FormData();
    form.set('name', name);
    form.set('email', email);
    form.set('message', message);
    form.set('consent', String(consent));
    const res = await fetch('/api/contacto', { method: 'POST', body: form });
    status = res.ok ? 'ok' : 'error';
    sending = false;
    if (res.ok) {
      trackEvent('contacto_enviado');
      dispatch('submitted');
      name = '';
      email = '';
      message = '';
      consent = false;
    }
  }
</script>

<form class="space-y-5" on:submit={submit}>
  <div class="hidden">
    <label>Dejar en blanco<input bind:value={honeypot} autocomplete="off" /></label>
  </div>
  <div>
    <label class="text-sm font-medium text-slate-700">Nombre completo</label>
    <input
      class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500"
      name="name"
      required
      bind:value={name}
      autocomplete="name"
    />
  </div>
  <div>
    <label class="text-sm font-medium text-slate-700">Email</label>
    <input
      class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500"
      name="email"
      type="email"
      required
      bind:value={email}
      autocomplete="email"
    />
  </div>
  <div>
    <label class="text-sm font-medium text-slate-700">Mensaje</label>
    <textarea
      class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500"
      name="message"
      rows="5"
      required
      bind:value={message}
    ></textarea>
  </div>
  <label class="flex items-start gap-3 text-sm text-slate-600">
    <input type="checkbox" required bind:checked={consent} class="mt-1 rounded border-slate-300 text-brand-600" />
    <span>Acepto el tratamiento de mis datos para recibir respuesta del Seminario.</span>
  </label>
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
