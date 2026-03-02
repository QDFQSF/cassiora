export default function MentionsLegalesPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          Mentions <span className="text-gold-light italic">légales</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
      </div>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10 text-cream/55" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          {[
            { titre: "Éditeur du site", texte: "Cassiora Traiteur — Auto-entrepreneur\nSaint-Paul-de-Loubressac, 46170\nSIRET : à compléter\nEmail : contact@cassiora.fr" },
            { titre: "Hébergement", texte: "Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis." },
            { titre: "Propriété intellectuelle", texte: "L'ensemble du contenu de ce site (textes, images, logo) est la propriété exclusive de Cassiora Traiteur. Toute reproduction est interdite sans autorisation préalable." },
            { titre: "Données personnelles (RGPD)", texte: "Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression en nous contactant à contact@cassiora.fr." },
          ].map((a) => (
            <div key={a.titre}>
              <h2 className="text-gold text-sm tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>{a.titre}</h2>
              <p className="text-sm leading-relaxed whitespace-pre-line">{a.texte}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
