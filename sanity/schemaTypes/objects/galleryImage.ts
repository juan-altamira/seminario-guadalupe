import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Imagen de galería',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
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
      name: 'caption',
      title: 'Descripción',
      type: 'string'
    })
  ]
});
