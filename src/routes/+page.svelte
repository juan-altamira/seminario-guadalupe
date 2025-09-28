<script lang="ts">
  import Hero from '$components/sections/Hero.svelte';
  import SectionHeader from '$components/sections/SectionHeader.svelte';
  import EventCard from '$components/cards/EventCard.svelte';
  import ResourceCard from '$components/cards/ResourceCard.svelte';
  import type { Evento, Recurso } from '$content/models';
  import { trackEvent } from '$lib/analytics';

  export let data: { proximo?: Evento; recientes: Recurso[] };

  const hero = {
    titulo: 'Seminario "Nuestra Señora de Guadalupe"',
    subtitulo:
      'Casa de discernimiento y formación sacerdotal para las diócesis de Santa Fe y Rafaela.',
    cta: { label: 'Quiero discernir mi vocación', href: '/contacto' }
  };
</script>

<svelte:head>
  <title>Seminario "Nuestra Señora de Guadalupe" · Casa de discernimiento</title>
  <meta
    name="description"
    content="Conocé la vida del Seminario Nuestra Señora de Guadalupe: fraternidad, oración, estudio y misión al servicio de Santa Fe y Rafaela."
  />
</svelte:head>

<Hero {hero} />

<section class="mx-auto max-w-6xl space-y-14 px-4 py-16">
  <div class="grid gap-10 md:grid-cols-3">
    <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
      <SectionHeader title="Próximo evento" subtitle="Celebramos y compartimos la vida del Seminario" />
      {#if data.proximo}
        <div class="mt-6">
          <EventCard evento={data.proximo} revealDirection="right" />
        </div>
      {:else}
        <p class="mt-6 text-sm text-slate-600">No hay eventos próximos. <a class="font-semibold" href="/contacto">Suscribite a las novedades.</a></p>
      {/if}
    </article>
    <aside class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-slate-900">Sumate a la misión</h3>
      <ul class="mt-4 space-y-3 text-sm">
        <li>
          <a
            class="inline-flex items-center gap-2 font-semibold text-brand-700"
            href="/donar"
            on:click={() => trackEvent('cta_donar_home')}
          >
            Colaborar con la OVE <span aria-hidden="true">→</span>
          </a>
        </li>
        <li>
          <a
            class="inline-flex items-center gap-2 font-semibold text-brand-700"
            href="/contacto"
            on:click={() => trackEvent('cta_contacto_home')}
          >
            Conversar con un formador <span aria-hidden="true">→</span>
          </a>
        </li>
        <li>
          <a
            class="inline-flex items-center gap-2 font-semibold text-brand-700"
            href="/recursos"
            on:click={() => trackEvent('cta_recursos_home')}
          >
            Ver recursos <span aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </aside>
  </div>

  <div class="space-y-8">
    <SectionHeader title="Recursos recientes" subtitle="Materiales descargables y artículos para profundizar" align="center" />
    <div class="grid gap-6 md:grid-cols-3">
      {#if data.recientes.length}
        {#each data.recientes as recurso, index}
          <ResourceCard {recurso} revealDirection={index % 2 === 0 ? 'left' : 'right'} />
        {/each}
      {:else}
        <div class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-600">
          Aún no hay recursos publicados. <a class="font-semibold" href="/">Volver al inicio</a>.
        </div>
      {/if}
    </div>
    <div class="text-center">
      <a class="inline-flex items-center gap-2 rounded-full border border-brand-700 px-5 py-2 text-sm font-semibold text-brand-700" href="/recursos">
        Ver todos los recursos <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>
