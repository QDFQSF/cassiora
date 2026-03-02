import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cassiora.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cassiora Traiteur — Traiteur artisanal Cahors, Montauban, Lot",
    template: "%s | Cassiora Traiteur",
  },
  description:
    "Cassiora Traiteur, traiteur artisanal basé à Saint-Paul-de-Loubressac (Lot 46). Prestations traiteur sur mesure, box gourmandes et ateliers culinaires pour Cahors, Montauban, Caussade et toute la région.",
  keywords: [
    "traiteur Cahors",
    "traiteur Lot 46",
    "traiteur Montauban",
    "traiteur artisanal",
    "box gourmande Lot",
    "box gourmande livraison",
    "traiteur mariage Cahors",
    "traiteur entreprise Montauban",
    "ateliers cuisine Lot",
    "Cassiora traiteur",
    "traiteur Caussade",
    "traiteur Saint-Paul-de-Loubressac",
  ],
  authors: [{ name: "Cassiora Traiteur" }],
  creator: "Cassiora Traiteur",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Cassiora Traiteur",
    title: "Cassiora Traiteur — Cuisine artisanale, saveurs généreuses",
    description:
      "Traiteur artisanal dans le Lot (46). Menus sur mesure, box gourmandes livraison, ateliers cuisine. Zone Cahors, Montauban, Caussade.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cassiora Traiteur — Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cassiora Traiteur",
    description: "Traiteur artisanal dans le Lot — Cahors, Montauban, Caussade",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Données structurées JSON-LD pour Google (fiche entreprise locale)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Cassiora Traiteur",
    description:
      "Traiteur artisanal proposant des prestations sur mesure, box gourmandes et ateliers culinaires dans le Lot et Tarn-et-Garonne.",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/logo.png`,
    telephone: "", // À compléter
    email: "cassioratraiteur@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "40 Chemin de la fontaine",
      addressLocality: "Saint-Paul-de-Loubressac",
      postalCode: "46170",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "44.4",
      longitude: "1.5",
    },
    areaServed: [
      { "@type": "City", name: "Cahors" },
      { "@type": "City", name: "Montauban" },
      { "@type": "City", name: "Caussade" },
      { "@type": "AdministrativeArea", name: "Lot" },
      { "@type": "AdministrativeArea", name: "Tarn-et-Garonne" },
    ],
    servesCuisine: ["Française", "Artisanale", "Gastronomique"],
    priceRange: "€€",
    sameAs: ["https://www.instagram.com/cassiora_traiteur"],
  };

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Cinzel:wght@400;500;600;700&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
