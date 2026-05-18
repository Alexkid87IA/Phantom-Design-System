// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Pilot Detail
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { PILOTS } from '../data/pilots.js';
import { ALL_AGENTS } from '../data/admin-agents.js';
import { CLIENTS } from '../data/clients.js';

export function renderPilotDetail() {
  var STATE = getState();
  var pilot = PILOTS.find(function(p) { return p.id === STATE.selectedPilot; });
  if (!pilot) return '<div>Pilot introuvable</div>';

  var firstName = pilot.name.split(' ')[0];
  var pilotAgents = ALL_AGENTS.filter(function(a) { return a.pilot === firstName; });
  var pilotClients = CLIENTS.filter(function(c) { return c.pilot === firstName; });
  var totalTasks = pilotAgents.reduce(function(s, a) { return s + a.tasks; }, 0);
  var totalValue = pilotAgents.reduce(function(s, a) { return s + a.value; }, 0);
  var avgSuccess = pilotAgents.length > 0 ? Math.round(pilotAgents.reduce(function(s, a) { return s + a.success; }, 0) / pilotAgents.length) : 0;

  var clientRows = pilotClients.map(function(c) {
    var cAgents = pilotAgents.filter(function(a) { return a.clientId === c.id; });
    return '<tr data-client="' + c.id + '" class="admin-table-clickable">'
      + '<td><strong>' + c.name + '</strong></td>'
      + '<td>' + c.sector + '</td>'
      + '<td>' + cAgents.length + '</td>'
      + '<td>' + c.mrr + ' €</td>'
      + '<td>' + c.health + '</td>'
    + '</tr>';
  }).join('');

  var agentRows = pilotAgents.map(function(a) {
    var statusBadge = a.status === 'active' ? '<span class="admin-badge admin-badge-green">Actif</span>'
      : a.status === 'error' ? '<span class="admin-badge admin-badge-red">Erreur</span>'
      : '<span class="admin-badge admin-badge-muted">' + a.status + '</span>';
    return '<tr>'
      + '<td><strong>' + a.name + '</strong></td>'
      + '<td>' + a.client + '</td>'
      + '<td>' + statusBadge + '</td>'
      + '<td>' + a.tasks + '</td>'
      + '<td>' + a.success + '%</td>'
      + '<td style="color:var(--admin-green)">' + a.value.toLocaleString('fr-FR') + ' €</td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-detail-header">'
      + '<div class="admin-back-btn" data-action="back">'
        + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>'
        + 'Retour'
      + '</div>'
    + '</div>'

    + '<div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">'
      + '<div style="width:48px;height:48px;border-radius:50%;background:' + pilot.color + ';display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:#fff">' + pilot.avatar + '</div>'
      + '<div>'
        + '<div class="admin-detail-title">' + pilot.name + '</div>'
        + '<div style="font-size:12px;color:var(--admin-text-muted)">' + pilot.role + ' · ' + pilot.specialties.join(', ') + '</div>'
      + '</div>'
    + '</div>'

    + '<div class="admin-grid admin-grid-4" style="margin-bottom:28px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Clients</div><div class="admin-kpi-value">' + pilotClients.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Agents gérés</div><div class="admin-kpi-value">' + pilotAgents.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Qualité</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + pilot.quality + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Charge</div><div class="admin-kpi-value" style="color:' + (pilot.workload > 80 ? 'var(--admin-orange)' : 'var(--admin-violet)') + '">' + pilot.workload + '%</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Clients assignés</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Client</th><th>Secteur</th><th>Agents</th><th>MRR</th><th>Santé</th></tr></thead><tbody>' + clientRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Agents supervisés</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Agent</th><th>Client</th><th>Statut</th><th>Tâches</th><th>Succès</th><th>Valeur</th></tr></thead><tbody>' + agentRows + '</tbody></table>'
      + '</div>'
    + '</div>';
}
