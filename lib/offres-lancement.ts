export const OFFRES_LANCEMENT = [
  {
    _id: "lancement-1",
    titre: "Brunch XXL / L'Alliance Gourmande",
    badge: "Offre de lancement",
    description:
      "Pour toute Box Brunch 8-10 pers achetée, la box Alliance Gourmande 2-3 pers à -50%.",
    prix: "106€ au lieu de 122€ — soit 16€ d'économie",
    details: [
      "Box Brunch XXL 8-10 personnes",
      "Box Alliance Gourmande 2-3 pers à -50%",
      "16€ d'économie",
    ],
    cta: "Commander maintenant",
    active: true,
    validiteJusquau: "2026-04-30",
    nonCumulable: true,
  },
  {
    _id: "lancement-2",
    titre: "Pack Découverte Gourmand",
    badge: "Offre de lancement",
    description: "Pour toute Box commandée, un mini assortiment sucré offert.",
    details: ["Cookies", "Brownie", "Muffins offerts"],
    cta: "Commander maintenant",
    active: true,
    validiteJusquau: "2026-04-30",
    nonCumulable: true,
  },
  {
    _id: "lancement-3",
    titre: "Le Duo Gourmand",
    badge: "Offre de lancement",
    description: "Pour tout achat d'une Box, la seconde passe à -15%.",
    cta: "Commander maintenant",
    active: true,
    validiteJusquau: "2026-04-30",
    nonCumulable: true,
  },
  {
    _id: "lancement-4",
    titre: "La Boîte à Goûter",
    badge: "Offre de lancement",
    description:
      "Pour un mois de goûters acheté, deux semaines supplémentaires offertes. Soit 30 goûters pour le prix de 20.",
    prix: "36€ au lieu de 58€",
    cta: "Commander maintenant",
    active: true,
    validiteJusquau: "2026-04-30",
    nonCumulable: true,
  },
]

const DEBUT = new Date('2026-03-30T00:00:00')
const FIN = new Date('2026-04-30T23:59:59')

export function getOffresLancementActives() {
  const now = new Date()
  return OFFRES_LANCEMENT.map(offre => ({
    ...offre,
    active: now >= DEBUT && now <= FIN,
    bientot: now < DEBUT,
  }))
}
