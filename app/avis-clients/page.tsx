import type { Metadata } from "next";
import { client, queries } from "@/lib/sanity";
import Link from "next/link";

export const metadata: Metadata = { title: "Avis clients — Cassiora Traiteur", description: "Témoignages de clients satisfaits de Cassiora Traiteur dans le Lot et Tarn-et-Garonne." };
export const revalidate = 60;

const fallback: any[] = [];

export default async function AvisClientsPage() {
  const avis = await client.fetch(queries.avis).catch(() => fallback);
  const display = avis?.length > 0 ? avis : fallback;

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Ce qu'ils disent</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Avis <span className="text-gold-light italic">clients</span>
        </h1>
        <div className="flex justify-center gap-1 mt-6">{[...Array(5)].map((_, i) => <span key={i} className="text-gold text-2xl">★</span>)}</div>
        <div className="gold-divider max-w-xs mx-auto mt-6" />
      </div>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {display.map((a: any) => (
              <div key={a._id} className="card-luxury p-7">
                <div className="flex gap-0.5 mb-5">{[...Array(a.note || 5)].map((_, j) => <span key={j} className="text-gold text-sm">★</span>)}</div>
                <p className="text-cream/65 leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.1rem", fontStyle: "italic" }}>
                  "{a.texte}"
                </p>
                <div className="gold-divider mb-4" />
                <p className="text-cream/80 text-sm" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.1em" }}>{a.nom}</p>
                <p className="text-gold/50 text-xs mt-1" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{a.occasion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
