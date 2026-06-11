import Link from "next/link";

export type TraiteurLocalData = {
  ville: string;
  badge: string;
  intro: string;
  paragraphs: [string, string, string];
};

const formules = [
  { nom: "La Classique", prix: 16, contenu: "2 salades + 1 viande froide + 1 dessert au choix" },
  { nom: "Le Gourmand", prix: 22, contenu: "3 salades + 2 viandes froides + plateau de fromage + 1 dessert", highlight: true },
  { nom: "Le Grand Buffet", prix: 28, contenu: "4 salades + 3 viandes froides + plateau de fromages + 2 desserts" },
];

export default function TraiteurLocalPage({ data }: { data: TraiteurLocalData }) {
  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
          Traiteur artisanal — {data.badge}
        </p>
        <h1
          className="text-cream"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
        >
          Traiteur <span className="text-gold-light italic">{data.ville}</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
        <p className="text-cream/40 text-sm mt-6 max-w-2xl mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          {data.intro}
        </p>
      </div>

      {/* Texte unique par ville */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {data.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-cream/60 leading-relaxed"
              style={{
                fontFamily: i === 0 ? "'Cormorant Garamond', serif" : "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: i === 0 ? "1.25rem" : "0.95rem",
                fontStyle: i === 0 ? "italic" : "normal",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Formules */}
      <section className="py-16 px-6 border-t border-gold/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              Buffet Froid
            </p>
            <h2
              className="text-cream"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Nos <span className="text-gold-light italic">formules</span>
            </h2>
            <div className="gold-divider max-w-xs mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {formules.map((f) => (
              <div
                key={f.nom}
                className="p-6 relative"
                style={{
                  border: f.highlight ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(201,168,76,0.15)",
                  background: f.highlight ? "rgba(201,168,76,0.05)" : "transparent",
                }}
              >
                {f.highlight && (
                  <div
                    className="absolute -top-2.5 left-4 px-3 py-0.5 text-black text-[0.5rem] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}
                  >
                    Recommandé
                  </div>
                )}
                <p className="text-cream/80 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>
                  {f.nom}
                </p>
                <p className="text-cream/40 text-xs leading-relaxed mb-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  {f.contenu}
                </p>
                <div>
                  <span className="text-gold-light text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {f.prix}€
                  </span>
                  <span className="text-cream/30 text-xs ml-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                    /pers
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Inclus */}
          <div
            className="card-luxury p-6 mb-8 max-w-lg mx-auto"
            style={{ border: "1px solid rgba(201,168,76,0.1)" }}
          >
            <p className="text-gold/60 text-[0.55rem] tracking-[0.2em] uppercase mb-3 text-center" style={{ fontFamily: "'Cinzel', serif" }}>
              Ce qui est inclus
            </p>
            <ul className="space-y-1.5">
              {["Préparation artisanale maison", "Livraison ou mise en place sur site", "Adaptation allergies & régimes", "Devis personnalisé gratuit"].map((item) => (
                <li key={item} className="text-cream/45 text-xs flex items-center gap-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  <span className="text-gold/50">✦</span>{item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Link href="/contact" className="btn-gold inline-block">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Lien retour */}
      <section className="py-10 px-6 text-center border-t border-gold/10">
        <Link
          href="/traiteur"
          className="text-cream/30 text-xs tracking-[0.2em] uppercase hover:text-cream/60 transition-colors"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ← Voir toutes nos prestations traiteur
        </Link>
      </section>
    </div>
  );
}
