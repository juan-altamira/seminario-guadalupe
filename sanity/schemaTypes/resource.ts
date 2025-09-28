import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resource',
  title: 'Recursos',
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
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Artículo', value: 'articulo' },
          { title: 'PDF', value: 'pdf' }
        ]
      },
      initialValue: 'articulo',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text'
    }),
    defineField({
      name: 'contenido',
      title: 'Contenido',
      type: 'blockContent'
    }),
    defineField({
      name: 'archivoPdf',
      title: 'Archivo PDF',
      type: 'file',
      options: {
        storeOriginalFilename: true
      }
    }),
    defineField({
      name: 'portada',
      title: 'Portada',
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
      subtitle: 'tipo',
      media: 'portada'
    }
  }
});
