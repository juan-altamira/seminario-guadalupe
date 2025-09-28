import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'donationConfig',
  title: 'Configuración de donaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Nombre de la campaña',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'montosSugeridos',
      title: 'Montos sugeridos',
      type: 'array',
      of: [defineArrayMember({ type: 'number' })],
      validation: (rule) => rule
        .required()
        .min(1)
        .error('Agregá al menos un monto sugerido.'),
      options: {
        sortable: true
      }
    }),
    defineField({
      name: 'metodos',
      title: 'Métodos de donación',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'tipo',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Pago online', value: 'online' },
                  { title: 'Transferencia', value: 'transferencia' },
                  { title: 'App / billetera', value: 'app' }
                ]
              },
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'descripcion',
              title: 'Descripción',
              type: 'string',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'datos',
              title: 'Datos para transferencias',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Etiqueta',
                      type: 'string',
                      validation: (rule) => rule.required()
                    }),
                    defineField({
                      name: 'value',
                      title: 'Dato',
                      type: 'string',
                      validation: (rule) => rule.required()
                    })
                  ]
                })
              ]
            })
          ],
          preview: {
            select: {
              title: 'tipo',
              subtitle: 'descripcion'
            }
          }
        })
      ]
    }),
    defineField({
      name: 'stripePublicKey',
      title: 'Stripe public key',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'titulo'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Configuración'
      };
    }
  }
});
