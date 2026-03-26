import { client, queries } from "@/lib/sanity";
import { getOffresLancementActives } from "@/lib/offres-lancement";
import { notFound } from "next/navigation";
import OffresSpecialesClient from "@/components/OffresSpecialesClient";

export const revalidate = 30;

export default async function OffresSpecialesPage() {
  const sanityOffres = await client.fetch(queries.offresActives).catch(() => []);
  const offres = [...getOffresLancementActives(), ...(sanityOffres || [])];

  if (offres.length === 0) return notFound();

  return <OffresSpecialesClient offres={offres} />;
}
