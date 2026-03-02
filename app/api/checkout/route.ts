import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function POST(request: Request) {
  try {
    const { boxNom, taille, formule, prix, livraison, adresse, nom, email, telephone, date, message } = await request.json()

    // Description complète pour Stripe
    const description = [
      taille ? `${taille} personnes` : formule,
      date ? `Retrait/livraison : ${date}` : '',
      livraison ? `Livraison : ${adresse}` : 'Retrait sur place',
      telephone ? `Tél : ${telephone}` : '',
      message ? `Note : ${message}` : '',
    ].filter(Boolean).join(' · ')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      locale: 'fr',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${boxNom}${taille ? ` — ${taille} pers` : ` — ${formule}`}`,
              description,
              images: [`${siteUrl}/images/logo.png`],
            },
            unit_amount: Math.round(prix * 100), // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      // Frais de livraison si demandée
      ...(livraison ? {
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 0, currency: 'eur' },
              display_name: 'Livraison (frais confirmés par email)',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 1 },
                maximum: { unit: 'business_day', value: 3 },
              },
            },
          },
        ],
      } : {}),
      customer_email: email,
      metadata: {
        boxNom,
        taille: taille || '',
        formule: formule || '',
        nom,
        telephone: telephone || '',
        date: date || '',
        livraison: livraison ? 'oui' : 'non',
        adresse: adresse || '',
        message: message || '',
      },
      mode: 'payment',
      success_url: `${siteUrl}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/box-gourmande`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Erreur Stripe:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}