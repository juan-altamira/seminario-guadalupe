import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Ajustes generales',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del sitio',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'eslogan',
      title: 'Eslogan',
      type: 'string'
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'string'
    }),
    defineField({
      name: 'telefono',
      title: 'Teléfono',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'redes',
      title: 'Redes sociales',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })]
    }),
    defineField({
      name: 'legales',
      title: 'Enlaces legales',
      type: 'object',
      fields: [
        defineField({
          name: 'privacidad',
          title: 'Política de privacidad',
          type: 'url'
        }),
        defineField({
          name: 'cookies',
          title: 'Política de cookies',
          type: 'url'
        }),
        defineField({
          name: 'aviso',
          title: 'Aviso legal',
          type: 'url'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'eslogan'
    }
  }
});
