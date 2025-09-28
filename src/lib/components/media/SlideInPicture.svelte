<script lang="ts">
  import ResponsivePicture from '$components/media/ResponsivePicture.svelte';
  import { type PictureName } from '$lib/media/manifest';
  import { reveal, type RevealDirection } from '$lib/actions/reveal';
  import manifest from '$content/image-manifest.json';

  export let name: PictureName | null | undefined = null;
  export let alt: string;
  export let wrapperClass = '';
  export let pictureClass = '';
  export let imgClass = 'w-full h-auto object-cover';
  export let sizes = '(max-width: 768px) 100vw, 1200px';
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let direction: RevealDirection = 'up';
  export let fallbackSrc: string | null | undefined = null;
  export let useAspectRatio = true;

  const hasManagedImage = name && name in manifest;
  const aspectRatio = hasManagedImage ? `${manifest[name as PictureName].width}/${manifest[name as PictureName].height}` : null;
</script>

{#if hasManagedImage}
  <div
    class={wrapperClass}
    use:reveal={{ direction }}
    style={useAspectRatio && aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}
  >
    <ResponsivePicture
      name={name as PictureName}
      alt={alt}
      pictureClass={`block h-full w-full ${pictureClass}`}
      imgClass={`block h-full w-full object-cover ${imgClass}`}
      sizes={sizes}
      loading={loading}
    />
  </div>
{:else if fallbackSrc}
  <div
    class={wrapperClass}
    use:reveal={{ direction }}
    style={useAspectRatio && aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}
  >
    <picture class={`block ${pictureClass}`}>
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        class={`block w-full h-auto object-cover ${imgClass}`}
      />
    </picture>
  </div>
{/if}
