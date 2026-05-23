// ═══════════════════════════════════════════════════════════
//  COMPONENT — Topbar
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { WORKSPACE } from '../data/workspace.js';
import { getAgent } from '../data/agents.js';
import { ICONS } from '../lib/icons.js';
import { activeAgentCount } from '../lib/helpers.js';
import { unreadCount } from '../data/notifications.js';

export function renderTopbar() {
  const STATE = getState();
  let breadcrumb = WORKSPACE.name;

  var VIEW_LABELS = {
    dashboard: 'Tableau de bord',
    inbox: 'Boîte de réception',
    work: 'Travail produit',
    planning: 'Planning',
    analytics: 'Statistiques',
    roi: 'Impact & ROI',
    team: 'Équipe',
    integrations: 'Intégrations',
    profile: 'Profil Business',
    billing: 'Facturation',
    settings: 'Paramètres',
    'team-permissions': 'Équipe & Accès',
    notifications: 'Notifications',
    referral: 'Parrainage',
    'command-center': 'Centre de commande',
    help: 'Centre d\'aide',
  };

  if (STATE.activeAgent) {
    const a = getAgent(STATE.activeAgent);
    breadcrumb += ' <span style="color:var(--ink-30)">/</span> <strong>' + a.name + '</strong>';
  } else if (VIEW_LABELS[STATE.view]) {
    breadcrumb += ' <span style="color:var(--ink-30)">/</span> <strong>' + VIEW_LABELS[STATE.view] + '</strong>';
  }

  var count = unreadCount();
  var bellHtml = '<div class="notif-bell" data-action="toggle-notif-panel" role="button" tabindex="0" aria-label="Notifications' + (count > 0 ? ', ' + count + ' non lue' + (count > 1 ? 's' : '') : '') + '">'
    + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>'
    + (count > 0 ? '<span class="notif-badge">' + count + '</span>' : '')
    + '</div>';

  var liveStatus = '<div class="topbar-live">'
    + '<div class="topbar-live-dot"></div>'
    + '<span class="topbar-live-text">Agents actifs</span>'
    + '</div>';

  var SEARCH_HINTS = {
    dashboard: 'Cherche un agent, une tâche...',
    inbox: 'Cherche un livrable à valider...',
    work: 'Cherche un contenu produit...',
    planning: 'Cherche un événement planifié...',
    analytics: 'Cherche une métrique...',
    roi: 'Cherche un calcul ROI...',
    team: 'Cherche un agent...',
    settings: 'Cherche un paramètre...',
    help: 'Cherche un article d\'aide...',
  };
  var searchHint = SEARCH_HINTS[STATE.view] || 'Cherche un agent, une tâche...';

  return `
    <div class="topbar">
      <div class="breadcrumb">${breadcrumb}</div>
      ${liveStatus}
      <div class="search-trigger" data-action="search">${searchHint} &#8984;K</div>
      <div class="topbar-right">
        ${bellHtml}
        <span class="tag-green">${activeAgentCount()} agents en cours</span>
        <button class="btn-dark" data-action="new-brief">Nouveau brief +</button>
        <div id="notif-panel" class="hidden"></div>
      </div>
    </div>
  `;
}
