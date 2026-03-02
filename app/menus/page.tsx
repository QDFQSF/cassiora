import type { Metadata } from "next";
import { client, queries } from "@/lib/sanity";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Menus Traiteur — Cassiora Traiteur Cahors Montauban",
  description: "Menus traiteur sur mesure par Cassiora. Menus Essentiel, Signature et Prestige pour vos événements dans le Lot (46) et Tarn-et-Garonne (82). Cahors, Montauban, Caussade.",
};

export const revalidate = 60;

const fallbackMenus = [
  { _id: "1", nom: "Menu Essentiel", prix: "Sur devis", description: "L'essentiel du fait maison pour vos petites occasions.", plats: ["Entrée au choix", "Plat principal garni", "Dessert maison"], highlight: false },
  { _id: "2", nom: "Menu Signature", prix: "Sur devis", description: "Notre sélection de saison, entre tradition et modernité.", plats: ["Amuse-bouche", "Entrée raffinée", "Plat signature", "Dessert Cassiora", "Mignardises"], highlight: true },
  { _id: "3", nom: "Menu Prestige", prix: "Sur devis", description: "L'expérience gastronomique complète pour vos événements d'exception.", plats: ["Amuse-bouche & mise en bouche", "Entrée & intermezzo", "Plat de résistance", "Fromages sélectionnés", "Dessert & mignardises", "Café gourmand"], highlight: false },
];

export default async function MenusPage() {
  const menus = await client.fetch(queries.menus).catch(() => fallbackMenus);
  const displayMenus = menus?.length > 0 ? menus : fallbackMenus;

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Gastronomie sur mesure</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Nos <span className="text-gold-light italic">Menus</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
        <p className="text-cream/40 text-sm mt-8 max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Chaque menu est une base — nous l'adaptons toujours à vos envies, votre budget et votre nombre de convives. Traiteur disponible sur Cahors, Montauban, Caussade et toute la région.
        </p>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {displayMenus.map((m: any) => (
              <div key={m._id} className={`card-luxury p-8 relative ${m.highlight ? "border-gold/50" : ""}`} style={m.highlight ? { borderColor: 'rgba(201,168,76,0.5)' } : {}}>
                {m.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-black text-[0.55rem] tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}>
                    Le plus populaire
                  </div>
                )}
                <h2 className="text-gold-light text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{m.nom}</h2>
                <p className="text-gold/60 text-sm mb-4" style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.1em" }}>{m.prix}</p>
                <p className="text-cream/45 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{m.description}</p>
                <div className="gold-divider mb-6" />
                <ul className="space-y-3">
                  {m.plats?.map((p: string, j: number) => (
                    <li key={j} className="text-cream/60 flex items-center gap-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.05rem" }}>
                      <span className="text-gold/50 text-xs">✦</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-cream/30 text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Allergies, régimes spéciaux, envies particulières ? Parlons-en.</p>
            <Link href="/contact" className="btn-gold">Demander un devis personnalisé</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
