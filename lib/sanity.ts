import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Queries GROQ
export const queries = {
  // Page d'accueil
  pageAccueil: `*[_type == "pageAccueil"][0]{
    titre, sousTitre, description, ctaPrincipal, ctaSecondaire
  }`,

  // Menus
  menus: `*[_type == "menu"] | order(ordre asc) {
    _id, nom, prix, description, highlight, plats
  }`,

  // Offres spéciales actives
  offresActives: `*[_type == "offres" && active == true] | order(_createdAt desc) {
    _id, titre, description, prix, validiteJusquau, badge, details, cta
  }`,

  // Box
  boxes: `*[_type == "box"] | order(ordre asc) {
    _id, nom, prix, description, contenu, highlight, image
  }`,

  // Ateliers
  ateliers: `*[_type == "atelier"] | order(ordre asc) {
    _id, titre, duree, participants, description, prix, image
  }`,

  // Extraits livre
  extraitsLivre: `*[_type == "livreExtrait"] | order(ordre asc) {
    _id, titre, description, categorie
  }`,

  // Avis clients
  avis: `*[_type == "avis" && visible == true] | order(ordre asc) {
    _id, nom, occasion, note, texte
  }`,
}
