"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CommandeConfirmeePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (sessionId) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, [sessionId]);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {status === "loading" && (
          <p className="text-cream/50" style={{ fontFamily: "'Jost', sans-serif" }}>Chargement…</p>
        )}

        {status === "success" && (
          <div className="card-luxury p-12 relative" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
            <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
            <div className="absolute top-4 right-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
            <div className="absolute bottom-4 left-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
            <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />

            <div className="text-gold text-5xl mb-6">✦</div>

            <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              Paiement confirmé
            </p>

            <h1 className="text-cream mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.2rem" }}>
              Merci pour votre commande !
            </h1>

            <div className="gold-divider max-w-xs mx-auto mb-6" />

            <p className="text-cream/50 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Votre paiement a bien été reçu. Un email de confirmation vous a été envoyé.<br /><br />
              Cassiora vous recontactera sous 24h pour confirmer les détails de votre commande.
            </p>

            <Link href="/" className="btn-ghost">
              Retour à l'accueil
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <p className="text-cream/50 mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
              Une erreur s'est produite. Contactez-nous à cassioratraiteur@gmail.com
            </p>
            <Link href="/box-gourmande" className="btn-ghost">Retour aux box</Link>
          </div>
        )}
      </div>
    </div>
  );
}