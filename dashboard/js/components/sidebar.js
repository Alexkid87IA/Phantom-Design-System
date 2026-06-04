// ═══════════════════════════════════════════════════════════
//  COMPONENT — Sidebar
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { WORKSPACE, USER } from '../data/workspace.js';
import { AGENTS, AGENT_MISSIONS } from '../data/agents.js';
import { WORK_ITEMS } from '../data/work.js';
import { ICONS, ICONS_ROI, ICONS_TEAM, ghostSvg } from '../lib/icons.js';
import { statusColor, statusLabel, pendingCount } from '../lib/helpers.js';

export function renderSidebar() {
  const STATE = getState();
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: ICONS.dashboard },
    { id: 'inbox', label: 'Boîte de réception', icon: ICONS.inbox, badge: pendingCount() },
    { id: 'work', label: 'Travail produit', icon: ICONS.work },
    { id: 'planning', label: 'Planning', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { id: 'analytics', label: 'Statistiques', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
    { id: 'roi', label: 'Impact & ROI', icon: ICONS_ROI },
    { id: 'team', label: 'Équipe', icon: ICONS_TEAM },
    { id: 'command-center', label: 'Centre de commande', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
  ];
  const navItems2 = [
    { id: 'integrations', label: 'Intégrations', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>' },
    { id: 'profile', label: 'Profil Business', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { id: 'billing', label: 'Facturation', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
    { id: 'team-permissions', label: 'Équipe & Accès', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>' },
    { id: 'notifications', label: 'Notifications', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>' },
    { id: 'settings', label: 'Paramètres', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09"/></svg>' },
    { id: 'referral', label: 'Parrainage', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' },
    { id: 'help', label: 'Aide', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
  ];

  return `
    <div class="sidebar">
      <div class="ws">
        <div class="ws-avatar">${WORKSPACE.initials}</div>
        <div>
          <div class="ws-name">${WORKSPACE.name}</div>
          <div class="ws-sub">${WORKSPACE.type} &middot; ${WORKSPACE.city}</div>
        </div>
      </div>

      <div class="section-title">&mdash; Atelier</div>
      ${navItems.map((n, i) => `
        <div class="nav-item ${STATE.view === n.id && !STATE.activeAgent ? 'active' : ''}" data-nav="${n.id}" role="button" tabindex="0">
          ${n.icon}
          ${n.label}
          ${n.badge ? '<span class="nav-badge nav-badge-urgent">' + n.badge + '</span>' : '<span class="nav-shortcut">' + (i + 1) + '</span>'}
        </div>
      `).join('')}

      <div class="section-title">&mdash; Gestion</div>
      ${navItems2.map(n => `
        <div class="nav-item ${STATE.view === n.id && !STATE.activeAgent ? 'active' : ''}" data-nav="${n.id}" role="button" tabindex="0">
          ${n.icon}
          ${n.label}
        </div>
      `).join('')}

      <div class="section-title">
        <span>&mdash; Agents actifs</span>
        <button class="add-agent-btn" data-action="add-agent" aria-label="Ajouter un agent">${ICONS.plus}</button>
      </div>

      ${AGENTS.map(a => {
        var m = AGENT_MISSIONS[a.id];
        var LAST_ACTIONS = {
          social: 'Reel publié il y a 3 min',
          google: 'Avis répondu il y a 12 min',
          photos: 'En attente de brief',
          seo: 'Article en rédaction...',
          web: 'Dernière MAJ il y a 2j',
          brand: 'Design livré il y a 1h',
        };
        var lastAction = LAST_ACTIONS[a.id] || '';
        var tooltipHtml = m
          ? '<div class="agent-tooltip">'
            + '<div class="agent-tooltip-header">'
              + ghostSvg(a.color, 16)
              + '<strong>' + a.name + '</strong>'
              + '<span class="agent-tooltip-status" style="color:' + statusColor(a.status) + '">' + statusLabel(a.status) + '</span>'
            + '</div>'
            + (lastAction ? '<div class="agent-tooltip-action">' + lastAction + '</div>' : '')
            + '<div class="agent-tooltip-brief">' + m.brief.substring(0, 80) + '…</div>'
            + '<div class="agent-tooltip-stats">'
              + '<span>' + m.completed + ' tâches</span>'
              + '<span>' + m.successRate + '% succès</span>'
              + '<span>Pilot: ' + a.pilot + '</span>'
            + '</div>'
          + '</div>'
          : '';
        return '<div class="agent-row ' + (STATE.activeAgent === a.id ? 'active' : '') + '" data-agent="' + a.id + '" role="button" tabindex="0">'
          + ghostSvg(a.color)
          + a.name
          + '<span class="agent-dot' + (a.status === 'active' ? ' agent-dot-pulse' : '') + '" style="background:' + statusColor(a.status) + '"></span>'
          + (a.tasks > 0 ? '<span class="agent-count">' + a.tasks + '</span>' : '')
          + tooltipHtml
        + '</div>';
      }).join('')}

      <div class="sidebar-progress">
        <div class="sidebar-progress-header">
          <span class="sidebar-progress-label">Objectif semaine</span>
          <span class="sidebar-progress-value">${WORK_ITEMS.filter(w => w.status === 'Publie' || w.status === 'Envoye').length}/${WORK_ITEMS.length}</span>
        </div>
        <div class="sidebar-progress-bar">
          <div class="sidebar-progress-fill" style="width:${Math.round((WORK_ITEMS.filter(w => w.status === 'Publie' || w.status === 'Envoye').length / WORK_ITEMS.length) * 100)}%"></div>
        </div>
      </div>

      <div class="support">
        ${ghostSvg('#FFD400', 44).replace('style="', 'style="position:absolute;right:-6px;bottom:-10px;opacity:0.9;')}
        <div class="support-title">Besoin d'aide ? On répond en 1h.</div>
        <div class="support-btn">Slack équipe &rarr;</div>
      </div>

      <div class="user-block">
        <div class="user-avatar">${USER.initials}</div>
        <div>
          <div class="user-name">${USER.name}</div>
          <div class="user-email">${USER.email}</div>
        </div>
      </div>
    </div>
  `;
}
