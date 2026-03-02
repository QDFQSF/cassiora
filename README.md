# 🍽️ Cassiora Traiteur — Site Web + Admin Sanity

Site Next.js premium avec interface d'administration Sanity CMS intégrée.
Design noir & or, Art Deco luxe. SEO optimisé pour Cahors, Montauban, Lot (46).

---

## 🚀 ÉTAPE 1 — Créer le projet Sanity

1. Va sur **https://sanity.io** → "Start for free"
2. Connecte-toi avec Google ou GitHub
3. Clique **"Create new project"**
4. Nom du projet : `cassiora`
5. Dataset : `production`
6. Note ton **Project ID** (visible dans l'URL ou les settings) — tu en auras besoin

---

## 🔧 ÉTAPE 2 — Configurer les variables d'environnement

Copie le fichier `.env.local.example` en `.env.local` :
```bash
cp .env.local.example .env.local
```

Puis remplis les valeurs :
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ton_project_id_ici
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=ton_token_ici
NEXT_PUBLIC_SITE_URL=https://www.cassiora.fr
```

**Créer le token Sanity :**
1. Dans sanity.io → ton projet → API → Tokens
2. "Add API token" → nom : "site-read" → permissions : Viewer
3. Copie le token dans `.env.local`

---

## 💻 ÉTAPE 3 — Lancer en local

```bash
npm install
npm run dev
```

→ Le site : **http://localhost:3000**
→ L'admin : **http://localhost:3000/studio**

---

## 🌐 ÉTAPE 4 — Déployer sur Vercel

### 4a. Pousser sur GitHub
```bash
git init
git add .
git commit -m "Initial commit - Cassiora Traiteur"
```
Crée un repo GitHub "cassiora" et pousse :
```bash
git remote add origin https://github.com/TON_USERNAME/cassiora.git
git push -u origin main
```

### 4b. Déployer sur Vercel
1. Va sur **https://vercel.com** → "New Project"
2. Importe ton repo GitHub "cassiora"
3. Dans **Environment Variables**, ajoute les 5 variables du `.env.local`
4. Clique **Deploy** ✓

### 4c. Ajouter les domaines
Dans Vercel → ton projet → Settings → Domains :
- Ajoute `cassiora.fr`
- Ajoute `www.cassiora.fr`

---

## 👩‍💼 DONNER L'ACCÈS ADMIN À TA FEMME

### Accès Sanity Studio
1. Dans sanity.io → ton projet → Members → "Invite member"
2. Invite l'email de ta femme avec le rôle **Editor**
3. Elle reçoit un email d'invitation
4. Elle se connecte sur **https://www.cassiora.fr/studio**

### Ce qu'elle peut modifier seule :
| Section | Ce qu'elle peut faire |
|---------|----------------------|
| 🏠 Page d'accueil | Modifier le titre, description, citation |
| 🍽️ Menus | Ajouter, modifier, supprimer des menus |
| ⭐ Offres spéciales | Activer/désactiver des offres en 1 clic |
| 📦 Box gourmandes | Gérer les box, prix, contenu, photos |
| 👨‍🍳 Ateliers | Gérer les ateliers, horaires, prix |
| 📖 Livre | Ajouter des extraits de recettes |
| ⭐ Avis clients | Ajouter, masquer des avis |

### Comment activer/désactiver les Offres spéciales
→ Dans le Studio, elle clique sur "Offres spéciales"
→ Elle active ou désactive la case **"Offre active"**
→ Si aucune offre n'est active, le bouton disparaît du menu automatiquement

---

## 📸 Ajouter des photos

Dans le Studio Sanity, elle peut uploader des photos directement depuis ses box, ateliers, etc. Elles seront automatiquement affichées sur le site.

Pour la photo principale du hero, déposer dans `/public/images/hero-bg.jpg`.

---

## 🔍 SEO — Référencement Google

### Mots-clés ciblés (déjà intégrés dans le code)
- "traiteur Cahors"
- "traiteur Lot 46"
- "traiteur Montauban"
- "box gourmande Lot livraison"
- "traiteur entreprise Montauban"
- "ateliers cuisine Lot"

### Après déploiement — à faire :

**1. Google Search Console**
- Va sur https://search.google.com/search-console
- "Ajouter une propriété" → `https://www.cassiora.fr`
- Vérifie la propriété (via Vercel DNS ou balise HTML)
- Soumets le sitemap : `https://www.cassiora.fr/sitemap.xml`

**2. Google Business Profile (fiche Google)**
- Va sur https://business.google.com
- "Ajouter votre établissement"
- Catégorie : "Traiteur" ou "Service de restauration"
- Adresse : Saint-Paul-de-Loubressac, 46170
- Ajoute le site web : https://www.cassiora.fr
- Vérifie par courrier (Google envoie un code)

**3. Demander des avis Google à tes clients**
→ C'est le facteur #1 de référencement local

---

## 📧 Connecter le formulaire de contact (optionnel)

Le formulaire est prêt visuellement. Pour recevoir les emails :

**Option A — Resend (recommandé, gratuit jusqu'à 3000 emails/mois)**
1. Crée un compte sur https://resend.com
2. Ajoute ta clé API dans `.env.local` : `RESEND_API_KEY=re_...`
3. Crée `app/api/contact/route.ts` (je te l'écris sur demande)

**Option B — Formspree (zéro code)**
1. Va sur https://formspree.io → crée un formulaire
2. Remplace l'action du formulaire dans `app/contact/page.tsx`

---

## 🎨 Charte graphique

| Couleur | Code | Usage |
|---------|------|-------|
| Or principal | `#c9a84c` | Accents, icônes |
| Or clair | `#e2ce75` | Titres dorés, hover |
| Crème | `#f8f6f0` | Texte principal |
| Noir | `#000000` | Fond |

Polices : **Cormorant Garamond** (titres) + **Cinzel** (navigation) + **Jost** (corps)

---

*Fait avec ❤️ pour Cassiora Traiteur*
