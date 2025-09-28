# Flujo para optimizar imágenes del Seminario

Este repositorio ya trae la automatización para preparar imágenes responsivas y ligeras. Seguí estos pasos para alcanzar 100/100 en Lighthouse:

1. **Prepará tus archivos originales**
   - Guardá las fotos en alta calidad dentro de `assets/raw/` (podés crear subcarpetas). Acepta `.jpg`, `.jpeg`, `.png`, `.webp`, `.tiff`, `.avif`.
   - Nombrá cada archivo con el slug que usarás en los contenidos, por ejemplo `domingo-buen-pastor-2025.jpg`.

2. **Instalá Sharp (si aún no lo hiciste)**
   ```bash
   pnpm add -D sharp
   ```

3. **Ejecutá la optimización**
   ```bash
   pnpm optimize:images
   ```
   El script:
   - Genera variantes en `static/images/{480w,768w,1200w}/nombre.avif|webp|jpg`.
   - Crea/actualiza `src/content/image-manifest.json` con los tamaños disponibles.

4. **Usá los slugs en el content layer**
   - En archivos como `src/content/data/eventos.ts` o `recursos.ts`, asegurate de que `imagen`/`portada` coincida con el nombre base del archivo (sin extensión). Ejemplo:
     ```ts
     imagen: 'domingo-buen-pastor-2025'
     ```

5. **Renderizá con `ResponsivePicture`**
   - Los componentes ya detectan la imagen en el manifiesto y sirven `<picture>` con AVIF/WEBP/JPG y `loading="lazy"`.
   - Para el hero o páginas nuevas podés usar directamente:
     ```svelte
     <ResponsivePicture name="domingo-buen-pastor-2025" alt="Domingo del Buen Pastor" />
     ```

6. **Hero o imágenes críticas (LCP)**
   - Para la imagen principal de la home, agregá en el hero:
     ```ts
     hero: {
       titulo: '...'
       imagen: 'hero-comunidad'
     }
     ```
   - Luego corré la optimización y actualizá el slug.
   - Si Lighthouse marca LCP lento, cambiá `loading="lazy"` por `loading="eager"` en la imagen crítica (se puede ajustar en `ResponsivePicture`).

7. **Verificación**
   - Corré `pnpm dev` y comprobá en el navegador que las rutas sirven archivos AVIF/WEBP.
   - Ejecutá Lighthouse en modo móvil: las imágenes preoptimizadas + `decoding="async"` + dimensiones definidas evitan CLS y mejoran LCP/TBT.

> Tips adicionales: mantené los originales en al menos 2000px de ancho; el script redimensiona sin escalar hacia arriba. Si necesitás otras resoluciones, ajusta los arrays `SIZES` o `FORMATS` en `scripts/optimize-images.mjs`.
