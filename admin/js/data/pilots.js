// ═══════════════════════════════════════════════════════════
//  ADMIN DATA — Pilots (human operators)
// ═══════════════════════════════════════════════════════════

export var PILOTS = [
  { id: 'p1', name: 'Marie Lefèvre', role: 'Senior Pilot', specialties: ['Social Media', 'Google Avis'], clients: 4, agents: 12, workload: 78, quality: 96, avatar: 'ML', color: '#FF2D87', status: 'active' },
  { id: 'p2', name: 'Julie Moreau', role: 'Pilot', specialties: ['SEO', 'Contenu', 'Bien-être'], clients: 4, agents: 8, workload: 65, quality: 92, avatar: 'JM', color: '#6E3CFF', status: 'active' },
  { id: 'p3', name: 'Paul Martin', role: 'Pilot', specialties: ['Brand', 'Web', 'Commerce'], clients: 4, agents: 10, workload: 82, quality: 89, avatar: 'PM', color: '#0066FF', status: 'active' },
];

export function getPilot(id) {
  return PILOTS.find(function(p) { return p.id === id; });
}

export function getPilotByName(name) {
  return PILOTS.find(function(p) { return p.name.includes(name); });
}
