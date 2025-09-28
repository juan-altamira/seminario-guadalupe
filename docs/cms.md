# CMS del Seminario con Sanity

Este proyecto ahora integra un panel de administración en **Sanity** para que una única persona (p. ej. el rector) pueda agregar y editar eventos, artículos, recursos, fotos y los datos generales del sitio sin tocar código.

## 1. Crear el proyecto en Sanity

1. Ingresá a [https://www.sanity.io/](https://www.sanity.io/) y creá una cuenta (puede ser con Google o email).
2. Creá un nuevo proyecto, elegí el _dataset_ `production` (o el nombre que prefieras) y dejalo como **Privado** para que sólo los usuarios autenticados puedan leer/escribir.
3. Desde la sección **Project > API**, generá un token con permisos `read` para el sitio (opcional si el dataset es público) y conservá el token para las variables de entorno.
4. En **Project > Team**, dejá únicamente al administrador. Si querés que nadie más pueda entrar al panel, no invites a otros usuarios y, si fuera necesario, eliminá los miembros existentes.

## 2. Variables de entorno

Duplicá `.env.example` en `.env` y completá los valores:

```
SANITY_PROJECT_ID=xxxxxxxx
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_TOKEN= # opcional si el dataset es público
SANITY_USE_CDN=true

PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_USE_CDN=true
```

- `SANITY_TOKEN` se usa sólo si dejás el dataset como privado; en ese caso el valor debe tener permisos **Read**.
- Las variables con prefijo `PUBLIC_` se exponen en el navegador únicamente para generar URLs de imágenes.

## 3. Ejecutar el panel de administración

Con las variables configuradas:

```bash
pnpm cms:dev
```

Esto levanta el Studio en `http://localhost:3333`. El administrador puede ingresar usando la misma cuenta de Sanity. Para desplegar el Studio en la nube (Sanity hosteado) usá:

```bash
pnpm cms:deploy
```

También podés abrir el dashboard del proyecto directamente con:

```bash
pnpm cms:manage
```

## 4. Tipos de contenido disponibles

- **Ajustes generales**: nombre del sitio, contacto, enlaces legales y redes sociales.
- **Configuración de donaciones**: montos sugeridos, métodos disponibles y claves públicas.
- **Eventos**: título, fechas, descripción extensa (Portable Text), imagen destacada y lugar.
- **Artículos**: notas largas con portada, resumen y fecha de publicación.
- **Recursos**: materiales en PDF o artículos (se reutilizan en la sección Recursos del sitio).
- **Programas**: áreas de formación con cuerpo editable.
- **Personas**: equipo formador y colaboradores.
- **Galería de fotos**: imágenes sueltas para usar en distintas secciones.
- **Páginas**: permite editar secciones como “Institución”, “Programas” o “Equipo” (hero + cuerpo + galería).

Los documentos de **Ajustes** y **Donaciones** funcionan como _singleton_: siempre edita el mismo registro.

## 5. Flujo de publicación

1. Entrá a `pnpm cms:dev` (o al Studio desplegado).
2. Creá o editá el documento deseado.
3. Al finalizar, tocá **Publish**. El sitio consume únicamente el contenido publicado.
4. Las imágenes se cargan directamente en el Studio; no hace falta optimizarlas manualmente.

## 6. ¿Qué pasa si Sanity no está configurado?

El sitio mantiene los datos estáticos que ya existían. Si las variables de entorno no están presentes, SvelteKit usará esos datos como _fallback_. Esto te permite migrar contenido gradualmente.

## 7. Operación con un solo administrador

- El administrador (el cura) sólo necesita recordar su usuario de Sanity.
- Como el dataset es privado y no hay otros miembros, nadie más puede editar.
- Si querés reforzar la seguridad, activá la autenticación de dos pasos en Sanity.

Con esto queda completo el flujo “subir contenido como en una red social”: abrir el Studio, cargar textos e imágenes y publicar.
