<script lang="ts">
  import ContactForm from '$components/forms/ContactForm.svelte';
  let submitted = false;
</script>

<section class="mx-auto max-w-3xl space-y-8 px-4 py-16">
  <header class="space-y-3 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Contacto</p>
    <h1 class="text-3xl font-semibold text-slate-900">Escribinos</h1>
    <p class="text-sm text-slate-600">Respondemos dentro de las próximas 48 horas hábiles.</p>
    <div class="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
      <div>
        <div class="font-semibold text-slate-900">Teléfono</div>
        <a href="tel:+543424593929">(0342) 459-3929</a>
      </div>
      <div>
        <div class="font-semibold text-slate-900">WhatsApp</div>
        <a href="https://wa.me/543426132313" target="_blank" rel="noopener">342 613-2313</a>
      </div>
      <div>
        <div class="font-semibold text-slate-900">Redes</div>
        <a href="https://instagram.com/seminarioguadalupe" target="_blank" rel="noopener">Instagram</a>
        <span class="mx-2 text-slate-400">·</span>
        <a href="https://www.facebook.com/seminarioguadalupe" target="_blank" rel="noopener">Facebook</a>
      </div>
    </div>
  </header>

  {#if submitted}
    <div class="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-700">
      ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
    </div>
  {/if}

  <ContactForm on:submitted={() => (submitted = true)} />
</section>
