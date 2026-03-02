"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function CommandeConfirmeeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-cream/40 mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
            Aucune commande trouvée.
          </p>
          <Link href="/" className="btn-gold">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="card-luxury p-12 text-center relative" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
          <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
          <div className="absolute top-4 right-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
          <div className="absolute bottom-4 left-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
          <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
          <div className="text-gold text-4xl mb-6">✦</div>
          <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            Commande confirmée
          </p>
          <h1 className="text-cream mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2rem" }}>
            Merci pour votre commande !
          </h1>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-cream/50 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Votre paiement a bien été reçu. Un email de confirmation vous a été envoyé.
          </p>
          <p className="text-cream/40 text-sm leading-relaxed mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Cassiora vous recontactera sous 24h pour confirmer les détails de votre commande.
          </p>
          <Link href="/" className="btn-gold">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}

export default function CommandeConfirmeePage() {
  return (
    <Suspense fallback={
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-cream/40" style={{ fontFamily: "'Jost', sans-serif" }}>Chargement…</p>
      </div>
    }>
      <CommandeConfirmeeContent />
    </Suspense>
  );
}