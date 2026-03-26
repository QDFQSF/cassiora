"use client";

import { useState } from "react";

const ic = "w-full bg-transparent border-b border-gold/20 py-3 px-0 text-cream/80 text-sm placeholder-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300";
const lc = "block text-[0.6rem] tracking-[0.2em] uppercase text-gold/50 mb-2";

type Props = {
  adresse: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prix: number;
  onDistanceChange: (km: number | null) => void;
  required?: boolean;
  note?: string;
};

export default function LivraisonField({ adresse, onChange, prix, onDistanceChange, required, note }: Props) {
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);

  const handleBlur = async () => {
    if (!adresse.trim() || adresse.trim().length < 5) return;
    setChecking(true);
    try {
      const res = await fetch("/api/distance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adresse }),
      });
      const data = await res.json();
      const km = typeof data.distanceKm === "number" ? data.distanceKm : null;
      setDistanceKm(km);
      onDistanceChange(km);
    } catch {
      setDistanceKm(null);
      onDistanceChange(null);
    }
    setChecking(false);
  };

  type Msg = { icon: string; text: string; color: string } | null;

  const getMsg = (): Msg => {
    if (checking) return { icon: "⏳", text: "Calcul de la distance…", color: "rgba(201,168,76,0.6)" };
    if (distanceKm === null) return null;
    if (distanceKm <= 10 && prix >= 50) return { icon: "✅", text: "Livraison gratuite", color: "#86efac" };
    if (distanceKm <= 10) return { icon: "⚠️", text: "Livraison gratuite dès 50€ d'achat", color: "#fbbf24" };
    return { icon: "ℹ️", text: `Hors zone gratuite (${distanceKm} km) — forfait kilométrique confirmé par Cassiora`, color: "rgba(201,168,76,0.7)" };
  };

  const msg = getMsg();

  return (
    <div>
      <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Adresse de livraison</label>
      <input
        type="text"
        name="adresse"
        required={required}
        value={adresse}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder="Numéro, rue, code postal, ville"
        className={ic}
        style={{ fontFamily: "'Jost', sans-serif" }}
      />
      {msg ? (
        <p className="text-xs mt-2 flex items-start gap-1.5" style={{ fontFamily: "'Jost', sans-serif", color: msg.color }}>
          <span className="flex-shrink-0">{msg.icon}</span>
          <span>{msg.text}</span>
        </p>
      ) : note ? (
        <p className="text-gold/40 text-xs mt-2 italic" style={{ fontFamily: "'Jost', sans-serif" }}>{note}</p>
      ) : null}
    </div>
  );
}
