<script lang="ts">
  import SectionHeader from '$components/sections/SectionHeader.svelte';
  import EventCard from '$components/cards/EventCard.svelte';
  import type { Evento } from '$content/models';

  export let data: { proximos: Evento[]; pasados: Evento[]; page: number; totalPages: number };
</script>

<section class="mx-auto max-w-6xl space-y-12 px-4 py-16">
  <SectionHeader
    title="Eventos del seminario"
    subtitle="Próximas actividades y archivo histórico"
    align="center"
  />

  <div>
    <h2 class="text-lg font-semibold text-slate-900">Próximos eventos</h2>
    {#if data.proximos.length}
      <div class="mt-6 grid gap-6 md:grid-cols-2">
        {#each data.proximos as evento, index}
          <EventCard {evento} revealDirection={index % 2 === 0 ? 'left' : 'right'} />
        {/each}
      </div>
    {:else}
      <div class="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-600">
        No hay eventos próximos. <a class="font-semibold" href="/contacto">Suscribite para recibir novedades.</a>
      </div>
    {/if}
  </div>

  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-slate-900">Eventos pasados</h2>
    {#if data.pasados.length}
      <div class="grid gap-6 md:grid-cols-2">
        {#each data.pasados as evento, index}
          <EventCard {evento} revealDirection={index % 2 === 0 ? 'left' : 'right'} />
        {/each}
      </div>
      {#if data.totalPages > 1}
        <nav class="flex items-center justify-center gap-3 text-sm" aria-label="Paginación eventos pasados">
          {#each Array(data.totalPages) as _, index}
            {#if index + 1 === data.page}
              <span class="rounded-full bg-brand-600 px-3 py-1 text-white">{index + 1}</span>
            {:else}
              <a class="rounded-full border px-3 py-1" href={`?page=${index + 1}`}>
                {index + 1}
              </a>
            {/if}
          {/each}
        </nav>
      {/if}
    {:else}
      <p class="text-sm text-slate-600">Todavía no hay archivo de eventos.</p>
    {/if}
  </div>
</section>
