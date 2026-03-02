"use client";

import { useEffect } from "react";
import Link from "next/link";

const services = [
  { icon: "✦", titre: "Traiteur", description: "Créations gastronomiques sur mesure pour sublimer vos événements privés et professionnels.", href: "/traiteur" },
  { icon: "◈", titre: "Box Gourmande", description: "Une sélection de douceurs artisanales livrée chez vous, pour offrir ou se faire plaisir.", href: "/box-gourmande" },
  { icon: "◇", titre: "Ateliers", description: "Apprenez les secrets de la cuisine artisanale lors d'ateliers conviviaux et passionnants.", href: "/ateliers" },
  { icon: "❧", titre: "Livre de recettes", description: "Un recueil de recettes authentiques, fruit de savoir-faire et de générosité culinaire.", href: "/livre" },
];

type Props = {
  data: {
    titre: string;
    sousTitre: string;
    description: string;
    citation: string;
    hasOffres: boolean;
  };
};

export default function HomeClient({ data }: Props) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, #1a1208 0%, #0a0800 40%, #000 100%)" }} />
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute w-px" style={{ left: `${5 + i * 8.5}%`, top: 0, bottom: 0, background: '#c9a84c', opacity: 0.05 + (i % 3) * 0.02 }} />
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full z-0" style={{ border: "1px solid rgba(201, 168, 76, 0.05)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-0" style={{ border: "1px solid rgba(201, 168, 76, 0.07)" }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8 animate-on-scroll">
            <img src="/images/logo.png" alt="Cassiora Traiteur" className="h-24 w-24 mx-auto object-contain" />
          </div>
          <p className="text-gold/70 text-[0.65rem] tracking-[0.5em] uppercase mb-6 animate-on-scroll" style={{ fontFamily: "'Cinzel', serif", animationDelay: "0.1s" }}>
            — Traiteur artisanal · Lot & Tarn-et-Garonne —
          </p>
          <h1 className="animate-on-scroll" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.05, animationDelay: "0.2s" }}>
            <span className="text-cream block">{data.titre}</span>
            <span className="text-shimmer block">{data.sousTitre}</span>
          </h1>

          <div className="my-8 flex items-center justify-center gap-4 animate-on-scroll" style={{ animationDelay: "0.35s" }}>
            <div className="h-px bg-gradient-to-r from-transparent to-gold/60 w-20" />
            <span className="text-gold text-xs" style={{ fontFamily: "'Cinzel', serif" }}>✦</span>
            <div className="h-px bg-gradient-to-l from-transparent to-gold/60 w-20" />
          </div>

          <p className="text-cream/60 max-w-2xl mx-auto mb-10 animate-on-scroll" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.25rem", fontStyle: "italic", animationDelay: "0.45s" }}>
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll" style={{ animationDelay: "0.55s" }}>
            <Link href="/traiteur" className="btn-gold">Découvrir le traiteur</Link>
            <Link href="/contact" className="btn-ghost">Prendre contact</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-on-scroll" style={{ animationDelay: "0.8s" }}>
          <span className="text-gold/40 text-[0.55rem] tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>Défiler</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </section>

      {/* ZONE COUVERTE — important pour SEO local */}
      <section className="py-10 border-y border-gold/10" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold/40 text-[0.6rem] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>Zone d'intervention</p>
          <p className="text-cream/30 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Cahors · Montauban · Caussade · Figeac · Gourdon · Villefranche-de-Rouergue · Lot (46) · Tarn-et-Garonne (82)
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4 animate-on-scroll" style={{ fontFamily: "'Cinzel', serif" }}>Ce que je propose</p>
            <h2 className="text-cream animate-on-scroll" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", animationDelay: "0.1s" }}>
              L'univers <em className="text-gold-light">Cassiora</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <Link key={i} href={s.href} className="card-luxury p-8 block group animate-on-scroll" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-2xl text-gold mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">{s.icon}</div>
                <h3 className="text-cream text-lg mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{s.titre}</h3>
                <p className="text-cream/45 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{s.description}</p>
                <span className="text-gold text-[0.6rem] tracking-[0.2em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300" style={{ fontFamily: "'Cinzel', serif" }}>
                  Découvrir <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CITATION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, #0d0a00 0%, #000 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px gold-divider" />
        <div className="absolute bottom-0 left-0 right-0 h-px gold-divider" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-gold/40 text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>"</p>
          <blockquote className="text-cream/80 mb-4 animate-on-scroll" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.3rem, 3vw, 2rem)", fontStyle: "italic", lineHeight: 1.6 }}>
            {data.citation}
          </blockquote>
          <p className="text-gold/60 text-xs tracking-[0.3em] uppercase animate-on-scroll" style={{ fontFamily: "'Cinzel', serif" }}>— Cassiora Traiteur</p>
        </div>
      </section>

      {/* BOX GOURMANDE */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <p className="text-gold/60 text-[0.6rem] tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'Cinzel', serif" }}>À offrir ou à se faire plaisir</p>
              <h2 className="text-cream mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}>
                La <span className="text-gold-light italic">Box Gourmande</span><br />Cassiora
              </h2>
              <p className="text-cream/50 leading-relaxed mb-8" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                Une sélection soigneusement composée de créations artisanales. Confitures, biscuits, spécialités maison… chaque box est une parenthèse gourmande préparée avec le même soin que nos grands banquets. Livraison possible dans le Lot et le Tarn-et-Garonne.
              </p>
              <Link href="/box-gourmande" className="btn-gold">Voir les box</Link>
            </div>
            <div className="animate-on-scroll relative" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-square max-w-sm mx-auto relative" style={{ background: "linear-gradient(135deg, #0d0a00, #1a1000)", border: "1px solid rgba(201, 168, 76, 0.25)" }}>
                <div className="absolute top-4 left-4 w-6 h-6" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
                <div className="absolute top-4 right-4 w-6 h-6" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
                <div className="absolute bottom-4 left-4 w-6 h-6" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
                <div className="absolute bottom-4 right-4 w-6 h-6" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                  <div className="text-gold/30 text-6xl mb-4">◈</div>
                  <p className="text-cream/30 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                    Ajoutez une photo de vos box depuis l'admin Sanity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVIS TEASER */}
      <section className="py-20 px-6 border-y border-gold/10" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold/60 text-[0.6rem] tracking-[0.4em] uppercase mb-4 animate-on-scroll" style={{ fontFamily: "'Cinzel', serif" }}>Ils nous font confiance</p>
          <div className="flex justify-center gap-1 mb-8 animate-on-scroll">
            {[...Array(5)].map((_, i) => <span key={i} className="text-gold text-xl">★</span>)}
          </div>
          <blockquote className="text-cream/70 mb-6 animate-on-scroll" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.4rem", fontStyle: "italic" }}>
            "Un repas extraordinaire, préparé avec une attention aux détails remarquable. Nos invités étaient émerveillés."
          </blockquote>
          <p className="text-gold/50 text-xs tracking-[0.2em] uppercase mb-8 animate-on-scroll" style={{ fontFamily: "'Cinzel', serif" }}>— Marie & Laurent</p>
          <Link href="/avis-clients" className="btn-ghost">Voir tous les avis</Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #000, #060400, #000)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-gold/50 text-[0.6rem] tracking-[0.5em] uppercase mb-6 animate-on-scroll" style={{ fontFamily: "'Cinzel', serif" }}>Prêt à créer votre événement</p>
          <h2 className="text-cream mb-4 animate-on-scroll" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Donnons vie à vos <span className="text-gold-light italic">instants gourmands</span>
          </h2>
          <p className="text-cream/40 mb-10 animate-on-scroll" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Traiteur Cahors, Montauban, Caussade et toute la région. Chaque projet est unique — discutons du vôtre.
          </p>
          <Link href="/contact" className="btn-gold">Prendre contact</Link>
        </div>
      </section>
    </div>
  );
}
