import manifest from '$content/image-manifest.json';

type Manifest = typeof manifest;

export type PictureName = keyof Manifest;

export default manifest;
