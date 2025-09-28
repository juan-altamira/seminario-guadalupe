import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Texto del botón',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'href',
      title: 'Enlace',
      type: 'url',
      validation: (rule) => rule.required()
    })
  ]
});
