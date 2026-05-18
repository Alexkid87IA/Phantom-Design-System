// =====================================================
//  AGENT TEMPLATES -- Pre-built agent templates by pole
// =====================================================

export var AGENT_TEMPLATES = [

  // ── Visibilite ──
  {
    id: 'tpl_cm_instagram',
    pole: 'Visibilite',
    name: 'Community Manager Instagram',
    description: 'Gère le feed, les stories et les reels Instagram. Planifie, publie et engage la communauté.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>',
    brief: 'Gérer le compte Instagram de Sushi Boy au quotidien. Publier du contenu food authentique et engageant : posts produit (nigiris, makis, chirashis), stories behind-the-scenes en cuisine, et reels tendance. Répondre aux commentaires et DMs dans les 2h. Objectif : +500 followers/mois et taux d\'engagement au-dessus de 4%.',
    chips: ['Planifie la semaine', 'Analyse les stats', 'Lance un reel', 'Réponds aux DMs'],
    responses: [
      'J\'ai préparé 8 posts pour la semaine. 3 photos produit, 2 reels, 2 stories et 1 carrousel. Tu veux voir le planning ?',
      'L\'engagement est en hausse de 12% sur les Reels cette semaine. On pousse plus ce format ?',
      'J\'ai identifié 3 tendances food sur Instagram : plating minimaliste, behind-the-scenes, et challenges client.',
      'Les collabs avec @marseillefood ont généré +340 followers cette semaine. On continue ?',
      'Compris. Je lance la production. Tu auras les maquettes demain matin avant 9h.',
      'Je réponds aux 12 DMs en attente avec le ton Sushi Boy. Tu veux valider avant envoi ?',
    ],
    color: '#FF2D87',
    firstDeliverable: {
      title: 'Planning semaine — 5 posts prêts',
      items: [
        'Lundi — Reel : Chef Kenji découpe le saumon en service (tendance ASMR food)',
        'Mardi — Carrousel : 5 nigiris signatures avec noms et descriptions',
        'Mercredi — Story : behind-the-scenes, livraison du poisson frais à 6h',
        'Jeudi — Reel : time-lapse plating du dragon roll, musique lo-fi',
        'Vendredi — Post : photo client "meilleur sushi de Marseille" + repost',
      ],
      footer: 'Tu veux que je modifie un post ou que je lance la production ?',
    },
  },
  {
    id: 'tpl_social_ads',
    pole: 'Visibilite',
    name: 'Social Ads Manager',
    description: 'Gère les campagnes publicitaires Meta et Google Ads. Optimise les budgets et les conversions.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>',
    brief: 'Gérer les campagnes publicitaires Meta (Facebook + Instagram) et Google Ads pour Sushi Boy. Créer les audiences, rédiger les accroches, optimiser les budgets. Objectif : coût par commande en ligne sous 3EUR, ROAS minimum x4. Reporting hebdo avec recommandations.',
    chips: ['Rapport de la semaine', 'Optimise le budget', 'Nouvelle campagne', 'Test A/B'],
    responses: [
      'Le ROAS de la campagne "Menu Midi" est à x5.2 cette semaine. Budget bien optimisé.',
      'J\'ai créé 3 variantes d\'accroche pour la campagne livraison. Tu veux les voir ?',
      'Le coût par conversion a baissé de 18% depuis le changement d\'audience. On est à 2.40EUR.',
      'Je recommande d\'augmenter le budget de 20% sur la campagne qui performe le mieux.',
      'Nouveau rapport prêt : impressions, clics, conversions, ROAS. Je te l\'envoie ?',
    ],
    color: '#FF8A1F',
    firstDeliverable: {
      title: 'Audit campagnes — Recommandations',
      items: [
        'Budget actuel : pas de campagnes actives détectées',
        'Recommandation 1 : lancer une campagne "Menu Midi" ciblant un rayon de 5km, budget 15EUR/jour',
        'Recommandation 2 : audience lookalike basée sur les clients Uber Eats existants',
        'Recommandation 3 : 3 visuels A/B test avec le dragon roll comme hero',
        'Objectif estimé : 20 commandes/semaine, coût par commande ~2.50EUR',
      ],
      footer: 'Je prépare la première campagne dès que tu valides.',
    },
  },
  {
    id: 'tpl_tiktok',
    pole: 'Visibilite',
    name: 'TikTok Creator',
    description: 'Crée du contenu vidéo court pour TikTok. Suit les tendances et maximise la viralité.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></svg>',
    brief: 'Créer du contenu TikTok pour Sushi Boy : vidéos behind-the-scenes en cuisine, tendances food, recettes express, et moments équipe. Publier 4-5 fois par semaine. Capter les tendances audio/format dans les 24h. Objectif : viralité locale Marseille et notoriété auprès des 18-35 ans.',
    chips: ['Tendances du jour', 'Script video', 'Planning semaine', 'Analyse virale'],
    responses: [
      'J\'ai repéré une tendance audio parfaite pour un behind-the-scenes sushi. On tourne aujourd\'hui ?',
      'La vidéo du chef qui coupe le saumon a fait 45k vues. On capitalise sur ce format ?',
      'J\'ai préparé 5 scripts pour la semaine. Mix cuisine, humour équipe et recette express.',
      'Le compte a gagné 800 followers cette semaine. Le format "process" marche très bien.',
      'Nouvelle tendance : les duets avec des food critics. On tente ?',
    ],
    color: '#0A0A0A',
    firstDeliverable: {
      title: '3 scripts TikTok — prêts à tourner',
      items: [
        'Script 1 : "POV tu manges le meilleur sushi de Marseille" — 15s, tendance audio trending',
        'Script 2 : "Comment on fait un dragon roll" — process 30s, vue cuisine avec le chef',
        'Script 3 : "Le client qui commande pour la première fois vs le régulier" — humour sketch 20s',
      ],
      footer: 'Quel script on tourne en premier ? Je peux adapter le format.',
    },
  },

  // ── Contenu ──
  {
    id: 'tpl_redacteur_seo',
    pole: 'Contenu',
    name: 'Redacteur SEO',
    description: 'Rédige des articles de blog optimisés pour le référencement naturel Google.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    brief: 'Rédiger et publier des articles SEO pour le blog de Sushi Boy. Sujets : cuisine japonaise, conseils sushi, culture food Marseille. Articles de 800 à 1500 mots, optimisés sur des mots-clés locaux. Objectif : top 10 Google sur "sushi marseille" et variantes. 2 articles par semaine minimum.',
    chips: ['Prochain article', 'Recherche mots-clés', 'Rapport positions', 'Calendrier éditorial'],
    responses: [
      'L\'article "Pourquoi le sushi marseillais cartonne" est prêt. 1 200 mots, 3 images, optimisé sur "sushi marseille".',
      'J\'ai identifié un mot-clé intéressant : "sushi frais marseille" -- volume 1.8k/mois, compétition faible.',
      'L\'article précédent est passé en position 8 après 3 jours. Belle progression.',
      'Je propose "Les 5 erreurs quand on commande des sushis en livraison". Fort potentiel viral.',
      'Calendrier éditorial du mois prêt. 8 articles planifiés avec mots-clés et angles.',
      'Compris. Je pivote le sujet et je te livre la nouvelle version demain.',
    ],
    color: '#00D26A',
    firstDeliverable: {
      title: 'Recherche mots-clés — Top 5 opportunités',
      items: [
        '"sushi marseille" — 2 400 rech/mois, position actuelle : non classé, difficulté : moyenne',
        '"restaurant japonais marseille" — 1 800 rech/mois, difficulté : haute',
        '"sushi livraison marseille" — 880 rech/mois, difficulté : faible — quick win',
        '"meilleur sushi marseille" — 720 rech/mois, difficulté : moyenne',
        '"sushi frais marseille" — 390 rech/mois, difficulté : faible — quick win',
      ],
      footer: 'Je rédige le premier article sur "sushi livraison marseille" ? C\'est le plus facile à gagner.',
    },
  },
  {
    id: 'tpl_copywriter',
    pole: 'Contenu',
    name: 'Copywriter',
    description: 'Écrit les textes de landing pages, emails marketing et fiches produit.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    brief: 'Rédiger tous les textes marketing de Sushi Boy : landing pages, emails promotionnels, fiches menu, textes pour les plateformes de livraison. Ton : chaleureux, gourmand, authentique. Adapter le message selon le canal (web, email, app livraison). Objectif : augmenter le taux de conversion des pages de commande.',
    chips: ['Nouveau texte', 'Revois cette page', 'Email promo', 'Fiche produit'],
    responses: [
      'J\'ai rédige 3 variantes pour la page de commande en ligne. Laquelle tu préfères ?',
      'L\'email promo "Menu Saint-Valentin" est prêt. Objet, corps, CTA -- tout est la.',
      'J\'ai optimisé les fiches Uber Eats : descriptions plus courtes, plus gourmandes.',
      'Compris. Je retravaille le ton pour etre plus décontracté. Nouvelle version dans 1h.',
      'Les textes de la landing page livraison sont prêts. Tu veux un A/B test sur l\'accroche ?',
    ],
    color: '#FFD400',
    firstDeliverable: {
      title: 'Accroche page commande — 3 variantes',
      items: [
        'V1 : "Le sushi marseillais qui rend accro. Commande en 2 clics, livré en 30 min."',
        'V2 : "Du comptoir du chef Kenji à ta porte. Sushi frais, zéro compromis."',
        'V3 : "Ton dragon roll préféré, encore chaud. Commande maintenant."',
      ],
      footer: 'Laquelle te parle le plus ? Je décline le reste de la page dans ce ton.',
    },
  },
  {
    id: 'tpl_newsletter',
    pole: 'Contenu',
    name: 'Newsletter Manager',
    description: 'Gère les envois de newsletters hebdomadaires ou mensuelles aux clients.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>',
    brief: 'Gérer la newsletter hebdomadaire de Sushi Boy : rédaction, design, envoi et analyse. Contenu : nouveautés menu, offres spéciales, coulisses, événements. Segmenter la base (clients réguliers, occasionnels, prospects). Objectif : taux d\'ouverture >30%, taux de clic >5%.',
    chips: ['Prochaine newsletter', 'Stats du dernier envoi', 'Segmente la base', 'Idées de sujets'],
    responses: [
      'La newsletter de la semaine est prête. Sujet : "Le nouveau chirashi été". Tu valides avant envoi ?',
      'Le dernier envoi a fait 34% d\'ouverture et 6.2% de clics. Au-dessus des objectifs.',
      'J\'ai segmenté la base en 3 groupes. Les clients réguliers reçoivent du contenu exclusif.',
      'Idées pour les 4 prochaines newsletters listées. Tu veux qu\'on priorise ensemble ?',
      'Compris, je modifie le sujet et l\'accroche. Nouvel envoi planifié pour demain 10h.',
    ],
    color: '#0066FF',
    firstDeliverable: {
      title: 'Newsletter #1 — Brouillon prêt',
      items: [
        'Objet : "Le chef Kenji a un nouveau secret"',
        'Section 1 : Nouveau plat — le chirashi été avec mangue et saumon fumé',
        'Section 2 : Coulisses — photos du marché aux poissons à 5h du mat',
        'Section 3 : Offre spéciale — -15% sur ta première commande en ligne',
        'CTA : "Je commande mon chirashi"',
      ],
      footer: 'Tu valides le brouillon ou tu veux changer l\'angle ?',
    },
  },

  // ── Web ──
  {
    id: 'tpl_webmaster',
    pole: 'Web',
    name: 'Webmaster',
    description: 'Maintient le site à jour : menu, horaires, performance et sécurité.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    brief: 'Maintenir le site web de Sushi Boy à jour et performant. Mettre à jour le menu, les horaires, et la page de reservation. Garantir un temps de chargement sous 2 secondes. Vérifier la sécurité (SSL, mises à jour CMS). Optimiser l\'experience mobile. Reporting mensuel de performance.',
    chips: ['Mets à jour le menu', 'Rapport vitesse', 'Vérifie le SSL', 'Ajoute une page'],
    responses: [
      'Le site est stable. Temps de chargement moyen : 1.6s. Tout est au vert.',
      'Mise à jour du menu faite. Les nouveaux plats été sont en ligne.',
      'J\'ai détecté un ralentissement sur mobile. Je compresse les images, ça sera réglé dans 1h.',
      'Le certificat SSL est valide jusqu\'en septembre. RAS côté sécurité.',
      'Je prépare la nouvelle page "Traiteur". Tu auras un lien de prévi dans l\'heure.',
    ],
    color: '#0066FF',
    firstDeliverable: {
      title: 'Audit rapide du site — 4 points',
      items: [
        'Performance : temps de chargement 1.8s (objectif <2s) — OK',
        'Sécurité : SSL valide, CMS à jour — OK',
        'Mobile : score Google 89/100 — quelques images à compresser',
        'Menu : dernière mise à jour il y a 3 semaines — je vérifie si c\'est à jour',
      ],
      footer: 'Je m\'occupe des images mobiles tout de suite. Tu veux une mise à jour du menu ?',
    },
  },
  {
    id: 'tpl_landing_page',
    pole: 'Web',
    name: 'Landing Page Builder',
    description: 'Crée des pages de conversion optimisées pour les offres et événements.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    brief: 'Créer des landing pages de conversion pour Sushi Boy : offres spéciales, événements, menus saisonniers, service traiteur. Pages rapides, mobile-first, avec CTA clairs. Intégrer le tracking de conversion. Objectif : taux de conversion >8% sur les pages de réservation et commande.',
    chips: ['Nouvelle landing', 'Optimise cette page', 'Test A/B', 'Stats conversions'],
    responses: [
      'Landing page "Menu Été" prête. Design épuré, CTA "Commander" bien visible. Tu veux voir ?',
      'Le taux de conversion de la page traiteur est passé de 4% à 9% après optimisation.',
      'J\'ai lancé un A/B test sur 2 variantes d\'accroche. Résultats dans 48h.',
      'Compris. Je retouche le design et je t\'envoie la v2 dans l\'heure.',
      'Toutes les landing pages sont mobile-first. Score Google : 95/100.',
    ],
    color: '#00D26A',
    firstDeliverable: {
      title: 'Audit conversion — Page de réservation',
      items: [
        'Taux de conversion actuel estimé : ~5% (moyenne restaurant : 8%)',
        'Problème 1 : le bouton "Réserver" est sous la ligne de flottaison mobile',
        'Problème 2 : pas de preuve sociale (avis clients) près du CTA',
        'Problème 3 : formulaire en 4 étapes — je recommande 2 max',
        'Potentiel : +60% de réservations en corrigeant ces 3 points',
      ],
      footer: 'Je crée une V2 optimisée de la page ? Résultat en 2h.',
    },
  },

  // ── Admin & Gestion ──
  {
    id: 'tpl_facturation',
    pole: 'Admin & Gestion',
    name: 'Assistant Facturation',
    description: 'Gère les devis, factures, relances de paiement et suivi trésorerie.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    brief: 'Gérer la facturation de Sushi Boy : création de devis pour le service traiteur, émission des factures, relances automatiques à J+7 et J+14, suivi de trésorerie. Archiver les documents comptables. Alerter si un paiement dépasse 30 jours de retard.',
    chips: ['Nouveau devis', 'Factures en retard', 'Relance client', 'Bilan du mois'],
    responses: [
      'J\'ai 3 factures en attente de paiement. 2 dans les délais, 1 en retard de 5 jours. Je relance ?',
      'Le devis traiteur pour l\'événement du 25 mai est prêt. Montant : 2 400EUR. Tu valides ?',
      'Relance envoyée au client Dupont. C\'est sa 2ème relance, je passe en ton plus ferme.',
      'Bilan mai : 12 factures émises, 9 payées, 3 en cours. Trésorerie saine.',
      'Compris. Je modifie le devis et je le renvoie au client dans l\'heure.',
    ],
    color: '#FFD400',
    firstDeliverable: {
      title: 'Snapshot financier — Mai 2025',
      items: [
        'Factures émises ce mois : 8 — total 14 200EUR',
        'Payées : 5 (9 800EUR) — En attente : 2 (3 200EUR) — En retard : 1 (1 200EUR, +12j)',
        'Action immédiate : relance pour la facture Dupont (1 200EUR, retard critique)',
        'Prochain devis à préparer : traiteur événement entreprise, 25 mai',
      ],
      footer: 'Je lance la relance Dupont tout de suite ?',
    },
  },
  {
    id: 'tpl_planificateur',
    pole: 'Admin & Gestion',
    name: 'Planificateur',
    description: 'Organise l\'agenda, les rendez-vous, les réservations et le planning équipe.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    brief: 'Gérer le planning de Sushi Boy : réservations groupe, rendez-vous fournisseurs, planning équipe, événements spéciaux. Coordonner les créneaux, envoyer les rappels, gérer les annulations. Optimiser le remplissage aux heures creuses.',
    chips: ['Planning semaine', 'Réservations du jour', 'Rappels à envoyer', 'Créneau disponible'],
    responses: [
      'Planning de la semaine prêt. 14 réservations confirmées, 3 en attente. Tu veux les détails ?',
      'Rappel envoyé pour les 5 réservations de demain soir. Tout estconfirmé.',
      'Un groupe de 12 demande le samedi 24 a 20h. On a de la place, je confirme ?',
      'J\'ai optimisé les créneaux du mardi midi. On peut accueillir 8 couverts de plus.',
      'Compris. J\'annule la réservation et je préviens le client. Créneau libéré.',
    ],
    color: '#6E3CFF',
    firstDeliverable: {
      title: 'Planning de la semaine — 17-23 mai',
      items: [
        'Lundi 19 — 10h : RDV fournisseur poisson (confirmer quantités été)',
        'Mardi 20 — 12h-14h : 3 réservations groupe (8, 6, 4 pers.)',
        'Mercredi 21 — Jour calme, 0 réservation — je propose une promo midi',
        'Vendredi 23 — 19h30 : réservation 12 pers. anniversaire (menu à confirmer)',
        'Samedi 24 — Complet à 95% dès 20h (rappels envoyés)',
      ],
      footer: 'Tu veux que je confirme le menu pour le groupe de vendredi ?',
    },
  },

  // ── Commercial ──
  {
    id: 'tpl_prospecteur',
    pole: 'Commercial',
    name: 'Prospecteur Digital',
    description: 'Gère la prospection par email et LinkedIn. Génère des leads B2B.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>',
    brief: 'Prospecter des clients B2B pour le service traiteur et événementiel de Sushi Boy : entreprises, CE, organisateurs d\'événements à Marseille. Canal principal : email + LinkedIn. Séquences de 3-4 messages. Objectif : 10 rendez-vous qualifiés par mois.',
    chips: ['Nouveaux prospects', 'Relance séquence', 'Stats du mois', 'Nouveau message'],
    responses: [
      'J\'ai identifié 25 entreprises cibles à Marseille. 12 CE de plus de 50 salariés.',
      'Sequence email envoyée à 15 prospects. Premier suivi dans 3 jours.',
      'Bilan du mois : 8 rendez-vous obtenus sur 45 contacts. Taux de réponse : 22%.',
      'Nouveau lead chaud : la boite Martin & Co veut un devis traiteur pour 80 personnes.',
      'Compris. Je personnalise le message pour ce secteur et je relance.',
    ],
    color: '#FF4D2E',
    firstDeliverable: {
      title: 'Fichier prospects — 10 premiers contacts',
      items: [
        'Martin & Co (CE 120 pers.) — DRH contactée, profil LinkedIn identifié',
        'Agence Riviera Events — 15 événements/an, gros potentiel traiteur',
        'Cabinet Deloitte Marseille — CE actif, budget repas élevé',
        'Startup MedTech Calanques — 45 employés, pas de traiteur attitré',
        '+ 6 autres entreprises dans un rayon de 3km — séquence email prête',
      ],
      footer: 'Je lance la première séquence dès demain matin. Tu valides les cibles ?',
    },
  },
  {
    id: 'tpl_avis',
    pole: 'Commercial',
    name: 'Gestionnaire Avis',
    description: 'Surveille et repond aux avis sur Google, TripAdvisor et les plateformes.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    brief: 'Surveiller et répondre à tous les avis en ligne de Sushi Boy : Google, TripAdvisor, Uber Eats, Deliveroo. Répondre dans les 24h max avec un ton chaleureux et professionnel. Signaler les avis négatifs récurrents. Objectif : maintenir la note au-dessus de 4.5 étoiles partout.',
    chips: ['Nouveaux avis', 'Avis négatifs', 'Stats du mois', 'Modifie la réponse'],
    responses: [
      'Nouvel avis 5 étoiles reçu de Marc T. : "Meilleur sushi de Marseille". Réponse prête.',
      'La note moyenne est passée à 4.7 ce mois. On est sur une belle dynamique.',
      'J\'ai détecté un pattern : les avis négatifs mentionnent surtout l\'attente le samedi soir.',
      'Compris. Je retravaille la réponse avec un ton plus empathique.',
      '3 nouveaux avis cette semaine : 2 positifs (5 étoiles) et 1 neutre (3 étoiles).',
      'Réponse envoyée à l\'avis négatif avec proposition de retour gratuit. Tu valides ?',
    ],
    color: '#FFD400',
    firstDeliverable: {
      title: 'Audit avis en ligne — Snapshot',
      items: [
        'Google : 4.7★ (248 avis) — 3 avis sans réponse cette semaine',
        'TripAdvisor : 4.5★ (89 avis) — 1 avis négatif récent sur le temps d\'attente',
        'Uber Eats : 4.6★ (312 avis) — note stable, bon taux de satisfaction',
        'Point d\'attention : 40% des avis négatifs mentionnent l\'attente le samedi soir',
        'Action : j\'ai préparé 3 réponses personnalisées pour les avis en attente',
      ],
      footer: 'Tu veux voir les réponses avant que je les publie ?',
    },
  },

  // ── Marque ──
  {
    id: 'tpl_brand_designer',
    pole: 'Marque',
    name: 'Brand Designer',
    description: 'Développe l\'identité visuelle : logo, charte graphique, supports print.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    brief: 'Développer et maintenir l\'identité visuelle de Sushi Boy : charte graphique, déclinaisons logo, palette couleurs, typographies. Créer les supports print : carte, affiches, packaging, goodies. Style : fusion japonais minimal + couleurs Marseille. Garantir la cohérence sur tous les supports.',
    chips: ['Nouveau support', 'Déclinaison logo', 'Charte à jour', 'Packaging'],
    responses: [
      'J\'ai travaille sur 2 pistes pour la carte été : une version épurée japonisante et une colorée marseillaise.',
      'Super direction. Je fusionne les deux et je te montre une V1 demain matin.',
      'Le packaging des baguettes est prêt. Design minimaliste avec le logo en gaufrage.',
      'J\'ai mis à jour la charte graphique avec les nouvelles couleurs validées.',
      'Compris. Je retravaille le contraste et je peaufine les détails. Résultat dans 24h.',
    ],
    color: '#6E3CFF',
    firstDeliverable: {
      title: 'Audit identité visuelle — Sushi Boy',
      items: [
        'Logo : lisible en grand mais perd en détail sous 32px — variante simplifiée à créer',
        'Palette : noir + rouge japonais fonctionne bien, mais il manque une couleur d\'accent chaude',
        'Typo : cohérente sur le site, mais les menus papier utilisent une police différente',
        'Packaging : les baguettes et sacs n\'ont pas encore le nouveau logo',
        'Proposition : je prépare un mini-guide de marque (1 page) qui unifie tout ça',
      ],
      footer: 'Je commence par le guide de marque ou le packaging ?',
    },
  },
  {
    id: 'tpl_content_designer',
    pole: 'Marque',
    name: 'Content Designer',
    description: 'Crée les visuels pour les réseaux sociaux, le site web et les campagnes.',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
    brief: 'Créer tous les visuels digitaux de Sushi Boy : posts Instagram, covers Facebook, bannières web, visuels pour les campagnes ads. Respecter la charte graphique. Produire des visuels food appétissants et cohérents. Livrer les formats adaptés à chaque plateforme.',
    chips: ['Nouveau visuel', 'Kit réseaux sociaux', 'Banniere web', 'Adapte ce format'],
    responses: [
      'J\'ai préparé le kit visuel de la semaine : 5 posts Instagram + 3 stories. Tu veux voir ?',
      'Les bannières pour la campagne "Menu Midi" sont prêtes en 3 formats.',
      'J\'ai créé un template réseaux sociaux réutilisable. Ça va accélérer la production.',
      'Compris. Je retouche les couleurs et je t\'envoie la version corrigée dans 1h.',
      'Les visuels sont adaptes pour Instagram, Facebook et Google Ads. Tout est prêt.',
    ],
    color: '#FF2D87',
    firstDeliverable: {
      title: 'Kit visuel semaine — 5 créations',
      items: [
        'Post 1 : photo produit dragon roll, fond sombre, format carré Instagram',
        'Post 2 : carrousel "5 raisons de commander chez Sushi Boy", style épuré',
        'Story 1 : template "Plat du jour" avec zone texte modifiable',
        'Story 2 : sondage "Team maki ou team nigiri ?" aux couleurs Sushi Boy',
        'Bannière : header Facebook mis à jour avec menu été',
      ],
      footer: 'Tu veux que je commence par les posts Instagram ou la bannière ?',
    },
  },
];


// ── QCM definitions per pole ──

export var POLE_QCM = {
  'Visibilite': [
    {
      id: 'networks',
      label: 'Quels réseaux ?',
      type: 'checkbox',
      options: ['Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'Twitter/X'],
    },
    {
      id: 'frequency',
      label: 'Fréquence de publication ?',
      type: 'radio',
      options: ['1x/jour', '2-3x/semaine', '1x/semaine', 'Flexible'],
    },
    {
      id: 'content_types',
      label: 'Types de contenu ?',
      type: 'checkbox',
      options: ['Photos', 'Videos/Reels', 'Stories', 'Carrousels', 'Texte'],
    },
    {
      id: 'tone',
      label: 'Ton de voix ?',
      type: 'radio',
      options: ['Decontracte', 'Professionnel', 'Humoristique', 'Inspirant'],
    },
  ],
  'Contenu': [
    {
      id: 'content_type',
      label: 'Type de contenu ?',
      type: 'checkbox',
      options: ['Articles blog', 'Landing pages', 'Emails', 'Newsletters'],
    },
    {
      id: 'article_length',
      label: 'Longueur des articles ?',
      type: 'radio',
      options: ['Court (500 mots)', 'Medium (1000 mots)', 'Long (2000+ mots)'],
    },
    {
      id: 'priority_topics',
      label: 'Sujets prioritaires ?',
      type: 'text',
      count: 3,
      placeholder: 'Ex : cuisine japonaise, menu du jour...',
    },
    {
      id: 'tone',
      label: 'Ton de voix ?',
      type: 'radio',
      options: ['Expert', 'Accessible', 'Narratif', 'Technique'],
    },
  ],
  'Web': [
    {
      id: 'cms',
      label: 'CMS actuel ?',
      type: 'select',
      options: ['WordPress', 'Shopify', 'Wix', 'Custom', 'Aucun'],
    },
    {
      id: 'objective',
      label: 'Objectif principal ?',
      type: 'radio',
      options: ['Performance', 'Design', 'SEO technique', 'Sécurité'],
    },
    {
      id: 'update_frequency',
      label: 'Fréquence de mise à jour ?',
      type: 'radio',
      options: ['Quotidienne', 'Hebdo', 'Mensuelle'],
    },
  ],
  'Admin & Gestion': [
    {
      id: 'tasks',
      label: 'Taches principales ?',
      type: 'checkbox',
      options: ['Facturation', 'Planning', 'Emails', 'Suivi client'],
    },
    {
      id: 'tools',
      label: 'Outils actuels ?',
      type: 'checkbox',
      options: ['Excel', 'Google Sheets', 'Logiciel dedie', 'Aucun'],
    },
  ],
  'Commercial': [
    {
      id: 'channels',
      label: 'Canaux de prospection ?',
      type: 'checkbox',
      options: ['Email', 'LinkedIn', 'Téléphone', 'Google Avis'],
    },
    {
      id: 'volume',
      label: 'Volume mensuel ?',
      type: 'radio',
      options: ['10-50 contacts', '50-200 contacts', '200+ contacts', 'Je ne sais pas'],
    },
    {
      id: 'goal',
      label: 'Objectif ?',
      type: 'radio',
      options: ['Leads', 'Rendez-vous', 'Ventes directes'],
    },
  ],
  'Marque': [
    {
      id: 'visual_needs',
      label: 'Besoins visuels ?',
      type: 'checkbox',
      options: ['Logo', 'Charte graphique', 'Posts réseaux', 'Packaging', 'Menu/Flyer'],
    },
    {
      id: 'visual_style',
      label: 'Style visuel ?',
      type: 'radio',
      options: ['Minimaliste', 'Colore', 'Premium', 'Artisanal'],
    },
  ],
};


// ── Helpers ──

export function getTemplatesForPole(pole) {
  var normalizedPole = pole.replace(/[eéèê]/g, 'e').replace(/[aà]/g, 'a');
  return AGENT_TEMPLATES.filter(function(t) {
    var tPole = t.pole.replace(/[eéèê]/g, 'e').replace(/[aà]/g, 'a');
    return tPole === normalizedPole || t.pole === pole;
  });
}

export function getQcmForPole(pole) {
  var normalizedPole = pole.replace(/[éèê]/g, 'e').replace(/[à]/g, 'a');
  return POLE_QCM[normalizedPole] || POLE_QCM[pole] || [];
}
