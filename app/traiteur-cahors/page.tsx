import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Cahors — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur artisanal à Cahors et dans le Lot (46). Cassiora sublime vos mariages dans les châteaux viticoles, événements culturels et réceptions au cœur du Quercy. Devis gratuit.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-cahors" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Cahors",
        badge: "Quercy · Lot (46)",
        intro: "Cuisine artisanale pour vos mariages, réceptions et événements dans la capitale du Lot — domaines viticoles, châteaux et lieux de caractère.",
        paragraphs: [
          "Cahors, capitale du Lot et berceau du vin noir, offre un cadre d'exception pour vos réceptions. Cassiora Traiteur accompagne vos événements dans les domaines viticoles de la vallée du Lot — de Cahors à Puy-l'Évêque, en passant par Luzech et Prayssac. Mariage dans un château, baptême en propriété viticole ou dîner de dégustation : nous créons des menus en harmonie avec les terroirs et les saveurs du Quercy.",
          "La ville de Cahors est aussi une scène culturelle animée, avec son Pont Valentré inscrit au patrimoine de l'UNESCO, ses festivals estivaux et ses événements associatifs tout au long de l'année. Que ce soit pour un cocktail dînatoire après un vernissage, un buffet lors d'un événement municipal ou un repas de gala dans une salle de caractère, Cassiora apporte son savoir-faire artisanal au cœur de la cité quercynoise.",
          "Nos formules s'adaptent à tous les formats d'événements cahorais — d'un déjeuner professionnel en salle de séminaire à une grande réception sous les étoiles du Lot. Chaque plat est préparé maison, avec des produits locaux soigneusement sélectionnés pour refléter la richesse gastronomique de cette région.",
        ],
      }}
    />
  );
}
