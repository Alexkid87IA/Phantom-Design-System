// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Client detail
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { getClient, CLIENTS } from '../data/clients.js';
import { ALL_AGENTS, CONTENT_QUEUE } from '../data/admin-agents.js';
import { INVOICES } from '../data/revenue.js';

function statusBadge(status) {
  if (status === 'active') return '<span class="admin-badge admin-badge-green">Actif</span>';
  if (status === 'trial') return '<span class="admin-badge admin-badge-blue">Trial</span>';
  if (status === 'churned') return '<span class="admin-badge admin-badge-red">Churned</span>';
  if (status === 'paused') return '<span class="admin-badge admin-badge-muted">Pause</span>';
  return '';
}

function agentStatusBadge(status) {
  if (status === 'active') return '<span class="admin-badge admin-badge-green">Actif</span>';
  if (status === 'waiting') return '<span class="admin-badge admin-badge-orange">Attente</span>';
  if (status === 'idle') return '<span class="admin-badge admin-badge-muted">Idle</span>';
  if (status === 'error') return '<span class="admin-badge admin-badge-red">Erreur</span>';
  if (status === 'paused') return '<span class="admin-badge admin-badge-muted">Pause</span>';
  return '';
}

export function renderClientDetail() {
  var STATE = getState();
  var client = getClient(STATE.selectedClient);
  if (!client) return '<div>Client introuvable</div>';

  var agents = ALL_AGENTS.filter(function(a) { return a.clientId === client.id; });
  var content = CONTENT_QUEUE.filter(function(c) { return c.client === client.name; });
  var invoices = INVOICES.filter(function(i) { return i.client === client.name; });
  var totalValue = agents.reduce(function(sum, a) { return sum + a.value; }, 0);

  var agentRows = agents.map(function(a) {
    return '<tr>'
      + '<td><strong>' + a.name + '</strong></td>'
      + '<td>' + a.pilot + '</td>'
      + '<td>' + agentStatusBadge(a.status) + '</td>'
      + '<td>' + a.tasks + '</td>'
      + '<td>' + a.success + '%</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + a.lastAction + '</td>'
    + '</tr>';
  }).join('');

  var contentItems = content.map(function(c) {
    var badge = c.status === 'pending_client'
      ? '<span class="admin-badge admin-badge-orange">Client</span>'
      : '<span class="admin-badge admin-badge-violet">Pilot</span>';
    return '<div class="admin-queue-item">'
      + '<div class="admin-queue-info">'
        + '<div class="admin-queue-title">' + c.title + '</div>'
        + '<div class="admin-queue-meta">' + c.agent + ' · ' + c.type + ' · ' + c.since + '</div>'
      + '</div>'
      + badge
    + '</div>';
  }).join('');

  var invoiceRows = invoices.map(function(inv) {
    var sBadge = inv.status === 'paid'
      ? '<span class="admin-badge admin-badge-green">Payée</span>'
      : inv.status === 'overdue'
        ? '<span class="admin-badge admin-badge-red">Retard</span>'
        : inv.status === 'trial'
          ? '<span class="admin-badge admin-badge-blue">Trial</span>'
          : '<span class="admin-badge admin-badge-orange">Attente</span>';
    return '<tr><td>' + inv.period + '</td><td>' + inv.amount + ' €</td><td>' + sBadge + '</td></tr>';
  }).join('');

  return ''
    + '<div class="admin-detail-header">'
      + '<div class="admin-back-btn" data-action="back">'
        + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>'
        + 'Retour'
      + '</div>'
    + '</div>'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">'
      + '<div style="display:flex;align-items:center;gap:14px">'
        + '<div class="admin-detail-title">' + client.name + '</div>'
        + statusBadge(client.status)
      + '</div>'
      + '<div style="display:flex;gap:6px">'
        + '<div class="admin-btn admin-btn-sm admin-btn-ghost" data-action="email"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Email</div>'
        + '<div class="admin-btn admin-btn-sm admin-btn-ghost" data-action="call"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> Appel</div>'
        + '<div class="admin-btn admin-btn-sm admin-btn-ghost" data-action="remind"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> Relance</div>'
      + '</div>'
    + '</div>'
    + '<div class="admin-detail-meta" style="margin-bottom:28px">'
      + '<span>' + client.sector + ' · ' + client.city + '</span>'
      + '<span>Plan ' + client.plan + ' · ' + client.mrr + ' €/mois</span>'
      + '<span>Pilot : ' + client.pilot + '</span>'
      + '<span>Depuis ' + client.since + '</span>'
    + '</div>'

    + '<div class="admin-grid admin-grid-4" style="margin-bottom:28px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Agents</div><div class="admin-kpi-value">' + agents.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Valeur générée</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + totalValue.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Contenu en attente</div><div class="admin-kpi-value">' + content.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Dernière connexion</div><div class="admin-kpi-value" style="font-size:16px">' + client.lastLogin + '</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Agents</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Agent</th><th>Pilot</th><th>Statut</th><th>Tâches</th><th>Succès</th><th>Dernière action</th></tr></thead><tbody>' + agentRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + (content.length > 0
      ? '<div class="admin-section">'
        + '<div class="admin-section-header"><div class="admin-section-title">Contenu en attente</div></div>'
        + contentItems
        + '</div>'
      : '')

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Facturation</div>'
      + '</div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Période</th><th>Montant</th><th>Statut</th></tr></thead><tbody>' + invoiceRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + '<div style="display:flex;gap:8px;margin-top:24px">'
      + '<div class="admin-btn admin-btn-ghost" data-action="email">Envoyer email</div>'
      + '<div class="admin-btn admin-btn-ghost" data-action="call">Planifier appel</div>'
      + '<div class="admin-btn admin-btn-danger" data-action="pause-client">Mettre en pause</div>'
    + '</div>';
}
