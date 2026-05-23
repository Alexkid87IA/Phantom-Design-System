// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Clients list
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { CLIENTS } from '../data/clients.js';
import { ALERTS } from '../data/admin-agents.js';
import { esc } from '../lib/esc.js';

function getFilteredClients(filter) {
  if (filter === 'all') return CLIENTS;
  return CLIENTS.filter(function(c) { return c.status === filter; });
}

function healthDot(health) {
  if (health === 'green') return '<span class="admin-dot admin-dot-green"></span>';
  if (health === 'orange') return '<span class="admin-dot admin-dot-orange"></span>';
  return '<span class="admin-dot admin-dot-red"></span>';
}

function statusBadge(status) {
  if (status === 'active') return '<span class="admin-badge admin-badge-green">Actif</span>';
  if (status === 'trial') return '<span class="admin-badge admin-badge-blue">Trial</span>';
  if (status === 'churned') return '<span class="admin-badge admin-badge-red">Churned</span>';
  if (status === 'paused') return '<span class="admin-badge admin-badge-muted">Pause</span>';
  return '';
}

export function renderClients() {
  var STATE = getState();
  var filter = STATE.filter || 'all';
  var clients = getFilteredClients(filter);

  var counts = {
    all: CLIENTS.length,
    active: CLIENTS.filter(function(c) { return c.status === 'active'; }).length,
    trial: CLIENTS.filter(function(c) { return c.status === 'trial'; }).length,
    churned: CLIENTS.filter(function(c) { return c.status === 'churned'; }).length,
    paused: CLIENTS.filter(function(c) { return c.status === 'paused'; }).length,
  };

  var filters = [
    { id: 'all', label: 'Tous (' + counts.all + ')' },
    { id: 'active', label: 'Actifs (' + counts.active + ')' },
    { id: 'trial', label: 'Trial (' + counts.trial + ')' },
    { id: 'paused', label: 'Pause (' + counts.paused + ')' },
    { id: 'churned', label: 'Churned (' + counts.churned + ')' },
  ];

  var filterHtml = filters.map(function(f) {
    return '<div class="admin-filter-btn' + (filter === f.id ? ' admin-filter-active' : '') + '" data-filter="' + f.id + '">' + f.label + '</div>';
  }).join('');

  var healthOrder = { red: 0, orange: 1, green: 2 };
  var sorted = clients.slice().sort(function(a, b) {
    var ha = healthOrder[a.health] !== undefined ? healthOrder[a.health] : 2;
    var hb = healthOrder[b.health] !== undefined ? healthOrder[b.health] : 2;
    if (ha !== hb) return ha - hb;
    return b.mrr - a.mrr;
  });

  var rows = sorted.map(function(c) {
    var daysAgo = Math.floor((new Date() - new Date(c.lastLogin).getTime()) / 86400000);
    if (isNaN(daysAgo)) daysAgo = 0;
    var loginLabel = daysAgo === 0 ? 'Auj.' : daysAgo === 1 ? 'Hier' : daysAgo + 'j';
    var loginColor = daysAgo >= 4 ? 'var(--admin-red)' : daysAgo >= 2 ? 'var(--admin-orange)' : 'var(--admin-text-muted)';

    var isAtRisk = c.health === 'red' || c.health === 'orange';
    var alert = ALERTS.find(function(a) { return a.client === c.name; });
    var reason = alert ? alert.message : '';
    var rowClass = c.health === 'red' ? ' admin-row-critical' : c.health === 'orange' ? ' admin-row-warning' : '';

    return '<tr class="admin-table-clickable' + rowClass + '" data-client="' + c.id + '">'
      + '<td>' + healthDot(c.health) + '</td>'
      + '<td>'
        + '<strong>' + esc(c.name) + '</strong>'
        + (isAtRisk && reason ? '<div class="admin-churn-hint">' + esc(reason) + '</div>' : '')
      + '</td>'
      + '<td>' + esc(c.sector) + '</td>'
      + '<td>' + esc(c.city) + '</td>'
      + '<td>' + esc(c.plan) + '</td>'
      + '<td style="font-weight:600' + (isAtRisk ? ';color:var(--admin-red)' : '') + '">'
        + c.mrr.toLocaleString('fr-FR') + ' €'
        + (isAtRisk ? '<div class="admin-mrr-risk">À risque</div>' : '')
      + '</td>'
      + '<td>' + statusBadge(c.status) + '</td>'
      + '<td>' + c.agents + '</td>'
      + '<td style="color:var(--admin-text-muted);font-size:11px">' + c.pilot + '</td>'
      + '<td style="color:' + loginColor + ';font-size:10px;font-weight:' + (daysAgo >= 4 ? '600' : '400') + '">'
        + loginLabel
        + (daysAgo >= 7 ? ' <span style="color:var(--admin-red)" title="Client inactif — risque de départ">⚠</span>' : '')
      + '</td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-section">'
      + '<div class="admin-filters">'
        + filterHtml
        + '<button class="admin-btn-primary" data-action="new-client" style="margin-left:auto">+ Nouveau client</button>'
      + '</div>'
    + '</div>'
    + '<div class="admin-card" style="padding:0;overflow:hidden">'
      + '<table class="admin-table">'
        + '<thead><tr>'
          + '<th></th><th>Nom</th><th>Secteur</th><th>Ville</th><th>Plan</th><th>MRR</th><th>Statut</th><th>Agents</th><th>Pilot</th><th>Vu</th>'
        + '</tr></thead>'
        + '<tbody>' + rows + '</tbody>'
      + '</table>'
    + '</div>';
}
