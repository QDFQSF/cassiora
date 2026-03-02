import { defineType, defineField } from 'sanity'

export const pageAccueil = defineType({
  name: 'pageAccueil',
  title: '🏠 Page d\'accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre principal',
      type: 'string',
      description: 'Ex: Cuisine artisanale,',
      initialValue: 'Cuisine artisanale,',
    }),
    defineField({
      name: 'sousTitre',
      title: 'Sous-titre (en or)',
      type: 'string',
      description: 'Ex: saveurs généreuses',
      initialValue: 'saveurs généreuses',
    }),
    defineField({
      name: 'description',
      title: 'Description (paragraphe d\'accueil)',
      type: 'text',
      rows: 4,
      description: 'Le texte de présentation sous le titre',
    }),
    defineField({
      name: 'citation',
      title: 'Citation / phrase signature',
      type: 'string',
      description: 'La citation affichée dans la section du milieu',
      initialValue: 'Cuisiner, c\'est partager. Chaque plat est une invitation à la table de l\'essentiel.',
    }),
    defineField({
      name: 'ctaPrincipal',
      title: 'Bouton principal',
      type: 'string',
      initialValue: 'Découvrir le traiteur',
    }),
  ],
  preview: {
    select: { title: 'titre' },
    prepare: () => ({ title: 'Page d\'accueil' }),
  },
})
