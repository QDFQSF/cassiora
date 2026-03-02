"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      if (res.ok) {
        setStatus("success");
        setForm({ nom: "", email: "", telephone: "", sujet: "", message: "" });
      } else {
        setStatus("error");
      }
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
                Traiteur, box gourmande, atelier culinaire ou toute autre question — je vous réponds rapidement. Zone d'intervention : Cahors, Montauban, Caussade, Lot (46), Tarn-et-Garonne (82).
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

            {/* Formulaire droite */}
            <div className="lg:col-span-3">
              {status === "success" ? (
                <div className="card-luxury p-10 text-center" style={{ border: "1px solid rgba(201, 168, 76, 0.3)" }}>
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
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Cinzel', serif" }}>Sujet</label>
                      <select name="sujet" required value={form.sujet} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Jost', sans-serif" }}>
                        <option value="" disabled>Choisir un sujet</option>
                        <option value="Traiteur">Prestation traiteur</option>
                        <option value="Box gourmande">Box gourmande</option>
                        <option value="Atelier culinaire">Atelier culinaire</option>
                        <option value="Livre de recettes">Livre de recettes</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Cinzel', serif" }}>Message</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Décrivez votre projet, vos besoins, votre date…" className={inputClass + " resize-none"} style={{ fontFamily: "'Jost', sans-serif" }} />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400/70 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-gold"
                    style={{ opacity: status === "loading" ? 0.7 : 1 }}
                  >
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