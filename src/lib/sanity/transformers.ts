import type { PortableTextBlock } from '@portabletext/types';
import type {
  DonacionConfig,
  Evento,
  PageContent,
  Persona,
  Programa,
  Recurso,
  SiteSettings
} from '$content/models';

type Maybe<T> = T | null | undefined;

type SanityImage = {
  url?: string;
  alt?: string;
};

type WithSlug<T> = T & { slug: string };

export type EventDocument = {
  slug: string;
  titulo: string;
  descripcion?: string;
  cuerpo?: PortableTextBlock[];
  fechaInicio: string;
  fechaFin?: string;
  estado?: string;
  lugar?: Evento['lugar'];
  imagen?: SanityImage;
};

export type ProgramDocument = {
  slug: string;
  titulo: string;
  resumen?: string;
  cuerpo?: PortableTextBlock[];
  imagen?: SanityImage;
};

export type PersonDocument = {
  slug: string;
  nombre: string;
  rol: string;
  bio?: PortableTextBlock[];
  foto?: SanityImage;
};

export type PageDocument = {
  slug: string;
  titulo: string;
  hero?: {
    titulo?: string;
    subtitulo?: string;
    cta?: { label?: string; href?: string };
    imagen?: SanityImage;
  };
  cuerpo?: PortableTextBlock[];
  galeria?: { image?: SanityImage; caption?: string }[];
};

export type ResourceDocument = {
  slug: string;
  titulo: string;
  tipo: Recurso['tipo'];
  resumen?: string;
  contenido?: PortableTextBlock[];
  archivoPdf?: string;
  portada?: SanityImage;
  fechaPublicacion: string;
};

export type DonationDocument = {
  titulo?: string;
  montosSugeridos?: number[];
  metodos?: {
    tipo: DonacionConfig['metodos'][number]['tipo'];
    descripcion?: string;
    datos?: { label?: string; value?: string }[];
  }[];
  stripePublicKey?: string;
};

function imageToString(image: Maybe<SanityImage>): string | undefined {
  return image?.url ?? undefined;
}

function safeBlocks(blocks: Maybe<PortableTextBlock[]>): PortableTextBlock[] | undefined {
  if (!blocks || !Array.isArray(blocks)) return undefined;
  return blocks;
}

function normalizeDate(date?: string): string | null {
  if (!date) return null;
  // date strings come as YYYY-MM-DD; keep that format for lexicographical compare
  return date.length >= 10 ? date.slice(0, 10) : date;
}

function computeEventState(fechaInicio: string, fechaFin?: string): Evento['estado'] {
  const today = new Date().toISOString().slice(0, 10);
  const start = normalizeDate(fechaInicio);
  const end = normalizeDate(fechaFin) ?? start;

  if (!start) {
    // fallback to upcoming to avoid hiding the card if date missing
    return 'proximo';
  }

  if (end && end < today) {
    return 'pasado';
  }

  return 'proximo';
}

export function mapSiteSettings(doc: Maybe<SiteSettings>): SiteSettings | null {
  if (!doc) return null;
  return doc;
}

export function mapDonationConfig(doc: Maybe<DonationDocument>): DonacionConfig | null {
  if (!doc) return null;
  return {
    montosSugeridos: doc.montosSugeridos ?? [1000, 3000, 5000],
    metodos:
      doc.metodos?.map((metodo) => ({
        tipo: metodo.tipo,
        descripcion: metodo.descripcion ?? '',
        datos: metodo.datos
          ? Object.fromEntries(
              metodo.datos
                .filter((item): item is { label: string; value: string } => Boolean(item.label && item.value))
                .map((item) => [item.label, item.value])
            )
          : undefined
      })) ?? [],
    stripePublicKey: doc.stripePublicKey
  };
}

function deriveDescription(doc: { descripcion?: string; cuerpo?: PortableTextBlock[] }): string | undefined {
  if (doc.descripcion) return doc.descripcion;
  const firstBlock = doc.cuerpo?.find((block) => block._type === 'block');
  if (firstBlock && 'children' in firstBlock && Array.isArray(firstBlock.children)) {
    return firstBlock.children.map((child: any) => child.text ?? '').join(' ').trim() || undefined;
  }
  return undefined;
}

export function mapEvent(doc: EventDocument): Evento {
  return {
    slug: doc.slug,
    titulo: doc.titulo,
    fechaInicio: doc.fechaInicio,
    fechaFin: doc.fechaFin,
    estado: computeEventState(doc.fechaInicio, doc.fechaFin),
    lugar: doc.lugar,
    descripcion: deriveDescription(doc),
    imagen: imageToString(doc.imagen),
    imagenAlt: doc.imagen?.alt,
    cuerpoPortable: safeBlocks(doc.cuerpo)
  };
}

export function mapProgram(doc: ProgramDocument): Programa {
  return {
    slug: doc.slug,
    titulo: doc.titulo,
    resumen: doc.resumen ?? '',
    cuerpoPortable: safeBlocks(doc.cuerpo),
    imagen: imageToString(doc.imagen),
    imagenAlt: doc.imagen?.alt
  };
}

export function mapPerson(doc: PersonDocument): Persona {
  return {
    slug: doc.slug,
    nombre: doc.nombre,
    rol: doc.rol,
    bio: deriveDescription({ descripcion: undefined, cuerpo: doc.bio }) ?? '',
    bioPortable: safeBlocks(doc.bio),
    foto: imageToString(doc.foto),
    fotoAlt: doc.foto?.alt
  };
}

export function mapPage(doc: PageDocument): PageContent {
  return {
    slug: doc.slug,
    titulo: doc.titulo,
    hero: doc.hero
      ? {
          titulo: doc.hero.titulo ?? doc.titulo,
          subtitulo: doc.hero.subtitulo,
          cta: doc.hero.cta?.label && doc.hero.cta?.href ? { label: doc.hero.cta.label, href: doc.hero.cta.href } : undefined,
          imagen: imageToString(doc.hero.imagen),
          imagenAlt: doc.hero.imagen?.alt
        }
      : undefined,
    cuerpoPortable: safeBlocks(doc.cuerpo),
    galeria: doc.galeria
      ?.filter((item): item is { image: SanityImage; caption?: string } => Boolean(item.image?.url))
      .map((item) => ({
        src: item.image.url as string,
        alt: item.image.alt ?? item.caption ?? doc.titulo
      }))
  };
}

export function mapResource(doc: ResourceDocument): Recurso {
  return {
    slug: doc.slug,
    titulo: doc.titulo,
    tipo: doc.tipo,
    resumen: doc.resumen,
    contenidoPortable: safeBlocks(doc.contenido),
    archivoPdf: doc.archivoPdf ?? undefined,
    fechaPublicacion: doc.fechaPublicacion,
    portada: imageToString(doc.portada),
    portadaAlt: doc.portada?.alt
  };
}
