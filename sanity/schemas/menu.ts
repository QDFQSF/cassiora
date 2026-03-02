import { defineType, defineField } from 'sanity'

export const menuSchema = defineType({
  name: 'menu',
  title: '🍽️ Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom du menu',
      type: 'string',
      validation: (R) => R.required(),
      description: 'Ex: Menu Essentiel, Menu Signature, Menu Prestige',
    }),
    defineField({
      name: 'prix',
      title: 'Prix',
      type: 'string',
      description: 'Ex: 45€ par personne, Sur devis, À partir de 65€',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'plats',
      title: 'Contenu du menu (liste des plats)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ajoutez chaque plat ou étape du menu',
    }),
    defineField({
      name: 'highlight',
      title: '⭐ Menu mis en avant ?',
      type: 'boolean',
      description: 'Affiche un badge "Le plus populaire"',
      initialValue: false,
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: '1 = affiché en premier',
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'prix' },
  },
  orderings: [{ title: 'Ordre', name: 'ordre', by: [{ field: 'ordre', direction: 'asc' }] }],
})
