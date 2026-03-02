import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature invalide:', err)
    return NextResponse.json({ error: 'Webhook invalide' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata || {}

    const montant = session.amount_total ? `${(session.amount_total / 100).toFixed(2)}€` : 'N/A'

    // Email à Cassiora
    await resend.emails.send({
      from: 'Cassiora Paiements <contact@cassiora.fr>',
      to: 'cassioratraiteur@gmail.com',
      subject: `✅ Paiement reçu — ${meta.boxNom} (${montant})`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8f6f0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c9a84c; font-size: 1.5rem; letter-spacing: 0.2em; text-transform: uppercase;">✅ Nouvelle commande payée</h1>
          </div>
          <div style="background: white; padding: 30px; border-left: 3px solid #c9a84c;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase; width: 140px;">Box</td>
                <td style="padding: 10px 0; color: #333; font-weight: bold;">${meta.boxNom}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase;">Taille / Formule</td>
                <td style="padding: 10px 0; color: #333;">${meta.taille || meta.formule}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase;">Montant</td>
                <td style="padding: 10px 0; color: #c9a84c; font-size: 1.2rem; font-weight: bold;">${montant}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase;">Client</td>
                <td style="padding: 10px 0; color: #333;">${meta.nom}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${session.customer_email}" style="color: #c9a84c;">${session.customer_email}</a></td>
              </tr>
              ${meta.telephone ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase;">Téléphone</td><td style="padding: 10px 0; color: #333;">${meta.telephone}</td></tr>` : ''}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase;">Date souhaitée</td>
                <td style="padding: 10px 0; color: #333;">${meta.date || 'Non précisée'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase;">Mode</td>
                <td style="padding: 10px 0; color: #333;">${meta.livraison === 'oui' ? `🚚 Livraison — ${meta.adresse}` : '🏠 Retrait sur place'}</td>
              </tr>
              ${meta.message ? `<tr><td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase; vertical-align: top;">Note</td><td style="padding: 10px 0; color: #333;">${meta.message}</td></tr>` : ''}
            </table>
          </div>
          <p style="text-align: center; color: #bbb; font-size: 0.75rem; margin-top: 20px;">cassiora.fr · Paiement traité par Stripe</p>
        </div>
      `,
    })

    // Email de confirmation au client
    await resend.emails.send({
      from: 'Cassiora Traiteur <contact@cassiora.fr>',
      to: session.customer_email!,
      subject: `Votre commande Cassiora est confirmée ✦`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8f6f0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c9a84c; font-size: 1.3rem; letter-spacing: 0.2em; text-transform: uppercase;">Merci pour votre commande !</h1>
          </div>
          <div style="background: white; padding: 30px; border-left: 3px solid #c9a84c;">
            <p style="color: #333; line-height: 1.7;">Bonjour ${meta.nom},</p>
            <p style="color: #333; line-height: 1.7; margin-top: 15px;">
              Votre commande <strong>${meta.boxNom}</strong> (${meta.taille || meta.formule}) a bien été reçue et votre paiement de <strong>${montant}</strong> a été validé.
            </p>
            <p style="color: #333; line-height: 1.7; margin-top: 15px;">
              ${meta.livraison === 'oui'
                ? `Votre box sera livrée à l'adresse indiquée. Je vous recontacterai pour confirmer les frais et l'heure de livraison.`
                : `Votre box sera prête pour le retrait à la date souhaitée. Je vous recontacterai pour confirmer l'heure et le lieu de retrait.`
              }
            </p>
            <p style="color: #666; font-size: 0.9rem; margin-top: 20px; font-style: italic;">
              Une question ? Répondez à cet email ou contactez-moi sur Instagram @cassiora.traiteur
            </p>
          </div>
          <p style="text-align: center; color: #c9a84c; font-size: 0.9rem; margin-top: 25px; font-style: italic;">
            Cassiora Traiteur · Cuisine artisanale, saveurs généreuses
          </p>
        </div>
      `,
    })
  }

  return NextResponse.json({ received: true })
}