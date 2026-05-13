# UI Kit · Web App (Phantom Dashboard)

L'app web où le client TPE/PME pilote ses agents. Style : un peu plus sobre que le marketing, mais avec les mêmes signatures (mascotte par agent, couleurs rainbow par catégorie, pop highlights).

## Fichiers

- `index.html` — entry point
- `components.jsx` — atomes (Ghost, Avatar, Tag, Button, Card)
- `Sidebar.jsx` — navigation gauche (workspace + agents list + footer user)
- `Topbar.jsx` — barre du haut (breadcrumb, search, status, user)
- `AgentCard.jsx` — card d'un agent (status, dernière activité, KPI)
- `StatsRow.jsx` — bandeau stats KPI
- `ActivityFeed.jsx` — flux d'activité agentique en live
- `Composer.jsx` — composer pour parler à un agent (style chat)
- `Dashboard.jsx` — orchestration de la vue principale

## Vues couvertes

L'index.html montre le **dashboard principal** : workspace "Sushi Boy", 4 agents actifs, leur KPI, le composer ouvert sur "Agent Social", flux d'activité, et le mini état d'esprit "tout va bien".

Le composer est interactif — tu peux taper, voir un état "agent réfléchit", recevoir une réponse fake.

## Vocabulaire

- Sidebar : fond `paper-warm`, pastilles arrondies pour items
- Cards : `r-md` (12px), shadow soft
- KPI cards : `r-lg`, accent rainbow + mascotte
- Composer : pill input en bas, bulles de chat ronde
- Status pills : mono caps, dot coloré

## Tone

App = utile, factuel, complice. "Ton agent dort encore. Réveille-le.", "+47% ce mois — pas mal."
