import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'photo',
  title: 'Galería de fotos',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96
      }
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          validation: (rule) => rule.required()
        }
      ]
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text'
    }),
    defineField({
      name: 'eventoRelacionado',
      title: 'Evento relacionado',
      type: 'reference',
      to: [{ type: 'event' }]
    })
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'imagen'
    }
  }
});
