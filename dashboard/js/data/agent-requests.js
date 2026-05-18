// ═══════════════════════════════════════════════════════════
//  AGENT REQUESTS — Proactive asks from agents to user
// ═══════════════════════════════════════════════════════════

var AGENT_REQUESTS = [
  {
    id: 'r1',
    agent: 'photos',
    title: 'Envoie-moi la photo du plat du jour',
    desc: 'Je la retouche et je la publie sur Instagram et Uber Eats dans l\'heure.',
    action: 'upload',
    actionLabel: 'Envoyer une photo',
    time: 'Il y a 30min',
    priority: 'high',
  },
  {
    id: 'r2',
    agent: 'social',
    title: '3 posts sont prêts pour demain',
    desc: 'Nigiri du jour, story BTS, et reel ASMR. Valide avant 17h pour la programmation.',
    action: 'validate',
    actionLabel: 'Voir et valider',
    time: 'Il y a 1h',
    priority: 'high',
  },
  {
    id: 'r3',
    agent: 'google',
    title: 'Réponse à un avis 2★ prête',
    desc: 'Thomas R. a laissé un avis négatif. J\'ai préparé une réponse empathique. Tu valides ?',
    action: 'validate',
    actionLabel: 'Lire et valider',
    time: 'Il y a 2h',
    priority: 'high',
  },
  {
    id: 'r4',
    agent: 'seo',
    title: 'Tu as des promos ce week-end ?',
    desc: 'Je peux intégrer tes offres dans l\'article "Menu week-end à Marseille" pour booster le référencement.',
    action: 'reply',
    actionLabel: 'Répondre',
    time: 'Il y a 3h',
    priority: 'medium',
  },
  {
    id: 'r5',
    agent: 'brand',
    title: 'Choisis le slogan pour les sacs',
    desc: '"Sushi Boy — L\'art du sushi à Marseille" ou "Depuis 2019, le goût du Japon"',
    action: 'choice',
    actionLabel: 'Choisir',
    choices: ['L\'art du sushi à Marseille', 'Depuis 2019, le goût du Japon'],
    time: 'Il y a 4h',
    priority: 'medium',
  },
];

export function getAgentRequests() {
  return AGENT_REQUESTS;
}

export function removeAgentRequest(id) {
  var idx = AGENT_REQUESTS.findIndex(function(r) { return r.id === id; });
  if (idx !== -1) AGENT_REQUESTS.splice(idx, 1);
}
