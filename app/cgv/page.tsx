import Link from "next/link";

export default function CGVPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          Conditions générales de <span className="text-gold-light italic">vente</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
      </div>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10 text-cream/55" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          {[
            { titre: "Article 1 — Identification", texte: "Cassiora — Auto-entrepreneur\nSIRET : 99137134500018\nContact : cassioratraiteur@gmail.com\nSaint-Paul-de-Loubressac, 46170" },
            { titre: "Article 2 — Commandes et réservations", texte: "Toute commande ou réservation est confirmée par écrit (email ou bon de commande signé). Un acompte de 30% est demandé à la validation pour les prestations supérieures à 150€." },
            { titre: "Article 3 — Annulation", texte: "Toute annulation plus de 48h avant la prestation donne droit au remboursement de l'acompte. En dessous de 48h, l'acompte reste acquis à Cassiora Traiteur." },
            { titre: "Article 4 — Prix et paiement", texte: "Les prix sont indiqués en euros TTC. Le règlement s'effectue par virement bancaire, carte bancaire ou espèces" },
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
