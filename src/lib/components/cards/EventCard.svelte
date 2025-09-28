<script lang="ts">
  import type { Evento } from '$content/models';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import type { RevealDirection } from '$lib/actions/reveal';
  import manifest from '$content/image-manifest.json';

  export let evento: Evento;
  export let revealDirection: RevealDirection = 'up';

  const managedImage = evento.imagen && evento.imagen in manifest ? (evento.imagen as PictureName) : null;
</script>

<article class="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <SlideInPicture
    name={managedImage}
    alt={`Imagen evento ${evento.titulo}`}
    wrapperClass="h-40 w-full overflow-hidden"
    pictureClass="block h-full w-full"
    imgClass="h-full w-full object-cover"
    sizes="(max-width: 768px) 100vw, 400px"
    direction={revealDirection}
    fallbackSrc={managedImage ? null : evento.imagen ?? null}
    useAspectRatio={false}
  />
  <div class="flex flex-1 flex-col gap-3 p-6">
    <span class={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${evento.estado === 'proximo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
      {evento.estado === 'proximo' ? 'Próximo' : 'Pasado'}
    </span>
    <h3 class="text-lg font-semibold text-slate-900">
      <a href={`/eventos/${evento.slug}`} class="hover:text-brand-700">{evento.titulo}</a>
    </h3>
    {#if evento.lugar}
      <p class="text-sm text-slate-600">{evento.lugar.nombre}</p>
    {/if}
    <p class="text-xs font-medium text-slate-500">
      {new Date(evento.fechaInicio).toLocaleDateString('es-ES', { dateStyle: 'medium' })}
      {#if evento.fechaFin}
        – {new Date(evento.fechaFin).toLocaleDateString('es-ES', { dateStyle: 'medium' })}
      {/if}
    </p>
    <div class="mt-auto">
      <a class="inline-flex items-center gap-2 text-sm font-semibold text-brand-700" href={`/eventos/${evento.slug}`}>
        Ver detalles <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</article>
