"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/traiteur", label: "Traiteur" },
  { href: "/box-gourmande#abonnement", label: "Abonnement" },
  { href: "/box-gourmande", label: "Box gourmande" },
  { href: "/ateliers", label: "Ateliers" },
  { href: "/livre", label: "Livre" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasOffres, setHasOffres] = useState(false);
  const pathname = usePathname();

  // Vérifier si des offres actives existent
  useEffect(() => {
    fetch("/api/offres-actives")
      .then((r) => r.json())
      .then((d) => setHasOffres(d.hasOffres))
      .catch(() => setHasOffres(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/95 backdrop-blur-md border-b border-gold/20 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/images/logo.png" alt="Cassiora Traiteur" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <div className="text-gold-light text-sm tracking-[0.25em] uppercase leading-none" style={{ fontFamily: "'Cinzel', serif" }}>
                Cassiora
              </div>
              <div className="text-gold/60 text-[0.55rem] tracking-[0.35em] uppercase leading-none mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>
                Traiteur
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {hasOffres && (
              <Link
                href="/offres-speciales"
                className="mr-3 px-4 py-1.5 text-black text-[0.6rem] tracking-[0.2em] uppercase font-medium transition-all duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "linear-gradient(135deg, #c9a84c, #e2ce75)",
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
              >
                ✦ Offres spéciales
              </Link>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-300 relative group ${
                  pathname === link.href ? "text-gold-light" : "text-cream/60 hover:text-cream"
                }`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-px bg-gold-light transition-all duration-300 ${
                    pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-6 h-px bg-gold-light transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-4 h-px bg-gold-light transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-gold-light transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-black/98 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="gold-divider w-32 mb-8" />
        {hasOffres && (
          <Link href="/offres-speciales" className="mb-6 px-8 py-3 text-black text-[0.7rem] tracking-[0.25em] uppercase" style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}>
            ✦ Offres spéciales
          </Link>
        )}
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xl tracking-[0.2em] uppercase transition-all duration-300 ${pathname === link.href ? "text-gold-light" : "text-cream/70 hover:text-cream"}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="gold-divider w-32 mt-8" />
      </div>
    </>
  );
}
