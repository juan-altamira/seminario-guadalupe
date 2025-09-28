import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'program',
  title: 'Programas',
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
      name: 'cuerpo',
      title: 'Contenido',
      type: 'blockContent'
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
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
      name: 'orden',
      title: 'Orden',
      type: 'number'
    })
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'resumen',
      media: 'imagen'
    }
  }
});
