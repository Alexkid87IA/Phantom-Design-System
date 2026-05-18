// ═══════════════════════════════════════════════════════════
//  INBOX — Items requiring user validation
// ═══════════════════════════════════════════════════════════

let INBOX_ITEMS = [
  { id: 'i1', agent: 'photos', title: '5 photos à valider pour Uber Eats', desc: 'Maki saumon, california, dragon roll, chirashi, sashimi mix', time: 'Il y a 2h',
    preview: {
      type: 'gallery',
      items: [
        { title: 'Maki saumon', detail: 'Fond ardoise, éclairage rasant, plating soigné' },
        { title: 'California roll', detail: 'Vue plongeante, sauce soja en premier plan' },
        { title: 'Dragon roll', detail: 'Angle 45, chopsticks en action' },
        { title: 'Chirashi', detail: 'Bowl complet, décor bois naturel' },
        { title: 'Sashimi mix', detail: 'Close-up textures, lumière naturelle' },
      ]
    }
  },
  { id: 'i2', agent: 'social', title: '12 posts à valider pour la semaine du 18 mai', desc: '4 nigiris du jour, 3 stories BTS, 2 collabs, 3 vidéos shorts', time: 'Il y a 3h',
    preview: {
      type: 'posts',
      items: [
        { title: 'Nigiri du jour — Lundi', detail: 'Photo + caption "Le saumon norvégien rencontre le riz vinaigré..."' },
        { title: 'Story BTS — Cuisine', detail: 'Vidéo 15s du chef Kenji en préparation' },
        { title: 'Collab @marseillefood', detail: 'Post croisé, photo plateau dégustation' },
        { title: 'Reel — Dragon roll ASMR', detail: 'Vidéo 30s, son de découpe, close-up' },
      ]
    }
  },
  { id: 'i3', agent: 'google', title: 'Réponse à un avis négatif à valider', desc: 'Avis 2★ de Thomas R. — réponse empathique préparée', time: 'Il y a 5h',
    preview: {
      type: 'text',
      label: 'Réponse proposée',
      content: 'Bonjour Thomas, merci pour votre retour. Nous sommes désolés que votre expérience n\'ait pas été à la hauteur. Notre chef Kenji serait ravi de vous accueillir de nouveau pour vous montrer notre vrai savoir-faire. Contactez-nous au 04 91 XX XX XX pour une réservation prioritaire.'
    }
  },
  { id: 'i4', agent: 'seo', title: 'Nouvelle opportunité mot-clé', desc: '"meilleur sushi marseille" — vol. 2.4k/mois, difficulté faible', time: 'Hier',
    preview: {
      type: 'keyword',
      keyword: 'meilleur sushi marseille',
      volume: '2 400/mois',
      difficulty: 'Faible',
      position: 'Non classé',
      suggestion: 'Rédiger un article optimisé "Les 5 meilleurs sushis de Marseille" avec mention Sushi Boy en position 1.'
    }
  },
];

export function getInboxItems() {
  return INBOX_ITEMS;
}

export function getInboxItem(id) {
  return INBOX_ITEMS.find(function(item) { return item.id === id; });
}

export function setInboxItems(data) {
  INBOX_ITEMS.length = 0;
  data.forEach(function (item) { INBOX_ITEMS.push(item); });
}

export function removeInboxItem(id) {
  const idx = INBOX_ITEMS.findIndex(i => i.id === id);
  if (idx !== -1) INBOX_ITEMS.splice(idx, 1);
}
