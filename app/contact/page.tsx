"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const SUJETS = [
  "Prestation traiteur",
  "Buffet Froid",
  "Cocktail Dînatoire",
  "Les Desserts du Traiteur",
  "Menu sur-mesure",
  "Box gourmande",
  "Abonnement Boîte à Goûter",
  "Atelier culinaire",
  "Livre de recettes",
  "Autre",
];

function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sujetOpen, setSujetOpen] = useState(false);

  // Pré-remplissage depuis URL params (depuis page traiteur)
  useEffect(() => {
    const sujet = searchParams.get("sujet");
    const message = searchParams.get("message");
    if (sujet || message) {
      setForm((f) => ({
        ...f,
        sujet: sujet || f.sujet,
        message: message || f.message,
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-transparent border-b border-gold/20 py-3 px-0 text-cream/80 text-sm placeholder-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300";
  const labelClass = "block text-[0.6rem] tracking-[0.2em] uppercase text-gold/50 mb-2";

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Parlons de votre projet</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          <span className="text-gold-light italic">Contact</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
      </div>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Infos gauche */}
            <div className="lg:col-span-2">
              <h2 className="text-cream text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>Envoyez-moi un message</h2>
              <p className="text-cream/45 text-sm leading-relaxed mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                Traiteur, box gourmande, atelier culinaire ou toute autre question — je vous réponds rapidement.<br /><br />
                Zone d'intervention : Cahors, Montauban, Caussade, Lot (46), Tarn-et-Garonne (82).
              </p>
              <div className="space-y-6">
                {[
                  { label: "Email", value: "cassioratraiteur@gmail.com", href: "mailto:cassioratraiteur@gmail.com" },
                  { label: "Instagram", value: "@cassiora.traiteur", href: "https://www.instagram.com/cassiora.traiteur" },
                  { label: "Facebook", value: "@cassiora.traiteur", href: "https://www.facebook.com/cassiora.traiteur" },
                  { label: "Zone", value: "Lot (46) · Tarn-et-Garonne (82)", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-gold mt-0.5">✦</span>
                    <div>
                      <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-cream/60 text-sm hover:text-cream transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.value}</a>
                      ) : (
                        <p className="text-cream/60 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              {status === "success" ? (
                <div className="card-luxury p-10 text-center" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
                  <div className="text-gold text-4xl mb-4">✦</div>
                  <h3 className="text-cream text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>Message envoyé !</h3>
                  <p className="text-cream/50 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>Merci ! Je vous réponds dans les meilleurs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Cinzel', serif" }}>Nom complet</label>
                      <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Votre nom" className={inputClass} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Cinzel', serif" }}>Email</label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="votre@email.com" className={inputClass} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Cinzel', serif" }}>Téléphone</label>
                      <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder="Optionnel" className={inputClass} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>

                    {/* Select sujet custom */}
                    <div className="relative">
                      <label className={labelClass} style={{ fontFamily: "'Cinzel', serif" }}>Sujet</label>
                      <button
                        type="button"
                        onClick={() => setSujetOpen(!sujetOpen)}
                        className="w-full text-left border-b py-3 flex justify-between items-center transition-colors duration-300"
                        style={{
                          borderColor: sujetOpen ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.2)",
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.875rem",
                          color: form.sujet ? "rgba(248,246,240,0.8)" : "rgba(248,246,240,0.25)",
                        }}
                      >
                        {form.sujet || "Choisir un sujet"}
                        <span className={`text-gold/50 transition-transform duration-200 ${sujetOpen ? "rotate-180" : ""}`}>▾</span>
                      </button>
                      {sujetOpen && (
                        <div className="absolute top-full left-0 right-0 z-20 mt-1" style={{ background: "#111", border: "1px solid rgba(201,168,76,0.25)" }}>
                          {SUJETS.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => { setForm({ ...form, sujet: s }); setSujetOpen(false); }}
                              className="w-full text-left px-4 py-3 text-sm transition-colors duration-150 hover:bg-gold/10"
                              style={{
                                fontFamily: "'Jost', sans-serif",
                                color: form.sujet === s ? "#e2ce75" : "rgba(248,246,240,0.65)",
                                borderBottom: "1px solid rgba(201,168,76,0.08)",
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Cinzel', serif" }}>Message</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet, vos besoins, votre date…"
                      className={inputClass + " resize-none"}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400/70 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Erreur lors de l'envoi. Contactez-nous directement par email.
                    </p>
                  )}

                  <button type="submit" disabled={status === "loading"} className="btn-gold" style={{ opacity: status === "loading" ? 0.7 : 1 }}>
                    {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}