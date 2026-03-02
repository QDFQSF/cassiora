import type { Metadata } from "next";
import BoxGourmandePage from "@/components/BoxGourmandePage";

export const metadata: Metadata = {
  title: "Box Gourmande livraison Lot — Cassiora Traiteur",
  description: "Box gourmandes artisanales à commander dans le Lot (46) et Tarn-et-Garonne (82). Pause Sucrée, Petit Déjeuner, Brunch, Fromages, Charcuterie. Retrait sur place ou livraison.",
};

export default function Page() {
  return <BoxGourmandePage />;
}