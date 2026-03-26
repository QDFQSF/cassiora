import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { offre, regimes, distanceKm } = body
    const regimesStr: string = Array.isArray(regimes) && regimes.length > 0 ? regimes.join(', ') : ''
    const distanceStr: string = distanceKm != null ? `${distanceKm} km` : ''

    let session: Stripe.Checkout.Session

    if (offre === 'brunch_alliance') {
      const { nom, email, telephone, date, livraison, adresse, commentaire } = body
      const desc = [
        date && `Date souhaitée : ${date}`,
        livraison ? `Livraison : ${adresse}` : 'Retrait sur place',
        telephone && `Tél : ${telephone}`,
      ].filter(Boolean).join(' · ')

      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        locale: 'fr',
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: "Offre de lancement — Brunch XXL / L'Alliance Gourmande",
              description: desc,
              images: [`${siteUrl}/images/logo.png`],
            },
            unit_amount: 10600,
          },
          quantity: 1,
        }],
        customer_email: email,
        metadata: {
          offre,
          boxNom: "Brunch XXL / L'Alliance Gourmande",
          nom, email,
          telephone: telephone || '',
          date: date || '',
          livraison: livraison ? 'oui' : 'non',
          adresse: adresse || '',
          commentaire: commentaire || '',
          regimes: regimesStr,
          distance: distanceStr,
        },
        mode: 'payment',
        success_url: `${siteUrl}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/offres-speciales`,
      })

    } else if (offre === 'pack_decouverte') {
      const { nom, email, boxNom, taille, prix, commentaire } = body

      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        locale: 'fr',
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Pack Découverte Gourmand — ${boxNom}`,
              description: `${taille} personnes · Mini assortiment sucré offert (cookies, brownie, muffins)`,
              images: [`${siteUrl}/images/logo.png`],
            },
            unit_amount: Math.round(prix * 100),
          },
          quantity: 1,
        }],
        customer_email: email,
        metadata: {
          offre,
          boxNom: `Pack Découverte — ${boxNom}`,
          nom, email,
          taille,
          boxChoisie: boxNom,
          commentaire: commentaire || '',
          regimes: regimesStr,
          distance: distanceStr,
        },
        mode: 'payment',
        success_url: `${siteUrl}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/offres-speciales`,
      })

    } else if (offre === 'duo_gourmand') {
      const { nom, email, box1Nom, box1Taille, box1Prix, box2Nom, box2Taille, box2Prix, commentaire } = body
      const total = Math.round((box1Prix + box2Prix * 0.85) * 100)

      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        locale: 'fr',
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Le Duo Gourmand — ${box1Nom} & ${box2Nom}`,
              description: `${box1Nom} (${box1Taille} pers, prix normal) + ${box2Nom} (${box2Taille} pers, -15%)`,
              images: [`${siteUrl}/images/logo.png`],
            },
            unit_amount: total,
          },
          quantity: 1,
        }],
        customer_email: email,
        metadata: {
          offre,
          boxNom: `Duo Gourmand — ${box1Nom} & ${box2Nom}`,
          nom, email,
          box1: `${box1Nom} · ${box1Taille} pers`,
          box2: `${box2Nom} · ${box2Taille} pers (-15%)`,
          commentaire: commentaire || '',
          regimes: regimesStr,
          distance: distanceStr,
        },
        mode: 'payment',
        success_url: `${siteUrl}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/offres-speciales`,
      })

    } else if (offre === 'boite_gouter') {
      const { nom, email, telephone, adresse, dateDebut, commentaire } = body

      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        locale: 'fr',
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'La Boîte à Goûter — 1 mois (30 goûters pour le prix de 20)',
              description: [
                dateDebut && `Début : ${dateDebut}`,
                adresse && `Livraison : ${adresse}`,
                telephone && `Tél : ${telephone}`,
              ].filter(Boolean).join(' · '),
              images: [`${siteUrl}/images/logo.png`],
            },
            unit_amount: 3600,
          },
          quantity: 1,
        }],
        customer_email: email,
        metadata: {
          offre,
          boxNom: 'La Boîte à Goûter (offre lancement)',
          nom, email,
          telephone: telephone || '',
          adresse: adresse || '',
          date: dateDebut || '',
          livraison: 'oui',
          commentaire: commentaire || '',
          regimes: regimesStr,
          distance: distanceStr,
        },
        mode: 'payment',
        success_url: `${siteUrl}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/offres-speciales`,
      })

    } else {
      return NextResponse.json({ error: 'Offre inconnue' }, { status: 400 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Erreur Stripe checkout-offre:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}
