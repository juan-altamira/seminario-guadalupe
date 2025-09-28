import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'person',
  title: 'Personas',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'rol',
      title: 'Rol',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'blockContent'
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
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
      type: 'number',
      description: 'Usá números bajos para que aparezca al inicio de la lista.'
    })
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'rol',
      media: 'foto'
    }
  }
});
