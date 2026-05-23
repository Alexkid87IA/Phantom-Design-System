// =====================================================
//  VIEW -- Work (produced work items)
// =====================================================

import { getState } from '../store.js';
import { AGENTS, getAgent } from '../data/agents.js';
import { WORK_ITEMS } from '../data/work.js';
import { ghostSvg } from '../lib/icons.js';

function statusClass(s) {
  if (s === 'Publie' || s === 'Envoye') return 'work-status-published';
  if (s === 'En attente') return 'work-status-pending';
  return 'work-status-draft';
}

function statusLabel(s) {
  if (s === 'Publie') return 'En ligne';
  if (s === 'Envoye') return 'Envoyé';
  if (s === 'En attente') return 'À valider';
  return 'Brouillon';
}

function platformIcon(type) {
  if (type === 'Post' || type === 'Story' || type === 'Reel' || type === 'Carousel') return '<span class="work-platform">Instagram</span>';
  if (type === 'Article') return '<span class="work-platform">Blog</span>';
  if (type === 'Réponse' || type === 'Reponse') return '<span class="work-platform">Google</span>';
  if (type === 'Photo') return '<span class="work-platform">Uber Eats</span>';
  return '';
}

export function renderWork() {
  var STATE = getState();
  var agentFilters = [{ id: 'all', name: 'Tout' }].concat(
    AGENTS.filter(function(a) {
      return WORK_ITEMS.some(function(w) { return w.agent === a.id; });
    })
  );

  var filtered = STATE.workFilter === 'all'
    ? WORK_ITEMS
    : WORK_ITEMS.filter(function(w) { return w.agent === STATE.workFilter; });

  var published = WORK_ITEMS.filter(function(w) { return w.status === 'Publie' || w.status === 'Envoye'; }).length;
  var pending = WORK_ITEMS.filter(function(w) { return w.status === 'En attente'; }).length;
  var draft = WORK_ITEMS.filter(function(w) { return w.status === 'Brouillon'; }).length;

  var summaryHtml = ''
    + '<div class="work-summary">'
      + '<div class="work-summary-stat">'
        + '<div class="work-summary-value" style="color:var(--green-600)" data-countup="' + published + '">0</div>'
        + '<div class="work-summary-label">Publiés</div>'
      + '</div>'
      + '<div class="work-summary-stat">'
        + '<div class="work-summary-value" style="color:var(--yellow-600)" data-countup="' + pending + '">0</div>'
        + '<div class="work-summary-label">À valider</div>'
      + '</div>'
      + '<div class="work-summary-stat">'
        + '<div class="work-summary-value" style="color:var(--ink-40)" data-countup="' + draft + '">0</div>'
        + '<div class="work-summary-label">Brouillons</div>'
      + '</div>'
      + '<div class="work-summary-stat">'
        + '<div class="work-summary-value" style="color:var(--phantom-violet)" data-countup="' + WORK_ITEMS.length + '">0</div>'
        + '<div class="work-summary-label">Total ce mois</div>'
      + '</div>'
    + '</div>';

  return ''
    + '<div class="work-view">'
      + '<div class="work-header">'
        + '<div class="work-title">Ce qui s\'est fait</div>'
        + '<div class="work-filters">'
          + agentFilters.map(function(a) {
              return '<button class="work-filter ' + (STATE.workFilter === a.id ? 'active' : '') + '" data-work-filter="' + a.id + '">' + a.name + '</button>';
            }).join('')
        + '</div>'
      + '</div>'
      + summaryHtml
      + (pending > 0 ? '<div class="work-pending-cta"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <strong>' + pending + ' livrable' + (pending > 1 ? 's' : '') + ' en attente</strong> — chaque heure perdue est un client sans réponse. <a data-nav="inbox" class="work-pending-link">Approuver maintenant &rarr;</a></div>' : '')
      + '<div class="work-grid">'
        + filtered.map(function(w) {
            var a = getAgent(w.agent);
            var isLive = w.status === 'Publie' || w.status === 'Envoye';
            var isPending = w.status === 'En attente';
            var impactDraft = (!isLive && w.impact)
              ? '<div class="work-item-impact"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> ' + w.impact + '</div>'
              : '';
            var liveBar = isLive
              ? '<div class="work-item-live-bar">'
                  + '<span class="work-live-pulse"></span>'
                  + '<span class="work-live-label">En direct</span>'
                  + (w.impact ? '<span class="work-live-reach">' + w.impact + '</span>' : '')
                + '</div>'
              : '';
            return '<div class="work-item' + (isLive ? ' work-item-live' : '') + (isPending ? ' work-item-pending' : '') + '" data-agent="' + w.agent + '">'
              + '<span class="work-item-type" style="background:' + w.color + '20;color:' + w.color + '">' + w.type + '</span>'
              + liveBar
              + '<div class="work-item-title">' + w.title + '</div>'
              + impactDraft
              + '<div class="work-item-meta">'
                + '<span class="work-item-agent">' + ghostSvg(a ? a.color : 'var(--ink-30)', 12) + ' ' + (a ? a.name : '') + '</span>'
                + (isLive ? platformIcon(w.type) : '')
                + '<span class="work-item-date">' + w.date + '</span>'
              + '</div>'
              + '<span class="work-item-status ' + statusClass(w.status) + '">' + statusLabel(w.status) + '</span>'
            + '</div>';
          }).join('')
      + '</div>'
    + '</div>';
}
