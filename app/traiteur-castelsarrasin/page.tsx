import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Castelsarrasin — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur à Castelsarrasin et dans le Tarn-et-Garonne. Cassiora accompagne vos événements municipaux, fêtes familiales et célébrations locales avec des prestations artisanales sur mesure.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-castelsarrasin" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Castelsarrasin",
        badge: "Tarn-et-Garonne (82)",
        intro: "Traiteur artisanal pour vos événements municipaux, associatifs et familiaux à Castelsarrasin — au cœur du Tarn-et-Garonne, entre Montauban et Moissac.",
        paragraphs: [
          "Castelsarrasin, sous-préfecture du Tarn-et-Garonne, est une ville à taille humaine avec une vie locale dynamique et chaleureuse. Événements municipaux, fêtes de quartier, inaugurations, repas de retraite, cérémonies associatives — autant d'occasions où la qualité de la table contribue à la réussite de la journée. Cassiora Traiteur s'investit dans ces moments de vie collective avec professionnalisme et sincérité.",
          "La proximité de Castelsarrasin avec Moissac et Montauban en fait un carrefour naturel pour notre activité dans le 82. Nous connaissons les salles de réception locales, les contraintes logistiques du territoire et les habitudes culinaires de la région — ce qui nous permet d'intervenir avec efficacité et de proposer des prestations parfaitement calibrées au contexte.",
          "Qu'il s'agisse d'un buffet pour un repas de fin d'année associatif, d'un cocktail pour l'inauguration d'un local commercial ou d'un grand repas de famille dans la salle des fêtes communale, nous mettons le même soin dans chaque préparation. Nos formules claires et nos tarifs transparents permettent à chacun de planifier sereinement son événement.",
        ],
      }}
    />
  );
}
