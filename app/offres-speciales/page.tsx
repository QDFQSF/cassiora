import { client, queries } from "@/lib/sanity";
import { getOffresLancementActives } from "@/lib/offres-lancement";
import OffresSpecialesClient from "@/components/OffresSpecialesClient";

export const revalidate = 30;

export default async function OffresSpecialesPage() {
  const sanityOffres = await client.fetch(queries.offresActives).catch(() => []);
  const offres = [...getOffresLancementActives(), ...(sanityOffres || [])];

  return <OffresSpecialesClient offres={offres} />;
}
