// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Agent Supervision (Detail)
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { ALL_AGENTS, CONTENT_QUEUE } from '../data/admin-agents.js';

var ACTION_LOG = [
  { time: 'Il y a 12min', action: 'Post Instagram généré', result: 'Envoyé au client pour validation', status: 'success' },
  { time: 'Il y a 1h', action: 'Analyse tendances hashtags', result: '15 hashtags identifiés', status: 'success' },
  { time: 'Il y a 2h', action: 'Rédaction caption', result: 'Caption en 3 variantes', status: 'success' },
  { time: 'Il y a 4h', action: 'Planification semaine', result: '7 posts planifiés Lun-Dim', status: 'success' },
  { time: 'Il y a 6h', action: 'Analyse concurrents', result: 'Rapport 3 concurrents', status: 'success' },
  { time: 'Hier 18:00', action: 'Publication story', result: 'Publié — 342 vues', status: 'success' },
  { time: 'Hier 14:00', action: 'Réponse commentaire', result: 'Répondu à 4 commentaires', status: 'success' },
  { time: 'Hier 10:00', action: 'Sélection photos', result: '3 photos sélectionnées', status: 'warning' },
];

var TASK_QUEUE = [
  { id: 'tq1', task: 'Carousel — Recette du week-end', priority: 'high', eta: '14:00', status: 'in_progress' },
  { id: 'tq2', task: 'Story — Behind the scenes', priority: 'medium', eta: '16:00', status: 'queued' },
  { id: 'tq3', task: 'Réponse avis 3★ — Claire M.', priority: 'high', eta: '17:00', status: 'queued' },
  { id: 'tq4', task: 'Post lundi — Menu semaine', priority: 'low', eta: 'Lundi 09:00', status: 'scheduled' },
];

export function renderAgentDetail() {
  var STATE = getState();
  var agent = ALL_AGENTS.find(function(a) { return a.id === STATE.selectedAgent; });
  if (!agent) return '<div>Agent introuvable</div>';

  var statusMap = {
    active: '<span class="admin-badge admin-badge-green">Actif</span>',
    error: '<span class="admin-badge admin-badge-red">Erreur</span>',
    paused: '<span class="admin-badge admin-badge-muted">En pause</span>',
    waiting: '<span class="admin-badge admin-badge-orange">En attente</span>',
    idle: '<span class="admin-badge admin-badge-muted">Idle</span>',
  };

  var typeNames = { social: 'Social Manager', google: 'Avis Google', photos: 'Photos', seo: 'SEO', web: 'Site Web', brand: 'Brand B2C' };
  var typeColors = { social: '#FF2D87', google: '#FFD400', photos: '#00D26A', seo: '#0066FF', web: '#6E3CFF', brand: '#FF8A1F' };
  var agentColor = typeColors[agent.type] || '#6E3CFF';

  var agentContent = CONTENT_QUEUE.filter(function(c) { return c.agent === (typeNames[agent.type] || agent.name) && c.client === agent.client; });

  var logRows = ACTION_LOG.map(function(l) {
    var icon = l.status === 'success' ? '<span style="color:var(--admin-green)">✓</span>'
      : l.status === 'warning' ? '<span style="color:var(--admin-orange)">⚠</span>'
      : '<span style="color:var(--admin-red)">✗</span>';
    return '<tr>'
      + '<td style="font-size:11px;color:var(--admin-text-muted);white-space:nowrap">' + l.time + '</td>'
      + '<td>' + icon + ' ' + l.action + '</td>'
      + '<td style="font-size:12px;color:var(--admin-text-secondary)">' + l.result + '</td>'
    + '</tr>';
  }).join('');

  var taskItems = TASK_QUEUE.map(function(t) {
    var priorityBadge = t.priority === 'high' ? '<span class="admin-badge admin-badge-red">Urgent</span>'
      : t.priority === 'medium' ? '<span class="admin-badge admin-badge-orange">Normal</span>'
      : '<span class="admin-badge admin-badge-muted">Bas</span>';
    var statusLabel = t.status === 'in_progress' ? '<span style="color:var(--admin-violet)">En cours</span>'
      : t.status === 'queued' ? '<span style="color:var(--admin-text-muted)">En file</span>'
      : '<span style="color:var(--admin-text-muted)">Planifié</span>';
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--admin-border)">'
      + '<div style="display:flex;align-items:center;gap:10px">'
        + priorityBadge
        + '<span style="font-size:13px">' + t.task + '</span>'
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px">'
        + statusLabel
        + '<span style="font-size:11px;color:var(--admin-text-muted)">' + t.eta + '</span>'
      + '</div>'
    + '</div>';
  }).join('');

  var contentRows = agentContent.map(function(c) {
    var statusBadge = c.status === 'pending_client' ? '<span class="admin-badge admin-badge-orange">Attente client</span>'
      : c.status === 'pending_pilot' ? '<span class="admin-badge admin-badge-muted">Attente pilot</span>'
      : '<span class="admin-badge admin-badge-green">Approuvé</span>';
    return '<tr>'
      + '<td><strong>' + c.title + '</strong></td>'
      + '<td>' + c.type + '</td>'
      + '<td>' + statusBadge + '</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + c.since + '</td>'
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
      + '<div style="width:48px;height:48px;border-radius:12px;background:' + agentColor + ';display:flex;align-items:center;justify-content:center">'
        + '<svg width="22" height="22" viewBox="0 0 40 40" fill="none"><path d="M10 32V18a10 10 0 0120 0v14l-4-3-3 3-3-3-3 3-3-3z" fill="#fff" opacity="0.9"/><circle cx="15" cy="19" r="2" fill="' + agentColor + '"/><circle cx="25" cy="19" r="2" fill="' + agentColor + '"/></svg>'
      + '</div>'
      + '<div style="flex:1">'
        + '<div style="display:flex;align-items:center;gap:10px">'
          + '<div class="admin-detail-title">' + agent.name + '</div>'
          + (statusMap[agent.status] || '')
        + '</div>'
        + '<div style="font-size:12px;color:var(--admin-text-muted)">' + agent.client + ' · Pilot: ' + agent.pilot + ' · ' + (typeNames[agent.type] || agent.type) + '</div>'
      + '</div>'
      + '<div style="display:flex;gap:6px">'
        + '<div class="admin-btn admin-btn-ghost" data-action="pause-client" style="font-size:11px;padding:6px 14px">' + (agent.status === 'active' ? 'Mettre en pause' : 'Réactiver') + '</div>'
        + '<div class="admin-btn admin-btn-ghost" style="font-size:11px;padding:6px 14px">Config AI</div>'
      + '</div>'
    + '</div>'

    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Tâches total</div><div class="admin-kpi-value">' + agent.tasks + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Taux succès</div><div class="admin-kpi-value" style="color:' + (agent.success >= 90 ? 'var(--admin-green)' : 'var(--admin-orange)') + '">' + agent.success + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Valeur générée</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + agent.value.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Dernière action</div><div class="admin-kpi-value" style="font-size:14px">' + agent.lastAction + '</div></div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1.2fr 0.8fr;gap:16px">'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Historique actions</div></div>'
          + '<div class="admin-card" style="padding:0;overflow:hidden">'
            + '<table class="admin-table"><thead><tr><th>Quand</th><th>Action</th><th>Résultat</th></tr></thead><tbody>' + logRows + '</tbody></table>'
          + '</div>'
        + '</div>'

        + (contentRows.length > 0 ? '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Contenus en attente</div></div>'
          + '<div class="admin-card" style="padding:0;overflow:hidden">'
            + '<table class="admin-table"><thead><tr><th>Contenu</th><th>Type</th><th>Statut</th><th>Depuis</th></tr></thead><tbody>' + contentRows + '</tbody></table>'
          + '</div>'
        + '</div>' : '')
      + '</div>'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">File de tâches</div></div>'
          + '<div class="admin-card">' + taskItems + '</div>'
        + '</div>'

        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Configuration AI</div></div>'
          + '<div class="admin-card">'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Modèle</span><div style="font-size:13px;font-weight:500;margin-top:2px">Claude Sonnet 4</div></div>'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Température</span><div style="font-size:13px;font-weight:500;margin-top:2px">0.7</div></div>'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Max tokens</span><div style="font-size:13px;font-weight:500;margin-top:2px">2 048</div></div>'
            + '<div style="padding:8px 0"><span style="font-size:12px;color:var(--admin-text-muted)">Coût estimé/jour</span><div style="font-size:13px;font-weight:500;margin-top:2px;color:var(--admin-orange)">3.20 €</div></div>'
          + '</div>'
        + '</div>'
      + '</div>'

    + '</div>';
}
