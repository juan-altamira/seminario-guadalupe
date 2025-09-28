<script lang="ts">
  import Hero from '$components/sections/Hero.svelte';
  import SectionHeader from '$components/sections/SectionHeader.svelte';
  import type { Programa, PageContent } from '$content/models';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import manifest from '$content/image-manifest.json';

  export let data: { programas: Programa[]; page?: PageContent };

  const hero = data.page?.hero ?? {
    titulo: 'Programas y actividades',
    subtitulo: 'Áreas de formación, acompañamiento y recursos.'
  };

  const getPicture = (imagen?: string) => (imagen && imagen in manifest ? (imagen as PictureName) : null);
</script>

<Hero hero={hero} />

<section class="mx-auto max-w-6xl space-y-10 px-4 py-16">
  <p class="mx-auto max-w-3xl text-center text-sm text-slate-600">
    Nuestra vida cotidiana integra oración, estudio, fraternidad y misión. Cada itinerario acompaña el crecimiento humano y espiritual de los seminaristas y de quienes se acercan a discernir la voluntad de Dios.
  </p>
  <SectionHeader
    title="Áreas principales"
    subtitle="Explorá las propuestas disponibles para comunidades e individuos"
    align="center"
  />
  <div class="grid gap-8 md:grid-cols-2">
    {#each data.programas as programa, index}
      {@const picture = getPicture(programa.imagen)}
      <article class="rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <a href={`/programas/${programa.slug}`} class="block focus:outline-none focus-visible:ring focus-visible:ring-brand-500">
          <SlideInPicture
            name={picture}
            alt={programa.imagenAlt ?? `Programa ${programa.titulo}`}
            wrapperClass="w-full overflow-hidden rounded-t-3xl"
            pictureClass="block h-full w-full"
            imgClass="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 560px"
            direction={index % 2 === 0 ? 'left' : 'right'}
            fallbackSrc={!picture ? (programa.imagen ?? null) : null}
            useAspectRatio={false}
          />
          <div class="space-y-3 p-6">
            <h3 class="text-xl font-semibold text-slate-900">{programa.titulo}</h3>
            <p class="text-sm text-slate-600">{programa.resumen}</p>
            <span class="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
              Ver programa <span aria-hidden="true">→</span>
            </span>
          </div>
        </a>
      </article>
    {/each}
  </div>
</section>
