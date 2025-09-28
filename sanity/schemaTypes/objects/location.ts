import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'location',
  title: 'Lugar',
  type: 'object',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del lugar',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'string'
    }),
    defineField({
      name: 'mapa',
      title: 'Enlace a mapa',
      type: 'url'
    })
  ]
});
