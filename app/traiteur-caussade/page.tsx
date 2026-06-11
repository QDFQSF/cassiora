import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Caussade — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur à Caussade, entre Cahors et Montauban. Cassiora accompagne vos événements familiaux — anniversaires, baptêmes, communions — avec des menus artisanaux chaleureux et sur mesure.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-caussade" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Caussade",
        badge: "Entre Lot & Tarn-et-Garonne",
        intro: "Cuisine artisanale pour vos fêtes familiales à Caussade et alentours — anniversaires, baptêmes, communions et repas de famille entre Cahors et Montauban.",
        paragraphs: [
          "Idéalement située entre Cahors et Montauban, Caussade est une ville à taille humaine où la vie locale et les célébrations familiales tiennent une place essentielle. Cassiora Traiteur est présent à vos côtés pour vos anniversaires, baptêmes, communions et grands repas de famille. Nous concevons des buffets chaleureux qui rassemblent petits et grands autour de saveurs généreuses et sincères.",
          "Anniversaire surprise dans la salle des fêtes du village, baptême en plein jardin, repas de communion dans la propriété familiale — chaque fête mérite une table qui lui ressemble. Nos formules s'adaptent à tous les budgets et toutes les configurations, avec une attention particulière portée aux régimes alimentaires spécifiques et aux allergies, pour que personne ne soit laissé de côté.",
          "Caussade nous tient particulièrement à cœur : c'est une clientèle de proximité, des familles qui se font confiance et se recommandent. C'est cet esprit de convivialité et de générosité que nous mettons dans chacun de nos plats, préparés maison avec des produits de saison soigneusement choisis dans la région.",
        ],
      }}
    />
  );
}
