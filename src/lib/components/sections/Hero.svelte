<script lang="ts">
  import type { Hero } from '$content/models';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import manifest from '$content/image-manifest.json';

  export let hero: Hero;

  const managedImage = hero.imagen && hero.imagen in manifest ? (hero.imagen as PictureName) : null;
  const externalImage = hero.imagen && !managedImage ? hero.imagen : null;
</script>

<section class="relative overflow-hidden bg-slate-900 text-white">
  <div class="absolute inset-0 opacity-20" aria-hidden="true">
    <div class="h-full w-full bg-gradient-to-br from-brand-600/80 to-slate-900"></div>
  </div>
  <div class="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 md:flex-row md:items-center">
    <div class="md:w-2/3">
      <p class="uppercase tracking-widest text-brand-200">Seminario</p>
      <h1 class="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{hero.titulo}</h1>
      {#if hero.subtitulo}
        <p class="mt-6 max-w-2xl text-lg text-slate-200">{hero.subtitulo}</p>
      {/if}
      {#if hero.cta}
        <a
          class="mt-8 inline-flex items-center rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-brand-400 focus-visible:ring-brand-200"
          href={hero.cta.href}
        >
          {hero.cta.label}
        </a>
      {/if}
    </div>
    {#if managedImage || externalImage}
      <div class="md:w-1/3">
        <SlideInPicture
          name={managedImage}
          fallbackSrc={externalImage}
          alt={hero.imagenAlt ?? hero.titulo}
          wrapperClass="overflow-hidden rounded-3xl border border-white/20 shadow-xl"
          pictureClass="block h-full w-full"
          imgClass="h-full w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 480px"
          loading="eager"
          direction="right"
        />
      </div>
    {/if}
  </div>
  </section>
