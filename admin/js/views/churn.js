// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Churn & Retention
// ═══════════════════════════════════════════════════════════

import { CLIENTS } from '../data/clients.js';
import { ALL_AGENTS, ALERTS } from '../data/admin-agents.js';

function miniSparkline(data, color) {
  var w = 80, h = 24;
  var max = Math.max.apply(null, data);
  var min = Math.min.apply(null, data);
  var range = max - min || 1;
  var pts = data.map(function(v, i) {
    var x = data.length > 1 ? (i / (data.length - 1)) * w : w / 2;
    var y = h - ((v - min) / range) * (h * 0.7) - h * 0.15;
    return x + ',' + y;
  }).join(' ');
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" style="display:block;opacity:0.6">'
    + '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
  + '</svg>';
}

var CHURN_SIGNALS = [
  { clientId: 'c7', client: 'Maison Dupont', signals: ['Pas de connexion depuis 4j', 'Agent Social en erreur', 'Facture mai impayée'], risk: 95, action: 'Appel urgent', topReason: 'Facture impayée', trend: [8, 7, 5, 4, 3, 2, 1, 1, 0, 0] },
  { clientId: 'c12', client: 'Garage Auto+', signals: ['En pause depuis 16j', 'Aucune activité agents', 'Pas de réponse aux relances'], risk: 80, action: 'Email win-back', topReason: 'Inactivité totale', trend: [6, 5, 4, 3, 2, 1, 0, 0, 0, 0] },
  { clientId: 'c5', client: "L'Atelier Zen", signals: ['Connexions en baisse (-60%)', 'Facture mai en retard', 'Taux validation bas (40%)'], risk: 55, action: 'Point téléphonique', topReason: 'Engagement en chute', trend: [10, 9, 8, 7, 5, 4, 4, 3, 3, 2] },
  { clientId: 'c3', client: 'Bella Donna', signals: ['1 seul agent (Starter)', 'Pas d\'upsell après 30j', 'Engagement faible'], risk: 35, action: 'Proposer upgrade', topReason: 'Plan sous-dimensionné', trend: [4, 5, 4, 5, 4, 3, 4, 3, 3, 3] },
];

var CHURNED_CLIENTS = [
  { name: 'Le Comptoir', date: '20 avril 2026', reason: 'Budget — ne voyait pas le ROI après 2 mois', mrr: 490, plan: 'Starter' },
];

export function renderChurn() {
  var atRisk = CHURN_SIGNALS.filter(function(c) { return c.risk >= 50; }).length;
  var totalChurnedMrr = CHURNED_CLIENTS.reduce(function(s, c) { return s + c.mrr; }, 0);

  var atRiskNames = CHURN_SIGNALS.filter(function(c) { return c.risk >= 50; }).map(function(c) { return c.client; });
  var mrrExposed = CLIENTS.filter(function(c) { return atRiskNames.indexOf(c.name) >= 0; }).reduce(function(sum, c) { return sum + c.mrr; }, 0);
  var churnRate = (CLIENTS.length + CHURNED_CLIENTS.length) > 0 ? ((CHURNED_CLIENTS.length / (CLIENTS.length + CHURNED_CLIENTS.length)) * 100).toFixed(1) : '0.0';

  var riskCards = CHURN_SIGNALS.map(function(c) {
    var riskColor = c.risk >= 70 ? 'var(--admin-red)' : c.risk >= 50 ? 'var(--admin-orange)' : 'var(--admin-text-muted)';
    var signals = c.signals.map(function(s) {
      return '<div style="font-size:12px;color:var(--admin-text-secondary);padding:3px 0">• ' + s + '</div>';
    }).join('');

    var sparkHtml = c.trend ? miniSparkline(c.trend, riskColor) : '';
    var reasonHtml = c.topReason
      ? '<div style="font-size:10px;font-weight:600;color:' + riskColor + ';margin-bottom:8px;text-transform:uppercase;letter-spacing:0.06em">▸ ' + c.topReason + '</div>'
      : '';

    return '<div class="admin-card" style="border-left:3px solid ' + riskColor + '">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">'
        + '<div>'
          + '<div style="font-size:14px;font-weight:600">' + c.client + '</div>'
          + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:2px">Score risque : ' + c.risk + '%</div>'
        + '</div>'
        + '<div style="text-align:right">'
          + '<div style="font-size:20px;font-weight:700;color:' + riskColor + '">' + c.risk + '%</div>'
          + sparkHtml
        + '</div>'
      + '</div>'
      + reasonHtml
      + '<div style="margin-bottom:10px">' + signals + '</div>'
      + '<div style="display:flex;gap:6px">'
        + '<div class="admin-btn admin-btn-primary" data-action="call" style="font-size:11px;padding:5px 10px">' + c.action + '</div>'
        + '<div class="admin-btn admin-btn-ghost" data-action="email" style="font-size:11px;padding:5px 10px">Envoyer email</div>'
      + '</div>'
    + '</div>';
  }).join('');

  var churnedRows = CHURNED_CLIENTS.map(function(c) {
    return '<tr>'
      + '<td><strong>' + c.name + '</strong></td>'
      + '<td>' + c.plan + '</td>'
      + '<td>' + c.mrr + ' €</td>'
      + '<td>' + c.date + '</td>'
      + '<td style="font-size:12px;color:var(--admin-text-secondary)">' + c.reason + '</td>'
      + '<td><div class="admin-btn admin-btn-ghost" data-action="email" style="font-size:10px;padding:4px 8px">Win-back</div></td>'
    + '</tr>';
  }).join('');

  var criticalClients = CHURN_SIGNALS.filter(function(c) { return c.risk >= 80; });
  var criticalBanner = '';
  if (criticalClients.length > 0) {
    var criticalItems = criticalClients.map(function(c) {
      return '<div class="churn-critical-item">'
        + '<span class="churn-critical-name">' + c.client + '</span>'
        + '<span class="churn-critical-risk">' + c.risk + '%</span>'
        + '<span class="churn-critical-reason">' + c.topReason + '</span>'
        + '<div class="churn-critical-actions">'
          + '<div class="admin-btn admin-btn-primary churn-critical-btn" data-action="call">' + c.action + '</div>'
          + '<div class="admin-btn admin-btn-ghost churn-critical-btn" data-action="email">Email</div>'
        + '</div>'
      + '</div>';
    }).join('');

    criticalBanner = '<div class="churn-critical-banner">'
      + '<div class="churn-critical-header">'
        + '<span class="churn-critical-icon">&#9888;</span>'
        + '<span class="churn-critical-title">' + criticalClients.length + ' client' + (criticalClients.length > 1 ? 's' : '') + ' en danger critique</span>'
      + '</div>'
      + criticalItems
    + '</div>';
  }

  return ''
    + criticalBanner
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Clients à risque</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + atRisk + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Taux churn</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + churnRate + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">MRR perdu (churn)</div><div class="admin-kpi-value">' + totalChurnedMrr + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">MRR exposé</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + mrrExposed.toLocaleString('fr-FR') + ' €</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Clients à risque</div></div>'
      + '<div class="admin-grid admin-grid-2">' + riskCards + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Clients résiliés</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Client</th><th>Plan</th><th>MRR perdu</th><th>Date</th><th>Raison</th><th></th></tr></thead><tbody>' + churnedRows + '</tbody></table>'
      + '</div>'
    + '</div>';
}
