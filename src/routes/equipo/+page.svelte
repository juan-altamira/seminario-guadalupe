<script lang="ts">
  import Hero from '$components/sections/Hero.svelte';
  import type { Persona, PageContent } from '$content/models';
  import SlideInPicture from '$components/media/SlideInPicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import manifest from '$content/image-manifest.json';
  import { PortableText } from '@portabletext/svelte';

  export let data: { personas: Persona[]; page?: PageContent };

  const hero = data.page?.hero ?? {
    titulo: 'El equipo',
    subtitulo: 'Profesionales y voluntarios que sostienen el seminario.'
  };

  const getPicture = (foto?: string) => (foto && foto in manifest ? (foto as PictureName) : null);
</script>

<Hero hero={hero} />

<section class="mx-auto max-w-6xl px-4 py-16">
  <div class="mx-auto max-w-3xl pb-10 text-center text-sm text-slate-600">
    Somos una comunidad al servicio del discernimiento: formadores, colaboradores y seminaristas caminamos juntos, en comunión con el obispo y el presbiterio, para que cada llamado se configure con Jesús Buen Pastor.
  </div>
  <div class="grid gap-8 md:grid-cols-3">
    {#each data.personas as persona, index}
      {@const picture = getPicture(persona.foto)}
      <article class="rounded-2xl border border-slate-200 bg-white p-6 text-sm shadow-sm">
        {#if persona.slug === 'comunidad-seminaristas'}
          <a href="/equipo/comunidad" class="block focus:outline-none focus-visible:ring focus-visible:ring-brand-500">
            <SlideInPicture
              name={picture}
              alt={persona.fotoAlt ?? `Foto de ${persona.nombre}`}
              wrapperClass="mb-4 h-40 w-full overflow-hidden rounded-xl"
              pictureClass="block h-full w-full"
              imgClass="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              direction={index % 2 === 0 ? 'left' : 'right'}
              fallbackSrc={!picture ? (persona.foto ?? null) : null}
              useAspectRatio={false}
            />
            <h3 class="text-lg font-semibold text-slate-900">{persona.nombre}</h3>
            <p class="text-xs uppercase tracking-wide text-brand-600">{persona.rol}</p>
            <div class="mt-3 text-sm text-slate-600">
              {#if persona.bioPortable?.length}
                <PortableText value={persona.bioPortable} />
              {:else if persona.bio}
                <p>{persona.bio}</p>
              {/if}
            </div>
          </a>
        {:else}
          <div>
            <SlideInPicture
              name={picture}
              alt={persona.fotoAlt ?? `Foto de ${persona.nombre}`}
              wrapperClass="mb-4 h-40 w-full overflow-hidden rounded-xl"
              pictureClass="block h-full w-full"
              imgClass="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              direction={index % 2 === 0 ? 'left' : 'right'}
              fallbackSrc={!picture ? (persona.foto ?? null) : null}
              useAspectRatio={false}
            />
            <h3 class="text-lg font-semibold text-slate-900">{persona.nombre}</h3>
            <p class="text-xs uppercase tracking-wide text-brand-600">{persona.rol}</p>
            <div class="mt-3 text-sm text-slate-600">
              {#if persona.bioPortable?.length}
                <PortableText value={persona.bioPortable} />
              {:else if persona.bio}
                <p>{persona.bio}</p>
              {/if}
            </div>
          </div>
        {/if}
      </article>
    {/each}
  </div>
</section>
