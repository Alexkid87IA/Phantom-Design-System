// ═══════════════════════════════════════════════════════════
//  ADMIN TOPBAR
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { totalMRR } from '../data/clients.js';
import { pendingContent, errorAgents, activeAgents } from '../data/admin-agents.js';

var VIEW_TITLES = {
  dashboard: 'Dashboard',
  clients: 'Clients',
  agents: 'Agents',
  pilots: 'Pilots',
  content: 'Contenu',
  validation: 'Validation',
  messaging: 'Messages',
  calendar: 'Calendrier',
  templates: 'Templates',
  automations: 'Automations',
  knowledge: 'Knowledge Base',
  workload: 'Charge équipe',
  performance: 'Performance',
  onboarding: 'Onboarding',
  revenue: 'Revenue',
  pipeline: 'Pipeline',
  billing: 'Facturation',
  churn: 'Churn',
  health: 'Santé clients',
  costs: 'Coûts AI',
  sla: 'SLA',
  satisfaction: 'NPS',
  competitors: 'Concurrence',
  forecast: 'Prévisions',
  settings: 'Paramètres',
  roles: 'Rôles & Permissions',
  'api-keys': 'API Keys',
  'ai-config': 'Configuration AI',
  'notifications-admin': 'Notifications',
  reports: 'Rapports',
  audit: 'Audit Trail',
};

export function renderTopbar() {
  var STATE = getState();
  var title = VIEW_TITLES[STATE.view] || 'Dashboard';
  var mrr = totalMRR().toLocaleString('fr-FR');
  var pending = pendingContent();

  var errors = errorAgents();
  var active = activeAgents();
  var systemStatus = errors > 0
    ? '<div class="admin-system-status admin-system-warn" data-nav="agents"><span class="admin-system-dot admin-system-dot-red"></span>' + errors + ' erreur</div>'
    : '<div class="admin-system-status"><span class="admin-system-dot"></span>' + active + ' agents actifs</div>';

  return ''
    + '<div class="admin-topbar">'
      + '<div class="admin-topbar-left">'
        + '<div class="admin-topbar-title">' + title + '</div>'
      + '</div>'
      + '<div class="admin-topbar-center">'
        + '<div class="admin-search-bar">'
          + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
          + '<input type="text" class="admin-search-input" placeholder="Rechercher client, agent, pilot..." />'
          + '<kbd class="admin-search-kbd">⌘K</kbd>'
        + '</div>'
      + '</div>'
      + '<div class="admin-topbar-right">'
        + systemStatus
        + '<div class="admin-topbar-action" data-nav="validation" title="Contenus en attente">'
          + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
          + (pending > 0 ? '<span class="admin-topbar-badge">' + pending + '</span>' : '')
        + '</div>'
        + '<div class="admin-mrr-pill">'
          + '<span class="admin-mrr-label">MRR</span>'
          + '<span class="admin-mrr-value">' + mrr + ' €</span>'
        + '</div>'
      + '</div>'
    + '</div>';
}
