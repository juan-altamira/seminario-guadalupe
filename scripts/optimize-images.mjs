import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC_DIR = path.join(ROOT, 'assets', 'raw');
const OUT_DIR = path.join(ROOT, 'static', 'images');

const SIZES = [480, 768, 1200];
const FORMATS = [
  { ext: 'avif', options: { quality: 50 } },
  { ext: 'webp', options: { quality: 70 } },
  { ext: 'jpg', options: { quality: 75, progressive: true } }
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function getRawImages() {
  try {
    const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .filter((entry) => /\.(jpe?g|png|webp|tiff|avif)$/i.test(entry.name))
      .map((entry) => path.join(SRC_DIR, entry.name));
  } catch (error) {
    if ((error?.code ?? '') === 'ENOENT') {
      console.warn('No se encontró la carpeta assets/raw. Creala y colocá tus imágenes allí.');
      return [];
    }
    throw error;
  }
}

function toSlug(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function withoutExtension(filePath) {
  return path.parse(filePath).name;
}

async function optimizeImage(filePath) {
  const buffer = await fs.readFile(filePath);
  const image = sharp(buffer, { failOn: 'error' });
  const meta = await image.metadata();
  const baseName = toSlug(withoutExtension(path.basename(filePath)));

  const outputEntries = [];

  for (const size of SIZES) {
    const width = meta.width && meta.width < size ? meta.width : size;
    for (const format of FORMATS) {
      const outDir = path.join(OUT_DIR, `${width}w`);
      await ensureDir(outDir);
      const outFile = path.join(outDir, `${baseName}.${format.ext}`);

      const pipeline = sharp(buffer, { failOn: 'error' }).resize({ width, fit: 'inside', withoutEnlargement: true });
      switch (format.ext) {
        case 'avif':
          await pipeline.avif(format.options).toFile(outFile);
          break;
        case 'webp':
          await pipeline.webp(format.options).toFile(outFile);
          break;
        case 'jpg':
          await pipeline.jpeg(format.options).toFile(outFile);
          break;
        default:
          throw new Error(`Formato no soportado: ${format.ext}`);
      }

      outputEntries.push({
        width,
        format: format.ext,
        file: path.relative(path.join(ROOT, 'static'), outFile)
      });
    }
  }

  return { name: baseName, meta, variants: outputEntries };
}

async function writeManifest(items) {
  const manifestPath = path.join(ROOT, 'src', 'content', 'image-manifest.json');
  await ensureDir(path.dirname(manifestPath));
  const payload = items.reduce((acc, item) => {
    acc[item.name] = {
      width: item.meta.width,
      height: item.meta.height,
      format: item.meta.format,
      variants: item.variants
    };
    return acc;
  }, {});
  await fs.writeFile(manifestPath, JSON.stringify(payload, null, 2));
  return manifestPath;
}

async function run() {
  const files = await getRawImages();
  if (!files.length) {
    console.log('No se encontraron imágenes para optimizar.');
    return;
  }

  console.log(`Procesando ${files.length} imagen(es) desde ${SRC_DIR}`);
  const manifestItems = [];
  for (const file of files) {
    const relativeName = path.relative(SRC_DIR, file);
    console.log(`  → ${relativeName}`);
    const result = await optimizeImage(file);
    manifestItems.push(result);
  }

  const manifestPath = await writeManifest(manifestItems);
  console.log(`Manifiesto generado: ${manifestPath}`);
  console.log('Listo. Copiá las rutas optimizadas desde static/images en tus contenidos.');
}

run().catch((error) => {
  console.error('Error optimizando imágenes:', error);
  process.exitCode = 1;
});
