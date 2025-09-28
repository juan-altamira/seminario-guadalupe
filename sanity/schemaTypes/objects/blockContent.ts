import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Título 2', value: 'h2' },
        { title: 'Título 3', value: 'h3' },
        { title: 'Cita', value: 'blockquote' }
      ],
      lists: [{ title: 'Lista', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Negrita', value: 'strong' },
          { title: 'Cursiva', value: 'em' }
        ],
        annotations: [
          defineArrayMember({
            type: 'object',
            name: 'link',
            title: 'Enlace',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) => rule.required()
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Abrir en pestaña nueva',
                initialValue: false
              }
            ]
          })
        ]
      }
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          validation: (rule) => rule.required().error('Agregá el texto alternativo.')
        }
      ]
    })
  ]
});
