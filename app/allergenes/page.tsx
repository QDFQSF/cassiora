import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Allergènes & informations — Cassiora Traiteur",
  description: "Liste complète des allergènes présents dans nos préparations artisanales. Cassiora Traiteur, Lot.",
};

const allergenes = [
  { nom: "Gluten", detail: "Blé, seigle, orge, avoine, épeautre et leurs hybridations" },
  { nom: "Lait", detail: "Lait et dérivés lactés — fromage, crème, beurre, lactose" },
  { nom: "Œuf", detail: "Œufs et produits à base d'œufs" },
  { nom: "Soja", detail: "Soja et produits dérivés" },
  { nom: "Fruits à coque", detail: "Amandes, noisettes, noix, noix de cajou, pistaches, noix du Brésil, noix de Macadamia, noix de pécan" },
  { nom: "Arachides", detail: "Cacahuètes et produits à base d'arachides" },
  { nom: "Graines de sésame", detail: "Graines de sésame et huile de sésame" },
  { nom: "Moutarde", detail: "Graines, feuilles, farine et tout produit à base de moutarde" },
  { nom: "Céleri", detail: "Céleri branche, céleri-rave, graines et extraits de céleri" },
  { nom: "Poissons", detail: "Poissons et produits à base de poissons" },
  { nom: "Crustacés & Mollusques", detail: "Crevettes, crabe, homard, langoustine, moules, huîtres, coquilles Saint-Jacques" },
  { nom: "Sulfites", detail: "Dioxyde de soufre et sulfites — présents notamment dans certains fruits secs et vinaigres" },
];

export default function AllergenesPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
          Transparence & sécurité alimentaire
        </p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          Allergènes & <span className="text-gold-light italic">informations</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
        <p className="text-cream/40 text-sm mt-6 max-w-xl mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Conformément au règlement européen INCO (UE) n°1169/2011, voici la liste des 14 allergènes majeurs susceptibles d'être présents dans nos préparations.
        </p>
      </div>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Mention principale */}
          <div className="mb-10 p-6" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <div className="flex items-start gap-4">
              <span className="text-gold text-xl flex-shrink-0 mt-0.5">⚠</span>
              <div>
                <p className="text-cream/80 text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  <strong className="text-cream font-normal" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
                    Toutes nos préparations sont artisanales
                  </strong>{" "}
                  et sont fabriquées dans un atelier où sont utilisés du gluten, des œufs, du lait, des fruits à coque et des arachides.{" "}
                  <strong className="text-gold/80">Des traces d'allergènes peuvent être présentes</strong> dans l'ensemble de nos produits.
                </p>
              </div>
            </div>
          </div>

          {/* Liste des allergènes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {allergenes.map((a, i) => (
              <div key={i} className="card-luxury p-5">
                <div className="flex items-start gap-3">
                  <span className="text-gold/50 text-xs mt-1 flex-shrink-0">✦</span>
                  <div>
                    <p className="text-gold-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500 }}>{a.nom}</p>
                    <p className="text-cream/45 text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{a.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="gold-divider mb-10" />

          {/* Contact */}
          <div className="text-center mb-10">
            <p className="text-gold/60 text-[0.6rem] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              Une question ? Un besoin spécifique ?
            </p>
            <p className="text-cream/50 text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              N'hésitez pas à nous contacter avant de passer commande. Nous ferons notre possible pour adapter nos préparations à vos contraintes alimentaires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:cassioratraiteur@gmail.com"
                className="text-gold hover:text-gold-light transition-colors text-sm flex items-center gap-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                <span className="text-gold/50">✉</span>
                cassioratraiteur@gmail.com
              </a>
              <span className="text-gold/20 hidden sm:block">|</span>
              <a
                href="tel:0769162485"
                className="text-gold hover:text-gold-light transition-colors text-sm flex items-center gap-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                <span className="text-gold/50">☎</span>
                07 69 16 24 85
              </a>
            </div>
          </div>

          <div className="gold-divider mb-8" />

          <div className="text-center">
            <Link href="/box-gourmande" className="btn-ghost">
              Voir nos box gourmandes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
