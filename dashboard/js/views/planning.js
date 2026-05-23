// ═══════════════════════════════════════════════════════════
//  VIEW — Planning (upcoming content calendar for client)
// ═══════════════════════════════════════════════════════════

import { getAgent } from '../data/agents.js';
import { ghostSvg } from '../lib/icons.js';

export var PLANNING_ITEMS = [
  { id: 'p1', agent: 'social', type: 'Post', title: 'Nigiri du jour — Thon rouge', day: 'Lun 19', time: '12:00', status: 'ready' },
  { id: 'p2', agent: 'social', type: 'Story', title: 'Coulisses — Livraison du matin', day: 'Lun 19', time: '09:00', status: 'ready' },
  { id: 'p3', agent: 'seo', type: 'Article', title: 'Comment choisir son sushi à emporter', day: 'Mar 20', time: '10:00', status: 'in_progress', hours: 6 },
  { id: 'p4', agent: 'social', type: 'Reel', title: 'Découpe sashimi — ASMR', day: 'Mar 20', time: '18:00', status: 'draft' },
  { id: 'p5', agent: 'google', type: 'Réponse', title: 'Réponse avis — Paul M. (4★)', day: 'Mar 20', time: '14:00', status: 'ready' },
  { id: 'p6', agent: 'social', type: 'Carousel', title: 'Top 5 plats populaires du mois', day: 'Mer 21', time: '12:00', status: 'in_progress', hours: 2 },
  { id: 'p7', agent: 'photos', type: 'Photo', title: 'Shooting menu été — Tartare', day: 'Mer 21', time: '15:00', status: 'scheduled' },
  { id: 'p8', agent: 'social', type: 'Story', title: 'Sondage — Ton maki préféré ?', day: 'Jeu 22', time: '11:00', status: 'draft' },
  { id: 'p9', agent: 'brand', type: 'Design', title: 'Affiche promo terrasse été', day: 'Jeu 22', time: '16:00', status: 'in_progress', hours: 8 },
  { id: 'p10', agent: 'social', type: 'Post', title: 'Vendredi soir = sushi night', day: 'Ven 23', time: '18:00', status: 'draft' },
  { id: 'p11', agent: 'seo', type: 'Article', title: 'Sushi et santé : les oméga-3', day: 'Ven 23', time: '10:00', status: 'scheduled' },
  { id: 'p12', agent: 'social', type: 'Story', title: 'Weekend recap — Best moments', day: 'Sam 24', time: '20:00', status: 'scheduled' },
  { id: 'p13', agent: 'web', type: 'Page', title: 'Mise à jour carte interactive', day: 'Mer 21', time: '10:00', status: 'in_progress', hours: 5 },
];

export function updatePlanningStatus(id, newStatus) {
  var item = PLANNING_ITEMS.find(function(p) { return p.id === id; });
  if (item) item.status = newStatus;
}

function statusLabel(s) {
  if (s === 'ready') return '<span class="planning-badge planning-badge-ready">Prêt</span>';
  if (s === 'in_progress') return '<span class="planning-badge planning-badge-progress">En cours</span>';
  if (s === 'draft') return '<span class="planning-badge planning-badge-draft">Brouillon</span>';
  return '<span class="planning-badge planning-badge-scheduled">Planifié</span>';
}

function cardActions(item) {
  if (item.status === 'draft') {
    return '<div class="planning-card-actions">'
      + '<button class="planning-action-btn planning-action-approve" data-planning-action="approve" data-planning-id="' + item.id + '">Approuver & publier</button>'
      + '<button class="planning-action-btn" data-planning-action="preview" data-planning-id="' + item.id + '" data-agent="' + item.agent + '">Voir</button>'
    + '</div>';
  }
  if (item.status === 'in_progress') {
    var sla = (item.hours && item.hours >= 4)
      ? '<span class="planning-sla-badge">' + item.hours + 'h en cours</span>'
      : '';
    return '<div class="planning-card-live">'
      + '<span class="planning-live-dot"></span>'
      + '<span class="planning-live-text">En train de créer...</span>'
      + sla
    + '</div>'
    + '<div class="planning-card-actions">'
      + '<button class="planning-action-btn planning-action-approve" data-planning-action="mark-ready" data-planning-id="' + item.id + '">Marquer prêt</button>'
    + '</div>';
  }
  if (item.status === 'ready') {
    return '<div class="planning-card-actions">'
      + '<button class="planning-action-btn planning-action-publish" data-planning-action="publish" data-planning-id="' + item.id + '">Publier ✓</button>'
    + '</div>';
  }
  return '';
}

export function renderPlanning() {
  var days = [];
  var currentDay = '';

  PLANNING_ITEMS.forEach(function(item) {
    if (item.day !== currentDay) {
      currentDay = item.day;
      days.push({ day: item.day, items: [] });
    }
    days[days.length - 1].items.push(item);
  });

  var readyCount = PLANNING_ITEMS.filter(function(p) { return p.status === 'ready'; }).length;
  var inProgressCount = PLANNING_ITEMS.filter(function(p) { return p.status === 'in_progress'; }).length;
  var publishedCount = PLANNING_ITEMS.filter(function(p) { return p.status === 'scheduled'; }).length;
  var totalWeek = PLANNING_ITEMS.length;

  var dayColumns = days.map(function(d) {
    var itemCards = d.items.map(function(item) {
      var a = getAgent(item.agent);
      var color = a ? a.color : 'var(--ink-30)';
      var forecast = '';
      if (item.type === 'Reel') forecast = 'Reach estimé : 8-12k';
      else if (item.type === 'Post') forecast = 'Reach estimé : 2-4k';
      else if (item.type === 'Carousel') forecast = 'Reach estimé : 5-8k';
      else if (item.type === 'Story') forecast = 'Vues estimées : 1-2k';
      else if (item.type === 'Article') forecast = 'Objectif : Top 10 SEO';
      else if (item.type === 'Réponse') forecast = 'Impact : fidélisation client';
      else if (item.type === 'Photo') forecast = 'Utilisable sur 3+ plateformes';
      else if (item.type === 'Design') forecast = 'Déclinable print + digital';
      else if (item.type === 'Page') forecast = 'Trafic web +15% estimé';
      var forecastHtml = forecast ? '<div class="planning-card-forecast">' + forecast + '</div>' : '';

      return '<div class="planning-card" style="border-left-color:' + color + '">'
        + '<div class="planning-card-top">'
          + '<span class="planning-card-time">' + item.time + '</span>'
          + statusLabel(item.status)
        + '</div>'
        + '<div class="planning-card-title">' + item.title + '</div>'
        + forecastHtml
        + '<div class="planning-card-meta">'
          + ghostSvg(color, 12)
          + '<span class="planning-card-agent">' + (a ? a.name : '') + '</span>'
          + '<span class="planning-card-type">' + item.type + '</span>'
        + '</div>'
        + cardActions(item)
      + '</div>';
    }).join('');

    return '<div class="planning-day-col">'
      + '<div class="planning-day-label">' + d.day + '</div>'
      + itemCards
    + '</div>';
  }).join('');

  return ''
    + '<div class="work-view">'
      + '<div class="work-header">'
        + '<div class="work-title">Planning</div>'
        + '<p class="view-subtitle">Semaine 21 · 19–25 Mai 2026</p>'
      + '</div>'

      + '<div class="planning-stats">'
        + '<div class="planning-stat-card">'
          + '<div class="planning-stat-label">Total semaine</div>'
          + '<div class="planning-stat-value">' + totalWeek + '</div>'
        + '</div>'
        + '<div class="planning-stat-card">'
          + '<div class="planning-stat-label">Prêts à publier</div>'
          + '<div class="planning-stat-value planning-stat-green">' + readyCount + '</div>'
        + '</div>'
        + '<div class="planning-stat-card">'
          + '<div class="planning-stat-label">En production</div>'
          + '<div class="planning-stat-value planning-stat-violet">' + inProgressCount + '</div>'
        + '</div>'
        + '<div class="planning-stat-card">'
          + '<div class="planning-stat-label">Planifiés</div>'
          + '<div class="planning-stat-value">' + publishedCount + '</div>'
        + '</div>'
      + '</div>'

      + '<div class="planning-calendar">'
        + dayColumns
      + '</div>'
    + '</div>';
}
