// ═══════════════════════════════════════════════════════════
//  ADMIN DATA — All agents across all clients
// ═══════════════════════════════════════════════════════════

export var ALL_AGENTS = [
  { id: 'a1', client: 'Sushi Boy', clientId: 'c1', name: 'Social Manager', type: 'social', pilot: 'Marie', status: 'active', tasks: 47, success: 94, lastAction: 'Il y a 12min', value: 5400 },
  { id: 'a2', client: 'Sushi Boy', clientId: 'c1', name: 'Avis Google', type: 'google', pilot: 'Marie', status: 'active', tasks: 28, success: 100, lastAction: 'Il y a 1h', value: 2100 },
  { id: 'a3', client: 'Sushi Boy', clientId: 'c1', name: 'Photos Resto', type: 'photos', pilot: 'Paul', status: 'waiting', tasks: 15, success: 87, lastAction: 'Il y a 3h', value: 1800 },
  { id: 'a4', client: 'Sushi Boy', clientId: 'c1', name: 'SEO', type: 'seo', pilot: 'Marie', status: 'active', tasks: 12, success: 92, lastAction: 'Il y a 2h', value: 3200 },
  { id: 'a5', client: 'Sushi Boy', clientId: 'c1', name: 'Site Web', type: 'web', pilot: 'Paul', status: 'idle', tasks: 8, success: 100, lastAction: 'Il y a 1j', value: 960 },
  { id: 'a6', client: 'Sushi Boy', clientId: 'c1', name: 'Brand B2C', type: 'brand', pilot: 'Paul', status: 'active', tasks: 6, success: 83, lastAction: 'Il y a 5h', value: 370 },
  { id: 'a7', client: 'Chez Marcel', clientId: 'c2', name: 'Social Manager', type: 'social', pilot: 'Marie', status: 'active', tasks: 31, success: 91, lastAction: 'Il y a 30min', value: 3200 },
  { id: 'a8', client: 'Chez Marcel', clientId: 'c2', name: 'Avis Google', type: 'google', pilot: 'Marie', status: 'active', tasks: 18, success: 95, lastAction: 'Il y a 2h', value: 1400 },
  { id: 'a9', client: 'Chez Marcel', clientId: 'c2', name: 'Photos Resto', type: 'photos', pilot: 'Paul', status: 'active', tasks: 9, success: 89, lastAction: 'Il y a 4h', value: 1100 },
  { id: 'a10', client: 'Bella Donna', clientId: 'c3', name: 'Social Manager', type: 'social', pilot: 'Julie', status: 'active', tasks: 22, success: 86, lastAction: 'Il y a 1h', value: 2100 },
  { id: 'a11', client: 'Green Garden', clientId: 'c4', name: 'Social Manager', type: 'social', pilot: 'Paul', status: 'active', tasks: 35, success: 93, lastAction: 'Il y a 20min', value: 4100 },
  { id: 'a12', client: 'Green Garden', clientId: 'c4', name: 'SEO', type: 'seo', pilot: 'Paul', status: 'active', tasks: 10, success: 90, lastAction: 'Il y a 3h', value: 2800 },
  { id: 'a13', client: 'Green Garden', clientId: 'c4', name: 'Avis Google', type: 'google', pilot: 'Paul', status: 'active', tasks: 15, success: 100, lastAction: 'Il y a 1h', value: 1200 },
  { id: 'a14', client: 'Green Garden', clientId: 'c4', name: 'Site Web', type: 'web', pilot: 'Paul', status: 'active', tasks: 5, success: 100, lastAction: 'Il y a 6h', value: 600 },
  { id: 'a15', client: 'L\'Atelier Zen', clientId: 'c5', name: 'Social Manager', type: 'social', pilot: 'Julie', status: 'active', tasks: 18, success: 88, lastAction: 'Il y a 2h', value: 1800 },
  { id: 'a16', client: 'L\'Atelier Zen', clientId: 'c5', name: 'Avis Google', type: 'google', pilot: 'Julie', status: 'active', tasks: 10, success: 100, lastAction: 'Il y a 4h', value: 800 },
  { id: 'a17', client: 'Pizza Roma', clientId: 'c6', name: 'Social Manager', type: 'social', pilot: 'Marie', status: 'active', tasks: 4, success: 100, lastAction: 'Il y a 1h', value: 400 },
  { id: 'a18', client: 'Maison Dupont', clientId: 'c7', name: 'Social Manager', type: 'social', pilot: 'Paul', status: 'error', tasks: 25, success: 76, lastAction: 'Il y a 2j', value: 1900 },
  { id: 'a19', client: 'Maison Dupont', clientId: 'c7', name: 'SEO', type: 'seo', pilot: 'Paul', status: 'active', tasks: 8, success: 88, lastAction: 'Il y a 5h', value: 1600 },
  { id: 'a20', client: 'Maison Dupont', clientId: 'c7', name: 'Photos Resto', type: 'photos', pilot: 'Paul', status: 'idle', tasks: 6, success: 83, lastAction: 'Il y a 3j', value: 700 },
  { id: 'a21', client: 'Bike & Run', clientId: 'c8', name: 'Social Manager', type: 'social', pilot: 'Paul', status: 'active', tasks: 28, success: 93, lastAction: 'Il y a 40min', value: 3400 },
  { id: 'a22', client: 'Bike & Run', clientId: 'c8', name: 'SEO', type: 'seo', pilot: 'Paul', status: 'active', tasks: 9, success: 89, lastAction: 'Il y a 2h', value: 2200 },
  { id: 'a23', client: 'Bike & Run', clientId: 'c8', name: 'Site Web', type: 'web', pilot: 'Paul', status: 'active', tasks: 7, success: 100, lastAction: 'Il y a 8h', value: 800 },
  { id: 'a24', client: 'Bike & Run', clientId: 'c8', name: 'Brand B2C', type: 'brand', pilot: 'Paul', status: 'active', tasks: 4, success: 75, lastAction: 'Il y a 1j', value: 500 },
  { id: 'a25', client: 'Fleur de Sel', clientId: 'c10', name: 'Social Manager', type: 'social', pilot: 'Julie', status: 'active', tasks: 14, success: 93, lastAction: 'Il y a 1h', value: 1500 },
  { id: 'a26', client: 'Fleur de Sel', clientId: 'c10', name: 'Avis Google', type: 'google', pilot: 'Julie', status: 'active', tasks: 8, success: 100, lastAction: 'Il y a 3h', value: 650 },
  { id: 'a27', client: 'Studio Lumière', clientId: 'c11', name: 'Social Manager', type: 'social', pilot: 'Julie', status: 'active', tasks: 3, success: 100, lastAction: 'Il y a 2h', value: 300 },
  { id: 'a28', client: 'Garage Auto+', clientId: 'c12', name: 'Social Manager', type: 'social', pilot: 'Paul', status: 'paused', tasks: 15, success: 80, lastAction: 'Il y a 16j', value: 0 },
  { id: 'a29', client: 'Garage Auto+', clientId: 'c12', name: 'Avis Google', type: 'google', pilot: 'Paul', status: 'paused', tasks: 7, success: 86, lastAction: 'Il y a 16j', value: 0 },
];

export var CONTENT_QUEUE = [
  { id: 'cq1', client: 'Sushi Boy', agent: 'Social Manager', type: 'Post Instagram', title: 'Nigiri du jour — Saumon', status: 'pending_client', since: 'Il y a 3h', pilot: 'Marie' },
  { id: 'cq2', client: 'Sushi Boy', agent: 'Avis Google', type: 'Réponse avis', title: 'Réponse à Thomas R. (2★)', status: 'pending_client', since: 'Il y a 5h', pilot: 'Marie' },
  { id: 'cq3', client: 'Chez Marcel', agent: 'Social Manager', type: 'Reel', title: 'Behind the scenes — Sauce secrète', status: 'pending_pilot', since: 'Il y a 1h', pilot: 'Marie' },
  { id: 'cq4', client: 'Green Garden', agent: 'SEO', type: 'Article', title: 'Les 5 bienfaits de la cuisine végétale', status: 'pending_client', since: 'Il y a 8h', pilot: 'Paul' },
  { id: 'cq5', client: 'Bella Donna', agent: 'Social Manager', type: 'Carousel', title: 'Avant/Après — Balayage californien', status: 'pending_pilot', since: 'Il y a 30min', pilot: 'Julie' },
  { id: 'cq6', client: 'Sushi Boy', agent: 'Photos Resto', type: 'Photos', title: '5 photos plats pour Uber Eats', status: 'pending_client', since: 'Il y a 2h', pilot: 'Paul' },
  { id: 'cq7', client: 'Fleur de Sel', agent: 'Social Manager', type: 'Story', title: 'Menu du week-end — Cassoulet', status: 'approved', since: 'Il y a 4h', pilot: 'Julie' },
  { id: 'cq8', client: 'Bike & Run', agent: 'Brand B2C', type: 'Design', title: 'Nouvelle carte de visite', status: 'pending_pilot', since: 'Il y a 6h', pilot: 'Paul' },
  { id: 'cq9', client: 'L\'Atelier Zen', agent: 'Social Manager', type: 'Post Instagram', title: 'Citation bien-être du lundi', status: 'pending_client', since: 'Il y a 7h', pilot: 'Julie' },
  { id: 'cq10', client: 'Pizza Roma', agent: 'Social Manager', type: 'Post Instagram', title: 'La Margherita du chef Marco', status: 'pending_pilot', since: 'Il y a 2h', pilot: 'Marie' },
];

export var ALERTS = [
  { id: 'al1', type: 'churn_risk', client: 'Maison Dupont', message: 'Pas de connexion depuis 4 jours, agent Social en erreur', severity: 'high' },
  { id: 'al2', type: 'overdue', client: 'L\'Atelier Zen', message: 'Facture mai en retard de paiement', severity: 'medium' },
  { id: 'al3', type: 'agent_error', client: 'Maison Dupont', agent: 'Social Manager', message: 'Erreur API Instagram — token expiré', severity: 'high' },
  { id: 'al4', type: 'inactif', client: 'Garage Auto+', message: 'Client en pause depuis 16 jours, aucune activité', severity: 'medium' },
  { id: 'al5', type: 'validation', client: 'Sushi Boy', message: '3 livrables en attente de validation client depuis +24h', severity: 'low' },
];

export function totalAgents() { return ALL_AGENTS.length; }
export function activeAgents() { return ALL_AGENTS.filter(function(a) { return a.status === 'active'; }).length; }
export function errorAgents() { return ALL_AGENTS.filter(function(a) { return a.status === 'error'; }).length; }
export function pendingContent() { return CONTENT_QUEUE.filter(function(c) { return c.status.startsWith('pending'); }).length; }
