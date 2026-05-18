// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Clients list
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { CLIENTS } from '../data/clients.js';

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

  var rows = clients.map(function(c) {
    var daysAgo = Math.floor((Date.now() - new Date(c.lastLogin).getTime()) / 86400000);
    var loginLabel = daysAgo === 0 ? 'Auj.' : daysAgo === 1 ? 'Hier' : daysAgo + 'j';
    var loginColor = daysAgo >= 4 ? 'var(--admin-red)' : daysAgo >= 2 ? 'var(--admin-orange)' : 'var(--admin-text-muted)';
    return '<tr class="admin-table-clickable" data-client="' + c.id + '">'
      + '<td>' + healthDot(c.health) + '</td>'
      + '<td><strong>' + c.name + '</strong></td>'
      + '<td>' + c.sector + '</td>'
      + '<td>' + c.city + '</td>'
      + '<td>' + c.plan + '</td>'
      + '<td style="font-weight:600">' + c.mrr.toLocaleString('fr-FR') + ' €</td>'
      + '<td>' + statusBadge(c.status) + '</td>'
      + '<td>' + c.agents + '</td>'
      + '<td style="color:var(--admin-text-muted);font-size:11px">' + c.pilot + '</td>'
      + '<td style="color:' + loginColor + ';font-size:10px;font-weight:' + (daysAgo >= 4 ? '600' : '400') + '">' + loginLabel + '</td>'
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
