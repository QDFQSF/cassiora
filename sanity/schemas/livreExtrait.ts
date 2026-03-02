import { defineType, defineField } from 'sanity'

export const livreExtrait = defineType({
  name: 'livreExtrait',
  title: '📖 Extrait du livre',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Nom de la recette',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Salé', value: 'Salé' },
          { title: 'Sucré', value: 'Sucré' },
          { title: 'Entrée', value: 'Entrée' },
          { title: 'Dessert', value: 'Dessert' },
          { title: 'Plat', value: 'Plat' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description courte (teaser)',
      type: 'text',
      rows: 2,
      description: 'Une courte phrase qui donne envie, affichée sur la carte',
    }),
    defineField({
      name: 'temps',
      title: 'Temps de préparation',
      type: 'string',
      description: 'Ex: 30 min, 1h, 1h30',
    }),
    defineField({
      name: 'portions',
      title: 'Nombre de portions',
      type: 'string',
      description: 'Ex: 4 personnes, 6 parts, 12 biscuits',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingrédients',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ajoutez chaque ingrédient (Ex: 200g de farine)',
    }),
    defineField({
      name: 'etapes',
      title: 'Étapes de la recette',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Ajoutez chaque étape dans l\'ordre',
    }),
    defineField({
      name: 'conseil',
      title: 'Conseil du chef (optionnel)',
      type: 'text',
      rows: 2,
      description: 'Une astuce ou variante à partager',
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'categorie' },
  },
})