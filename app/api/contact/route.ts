import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { nom, email, telephone, sujet, message } = await request.json()

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Cassiora Site <contact@cassiora.fr>',
      to: 'cassioratraiteur@gmail.com',
      replyTo: email,
      subject: `[Cassiora] Nouveau message — ${sujet || 'Contact'}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8f6f0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c9a84c; font-size: 1.5rem; letter-spacing: 0.2em; text-transform: uppercase;">Cassiora Traiteur</h1>
            <p style="color: #666; font-size: 0.85rem;">Nouveau message depuis le site</p>
          </div>
          <div style="background: white; padding: 30px; border-left: 3px solid #c9a84c;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Nom</td>
                <td style="padding: 10px 0; color: #333;">${nom}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
              </tr>
              ${telephone ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Téléphone</td>
                <td style="padding: 10px 0; color: #333;">${telephone}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Sujet</td>
                <td style="padding: 10px 0; color: #333;">${sujet || 'Non précisé'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #999; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${email}" style="display: inline-block; padding: 12px 30px; background: #c9a84c; color: black; text-decoration: none; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;">
              Répondre à ${nom}
            </a>
          </div>
          <p style="text-align: center; color: #bbb; font-size: 0.75rem; margin-top: 30px;">cassiora.fr</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}