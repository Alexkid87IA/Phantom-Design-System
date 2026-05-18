// =====================================================
//  DATA -- Smart contextual responses per agent
// =====================================================

export var SMART_RESPONSES = {
  social: {
    contexts: [
      {
        id: 'greeting',
        patterns: [/bonjour/i, /salut/i, /hello/i, /hey/i, /coucou/i, /yo\b/i],
        responses: [
          'Salut ! Je suis sur le coup. Cette semaine, tes reels ont généré 2 340 vues -- c\'est +18% vs la semaine dernière. Tu veux qu\'on capitalise là-dessus ?',
          'Hey ! Ton compte Instagram est à 1 247 abonnés, on a gagné 43 followers cette semaine. Je prépare le planning de la semaine ?',
          'Salut ! J\'ai 3 contenus prêts à publier aujourd\'hui : un reel du chef Kenji en plein service, une story plating du dragon roll, et un carousel nigiris. On lance ?',
        ],
        chips: ['Montre le planning', 'Quels posts marchent ?', 'Lance les reels']
      },
      {
        id: 'performance',
        patterns: [/stats/i, /performance/i, /r[eEé]sultat/i, /engagement/i, /comment [cCç]a va/i, /[cCç]a donne quoi/i, /bilan/i, /chiffres/i, /analytics/i],
        responses: [
          'Cette semaine : 2 340 vues sur les reels (+18%), 287 likes en moyenne par post, et 43 nouveaux abonnés. Le contenu behind-the-scenes du chef Kenji cartonne, c\'est 3x l\'engagement habituel.',
          'Bilan du mois : 1 247 abonnés (+156), taux d\'engagement à 6.2% (la moyenne resto c\'est 3.8%). Les reels nigiris sont ton format star avec 890 vues en moyenne.',
          'Les stats sont bonnes. Meilleur post de la semaine : le reel dragon roll avec 1 840 vues et 312 likes. Pire : le carousel horaires, seulement 89 interactions. Je réajuste ?',
        ],
        chips: ['Détail par format', 'Compare au mois dernier', 'Top 5 posts', 'Ajuste la stratégie']
      },
      {
        id: 'modify',
        patterns: [/change/i, /modifie/i, /refais/i, /corrige/i, /ajuste/i, /remplace/i, /revois/i, /update/i],
        responses: [
          'Compris, je modifie. Tu auras la nouvelle version dans l\'heure. Je garde le même style visuel ou tu veux qu\'on change d\'approche ?',
          'OK je refais. Je m\'appuie sur les formats qui ont le mieux marché (reels behind-the-scenes, 890 vues en moyenne). Nouvelle version dans 30 min.',
          'C\'est note. Je revois le contenu et je te renvoie une V2 avant de publier. Tu veux valider avant que je pousse ?',
        ],
        chips: ['Valide et publie', 'Montre-moi d\'abord', 'Change le style', 'Garde le même ton']
      },
      {
        id: 'urgent',
        patterns: [/urgent/i, /vite/i, /maintenant/i, /asap/i, /tout de suite/i, /imm[eEé]diat/i, /rapidement/i],
        responses: [
          'Je suis dessus. Story publiée dans les 10 prochaines minutes. Je prends le meilleur visuel dispo du chef Kenji en action.',
          'Reçu, je passe en priorité. Je publie un reel flash avec le contenu du jour -- le plating des makis est parfait pour ça. 15 min max.',
          'C\'est parti, mode express. Je lance une story "en direct des cuisines" avec le contenu brut. Ça sera en ligne dans 5 min.',
        ],
        chips: ['Go, publie maintenant', 'Attends mon feu vert', 'Montre-moi avant']
      },
      {
        id: 'question',
        patterns: [/comment/i, /pourquoi/i, /explique/i, /c\'est quoi/i, /qu[\'’]est-ce/i, /quel/i, /combien/i],
        responses: [
          'Bonne question. Sur Instagram, l\'algorithme pousse les reels de 15-30s avec de la musique trending. Pour Sushi Boy, ça veut dire des vidéos courtes du chef Kenji en action -- c\'est ce qui génère le plus d\'engagement.',
          'En gros, l\'engagement rate mesure le % de tes abonnés qui interagissent (likes, commentaires, partages). À 6.2%, Sushi Boy est largement au-dessus de la moyenne resto (3.8%). C\'est un très bon signal.',
          'Les stories disparaissent après 24h mais boostent ta visibilité dans le feed. Les reels restent et ramènent des nouveaux abonnés. Je recommande un mix 60% reels, 40% stories pour Sushi Boy.',
        ],
        chips: ['Merci, c\'est clair', 'Autre question', 'Applique ta recommandation']
      },
      {
        id: 'feedback_positive',
        patterns: [/bien/i, /parfait/i, /super/i, /bravo/i, /genial/i, /g[eEé]nial/i, /top/i, /excellent/i, /nickel/i, /impec/i, /j[\'’]adore/i, /cool/i],
        responses: [
          'Merci ! Je continue sur cette lancée. Prochain objectif : passer les 1 500 abonnés avant fin juin. Avec le rythme actuel, c\'est jouable.',
          'Content que ça te plaise ! Je garde cette direction. Le prochain batch de contenus est déjà en préparation -- 4 reels et 6 stories pour la semaine.',
          'Top, ça me confirme la bonne direction. Je pousse plus de contenu dans ce style. Tu veux que j\'augmente la fréquence de publication ?',
        ],
        chips: ['Continue comme ça', 'Augmente la cadence', 'Montre le planning']
      },
      {
        id: 'feedback_negative',
        patterns: [/pas bien/i, /nul/i, /mauvais/i, /d[eEé]cevant/i, /\bnon\b/i, /bof/i, /moche/i, /rate/i, /rat[eEé]/i, /refais/i, /pas terrible/i, /j[\'’]aime pas/i],
        responses: [
          'OK, je comprends. Dis-moi ce qui te dérange précisément -- le visuel, le texte, le format ? Je corrige dans l\'heure.',
          'Pas de souci, je reprends. Tu préfères qu\'on parte sur un style plus brut/authentique ou plus travaillé/esthétique ? Ça m\'aide à recalibrer.',
          'Compris. J\'arrété cette direction et je te propose 3 alternatives différentes d\'ici ce soir. Quel aspect est le plus à revoir selon toi ?',
        ],
        chips: ['Le visuel est à revoir', 'Le texte ne va pas', 'Change tout', 'Montre des alternatives']
      }
    ],
    fallback: {
      responses: [
        'Compris. Je m\'en occupe et je te tiens au courant. Tu veux un récap avant que je publie ?',
        'Noté. Je prépare ça pour Sushi Boy et je te fais un retour rapidement. En attendant, le planning Instagram tourne bien.',
        'OK, je prends en compte. Ça s\'intègre bien dans la stratégie social actuelle. Je reviens vers toi avec une proposition concrète.',
      ],
      chips: ['Valide tout', 'Pousse les vidéos shorts', 'Plus de collabs', 'Pause cette semaine']
    }
  },

  google: {
    contexts: [
      {
        id: 'greeting',
        patterns: [/bonjour/i, /salut/i, /hello/i, /hey/i, /coucou/i, /yo\b/i],
        responses: [
          'Salut ! Sushi Boy est à 4.7 étoiles sur Google avec 248 avis. Cette semaine, 5 nouveaux avis dont 4 positifs. Tout est sous contrôle.',
          'Hey ! Bonne nouvelle : on a reçu 2 avis 5 étoiles aujourd\'hui. Le taux de réponse est à 100% sur les 30 derniers jours. Tu veux voir les derniers retours ?',
          'Salut ! La note Google est stable à 4.7 étoiles. J\'ai répondu à tous les avis de la semaine en moins de 12h. Un client a même répondu à ma réponse pour dire merci.',
        ],
        chips: ['Voir les derniers avis', 'Stats du mois', 'Avis négatifs à traiter']
      },
      {
        id: 'performance',
        patterns: [/stats/i, /performance/i, /r[eEé]sultat/i, /engagement/i, /comment [cCç]a va/i, /[cCç]a donne quoi/i, /bilan/i, /chiffres/i, /note/i],
        responses: [
          'Bilan du mois : 4.7 étoiles (stable), 22 nouveaux avis, taux de réponse 100%, délai moyen de réponse 8h. Les mentions récurrentes positives : "qualité du poisson", "chef Kenji", "cadre agréable".',
          'Ce mois-ci : 18 avis positifs (4-5 étoiles), 4 avis négatifs (1-3 étoiles). Les négatifs parlent surtout du temps d\'attente le samedi soir et du parking. J\'ai répondu à chacun de manière personnalisée.',
          'La tendance est bonne. On est passé de 4.6 à 4.7 étoiles ce trimestre. Les mots-clés les plus cités : "sushi frais" (34 fois), "service impeccable" (28 fois), "dragon roll" (19 fois).',
        ],
        chips: ['Détail des négatifs', 'Compare au trimestre', 'Mots-clés cites', 'Objectif 4.8 étoiles']
      },
      {
        id: 'modify',
        patterns: [/change/i, /modifie/i, /refais/i, /corrige/i, /ajuste/i, /remplace/i, /ton/i, /réécris/i],
        responses: [
          'Compris, je modifie le ton de la réponse. Tu préfères plus chaleureux, plus formel, ou plus direct ? Je te renvoie la version corrigée dans 10 min.',
          'OK je revois la réponse. Je garde la structure (remerciement + empathie + solution) mais j\'ajuste le wording. Nouvelle version dans 5 min.',
          'Note, je réécris. Dis-moi si tu veux que j\'ajoute une invitation a revenir ou si on reste sobre. Je te montre avant de publier.',
        ],
        chips: ['Plus chaleureux', 'Plus formel', 'Plus court', 'Valide et publie']
      },
      {
        id: 'urgent',
        patterns: [/urgent/i, /vite/i, /maintenant/i, /asap/i, /tout de suite/i, /imm[eEé]diat/i, /rapidement/i, /critique/i],
        responses: [
          'Je vois l\'avis, je réponds immédiatement. Ton empathique + proposition de solution concrète. Tu veux relire avant que je publie ou je gère en autonomie ?',
          'Sur le coup. L\'avis négatif est visible publiquement, je publie une réponse professionnelle dans les 5 prochaines minutes pour limiter l\'impact.',
          'Reçu. Je traite ça en priorité absolue. Réponse personnalisée en cours de rédaction. Si c\'est un faux avis, je lance aussi la procédure de signalement Google.',
        ],
        chips: ['Publie la réponse', 'Montre-moi d\'abord', 'Signale l\'avis', 'Contacte le client']
      },
      {
        id: 'question',
        patterns: [/comment/i, /pourquoi/i, /explique/i, /c\'est quoi/i, /qu[\'’]est-ce/i, /quel/i, /combien/i],
        responses: [
          'Sur Google, la note est calculée sur la moyenne de tous les avis. Avec 248 avis à 4.7, il faudrait environ 15 avis 5 étoiles consécutifs pour passer à 4.8. C\'est faisable en 2-3 mois avec la bonne stratégie.',
          'Les avis négatifs impactent la note, mais une bonne réponse peut convertir un client mécontent en ambassadeur. 30% des clients qui reçoivent une réponse personnalisée modifient leur avis à la hausse.',
          'Google favorise les fiches avec des avis récents et des réponses rapides. Ça booste le classement local. Sushi Boy apparaît déjà en top 5 sur "sushi marseille" grâce à cette stratégie.',
        ],
        chips: ['Comment avoir plus d\'avis ?', 'Stratégie avis négatifs', 'Impact sur le SEO local']
      },
      {
        id: 'feedback_positive',
        patterns: [/bien/i, /parfait/i, /super/i, /bravo/i, /genial/i, /g[eEé]nial/i, /top/i, /excellent/i, /nickel/i, /impec/i, /j[\'’]adore/i, /cool/i],
        responses: [
          'Merci ! L\'objectif maintenant c\'est de passer à 4.8 étoiles d\'ici septembre. Je mets en place un système d\'incitation post-repas pour encourager les avis.',
          'Content que ça te convienne. Je maintiens cette qualité de réponse. Le ton "chaleureux mais pro" fonctionne bien pour Sushi Boy.',
          'Top ! Les réponses aux avis font partie de l\'image de marque. Je continue à personnaliser chaque réponse avec une référence au plat commandé quand c\'est possible.',
        ],
        chips: ['Continue comme ça', 'Stratégie 4.8 étoiles', 'Voir les prochains avis']
      },
      {
        id: 'feedback_negative',
        patterns: [/pas bien/i, /nul/i, /mauvais/i, /d[eEé]cevant/i, /\bnon\b/i, /bof/i, /rate/i, /rat[eEé]/i, /pas terrible/i, /j[\'’]aime pas/i, /trop/i],
        responses: [
          'Compris, je revois mon approche. Tu veux que je te montre 3 exemples de tons differents pour qu\'on cale le bon style ensemble ?',
          'OK, je note. Dis-moi ce qui cloche : le ton est trop formel ? Trop long ? Pas assez empathique ? Je recalibre immédiatement.',
          'Pas de souci, je corrige. Je vais m\'inspirer des meilleures pratiques des restos notes 4.9+ sur Google. Nouvelle approche dans l\'heure.',
        ],
        chips: ['Le ton est trop froid', 'C\'est trop long', 'Montre des exemples', 'Réécris tout']
      }
    ],
    fallback: {
      responses: [
        'Compris. Je gère ça côté avis Google et je te tiens informé. La note reste stable à 4.7 étoiles.',
        'Noté. Je m\'en occupe. Tu veux que je te fasse un récap hebdo des avis ou tu préfères être notifié en temps réel ?',
        'OK, c\'est pris en compte. Je continue à surveiller les avis et à répondre dans les 12h. Rien d\'anormal à signaler.',
      ],
      chips: ['Valide la réponse', 'Modifie le ton', 'Voir tous les avis', 'Stats du mois']
    }
  },

  photos: {
    contexts: [
      {
        id: 'greeting',
        patterns: [/bonjour/i, /salut/i, /hello/i, /hey/i, /coucou/i, /yo\b/i],
        responses: [
          'Salut ! J\'ai 15 photos finalisées ce mois-ci, 87% de taux d\'approbation. Les dernières du dragon roll sont mes meilleures à ce jour. Tu veux voir ?',
          'Hey ! Le set nigiris saumon est prêt en post-prod. Éclairage rasant, fond ardoise, style sombre et élégant. Je te montre le résultat ?',
          'Salut ! J\'ai terminé le shooting des makis pour Uber Eats. 8 photos, toutes calibrées pour les formats plateformes de livraison. On valide ?',
        ],
        chips: ['Montre les photos', 'Planifie un shooting', 'Photos pour Uber Eats']
      },
      {
        id: 'performance',
        patterns: [/stats/i, /performance/i, /r[eEé]sultat/i, /bilan/i, /chiffres/i, /combien/i, /avanc/i],
        responses: [
          'Bilan du mois : 15 photos livrées, 13 validées (87% d\'approbation). Les visuels sombres avec éclairage rasant ont le meilleur taux d\'approbation (92%). Les photos claires en lumière naturelle sont à 78%.',
          'Cette semaine : 5 photos du chef Kenji en action, 3 photos plating nigiris, 2 photos ambiance restaurant. Total : 10 visuels prêts à l\'emploi pour les réseaux et Uber Eats.',
          'Les dernières photos ont été utilisées 23 fois sur Instagram et 8 fois sur Uber Eats. Le visuel du dragon roll est le plus réutilisé (7 fois). Le style sombre domine en engagement.',
        ],
        chips: ['Photos les plus utilisées', 'Style à privilégier', 'Prochain shooting']
      },
      {
        id: 'modify',
        patterns: [/change/i, /modifie/i, /refais/i, /corrige/i, /ajuste/i, /remplace/i, /recadre/i, /retouche/i, /plus sombre/i, /plus clair/i],
        responses: [
          'Compris, je retouche. Tu veux que j\'ajuste la luminosite, le cadrage, ou les couleurs ? Donne-moi la direction et j\'ai la V2 dans 2h.',
          'OK je refais le set. Je pars sur le même plating mais je change l\'éclairage. Version plus contrastee, ombres plus marquees. Ça te parle ?',
          'Note, je modifie. Le fond ardoise ou le fond bois ? Et tu préfères la vaisselle noire ou la vaisselle céramique blanche pour le contraste ?',
        ],
        chips: ['Plus de contraste', 'Change le fond', 'Recadre plus serre', 'Valide la retouche']
      },
      {
        id: 'urgent',
        patterns: [/urgent/i, /vite/i, /maintenant/i, /asap/i, /tout de suite/i, /imm[eEé]diat/i, /rapidement/i],
        responses: [
          'Je cherche dans la banque. J\'ai 3 photos du dragon roll déjà retouchées qui peuvent dépanner immédiatement. Je te les envoie.',
          'Mode express : je prends les meilleurs visuels dispo en stock et je fais un recadrage rapide pour ton format. Prêt dans 15 min.',
          'Reçu. Je fouille les rushes du dernier shooting pour trouver un visuel utilisable tel quel. Tu auras quelque chose dans 10 min max.',
        ],
        chips: ['Envoie ce que tu as', 'Je peux attendre 1h', 'Utilise le stock']
      },
      {
        id: 'question',
        patterns: [/comment/i, /pourquoi/i, /explique/i, /c\'est quoi/i, /qu[\'’]est-ce/i, /quel/i],
        responses: [
          'L\'éclairage rasant (a 15-20 degres) fait ressortir les textures du poisson et créé des ombres dramatiques. C\'est le standard en photo food haut de gamme, et ça colle parfaitement au positionnement de Sushi Boy.',
          'Pour les plateformes de livraison, le formatcarré (1:1) avec fond neutre fonctionne le mieux. Les photos doivent etre lisibles en petit (50x50px sur l\'app). C\'est pour ça que je fais des cadrages serres.',
          'Le style sombre avec fond ardoise performe mieux pour Sushi Boy parce que ça evoque le luxe et la precision japonaise. Les restos qui utilisent ce style ont +23% de commandes en ligne en moyenne.',
        ],
        chips: ['Conseils pour le prochain set', 'Formats par plateforme', 'Tendances photo food']
      },
      {
        id: 'feedback_positive',
        patterns: [/bien/i, /parfait/i, /super/i, /bravo/i, /genial/i, /g[eEé]nial/i, /top/i, /excellent/i, /nickel/i, /impec/i, /j[\'’]adore/i, /cool/i, /beau/i],
        responses: [
          'Merci ! Je continue sur ce style. Prochain shooting prévu : les nouveaux desserts de Kenji. Mardi ou mercredi, tu préfères ?',
          'Content que ça plaise ! Je decline ce style sur toute la carte pour avoir une coherence visuelle parfaite sur Uber Eats et Deliveroo.',
          'Top ! Ce set peut aussi servir pour les réseaux sociaux et le site web. Je prépare les déclinaisons de format (carre, paysage, portrait) dans la journée.',
        ],
        chips: ['Décline sur toute la carte', 'Planifie le prochain shooting', 'Formats pour les réseaux']
      },
      {
        id: 'feedback_negative',
        patterns: [/pas bien/i, /nul/i, /mauvais/i, /d[eEé]cevant/i, /\bnon\b/i, /bof/i, /moche/i, /rate/i, /rat[eEé]/i, /pas terrible/i, /j[\'’]aime pas/i],
        responses: [
          'OK, je vois. C\'est l\'éclairage, le plating, ou le cadrage qui te gene ? Donne-moi un exemple de photo que tu aimes et je m\'aligne dessus.',
          'Compris. Je refais le set complet avec une approche différente. Tu préfères un style plus lumineux et naturel, ou on reste sombre mais avec un autre angle ?',
          'Pas de souci. Je te propose 3 directions visuelles différentes demain pour qu\'on trouve le bon style ensemble avant de lancer un gros shooting.',
        ],
        chips: ['L\'éclairage ne va pas', 'Le plating est à revoir', 'Montre d\'autres styles', 'Change tout']
      }
    ],
    fallback: {
      responses: [
        'Compris, je prends en note. Je cale ça dans le planning photo de la semaine. Tu veux un brief visuel avant que je shoote ?',
        'OK, c\'est note. J\'ai de la matière du dernier shooting qui peut servir. Je te fais une sélection dans la journée.',
        'Reçu. Je m\'en occupe. Le prochain créneau shooting est mardi. Tu veux que je prevoie quelque chose de spécifique ?',
      ],
      chips: ['Valide les photos', 'Refais le set', 'Planifie un shooting', 'Style plus sombre']
    }
  },

  seo: {
    contexts: [
      {
        id: 'greeting',
        patterns: [/bonjour/i, /salut/i, /hello/i, /hey/i, /coucou/i, /yo\b/i],
        responses: [
          'Salut ! Bonne nouvelle : "sushi marseille" est passé de la position 7 à la position 4 cette semaine. Le trafic organique est à 12 400 visiteurs/mois, en hausse de 8%. On pousse.',
          'Hey ! L\'article "Pourquoi le sushi marseillais cartonne" a généré 1 840 visites en 2 semaines. On est en train de grimper sur les mots-clés stratégiques. Tu veux le détail ?',
          'Salut ! 3 articles en ligne ce mois-ci, tous indexés par Google en moins de 48h. Le blog de Sushi Boy commence à devenir une vraie machine à trafic.',
        ],
        chips: ['Rapport positions', 'Mots-clés prioritaires', 'Prochain article']
      },
      {
        id: 'performance',
        patterns: [/stats/i, /performance/i, /r[eEé]sultat/i, /engagement/i, /comment [cCç]a va/i, /[cCç]a donne quoi/i, /bilan/i, /chiffres/i, /position/i, /ranking/i, /trafic/i],
        responses: [
          'Bilan SEO du mois : 12 400 visiteurs organiques (+8%), "sushi marseille" en position 4 (était 7), "restaurant japonais marseille" en position 6. On a gagné 3 backlinks naturels dont un de LaProvence.com.',
          'Top 5 mots-clés : "sushi marseille" (pos. 4, vol. 6.2k), "restaurant japonais marseille" (pos. 6, vol. 3.8k), "sushi livraison marseille" (pos. 9, vol. 2.1k), "meilleur sushi marseille" (pos. 11, vol. 1.9k), "sushi frais marseille" (pos. 8, vol. 1.8k).',
          'Google Search Console montre 34 200 impressions ce mois (+22%), 1 840 clics (+14%), CTR moyen de 5.4%. Les pages qui performent le mieux : la page menu et l\'article sur le sushi marseillais.',
        ],
        chips: ['Détail par mot-cle', 'Evolution sur 3 mois', 'Opportunites de mots-clés', 'Backlinks recus']
      },
      {
        id: 'modify',
        patterns: [/change/i, /modifie/i, /refais/i, /corrige/i, /ajuste/i, /remplace/i, /réécris/i, /optimisé/i, /pivote/i],
        responses: [
          'Compris, je revois l\'article. Je garde la structure SEO (H1, H2, maillage interne) mais je réécris le contenu selon ton feedback. Nouvelle version dans 24h.',
          'OK, je pivote le sujet. Je garde les mots-clés cibles mais je change l\'angle éditorial. Tu auras un nouveau plan d\'article dans 2h pour validation.',
          'Note, je modifie. L\'optimisation on-page reste la même mais je revois le contenu. Tu préfères un ton plus expert ou plus accessible ?',
        ],
        chips: ['Ton plus expert', 'Ton plus accessible', 'Réécris tout', 'Juste les titres']
      },
      {
        id: 'urgent',
        patterns: [/urgent/i, /vite/i, /maintenant/i, /asap/i, /tout de suite/i, /imm[eEé]diat/i, /rapidement/i],
        responses: [
          'Je lance la rédaction express. Article de 800 mots optimisé, en ligne dans les 4 prochaines heures. Je vise les mots-clés à faible compétition pour un positionnement rapide.',
          'Mode prioritaire activé. Je publie une version initiale optimisée aujourd\'hui et je l\'enrichis progressivement cette semaine. Le plus important c\'est d\'être indexé vite.',
          'Reçu. Je rédige et je publie en express. L\'article sera live ce soir. Tu veux valider le plan avant ou je gère en autonomie ?',
        ],
        chips: ['Gere en autonomie', 'Montre le plan d\'abord', 'Publie ce soir']
      },
      {
        id: 'question',
        patterns: [/comment/i, /pourquoi/i, /explique/i, /c\'est quoi/i, /qu[\'’]est-ce/i, /quel/i],
        responses: [
          'Le SEO local fonctionne sur 3 piliers : la fiche Google (avis + infos), le site web (contenu optimisé), et les citations locales (annuaires, PagesJaunes). Pour Sushi Boy, on est solide sur les 2 premiers, je renforce le 3eme.',
          'Un mot-clé long-tail comme "sushi livraison marseille 13001" a moins de volume mais beaucoup moins de compétition. C\'est plus facile de se positionner et le trafic est ultra qualifié (les gens veulent commander).',
          'Les backlinks, c\'est quand un autre site fait un lien vers le tien. Google interprété ça comme un vote de confiance. Le lien de LaProvence.com vaut énormément parce que c\'est un site d\'autorité locale.',
        ],
        chips: ['Comment gagner des backlinks ?', 'Stratégie mots-clés', 'SEO local vs national']
      },
      {
        id: 'feedback_positive',
        patterns: [/bien/i, /parfait/i, /super/i, /bravo/i, /genial/i, /g[eEé]nial/i, /top/i, /excellent/i, /nickel/i, /impec/i, /j[\'’]adore/i, /cool/i],
        responses: [
          'Merci ! Prochain objectif : top 3 sur "sushi marseille" d\'ici août. Ça implique 2 articles supplémentaires et une campagne de backlinks ciblée. On lance ?',
          'Content que les résultats soient là. Le SEO c\'est un jeu de patience et Sushi Boy commence à récolter. Je prépare le planning éditorial du mois prochain.',
          'Top ! La stratégie fonctionne. Je propose d\'attaquer un nouveau cluster de mots-clés autour de "cuisine japonaise marseille" pour elargir notre couverture.',
        ],
        chips: ['Lance le plan', 'Prochain cluster', 'Planning éditorial']
      },
      {
        id: 'feedback_negative',
        patterns: [/pas bien/i, /nul/i, /mauvais/i, /d[eEé]cevant/i, /\bnon\b/i, /bof/i, /rate/i, /rat[eEé]/i, /pas terrible/i, /j[\'’]aime pas/i, /lent/i],
        responses: [
          'Je comprends. Le SEO prend du temps (3-6 mois pour des résultats solides), mais si les résultats ne sont pas là, je revois la stratégie. Tu veux qu\'on se concentre sur des mots-clés moins concurrentiels ?',
          'OK. Je fais un audit complet de ce qui bloque : contenu, technique, ou backlinks. Je te présente un plan d\'action corrigé d\'ici demain.',
          'Compris. Je change d\'approche. Au lieu des articles génériques, je propose des contenus ultra-spécifiques type "guide du meilleur sushi par quartier à Marseille". Ça performe mieux en SEO local.',
        ],
        chips: ['Fais l\'audit', 'Change la stratégie', 'Mots-clés plus faciles', 'Montre ce qui bloque']
      }
    ],
    fallback: {
      responses: [
        'Compris. J\'intègre ça dans la stratégie SEO. Le prochain article est prévu pour mercredi, je tiens compte de ton retour.',
        'Noté. Je travaille dessus. En parallèle, "sushi marseille" continue de progresser -- on est à la position 4 et on vise le top 3.',
        'OK, c\'est pris en compte. Je reviens vers toi avec une proposition concrété alignee sur les objectifs SEO de Sushi Boy.',
      ],
      chips: ['Lance l\'article', 'Autre sujet', 'Rapport positions', 'Mots-clés prioritaires']
    }
  },

  web: {
    contexts: [
      {
        id: 'greeting',
        patterns: [/bonjour/i, /salut/i, /hello/i, /hey/i, /coucou/i, /yo\b/i],
        responses: [
          'Salut ! Le site Sushi Boy tourne bien : temps de chargement à 1.6s, Core Web Vitals au vert, 8 mises à jour déployées ce mois. Rien à signaler.',
          'Hey ! La page menu a été mise à jour hier avec les nouveaux plats d\'été du chef Kenji. Le formulaire de réservation fonctionne parfaitement, 34 réservations cette semaine via le site.',
          'Salut ! Tout est stable. Dernier déploiement : mise à jour du menu été le 12 mai. Uptime 99.9% ce mois. Tu as besoin de quelque chose ?',
        ],
        chips: ['Rapport vitesse', 'Mets à jour le menu', 'Stats du site']
      },
      {
        id: 'performance',
        patterns: [/stats/i, /performance/i, /r[eEé]sultat/i, /vitesse/i, /comment [cCç]a va/i, /[cCç]a donne quoi/i, /bilan/i, /chiffres/i, /chargement/i, /core web/i],
        responses: [
          'Bilan technique : temps de chargement 1.6s (objectif <2s), LCP à 1.8s, FID à 45ms, CLS à 0.03. Tous les Core Web Vitals sont au vert. 8 mises à jour ce mois, 0 incident.',
          'Le site a reçu 4 200 visites ce mois (+12%). Pages les plus vues : menu (38%), accueil (28%), réservation (18%). Le taux de conversion réservation est à 8.2%, c\'est excellent pour un resto.',
          'WordPress est à jour (6.5.2), tous les plugins sont patchés. SSL valide jusqu\'en mars 2027. Temps de réponse serveur : 180ms en moyenne. Tout est optimal.',
        ],
        chips: ['Détail Core Web Vitals', 'Pages les plus lentes', 'Taux de conversion', 'Mises à jour planifiées']
      },
      {
        id: 'modify',
        patterns: [/change/i, /modifie/i, /refais/i, /corrige/i, /ajuste/i, /remplace/i, /mets [aAà] jour/i, /update/i, /ajoute/i],
        responses: [
          'Compris, je fais la modification. Ce sera en ligne dans l\'heure. Tu veux un lien de prévisualisation avant que je mette en prod ?',
          'OK, je mets à jour le site. Je fais la modif sur la staging d\'abord pour vérifier que tout est clean, puis je déploie en prod. 30 min max.',
          'Noté, je modifie ça. Le site sera mis à jour aujourd\'hui. Je te préviens dès que c\'est en ligne avec une capture d\'écran avant/après.',
        ],
        chips: ['Lien de prévisualisation', 'Déploie directement', 'Montre avant/après']
      },
      {
        id: 'urgent',
        patterns: [/urgent/i, /vite/i, /maintenant/i, /asap/i, /tout de suite/i, /imm[eEé]diat/i, /rapidement/i, /bug/i, /cass[eEé]/i, /down/i, /plante/i],
        responses: [
          'Je vérifié immédiatement. Le site est up, temps de réponse normal. Si tu vois un problème, envoie-moi une capture et je corrige dans les 10 min.',
          'Mode urgence. Je check le serveur, les logs, et les Core Web Vitals. Si c\'est un bug, je déploie un hotfix en moins de 30 min.',
          'Sur le coup. Je lance un diagnostic complet : uptime, SSL, formulaire de réservation, page menu. Résultat dans 5 min.',
        ],
        chips: ['Check le site complet', 'C\'est la page menu', 'Le formulaire bug', 'Tout est down']
      },
      {
        id: 'question',
        patterns: [/comment/i, /pourquoi/i, /explique/i, /c\'est quoi/i, /qu[\'’]est-ce/i, /quel/i],
        responses: [
          'Les Core Web Vitals sont les métriques de Google pour mesurer l\'expérience utilisateur : LCP (vitesse d\'affichage), FID (réactivité), CLS (stabilité visuelle). Sushi Boy est au vert sur les 3, ce qui booste aussi le SEO.',
          'Le formulaire de réservation utilise un plugin WordPress connecté au système de réservation. 34 réservations cette semaine, taux de complétion 72%. Les abandons viennent surtout du choix de créneau (pas assez de disponibilités le samedi).',
          'Le temps de chargement de 1.6s est très bon pour un site resto. La moyenne du secteur est à 3.2s. On a gagné en performance grâce à la compression des images et au cache serveur.',
        ],
        chips: ['Comment améliorer encore ?', 'Faut-il changer d\'hébergeur ?', 'Optimisation mobile']
      },
      {
        id: 'feedback_positive',
        patterns: [/bien/i, /parfait/i, /super/i, /bravo/i, /genial/i, /g[eEé]nial/i, /top/i, /excellent/i, /nickel/i, /impec/i, /j[\'’]adore/i, /cool/i],
        responses: [
          'Merci ! Le site est dans un bon état. Prochaine étape : j\'aimerais ajouter un module de commande en ligne directe pour réduire la dépendance à Uber Eats. On en parle ?',
          'Content que tout roule. Je planifie les prochaines mises à jour : intégration du menu automne, ajout d\'une galerie photos, et optimisation mobile du formulaire.',
          'Top ! Le site fait son job. 34 réservations cette semaine, c\'est +15% vs le mois dernier. La refonte de la page réservation a bien fonctionné.',
        ],
        chips: ['Module commande en ligne', 'Prochaines mises à jour', 'Stats réservations']
      },
      {
        id: 'feedback_negative',
        patterns: [/pas bien/i, /nul/i, /mauvais/i, /d[eEé]cevant/i, /\bnon\b/i, /bof/i, /moche/i, /rate/i, /rat[eEé]/i, /lent/i, /pas terrible/i, /j[\'’]aime pas/i],
        responses: [
          'OK, dis-moi ce qui ne va pas : le design, la vitesse, le contenu, ou la navigation ? Je fais un audit et je propose des corrections concrètes.',
          'Compris. Je lance un check complet du site et je te fais un rapport avec les points à corriger. Priorité aux problèmes qui impactent les conversions (réservations).',
          'Noté. Si c\'est le design qui gêne, je peux proposer 3 maquettes de refonte légère sans tout casser. Si c\'est technique, je corrige dans la journée.',
        ],
        chips: ['C\'est le design', 'C\'est trop lent', 'La navigation est confuse', 'Fais un audit complet']
      }
    ],
    fallback: {
      responses: [
        'Compris. Je m\'en occupecôté site web. La modification sera en ligne aujourd\'hui. Tu veux un lien de preview avant ?',
        'Noté. Je planifie ça dans les prochaines mises à jour. Le site reste stable à 1.6s de chargement en attendant.',
        'OK, c\'est note. Je vérifie la faisabilité technique et je te reviens avec un plan d\'action dans la journée.',
      ],
      chips: ['Mets à jour le menu', 'Rapport vitesse', 'Ajoute une page', 'Verifie le SSL']
    }
  },

  brand: {
    contexts: [
      {
        id: 'greeting',
        patterns: [/bonjour/i, /salut/i, /hello/i, /hey/i, /coucou/i, /yo\b/i],
        responses: [
          'Salut ! J\'ai 6 designs finalisés ce mois-ci avec un taux d\'approbation de 83%. La direction "japonais contemporain + couleurs Marseille" fonctionne très bien. Tu veux voir les derniers ?',
          'Hey ! Les nouveaux menus print sont en cours de finalisation. Le style épuré japonais avec les touches de bleu Méditerranée, c\'est exactement ce qu\'on cherchait. Je te montre ?',
          'Salut ! La charte graphique Sushi Boy évolue bien. J\'ai travaillé sur le packaging des baguettes et la signalisation intérieure cette semaine. 3 pistes à te montrer.',
        ],
        chips: ['Montre les designs', 'Avancement du mois', 'Brief pour un nouveau support']
      },
      {
        id: 'performance',
        patterns: [/stats/i, /performance/i, /r[eEé]sultat/i, /bilan/i, /chiffres/i, /avanc/i, /o[uUù] on en est/i],
        responses: [
          'Bilan du mois : 6 designs livrés, 5 validés (83% d\'approbation). En cours : packaging baguettes, carte desserts été, et déclinaison du logo pour le merchandising.',
          'Cette semaine : j\'ai finalisé la carte été (fusion japonaise/marseillaise comme tu voulais) et commencé le design des stickers pour les sacs de livraison. Taux d\'approbation en hausse.',
          'On a 12 supports de marque actifs : carte, menu, affiches, packaging, stickers, sets de table, carte de visite, signalisation, goodies, enveloppes baguettes, sacs, et PLV vitrine.',
        ],
        chips: ['Supports en cours', 'Planning du mois', 'Taux d\'approbation', 'Prochaines priorités']
      },
      {
        id: 'modify',
        patterns: [/change/i, /modifie/i, /refais/i, /corrige/i, /ajuste/i, /remplace/i, /retouche/i, /plus japonais/i, /plus color[eEé]/i],
        responses: [
          'Compris, je modifie. Tu veux pousser plus vers le style japonais minimal ou vers les couleurs Marseille ? Donne-moi la direction et j\'ai une V2 demain matin.',
          'OK je revois le design. Je garde la structure mais j\'ajuste les couleurs et la typo. Tu préfères plus épuré ou plus chaleureux ?',
          'Note, je retravaille ça. Je te propose 2 variantes : une version plus sobre/japonisante et une version plus vivante/méditerranéenne. Tu choisis demain.',
        ],
        chips: ['Plus japonais', 'Plus marseillais', 'Fusion des deux', 'Montre les variantes']
      },
      {
        id: 'urgent',
        patterns: [/urgent/i, /vite/i, /maintenant/i, /asap/i, /tout de suite/i, /imm[eEé]diat/i, /rapidement/i],
        responses: [
          'Mode express activé. Je prends le template le plus proche de ce que tu veux et je l\'adapte. Version utilisable dans 2h max.',
          'Reçu, je passe en priorité. C\'est pour du print ou du digital ? Ça change le format et le délai. Print : 4h, digital : 1h.',
          'Sur le coup. Je te fais une version rapide avec les éléments existants de la charte Sushi Boy. Ce sera propre même en express.',
        ],
        chips: ['C\'est pour du print', 'C\'est pour du digital', 'Les deux', 'Utilise un template existant']
      },
      {
        id: 'question',
        patterns: [/comment/i, /pourquoi/i, /explique/i, /c\'est quoi/i, /qu[\'’]est-ce/i, /quel/i],
        responses: [
          'Le style "japonais contemporain" de Sushi Boy repose sur 3 piliers : typographie sans-serif épurée, palette sombre (noir + bleu Méditerranée), et illustrations minimalistes de poissons. Ça créé une identite premium et reconnaissable.',
          'Pour le packaging, on utilise du papier kraft avec un marquage à chaud du logo. C\'est premium, éco-friendly, et ça renforce le positionnement "artisanal japonais" de Sushi Boy.',
          'La charte graphique definit les couleurs (#1A1A2E pour le sombre, #16213E pour le bleu nuit, #E94560 pour les accents), les typos, et les regles d\'utilisation du logo. Tout support doit s\'y conformer pour la coherence.',
        ],
        chips: ['Montre la charte', 'Regles du logo', 'Palette de couleurs']
      },
      {
        id: 'feedback_positive',
        patterns: [/bien/i, /parfait/i, /super/i, /bravo/i, /genial/i, /g[eEé]nial/i, /top/i, /excellent/i, /nickel/i, /impec/i, /j[\'’]adore/i, /cool/i],
        responses: [
          'Merci ! Je continue sur cette ligne. Prochain chantier : les goodies (tote bag, t-shirt staff, mug). Tu veux valider les maquettes ?',
          'Content que ça te plaise ! Cette direction va creer une vraie identite reconnaissable pour Sushi Boy. Je decline sur tous les supports.',
          'Top ! La fusion japonais/Marseille, c\'est vraiment la signature de Sushi Boy. Je finalise les fichiers d\'impression et je te fais un devis imprimeur.',
        ],
        chips: ['Lance les goodies', 'Devis impression', 'Décline sur tout']
      },
      {
        id: 'feedback_negative',
        patterns: [/pas bien/i, /nul/i, /mauvais/i, /d[eEé]cevant/i, /\bnon\b/i, /bof/i, /moche/i, /rate/i, /rat[eEé]/i, /pas terrible/i, /j[\'’]aime pas/i],
        responses: [
          'OK, je comprends. C\'est la direction artistique globale qui ne va pas ou c\'est un élément spécifique (couleurs, typo, mise en page) ? Ça m\'aide à recalibrer.',
          'Compris. Je repart de zero sur ce support. Tu as des references visuelles de ce qui te plait ? Un resto, une marque, un style qui t\'inspire ?',
          'Pas de souci. Je te propose 3 directions complètement différentes d\'ici demain. On trouvera le bon style ensemble.',
        ],
        chips: ['Les couleurs sont à revoir', 'La typo ne va pas', 'Montre d\'autres styles', 'Repars de zéro']
      }
    ],
    fallback: {
      responses: [
        'Compris. J\'intègre ça dans la direction artistique de Sushi Boy. Tu auras une proposition dans les prochains jours.',
        'Noté. Je travaille dessus en respectant la charte graphique existante. Tu veux un aperçu avant que je finalise ?',
        'OK, c\'est pris en compte. Ça s\'inscrit bien dans l\'identite visuelle qu\'on construit. Je reviens vers toi avec un visuel.',
      ],
      chips: ['Version japonisante', 'Version colorée', 'Fusion des deux', 'Voir les déclinaisons']
    }
  }
};


/**
 * Find the best contextual response for a given agent and message.
 * @param {string} agentId - The agent identifier (e.g. 'social', 'google')
 * @param {string} messageText - The user's message text
 * @returns {{ text: string, chips: string[] }}
 */
export function findResponse(agentId, messageText) {
  var agentData = SMART_RESPONSES[agentId];

  // No smart data for this agent -- return null so caller can fallback
  if (!agentData) {
    return null;
  }

  var contexts = agentData.contexts || [];
  var msg = messageText || '';

  // Check each context's patterns against the message
  for (var i = 0; i < contexts.length; i++) {
    var ctx = contexts[i];
    var patterns = ctx.patterns || [];

    for (var j = 0; j < patterns.length; j++) {
      if (patterns[j].test(msg)) {
        var responses = ctx.responses || [];
        var text = responses[Math.floor(Math.random() * responses.length)];
        var chips = ctx.chips || [];
        return { text: text, chips: chips };
      }
    }
  }

  // No pattern matched -- use fallback
  var fb = agentData.fallback;
  if (fb) {
    var fbResponses = fb.responses || [];
    var fbText = fbResponses[Math.floor(Math.random() * fbResponses.length)];
    var fbChips = fb.chips || [];
    return { text: fbText, chips: fbChips };
  }

  return { text: 'Bien reçu. Je regarde ça et je te reviens vite.', chips: ['OK', 'Autre chose'] };
}
