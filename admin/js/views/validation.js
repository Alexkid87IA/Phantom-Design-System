// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Validation Cross-Client
//  Flow: Agent → Pilot Review → Client Review → Publication
// ═══════════════════════════════════════════════════════════

import { CONTENT_QUEUE } from '../data/admin-agents.js';

var VALIDATION_PIPELINE = [
  { id: 'vp1', client: 'Sushi Boy', agent: 'Social Manager', title: 'Nigiri du jour — Saumon', type: 'Post Instagram', stage: 'client_review', pilot: 'Marie', pilotApproved: true, created: 'Il y a 3h', urgency: 'normal' },
  { id: 'vp2', client: 'Sushi Boy', agent: 'Avis Google', title: 'Réponse à Thomas R. (2★)', type: 'Réponse avis', stage: 'client_review', pilot: 'Marie', pilotApproved: true, created: 'Il y a 5h', urgency: 'high' },
  { id: 'vp3', client: 'Chez Marcel', agent: 'Social Manager', title: 'Behind the scenes — Sauce secrète', type: 'Reel', stage: 'pilot_review', pilot: 'Marie', pilotApproved: false, created: 'Il y a 1h', urgency: 'normal' },
  { id: 'vp4', client: 'Green Garden', agent: 'SEO', title: 'Les 5 bienfaits de la cuisine végétale', type: 'Article', stage: 'client_review', pilot: 'Paul', pilotApproved: true, created: 'Il y a 8h', urgency: 'low' },
  { id: 'vp5', client: 'Bella Donna', agent: 'Social Manager', title: 'Avant/Après — Balayage californien', type: 'Carousel', stage: 'pilot_review', pilot: 'Julie', pilotApproved: false, created: 'Il y a 30min', urgency: 'normal' },
  { id: 'vp6', client: 'Sushi Boy', agent: 'Photos Resto', title: '5 photos plats pour Uber Eats', type: 'Photos', stage: 'client_review', pilot: 'Paul', pilotApproved: true, created: 'Il y a 2h', urgency: 'normal' },
  { id: 'vp7', client: 'Bike & Run', agent: 'Brand B2C', title: 'Nouvelle carte de visite', type: 'Design', stage: 'pilot_review', pilot: 'Paul', pilotApproved: false, created: 'Il y a 6h', urgency: 'low' },
  { id: 'vp8', client: 'L\'Atelier Zen', agent: 'Social Manager', title: 'Citation bien-être du lundi', type: 'Post Instagram', stage: 'client_review', pilot: 'Julie', pilotApproved: true, created: 'Il y a 7h', urgency: 'low' },
  { id: 'vp9', client: 'Pizza Roma', agent: 'Social Manager', title: 'La Margherita du chef Marco', type: 'Post Instagram', stage: 'pilot_review', pilot: 'Marie', pilotApproved: false, created: 'Il y a 2h', urgency: 'normal' },
  { id: 'vp10', client: 'Fleur de Sel', agent: 'Social Manager', title: 'Menu du week-end — Cassoulet', type: 'Story', stage: 'ready', pilot: 'Julie', pilotApproved: true, created: 'Il y a 4h', urgency: 'normal' },
];

export function renderValidation() {
  var pilotReview = VALIDATION_PIPELINE.filter(function(v) { return v.stage === 'pilot_review'; });
  var clientReview = VALIDATION_PIPELINE.filter(function(v) { return v.stage === 'client_review'; });
  var ready = VALIDATION_PIPELINE.filter(function(v) { return v.stage === 'ready'; });

  function urgencyBadge(u) {
    if (u === 'high') return '<span class="admin-badge admin-badge-red">Urgent</span>';
    if (u === 'normal') return '';
    return '<span class="admin-badge admin-badge-muted">Bas</span>';
  }

  function renderColumn(title, count, color, items, actions) {
    var cards = items.map(function(v) {
      return '<div class="admin-card" style="margin-bottom:8px;padding:14px">'
        + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">'
          + '<div>'
            + '<div style="font-size:13px;font-weight:600">' + v.title + '</div>'
            + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:2px">' + v.client + ' · ' + v.agent + '</div>'
          + '</div>'
          + urgencyBadge(v.urgency)
        + '</div>'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
          + '<span class="admin-badge admin-badge-muted">' + v.type + '</span>'
          + '<span style="font-size:10px;color:var(--admin-text-muted)">Pilot: ' + v.pilot + '</span>'
          + '<span style="font-size:10px;color:var(--admin-text-muted)">' + v.created + '</span>'
        + '</div>'
        + '<div style="display:flex;gap:6px">'
          + (actions === 'pilot' ? ''
            + '<div class="admin-btn admin-btn-primary" data-action="approve" style="font-size:10px;padding:4px 10px">Approuver</div>'
            + '<div class="admin-btn admin-btn-ghost" data-action="reject" style="font-size:10px;padding:4px 10px">Retour agent</div>'
          : actions === 'client' ? ''
            + '<div class="admin-btn admin-btn-ghost" data-action="remind" style="font-size:10px;padding:4px 10px">Envoyer relance</div>'
          : ''
            + '<div class="admin-btn admin-btn-primary" data-action="approve" style="font-size:10px;padding:4px 10px">Publier</div>'
          )
        + '</div>'
      + '</div>';
    }).join('');

    return '<div>'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:10px;border-bottom:2px solid ' + color + '">'
        + '<div style="width:8px;height:8px;border-radius:50%;background:' + color + '"></div>'
        + '<div style="font-size:13px;font-weight:600">' + title + '</div>'
        + '<span class="admin-badge admin-badge-muted" style="margin-left:auto">' + count + '</span>'
      + '</div>'
      + cards
    + '</div>';
  }

  var avgTime = '4.2h';
  var firstPassRate = '72%';

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">En attente pilot</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + pilotReview.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">En attente client</div><div class="admin-kpi-value">' + clientReview.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Prêts à publier</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + ready.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Temps moy. validation</div><div class="admin-kpi-value">' + avgTime + '</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Pipeline de validation</div>'
        + '<div style="display:flex;gap:8px">'
          + '<div class="admin-btn admin-btn-ghost" style="font-size:11px;padding:5px 12px">Taux 1er jet : ' + firstPassRate + '</div>'
          + '<div class="admin-btn admin-btn-primary" data-action="approve" style="font-size:11px;padding:5px 12px">Tout approuver (prêts)</div>'
        + '</div>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">'
        + renderColumn('Review Pilot', pilotReview.length, 'var(--admin-orange)', pilotReview, 'pilot')
        + renderColumn('Review Client', clientReview.length, 'var(--admin-violet)', clientReview, 'client')
        + renderColumn('Prêt à publier', ready.length, 'var(--admin-green)', ready, 'publish')
      + '</div>'
    + '</div>';
}
