// ═══════════════════════════════════════════════════════════
//  VIEW — Centre de Notifications
// ═══════════════════════════════════════════════════════════

import { AGENTS } from '../data/agents.js';
import { getNotifications, markAllRead } from '../data/notifications.js';

var SEED_NOTIFS = [
  { id: 'seed1', agent: 'social', title: 'Nouveau livrable prêt', text: '1 post Instagram en attente de validation', time: 'Il y a 12 min', read: false, type: 'deliverable' },
  { id: 'seed2', agent: 'google', title: 'Nouvel avis reçu', text: 'Thomas R. a laissé un avis 2★ — réponse prête', time: 'Il y a 1h', read: false, type: 'alert' },
  { id: 'seed3', agent: 'photos', title: 'Photo demandée', text: 'Envoie une photo du menu du jour pour le post de demain', time: 'Il y a 3h', read: false, type: 'request' },
  { id: 'seed4', agent: 'seo', title: 'Article publié', text: '"Top 5 sushis Marseille" est en ligne — position #8 Google', time: 'Il y a 5h', read: true, type: 'success' },
  { id: 'seed5', agent: 'social', title: 'Résultats du post', text: 'Carousel "Planche Premium" : +340 likes, 22 sauvegardes', time: 'Il y a 8h', read: true, type: 'stats' },
  { id: 'seed6', agent: 'google', title: '5 nouveaux avis', text: 'Résumé hebdomadaire : 5 avis reçus, note moyenne 4.6★', time: 'Hier', read: true, type: 'report' },
  { id: 'seed7', agent: 'social', title: 'Rapport hebdomadaire', text: '+12% engagement cette semaine vs. semaine dernière', time: 'Hier', read: true, type: 'report' },
  { id: 'seed8', agent: 'web', title: 'Mise à jour site', text: 'Menu semaine 20 mis à jour sur sushiboy.fr', time: 'Il y a 2j', read: true, type: 'success' },
];

var TYPE_ICONS = {
  deliverable: '📦',
  alert: '⚠️',
  request: '📸',
  success: '✅',
  stats: '📊',
  report: '📈',
};

function getAllNotifs() {
  var live = getNotifications();
  var liveIds = {};
  live.forEach(function(n) { liveIds[n.id] = true; });
  var merged = live.slice();
  SEED_NOTIFS.forEach(function(s) {
    if (!liveIds[s.id]) merged.push(s);
  });
  return merged;
}

export function renderNotifications() {
  var allNotifs = getAllNotifs();
  var unread = allNotifs.filter(function(n) { return !n.read; }).length;

  var items = allNotifs.map(function(n) {
    var agent = AGENTS.find(function(a) { return a.id === n.agent; });
    var agentColor = agent ? agent.color : 'var(--phantom-violet)';
    var agentName = agent ? agent.name : 'Agent';
    var typeIcon = TYPE_ICONS[n.type] || '🔔';

    return '<div class="notif-center-item' + (n.read ? '' : ' notif-center-unread') + '" data-notif-read="' + n.id + '">'
      + '<div class="notif-center-dot" style="background:' + (n.read ? 'transparent' : agentColor) + '"></div>'
      + '<div class="notif-center-icon">' + typeIcon + '</div>'
      + '<div class="notif-center-body">'
        + '<div class="notif-center-title">' + n.title + '</div>'
        + '<div class="notif-center-text">' + (n.text || n.body || '') + '</div>'
        + '<div class="notif-center-meta">'
          + '<span class="notif-center-agent" style="color:' + agentColor + '">' + agentName + '</span>'
          + '<span class="notif-center-time">' + n.time + '</span>'
        + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  var emptyState = allNotifs.length === 0
    ? '<div class="notif-center-empty">'
      + '<div class="notif-center-empty-icon">🔔</div>'
      + '<div class="notif-center-empty-title">Aucune notification</div>'
      + '<div class="notif-center-empty-text">Tes agents rechargent leurs batteries. Tu seras notifié dès qu\'il y a du nouveau.</div>'
    + '</div>'
    : '';

  return '<div class="view-notifications">'
    + '<div class="notif-center-header">'
      + '<div>'
        + '<h2 class="view-title">Notifications</h2>'
        + '<p class="view-subtitle">' + unread + ' non lue' + (unread > 1 ? 's' : '') + '</p>'
      + '</div>'
      + (unread > 0
        ? '<button class="notif-mark-all-btn" data-action="mark-all-read">Tout marquer comme lu</button>'
        : '')
    + '</div>'
    + (emptyState || '<div class="notif-center-list">' + items + '</div>')
  + '</div>';
}

export function markNotifRead(id) {
  var live = getNotifications();
  var found = live.find(function(n) { return n.id === id; });
  if (found) { found.read = true; return; }
  var seed = SEED_NOTIFS.find(function(s) { return s.id === id; });
  if (seed) seed.read = true;
}

export function markAllNotifs() {
  markAllRead();
  SEED_NOTIFS.forEach(function(s) { s.read = true; });
}
