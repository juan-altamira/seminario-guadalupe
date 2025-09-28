import createImageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

let builder: ImageUrlBuilder | null = null;

function getBuilder() {
  if (!builder && PUBLIC_SANITY_PROJECT_ID && PUBLIC_SANITY_DATASET) {
    builder = createImageUrlBuilder({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET
    });
  }
  return builder;
}

export function sanityImageUrl(source: SanityImageSource, width?: number, height?: number) {
  const instance = getBuilder();
  if (!instance) {
    return null;
  }

  let imageBuilder = instance.image(source);
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  return imageBuilder.url();
}
