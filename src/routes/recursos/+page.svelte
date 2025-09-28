<script lang="ts">
  import SectionHeader from '$components/sections/SectionHeader.svelte';
  import ResourceCard from '$components/cards/ResourceCard.svelte';
  import type { Recurso } from '$content/models';

  export let data: { recursos: Recurso[]; tipo: 'pdf' | 'articulo' | null; page: number; totalPages: number; total: number };

  const filtros = [
    { label: 'Todos', value: null },
    { label: 'PDF', value: 'pdf' },
    { label: 'Artículos', value: 'articulo' }
  ];
</script>

<section class="mx-auto max-w-6xl space-y-10 px-4 py-16">
  <SectionHeader
    title="Recursos"
    subtitle="Oración, historia y materiales para acompañar el discernimiento vocacional"
    align="center"
  />

  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex gap-2 text-sm">
      {#each filtros as filtro}
        <a
          href={filtro.value ? `?tipo=${filtro.value}` : '/recursos'}
          class={`rounded-full px-4 py-2 transition ${data.tipo === filtro.value ? 'bg-brand-600 text-white' : 'border border-slate-300 text-slate-700 hover:border-brand-400'}`}
        >
          {filtro.label}
        </a>
      {/each}
    </div>
    <p class="text-xs text-slate-500">{data.total} resultados</p>
  </div>

  <div class="grid gap-6 md:grid-cols-3">
    {#if data.recursos.length}
      {#each data.recursos as recurso, index}
        <ResourceCard {recurso} revealDirection={index % 2 === 0 ? 'left' : 'right'} />
      {/each}
    {:else}
      <div class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-600">
        No hay recursos para esta categoría. <a href="/recursos" class="font-semibold">Ver todos</a>.
      </div>
    {/if}
  </div>

  {#if data.totalPages > 1}
    <nav class="flex items-center justify-center gap-3 text-sm" aria-label="Paginación recursos">
      {#each Array(data.totalPages) as _, index}
        {#if index + 1 === data.page}
          <span class="rounded-full bg-brand-600 px-3 py-1 text-white">{index + 1}</span>
        {:else}
          <a class="rounded-full border px-3 py-1" href={`?${data.tipo ? `tipo=${data.tipo}&` : ''}page=${index + 1}`}>
            {index + 1}
          </a>
        {/if}
      {/each}
    </nav>
  {/if}
</section>
