<script lang="ts">
  import type { Recurso } from '$content/models';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import manifest from '$content/image-manifest.json';
  import { PortableText } from '@portabletext/svelte';

  export let data: { recurso?: Recurso };
  const recurso = data.recurso;

  const managedCover = recurso?.portada && recurso.portada in manifest ? (recurso.portada as PictureName) : null;
  const imageEntry = managedCover ? manifest[managedCover] : null;
  const ogVariant = imageEntry?.variants.find((v: { format: string }) => v.format === 'jpg') ?? imageEntry?.variants.at(-1);
  const ogImage = ogVariant ? `https://seminarioguadalupe.org/${ogVariant.file}` : recurso?.portada;
  const hasPortableContent = recurso?.contenidoPortable && recurso.contenidoPortable.length > 0;

  function trackDownload(event: MouseEvent) {
    const anchor = event.currentTarget as HTMLAnchorElement;
    if (window?.plausible) {
      window.plausible('descarga_pdf', {
        props: { recurso: recurso?.slug ?? '', titulo: recurso?.titulo ?? '' }
      });
    }
    anchor.setAttribute('data-downloaded', 'true');
  }
</script>

<svelte:head>
  {#if recurso}
    <title>{recurso.titulo} · Recursos Seminario</title>
    <meta name="description" content={recurso.resumen ?? 'Recurso descargable del seminario'} />
    <meta property="og:title" content={recurso.titulo} />
    <meta property="og:type" content={recurso.tipo === 'pdf' ? 'article' : 'article'} />
    {#if ogImage}
      <meta property="og:image" content={ogImage} />
    {/if}
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': recurso.tipo === 'pdf' ? 'CreativeWork' : 'Article',
        name: recurso.titulo,
        datePublished: recurso.fechaPublicacion,
        image: ogImage,
        description: recurso.resumen
      })}
    </script>
  {:else}
    <title>Recurso no encontrado · Seminario</title>
  {/if}
</svelte:head>

{#if recurso}
  <article class="mx-auto max-w-3xl space-y-6 px-4 py-16">
    <div>
      <a
        href="/recursos"
        class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:border-brand-500 hover:text-brand-700"
      >
        ← Atrás
      </a>
    </div>
    <header class="space-y-4">
      <p class="text-xs font-semibold uppercase tracking-widest text-brand-600">
        {recurso.tipo === 'pdf' ? 'Recurso PDF' : 'Artículo'}
      </p>
      <h1 class="text-3xl font-semibold text-slate-900">{recurso.titulo}</h1>
      <p class="text-sm text-slate-500">
        Publicado el {new Date(recurso.fechaPublicacion).toLocaleDateString('es-ES', { dateStyle: 'long' })}
      </p>
      {#if recurso.tipo === 'pdf' && recurso.archivoPdf}
        <a
          class="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800"
          href={recurso.archivoPdf}
          download
          on:click={trackDownload}
        >
          Descargar PDF
          <span aria-hidden="true">⇣</span>
        </a>
      {/if}
    </header>
    <SlideInPicture
      name={managedCover}
      alt={recurso.portadaAlt ?? `Portada ${recurso.titulo}`}
      wrapperClass="w-full overflow-hidden rounded-3xl border"
      pictureClass="block h-full w-full"
      imgClass="h-full w-full object-cover"
      sizes="(max-width: 768px) 100vw, 768px"
      direction="up"
      fallbackSrc={managedCover ? null : recurso?.portada ?? null}
    />
    {#if recurso.resumen}
      <p class="text-base text-slate-700">{recurso.resumen}</p>
    {/if}
    {#if hasPortableContent}
      <div class="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-h2:mt-10 prose-h3:mt-6 prose-a:text-brand-700 hover:prose-a:text-brand-800 prose-strong:text-brand-800 prose-li:marker:text-brand-500">
        <PortableText value={recurso.contenidoPortable ?? []} />
      </div>
    {:else if recurso.contenido}
      <div class="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-h2:mt-10 prose-h3:mt-6 prose-a:text-brand-700 hover:prose-a:text-brand-800 prose-strong:text-brand-800 prose-li:marker:text-brand-500">
        {@html recurso.contenido}
      </div>
    {/if}
  </article>
{:else}
  <div class="mx-auto max-w-3xl px-4 py-16 text-sm text-slate-600">Recurso no encontrado.</div>
{/if}
