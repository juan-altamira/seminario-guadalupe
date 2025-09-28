import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Eventos',
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
      name: 'descripcion',
      title: 'Descripción breve',
      type: 'text'
    }),
    defineField({
      name: 'cuerpo',
      title: 'Contenido',
      type: 'blockContent'
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen destacada',
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
      name: 'fechaInicio',
      title: 'Fecha de inicio',
      type: 'date',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'fechaFin',
      title: 'Fecha de fin',
      type: 'date'
    }),
    defineField({
      name: 'estado',
      title: 'Estado',
      type: 'string',
      initialValue: 'proximo',
      options: {
        layout: 'radio',
        list: [
          { title: 'Próximo', value: 'proximo' },
          { title: 'Pasado', value: 'pasado' }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'lugar',
      title: 'Lugar',
      type: 'location'
    })
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'imagen',
      subtitle: 'fechaInicio'
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title,
        subtitle: subtitle ? `Inicio: ${subtitle}` : undefined,
        media
      };
    }
  }
});
