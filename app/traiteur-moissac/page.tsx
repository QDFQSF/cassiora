import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Moissac — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur à Moissac, ville de l'abbaye et du tourisme fluvial. Cassiora accompagne vos réceptions estivales, événements au bord du Tarn et célébrations locales en Tarn-et-Garonne.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-moissac" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Moissac",
        badge: "Tarn-et-Garonne (82)",
        intro: "Cuisine artisanale pour vos réceptions estivales, événements fluviaux et célébrations locales à Moissac — ville de l'abbaye Saint-Pierre et du chasselas doré.",
        paragraphs: [
          "Moissac, ville de l'abbaye Saint-Pierre et du célèbre chasselas, est un joyau du Tarn-et-Garonne où se croisent le Tarn et le canal du Midi. En été, la ville s'anime de touristes fluviaux, de cyclistes sur la ViaRhôna et de festivaliers venus profiter de nombreux événements culturels. Cassiora Traiteur est le partenaire idéal pour vos réceptions estivales en plein air, cocktails au bord de l'eau et soirées conviviales sous les étoiles.",
          "La saison touristique à Moissac concentre une forte demande en restauration événementielle : vernissages, soirées privées dans les maisons de maître, repas de groupes de touristes ou de cyclistes... Nous apportons une cuisine légère, fraîche et de saison, en parfaite adéquation avec l'esprit ouvert et festif de la ville en période estivale.",
          "Hors saison, Moissac reste une ville active avec sa vie associative, ses célébrations familiales et ses événements municipaux. Nous y intervenons toute l'année avec la même qualité artisanale quel que soit le format : de la simple livraison d'un buffet froid à la mise en place complète d'un cocktail dînatoire soigné.",
        ],
      }}
    />
  );
}
