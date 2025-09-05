// src/App.jsx
import data from "./content/site.json";
import React, { useMemo, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

/* ====== Design (couleurs / typos) ====== */
const BRAND = {
  gold: "#D4AF37",
  black: "#000000",
  olive: "#A7A587",
  terra: "#C8775E",
  ivory: "#F8F6F0",
  offBlack: "#1a1a1a",
};
const WHATSAPP_NUMBER = "+33600000000"; // <-- remplace par le vrai numéro
const PRO_EMAIL = "contact@cassiora.fr"; // <-- remplace par le vrai email

function waLink(preset = "Bonjour Cassiora, je souhaite un devis.") {
  const encoded = encodeURIComponent(preset);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encoded}`;
}
function mailto(
  subject = "Demande de devis — Cassiora",
  body = "Bonjour,\n\nJe souhaite obtenir un devis.\n"
) {
  return `mailto:${PRO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const GlobalHead = () => (
  <>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>{`
      :root{--cassiora-gold:${BRAND.gold};--cassiora-black:${BRAND.black};--cassiora-olive:${BRAND.olive};--cassiora-terra:${BRAND.terra};--cassiora-ivory:${BRAND.ivory}}
      .font-title{font-family:'Cormorant Garamond',ui-serif,Georgia,serif}
      .font-body{font-family:'Montserrat',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue','Noto Sans','Apple Color Emoji','Segoe UI Emoji',sans-serif}
      html{scroll-behavior:auto}
    `}</style>
  </>
);

function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/* ====== Header / Menu (liens vers vraies pages) ====== */
function BrandBadge() {
  return (
    <div className="leading-tight">
      <div className="font-title text-xl tracking-wide" style={{ color: BRAND.gold }}>
        CASSIORA
      </div>
      <div className="font-body text-[10px] uppercase tracking-widest" style={{ color: BRAND.ivory }}>
        Traiteur
      </div>
    </div>
  );
}

function StickyNav() {
  const items = [
    { to: "/", label: "Accueil" },
    { to: "/traiteur", label: "Traiteur" },
    { to: "/box", label: "Box gourmande" },
    { to: "/ateliers", label: "Ateliers" },
    { to: "/livre", label: "Livre" },
    { to: "/avis", label: "Avis clients" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 backdrop-blur bg-black/60">
      <Container className="flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <BrandBadge />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {items.map((it) => (
            <Link key={it.to} to={it.to} className="font-body text-sm text-white/90 hover:text-white">
              {it.label}
            </Link>
          ))}
          <a
            href={waLink("Bonjour Cassiora, j’aimerais commander / réserver.")}
            className="rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm"
            style={{ background: BRAND.gold, color: BRAND.black }}
          >
            Commander
          </a>
        </nav>
        <button onClick={() => setOpen((o) => !o)} className="md:hidden text-white" aria-label="Menu">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </Container>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80">
          <Container className="flex flex-col py-3">
            {items.map((it) => (
              <Link key={it.to} to={it.to} onClick={() => setOpen(false)} className="py-2 font-body text-white/90">
                {it.label}
              </Link>
            ))}
            <a href={waLink()} className="mt-2 rounded-xl px-4 py-2 text-center font-semibold" style={{ background: BRAND.gold, color: BRAND.black }}>
              Commander
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}

/* ====== Sections réutilisables ====== */
function Hero() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(180deg, ${BRAND.offBlack}, #000)` }} />
      <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-title text-4xl sm:text-5xl text-white">
            {data.branding.homeTitle}
          </h1>
          <p className="mt-4 font-body text-white/80">{data.branding.homeIntro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/traiteur" className="rounded-xl px-5 py-3 font-body font-semibold" style={{ background: BRAND.gold, color: BRAND.black }}>
              Découvrir le traiteur
            </Link>
            <Link to="/box" className="rounded-xl px-5 py-3 font-body font-semibold border" style={{ borderColor: BRAND.gold, color: BRAND.gold }}>
              Box gourmande
            </Link>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-white/10 bg-black">
          <img
            alt="Cassiora Traiteur"
            className="h-full w-full object-contain"
            src="/images/logo-cassiora1.png"
          />
        </div>
      </Container>
    </section>
  );
}

function SectionShell({ eyebrow, title, intro, children, tone = "light" }) {
  const bg = tone === "light" ? BRAND.ivory : "#0a0a0a";
  const fg = tone === "light" ? BRAND.offBlack : "#f5f5f5";
  return (
    <section style={{ background: bg, color: fg }} className="py-16">
      <Container>
        <div className="mb-8">
          <div className="font-body text-xs uppercase tracking-widest" style={{ color: BRAND.olive }}>{eyebrow}</div>
          <h2 className="font-title text-3xl mt-2">{title}</h2>
          {intro && <p className="font-body mt-3 max-w-2xl text-base/relaxed text-black/70">{intro}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
function PhotoMasonry({ urls = [] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
      <div className="grid grid-cols-1 gap-4">
        {urls.map((src, i) => (<img key={i} src={src} alt="Cassiora" className="mb-4 w-full break-inside-avoid rounded-2xl shadow" />))}
      </div>
    </div>
  );
}
function PricingTable({ items }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <div key={i} className="rounded-2xl border p-6 shadow-sm bg-white" style={{ borderColor: BRAND.olive + "55" }}>
          <div className="font-title text-xl">{p.title}</div>
          <p className="font-body mt-1 text-sm text-black/70">{p.desc}</p>
          <div className="font-title mt-4 text-3xl" style={{ color: BRAND.terra }}>{p.price}</div>
          {p.note && <div className="font-body mt-2 text-xs text-black/60">{p.note}</div>}
        </div>
      ))}
    </div>
  );
}
function SimpleMenu({ groups }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {groups.map((g, i) => (
        <div key={i} className="rounded-2xl bg-white p-6 shadow ring-1" style={{ ringColor: BRAND.olive + "55" }}>
          <h3 className="font-title text-xl" style={{ color: BRAND.gold }}>{g.name}</h3>
          <ul className="mt-3 space-y-2 font-body text-sm">
            {g.items.map((it, j) => (
              <li key={j} className="flex items-start justify-between gap-4">
                <span>{it.name}</span>
                {it.price && <span className="text-black/60">{it.price}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
function CTADevis({ label = "Demande de devis" }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a href={waLink("Bonjour Cassiora, je souhaite un devis pour un événement.")} className="rounded-xl px-5 py-3 font-body font-semibold" style={{ background: BRAND.gold, color: BRAND.black }}>{label} (WhatsApp)</a>
      <a href={mailto()} className="rounded-xl px-5 py-3 font-body font-semibold border" style={{ borderColor: BRAND.gold, color: BRAND.gold }}>{label} (Email)</a>
    </div>
  );
}

/* ====== Pages ====== */
function Traiteur() {
  const photos = (data.traiteur.formules.flatMap(f => f.photos)).slice(0, 3);
  const pricing = data.traiteur.formules.map(f => ({
    title: f.titre,
    desc: f.desc,
    price: f.prix,
    slug: f.slug,
  }));

  return (
    <SectionShell
      eyebrow="Prestations"
      title="Traiteur"
      intro={data.traiteur.intro} // <-- texte vient de site.json
    >
      <PhotoMasonry urls={photos} />
      <div className="mt-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.map((p) => {
  const f = data.traiteur.formules.find(x => x.slug === p.slug);
  const hasPdf = !!f?.pdf;
  const to = hasPdf ? `/menu/${p.slug}` : `/traiteur/${p.slug}`;

  return (
    <Link
      key={p.slug}
      to={to}
      className="rounded-2xl border p-6 shadow-sm bg-white hover:shadow"
      style={{ borderColor: BRAND.olive + "55" }}
    >
      <div className="font-title text-xl">{p.title}</div>
      <p className="font-body mt-1 text-sm text-black/70">{p.desc}</p>
      <div className="font-title mt-4 text-3xl" style={{ color: BRAND.terra }}>
        {p.price}
      </div>
      {hasPdf && (
        <div className="mt-3 font-body text-xs text-black/60">
          Cliquer ouvre le menu PDF
        </div>
      )}
    </Link>
  );
})}

function BoxGourmande() {
  const list = data.boxes;
  return (
    <SectionShell
      eyebrow="À emporter / Offrir"
      title="Box gourmande"
      intro="Des compositions prêtes à savourer — à récupérer ou livrées selon zone. Options végétariennes & sans porc sur demande."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => (
          <Link
            key={b.slug}
            to={`/box/${b.slug}`}
            className="rounded-2xl bg-white p-6 shadow ring-1 hover:shadow-lg"
            style={{ ringColor: BRAND.olive + "55" }}
          >
            <div className="font-title text-xl" style={{ color: BRAND.gold }}>{b.titre}</div>
            <p className="font-body text-sm text-black/70 mt-1">
              {b.theme} — {b.prix}
            </p>
            <p className="font-body text-xs text-black/60 mt-2">Tailles : {b.tailles.join(", ")}</p>
          </Link>
        ))}
      </div>
      <p className="font-body text-sm text-black/60 mt-4">{data.noteBoxes}</p>
      <CTADevis />
    </SectionShell>
  );
}
function MiniCalendar({ onChange }) {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const days = Array.from({ length: end.getDate() }, (_, i) => i + 1);
  return (
    <div className="rounded-2xl border p-4 bg-white" style={{ borderColor: BRAND.olive + "55" }}>
      <div className="flex items-center justify-between">
        <button className="px-2 py-1 rounded" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>«</button>
        <div className="font-body font-semibold">
          {month.toLocaleString("fr-FR", { month: "long", year: "numeric" })}
        </div>
        <button className="px-2 py-1 rounded" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>»</button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2 text-center text-xs">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
          <div key={d} className="text-black/60">
            {d}
          </div>
        ))}
        {Array.from({ length: (start.getDay() + 6) % 7 }).map((_, i) => (
          <div key={"sp" + i}></div>
        ))}
        {days.map((d) => (
          <button
            key={d}
            onClick={() => onChange?.(new Date(month.getFullYear(), month.getMonth(), d))}
            className="rounded-lg py-2 hover:ring-2"
            style={{ background: BRAND.ivory }}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
function Ateliers() {
  const [selection, setSelection] = useState({ type: data.ateliers[0]?.titre || "Atelier", date: null });
  return (
    <SectionShell eyebrow="Apprendre & partager" title="Ateliers" intro="Choisissez une thématique et réservez une date. Paiement sur place.">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-3">
          {data.ateliers.map((c) => (
            <Link key={c.slug} to={`/ateliers/${c.slug}`} className="block rounded-2xl border p-4 hover:shadow" style={{ borderColor: BRAND.olive + "55" }}>
              <div className="font-title text-lg">{c.titre}</div>
              <div className="font-body text-sm text-black/70">{c.desc}</div>
            </Link>
          ))}
        </div>
        <div className="lg:col-span-2 space-y-4">
          <MiniCalendar onChange={(d) => setSelection((s) => ({ ...s, date: d }))} />
          <div className="rounded-2xl bg-white p-6 ring-1" style={{ ringColor: BRAND.olive + "55" }}>
            <div className="font-title text-xl" style={{ color: BRAND.gold }}>Pré-réserver une date</div>
            <div className="font-body mt-2 text-sm">
              Date choisie : <b>{selection.date ? selection.date.toLocaleDateString("fr-FR") : "(à choisir)"}</b>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={waLink(
                  `Bonjour, je souhaite réserver un atelier le ${
                    selection.date ? selection.date.toLocaleDateString("fr-FR") : "(date à préciser)"
                  }.`
                )}
                className="rounded-xl px-4 py-2 font-semibold"
                style={{ background: BRAND.gold, color: BRAND.black }}
              >
                Réserver par WhatsApp
              </a>
              <a
                href={mailto(
                  "Réservation atelier Cassiora",
                  `Bonjour,\n\nJe souhaite réserver un atelier.\nDate: ${
                    selection.date ? selection.date.toLocaleDateString("fr-FR") : "(à préciser)"
                  }.\nNombre de personnes: ____.\n`
                )}
                className="rounded-xl px-4 py-2 font-semibold border"
                style={{ borderColor: BRAND.gold, color: BRAND.gold }}
              >
                Réserver par Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
function Livre() {
  const [open, setOpen] = useState(null); // slug ou null
  return (
    <SectionShell eyebrow="Éditions Cassiora" title="Livre de recettes" intro={data.livre.intro}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.livre.recettes.map((ex) => (
          <button
            key={ex.slug}
            onClick={() => setOpen(ex.slug)}
            className="text-left rounded-2xl bg-white p-5 shadow ring-1 hover:shadow-lg"
            style={{ ringColor: BRAND.olive + "55" }}
          >
            <h3 className="font-title text-lg" style={{ color: BRAND.gold }}>{ex.titre}</h3>
            <p className="font-body mt-2 text-sm text-black/70">{ex.extrait}</p>
          </button>
        ))}
      </div>

      {open &&
        (() => {
          const r = data.livre.recettes.find((x) => x.slug === open);
          return (
            <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setOpen(null)}>
              <div className="max-w-2xl w-full rounded-2xl bg-white p-6 shadow" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center">
                  <h3 className="font-title text-2xl">{r.titre}</h3>
                  <button onClick={() => setOpen(null)} className="font-body">✕</button>
                </div>
                {r.photo && <img src={r.photo} alt="" className="mt-3 rounded-xl" />}
                <p className="font-body mt-4 text-sm leading-relaxed whitespace-pre-wrap">{r.texteComplet}</p>
              </div>
            </div>
          );
        })()}
    </SectionShell>
  );
}
function AvisClients() {
  const [avis, setAvis] = useState([
    { name: "Jade M.", text: "Buffet magnifique, tout le monde s'est régalé !", note: 5, reply: "" },
    { name: "Thomas B.", text: "Organisation impeccable et saveurs au top.", note: 5, reply: "" },
  ]);
  const [form, setForm] = useState({ name: "", text: "", note: 5 });
  const add = () => {
    if (!form.name || !form.text) return alert("Merci de compléter nom + avis.");
    setAvis((a) => [{ ...form }, ...a]);
    setForm({ name: "", text: "", note: 5 });
  };
  return (
    <SectionShell eyebrow="Ils nous font confiance" title="Avis clients" intro="Laissez un témoignage — en attendant l'intégration Google / Facebook Reviews.">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4">
          {avis.map((a, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow ring-1" style={{ ringColor: BRAND.olive + "55" }}>
              <div className="font-body text-sm text-black/60">{"★".repeat(a.note)}{"☆".repeat(5 - a.note)}</div>
              <div className="font-title">{a.name}</div>
              <p className="font-body text-sm mt-1">{a.text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 h-fit" style={{ ringColor: BRAND.olive + "55" }}>
          <div className="font-title text-xl" style={{ color: BRAND.gold }}>Ajouter un avis</div>
          <label className="font-body text-sm mt-3 block">
            Nom
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="font-body text-sm mt-3 block">
            Votre avis
            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="font-body text-sm mt-3 block">
            Note
            <input
              type="number"
              min={1}
              max={5}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: parseInt(e.target.value || "5") })}
              className="mt-1 w-full rounded-xl border p-2"
            />
          </label>
          <button onClick={add} className="mt-4 w-full rounded-xl px-4 py-2 font-semibold" style={{ background: BRAND.gold, color: BRAND.black }}>
            Publier
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
function Contact() {
  return (
    <SectionShell eyebrow="Prendre contact" title="Contact" intro="Parlez-nous de votre projet :">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1" style={{ ringColor: BRAND.olive + "55" }}>
          <div className="font-body text-sm">Téléphone</div>
          <a href={`tel:${WHATSAPP_NUMBER}`} className="font-title text-2xl">
            {WHATSAPP_NUMBER}
          </a>
          <div className="mt-4 font-body text-sm">Email</div>
          <a href={`mailto:${PRO_EMAIL}`} className="font-title text-xl">
            {PRO_EMAIL}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink()} className="rounded-xl px-4 py-2 font-semibold" style={{ background: BRAND.gold, color: BRAND.black }}>
              Écrire sur WhatsApp
            </a>
            <a href={`mailto:${PRO_EMAIL}`} className="rounded-xl px-4 py-2 font-semibold border" style={{ borderColor: BRAND.gold, color: BRAND.gold }}>
              Écrire un email
            </a>
          </div>
          <div className="mt-6 font-body text-sm text-black/70">Réseaux sociaux</div>
          <div className="mt-2 flex gap-4">
            <a href="#" className="underline">Instagram</a>
            <a href="#" className="underline">Facebook</a>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1" style={{ ringColor: BRAND.olive + "55" }}>
          <div className="font-title text-xl" style={{ color: BRAND.gold }}>Formulaire express</div>
          <form action={mailto("Demande via formulaire Cassiora")} method="post" className="mt-3 grid gap-3">
            <input name="nom" placeholder="Votre nom" className="rounded-xl border p-2" />
            <input name="email" placeholder="Votre email" className="rounded-xl border p-2" />
            <textarea name="message" placeholder="Votre message" rows={5} className="rounded-xl border p-2" />
            <button type="submit" className="rounded-xl px-4 py-2 font-semibold" style={{ background: BRAND.terra, color: "white" }}>
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </SectionShell>
  );
}
function FAQ() {
  const items = data.faq?.items || [
    { q: "Livrez-vous ?", a: "Oui, selon la zone et le volume. Un supplément peut s'appliquer." },
    { q: "Options végétariennes ?", a: "Oui, sur demande à la commande." },
  ];
  const [open, setOpen] = useState(-1);
  return (
    <SectionShell eyebrow="Questions fréquentes" title="FAQ" intro={data.faq?.intro || ""}>
      <div className="divide-y rounded-2xl bg-white shadow ring-1" style={{ ringColor: BRAND.olive + "55" }}>
        {items.map((it, i) => (
          <div key={i} className="p-4">
            <button className="flex w-full items-center justify-between" onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="font-title text-lg">{it.q}</div>
              <span className="text-black/50">{open === i ? "–" : "+"}</span>
            </button>
            {open === i && <p className="font-body mt-2 text-sm text-black/70">{it.a}</p>}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
function Home() {
  return <Hero />;
}

/* ====== Détails (router params) ====== */
function TraiteurDetail() {
  const { slug } = useParams();
  const formule = data.traiteur.formules.find((f) => f.slug === slug);
  if (!formule)
    return (
      <SectionShell title="Formule introuvable">
        <p className="font-body">Cette formule n’existe pas.</p>
      </SectionShell>
    );

  return (
    <SectionShell eyebrow="Traiteur" title={formule.titre} intro={formule.desc}>
      {formule.photos?.length ? <PhotoMasonry urls={formule.photos} /> : null}
      <div className="mt-8 rounded-2xl bg-white p-6 ring-1" style={{ ringColor: BRAND.olive + "55" }}>
        <div className="font-title text-xl" style={{ color: BRAND.gold }}>Tarifs par pièce / personne</div>
        <ul className="mt-3 space-y-2 font-body text-sm">
          {formule.pieces?.map((p, i) => (
            <li key={i} className="flex justify-between">
              <span>{p.nom}</span>
              <span className="text-black/60">{p.tarif}</span>
            </li>
          ))}
        </ul>
      </div>
      <CTADevis />
    </SectionShell>
  );
}
function BoxDetail() {
  const { slug } = useParams();
  const b = data.boxes.find((x) => x.slug === slug);
  if (!b)
    return (
      <SectionShell title="Box introuvable">
        <p className="font-body">Cette box n'existe pas.</p>
      </SectionShell>
    );
  return (
    <SectionShell eyebrow="Box gourmande" title={b.titre} intro={`${b.theme} — ${b.prix}`}>
      {b.photos?.length ? <PhotoMasonry urls={b.photos} /> : null}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1" style={{ ringColor: BRAND.olive + "55" }}>
          <div className="font-title text-xl" style={{ color: BRAND.gold }}>Contenu</div>
          <ul className="font-body mt-2 space-y-1 text-sm">{b.contenu.map((i, idx) => <li key={idx}>• {i}</li>)}</ul>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1" style={{ ringColor: BRAND.olive + "55" }}>
          <div className="font-title text-xl" style={{ color: BRAND.gold }}>Tailles & conservation</div>
          <p className="font-body text-sm mt-2">
            <b>Tailles :</b> {b.tailles.join(", ")}
          </p>
          <p className="font-body text-sm mt-2">
            <b>Conservation :</b> {b.conservation}
          </p>
        </div>
      </div>
      <CTADevis />
    </SectionShell>
  );
}
function AtelierDetail() {
  const { slug } = useParams();
  const a = data.ateliers.find((x) => x.slug === slug);
  if (!a)
    return (
      <SectionShell title="Atelier introuvable">
        <p className="font-body">Cet atelier n'existe pas.</p>
      </SectionShell>
    );
  return (
    <SectionShell eyebrow="Ateliers" title={a.titre} intro={a.desc}>
      {a.photos?.length ? <PhotoMasonry urls={a.photos} /> : null}
      <CTADevis label="Demander des infos" />
    </SectionShell>
  );
}

function MenuPDF() {
  const { slug } = useParams();
  const f = data.traiteur.formules.find(x => x.slug === slug);

  if (!f) {
    return (
      <SectionShell title="Menu introuvable">
        <p className="font-body">Cette formule n’existe pas.</p>
      </SectionShell>
    );
  }
  if (!f.pdf) {
    return (
      <SectionShell title={f.titre} intro="Le PDF n'est pas disponible pour cette formule.">
        <CTADevis label="Demander le menu en PDF" />
      </SectionShell>
    );
  }

  return (
    <SectionShell eyebrow="Traiteur" title={f.titre} intro="Menu complet (PDF)">
      <div className="mb-4 flex gap-3">
        <a href={f.pdf} target="_blank" rel="noreferrer"
           className="rounded-xl px-4 py-2 font-body font-semibold"
           style={{ background: BRAND.gold, color: BRAND.black }}>
          Ouvrir dans un nouvel onglet
        </a>
        <a href={f.pdf} download
           className="rounded-xl px-4 py-2 font-body font-semibold border"
           style={{ borderColor: BRAND.gold, color: BRAND.gold }}>
          Télécharger le PDF
        </a>
      </div>
      <div className="rounded-2xl overflow-hidden bg-white ring-1" style={{ ringColor: BRAND.olive + "55" }}>
        <iframe
          title={`Menu ${f.titre}`}
          src={f.pdf}
          className="w-full"
          style={{ height: "85vh" }}
        />
      </div>
    </SectionShell>
  );
}

/* ====== App avec ROUTES ====== */
export default function App() {
  return (
    <div className="min-h-[100vh]" style={{ background: "#000" }}>
      <GlobalHead />
      <StickyNav />
      <Routes>
        <Route path="/menu/:slug" element={<MenuPDF />} />
        <Route path="/" element={<Home />} />
        <Route path="/traiteur" element={<Traiteur />} />
        <Route path="/traiteur/:slug" element={<TraiteurDetail />} />
        <Route path="/box" element={<BoxGourmande />} />
        <Route path="/box/:slug" element={<BoxDetail />} />
        <Route path="/ateliers" element={<Ateliers />} />
        <Route path="/ateliers/:slug" element={<AtelierDetail />} />
        <Route path="/livre" element={<Livre />} />
        <Route path="/avis" element={<AvisClients />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="border-t border-white/10 bg-black py-8 text-center text-white/60 font-body">
        © {new Date().getFullYear()} Cassiora — Traiteur. Tous droits réservés.
      </footer>
    </div>
  );
}
