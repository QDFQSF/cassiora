import type { Metadata } from "next";
import { client, queries } from "@/lib/sanity";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Cassiora Traiteur — Traiteur artisanal Cahors, Montauban, Lot 46",
  description:
    "Cassiora Traiteur, cuisine artisanale et généreuse. Prestations traiteur sur mesure, box gourmandes livrées, ateliers culinaires. Basé dans le Lot, intervient sur Cahors, Montauban, Caussade.",
};

export const revalidate = 60; // Revalider toutes les 60s

export default async function HomePage() {
  // Fetch data from Sanity
  const [accueil, offres] = await Promise.all([
    client.fetch(queries.pageAccueil).catch(() => null),
    client.fetch(queries.offresActives).catch(() => []),
  ]);

  const data = {
    titre: accueil?.titre || "Cuisine artisanale,",
    sousTitre: accueil?.sousTitre || "saveurs généreuses",
    description:
      accueil?.description ||
      "Cassiora, c'est l'histoire d'une passion pour la cuisine artisanale et généreuse. Chaque création est préparée avec amour, pour faire de chaque moment un souvenir inoubliable.",
    citation:
      accueil?.citation ||
      "Cuisiner, c'est partager. Chaque plat est une invitation à la table de l'essentiel.",
    hasOffres: offres && offres.length > 0,
  };

  return <HomeClient data={data} />;
}
