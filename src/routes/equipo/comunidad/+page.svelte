<script lang="ts">
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import manifest from '$content/image-manifest.json';

  const seminaristaSlugs = ['descarga-1', 'descarga-2', 'descarga-3', 'descarga-4', 'descarga-5', 'descarga-6', 'descarga']
    .filter((slug) => slug in manifest);

  const usableSlugs = seminaristaSlugs.length % 2 === 0 ? seminaristaSlugs : seminaristaSlugs.slice(0, -1);

  const seminaristas = usableSlugs.map((slug, index) => ({
    slug: slug as PictureName,
    nombre: `Seminarista ${index + 1}`
  }));

  const hero = {
    titulo: 'Comunidad de seminaristas',
    subtitulo:
      'Discernimiento y vida fraterna. Jóvenes de Santa Fe y Rafaela que comparten oración, estudio y misión en comunión con las diócesis.'
  };
</script>

<section class="mx-auto max-w-6xl px-4 py-16 space-y-12">
  <div>
    <a
      href="/equipo"
      class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:border-brand-500 hover:text-brand-700"
    >
      ← Atrás
    </a>
  </div>

  <header class="space-y-4 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">Vocaciones</p>
    <h1 class="text-3xl font-semibold text-slate-900">{hero.titulo}</h1>
    <p class="text-sm text-slate-600 md:mx-auto md:max-w-3xl">{hero.subtitulo}</p>
  </header>

  {#if seminaristas.length}
    <div class="grid gap-8 md:grid-cols-2">
      {#each seminaristas as seminarista, index}
        <div class="space-y-4">
          <SlideInPicture
            name={seminarista.slug}
            alt={seminarista.nombre}
            wrapperClass="w-full overflow-hidden rounded-3xl shadow-md"
            pictureClass="block h-full w-full"
            imgClass="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
            direction={index % 2 === 0 ? 'left' : 'right'}
            useAspectRatio={false}
          />
          <p class="text-sm text-slate-600">
            Momentos cotidianos en el seminario: vida de oración, estudio, servicio y fraternidad que preparan el corazón para la misión sacerdotal.
          </p>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-sm text-slate-600">Próximamente compartiremos imágenes de la comunidad de seminaristas.</p>
  {/if}

  <div class="text-center">
    <a href="/equipo" class="inline-flex items-center gap-2 rounded-full border border-brand-700 px-5 py-2 text-sm font-semibold text-brand-700">
      Volver al equipo <span aria-hidden="true">→</span>
    </a>
  </div>
</section>
