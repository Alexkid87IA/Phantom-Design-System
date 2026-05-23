// ═══════════════════════════════════════════════════════════
//  AGENTS — Agent list, missions, responses, chips
// ═══════════════════════════════════════════════════════════

import { getConversations } from './conversations.js';

export let AGENTS = [
  { id: 'social', name: 'Social Manager', color: '#FF2D87', status: 'active', tasks: 12, pilot: 'Marie' },
  { id: 'google', name: 'Avis Google', color: '#FFD400', status: 'active', tasks: 3, pilot: 'Julie' },
  { id: 'photos', name: 'Photos Resto', color: '#FF8A1F', status: 'waiting', tasks: 0, pilot: 'Paul' },
  { id: 'seo', name: 'SEO', color: '#00D26A', status: 'active', tasks: 5, pilot: 'Marie' },
  { id: 'web', name: 'Site Web', color: '#0066FF', status: 'idle', tasks: 0, pilot: 'Julie' },
  { id: 'brand', name: 'Brand B2C', color: '#6E3CFF', status: 'active', tasks: 2, pilot: 'Paul' },
];

export let AGENT_MISSIONS = {
  social: { brief: 'Gérer la présence Instagram et TikTok de Sushi Boy. Publier du contenu food authentique et engageant. Objectif : devenir le restaurant japonais le plus suivi de Marseille.', since: '12 mars', completed: 47, successRate: 94 },
  google: { brief: 'Surveiller et répondre à tous les avis Google de Sushi Boy. Maintenir une note au-dessus de 4.5★. Répondre dans les 24h avec un ton chaleureux et professionnel.', since: '15 mars', completed: 28, successRate: 100 },
  photos: { brief: 'Produire des visuels food de qualité professionnelle pour les plateformes de livraison et les réseaux sociaux. Style : fond sombre, éclairage rasant, plating soigné.', since: '20 mars', completed: 15, successRate: 87 },
  seo: { brief: 'Rédiger et publier des articles optimisés SEO autour de la cuisine japonaise à Marseille. Objectif : top 10 Google sur "sushi marseille" et mots-clés associés.', since: '1 avril', completed: 12, successRate: 92 },
  web: { brief: 'Maintenir le site web de Sushi Boy à jour : menu, horaires, réservation en ligne. Garantir un temps de chargement sous 2s et une expérience mobile optimale.', since: '10 mars', completed: 8, successRate: 100 },
  brand: { brief: 'Développer l\'identité visuelle B2C de Sushi Boy. Créer les supports marketing : carte, affiches, packaging, goodies. Fusion style japonais minimal + couleurs Marseille.', since: '5 avril', completed: 6, successRate: 83 },
};

export let AGENT_RESPONSES = {
  social: [
    'Je regarde les analytics. L\'engagement est en hausse de 12% sur les Reels cette semaine. Tu veux que je pousse plus ce format ?',
    'J\'ai identifié 3 tendances food sur Instagram : plating minimaliste, behind-the-scenes, et challenges client. On intègre ça ?',
    'Compris. Je lance la production. Tu auras les maquettes demain matin avant 9h.',
    'Bonne idée. Je prépare ça et je te montre un premier jet dans l\'heure.',
    'Les collabs avec @marseillefood ont généré +340 followers cette semaine. On continue sur ce format ?',
  ],
  google: [
    'Nouvel avis 5★ reçu de Marc T. : "Meilleur sushi de Marseille". J\'ai préparé une réponse personnalisée.',
    'La note moyenne est passée à 4.7 ce mois-ci. On est sur une belle dynamique.',
    'J\'ai détecté un pattern : les avis négatifs mentionnent surtout le temps d\'attente le samedi soir. À creuser ?',
    'Compris. Je mets à jour la réponse et je te la renvoie pour validation.',
  ],
  photos: [
    'Je prends note. Je refais le set avec ce nouveau brief. Prêt dans 24h.',
    'J\'ai 3 nouvelles photos en post-production. Éclairage rasant, fond ardoise. Tu vas aimer.',
    'OK, je planifie une session photo la semaine prochaine. Tu préfères mardi ou mercredi ?',
  ],
  seo: [
    'Je lance la rédaction. Article prêt dans 48h avec optimisation complète.',
    'J\'ai identifié un nouveau mot-clé intéressant : "sushi frais marseille" — volume 1.8k/mois, compétition faible.',
    'L\'article précédent est passé en position 8 après 3 jours. Belle progression.',
    'Compris. Je pivote le sujet. Nouvelle version demain.',
  ],
  web: [
    'Mise à jour faite. Le site est à jour avec les derniers changements.',
    'Je vérifie. Temps de chargement actuel : 1.6s. Tout est au vert.',
    'Je prépare la page. Tu auras un lien de prévisualisation dans l\'heure.',
  ],
  brand: [
    'Super direction. Je travaille dessus et je te montre une V1 demain matin.',
    'J\'ai 2 pistes créatives. Tu préfères que je te les présente maintenant ou demain avec les détails ?',
    'Compris. Je fais la fusion et je peaufine les détails. Résultat final dans 24h.',
  ],
};

export let AGENT_CHIPS = {
  social: ['Valide tout', 'Pousse les videos shorts', 'Plus de collabs', 'Pause cette semaine'],
  google: ['Valide la réponse', 'Modifie le ton', 'Voir tous les avis', 'Stats du mois'],
  photos: ['Valide les photos', 'Refais le set', 'Planifie un shooting', 'Style plus sombre'],
  seo: ['Lance l\'article', 'Autre sujet', 'Rapport positions', 'Mots-clés prioritaires'],
  web: ['Mets à jour le menu', 'Rapport vitesse', 'Ajoute une page', 'Vérifie le SSL'],
  brand: ['Version japonisante', 'Version colorée', 'Fusion des deux', 'Voir les déclinaisons'],
};

export function setAgents(data) {
  if (data.agents) { AGENTS.length = 0; data.agents.forEach(function (a) { AGENTS.push(a); }); }
  if (data.missions) { Object.keys(AGENT_MISSIONS).forEach(function (k) { delete AGENT_MISSIONS[k]; }); Object.assign(AGENT_MISSIONS, data.missions); }
  if (data.responses) { Object.keys(AGENT_RESPONSES).forEach(function (k) { delete AGENT_RESPONSES[k]; }); Object.assign(AGENT_RESPONSES, data.responses); }
  if (data.chips) { Object.keys(AGENT_CHIPS).forEach(function (k) { delete AGENT_CHIPS[k]; }); Object.assign(AGENT_CHIPS, data.chips); }
}

export function getAgent(id) {
  return AGENTS.find(a => a.id === id);
}

export function addAgent(agent) {
  AGENTS.push(agent);
}

export function removeAgent(id) {
  var idx = AGENTS.findIndex(function(a) { return a.id === id; });
  if (idx !== -1) AGENTS.splice(idx, 1);
  delete AGENT_MISSIONS[id];
  delete AGENT_RESPONSES[id];
  delete AGENT_CHIPS[id];
  var convos = getConversations();
  delete convos[id];
}
