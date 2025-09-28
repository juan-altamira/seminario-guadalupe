import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'socialLink',
  title: 'Red social',
  type: 'object',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required()
    })
  ]
});
