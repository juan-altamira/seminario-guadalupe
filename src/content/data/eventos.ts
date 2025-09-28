import type { Evento } from '$content/models';

export const eventos: Evento[] = [
  {
    slug: 'domingo-buen-pastor-2025',
    titulo: 'Domingo del Buen Pastor 2025',
    fechaInicio: '2025-05-11',
    descripcion:
      'Celebración diocesana con adoración, testimonios vocacionales y envío misionero de los seminaristas.',
    imagen: 'domingo-buen-pastor-2025',
    lugar: {
      nombre: 'Seminario "Nuestra Señora de Guadalupe"',
      direccion: 'Santa Fe, Argentina',
      mapa: 'https://maps.google.com/?q=Seminario+Nuestra+Se%C3%B1ora+de+Guadalupe+Santa+Fe'
    },
    estado: 'proximo'
  },
  {
    slug: 'corpus-christi-2025',
    titulo: 'Corpus Christi en la Catedral',
    fechaInicio: '2025-06-22',
    descripcion:
      'Los seminaristas animan la procesión y la oración eucarística junto al obispo y la comunidad diocesana.',
    imagen: 'corpus-christi-2025',
    lugar: {
      nombre: 'Catedral Metropolitana de Santa Fe',
      direccion: 'San Jerónimo 1168, Santa Fe',
      mapa: 'https://maps.google.com/?q=Catedral+Metropolitana+de+Santa+Fe'
    },
    estado: 'proximo'
  },
  {
    slug: 'peregrinacion-guadalupe-2024',
    titulo: 'Peregrinación a la Basílica de Guadalupe',
    fechaInicio: '2024-09-07',
    descripcion:
      'Compartimos la misa y la peregrinación confiando la vocación a la Madre y dando testimonio junto a los fieles.',
    imagen: 'peregrinacion-guadalupe-2024',
    lugar: {
      nombre: 'Basílica de Guadalupe',
      direccion: 'Javier de la Rosa 623, Santa Fe',
      mapa: 'https://maps.google.com/?q=Bas%C3%ADlica+de+Guadalupe+Santa+Fe'
    },
    estado: 'pasado'
  },
  {
    slug: 'encuentro-seminarios-2024',
    titulo: 'Encuentro interseminarios 2024',
    fechaInicio: '2024-08-15',
    descripcion:
      'Jornada de estudio y fraternidad junto a otros seminarios para compartir la misión y fortalecer la comunión presbiteral.',
    imagen: 'encuentro-seminarios-2024',
    lugar: {
      nombre: 'Seminario "Nuestra Señora de Guadalupe"',
      direccion: 'Santa Fe, Argentina',
      mapa: 'https://maps.google.com/?q=Seminario+Nuestra+Se%C3%B1ora+de+Guadalupe+Santa+Fe'
    },
    estado: 'pasado'
  }
];
