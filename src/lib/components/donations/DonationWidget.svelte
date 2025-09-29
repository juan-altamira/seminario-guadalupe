<script lang="ts">
  import type { DonacionConfig, DonacionMetodo } from '$content/models';
  import { createEventDispatcher } from 'svelte';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';

  export let config: DonacionConfig;
  export let status: 'idle' | 'ok' | 'cancel' | 'error' = 'idle';

  const dispatch = createEventDispatcher();
  let method: DonacionMetodo = config.metodos[0]?.tipo ?? 'online';
  let amount = config.montosSugeridos[1] ?? config.montosSugeridos[0] ?? 20;

  function setMethod(value: DonacionMetodo) {
    method = value;
    dispatch('methodChange', { method });
  }

  function submitOnline() {
    dispatch('checkout', { amount, method });
  }
</script>

<div class="space-y-6">
  <SlideInPicture
    name="seminario-buen-pastor"
    alt="Seminario Buen Pastor"
    wrapperClass="overflow-hidden rounded-2xl"
    pictureClass="block h-full w-full"
    imgClass="h-full w-full object-cover"
    sizes="(max-width: 768px) 100vw, 480px"
  />

  <div role="group" aria-labelledby="donation-amount-label">
    <p id="donation-amount-label" class="text-sm font-medium text-slate-700">Seleccioná un monto</p>
    <div class="mt-3 flex flex-wrap gap-3">
      {#each config.montosSugeridos as sugerido}
        <button
          type="button"
          class={`rounded-full border px-4 py-2 text-sm font-semibold transition ${amount === sugerido ? 'border-brand-700 bg-brand-50 text-brand-700' : 'border-slate-300 hover:border-brand-400'}`}
          on:click={() => (amount = sugerido)}
        >
          $ {sugerido}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      <label class="text-xs text-slate-500" for="donation-custom">Monto personalizado</label>
      <input
        type="number"
        min="1"
        step="1"
        bind:value={amount}
        id="donation-custom"
        class="mt-1 w-40 rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500"
      />
    </div>
  </div>

  <div role="group" aria-labelledby="donation-method-label">
    <p id="donation-method-label" class="text-sm font-medium text-slate-700">Método de donación</p>
    <div class="mt-3 grid gap-3 md:grid-cols-3">
      {#each config.metodos as item}
        <button
          type="button"
          class={`rounded-2xl border p-4 text-left text-sm transition ${method === item.tipo ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-300'}`}
          on:click={() => setMethod(item.tipo)}
        >
          <span class="font-semibold text-slate-900 block">{item.descripcion}</span>
          {#if item.tipo === 'online'}
            <span class="mt-1 text-xs text-slate-600 block">Pago seguro con pasarela externa.</span>
          {:else}
            <span class="mt-1 text-xs text-slate-600 block">Verás los datos para completar la transferencia.</span>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  {#if method === 'online'}
    <div class="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm">
      <h3 class="text-sm font-semibold text-slate-900">Pago online</h3>
      <p class="mt-2 text-sm text-slate-600">Serás redirigido a la pasarela para completar el pago.</p>
      <button
        type="button"
        class="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        on:click={submitOnline}
      >
        Donar $ {amount}
      </button>
    </div>
  {:else}
    {#each config.metodos.filter((m) => m.tipo === method) as seleccion}
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-semibold text-slate-900">Instrucciones</h3>
        <p class="mt-2 text-sm text-slate-600">Completá la donación usando estos datos.</p>
        {#if seleccion.datos}
          <dl class="mt-4 space-y-3 text-sm">
            {#each Object.entries(seleccion.datos) as [label, value]}
              <div class="flex items-center justify-between gap-3">
                <dt class="font-medium text-slate-700">{label}</dt>
                <dd>
                  <button
                    type="button"
                    class="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-brand-400"
                    on:click={() => navigator.clipboard?.writeText(value)}
                  >
                    Copiar
                  </button>
                  <span class="ml-2 text-slate-600">{value}</span>
                </dd>
              </div>
            {/each}
          </dl>
        {/if}
      </div>
    {/each}
  {/if}

  {#if status === 'ok'}
    <div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Gracias por tu donación.</div>
  {:else if status === 'cancel'}
    <div class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">Pago cancelado. Podés intentar otra vez o elegir otro método.</div>
  {:else if status === 'error'}
    <div class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">No pudimos iniciar el checkout. Revisá la conexión o intentá más tarde.</div>
  {/if}
</div>
