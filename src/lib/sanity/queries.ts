import groq from 'groq';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    nombre,
    eslogan,
    direccion,
    telefono,
    email,
    redes[]{nombre, url},
    legales
  }
`;

export const donationConfigQuery = groq`
  *[_type == "donationConfig" && _id == "donationConfig"][0]{
    titulo,
    montosSugeridos,
    metodos[]{
      tipo,
      descripcion,
      datos[]{label, value}
    },
    stripePublicKey
  }
`;

export const eventsQuery = groq`
  *[_type == "event"] | order(fechaInicio desc) {
    "slug": slug.current,
    titulo,
    descripcion,
    "cuerpo": coalesce(cuerpo, []),
    fechaInicio,
    fechaFin,
    estado,
    lugar,
    imagen {
      "url": asset->url,
      alt,
      asset
    }
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    "slug": slug.current,
    titulo,
    descripcion,
    "cuerpo": coalesce(cuerpo, []),
    fechaInicio,
    fechaFin,
    estado,
    lugar,
    imagen {
      "url": asset->url,
      alt,
      asset
    }
  }
`;

export const programsQuery = groq`
  *[_type == "program"] | order(coalesce(orden, 999) asc) {
    "slug": slug.current,
    titulo,
    resumen,
    "cuerpo": coalesce(cuerpo, []),
    imagen {
      "url": asset->url,
      alt,
      asset
    }
  }
`;

export const peopleQuery = groq`
  *[_type == "person"] | order(coalesce(orden, 999) asc) {
    "slug": slug.current,
    nombre,
    rol,
    "bio": coalesce(bio, []),
    foto {
      "url": asset->url,
      alt,
      asset
    }
  }
`;

export const pagesQuery = groq`
  *[_type == "page"] {
    "slug": slug.current,
    titulo,
    hero {
      titulo,
      subtitulo,
      cta,
      imagen {
        "url": image.asset->url,
        alt: image.alt,
        asset: image.asset
      }
    },
    "cuerpo": coalesce(cuerpo, []),
    galeria[]{
      image {
        asset->,
        alt
      },
      caption
    }
  }
`;

export const resourcesQuery = groq`
  *[_type == "resource"] | order(fechaPublicacion desc) {
    "slug": slug.current,
    titulo,
    tipo,
    resumen,
    "contenido": coalesce(contenido, []),
    "archivoPdf": archivoPdf.asset->url,
    portada {
      "url": asset->url,
      alt,
      asset
    },
    fechaPublicacion
  }
`;

export const articlesQuery = groq`
  *[_type == "article"] | order(fechaPublicacion desc) {
    "slug": slug.current,
    titulo,
    resumen,
    "contenido": coalesce(contenido, []),
    portada {
      "url": asset->url,
      alt,
      asset
    },
    fechaPublicacion
  }
`;

export const photosQuery = groq`
  *[_type == "photo"] | order(_createdAt desc) {
    "slug": slug.current,
    titulo,
    descripcion,
    imagen {
      "url": asset->url,
      alt,
      asset
    },
    eventoRelacionado->{
      "slug": slug.current,
      titulo
    }
  }
`;
