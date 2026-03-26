import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-obsidian-soft border-t border-gold/10 pt-16 pb-8" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <img src="/images/logo.png" alt="Cassiora Traiteur" className="h-20 w-20 mx-auto mb-4 object-contain" />
          <p className="text-gold/60 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
            Cuisine artisanale · Saveurs généreuses
          </p>
          <p className="text-cream/25 text-xs mt-2" style={{ fontFamily: "'Jost', sans-serif" }}>
            Saint-Paul-de-Loubressac (46170) · Lot & Tarn-et-Garonne
          </p>
        </div>

        <div className="gold-divider mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center md:text-left">
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Navigation</h4>
            <ul className="space-y-2.5">
              {[{ href: "/", label: "Accueil" }, { href: "/traiteur", label: "Traiteur" }, { href: "/box-gourmande#abonnement", label: "Abonnement" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/50 hover:text-cream/90 text-sm transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Découvrir</h4>
            <ul className="space-y-2.5">
              {[{ href: "/box-gourmande", label: "Box gourmande" }, { href: "/ateliers", label: "Ateliers" }, { href: "/livre", label: "Livre de recettes" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/50 hover:text-cream/90 text-sm transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Informations</h4>
            <ul className="space-y-2.5">
              {[{ href: "/avis-clients", label: "Avis clients" }, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }, { href: "/allergenes", label: "Allergènes & informations" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/50 hover:text-cream/90 text-sm transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Contact</h4>
            <ul className="space-y-2.5 text-cream/50 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              <li>cassioratraiteur@gmail.com</li>
              <li className="text-xs text-cream/30">Lot (46) · Tarn-et-Garonne (82)</li>
              <li className="pt-2">
                <a href="https://www.instagram.com/cassiora.traiteur" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-cream/25 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
          <p>© {new Date().getFullYear()} Cassiora Traiteur — Tous droits réservés · Site créé par <a href="https://lpwebdesign.fr" target="_blank" rel="noopener noreferrer" className="hover:text-cream/60 transition-colors">lpwebdesign.fr</a></p>
          <div className="flex gap-6">
            <Link href="/cgv" className="hover:text-cream/60 transition-colors">Conditions générales de vente</Link>
            <Link href="/mentions-legales" className="hover:text-cream/60 transition-colors">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
