import type { Metadata } from "next";
import { client, queries } from "@/lib/sanity";
import LivrePageClient from "@/components/LivrePageClient";

export const metadata: Metadata = {
  title: "Livre de recettes — Cassiora Traiteur",
  description: "Le livre de recettes artisanales de Cassiora."
};
export const revalidate = 60;

export default async function LivrePage() {
  const extraits = await client.fetch(queries.extraitsLivre).catch(() => []);
  return <LivrePageClient extraits={extraits || []} />;
}