// ═══════════════════════════════════════════════════════════
//  HELPERS — Utility functions
// ═══════════════════════════════════════════════════════════

import { AGENTS } from '../data/agents.js';
import { getFeed } from '../data/feed.js';
import { getInboxItems } from '../data/inbox.js';

export function statusColor(status) {
  if (status === 'active') return 'var(--rainbow-green)';
  if (status === 'waiting') return 'var(--rainbow-yellow)';
  return 'var(--ink-20)';
}

export function statusLabel(status) {
  if (status === 'active') return 'Actif';
  if (status === 'waiting') return 'En attente';
  return 'Inactif';
}

export function formatDate() {
  var d = new Date();
  var jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  var mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  var h = String(d.getHours()).padStart(2, '0');
  var m = String(d.getMinutes()).padStart(2, '0');
  return jours[d.getDay()] + ' ' + d.getDate() + ' ' + mois[d.getMonth()] + ' · ' + h + ':' + m;
}

export function activeAgentCount() {
  return AGENTS.filter(function(a) { return a.status === 'active'; }).length;
}

export function pendingCount() {
  return getFeed().filter(function(f) { return f.status === 'waiting'; }).length + getInboxItems().length;
}

export function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
