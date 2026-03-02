import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Resend } from "resend";

const sanityWrite = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const labels: Record<string, { nom: string; emoji: string }> = {
  livre: { nom: "Livre de Recettes Cassiora", emoji: "📖" },
  ateliers: { nom: "Ateliers Culinaires Cassiora", emoji: "👨‍🍳" },
};

export async function POST(request: Request) {
  try {
    const { email, prenom, type } = await request.json();

    if (!email || !type || !labels[type]) {
      return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
    }

    const info = labels[type];

    // 1. Sauvegarder dans Sanity
    await sanityWrite.create({
      _type: "waitlist",
      email,
      prenom: prenom || "",
      type,
      notifie: false,
      dateInscription: new Date().toISOString(),
    });

    // 2. Email de confirmation au visiteur
    await resend.emails.send({
      from: "Cassiora Traiteur <contact@cassiora.fr>",
      to: email,
      subject: `${info.emoji} Vous êtes sur la liste — ${info.nom}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 24px; background: #f8f6f0;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="font-size: 2rem; margin-bottom: 8px;">${info.emoji}</div>
            <h1 style="color: #c9a84c; font-size: 1.1rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 400; margin: 0;">Cassiora Traiteur</h1>
          </div>
          <div style="background: white; padding: 40px 32px; border-left: 3px solid #c9a84c;">
            <h2 style="color: #1a1a1a; font-size: 1.5rem; font-weight: 300; margin: 0 0 16px;">
              ${prenom ? `Bonjour ${prenom},` : "Bonjour,"} vous êtes inscrit·e !
            </h2>
            <div style="width: 40px; height: 1px; background: #c9a84c; margin: 0 0 24px;"></div>
            <p style="color: #555; line-height: 1.8; margin: 0 0 16px;">
              ${type === "livre"
                ? "Vous serez parmi les premiers à être informés de la sortie du livre de recettes artisanales de Cassiora."
                : "Vous serez parmi les premiers à être informés de l'ouverture des ateliers culinaires Cassiora."}
            </p>
            <p style="color: #555; line-height: 1.8; margin: 0 0 24px;">
              Dès que ce sera disponible, vous recevrez un email en avant-première avec tous les détails.
            </p>
            <p style="color: #aaa; font-size: 0.85rem; font-style: italic; margin: 0;">Merci de votre intérêt et à très bientôt !</p>
          </div>
          <p style="text-align: center; color: #c9a84c; font-size: 0.85rem; font-style: italic; margin-top: 24px;">
            Cassiora Traiteur · Cuisine artisanale, saveurs généreuses
          </p>
        </div>
      `,
    });

    // 3. Notif interne
    await resend.emails.send({
      from: "Cassiora Notifications <contact@cassiora.fr>",
      to: "cassioratraiteur@gmail.com",
      subject: `📋 Nouvelle inscription — ${info.nom}`,
      html: `<p style="font-family: Georgia; padding: 20px;">
        <strong>Nouvelle inscription liste d'attente</strong><br/><br/>
        Liste : ${info.nom}<br/>
        Email : ${email}<br/>
        ${prenom ? `Prénom : ${prenom}<br/>` : ""}
        Date : ${new Date().toLocaleDateString("fr-FR")}
      </p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur waitlist:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}