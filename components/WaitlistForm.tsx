"use client";

import { useState } from "react";

export default function WaitlistForm({ type, label }: { type: "livre" | "ateliers"; label: string }) {
  const [form, setForm] = useState({ email: "", prenom: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "bg-transparent border-b border-gold/20 py-3 px-0 text-cream/80 text-sm placeholder-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300 w-full";

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-gold text-3xl mb-4">✦</div>
        <p className="text-cream/80 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 300 }}>
          Vous êtes sur la liste !
        </p>
        <p className="text-cream/40 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Un email de confirmation vient de vous être envoyé. Vous serez prévenu·e en avant-première.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-3 text-center" style={{ fontFamily: "'Cinzel', serif" }}>
        Me prévenir à l'ouverture
      </p>
      <p className="text-cream/40 text-sm text-center mb-8 max-w-sm mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
        Laissez votre email pour recevoir une notification dès que <strong className="text-cream/60">{label}</strong> sera disponible.
      </p>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Prénom (optionnel)"
              value={form.prenom}
              onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              className={inputClass}
              style={{ fontFamily: "'Jost', sans-serif" }}
            />
          </div>
          <div className="flex-1">
            <input
              type="email"
              required
              placeholder="votre@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              style={{ fontFamily: "'Jost', sans-serif" }}
            />
          </div>
        </div>
        {status === "error" && (
          <p className="text-red-400/70 text-xs mb-3 text-center" style={{ fontFamily: "'Jost', sans-serif" }}>
            Erreur lors de l'inscription. Réessayez ou contactez-nous directement.
          </p>
        )}
        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-gold"
            style={{ opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "Inscription…" : "M'inscrire sur la liste"}
          </button>
        </div>
        <p className="text-cream/20 text-xs text-center mt-4" style={{ fontFamily: "'Jost', sans-serif" }}>
          Aucun spam · Uniquement une notification à la sortie · Désabonnement libre
        </p>
      </form>
    </div>
  );
}