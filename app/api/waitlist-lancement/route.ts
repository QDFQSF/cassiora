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

export async function POST(request: Request) {
  try {
    const { type, titre, corps } = await request.json();

    if (!titre || !corps) {
      return NextResponse.json({ error: "Titre et corps requis" }, { status: 400 });
    }

    // Récupérer tous les inscrits non encore notifiés
    const query = type === "tous"
      ? `*[_type == "waitlist" && notifie != true]{ _id, email, prenom, type }`
      : `*[_type == "waitlist" && type == "${type}" && notifie != true]{ _id, email, prenom, type }`;

    const inscrits = await sanityWrite.fetch(query);

    if (inscrits.length === 0) {
      return NextResponse.json({ success: true, envoyes: 0 });
    }

    let envoyes = 0;

    for (const inscrit of inscrits) {
      try {
        // Envoyer l'email
        await resend.emails.send({
          from: "Cassiora Traiteur <contact@cassiora.fr>",
          to: inscrit.email,
          subject: titre,
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 24px; background: #f8f6f0;">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #c9a84c; font-size: 1.1rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 400; margin: 0;">Cassiora Traiteur</h1>
              </div>
              <div style="background: white; padding: 40px 32px; border-left: 3px solid #c9a84c;">
                <p style="color: #333; font-size: 1rem; margin: 0 0 16px;">
                  ${inscrit.prenom ? `Bonjour ${inscrit.prenom},` : "Bonjour,"}
                </p>
                <div style="color: #555; line-height: 1.8; white-space: pre-line;">${corps}</div>
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
                  <p style="color: #aaa; font-size: 0.8rem; margin: 0;">
                    Vous recevez cet email car vous vous êtes inscrit·e sur la liste d'attente de cassiora.fr
                  </p>
                </div>
              </div>
              <p style="text-align: center; color: #c9a84c; font-size: 0.85rem; font-style: italic; margin-top: 24px;">
                Cassiora Traiteur · Cuisine artisanale, saveurs généreuses
              </p>
            </div>
          `,
        });

        // Marquer comme notifié dans Sanity
        await sanityWrite.patch(inscrit._id).set({ notifie: true }).commit();
        envoyes++;
      } catch (err) {
        console.error(`Erreur envoi à ${inscrit.email}:`, err);
      }
    }

    return NextResponse.json({ success: true, envoyes });
  } catch (error) {
    console.error("Erreur lancement:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}