# Phantom — Design System

> **Phantom** est une boîte digitale IA qui livre des solutions agentiques aux PME, TPE et petites/moyennes entreprises. Chaque agent est piloté par une équipe d'experts humains : social media manager IA, gestion d'avis, optimisation photos resto pour Uber Eats, création de sites, refonte d'écosystème de marque B2B→B2C, etc. Phantom = la réponse stratégique globale, pilotée par IA et orchestrée par des humains experts.

Ce design system contient les fondations visuelles, les composants et les UI kits qui permettent à n'importe quel designer/agent de générer des artefacts (slides, pages, app, mocks) parfaitement on-brand.

---

## Sources

> ⚠️ **Marque nouvelle** — aucun asset existant fourni. Tout a été inventé sur la base du brief client + du benchmark visuel ci-dessous. Logo, mascotte, palette, type, motifs sont des propositions à valider.

**Brief client (extrait, FR)** : "Phantom, nouvelle boîte digitale IA. On a une solution agentique pour toutes les problématiques des TPE/PME. Les agents sont reliés directement à une équipe d'experts qui les pilote. Best social media manager du monde + création de sites + gestion/optimisation d'avis + optimisation photos plats pour Uber Eats + identité de marque B2B→B2C. Bref, on fait un peu de tout. J'ai besoin d'un design system hyper moderne, hyper clair et clean, classe, blanc et très coloré."

**Direction validée** :
- Personnalité : Audacieux / éditorial / magazine + Énergique / pop / fun + Tech / IA futuriste
- Couleur : multicolore arc-en-ciel (signature violet électrique #6E3CFF)
- Type : sans-serif géométrique moderne
- Motifs : glassmorphism + dégradés mesh + grille stricte + bordures noires épaisses + glyphes fantôme
- Métaphore : on embrasse le nom Phantom à fond → mascotte fantôme cute + glyphes
- Langue : FR exclusif, tutoiement, direct & complice
- Variations : 3 directions divergentes (Néo Pop / Spectre / Grid)

**Benchmark visuel** (screenshots fournis) : loloagency.com — pour l'élégance des pastilles UI, la composition éditoriale, le côté agence classe. Phantom pousse plus pop, tech et coloré.

---

## Index du dossier

```
README.md                  ← ce fichier
SKILL.md                   ← Agent Skill cross-compatible
colors_and_type.css        ← tokens CSS (vars couleurs, type, espacements, radii, shadows)
assets/
  logo/                    ← wordmark, mark mascotte, lockup horizontal, variantes mono
preview/                   ← cards du Design System tab (par concept)
directions/                ← 3 explorations divergentes (A · Néo Pop / B · Spectre / C · Grid)
ui_kits/
  marketing/               ← site marketing Phantom (landing, pricing, manifeste, services, case, footer)
  webapp/                  ← dashboard agents (sidebar, KPIs, activity, composer)
  mobile/                  ← app mobile iOS (onboarding, dashboard, chat agent)
slides/                    ← deck commercial (8 slides 1920×1080)
```

> **Fonts** : Geist, Space Grotesk et JetBrains Mono sont chargés via Google Fonts CDN (voir l'`@import` dans `colors_and_type.css` + les `<link>` dans chaque HTML). Pas de TTF/WOFF stockés localement. Substitution proposée pour les premiers choix payants (Söhne, GT America) — à faire valider.

---

## CONTENT FUNDAMENTALS

**Langue** : FR uniquement. Tutoiement systématique. Pas de "vous", jamais.

**Voix** : Direct, complice, pas corporate. Phantom parle comme un pote expert qui sait que tu es occupé⋅e. Phrases courtes. Verbes d'action. Zéro jargon IA gratuit ("LLM", "RAG", etc. → bannis sauf doc tech).

**Casing** :
- Titres marketing : **Sentence case** ou **MAJUSCULES** pour les hero (effet éditorial magazine).
- UI in-app : **Sentence case** ("Crée un agent", pas "Créer un agent" ni "CRÉER UN AGENT").
- Boutons : verbe d'action à l'impératif tutoyé ("Lance ton agent", "Continue", "Voir mes agents").
- Labels & badges : `MAJUSCULES`, tracking +1px, mono parfois.

**Emoji** : utilisés avec parcimonie, **jamais en décoration de carte**. OK dans le ton conversationnel d'un agent IA en chat. OK occasionnellement dans le marketing pour ponctuer une punchline ("On gère. 👻"). Pas d'emoji 3D / stickers.

**Iconographie textuelle** : pas de "→" pour décorer ; les flèches sont des SVG. Le tiret cadratin "—" est utilisé comme séparateur éditorial.

**Exemples concrets** :

| Bon | Mauvais |
|---|---|
| "On lance ton premier agent en 3 minutes." | "Lancez votre premier agent en quelques minutes seulement." |
| "Tes avis Google, on s'en occupe." | "Solution complète de gestion de votre e-réputation." |
| "L'agent répond. Toi tu dors." | "Notre intelligence artificielle automatise vos réponses 24/7." |
| "Phantom, c'est une équipe + des agents. Pas un chatbot." | "Phantom utilise des LLMs de dernière génération avec RAG." |
| "On a fait +47% d'engagement chez Sushi Boy." (preuve concrète) | "Boost your social presence with AI." |

**Tone of voice par surface** :
- **Landing/marketing** : punchy, éditorial, un peu provoc. Hero = phrase courte qui frappe.
- **App** : utile, factuel, complice. "Ton agent dort encore. Réveille-le."
- **Slides commerciales** : confiant, données concrètes, peu de blabla.
- **Erreurs & vides** : humain, jamais robot. "Aïe. On a rien trouvé." > "Erreur 404".

---

## VISUAL FOUNDATIONS

### Couleur
**Base blanche.** Le blanc (#FFFFFF et off-white #F7F6F2) est le canvas principal. La couleur arrive par BLOCS FRANCS, non par fond générique.

- **Signature** : violet électrique `#6E3CFF` (Phantom Violet). Sert pour les CTA primaires, le mark, et un agent sur deux.
- **Arc-en-ciel d'accents** : 6 couleurs vives qui peuvent toutes être utilisées en bloc plein (jamais ensemble sur une même surface — max 2-3) :
  - Rouge corail `#FF4D2E`
  - Orange `#FF8A1F`
  - Jaune `#FFD400`
  - Vert `#00D26A`
  - Bleu `#0066FF`
  - Rose `#FF2D87`
- **Noir** : `#0A0A0A` (jamais #000) pour les bordures éditoriales épaisses et le texte.
- **Gris** : échelle de 7 niveaux pour les UI states.

**Quand quoi** : la couleur signature pour le brand. Les rainbow accents pour TAGGER des agents/services (chaque catégorie d'agent a sa couleur). Pas de gradient corporate "violet→bleu" générique — si gradient, alors **mesh multi-stops audacieux** ou **bord à bord rainbow** façon dégradé prisme.

### Typographie
- **Display** : `Space Grotesk` 600/700 — caractère, jambes ouvertes, vibe éditoriale moderne.
- **Body / UI** : `Geist` 400/500/600 — neutre, lisible, géométrique discret.
- **Mono** : `JetBrains Mono` 400/500 — pour les chiffres, les status d'agent, les labels techniques.

**Échelle** : modulaire ratio 1.25 (major third). Tailles fluides au-delà de display L (clamp).

**Règles** :
- Titres marketing : Space Grotesk 600, tight tracking (-2%), line-height serré (1.05).
- Titres UI : Geist 600.
- Body : Geist 400, line-height 1.55.
- Tabular nums obligatoires partout où on affiche des chiffres (`font-variant-numeric: tabular-nums`).
- Mono pour : status, IDs d'agent, timestamps, métriques compactes, labels MAJ.

### Spacing
Échelle 4px : `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 80 / 120 / 160`. Container max 1280px. Gutter 32px desktop / 16px mobile.

### Backgrounds
- **Par défaut** : blanc pur ou off-white.
- **Sections rythmées** : un bloc full-bleed couleur arc-en-ciel (jaune, violet, vert) pour casser le rythme — JAMAIS de "section grise neutre".
- **Mesh gradients** : pour les zones atmosphériques (hero spectre, login, états "AI thinking"). Blur 80-120px, 3-4 couleurs rainbow.
- **Pas de texture grain** par défaut. Pas de motifs répétés type "dots / lignes".
- **Hand-drawn illustrations** : non. Mascotte fantôme géométrique uniquement.

### Bordures
- **Hairline UI** : 1px `#0A0A0A0F` (5%) ou `#0A0A0A14` (8%) pour les cards de l'app.
- **Bordure éditoriale épaisse** : 2px solid `#0A0A0A` pour les cards marketing pop, les badges, les cartes de témoignage. C'est une signature visuelle.
- Pas de bordures colorées sauf si la card entière est dans cette couleur.
- **Pas de "rounded card avec border-left colorée"** — bannie (cf. consigne anti-AI slop).

### Shadows
Système deux étages :
- **Plat** : `--shadow-flat: 0 1px 0 0 #0A0A0A0F` — micro lift pour inputs.
- **Soft** : `--shadow-soft: 0 4px 20px -4px #0A0A0A1A, 0 1px 0 0 #0A0A0A0A` — cards UI.
- **Pop** : `--shadow-pop: 4px 4px 0 0 #0A0A0A` — offset noir solide pour les cards marketing éditoriales (style poster).
- **Glow** : `--shadow-glow: 0 0 0 4px #6E3CFF26, 0 20px 60px -20px #6E3CFF66` — focus / hover sur élément violet.

Ne pas mélanger `pop` et `soft` sur la même surface.

### Radii
- `--r-xs: 4px` — pills, badges
- `--r-sm: 8px` — inputs, petits boutons
- `--r-md: 12px` — cards UI standard
- `--r-lg: 20px` — cards marketing, modales
- `--r-xl: 28px` — hero blocks
- `--r-full: 9999px` — pastilles nav (cf. loloagency), boutons capsule, avatars
- **Pas de** corners ultra-bombés sauf pastilles nav. Pas de "blob" organique.

### Animation
- Easing par défaut : `cubic-bezier(0.2, 0.8, 0.2, 1)` (Phantom Ease — sortie rapide, décélération douce). Variable : `--ease`.
- Durées : `--d-fast: 120ms` (hover), `--d-base: 220ms` (transition state), `--d-slow: 420ms` (page enter), `--d-ghost: 800ms` (apparition mascotte, float).
- **La mascotte FLOAT en permanence** (translateY 0→-8px, 2.4s ease-in-out infinite). Le float est la signature motion.
- Pas de bounces caoutchouteux. Pas de "spring" exagéré. Quelques apparitions en blur→net (filter blur 8→0) pour le côté "phantom".

### Hover states
- Boutons primaires : darken 6% + scale 1.01 + shadow-glow s'étend.
- Boutons secondaires : background fade vers un gris 4% → 8%.
- Cards interactives : translateY -2px + shadow renforcée.
- Liens text : underline apparait avec animation gauche→droite (200ms).
- **Pas** de simple `opacity: 0.7` qui fait amateur.

### Press states
- Tout cliquable : `transform: scale(0.98)` 80ms.
- Boutons pop (éditoriaux avec ombre offset) : l'ombre `4px 4px 0` devient `0 0 0` et l'élément se déplace `translate(4px, 4px)` — effet de "pressé physique".

### Transparence & blur
- Glassmorphism : limité aux zones "AI atmosphérique" (composer agent, popover commande, login spectral). Backdrop-filter blur 24px + bg `white/60` + border `white/40`.
- Pas de glass sur les cards de contenu standard (lisibilité).

### Imagerie
- **Photo** : naturelle, lumière chaude, peu retouchée. **Pas** de stock "team souriante devant ordi". **Pas** de glamour studio rose Lolo — Phantom est plus tech.
- Quand on a une photo, elle est CROPPÉE LARGE et placée full-bleed dans un bloc. Pas de coin arrondi inférieur à `--r-lg`.
- **Pas de N&B** par défaut. Sauf besoin éditorial spécifique.
- Posters cult : ok de mixer photo + bloc couleur + type énorme façon magazine.

### Layout
- Grille 12 colonnes desktop, gutter 32px, max 1280px.
- Asymétrie volontaire : ne pas tout centrer. Les hero peuvent être 8/4 avec mascotte qui dépasse du bloc.
- **Nav** : pastille flottante en bas-centre (inspirée Lolo) OU header sticky classique selon le contexte. Pour l'app, sidebar gauche.
- Footer marketing : large, éditorial, gros mots, contact en évidence.

### Density
- Marketing : aérée. Beaucoup d'espace négatif. Type énorme.
- App : dense mais respirante. 12px de padding mini sur cards UI.

---

## ICONOGRAPHY

**Système principal** : [Lucide](https://lucide.dev) (1.5px stroke, 24px par défaut), via CDN ou copie locale. Cohérent avec le ton tech-modern de Phantom.

```html
<!-- Via CDN -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="sparkles"></i>
```

**Tailles standards** : `16 / 20 / 24 / 32`. Toujours en pixels exacts (jamais d'icône à 17px).

**Couleurs** : héritent du `currentColor` du parent. Jamais d'icône bicolore.

**Mascotte fantôme** : asset SVG spécifique (assets/mascot/) — pas une icône, c'est un personnage. Float animé. Décline en 6 couleurs rainbow + monochrome noir + monochrome blanc.

**Emoji** : usage parcimonieux dans le copy (cf. CONTENT FUNDAMENTALS). Jamais comme remplaçant d'icône UI. Jamais d'emoji 3D Apple-style.

**Unicode** :
- Tiret cadratin `—` pour les séparateurs.
- Puces : pas de `•` décoratif ; utiliser SVG dot ou ne pas mettre de puce du tout.

**Logos & marks fournis dans `assets/`** :
- `logo-wordmark.svg` — "phantom" en Space Grotesk customisé
- `logo-mark.svg` — la mascotte seule
- `logo-lockup-h.svg` — wordmark + mark côte à côte
- `logo-mono-black.svg`, `logo-mono-white.svg` — versions monochromes pour fonds couleur

---

## Index des fichiers clés

| Fichier | Pour quoi |
|---|---|
| `colors_and_type.css` | Tous les tokens CSS — à inclure dans n'importe quel artefact |
| `assets/logo/` | Logos officiels Phantom |
| `assets/mascot/` | Mascotte fantôme — décline en couleurs |
| `directions/` | 3 explorations divergentes (à valider une par le client) |
| `ui_kits/marketing/index.html` | Landing complète |
| `ui_kits/webapp/index.html` | Dashboard agents |
| `ui_kits/mobile/index.html` | App mobile |
| `slides/index.html` | Templates de deck (6 layouts) |
| `SKILL.md` | Pour utiliser ce DS comme Agent Skill |

---

## Caveats à valider avec le client

1. **Marque inventée** — logo, mascotte, palette exacte → à valider/itérer.
2. **3 directions divergentes** — choisir UNE direction pour figer le système.
3. **Fonts substituées** — Geist + Space Grotesk + JetBrains Mono via Google Fonts (les premiers choix Söhne/GT America sont payants). Possibilité de migrer vers payants si budget.
4. **Aucune photo client réelle** — placeholders neutres dans les UI kits. À remplacer.
5. **Tone of voice** validé sur "complice direct" mais pas testé sur cibles TPE/PME réelles — A/B à prévoir.
