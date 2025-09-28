<script lang="ts">
  import type { Recurso } from '$content/models';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import type { RevealDirection } from '$lib/actions/reveal';
  import manifest from '$content/image-manifest.json';

  export let recurso: Recurso;
  export let revealDirection: RevealDirection = 'up';

  const managedCover = recurso.portada && recurso.portada in manifest ? (recurso.portada as PictureName) : null;
</script>

<article class="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md">
  <a href={`/recursos/${recurso.slug}`} class="block h-full focus:outline-none focus-visible:ring focus-visible:ring-brand-500">
    <SlideInPicture
      name={managedCover}
      alt={recurso.portadaAlt ?? `Portada ${recurso.titulo}`}
      wrapperClass="w-full overflow-hidden rounded-t-2xl"
      pictureClass="block h-full w-full"
      imgClass="h-full w-full object-cover"
      sizes="(max-width: 768px) 100vw, 400px"
      direction={revealDirection}
      fallbackSrc={managedCover ? null : recurso.portada ?? null}
    />
    <div class="flex flex-1 flex-col gap-3 p-6">
      <span class="inline-flex w-fit items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase text-brand-700">
        {recurso.tipo === 'pdf' ? 'PDF' : 'Artículo'}
      </span>
      <h3 class="text-lg font-semibold text-slate-900">{recurso.titulo}</h3>
      {#if recurso.resumen}
        <p class="text-sm text-slate-600">{recurso.resumen}</p>
      {/if}
      <div class="mt-auto space-y-3 text-xs text-slate-500">
        <p class="font-medium">
          {new Date(recurso.fechaPublicacion).toLocaleDateString('es-ES', { dateStyle: 'medium' })}
        </p>
        <span class="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          {recurso.tipo === 'pdf' ? 'Descargar' : 'Leer'}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </div>
  </a>
</article>
