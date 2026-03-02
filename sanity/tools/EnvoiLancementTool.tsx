"use client";

import { useEffect, useState } from "react";
import { useClient } from "sanity";

export function EnvoiLancementTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [inscrits, setInscrits] = useState<any[]>([]);
  const [filtre, setFiltre] = useState<"livre" | "ateliers" | "tous">("livre");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ titre: "", corps: "" });
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "waitlist"] | order(dateInscription desc) { _id, email, prenom, type, notifie, dateInscription }`)
      .then((data) => { setInscrits(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [client]);

  const filtres = filtre === "tous" ? inscrits : inscrits.filter((i) => i.type === filtre);
  const nonNotifies = filtres.filter((i) => !i.notifie);

  const handleEnvoi = async () => {
    if (!message.titre || !message.corps) {
      setResult("❌ Remplissez le titre et le message avant d'envoyer.");
      return;
    }
    if (!confirm(`Envoyer à ${nonNotifies.length} personne(s) ?`)) return;

    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/waitlist-lancement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: filtre,
          titre: message.titre,
          corps: message.corps,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(`✅ ${data.envoyes} email(s) envoyé(s) avec succès !`);
        // Rafraîchir la liste
        const updated = await client.fetch(`*[_type == "waitlist"] | order(dateInscription desc) { _id, email, prenom, type, notifie, dateInscription }`);
        setInscrits(updated);
      } else {
        setResult(`❌ Erreur : ${data.error}`);
      }
    } catch {
      setResult("❌ Erreur de connexion.");
    }
    setSending(false);
  };

  const labelType = (t: string) => t === "livre" ? "📖 Livre" : "👨‍🍳 Ateliers";

  return (
    <div style={{ padding: "32px", maxWidth: "800px", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>📧 Envoi liste d'attente</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Envoyez un email de lancement à tous les inscrits non encore notifiés.
      </p>

      {/* Filtres */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        {(["livre", "ateliers", "tous"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            style={{
              padding: "8px 20px",
              border: filtre === f ? "2px solid #c9a84c" : "1px solid #ddd",
              background: filtre === f ? "#fdf8ee" : "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: filtre === f ? "600" : "normal",
            }}
          >
            {f === "livre" ? "📖 Livre" : f === "ateliers" ? "👨‍🍳 Ateliers" : "Tous"}
          </button>
        ))}
      </div>

      {/* Stats */}
      {loading ? (
        <p>Chargement…</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "32px" }}>
          {[
            { label: "Total inscrits", value: filtres.length, color: "#333" },
            { label: "À notifier", value: nonNotifies.length, color: "#c9a84c" },
            { label: "Déjà notifiés", value: filtres.filter((i) => i.notifie).length, color: "#4caf50" },
          ].map((s) => (
            <div key={s.label} style={{ padding: "16px", background: "#f9f9f9", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Liste des inscrits */}
      <div style={{ marginBottom: "32px", maxHeight: "200px", overflowY: "auto", border: "1px solid #eee", borderRadius: "8px" }}>
        {filtres.length === 0 ? (
          <p style={{ padding: "16px", color: "#999", textAlign: "center" }}>Aucun inscrit pour l'instant.</p>
        ) : (
          filtres.map((i) => (
            <div key={i._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
              <div>
                <span style={{ fontWeight: "500" }}>{i.email}</span>
                {i.prenom && <span style={{ color: "#888", marginLeft: "8px", fontSize: "0.9rem" }}>{i.prenom}</span>}
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "#888" }}>{labelType(i.type)}</span>
                <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "12px", background: i.notifie ? "#e8f5e9" : "#fff8e1", color: i.notifie ? "#4caf50" : "#f9a825" }}>
                  {i.notifie ? "✅ Notifié" : "⏳ En attente"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Composer le message */}
      <div style={{ background: "#f9f9f9", padding: "24px", borderRadius: "8px", marginBottom: "24px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "1rem" }}>✍️ Composer le message de lancement</h3>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Objet de l'email
          </label>
          <input
            type="text"
            value={message.titre}
            onChange={(e) => setMessage({ ...message, titre: e.target.value })}
            placeholder="Ex: 📖 Le livre de recettes Cassiora est disponible !"
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.95rem", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Message (le prénom sera ajouté automatiquement)
          </label>
          <textarea
            value={message.corps}
            onChange={(e) => setMessage({ ...message, corps: e.target.value })}
            rows={6}
            placeholder="Ex: Bonne nouvelle ! Le livre de recettes Cassiora est enfin disponible. Vous pouvez le commander dès maintenant sur..."
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.95rem", resize: "vertical", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {result && (
        <div style={{ padding: "12px 16px", borderRadius: "6px", marginBottom: "16px", background: result.startsWith("✅") ? "#e8f5e9" : "#ffebee", color: result.startsWith("✅") ? "#2e7d32" : "#c62828" }}>
          {result}
        </div>
      )}

      <button
        onClick={handleEnvoi}
        disabled={sending || nonNotifies.length === 0}
        style={{
          padding: "14px 32px",
          background: sending || nonNotifies.length === 0 ? "#ccc" : "#c9a84c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: sending || nonNotifies.length === 0 ? "not-allowed" : "pointer",
          fontWeight: "600",
        }}
      >
        {sending ? "Envoi en cours…" : `Envoyer à ${nonNotifies.length} personne(s)`}
      </button>
      {nonNotifies.length === 0 && !loading && (
        <p style={{ color: "#888", fontSize: "0.85rem", marginTop: "8px" }}>Tous les inscrits ont déjà été notifiés.</p>
      )}
    </div>
  );
}