import { defineType, defineField } from 'sanity'

export const offresSchema = defineType({
  name: 'offres',
  title: '⭐ Offre spéciale',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '✅ Offre active (visible sur le site)',
      type: 'boolean',
      description: 'Désactivez pour masquer cette offre sans la supprimer. L\'onglet "Offres spéciales" disparaît automatiquement si aucune offre n\'est active.',
      initialValue: true,
    }),
    defineField({
      name: 'titre',
      title: 'Titre de l\'offre',
      type: 'string',
      validation: (R) => R.required(),
      description: 'Ex: Menu Fête des Mères, Offre Printemps...',
    }),
    defineField({
      name: 'badge',
      title: 'Badge (optionnel)',
      type: 'string',
      description: 'Ex: Offre limitée, Nouveau, Exclusif',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'prix',
      title: 'Prix',
      type: 'string',
      description: 'Ex: 65€ par personne, À partir de 45€',
    }),
    defineField({
      name: 'validiteJusquau',
      title: 'Valide jusqu\'au',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
    defineField({
      name: 'details',
      title: 'Détail de l\'offre (liste)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: Entrée surprise, Plat signature, Dessert...',
    }),
    defineField({
      name: 'cta',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Réserver maintenant',
    }),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'active' },
    prepare({ title, subtitle }: { title: string; subtitle: boolean }) {
      return {
        title,
        subtitle: subtitle ? '✅ Active' : '⏸️ Désactivée',
      }
    },
  },
})
