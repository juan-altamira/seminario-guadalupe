import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Páginas',
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
      name: 'hero',
      title: 'Hero',
      type: 'hero'
    }),
    defineField({
      name: 'cuerpo',
      title: 'Contenido',
      type: 'blockContent'
    }),
    defineField({
      name: 'galeria',
      title: 'Galería',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryImage' })]
    })
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'slug.current'
    }
  }
});
