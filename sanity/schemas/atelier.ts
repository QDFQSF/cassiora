import { defineType, defineField } from 'sanity'

export const atelierSchema = defineType({
  name: 'atelier',
  title: '👨‍🍳 Atelier',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre de l\'atelier',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'duree',
      title: 'Durée',
      type: 'string',
      description: 'Ex: 3h, 3h30, Sur mesure',
    }),
    defineField({
      name: 'participants',
      title: 'Nombre de participants',
      type: 'string',
      description: 'Ex: 4 à 8 personnes, 1 à 2 personnes',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'prix',
      title: 'Prix',
      type: 'string',
      description: 'Ex: 55€ par personne, Sur devis',
    }),
    defineField({
      name: 'image',
      title: 'Photo de l\'atelier',
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
    select: { title: 'titre', subtitle: 'duree', media: 'image' },
  },
})
