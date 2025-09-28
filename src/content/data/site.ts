import type { SiteSettings } from '$content/models';

export const siteSettings: SiteSettings = {
  nombre: 'Seminario "Nuestra Señora de Guadalupe"',
  eslogan: 'Casa de discernimiento y formación sacerdotal para Santa Fe y Rafaela',
  direccion: 'Arquidiócesis de Santa Fe de la Vera Cruz · Diócesis de Rafaela',
  telefono: '+54 342 459 3929',
  email: 'contacto@seminarioguadalupe.org',
  redes: [
    { nombre: 'Instagram', url: 'https://instagram.com/seminarioguadalupe' },
    { nombre: 'Facebook', url: 'https://www.facebook.com/seminarioguadalupe' },
    { nombre: 'WhatsApp', url: 'https://wa.me/543426132313' }
  ],
  legales: {
    privacidad: '/legales/privacidad',
    cookies: '/legales/cookies',
    aviso: '/legales/aviso'
  }
};
