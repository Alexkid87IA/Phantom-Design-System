// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — All agents
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { ALL_AGENTS, totalAgents, activeAgents, errorAgents } from '../data/admin-agents.js';

function agentStatusBadge(status) {
  if (status === 'active') return '<span class="admin-badge admin-badge-green">Actif</span>';
  if (status === 'waiting') return '<span class="admin-badge admin-badge-orange">Attente</span>';
  if (status === 'idle') return '<span class="admin-badge admin-badge-muted">Idle</span>';
  if (status === 'error') return '<span class="admin-badge admin-badge-red">Erreur</span>';
  if (status === 'paused') return '<span class="admin-badge admin-badge-muted">Pause</span>';
  return '';
}

export function renderAgents() {
  var STATE = getState();
  var filter = STATE.filter || 'all';

  var filtered = filter === 'all' ? ALL_AGENTS : ALL_AGENTS.filter(function(a) { return a.status === filter; });

  var counts = {
    all: ALL_AGENTS.length,
    active: ALL_AGENTS.filter(function(a) { return a.status === 'active'; }).length,
    error: ALL_AGENTS.filter(function(a) { return a.status === 'error'; }).length,
    waiting: ALL_AGENTS.filter(function(a) { return a.status === 'waiting'; }).length,
    idle: ALL_AGENTS.filter(function(a) { return a.status === 'idle'; }).length,
    paused: ALL_AGENTS.filter(function(a) { return a.status === 'paused'; }).length,
  };

  var filters = [
    { id: 'all', label: 'Tous (' + counts.all + ')' },
    { id: 'active', label: 'Actifs (' + counts.active + ')' },
    { id: 'error', label: 'Erreur (' + counts.error + ')' },
    { id: 'waiting', label: 'Attente (' + counts.waiting + ')' },
    { id: 'idle', label: 'Idle (' + counts.idle + ')' },
    { id: 'paused', label: 'Pause (' + counts.paused + ')' },
  ];

  var filterHtml = filters.map(function(f) {
    return '<div class="admin-filter-btn' + (filter === f.id ? ' admin-filter-active' : '') + '" data-filter="' + f.id + '">' + f.label + '</div>';
  }).join('');

  var totalValue = ALL_AGENTS.reduce(function(sum, a) { return sum + a.value; }, 0);
  var avgSuccess = ALL_AGENTS.length > 0
    ? Math.round(ALL_AGENTS.reduce(function(sum, a) { return sum + a.success; }, 0) / ALL_AGENTS.length)
    : 0;

  var rows = filtered.map(function(a) {
    var pauseLabel = (a.status === 'active' || a.status === 'waiting') ? 'Pause' : 'Activer';
    var pauseIcon = (a.status === 'active' || a.status === 'waiting')
      ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
      : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    var quickActions = '<div class="admin-quick-actions">'
      + '<button class="admin-qa-btn" data-agent-toggle="' + a.id + '" title="' + pauseLabel + '">' + pauseIcon + '</button>'
      + (a.status === 'error' ? '<button class="admin-qa-btn admin-qa-restart" data-agent-restart="' + a.id + '" title="Relancer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 105.42-8.33L1 10"/></svg></button>' : '')
      + '</div>';

    return '<tr data-agent-admin="' + a.id + '" class="admin-table-clickable">'
      + '<td><strong>' + a.name + '</strong></td>'
      + '<td>' + a.client + '</td>'
      + '<td>' + a.type + '</td>'
      + '<td>' + a.pilot + '</td>'
      + '<td>' + agentStatusBadge(a.status) + '</td>'
      + '<td>' + a.tasks + '</td>'
      + '<td>' + a.success + '%</td>'
      + '<td style="color:var(--admin-green);font-weight:500">' + a.value.toLocaleString('fr-FR') + ' €</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + a.lastAction + '</td>'
      + '<td>' + quickActions + '</td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Total agents</div><div class="admin-kpi-value">' + totalAgents() + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Actifs</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + activeAgents() + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Erreurs</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + errorAgents() + (totalAgents() > 0 ? ' <span style="font-size:12px;font-weight:400;color:var(--admin-text-muted)">(' + Math.round((errorAgents() / totalAgents()) * 100) + '%)</span>' : '') + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Valeur totale générée</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + totalValue.toLocaleString('fr-FR') + ' €</div></div>'
    + '</div>'
    + '<div class="admin-section">'
      + '<div class="admin-filters">' + filterHtml + '</div>'
    + '</div>'
    + '<div class="admin-card" style="padding:0;overflow:hidden">'
      + '<table class="admin-table">'
        + '<thead><tr><th>Agent</th><th>Client</th><th>Type</th><th>Pilot</th><th>Statut</th><th>Tâches</th><th>Succès</th><th>Valeur</th><th>Dernière action</th><th></th></tr></thead>'
        + '<tbody>' + rows + '</tbody>'
      + '</table>'
    + '</div>';
}
