import { defineType, defineField } from 'sanity'

export const boxSchema = defineType({
  name: 'box',
  title: '📦 Box gourmande',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom de la box',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'prix',
      title: 'Prix',
      type: 'string',
      description: 'Ex: 35€, À partir de 45€, Sur devis',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu de la box (liste)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'highlight',
      title: '⭐ Box mise en avant ?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Photo de la box',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'prix', media: 'image' },
  },
})
