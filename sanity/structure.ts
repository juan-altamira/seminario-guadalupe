import type { StructureResolver } from 'sanity/desk';

const singletonListItem = (S: Parameters<StructureResolver>[0], options: { title: string; id: string; schemaType: string }) =>
  S.listItem()
    .title(options.title)
    .id(options.id)
    .child(S.document().schemaType(options.schemaType).documentId(options.id));

const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido del Seminario')
    .items([
      singletonListItem(S, {
        title: 'Ajustes generales',
        id: 'siteSettings',
        schemaType: 'siteSettings'
      }),
      singletonListItem(S, {
        title: 'Configuración de donaciones',
        id: 'donationConfig',
        schemaType: 'donationConfig'
      }),
      S.divider(),
      S.documentTypeListItem('event').title('Eventos'),
      S.documentTypeListItem('article').title('Artículos'),
      S.documentTypeListItem('resource').title('Recursos'),
      S.documentTypeListItem('program').title('Programas'),
      S.documentTypeListItem('person').title('Personas'),
      S.documentTypeListItem('photo').title('Galería de fotos'),
      S.documentTypeListItem('page').title('Páginas')
    ]);

export default structure;
