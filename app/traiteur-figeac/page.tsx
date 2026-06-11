import type { Metadata } from "next";
import TraiteurLocalPage from "@/components/TraiteurLocalPage";

export const metadata: Metadata = {
  title: "Traiteur Figeac — Cassiora Traiteur artisanal Lot & Tarn-et-Garonne",
  description:
    "Traiteur à Figeac, ville médiévale du Lot. Cassiora sublime vos réceptions dans des cadres patrimoniaux d'exception — demeures historiques, cours médiévales et sites culturels.",
  alternates: { canonical: "https://www.cassiora.fr/traiteur-figeac" },
};

export default function Page() {
  return (
    <TraiteurLocalPage
      data={{
        ville: "Figeac",
        badge: "Haut-Quercy · Lot (46)",
        intro: "Traiteur artisanal pour vos réceptions et événements dans l'écrin médiéval de Figeac — cocktails culturels, dîners de gala et célébrations dans des espaces de caractère.",
        paragraphs: [
          "Figeac, ville médiévale aux ruelles pavées et aux façades en grès ocre, est une destination touristique de premier plan dans le Lot. Elle accueille chaque année de nombreux visiteurs attirés par son patrimoine architectural exceptionnel, le musée Champollion et ses marchés animés. Cassiora Traiteur s'inscrit dans ce cadre d'exception pour sublimer vos réceptions, cocktails culturels et événements dans des espaces chargés d'histoire.",
          "Inauguration d'une exposition, dîner de gala dans une cour médiévale, réception privée dans une demeure de caractère — le cadre patrimonial de Figeac appelle une cuisine à sa hauteur. Nous proposons des menus qui célèbrent les saveurs du Quercy : terrines artisanales, salades aux produits locaux, desserts faits maison qui prolongent l'expérience sensorielle de ces lieux hors du commun.",
          "Notre connaissance du territoire nous permet d'intervenir avec agilité dans le haut-Quercy — de Figeac à Capdenac, en passant par Assier et les villages alentour. Chaque prestation est préparée avec soin et acheminée dans les meilleures conditions pour que votre événement soit à la hauteur du cadre qui l'accueille.",
        ],
      }}
    />
  );
}
