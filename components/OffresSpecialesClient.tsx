"use client";

import { useState } from "react";
import Link from "next/link";

// Même données que BoxGourmandePage
const boxes = [
  { id: "pause-sucree", nom: "La Pause Sucrée", tarifs: { "2/3": 25, "4/6": 42, "8/10": 70 } },
  { id: "petit-dejeuner", nom: "Petit Déjeuner", tarifs: { "2/3": 20, "4/6": 35, "8/10": 55 } },
  { id: "brunch", nom: "Le Brunch de Cassiora", tarifs: { "2/3": 32, "4/6": 56, "8/10": 90 } },
  { id: "fromage", nom: "Plateau de Fromage", tarifs: { "2/3": 26, "4/6": 45, "8/10": 75 } },
  { id: "charcuterie", nom: "Plateau de Charcuterie", tarifs: { "2/3": 28, "4/6": 48, "8/10": 85 } },
  { id: "alliance", nom: "L'Alliance Gourmande", tarifs: { "2/3": 32, "4/6": 56, "8/10": 90 } },
];

type Taille = "2/3" | "4/6" | "8/10";
type ModalType = "brunch_alliance" | "pack_decouverte" | "duo_gourmand" | "boite_gouter";

const OFFRE_MODAL_MAP: Record<string, ModalType> = {
  "lancement-1": "brunch_alliance",
  "lancement-2": "pack_decouverte",
  "lancement-3": "duo_gourmand",
  "lancement-4": "boite_gouter",
};

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toISOString().split("T")[0];
}

// Styles partagés
const ic = "w-full bg-transparent border-b border-gold/20 py-3 px-0 text-cream/80 text-sm placeholder-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300";
const lc = "block text-[0.6rem] tracking-[0.2em] uppercase text-gold/50 mb-2";

// Bouton taille partagé
function TailleBtn({ taille, active, onClick }: { taille: Taille; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex-1 py-2 transition-all duration-200" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.1em", border: active ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.2)", background: active ? "rgba(201,168,76,0.12)" : "transparent", color: active ? "#e2ce75" : "rgba(248,246,240,0.4)" }}>
      {taille} pers
    </button>
  );
}

// Sélecteur de box partagé
function BoxSelector({ label, value, onChange }: { label: string; value: string; onChange: (id: string) => void }) {
  return (
    <div className="mb-4">
      <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>{label}</label>
      <div className="space-y-2">
        {boxes.map((b) => (
          <button key={b.id} type="button" onClick={() => onChange(b.id)} className="w-full text-left px-3 py-2.5 transition-all duration-200 flex justify-between items-center" style={{ border: value === b.id ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.15)", background: value === b.id ? "rgba(201,168,76,0.08)" : "transparent" }}>
            <span className="text-cream/70 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>{b.nom}</span>
            <span className="text-gold/60 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>dès {b.tarifs["2/3"]}€</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Shell de modale partagé
function ModalShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.88)" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: "#0a0a0a", border: "1px solid rgba(201,168,76,0.3)" }}>
        <div className="absolute top-4 left-4 w-5 h-5 pointer-events-none" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
        <div className="absolute top-4 right-10 w-5 h-5 pointer-events-none" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
        <div className="absolute bottom-4 left-4 w-5 h-5 pointer-events-none" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
        <div className="absolute bottom-4 right-4 w-5 h-5 pointer-events-none" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
        <button onClick={onClose} className="absolute top-4 right-4 text-cream/40 hover:text-cream text-2xl leading-none z-10">×</button>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

function SummaryBox({ titre, detail }: { titre: string; detail: string }) {
  return (
    <div className="mb-6 p-4" style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}>
      <p className="text-gold/60 text-[0.55rem] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>Votre offre</p>
      <p className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>{titre}</p>
      <p className="text-gold/80 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{detail}</p>
    </div>
  );
}

function SubmitRow({ prix, status }: { prix: string; status: "idle" | "loading" | "error" }) {
  return (
    <div className="pt-2">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gold/40 text-xs">🔒</span>
        <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Paiement sécurisé par Stripe · CB, Visa, Mastercard</p>
      </div>
      {status === "error" && <p className="text-red-400/70 text-xs mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>Erreur lors de la connexion au paiement. Veuillez réessayer.</p>}
      <button type="submit" disabled={status === "loading"} className="btn-gold w-full justify-center" style={{ opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Redirection vers le paiement…" : `Payer ${prix} en ligne`}
      </button>
    </div>
  );
}

async function submitCheckout(body: object, setStatus: (s: "idle" | "loading" | "error") => void) {
  setStatus("loading");
  try {
    const res = await fetch("/api/checkout-offre", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.url) { window.location.href = data.url; }
    else { setStatus("error"); }
  } catch { setStatus("error"); }
}

// ─── Modale 1 : Brunch Alliance ────────────────────────────────────────────
function ModalBrunchAlliance({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", date: "", livraison: false, adresse: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target;
    setForm((f) => ({ ...f, [t.name]: t.type === "checkbox" ? t.checked : t.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckout({ offre: "brunch_alliance", ...form }, setStatus);
  };

  return (
    <ModalShell onClose={onClose}>
      <SummaryBox titre="Brunch XXL / L'Alliance Gourmande" detail="Box Brunch 8-10 pers + Box Alliance Gourmande 2-3 pers à -50% · 106€" />
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Nom complet</label><input type="text" name="nom" required value={form.nom} onChange={handle} placeholder="Votre nom" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Email</label><input type="email" name="email" required value={form.email} onChange={handle} placeholder="votre@email.com" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Téléphone</label><input type="tel" name="telephone" value={form.telephone} onChange={handle} placeholder="06 xx xx xx xx" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Date souhaitée</label><input type="date" name="date" required min={getMinDate()} value={form.date} onChange={handle} className={ic} style={{ fontFamily: "'Jost', sans-serif", colorScheme: "dark" }} /></div>
        </div>
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center transition-all duration-200" style={{ border: `1px solid ${form.livraison ? "#c9a84c" : "rgba(201,168,76,0.3)"}`, background: form.livraison ? "rgba(201,168,76,0.15)" : "transparent" }}>
              {form.livraison && <span className="text-gold text-xs">✓</span>}
            </div>
            <input type="checkbox" name="livraison" checked={form.livraison} onChange={handle} className="sr-only" />
            <span className="text-cream/60 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Je souhaite une livraison à domicile</span>
          </label>
          {form.livraison && (
            <div className="mt-4">
              <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Adresse de livraison</label>
              <input type="text" name="adresse" value={form.adresse} onChange={handle} placeholder="Adresse complète" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} />
              <p className="text-gold/40 text-xs mt-2 italic" style={{ fontFamily: "'Jost', sans-serif" }}>Frais confirmés par email selon votre zone.</p>
            </div>
          )}
        </div>
        <SubmitRow prix="106€" status={status} />
      </form>
    </ModalShell>
  );
}

// ─── Modale 2 : Pack Découverte ─────────────────────────────────────────────
function ModalPackDecouverte({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nom: "", email: "" });
  const [boxId, setBoxId] = useState("brunch");
  const [taille, setTaille] = useState<Taille>("4/6");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const box = boxes.find((b) => b.id === boxId)!;
  const prix = box.tarifs[taille];

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckout({ offre: "pack_decouverte", ...form, boxNom: box.nom, taille, prix }, setStatus);
  };

  return (
    <ModalShell onClose={onClose}>
      <SummaryBox titre="Pack Découverte Gourmand" detail="Mini assortiment sucré offert avec toute Box · Prix normal de la box" />
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Nom complet</label><input type="text" name="nom" required value={form.nom} onChange={handle} placeholder="Votre nom" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Email</label><input type="email" name="email" required value={form.email} onChange={handle} placeholder="votre@email.com" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
        </div>
        <BoxSelector label="Choisissez votre box" value={boxId} onChange={setBoxId} />
        <div>
          <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Nombre de personnes</label>
          <div className="flex gap-2">
            {(["2/3", "4/6", "8/10"] as Taille[]).map((t) => (
              <TailleBtn key={t} taille={t} active={taille === t} onClick={() => setTaille(t)} />
            ))}
          </div>
        </div>
        <div className="p-3 text-center" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
          <span className="text-gold-light text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{prix}€</span>
          <span className="text-cream/40 text-xs ml-2" style={{ fontFamily: "'Jost', sans-serif" }}>+ assortiment sucré offert</span>
        </div>
        <SubmitRow prix={`${prix}€`} status={status} />
      </form>
    </ModalShell>
  );
}

// ─── Modale 3 : Duo Gourmand ────────────────────────────────────────────────
function ModalDuoGourmand({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nom: "", email: "" });
  const [box1Id, setBox1Id] = useState("brunch");
  const [box1Taille, setBox1Taille] = useState<Taille>("4/6");
  const [box2Id, setBox2Id] = useState("pause-sucree");
  const [box2Taille, setBox2Taille] = useState<Taille>("4/6");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const box1 = boxes.find((b) => b.id === box1Id)!;
  const box2 = boxes.find((b) => b.id === box2Id)!;
  const box1Prix = box1.tarifs[box1Taille];
  const box2Prix = box2.tarifs[box2Taille];
  const totalPrix = Math.round((box1Prix + box2Prix * 0.85) * 100) / 100;

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckout({ offre: "duo_gourmand", ...form, box1Nom: box1.nom, box1Taille, box1Prix, box2Nom: box2.nom, box2Taille, box2Prix }, setStatus);
  };

  return (
    <ModalShell onClose={onClose}>
      <SummaryBox titre="Le Duo Gourmand" detail="Box 1 au prix normal · Box 2 à -15%" />
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Nom complet</label><input type="text" name="nom" required value={form.nom} onChange={handle} placeholder="Votre nom" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Email</label><input type="email" name="email" required value={form.email} onChange={handle} placeholder="votre@email.com" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
        </div>

        <div style={{ border: "1px solid rgba(201,168,76,0.15)", padding: "16px" }}>
          <p className="text-gold/60 text-[0.55rem] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>Box 1 — Prix normal</p>
          <BoxSelector label="Choisissez la Box 1" value={box1Id} onChange={setBox1Id} />
          <div>
            <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Taille</label>
            <div className="flex gap-2">
              {(["2/3", "4/6", "8/10"] as Taille[]).map((t) => (
                <TailleBtn key={t} taille={t} active={box1Taille === t} onClick={() => setBox1Taille(t)} />
              ))}
            </div>
          </div>
          <p className="text-gold/60 text-right text-sm mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{box1Prix}€</p>
        </div>

        <div style={{ border: "1px solid rgba(201,168,76,0.15)", padding: "16px" }}>
          <p className="text-gold/60 text-[0.55rem] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>Box 2 — -15%</p>
          <BoxSelector label="Choisissez la Box 2" value={box2Id} onChange={setBox2Id} />
          <div>
            <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Taille</label>
            <div className="flex gap-2">
              {(["2/3", "4/6", "8/10"] as Taille[]).map((t) => (
                <TailleBtn key={t} taille={t} active={box2Taille === t} onClick={() => setBox2Taille(t)} />
              ))}
            </div>
          </div>
          <p className="text-gold/60 text-right text-sm mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="line-through text-cream/30 mr-2">{box2Prix}€</span>
            {Math.round(box2Prix * 0.85 * 100) / 100}€
          </p>
        </div>

        <div className="p-3 text-center" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
          <span className="text-gold-light text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{totalPrix}€</span>
          <span className="text-cream/40 text-xs ml-2" style={{ fontFamily: "'Jost', sans-serif" }}>au lieu de {box1Prix + box2Prix}€</span>
        </div>
        <SubmitRow prix={`${totalPrix}€`} status={status} />
      </form>
    </ModalShell>
  );
}

// ─── Modale 4 : Boîte à Goûter ──────────────────────────────────────────────
function ModalBoiteGouter({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", adresse: "", dateDebut: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckout({ offre: "boite_gouter", ...form }, setStatus);
  };

  return (
    <ModalShell onClose={onClose}>
      <SummaryBox titre="La Boîte à Goûter" detail="30 goûters pour le prix de 20 · Offre de lancement · 36€ au lieu de 58€" />
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Nom complet</label><input type="text" name="nom" required value={form.nom} onChange={handle} placeholder="Votre nom" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Email</label><input type="email" name="email" required value={form.email} onChange={handle} placeholder="votre@email.com" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Téléphone</label><input type="tel" name="telephone" value={form.telephone} onChange={handle} placeholder="06 xx xx xx xx" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} /></div>
          <div><label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Date de début</label><input type="date" name="dateDebut" required min={getMinDate()} value={form.dateDebut} onChange={handle} className={ic} style={{ fontFamily: "'Jost', sans-serif", colorScheme: "dark" }} /></div>
        </div>
        <div>
          <label className={lc} style={{ fontFamily: "'Cinzel', serif" }}>Adresse de livraison</label>
          <input type="text" name="adresse" required value={form.adresse} onChange={handle} placeholder="Adresse complète" className={ic} style={{ fontFamily: "'Jost', sans-serif" }} />
          <p className="text-gold/40 text-xs mt-2 italic" style={{ fontFamily: "'Jost', sans-serif" }}>Livraison toutes les deux semaines pour garantir la fraîcheur.</p>
        </div>
        <SubmitRow prix="36€" status={status} />
      </form>
    </ModalShell>
  );
}

// ─── Composant principal ────────────────────────────────────────────────────
export default function OffresSpecialesClient({ offres }: { offres: any[] }) {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Disponibles maintenant</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Offres <span className="text-gold-light italic">spéciales</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
        <p className="text-gold/30 text-xs mt-4" style={{ fontFamily: "'Jost', sans-serif" }}>Non cumulables entre elles</p>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offres.map((offre: any) => {
              const modalType = OFFRE_MODAL_MAP[offre._id];
              return (
                <div key={offre._id} className="card-luxury p-8 relative" style={{ border: "1px solid rgba(201, 168, 76, 0.35)" }}>
                  {offre.badge && (
                    <div className="absolute -top-3 left-6 px-4 py-1 text-black text-[0.55rem] tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}>
                      {offre.badge}
                    </div>
                  )}
                  {offre.validiteJusquau && (
                    <p className="text-gold/40 text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                      Jusqu'au {new Date(offre.validiteJusquau).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  )}
                  <h2 className="text-gold-light text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>{offre.titre}</h2>
                  {offre.prix && <p className="text-gold text-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>{offre.prix}</p>}
                  <p className="text-cream/50 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{offre.description}</p>
                  <div className="gold-divider mb-6" />
                  {offre.details && (
                    <ul className="space-y-3 mb-8">
                      {offre.details.map((d: string, i: number) => (
                        <li key={i} className="text-cream/65 flex items-center gap-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
                          <span className="text-gold/50 text-xs">✦</span>{d}
                        </li>
                      ))}
                    </ul>
                  )}
                  {modalType ? (
                    <button onClick={() => setActiveModal(modalType)} className="btn-gold">
                      {offre.cta || "Commander maintenant"}
                    </button>
                  ) : (
                    <Link href="/contact" className="btn-gold">{offre.cta || "Réserver"}</Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeModal === "brunch_alliance" && <ModalBrunchAlliance onClose={() => setActiveModal(null)} />}
      {activeModal === "pack_decouverte" && <ModalPackDecouverte onClose={() => setActiveModal(null)} />}
      {activeModal === "duo_gourmand" && <ModalDuoGourmand onClose={() => setActiveModal(null)} />}
      {activeModal === "boite_gouter" && <ModalBoiteGouter onClose={() => setActiveModal(null)} />}
    </div>
  );
}
