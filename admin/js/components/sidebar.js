// ═══════════════════════════════════════════════════════════
//  ADMIN SIDEBAR
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { ICON } from '../lib/icons.js';
import { ALERTS, pendingContent } from '../data/admin-agents.js';
import { activeClientCount, totalMRR } from '../data/clients.js';

var NAV_SECTIONS = [
  {
    label: 'GÉNÉRAL',
    items: [
      { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
      { id: 'clients', icon: 'clients', label: 'Clients', badge: activeClientCount },
      { id: 'agents', icon: 'agents', label: 'Agents' },
      { id: 'pilots', icon: 'pilots', label: 'Pilots' },
    ]
  },
  {
    label: 'OPÉRATIONS',
    items: [
      { id: 'content', icon: 'content', label: 'Contenu', badge: pendingContent },
      { id: 'validation', icon: 'content', label: 'Validation' },
      { id: 'messaging', icon: 'content', label: 'Messages' },
      { id: 'calendar', icon: 'calendar', label: 'Calendrier' },
      { id: 'templates', icon: 'agents', label: 'Templates' },
      { id: 'automations', icon: 'settings', label: 'Automations' },
      { id: 'knowledge', icon: 'content', label: 'Knowledge Base' },
      { id: 'workload', icon: 'pilots', label: 'Charge équipe' },
      { id: 'performance', icon: 'chart', label: 'Performance' },
      { id: 'onboarding', icon: 'clients', label: 'Onboarding' },
    ]
  },
  {
    label: 'BUSINESS',
    items: [
      { id: 'revenue', icon: 'revenue', label: 'Revenue' },
      { id: 'pipeline', icon: 'chart', label: 'Pipeline' },
      { id: 'billing', icon: 'revenue', label: 'Facturation' },
      { id: 'churn', icon: 'content', label: 'Churn' },
      { id: 'health', icon: 'clients', label: 'Santé clients' },
      { id: 'costs', icon: 'revenue', label: 'Coûts AI' },
      { id: 'sla', icon: 'chart', label: 'SLA' },
      { id: 'satisfaction', icon: 'clients', label: 'NPS' },
      { id: 'competitors', icon: 'chart', label: 'Concurrence' },
      { id: 'forecast', icon: 'revenue', label: 'Prévisions' },
    ]
  },
  {
    label: 'PLATEFORME',
    items: [
      { id: 'settings', icon: 'settings', label: 'Paramètres' },
      { id: 'roles', icon: 'clients', label: 'Rôles' },
      { id: 'api-keys', icon: 'settings', label: 'API Keys' },
      { id: 'ai-config', icon: 'agents', label: 'Config AI' },
      { id: 'notifications-admin', icon: 'content', label: 'Notifications' },
      { id: 'reports', icon: 'chart', label: 'Rapports' },
      { id: 'audit', icon: 'dashboard', label: 'Audit Trail' },
    ]
  },
];

export function renderSidebar() {
  var STATE = getState();
  var currentView = STATE.view;

  var navHtml = NAV_SECTIONS.map(function(section) {
    var items = section.items.map(function(item) {
      var isActive = currentView === item.id;
      var badgeHtml = '';
      if (item.badge) {
        var count = typeof item.badge === 'function' ? item.badge() : item.badge;
        if (count > 0) badgeHtml = '<span class="admin-nav-badge">' + count + '</span>';
      }
      return '<div class="admin-nav-item' + (isActive ? ' admin-nav-active' : '') + '" data-nav="' + item.id + '">'
        + '<span class="admin-nav-icon">' + ICON[item.icon] + '</span>'
        + '<span class="admin-nav-label">' + item.label + '</span>'
        + badgeHtml
      + '</div>';
    }).join('');

    return '<div class="admin-nav-section">'
      + '<div class="admin-nav-section-label">' + section.label + '</div>'
      + items
    + '</div>';
  }).join('');

  var alertCount = ALERTS.filter(function(a) { return a.severity === 'high'; }).length;
  var alertBadge = alertCount > 0 ? '<span class="admin-alert-badge">' + alertCount + '</span>' : '';

  return ''
    + '<div class="admin-sidebar">'
      + '<div class="admin-sidebar-header">'
        + '<div class="admin-logo">'
          + '<svg width="22" height="22" viewBox="0 0 40 40" fill="none"><path d="M10 32V18a10 10 0 0120 0v14l-4-3-3 3-3-3-3 3-3-3z" fill="#6E3CFF" opacity="0.9"/><circle cx="15" cy="19" r="2" fill="#fff"/><circle cx="25" cy="19" r="2" fill="#fff"/></svg>'
          + '<span class="admin-logo-text">Phantom</span>'
          + '<span class="admin-logo-tag">Admin</span>'
        + '</div>'
      + '</div>'
      + '<div class="admin-sidebar-nav">'
        + navHtml
      + '</div>'
      + '<div class="admin-sidebar-footer">'
        + '<div class="admin-user-block">'
          + '<div class="admin-user-avatar">AQ</div>'
          + '<div class="admin-user-info">'
            + '<div class="admin-user-name">Alex Q.</div>'
            + '<div class="admin-user-role">Super Admin</div>'
          + '</div>'
          + alertBadge
        + '</div>'
        + '<a class="admin-nav-item" href="../dashboard/" style="text-decoration:none;color:inherit;margin-top:8px">'
          + '<span class="admin-nav-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg></span>'
          + '<span class="admin-nav-label">Vue client</span>'
        + '</a>'
      + '</div>'
    + '</div>';
}
