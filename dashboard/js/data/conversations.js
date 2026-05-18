// ═══════════════════════════════════════════════════════════
//  CONVERSATIONS — Agent chat histories
// ═══════════════════════════════════════════════════════════

const CONVERSATIONS = {
  social: [
    { from: 'agent', text: 'Salut Yannick. J\'ai préparé 12 posts pour la semaine du 18 mai. 4 nigiris du jour, 3 stories behind-the-scenes, 2 collabs avec @marseillefood, et 3 carousels recette.' },
    { from: 'user', text: 'Top. Tu peux pousser plus sur les vidéos shorts ? On performe bien dessus.' },
    { from: 'agent', text: 'Compris. Je remplace 3 carousels par 3 vidéos shorts. Je prends sur les tournages de mardi pour la matière. Tu valides ?' },
  ],
  google: [
    { from: 'agent', text: 'Bonjour Yannick. 3 nouveaux avis cette semaine : 2 positifs (5★) et 1 négatif (2★). J\'ai préparé les réponses pour les 3.' },
    { from: 'user', text: 'Montre-moi la réponse au négatif.' },
    { from: 'agent', text: '"Bonjour Thomas, merci pour votre retour. Nous sommes désolés que votre expérience n\'ait pas été à la hauteur. Notre chef Kenji serait ravi de vous accueillir de nouveau pour vous montrer notre vrai savoir-faire. Contactez-nous au 04 91 XX XX XX pour une réservation prioritaire."' },
  ],
  photos: [
    { from: 'agent', text: '5 nouvelles photos prêtes pour la mise à jour Uber Eats. J\'ai travaillé sur un style plus épuré, fond sombre avec éclairage rasant. Tu veux voir le set ?' },
  ],
  seo: [
    { from: 'agent', text: 'L\'article "Pourquoi le sushi marseillais cartonne" est en ligne. 1 200 mots, 3 images, optimisé sur "sushi marseille" et "restaurant japonais marseille". Position initiale estimée : top 15.' },
    { from: 'user', text: 'Parfait. C\'est quoi le prochain sujet ?' },
    { from: 'agent', text: 'Je propose "Les 5 erreurs quand on commande des sushis en livraison". Fort potentiel viral + mot-clé long-tail "commande sushi livraison". Je lance la rédaction ?' },
  ],
  web: [
    { from: 'agent', text: 'Le site est stable. Dernière mise à jour : menu été intégré le 5 mai. Temps de chargement moyen : 1.8s. Rien à signaler.' },
  ],
  brand: [
    { from: 'agent', text: 'J\'ai travaillé sur 2 pistes pour la carte été : une version épurée japonisante et une version colorée marseillaise. Tu préfères quoi ?' },
    { from: 'user', text: 'Le mix des deux : la structure japo avec les couleurs Marseille.' },
    { from: 'agent', text: 'J\'adore. Je fusionne les deux pistes. Version finale demain matin.' },
  ],
};

export function getConversations() {
  return CONVERSATIONS;
}

export function setConversations(data) {
  Object.keys(CONVERSATIONS).forEach(function (k) { delete CONVERSATIONS[k]; });
  Object.assign(CONVERSATIONS, data);
}

export function getConversation(agentId) {
  if (!CONVERSATIONS[agentId]) {
    CONVERSATIONS[agentId] = [];
  }
  return CONVERSATIONS[agentId];
}

export function addMessage(agentId, msg) {
  if (!CONVERSATIONS[agentId]) {
    CONVERSATIONS[agentId] = [];
  }
  CONVERSATIONS[agentId].push(msg);
}

export function initConversation(agentId, messages) {
  CONVERSATIONS[agentId] = messages;
}
