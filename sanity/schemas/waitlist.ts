import { defineType, defineField } from 'sanity'

export const waitlistSchema = defineType({
  name: 'waitlist',
  title: 'Liste d\'attente',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'prenom',
      title: 'Prénom',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Liste',
      type: 'string',
      options: {
        list: [
          { title: '📖 Livre de recettes', value: 'livre' },
          { title: '👨‍🍳 Ateliers culinaires', value: 'ateliers' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notifie',
      title: 'Notifié·e',
      type: 'boolean',
      description: 'Cochez après avoir envoyé le mail de lancement',
      initialValue: false,
    }),
    defineField({
      name: 'dateInscription',
      title: 'Date d\'inscription',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'type',
      notifie: 'notifie',
    },
    prepare({ title, subtitle, notifie }) {
      const emoji = subtitle === 'livre' ? '📖' : '👨‍🍳'
      const check = notifie ? ' ✅' : ''
      return {
        title: title + check,
        subtitle: emoji + ' ' + (subtitle === 'livre' ? 'Livre de recettes' : 'Ateliers'),
      }
    },
  },
})