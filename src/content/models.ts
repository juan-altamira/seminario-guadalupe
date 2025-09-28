import type { PortableTextBlock } from '@portabletext/types';

export type SiteSettings = {
  nombre: string;
  eslogan?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  redes?: { nombre: string; url: string }[];
  legales?: {
    privacidad: string;
    cookies: string;
    aviso: string;
  };
};

export type Hero = {
  titulo: string;
  subtitulo?: string;
  cta?: { label: string; href: string };
  imagen?: string;
  imagenAlt?: string;
};

export type PageContent = {
  slug: string;
  titulo: string;
  hero?: Hero;
  cuerpo?: string;
  cuerpoPortable?: PortableTextBlock[];
  galeria?: { src: string; alt: string }[];
};

export type Persona = {
  slug: string;
  nombre: string;
  rol: string;
  bio: string;
  bioPortable?: PortableTextBlock[];
  foto?: string;
  fotoAlt?: string;
};

export type Programa = {
  slug: string;
  titulo: string;
  resumen: string;
  cuerpo?: string;
  cuerpoPortable?: PortableTextBlock[];
  imagen?: string;
  imagenAlt?: string;
};

export type EventoEstado = 'proximo' | 'pasado';

export type Evento = {
  slug: string;
  titulo: string;
  fechaInicio: string;
  fechaFin?: string;
  imagen?: string;
  imagenAlt?: string;
  descripcion?: string;
  cuerpoPortable?: PortableTextBlock[];
  lugar?: {
    nombre: string;
    direccion?: string;
    mapa?: string;
  };
  estado: EventoEstado;
};

export type RecursoTipo = 'pdf' | 'articulo';

export type Recurso = {
  slug: string;
  titulo: string;
  tipo: RecursoTipo;
  fechaPublicacion: string;
  portada?: string;
  portadaAlt?: string;
  archivoPdf?: string;
  contenido?: string;
  contenidoPortable?: PortableTextBlock[];
  resumen?: string;
};

export type DonacionMetodo = 'online' | 'transferencia' | 'app';

export type DonacionConfig = {
  montosSugeridos: number[];
  metodos: {
    tipo: DonacionMetodo;
    descripcion: string;
    datos?: Record<string, string>;
  }[];
  stripePublicKey?: string;
};
