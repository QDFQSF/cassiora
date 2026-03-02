"use client";
import { useState } from "react";

const categories = [
  {
    titre: "Traiteur & Buffets",
    questions: [
      { question: "Faut-il un minimum de personnes pour commander un buffet ou un cocktail ?", reponse: "Oui, nous demandons un minimum de 10 personnes afin de garantir la fraîcheur et la variété des plats." },
      { question: "Combien de temps à l'avance dois-je passer commande ?", reponse: "Idéalement, 10 jours avant la date de votre événement. Pour les plus gros buffets, nous conseillons 3 à 4 semaines avant." },
      { question: "Est-il possible de personnaliser le menu (sans porc, végétarien, etc) ?", reponse: "Bien sûr. Nous proposons des adaptations sur demande. N'hésitez pas à préciser vos besoins lors de la commande." },
      { question: "Proposez-vous la livraison ? Si oui, dans quelle zone ?", reponse: "Oui, nous proposons la livraison dans le secteur de Saint Paul de Loubressac et ses alentours (Lot et départements limitrophes selon devis). La livraison est gratuite dans un rayon de 10 km autour de Saint Paul de Loubressac pour toute commande à partir de 50 € d'achat. Au-delà de 10 km, un forfait kilométrique est appliqué." },
      { question: "Fournissez-vous la vaisselle, couverts et serviettes ?", reponse: "Nos formules comprennent uniquement les plats." },
      { question: "Y a-t-il des frais supplémentaires pour la mise en place ?", reponse: "La mise en place peut être prévue sur devis." },
      { question: "Puis-je congeler vos préparations si besoin ?", reponse: "Nous conseillons de consommer frais sous 48h pour une qualité optimale. Certaines préparations peuvent être congelées (ex : quiches, cakes), mais ce n'est pas recommandé pour toutes." },
    ],
  },
  {
    titre: "Box Gourmandes",
    questions: [
      { question: "Quelles sont les tailles disponibles pour les box ?", reponse: "Nos box existent en format 2-3 personnes, 4-6 personnes et 8-10 personnes. Au-delà, ce sera sur devis." },
      { question: "Quels sont les délais pour commander une box ?", reponse: "Les box doivent être commandées 5 jours à l'avance minimum." },
      { question: "Les box sont-elles livrées ou à récupérer sur place ?", reponse: "Les deux sont possibles. Vous pouvez venir les chercher directement ou demander la livraison à domicile (selon secteur et disponibilité)." },
      { question: "Puis-je composer ma propre box sur mesure ?", reponse: "Oui, il est tout à fait possible de composer une box personnalisée (ex : 100% sucré, 100% apéro, sans porc...)." },
      { question: "Combien de temps se conservent les box ?", reponse: "Les box sont à conserver au frais et se dégustent idéalement le jour même. Certaines préparations peuvent être consommées jusqu'à 48h après." },
    ],
  },
  {
    titre: "Pâtisseries & Biscuits",
    questions: [
      { question: "Proposez-vous des gâteaux personnalisés (anniversaire, mariage, baptème) ?", reponse: "Oui, nous réalisons des gateaux personnalisés sur demande." },
      { question: "Quels sont vos délais pour un gateau ?", reponse: "Pour un gateau ou un dessert à thèmes, il est préférable de commander 5 jours à l'avance minimum." },
      { question: "Puis-je commander une seule part ou seulement des gateaux entiers ?", reponse: "Nos desserts existent sous formats individuels ou en gateau entier." },
      { question: "Faites-vous des biscuits/cookies sans gluten ou sans lactose ?", reponse: "Nous pouvons proposer des alternatives sans gluten ou sans lactose sur demande, selon les recettes. En revanche, commander dans un délai de 10 jours." },
    ],
  },
  {
    titre: "Ateliers (dès 2027)",
    questions: [
      { question: "Quand commencent les ateliers ?", reponse: "Les ateliers démarreront à partir de janvier 2027." },
      { question: "Comment puis-je réserver une place ?", reponse: "Vous pourrez réserver directement via notre site internet (calendrier en ligne) ou en nous contactant par téléphone / Whatsapp." },
      { question: "Y a-t-il un âge minimum pour participer ?", reponse: "Atelier parents/enfants : à partir de 4 ans. Atelier adultes : à partir de 14 ans." },
      { question: "Dois-je amener mon matériel ou est-il fourni ?", reponse: "Tout est fourni sur place, ingrédients, matériel et fiches de recettes. Vous repartez avec vos créations et de nouvelles astuces !" },
    ],
  },
  {
    titre: "Allergènes & Sécurité Alimentaire",
    questions: [
      { question: "Où puis-je trouver la liste des allergènes ?", reponse: "Une liste détaillée est disponible en PDF téléchargeable sur notre site (voir la page Allergenes)." },
      { question: "Vos préparations contiennent-elles des traces de fruits à coque / gluten / lait ?", reponse: "Nos préparations artisanales peuvent contenir des traces d'allergènes même si ceux-ci ne sont pas indiqués dans la recette." },
      { question: "Puis-je vous demander une adaptation pour certaines allergies ?", reponse: "Oui, nous pouvons adapter certaines recettes. Indiquez-nous vos contraintes lors de la commande." },
    ],
  },
  {
    titre: "Commandes & Paiements",
    questions: [
      { question: "Comment puis-je passer commande ?", reponse: "Par téléphone, par Whatsapp (lien direct sur notre site) ou par email (lien direct sur notre site)." },
      { question: "Quels moyens de paiements acceptez-vous ?", reponse: "Nous acceptons les paiements par carte bancaire, espèces ou virement." },
      { question: "Dois-je verser un acompte ?", reponse: "Pour toutes les commandes, un acompte de 30% est demandé lors de la validation." },
      { question: "En cas d'annulation, suis-je remboursé ?", reponse: "Si l'annulation a lieu plus de 7 jours avant l'évènement, l'acompte vous sera remboursé intégralement. Si l'annulation a lieu moins de 7 jours avant, il n'y aura pas de possibilité de remboursement" },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => setOpen(open === key ? null : key);

  return (
    <div className="bg-black min-h-screen">
      <div className="page-header text-center px-6">
        <p
          className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Vos questions
        </p>
        <h1
          className="text-cream"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          <span className="text-gold-light italic">FAQ</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-8" />
      </div>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {categories.map((cat) => (
            <div
              key={cat.titre}
              className="card-luxury"
              style={{ border: "1px solid rgba(201, 168, 76, 0.15)" }}
            >
              {/* Catégorie header */}
              <div className="px-8 py-5 border-b border-gold/10">
                <h2
                  className="text-gold-light"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "1.3rem",
                  }}
                >
                  {cat.titre}
                </h2>
              </div>

              {/* Questions */}
              <div className="px-8">
                {cat.questions.map((q, i) => {
                  const key = `${cat.titre}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={i} className="border-b border-gold/10 last:border-0">
                      <button
                        className="w-full text-left py-5 flex justify-between items-center gap-4 group"
                        onClick={() => toggle(key)}
                      >
                        <span
                          className="text-cream/70 group-hover:text-cream transition-colors duration-200"
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontWeight: 300,
                            fontSize: "0.9rem",
                          }}
                        >
                          {q.question}
                        </span>
                        <span
                          className={`text-gold/50 text-lg flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-64 pb-5" : "max-h-0"
                        }`}
                      >
                        {q.reponse ? (
                          <p
                            className="text-cream/45 leading-relaxed"
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontWeight: 300,
                              fontSize: "0.875rem",
                            }}
                          >
                            {q.reponse}
                          </p>
                        ) : (
                          <p
                            className="text-gold/30 italic"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "0.95rem",
                            }}
                          >
                            Réponse à compléter…
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Note allergènes */}
          <div className="text-center pt-4">
            <p
              className="text-cream/25 text-sm mb-3"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              Besoin du détail des allergènes ?
            </p>
            <a
              href="/contact"
              className="text-gold/50 text-sm hover:text-gold transition-colors duration-200 underline underline-offset-4"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Contactez-nous directement
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}