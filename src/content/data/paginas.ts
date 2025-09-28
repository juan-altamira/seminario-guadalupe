import type { PageContent } from '$content/models';

export const paginas: PageContent[] = [
  {
    slug: 'institucion',
    titulo: 'Nuestra Institución',
    hero: {
      titulo: 'Casa de discernimiento y formación sacerdotal',
      subtitulo:
        'Buscamos configurar a cada seminarista con Jesús Buen Pastor, al servicio de Santa Fe y Rafaela.',
      cta: { label: 'Viví la experiencia vocacional', href: '/contacto' }
    },
    cuerpo:
      '<p>El Seminario "Nuestra Señora de Guadalupe" es la casa de discernimiento y formación sacerdotal de la Arquidiócesis de Santa Fe de la Vera Cruz y de la Diócesis de Rafaela. Nuestra vida diaria &mdash;oración, estudio, fraternidad y servicio pastoral&mdash; busca configurar a cada seminarista con Jesús Buen Pastor y Servidor. Bajo el amparo de Nuestra Señora de Guadalupe y con San Juan de Ávila como vicepatrono, cultivamos una espiritualidad de comunión con el obispo, el presbiterio, los consagrados, los laicos y la Iglesia entera.</p><p>Fundado en 1907 por Mons. Juan Agustín Boneo y reabierto en 1978 por Mons. Vicente Zazpe, el Seminario continúa su misión formando a quienes serán sacerdotes al servicio de Santa Fe y Rafaela. La historia no es solo recuerdo: es el suelo firme desde el cual vivimos hoy una vida comunitaria sencilla y exigente, centrada en la Eucaristía, la oración personal y comunitaria, el estudio filosófico-teológico serio y la inserción pastoral en parroquias y obras diocesanas.</p><p>Nuestra vida se hace visible en celebraciones y tiempos fuertes del año como el Corpus Christi, el Domingo del Buen Pastor y las jornadas vocacionales; y en gestos de fe popular como la peregrinación a la Basílica de Guadalupe, donde confiamos nuestra vocación a la Madre. También crecemos en comunión visitando y recibiendo otros seminarios: compartir la misa, el testimonio y el estudio ensancha el corazón y fortalece la fraternidad presbiteral desde ahora.</p>'
  },
  {
    slug: 'programas',
    titulo: 'Programas y Actividades',
    hero: {
      titulo: 'Itinerarios de formación y discernimiento',
      subtitulo:
        'Acompañamos los pasos vocacionales con experiencia comunitaria, estudio riguroso y servicio pastoral.'
    }
  },
  {
    slug: 'equipo',
    titulo: 'Equipo',
    hero: {
      titulo: 'Formadores y comunidad',
      subtitulo: 'Sacerdotes y laicos que acompañan el camino de cada seminarista.'
    }
  }
];
