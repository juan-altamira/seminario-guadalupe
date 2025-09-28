import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'text'
    }),
    defineField({
      name: 'cta',
      title: 'Llamada a la acción',
      type: 'cta'
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => rule.required()
        }
      ]
    })
  ]
});
