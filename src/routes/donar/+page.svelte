<script lang="ts">
  import DonationWidget from '$components/donations/DonationWidget.svelte';
  import type { DonacionConfig } from '$content/models';

  export let data: { config: DonacionConfig; status: 'idle' | 'ok' | 'cancel' | 'error' };

  async function startCheckout(event: CustomEvent<{ amount: number; method: string }>) {
    const form = new FormData();
    form.set('amount', String(event.detail.amount));
    form.set('method', event.detail.method);
    const res = await fetch('/api/donaciones/checkout', {
      method: 'POST',
      body: form
    });
    if (res.redirected) {
      window.location.href = res.url;
    }
  }
</script>

<section class="mx-auto max-w-4xl space-y-10 px-4 py-16">
  <header class="space-y-3 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">OVE · Obra para las Vocaciones Eclesiásticas</p>
    <h1 class="text-3xl font-semibold text-slate-900">Sumate a la misión</h1>
    <p class="text-sm text-slate-600">
      Tu oración y colaboración sostienen la formación de los futuros sacerdotes de Santa Fe y Rafaela.
    </p>
  </header>

  <DonationWidget config={data.config} status={data.status} on:checkout={startCheckout} />

  <div class="space-y-2 text-center text-xs text-slate-500">
    <p>Los pagos online se procesan con Stripe. Los datos se manejan de forma segura.</p>
    <p>
      ¿Preferís coordinar otro modo de ayuda? Escribinos a
      <a class="font-semibold text-brand-700" href="mailto:contacto@seminarioguadalupe.org">contacto@seminarioguadalupe.org</a>
      y te acompañamos.
    </p>
  </div>
</section>
