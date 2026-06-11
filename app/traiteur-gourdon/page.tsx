import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Gourdon — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur à Gourdon, au cœur du Périgord Quercy. Cassiora assure vos réceptions en maisons de campagne et propriétés rurales. Cuisine artisanale du terroir pour une clientèle locale exigeante.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-gourdon" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Gourdon",
        badge: "Périgord Quercy · Lot (46)",
        intro: "Cuisine artisanale pour vos réceptions en maisons de campagne, propriétés rurales et salles de fête villageoises — au cœur du Périgord Quercy.",
        paragraphs: [
          "Gourdon, perchée sur son piton rocheux aux confins du Périgord et du Quercy, est entourée de forêts de chênes, de maisons de campagne et de propriétés rurales qui font le charme de cette région préservée. C'est ici que Cassiora Traiteur se sent pleinement chez lui : des réceptions dans des demeures de caractère, des jardins verdoyants et des salles de fête villageoises où la convivialité règne en maître.",
          "La clientèle de Gourdon est une clientèle de proximité, exigeante sur la qualité et profondément attachée au terroir. Nous partageons ces valeurs sans réserve : nos produits sont sourcés localement, nos recettes s'inspirent des saveurs du Sud-Ouest, et nos présentations valorisent l'authenticité plutôt que l'artifice. Mariage champêtre, anniversaire en grange rénovée, repas de retrouvailles en famille — nous donnons à chaque événement sa propre couleur.",
          "Que vous receviez dix personnes en toute intimité ou cent convives pour une grande fête, nous adaptons notre prestation à votre espace et vos contraintes. Notre intervention sur Gourdon et les communes du Lot méridional vous garantit fraîcheur absolue et réactivité, du premier contact jusqu'au service final.",
        ],
      }}
    />
  );
}
