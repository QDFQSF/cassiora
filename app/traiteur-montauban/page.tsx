import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Montauban — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur à Montauban et dans le Tarn-et-Garonne (82). Cassiora assure vos séminaires d'entreprise, repas professionnels et événements corporate. Livraison et mise en place incluses.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-montauban" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Montauban",
        badge: "Tarn-et-Garonne (82)",
        intro: "Traiteur artisanal pour vos événements professionnels et corporate à Montauban — séminaires, repas d'affaires, inaugurations et soirées d'entreprise.",
        paragraphs: [
          "Montauban, préfecture dynamique du Tarn-et-Garonne, concentre un tissu économique dense : grandes entreprises, PME industrielles, secteur tertiaire en pleine croissance. Cassiora Traiteur est le partenaire de choix pour vos repas d'affaires, inaugurations, séminaires et journées de formation. Nous prenons en charge la prestation de A à Z, de la logistique à la mise en place, pour que vous puissiez vous concentrer sur l'essentiel.",
          "Les événements d'entreprise à Montauban réclament rigueur et ponctualité — deux valeurs que nous partageons pleinement. Nos buffets froids, cocktails dînatoires et formules sur mesure s'intègrent aux contraintes de vos espaces de réception, salles de conférence et halls d'accueil. Chaque prestation est préparée artisanalement le jour même pour garantir fraîcheur et qualité irréprochables.",
          "De la salle de séminaire au patio d'entreprise, nous intervenons dans tout le bassin montalbanaias et les communes environnantes — Castelsarrasin, Moissac, Caussade. Notre flexibilité et notre réactivité font de nous un traiteur de référence pour les professionnels du 82, attachés à servir des repas à la hauteur de leur image.",
        ],
      }}
    />
  );
}
