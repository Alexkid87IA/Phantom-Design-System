// ═══════════════════════════════════════════════════════════
//  ADMIN DATA — Clients
// ═══════════════════════════════════════════════════════════

export var CLIENTS = [
  { id: 'c1', name: 'Sushi Boy', sector: 'Restauration', city: 'Marseille', plan: 'Standard', mrr: 1490, status: 'active', agents: 6, lastLogin: '2026-05-17', health: 'green', since: '2026-03-12', owner: 'Yannick L.', email: 'yannick@sushiboy.fr', pilot: 'Marie' },
  { id: 'c2', name: 'Chez Marcel', sector: 'Restauration', city: 'Lyon', plan: 'Croissance', mrr: 890, status: 'active', agents: 3, lastLogin: '2026-05-16', health: 'green', since: '2026-04-01', owner: 'Marcel D.', email: 'marcel@chezmarcel.fr', pilot: 'Marie' },
  { id: 'c3', name: 'Bella Donna', sector: 'Coiffure', city: 'Paris', plan: 'Starter', mrr: 490, status: 'active', agents: 1, lastLogin: '2026-05-15', health: 'orange', since: '2026-04-15', owner: 'Isabelle M.', email: 'isabelle@belladonna.fr', pilot: 'Julie' },
  { id: 'c4', name: 'Green Garden', sector: 'Restauration', city: 'Bordeaux', plan: 'Standard', mrr: 1490, status: 'active', agents: 4, lastLogin: '2026-05-17', health: 'green', since: '2026-03-20', owner: 'Thomas V.', email: 'thomas@greengarden.fr', pilot: 'Paul' },
  { id: 'c5', name: 'L\'Atelier Zen', sector: 'Bien-être', city: 'Marseille', plan: 'Croissance', mrr: 890, status: 'active', agents: 2, lastLogin: '2026-05-14', health: 'orange', since: '2026-04-08', owner: 'Sophie R.', email: 'sophie@atelierzen.fr', pilot: 'Julie' },
  { id: 'c6', name: 'Pizza Roma', sector: 'Restauration', city: 'Nice', plan: 'Starter', mrr: 490, status: 'trial', agents: 1, lastLogin: '2026-05-17', health: 'green', since: '2026-05-10', owner: 'Marco P.', email: 'marco@pizzaroma.fr', pilot: 'Marie' },
  { id: 'c7', name: 'Maison Dupont', sector: 'Boulangerie', city: 'Paris', plan: 'Croissance', mrr: 890, status: 'active', agents: 3, lastLogin: '2026-05-13', health: 'red', since: '2026-02-28', owner: 'Claire D.', email: 'claire@maisondupont.fr', pilot: 'Paul' },
  { id: 'c8', name: 'Bike & Run', sector: 'Commerce', city: 'Lyon', plan: 'Standard', mrr: 1490, status: 'active', agents: 4, lastLogin: '2026-05-16', health: 'green', since: '2026-03-05', owner: 'Julien B.', email: 'julien@bikerun.fr', pilot: 'Paul' },
  { id: 'c9', name: 'Le Comptoir', sector: 'Restauration', city: 'Marseille', plan: 'Starter', mrr: 490, status: 'churned', agents: 0, lastLogin: '2026-04-20', health: 'red', since: '2026-02-15', owner: 'Antoine G.', email: 'antoine@lecomptoir.fr', pilot: 'Marie' },
  { id: 'c10', name: 'Fleur de Sel', sector: 'Restauration', city: 'Toulouse', plan: 'Croissance', mrr: 890, status: 'active', agents: 2, lastLogin: '2026-05-16', health: 'green', since: '2026-04-22', owner: 'Nathalie F.', email: 'nathalie@fleurdesel.fr', pilot: 'Julie' },
  { id: 'c11', name: 'Studio Lumière', sector: 'Photographie', city: 'Paris', plan: 'Starter', mrr: 490, status: 'trial', agents: 1, lastLogin: '2026-05-17', health: 'green', since: '2026-05-14', owner: 'Émilie C.', email: 'emilie@studiolumiere.fr', pilot: 'Julie' },
  { id: 'c12', name: 'Garage Auto+', sector: 'Automobile', city: 'Lille', plan: 'Croissance', mrr: 890, status: 'paused', agents: 2, lastLogin: '2026-05-01', health: 'orange', since: '2026-03-18', owner: 'Patrick L.', email: 'patrick@garageauto.fr', pilot: 'Paul' },
];

export function getClient(id) {
  return CLIENTS.find(function(c) { return c.id === id; });
}

export function getClientsByStatus(status) {
  return CLIENTS.filter(function(c) { return c.status === status; });
}

export function getClientsByPilot(pilot) {
  return CLIENTS.filter(function(c) { return c.pilot === pilot; });
}

export function totalMRR() {
  return CLIENTS.filter(function(c) { return c.status === 'active' || c.status === 'trial'; })
    .reduce(function(sum, c) { return sum + c.mrr; }, 0);
}

export function activeClientCount() {
  return CLIENTS.filter(function(c) { return c.status === 'active'; }).length;
}
