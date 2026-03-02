import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Schemas
import { menuSchema } from './sanity/schemas/menu'
import { offresSchema } from './sanity/schemas/offres'
import { avisSchema } from './sanity/schemas/avis'
import { boxSchema } from './sanity/schemas/box'
import { atelierSchema } from './sanity/schemas/atelier'
import { livreExtrait } from './sanity/schemas/livreExtrait'
import { pageAccueil } from './sanity/schemas/pageAccueil'
import { waitlistSchema } from './sanity/schemas/waitlist'

// Tool
import { EnvoiLancementTool } from './sanity/tools/EnvoiLancementTool'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: '🍽️ Cassiora — Administration',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Administration Cassiora')
          .items([
            S.listItem()
              .title('🏠 Page d\'accueil')
              .child(S.document().schemaType('pageAccueil').documentId('pageAccueil')),
            S.divider(),
            S.listItem()
              .title('🍽️ Menus')
              .child(S.documentTypeList('menu').title('Menus')),
            S.listItem()
              .title('⭐ Offres spéciales')
              .child(S.documentTypeList('offres').title('Offres spéciales')),
            S.listItem()
              .title('📦 Box gourmandes')
              .child(S.documentTypeList('box').title('Box gourmandes')),
            S.listItem()
              .title('👨‍🍳 Ateliers')
              .child(S.documentTypeList('atelier').title('Ateliers')),
            S.listItem()
              .title('📖 Livre — extraits')
              .child(S.documentTypeList('livreExtrait').title('Extraits du livre')),
            S.listItem()
              .title('⭐ Avis clients')
              .child(S.documentTypeList('avis').title('Avis clients')),
            S.divider(),
            S.listItem()
              .title('📋 Liste d\'attente')
              .child(S.documentTypeList('waitlist').title('Inscrits liste d\'attente')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [
      pageAccueil,
      menuSchema,
      offresSchema,
      avisSchema,
      boxSchema,
      atelierSchema,
      livreExtrait,
      waitlistSchema,
    ],
  },

  tools: (prev) => [
    ...prev,
    {
      name: 'envoi-lancement',
      title: '📧 Envoi liste d\'attente',
      component: EnvoiLancementTool,
    },
  ],
})