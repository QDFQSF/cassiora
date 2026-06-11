import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Villefranche-de-Rouergue — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur à Villefranche-de-Rouergue, bastide médiévale de l'Aveyron. Cassiora accompagne vos événements associatifs, familiaux et culturels dans ce territoire frontalier riche en patrimoine.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-villefranche-de-rouergue" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Villefranche-de-Rouergue",
        badge: "Aveyron · Bastide médiévale",
        intro: "Traiteur artisanal pour vos événements dans la bastide de Villefranche-de-Rouergue — repas associatifs, célébrations familiales et réceptions dans des cadres chargés d'histoire.",
        paragraphs: [
          "Villefranche-de-Rouergue, bastide royale fondée au XIIIe siècle, est l'une des plus belles villes médiévales du Sud-Ouest. Ses ruelles à arcades, sa place Notre-Dame animée et son Abbaye des Augustins attirent chaque année des visiteurs venus de toute la France. Cassiora Traiteur rayonne jusqu'à ce territoire frontalier de l'Aveyron pour accompagner vos événements dans des décors chargés de siècles d'histoire.",
          "À Villefranche, la vie associative est particulièrement riche — associations culturelles, sportives et patrimoniales organisent tout au long de l'année repas, banquets et soirées festives. Nous intervenons pour des événements associatifs, des repas de famille en salle communale, des anniversaires et des célébrations de toutes envergures, avec des formules pensées pour chaque budget.",
          "Notre capacité à intervenir dans un rayon élargi autour du Lot nous permet de rejoindre Villefranche-de-Rouergue avec toute la rigueur et la fraîcheur que méritent nos préparations artisanales. Chaque déplacement est soigneusement planifié pour que les plats arrivent dans un état irréprochable, comme s'ils venaient d'être préparés sur place.",
        ],
      }}
    />
  );
}
