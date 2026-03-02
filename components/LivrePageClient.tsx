"use client";

import { useState, useEffect } from "react";

// Types
type Extrait = {
  _id: string;
  titre: string;
  categorie: string;
  description: string;
  temps?: string;
  portions?: string;
  ingredients?: string[];
  etapes?: string[];
  conseil?: string;
};

const fallback: Extrait[] = [
  {
    _id: "1",
    titre: "Quiche Lorraine",
    categorie: "Salé",
    description: "Classique, dorée et pleine de goût.",
    temps: "45 min",
    portions: "8 parts",
    ingredients: ["1 pâte brisée", "3 œufs", "20 cl de crème fraîche semi-épaisse", "20cl de lait", "200 g de lardons","30 g de beurre", "Sel, poivre, noix de muscade"],
    etapes: [
      "Préchauffez le four à 180 °C (chaleur tournante). Foncez un moule avec la pâte et piquez-la.",
      "Faites dorer les lardons à sec. Égouttez-les (gardez un peu du gras rendu).",
      "Battez œufs + crème + lait. Ajoutez les lardons. Assaisonnez (sel, poivre, muscade).",
      "Versez sur la pâte. Parsemez de petits dés de beurre (un par côté + un au centre).",
      "Enfournez ~45 min, sous surveillance. À déguster chaud ou froid.",
    ],
    conseil: "Pour une quiche encore plus gourmande, ajoutez du gruyère râpé sur le dessus avant d'enfourner.",
  },
  {
    _id: "2",
    titre: "Gnocchis à la Milanaise",
    categorie: "Salé",
    description: "Fondants et savoureusement italiens.",
    temps: "30 min",
    portions: "6 personnes",
    ingredients: ["800 g de gnocchis frais", "200 g de sauce tomate", "1 boule de mozzarella", "1 filet d'huile d'olive", "Ail semoule", "Sel, poivre"],
    etapes: [
      "Préchauffez votre four à 180° en chaleur tournante. Puis mettez un filet d'huile d'olive dans votre plat.",
      "Portez à ébullition une casserole d'eau, puis plongez vos gnocchis jusqu'à ce qu'ils remontent à la surface (3/4 min).",
      "Dans un saladier, versez votre sauce tomate puis rajoutez y les gnocchis cuit et égouttez. Assaisonnez et mélanger le tout.",
      "Versez votre préparation dans votre plat et recouvrez de morceaux de mozzarella découpez préalablement.",
      "Enfournez pendant 15/20 minutes sous surveillance, le temps que le fromage fonde.",
    ],
    conseil: "Vous pouvez remplacer la mozzarella par du parmesan râpé pour une version encore plus fondante.",
  },
  {
    _id: "3",
    titre: "Pancakes moelleux",
    categorie: "Sucré",
    description: "Moelleux, gourmands et irrésistiblement réconfortants.",
    temps: "20 min",
    portions: "15 pancakes",
    ingredients: ["2 œufs", "150 ml de lait", "125 g de farine", "2 C.S de sucre", "1 sachet de levure chimique", "Extrait de vanille",],
    etapes: [
      "Séparez vos blancs des jaunes, et mettez vos blancs de côté. Dans un saladier, mélangez toutes vos poudres.",
      "Mélangez vos jaunes d'œufs avec votre lait et votre extrait de vanille. Puis ajoutez le mélange des poudres par dessus. Mélangez bien, puis laisser la préparation reposer pendant 30 minutes.",
      "Au bout du temps de repos, récupérez vos blanc et montez les en neige. Une fois les blancs bien fermes, les incorporez délicatement au mélange précédent.",
      "Graissez votre poêle et faites cuire vos pancakes. Il se mange aussi bien nature qu'accompagner d'une pâte a tartiner ou de confiture.",
    ],
    conseil: "Pour des pancakes encore plus moelleux, remplacez 5cl de lait par du yaourt nature.",
  },
  {
    _id: "4",
    titre: "Cookies fondants",
    categorie: "Sucré",
    description: "Croquants dehors, fondants dedans.",
    temps: "25 min",
    portions: "10 cookies",
    ingredients: ["125 g de beurre (légèrement fondue)", "125 g de sucre roux ou de vergeoise", "50 g de sucre blanc", "210 g de farine", "120 g de pépite de chocolat", "1 oeuf", "1 sachet de sucre vanillé", "1 sachet de levure chimique", "1 pincée de sel", "Extrait de vanille"],
    etapes: [
      "Faites ramollir votre beurre (il doit être légèrement fondue mais se tenir encore), y ajoutez les sucres et mélanger.",
      "Une fois le mélange bien homogène, ajoutez votre préalablement battu oeuf et rajoutez votre extrait de vanille.",
      "Une fois le tout bien incorporé, vous pouvez rajouter votre farine et votre levure. Vous pouvez finir le mélange à la main.",
      "Incorporez le chocolat et votre pincée de sel (ici, j'utilise de la fleur de sel), mélangez grossièrement.",
      "Faites des boules de 65g et réservez pendant 45 minutes au frigo.",
      "Une fois le temps de repos finit, enfournez vos cookies à 180° pendant 10/15 min. Les cookies doivent être mou, quand vous les sortez du four.",
    ],
    conseil: "Le secret : sortir les cookies du four quand ils semblent encore insuffisamment cuits. Ils finissent de cuire sur la plaque et restent fondants à l'intérieur.",
  },
];

// Modal component
function RecetteModal({ recette, onClose }: { recette: Extrait; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: "#0a0a0a", border: "1px solid rgba(201,168,76,0.3)" }}
      >
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-5 h-5 pointer-events-none" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
        <div className="absolute top-4 right-12 w-5 h-5 pointer-events-none" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
        <div className="absolute bottom-4 left-4 w-5 h-5 pointer-events-none" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
        <div className="absolute bottom-4 right-4 w-5 h-5 pointer-events-none" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cream/40 hover:text-cream transition-colors duration-200 text-2xl leading-none z-10"
        >
          ×
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <span
            className="text-[0.55rem] tracking-[0.3em] uppercase text-gold/50 block mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {recette.categorie}
          </span>
          <h2
            className="text-gold-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "2rem" }}
          >
            {recette.titre}
          </h2>
          <p
            className="text-cream/50 mb-6 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
          >
            {recette.description}
          </p>

          {/* Infos rapides */}
          {(recette.temps || recette.portions) && (
            <div className="flex gap-6 mb-6">
              {recette.temps && (
                <div className="flex items-center gap-2">
                  <span className="text-gold/60 text-xs">⏱</span>
                  <span className="text-cream/50 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    {recette.temps}
                  </span>
                </div>
              )}
              {recette.portions && (
                <div className="flex items-center gap-2">
                  <span className="text-gold/60 text-xs">◇</span>
                  <span className="text-cream/50 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    {recette.portions}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="gold-divider mb-8" />

          {/* Ingrédients */}
          {recette.ingredients && recette.ingredients.length > 0 && (
            <div className="mb-8">
              <h3
                className="text-gold text-xs tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Ingrédients
              </h3>
              <ul className="space-y-2">
                {recette.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="text-cream/60 text-sm flex items-start gap-3"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                  >
                    <span className="text-gold/40 mt-0.5 flex-shrink-0">—</span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Étapes */}
          {recette.etapes && recette.etapes.length > 0 && (
            <div className="mb-8">
              <h3
                className="text-gold text-xs tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Préparation
              </h3>
              <ol className="space-y-4">
                {recette.etapes.map((etape, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="text-gold/40 text-xs flex-shrink-0 mt-0.5 w-5"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="text-cream/60 text-sm leading-relaxed"
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                    >
                      {etape}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Conseil */}
          {recette.conseil && (
            <>
              <div className="gold-divider mb-6" />
              <div className="flex gap-3">
                <span className="text-gold text-lg flex-shrink-0">❧</span>
                <div>
                  <p
                    className="text-gold/70 text-xs tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Conseil du chef
                  </p>
                  <p
                    className="text-cream/50 text-sm leading-relaxed italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                  >
                    {recette.conseil}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LivrePageClient({ extraits }: { extraits: Extrait[] }) {
  const [selected, setSelected] = useState<Extrait | null>(null);
  const display = extraits.length > 0 ? extraits : fallback;

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p
          className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Éditions Cassiora
        </p>
        <h1
          className="text-cream"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Livre de <span className="text-gold-light italic">recettes</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
      </div>

      {/* Annonce */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="card-luxury p-10 text-center relative" style={{ border: "1px solid rgba(201, 168, 76, 0.3)" }}>
            <div className="absolute top-4 left-4 w-6 h-6" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
            <div className="absolute top-4 right-4 w-6 h-6" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
            <div className="absolute bottom-4 left-4 w-6 h-6" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
            <div className="absolute bottom-4 right-4 w-6 h-6" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
            <p className="text-gold text-2xl mb-4">❧</p>
            <h2
              className="text-cream text-3xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic" }}
            >
              En cours d'écriture…
            </h2>
            <p className="text-cream/50 leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Le livre de recettes Cassiora est actuellement en préparation.
              Version e-book et imprimée bientôt disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Aperçu recettes */}
      <section className="py-10 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center text-cream/60 text-sm tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Aperçu des recettes
          </h2>
          <p
            className="text-center text-cream/30 text-xs mb-12"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
          >
            Cliquez sur une recette pour la découvrir
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {display.map((e) => (
              <button
                key={e._id}
                onClick={() => setSelected(e)}
                className="card-luxury p-6 text-left group cursor-pointer w-full"
              >
                <span
                  className="text-[0.55rem] tracking-[0.2em] uppercase text-gold/50 mb-3 block"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {e.categorie}
                </span>
                <h3
                  className="text-gold-light text-xl mb-3 group-hover:text-gold transition-colors duration-200"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                >
                  {e.titre}
                </h3>
                <p
                  className="text-cream/40 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                >
                  {e.description}
                </p>
                <div className="mt-auto pt-4 border-t border-gold/10 flex items-center justify-between">
                  <span
                    className="text-gold/40 text-[0.6rem] tracking-[0.15em] uppercase"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Voir la recette
                  </span>
                  <span className="text-gold/40 group-hover:translate-x-1 transition-transform duration-200 text-sm">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Liste d'attente */}
      <WaitlistSection />

      {/* Modal */}
      {selected && (
        <RecetteModal recette={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function WaitlistSection() {
  const [form, setForm] = useState({ email: "", prenom: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "livre" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const ic = "bg-transparent border-b border-gold/20 py-3 px-0 text-cream/80 text-sm placeholder-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300 w-full";

  return (
    <section className="py-16 px-6 border-t border-gold/10" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-lg mx-auto">
        <div className="card-luxury p-8 text-center" style={{ border: "1px solid rgba(201,168,76,0.15)" }}>
          {status === "success" ? (
            <>
              <div className="text-gold text-3xl mb-4">✦</div>
              <p className="text-cream/80 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 300 }}>
                Vous êtes sur la liste !
              </p>
              <p className="text-cream/40 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                Un email de confirmation vous a été envoyé. Vous serez prévenu·e en avant-première à la sortie du livre.
              </p>
            </>
          ) : (
            <>
              <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                Me prévenir à la sortie
              </p>
              <p className="text-cream/40 text-sm mb-8" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                Laissez votre email pour être averti·e en avant-première dès que le{" "}
                <strong className="text-cream/60">livre de recettes</strong> sera disponible.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Prénom (optionnel)"
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    className={ic}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={ic}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400/70 text-xs mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Erreur lors de l'inscription. Réessayez.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-gold"
                  style={{ opacity: status === "loading" ? 0.7 : 1 }}
                >
                  {status === "loading" ? "Inscription…" : "M'inscrire sur la liste"}
                </button>
                <p className="text-cream/20 text-xs mt-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Aucun spam · Une seule notification à la sortie du livre
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}