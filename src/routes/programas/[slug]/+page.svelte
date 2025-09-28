<script lang="ts">
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import type { Programa } from '$content/models';
  import { type PictureName } from '$lib/media/manifest';
  import manifest from '$content/image-manifest.json';
  import { PortableText } from '@portabletext/svelte';

  export let data: { programa?: Programa; relacionados: Programa[] };
  const programa = data.programa;

  const getPicture = (imagen?: string) => (imagen && imagen in manifest ? (imagen as PictureName) : null);

  const breadcrumb = [
    { label: 'Inicio', href: '/' },
    { label: 'Programas', href: '/programas' },
    { label: programa?.titulo ?? '', href: `/programas/${programa?.slug ?? ''}` }
  ];
</script>

{#if !programa}
  <section class="mx-auto max-w-4xl px-4 py-20 text-center text-sm text-slate-600">
    Programa no encontrado. <a class="font-semibold" href="/programas">Volver a programas</a>.
  </section>
{:else}
  <section class="mx-auto max-w-6xl space-y-10 px-4 py-16">
    <nav class="text-xs text-slate-500" aria-label="Breadcrumb">
      <ol class="flex flex-wrap gap-2">
        {#each breadcrumb as crumb, index}
          <li class="flex items-center gap-2">
            {#if index < breadcrumb.length - 1}
              <a href={crumb.href} class="hover:text-brand-600">{crumb.label}</a>
              <span aria-hidden="true">/</span>
            {:else}
              <span class="text-slate-700">{crumb.label}</span>
            {/if}
          </li>
        {/each}
      </ol>
    </nav>

    <div>
      <a
        href="/programas"
        class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:border-brand-500 hover:text-brand-700"
      >
        ← Atrás
      </a>
    </div>

    <header class="grid gap-8 md:grid-cols-[2fr,1fr] md:items-start">
      <div class="space-y-5">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">Programa</p>
        <h1 class="text-3xl font-semibold text-slate-900 md:text-4xl">{programa.titulo}</h1>
        {#if programa.resumen}
          <p class="text-base text-slate-600 md:text-lg">{programa.resumen}</p>
        {/if}
      </div>
      {#if getPicture(programa.imagen) || programa.imagen}
        <SlideInPicture
          name={getPicture(programa.imagen)}
          fallbackSrc={!getPicture(programa.imagen) ? programa.imagen ?? null : null}
          alt={programa.imagenAlt ?? programa.titulo}
          wrapperClass="w-full overflow-hidden rounded-3xl shadow-lg"
          pictureClass="block h-full w-full"
          imgClass="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
          direction="right"
        />
      {/if}
    </header>

    <article class="prose prose-slate max-w-none">
      {#if programa.cuerpoPortable?.length}
        <PortableText value={programa.cuerpoPortable} />
      {:else if programa.cuerpo}
        {#each programa.cuerpo.split('\n\n') as parrafo}
          <p>{parrafo}</p>
        {/each}
      {/if}
    </article>

    {#if data.relacionados.length}
      <section class="space-y-6">
        <h2 class="text-lg font-semibold text-slate-900">Otros programas</h2>
        <div class="grid gap-6 md:grid-cols-3">
          {#each data.relacionados as otro}
            <a href={`/programas/${otro.slug}`} class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 class="text-base font-semibold text-slate-900">{otro.titulo}</h3>
              <p class="mt-2 text-sm text-slate-600">{otro.resumen}</p>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </section>
{/if}
