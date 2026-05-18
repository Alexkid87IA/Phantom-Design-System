// ═══════════════════════════════════════════════════════════
//  ADMIN DATA — Revenue & MRR
// ═══════════════════════════════════════════════════════════

export var MRR_HISTORY = [
  { month: 'Déc 2025', mrr: 0, clients: 0, newMrr: 0, churnMrr: 0 },
  { month: 'Jan 2026', mrr: 1490, clients: 1, newMrr: 1490, churnMrr: 0 },
  { month: 'Fév 2026', mrr: 2870, clients: 3, newMrr: 1380, churnMrr: 0 },
  { month: 'Mar 2026', mrr: 5850, clients: 6, newMrr: 3470, churnMrr: 490 },
  { month: 'Avr 2026', mrr: 8220, clients: 9, newMrr: 2860, churnMrr: 490 },
  { month: 'Mai 2026', mrr: 10390, clients: 11, newMrr: 2660, churnMrr: 490 },
];

export var REVENUE_KPIS = {
  mrrCurrent: 10390,
  mrrNew: 2660,
  mrrChurn: 490,
  mrrNet: 2170,
  arrProjected: 124680,
  arpu: 944,
  ltv: 11328,
  cac: 320,
  churnRate: 4.7,
  paybackMonths: 0.34,
};

export var PLAN_BREAKDOWN = [
  { plan: 'Starter', clients: 3, mrr: 1470, percent: 14 },
  { plan: 'Croissance', clients: 4, mrr: 3560, percent: 34 },
  { plan: 'Standard', clients: 4, mrr: 5960, percent: 57 },
];

export var PIPELINE = [
  { id: 'l1', name: 'La Brasserie du Port', sector: 'Restauration', city: 'Marseille', stage: 'demo', value: 1490, source: 'Referral', contact: 'Pierre M.', nextAction: 'Démo lundi 19 mai' },
  { id: 'l2', name: 'Spa Océane', sector: 'Bien-être', city: 'Biarritz', stage: 'proposal', value: 890, source: 'Site web', contact: 'Léa D.', nextAction: 'Relance vendredi' },
  { id: 'l3', name: 'Tartine & Co', sector: 'Boulangerie', city: 'Lyon', stage: 'negotiation', value: 890, source: 'LinkedIn', contact: 'Hugo T.', nextAction: 'Envoi contrat' },
  { id: 'l4', name: 'Gym Factory', sector: 'Sport', city: 'Paris', stage: 'lead', value: 1490, source: 'Google Ads', contact: 'Sarah K.', nextAction: 'Appel découverte' },
  { id: 'l5', name: 'Nail Art Studio', sector: 'Beauté', city: 'Nice', stage: 'lead', value: 490, source: 'Instagram', contact: 'Camille R.', nextAction: 'Qualifier le lead' },
];

export var INVOICES = [
  { id: 'inv1', client: 'Sushi Boy', amount: 1490, status: 'paid', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv2', client: 'Chez Marcel', amount: 890, status: 'paid', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv3', client: 'Bella Donna', amount: 490, status: 'paid', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv4', client: 'Green Garden', amount: 1490, status: 'paid', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv5', client: 'L\'Atelier Zen', amount: 890, status: 'pending', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv6', client: 'Pizza Roma', amount: 490, status: 'trial', date: '2026-05-10', period: 'Trial' },
  { id: 'inv7', client: 'Maison Dupont', amount: 890, status: 'overdue', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv8', client: 'Bike & Run', amount: 1490, status: 'paid', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv9', client: 'Fleur de Sel', amount: 890, status: 'paid', date: '2026-05-01', period: 'Mai 2026' },
  { id: 'inv10', client: 'Studio Lumière', amount: 490, status: 'trial', date: '2026-05-14', period: 'Trial' },
];
