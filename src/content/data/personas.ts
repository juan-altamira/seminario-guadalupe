import type { Persona } from '$content/models';

export const personas: Persona[] = [
  {
    slug: 'equipo-formador',
    nombre: 'Equipo formador',
    rol: 'Sacerdotes formadores',
    bio: 'Acompañan el discernimiento con dirección espiritual, acompañamiento humano y revisión comunitaria constante.',
    foto: 'seminaristas-formadores'
  },
  {
    slug: 'acompanamiento-laical',
    nombre: 'Colaboradores laicos y consagrados',
    rol: 'Servidores de la comunidad',
    bio: 'Sostienen el día a día con la catequesis, la formación académica y el servicio pastoral en parroquias y obras diocesanas.',
    foto: 'colaboradores-laicos'
  },
  {
    slug: 'comunidad-seminaristas',
    nombre: 'Comunidad de seminaristas',
    rol: 'Discernimiento y vida fraterna',
    bio: 'Integrada por jóvenes de Santa Fe y Rafaela que comparten oración, estudio y misión en comunión con las diócesis.',
    foto: 'comunidad-de-seminaristas'
  }
];
