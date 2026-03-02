import { defineType, defineField } from 'sanity'

export const avisSchema = defineType({
  name: 'avis',
  title: '⭐ Avis client',
  type: 'document',
  fields: [
    defineField({
      name: 'visible',
      title: '👁️ Visible sur le site',
      type: 'boolean',
      description: 'Décochez pour masquer cet avis sans le supprimer',
      initialValue: true,
    }),
    defineField({
      name: 'nom',
      title: 'Nom du client',
      type: 'string',
      validation: (R) => R.required(),
      description: 'Ex: Marie & Laurent, Famille Dupont...',
    }),
    defineField({
      name: 'occasion',
      title: 'Occasion / prestation',
      type: 'string',
      description: 'Ex: Mariage — 80 personnes, Atelier pâtisserie...',
    }),
    defineField({
      name: 'note',
      title: 'Note (étoiles)',
      type: 'number',
      validation: (R) => R.required().min(1).max(5),
      initialValue: 5,
      description: 'De 1 à 5 étoiles',
    }),
    defineField({
      name: 'texte',
      title: 'Témoignage',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'occasion' },
  },
})
