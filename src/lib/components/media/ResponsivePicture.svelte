<script lang="ts">
  import manifest from '$content/image-manifest.json';

  type Manifest = typeof manifest;

  export type PictureName = keyof Manifest;

  export let name: PictureName;
  export let alt: string;
  export let pictureClass = '';
  export let imgClass = '';
  export let sizes = '(max-width: 768px) 100vw, 1200px';
  export let loading: 'lazy' | 'eager' = 'lazy';

  const entry = manifest[name];

  if (!entry) {
    console.warn(`Imagen \"${name}\" no existe en image-manifest.json. Ejecutá pnpm optimize:images`);
  }

  const sources = entry
    ? entry.variants.reduce<Record<string, { width: number; file: string }[]>>((acc, variant) => {
        acc[variant.format] ??= [];
        acc[variant.format].push({ width: variant.width, file: variant.file });
        return acc;
      }, {})
    : {};

  const fallback = sources['jpg']?.at(-1) ?? sources['webp']?.at(-1) ?? sources['avif']?.at(-1);
</script>

{#if entry && fallback}
  <picture class={pictureClass}>
    {#if sources['avif']}
      <source
        type="image/avif"
        {sizes}
        srcset={sources['avif']
          .map((variant) => `/${variant.file} ${variant.width}w`)
          .join(', ')}
      />
    {/if}
    {#if sources['webp']}
      <source
        type="image/webp"
        {sizes}
        srcset={sources['webp']
          .map((variant) => `/${variant.file} ${variant.width}w`)
          .join(', ')}
      />
    {/if}
    <img
      {loading}
      decoding="async"
      src={`/${fallback.file}`}
      alt={alt}
      width={entry.width ?? undefined}
      height={entry.height ?? undefined}
      class={imgClass}
    />
  </picture>
{:else}
  <div class={`bg-slate-200 text-xs text-slate-500 ${pictureClass}`}>Imagen no disponible</div>
{/if}
