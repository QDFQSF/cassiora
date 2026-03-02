import type { Metadata } from "next";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Ateliers cuisine Lot — Cassiora Traiteur",
  description: "Ateliers de cuisine artisanale animés par Cassiora dans le Lot (46) et Tarn-et-Garonne. Ouverture 2027.",
};

export default function AteliersPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Apprenez, créez, savourez</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Les <span className="text-gold-light italic">Ateliers</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
      </div>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card-luxury p-12 text-center relative mb-10" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
            <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
            <div className="absolute top-4 right-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
            <div className="absolute bottom-4 left-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
            <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
            <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Bientôt disponible</p>
            <h2 className="text-cream mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2rem" }}>
              Les ateliers arrivent <span className="text-gold-light italic">en 2027</span>
            </h2>
            <div className="gold-divider max-w-xs mx-auto mb-6" />
            <p className="text-cream/50 leading-relaxed mb-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Pâtisserie, cuisine du monde, cours particuliers, team building… Des ateliers artisanaux animés avec passion, dans le Lot et Tarn-et-Garonne.
            </p>
            <p className="text-cream/35 text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Inscrivez-vous pour être averti·e en avant-première dès l'ouverture des réservations.
            </p>
          </div>

          <div className="card-luxury p-8" style={{ border: "1px solid rgba(201,168,76,0.15)" }}>
            <WaitlistForm type="ateliers" label="les ateliers culinaires" />
          </div>
        </div>
      </section>
    </div>
  );
}