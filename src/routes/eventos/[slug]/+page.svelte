<script lang="ts">
  import type { Evento } from '$content/models';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import manifest from '$content/image-manifest.json';
  import { PortableText } from '@portabletext/svelte';

  export let data: { evento?: Evento };
  const evento = data.evento;

  const managedImage = evento?.imagen && evento.imagen in manifest ? (evento.imagen as PictureName) : null;
  const imageEntry = managedImage ? manifest[managedImage] : null;
  const ogVariant = imageEntry?.variants.find((v: { format: string }) => v.format === 'jpg') ?? imageEntry?.variants.at(-1);
  const ogImage = ogVariant ? `https://seminarioguadalupe.org/${ogVariant.file}` : evento?.imagen;
  const hasPortableContent = evento?.cuerpoPortable && evento.cuerpoPortable.length > 0;
</script>

<svelte:head>
  {#if evento}
    <title>{evento.titulo} · Seminario</title>
    <meta name="description" content={evento.descripcion ?? 'Evento del seminario'} />
    <meta property="og:title" content={evento.titulo} />
    <meta property="og:type" content="event" />
    {#if ogImage}
      <meta property="og:image" content={ogImage} />
    {/if}
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: evento.titulo,
        startDate: evento.fechaInicio,
        endDate: evento.fechaFin,
        eventStatus: evento.estado === 'proximo' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventCompleted',
        location: evento.lugar
          ? {
              '@type': 'Place',
              name: evento.lugar.nombre,
              address: evento.lugar.direccion
            }
          : undefined,
        image: ogImage,
        description: evento.descripcion
      })}
    </script>
  {:else}
    <title>Evento no encontrado · Seminario</title>
  {/if}
</svelte:head>

{#if evento}
  <article class="mx-auto max-w-3xl space-y-6 px-4 py-16">
    <div>
      <a
        href="/eventos"
        class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:border-brand-500 hover:text-brand-700"
      >
        ← Atrás
      </a>
    </div>
    <header class="space-y-4">
      <p class="text-xs font-semibold uppercase tracking-widest text-brand-600">Evento del seminario</p>
      <h1 class="text-3xl font-semibold text-slate-900">{evento.titulo}</h1>
      <p class="text-sm text-slate-500">
        {new Date(evento.fechaInicio).toLocaleDateString('es-ES', { dateStyle: 'long' })}
        {#if evento.fechaFin}
          – {new Date(evento.fechaFin).toLocaleDateString('es-ES', { dateStyle: 'long' })}
        {/if}
      </p>
      {#if evento.lugar}
        <p class="text-sm text-slate-600">
          {evento.lugar.nombre}
          {#if evento.lugar.direccion}
            · {evento.lugar.direccion}
          {/if}
          {#if evento.lugar.mapa}
            · <a href={evento.lugar.mapa} target="_blank" rel="noopener">Ver mapa</a>
          {/if}
        </p>
      {/if}
    </header>
    <SlideInPicture
      name={managedImage}
      alt={evento.imagenAlt ?? `Imagen del evento ${evento.titulo}`}
      wrapperClass="w-full overflow-hidden rounded-3xl border"
      pictureClass="block h-full w-full"
      imgClass="h-full w-full object-cover"
      sizes="(max-width: 768px) 100vw, 960px"
      direction="up"
      fallbackSrc={managedImage ? null : evento?.imagen ?? null}
    />
    {#if hasPortableContent}
      <div class="prose prose-slate max-w-none">
        <PortableText value={evento.cuerpoPortable ?? []} />
      </div>
    {:else if evento.descripcion}
      <div class="prose prose-slate max-w-none">
        <p>{evento.descripcion}</p>
      </div>
    {/if}
    <div class="rounded-2xl border border-brand-200 bg-brand-50 px-6 py-4 text-sm text-brand-800">
      <p>Consultas y reservas: <a href="/contacto" class="font-semibold">escribinos desde el formulario</a>.</p>
    </div>
  </article>
{:else}
  <div class="mx-auto max-w-3xl px-4 py-16 text-sm text-slate-600">Evento no encontrado.</div>
{/if}
