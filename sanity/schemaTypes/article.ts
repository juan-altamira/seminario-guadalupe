import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Artículos',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'contenido',
      title: 'Contenido',
      type: 'blockContent',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'portada',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
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
      name: 'fechaPublicacion',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'fechaPublicacion',
      media: 'portada'
    }
  }
});
