<script lang="ts">
  import Hero from '$components/sections/Hero.svelte';
  import type { PageContent } from '$content/models';

  export let data: { page?: PageContent };

  const defaultHero = {
    titulo: 'Nuestra Institución',
    subtitulo: 'Conocé la misión, visión e historia del seminario.'
  };
</script>

{#if data.page?.hero}
  <Hero hero={data.page.hero} />
{:else}
  <Hero hero={defaultHero} />
{/if}

<section class="mx-auto max-w-4xl px-4 py-16">
  {#if data.page?.cuerpo}
    <div class="prose prose-slate max-w-none" bind:this={undefined}>
      {@html data.page.cuerpo}
    </div>
  {:else}
    <p class="text-sm text-slate-600">Contenido próximamente.</p>
  {/if}
</section>
