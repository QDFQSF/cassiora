import { client, queries } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 30;

export default async function OffresSpecialesPage() {
  const offres = await client.fetch(queries.offresActives).catch(() => []);

  if (!offres || offres.length === 0) return notFound();

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Disponibles maintenant</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Offres <span className="text-gold-light italic">spéciales</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
      </div>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offres.map((offre: any) => (
              <div key={offre._id} className="card-luxury p-8 relative" style={{ border: "1px solid rgba(201, 168, 76, 0.35)" }}>
                {offre.badge && (
                  <div className="absolute -top-3 left-6 px-4 py-1 text-black text-[0.55rem] tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}>
                    {offre.badge}
                  </div>
                )}
                {offre.validiteJusquau && (
                  <p className="text-gold/40 text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                    Jusqu'au {new Date(offre.validiteJusquau).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
                <h2 className="text-gold-light text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>{offre.titre}</h2>
                <p className="text-gold text-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>{offre.prix}</p>
                <p className="text-cream/50 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{offre.description}</p>
                <div className="gold-divider mb-6" />
                {offre.details && (
                  <ul className="space-y-3 mb-8">
                    {offre.details.map((d: string, i: number) => (
                      <li key={i} className="text-cream/65 flex items-center gap-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
                        <span className="text-gold/50 text-xs">✦</span>{d}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href="/contact" className="btn-gold">{offre.cta || "Réserver"}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
