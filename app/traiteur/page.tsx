"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const buffetFroid = {
  id: "buffet", titre: "Buffet Froid", image: "/images/buffet.jpg", objectPosition: "center 40%",
  accroche: "Un buffet élégant et généreux pour vos réceptions, repas d'entreprise ou fêtes de famille.",
  note: "Minimum 10 personnes · Corbeille de pains variés & beurre inclus · Le choix des plats est identique pour l'ensemble des convives.",
  categories: [
    { nom: "Entrées & salades composées", items: ["Salade piémontaise traditionnelle — pommes de terre, jambon, cornichons & ciboulette", "Salade Printanière Croquante — jeunes pousses, pointes d'asperges vertes, radis roses, fèves & vinaigrette légère aux agrumes", "Salade d'Orzo à la Méditerranéenne — perles de pâtes (orzo), courgettes grillées, tomates séchées, feta émiettée & pesto de basilic maison", "Assortiment de crudités — carottes, céleri, concombre & sauce yaourt citronnée"] },
    { nom: "Plats froids & viandes", items: ["Rôti de bœuf froid — moutarde à l'ancienne & cornichons", "Filet de poulet rôti froid — mayonnaise maison ou sauce curry douce", "Plateau de charcuteries fines — jambon cru, rosette, pâté de campagne", "Terrine de saumon aux herbes — sauce citronnée"] },
    { nom: "Desserts & douceurs", items: ["Verrine sablée au fruit de saison", "Crumble aux pommes", "Moelleux au chocolat", "Salade de fruits frais de saison — pomme, poire, clémentine"] },
  ],
  formules: [
    { nom: "La Classique", prix: 16, contenu: "2 salades + 1 viande froide + 1 dessert au choix" },
    { nom: "Le Gourmand", prix: 22, contenu: "3 salades + 2 viandes froides + plateau de fromage + 1 dessert", highlight: true },
    { nom: "Le Grand Buffet", prix: 28, contenu: "4 salades + 3 viandes froides + plateau de fromages + 2 desserts" },
  ],
};

const cocktailDinatoire = {
  id: "cocktail", titre: "Cocktail Dînatoire", image: "/images/traiteur-cocktail.jpg", objectPosition: "center 50%",
  accroche: "Des pièces raffinées pour un cocktail élégant. Mariages, séminaires, soirées d'entreprise.",
  note: "Minimum 10 personnes · Le choix des pièces se fait par lots pour garantir la qualité artisanale.",
  categories: [
    { nom: "Pièces froides", items: ["Wrap de volaille rôtie — fromage frais aux herbes & jeunes pousses", "Wrap de saumon fumé — crème légère à l'aneth", "Blinis scandinaves — saumon fumé & pointe de citron", "Verrine de betterave & chèvre frais — éclats de noix du Quercy", "Verrine piémontaise revisitée — pommes de terre, jambon & cornichons fins", "Tartare de saumon à l'orange — touche de gingembre", "Cuillère de crevette — guacamole citron vert", "Mini club sandwich — jambon blanc & emmental fondant", "Brochette caprese — tomates cerises, mozzarella & basilic"] },
    { nom: "Pièces chaudes", items: ["Mini-burger de bœuf — cheddar affiné & oignons confits", "Mini-burger végétarien — galette de légumes & fromage fondant", "Samoussa doré au four — poulet curry ou légumes épicés", "Croquette de risotto — parmesan & herbes fraîches", "Mini-quiche lorraine — poitrine fumée", "Mini-quiche poireaux-chèvre — saveur douce et crémeuse", "Feuilleté gourmand — roulé de saucisse", "Bouchée croustillante de poulet — marinade paprika", "Mini brochette yakitori — poulet laqué au soja"] },
    { nom: "Terroir & gourmandises", items: ["Cornet croustillant — jambon cru & mousse de chèvre au miel", "Cuillère festive — foie gras, chutney de figues & toast", "Mini croque-monsieur truffé — pain de mie doré & béchamel parfumée", "Brochette de comté affiné & fruit frais", "Mini bruschetta — tomate confite, olive & basilic"] },
    { nom: "Mignardises sucrées", items: ["Crumble pomme cannelle", "Verrine panna cotta — vanille & coulis de fruits rouges", "Verrine tiramisu spéculoos", "Financier amande — doré au four", "Moelleux chocolat — fondant", "Brochette de fruits frais", "Verrine citron meringuée"] },
  ],
  formules: [
    { nom: "Formule Découverte", prix: 14, contenu: "6 pièces salées + 3 sucrées" },
    { nom: "Formule Plaisir", prix: 20, contenu: "9 pièces salées + 4 sucrées", highlight: true },
    { nom: "Formule Prestige", prix: 26, contenu: "12 pièces salées + 5 sucrées" },
  ],
};

const desserts = {
  id: "desserts", titre: "Les Desserts du Traiteur",
  accroche: "Pâtisserie artisanale pour sublimer vos événements. À la pièce ou en formule.",
  note: "Pour toutes demandes spécifiques, allergies ou régimes alimentaires particuliers, contactez-nous.",
  categories: [
    { nom: "La Biscuiterie Sèche & Gâteaux de voyage", tarif: "1,50€/pièce · minimum 10 pièces identiques", items: ["Cookies généreux aux pépites de chocolat", "Le Brookie — l'alliance parfaite du brownie et du cookie", "Financiers dorés aux amandes", "Moelleux fondants au chocolat"] },
    { nom: "Les Verrines Traiteur", tarif: "3,50€/pièce · minimum 10 verrines identiques", items: ["Verrine façon Tarte au Citron Meringuée", "Le Tiramisu du chef — café, pistache/fruits rouges, spéculoos", "Panna Cotta fondante à la vanille — coulis fruits rouges ou exotiques", "Crumble aux pommes"] },
    { nom: "Les Mignardises (Format Bouchées)", tarif: "1,50€/pièce · minimum 10 pièces identiques", items: ["Mini-tartelettes aux fruits de saison", "Cannelés bordelais", "Rochers à la noix de coco", "Truffes artisanales au chocolat praliné", "Bouchées de clafoutis aux fruits", "Mini-brochettes de fruits frais"] },
    { nom: "Les Gâteaux Individuels à l'assiette", tarif: "4,00€/pièce · minimum 10 pièces identiques", items: ["Tartelettes rustiques de saison", "Mini-Pavlova", "Cheesecake individuel", "Cœur coulant au chocolat"] },
    { nom: "Les Grands Gâteaux d'Événements", tarif: "Vendus à la part · minimum 10 parts", items: ["Number Cake ou Letter Cake — 5,50€/part", "Layer Cake — 5,50€/part", "Pavlova Géante — 5,00€/part", "Grandes Tartes Rustiques — 4,00€/part", "Maxi-Brookie ou Maxi-Cookie — 4,00€/part"] },
  ],
  formules: [
    { nom: "Café Gourmand", prix: 6, contenu: "1 verrine + 2 mignardises" },
    { nom: "Farandole de Desserts", prix: 8, contenu: "Assortiment de 5 pièces parmi les mignardises et biscuits", highlight: true },
  ],
};

const prestations = [buffetFroid, cocktailDinatoire, desserts];

function CategorieAccordion({ cat }: { cat: { nom: string; tarif?: string; items: string[] } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gold/10 last:border-0">
      <button className="w-full text-left py-4 flex justify-between items-center gap-4 group" onClick={() => setOpen(!open)}>
        <div>
          <span className="text-cream/70 group-hover:text-cream transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>{cat.nom}</span>
          {cat.tarif && <span className="block text-gold/50 text-[0.65rem] tracking-[0.1em] mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{cat.tarif}</span>}
        </div>
        <span className={`text-gold/50 text-lg flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
        <ul className="space-y-2 pl-2">
          {cat.items.map((item, i) => (
            <li key={i} className="text-cream/45 text-sm flex items-start gap-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              <span className="text-gold/40 mt-0.5 flex-shrink-0">—</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TraiteurPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buffet");
  const [selectedFormule, setSelectedFormule] = useState<string | null>(null);

  const prestation = prestations.find((p) => p.id === activeTab);

  const handleTabChange = (id: string) => { setActiveTab(id); setSelectedFormule(null); };

  const handleDevis = () => {
    const isSurMesure = activeTab === "sur-mesure";
    const sujet = isSurMesure
      ? "Menu sur-mesure"
      : `Traiteur — ${prestation?.titre}${selectedFormule ? ` — ${selectedFormule}` : ""}`;
    const message = isSurMesure
      ? "Bonjour, je souhaite obtenir un devis pour un menu sur-mesure.\n\nMon événement : \nNombre de personnes : \nDate envisagée : \nBudget indicatif : \n\nDétails supplémentaires :"
      : `Bonjour, je suis intéressé(e) par votre prestation :\n\nPrestation : ${prestation?.titre}${selectedFormule ? `\nFormule choisie : ${selectedFormule}` : ""}\n\nNombre de personnes : \nDate envisagée : \n\nDétails supplémentaires :`;
    router.push(`/contact?sujet=${encodeURIComponent(sujet)}&message=${encodeURIComponent(message)}`);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Savoir-faire artisanal</p>
        <h1 className="text-cream" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Le <span className="text-gold-light italic">Traiteur</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
        <p className="text-cream/40 text-sm mt-6 max-w-2xl mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Cuisine artisanale pour vos événements dans le Lot (46) et Tarn-et-Garonne (82).<br />Cahors · Montauban · Caussade · et alentours.
        </p>
      </div>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cream/60 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.3rem", fontStyle: "italic" }}>
            Chaque prestation est pensée comme un moment unique, préparé avec le plus grand soin — de la sélection des produits à la présentation finale.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Onglets */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[...prestations, { id: "sur-mesure", titre: "Menu Sur-Mesure" }].map((p) => (
              <button key={p.id} onClick={() => handleTabChange(p.id)} className="px-5 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300" style={{ fontFamily: "'Cinzel', serif", border: activeTab === p.id ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.2)", background: activeTab === p.id ? "rgba(201,168,76,0.1)" : "transparent", color: activeTab === p.id ? "#e2ce75" : "rgba(248,246,240,0.5)" }}>
                {p.titre}
              </button>
            ))}
          </div>

          {/* Sur-mesure */}
          {activeTab === "sur-mesure" ? (
            <div className="max-w-2xl mx-auto">
              <div className="card-luxury p-12 text-center relative" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
                <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
                <div className="absolute top-4 right-4 w-5 h-5" style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
                <div className="absolute bottom-4 left-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
                <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
                <p className="text-gold text-3xl mb-6">◇</p>
                <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Prix sur devis</p>
                <h2 className="text-cream mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2rem", fontStyle: "italic" }}>Un menu à votre image</h2>
                <div className="gold-divider max-w-xs mx-auto mb-6" />
                <p className="text-cream/50 leading-relaxed mb-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  Un événement unique mérite un menu à votre image. Nous créons ensemble une proposition personnalisée selon vos envies, vos goûts et votre budget.
                </p>
                <p className="text-cream/40 text-sm leading-relaxed mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  Mariage, anniversaire, séminaire, repas de famille… Chaque détail est pensé sur mesure. Intolérances, régimes spécifiques, thématiques culinaires — tout est possible.
                </p>
                <button onClick={handleDevis} className="btn-gold">Demander un devis personnalisé</button>
              </div>
            </div>
          ) : prestation ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Gauche */}
              <div className="lg:col-span-3">
                {(prestation as any).image && (
                  <div style={{ width: "100%", height: "260px", overflow: "hidden", borderRadius: "4px 4px 0 0", marginBottom: "24px" }}>
                    <img src={(prestation as any).image} alt={prestation.titre} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: (prestation as any).objectPosition || "center", transform: "scale(1.05)" }} />
                  </div>
                )}
                <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{prestation.titre}</p>
                <p className="text-cream/60 text-lg mb-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic" }}>{prestation.accroche}</p>
                <div className="card-luxury p-6">
                  {prestation.categories.map((cat, i) => <CategorieAccordion key={i} cat={cat} />)}
                </div>
                {prestation.note && <p className="text-cream/25 text-xs mt-4 leading-relaxed italic" style={{ fontFamily: "'Jost', sans-serif" }}>ℹ️ {prestation.note}</p>}
              </div>

              {/* Droite */}
              <div className="lg:col-span-2">
                <p className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Formules</p>
                <p className="text-cream/30 text-xs mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>Cliquez pour sélectionner — pré-remplit votre demande de devis</p>
                <div className="space-y-3 mb-8">
                  {prestation.formules.map((f, i) => {
                    const isSelected = selectedFormule === f.nom;
                    return (
                      <button key={i} onClick={() => setSelectedFormule(isSelected ? null : f.nom)} className="w-full p-5 text-left relative transition-all duration-200" style={{ border: isSelected ? "1px solid #c9a84c" : (f as any).highlight ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(201,168,76,0.15)", background: isSelected ? "rgba(201,168,76,0.12)" : (f as any).highlight ? "rgba(201,168,76,0.04)" : "transparent" }}>
                        {isSelected && <div className="absolute -top-2.5 left-4 px-3 py-0.5 text-black text-[0.5rem] tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}>✓ Sélectionnée</div>}
                        {!isSelected && (f as any).highlight && <div className="absolute -top-2.5 left-4 px-3 py-0.5 text-black text-[0.5rem] tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif", background: "linear-gradient(135deg, #c9a84c, #e2ce75)" }}>Recommandé</div>}
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <p className="text-cream/80 mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{f.nom}</p>
                            <p className="text-cream/40 text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{f.contenu}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-gold-light text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{f.prix}€</span>
                            <span className="text-cream/30 text-xs block" style={{ fontFamily: "'Jost', sans-serif" }}>/pers</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="card-luxury p-5 mb-6" style={{ border: "1px solid rgba(201,168,76,0.1)" }}>
                  <p className="text-gold/60 text-[0.55rem] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>Ce qui est inclus</p>
                  <ul className="space-y-1.5">
                    {["Préparation artisanale maison", "Livraison ou mise en place sur site", "Adaptation allergies & régimes", "Devis personnalisé gratuit"].map((item, i) => (
                      <li key={i} className="text-cream/45 text-xs flex items-center gap-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}><span className="text-gold/50">✦</span>{item}</li>
                    ))}
                  </ul>
                </div>

                <button onClick={handleDevis} className="btn-gold w-full text-center justify-center block">
                  {selectedFormule ? `Demander un devis — ${selectedFormule}` : "Demander un devis"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}