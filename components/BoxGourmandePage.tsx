"use client";

import { useState } from "react";
import Image from "next/image";

const boxes = [
  { id: "pause-sucree", nom: "La Pause Sucrée", description: "Collections permanentes, retrouvez tous les mois dans votre box un gâteau/biscuit en plus.", contenu: ["Cookies 1/pers", "Muffins pépite de chocolat 1/pers", "Brownie 1/pers", "Donuts au sucre 1/pers", "+ Gâteau du mois 1/pers"], tarifs: { "2/3": 25, "4/6": 42, "8/10": 70 }, highlight: false },
  { id: "petit-dejeuner", nom: "Petit Déjeuner", description: "Le cake change toutes les semaines (citron ou marbré). Chouquettes selon la taille choisie.", contenu: ["Brioche au sucre 1/pers", "Brioche pépite de chocolat 1/pers", "Chouquettes (quantités variables)", "Madeleine 1/pers", "Mini Cake 1/pers"], tarifs: { "2/3": 20, "4/6": 35, "8/10": 55 }, highlight: false },
  { id: "brunch", nom: "Le Brunch de Cassiora", description: "Le brunch complet sucré-salé. Topping inclus (pâte à tartiner, caramel ou confiture au choix).", contenu: ["Brioche sucre + chocolat 1/pers", "Brioche perdue 1/pers", "Pancakes 1/pers", "Mini cake sucré 1/pers", "Chouquettes", "Mini quiche 1/pers", "Mini cake salé 1/pers", "Petits feuilletés salés 1/pers", "Brochette de fruits frais 1/pers", "1 pot de topping au choix"], tarifs: { "2/3": 32, "4/6": 56, "8/10": 90 }, highlight: true },
  { id: "fromage", nom: "Plateau de Fromage", description: "Sélection selon saison. Confiture/chutney + fruits et fruits secs compris. Pain non inclus.", contenu: ["Brie · Tomme de brebis · Bleu", "Cantal · Comté · Tomme du Ramier · Chèvre", "2/3 pers : 3 variétés", "4/6 pers : 5 variétés", "8/10 pers : 7 variétés"], tarifs: { "2/3": 26, "4/6": 45, "8/10": 75 }, highlight: false, image: "/images/plateau-fromage.jpg" },
  { id: "charcuterie", nom: "Plateau de Charcuterie", description: "Beurre + cornichons + fruits et légumes frais compris. Pain non inclus.", contenu: ["Jambon cru · Jambon blanc · Rosette", "Coppa · Chorizo · Saucisse sèche", "Terrine de campagne · Mousse de foie"], tarifs: { "2/3": 28, "4/6": 48, "8/10": 85 }, highlight: false, image: "/images/plateau-charcuterie.jpg" },
  { id: "alliance", nom: "L'Alliance Gourmande", description: "Sélection mixte fromages & charcuteries. Beurre + cornichons + fruits compris. Pain non inclus.", contenu: ["2/3 : 2 fromages + 2 charcuteries", "4/6 : 3 fromages + 4 charcuteries", "8/10 : 5 fromages + 6 charcuteries", "Beurre doux ou demi-sel au choix", "Cornichons + fruits & légumes frais"], tarifs: { "2/3": 32, "4/6": 56, "8/10": 90 }, highlight: false, image: "/images/alliance-gourmande.jpg" },
];

const abonnement = {
  nom: "La Boîte à Goûter",
  image: "/images/box-gouter.jpg",
  description: "Abonnement hebdomadaire. Retrait ou livraison toutes les deux semaines pour garantir la fraîcheur.",
  contenu: ["Cookies 2 pièces", "Le biscuit de la récré 4 pièces", "Barquette à la fraise 6 pièces", "Ourson moelleux aux pépites de chocolat 2 pièces", "+ Gâteau/biscuit du mois en plus"],
  formules: [
    { label: "2 semaines", detail: "10 goûters", prix: 22 },
    { label: "1 mois", detail: "20 goûters", prix: 36 },
    { label: "2 mois", detail: "40 goûters", prix: 60 },
  ],
};

type Taille = "2/3" | "4/6" | "8/10";
type FormuleAbo = { label: string; detail: string; prix: number };

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toISOString().split("T")[0];
}

function ModalCommande({ boxNom, taille, formule, prix, onClose }: { boxNom: string; taille?: Taille; formule?: FormuleAbo; prix: number; onClose: () => void }) {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", date: "", livraison: false, adresse: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const t = e.target;
    setForm((f) => ({ ...f, [t.name]: t.type === "checkbox" ? (t as HTMLInputElement).checked : t.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boxNom, taille, formule: formule ? `${formule.label} — ${formule.detail}` : undefined, prix, ...form }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  const ic = "w-full bg-transparent border-b border-gold/20 py-3 px-0 text-cream/80 text-sm placeholder-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300";
  const lc = "block text-[0.6rem] tracking-[0.2em] uppercase text-gold/50 mb-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.88)" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: "#0a0a0a", border: "1px solid rgba(201,168,76,0.3)" }}>
        <div className="absolute top-4 left-4 w-5 h-5 pointer-events-none" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
        <div className="absolute top-4 right-10 w-5 h-5 pointer-events-none" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
        <div className="absolute bottom-4 left-4 w-5 h-5 pointer-events-none" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
        <div className="absolute bottom-4 right-4 w-5 h-5 pointer-events-none" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
        <button onClick={onClose} className="absolute top-4 right-4 text-cream/40 hover:text-cream text-2xl leading-none z-10">×</button>
        <div className="p-8">
          <div className="mb-6 p-4" style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <p className="text-gold/60 text-[0.55rem] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>Votre commande</p>
            <p className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>{boxNom}</p>
            <p className="text-gold/80 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              {taille ? `${taille} personnes` : `${formule?.label} — ${formule?.detail}`} · <strong>{prix}€</strong>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Nom complet</label><input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Votre nom" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
              <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Email</label><input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="votre@email.com" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Téléphone</label><input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder="06 xx xx xx xx" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
              <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Date souhaitée</label><input type="date" name="date" required min={getMinDate()} value={form.date} onChange={handleChange} className={ic} style={{ fontFamily: "'Jost', sans-serif", colorScheme: "dark" }} /></div>
            </div>
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center transition-all duration-200" style={{ border: `1px solid ${form.livraison ? "#c9a84c" : "rgba(201,168,76,0.3)"}`, background: form.livraison ? "rgba(201,168,76,0.15)" : "transparent" }}>
                  {form.livraison && <span className="text-gold text-xs">✓</span>}
                </div>
                <input type="checkbox" name="livraison" checked={form.livraison} onChange={handleChange} className="sr-only" />
                <span className="text-cream/60 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Je souhaite une livraison à domicile</span>
              </label>
              {form.livraison && (
                <div className="mt-4">
                  <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Adresse de livraison</label>
                  <input type="text" name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse complète" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} />
                  <p className="text-gold/40 text-xs mt-2 italic" style={{ fontFamily: "'Jost', sans-serif" }}>Les frais de livraison seront calculés selon votre zone et confirmés par email.</p>
                </div>
              )}
            </div>
            <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Message (optionnel)</label><textarea name="message" rows={2} value={form.message} onChange={handleChange} placeholder="Allergies, précisions, demandes particulières…" className={ic + " resize-none"} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
            {status === "error" && <p className="text-red-400/70 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Erreur lors de la connexion au paiement. Veuillez réessayer.</p>}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gold/40 text-xs">🔒</span>
                <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Paiement sécurisé par Stripe · CB, Visa, Mastercard</p>
              </div>
              <button type="submit" disabled={status === "loading"} className="btn-gold w-full justify-center" style={{ opacity: status === "loading" ? 0.7 : 1 }}>
                {status === "loading" ? "Redirection vers le paiement…" : `Payer ${prix}€ en ligne`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BoxGourmandePage() {
  const [tailles, setTailles] = useState<Record<string, Taille>>({});
  const [modal, setModal] = useState<{ boxNom: string; taille?: Taille; formule?: FormuleAbo; prix: number } | null>(null);
  const [formuleIdx, setFormuleIdx] = useState(0);

  const getTaille = (id: string): Taille => tailles[id] || "4/6";
  const setTaille = (id: string, t: Taille) => setTailles((p) => ({ ...p, [id]: t }));

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>À offrir ou à savourer</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Box <span className="text-gold-light italic">Gourmandes</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
        <p className="text-cream/40 text-sm mt-6 max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Commande à passer <strong className="text-cream/60">5 jours à l'avance minimum</strong> · Retrait sur place ou livraison à la demande
        </p>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boxes.map((box) => {
              const taille = getTaille(box.id);
              const prix = box.tarifs[taille];
              return (
                <div key={box.id} className="card-luxury flex flex-col relative overflow-hidden" style={box.highlight ? { borderColor: "rgba(201,168,76,0.5)" } : {}}>
                  {box.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-black text-[0.55rem] tracking-[0.2em] uppercase whitespace-nowrap z-10" style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}>Le plus populaire</div>
                  )}
                  {(box as any).image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t">
                      <Image src={(box as any).image} alt={box.nom} fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-4">
                      <h2 className="text-gold-light text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{box.nom}</h2>
                      <p className="text-cream/40 text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{box.description}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gold/50 text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Nombre de personnes</p>
                      <div className="flex gap-2">
                        {(["2/3", "4/6", "8/10"] as Taille[]).map((t) => (
                          <button key={t} onClick={() => setTaille(box.id, t)} className="flex-1 py-2 transition-all duration-200" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.1em", border: taille === t ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.2)", background: taille === t ? "rgba(201,168,76,0.12)" : "transparent", color: taille === t ? "#e2ce75" : "rgba(248,246,240,0.4)" }}>
                            {t} pers
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-5 flex items-baseline gap-2">
                      <span className="text-gold-light text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>{prix}€</span>
                      <span className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>pour {taille} personnes</span>
                    </div>
                    <div className="gold-divider mb-5" />
                    <ul className="space-y-2 flex-1 mb-6">
                      {box.contenu.map((c, i) => (
                        <li key={i} className="text-cream/55 text-xs flex items-start gap-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                          <span className="text-gold/40 mt-0.5 flex-shrink-0">—</span>{c}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setModal({ boxNom: box.nom, taille, prix })} className="btn-gold w-full justify-center text-center">Commander</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="abonnement" className="py-16 px-6 border-t border-gold/10" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>Abonnement</p>
            <h2 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.5rem" }}>🎒 {abonnement.nom}</h2>
            <p className="text-cream/40 text-sm mt-3 max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{abonnement.description}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="card-luxury overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden rounded-t">
                <Image src={abonnement.image} alt={abonnement.nom} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-7">
                <p className="text-gold/60 text-[0.55rem] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Contenu hebdomadaire</p>
                <ul className="space-y-2.5">
                  {abonnement.contenu.map((c, i) => (
                    <li key={i} className="text-cream/55 text-sm flex items-start gap-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                      <span className="text-gold/40 mt-0.5">—</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card-luxury p-7">
              <p className="text-gold/60 text-[0.55rem] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Choisissez votre formule</p>
              <div className="space-y-3 mb-6">
                {abonnement.formules.map((f, i) => (
                  <button key={i} onClick={() => setFormuleIdx(i)} className="w-full p-4 text-left flex justify-between items-center transition-all duration-200" style={{ border: formuleIdx === i ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.15)", background: formuleIdx === i ? "rgba(201,168,76,0.08)" : "transparent" }}>
                    <div>
                      <p className="text-cream/80" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{f.label}</p>
                      <p className="text-cream/35 text-xs" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{f.detail}</p>
                    </div>
                    <span className="text-gold-light text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{f.prix}€</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setModal({ boxNom: abonnement.nom, formule: abonnement.formules[formuleIdx], prix: abonnement.formules[formuleIdx].prix })} className="btn-gold w-full justify-center">S'abonner</button>
            </div>
          </div>
        </div>
      </section>

      {modal && <ModalCommande boxNom={modal.boxNom} taille={modal.taille} formule={modal.formule} prix={modal.prix} onClose={() => setModal(null)} />}
    </div>
  );
}