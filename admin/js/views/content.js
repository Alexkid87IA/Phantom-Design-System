// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Content queue
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { CONTENT_QUEUE, pendingContent } from '../data/admin-agents.js';

export function renderContent() {
  var STATE = getState();
  var filter = STATE.filter || 'all';

  var filtered = filter === 'all'
    ? CONTENT_QUEUE
    : CONTENT_QUEUE.filter(function(c) { return c.status === filter; });

  var counts = {
    all: CONTENT_QUEUE.length,
    pending_pilot: CONTENT_QUEUE.filter(function(c) { return c.status === 'pending_pilot'; }).length,
    pending_client: CONTENT_QUEUE.filter(function(c) { return c.status === 'pending_client'; }).length,
    approved: CONTENT_QUEUE.filter(function(c) { return c.status === 'approved'; }).length,
  };

  var filters = [
    { id: 'all', label: 'Tous (' + counts.all + ')' },
    { id: 'pending_pilot', label: 'Review pilot (' + counts.pending_pilot + ')' },
    { id: 'pending_client', label: 'Attente client (' + counts.pending_client + ')' },
    { id: 'approved', label: 'Approuvé (' + counts.approved + ')' },
  ];

  var filterHtml = filters.map(function(f) {
    return '<div class="admin-filter-btn' + (filter === f.id ? ' admin-filter-active' : '') + '" data-filter="' + f.id + '">' + f.label + '</div>';
  }).join('');

  var items = filtered.map(function(c) {
    var badge = c.status === 'pending_client'
      ? '<span class="admin-badge admin-badge-orange">Attente client</span>'
      : c.status === 'pending_pilot'
        ? '<span class="admin-badge admin-badge-violet">Review pilot</span>'
        : '<span class="admin-badge admin-badge-green">Approuvé</span>';

    var actions = '';
    if (c.status === 'pending_pilot') {
      actions = '<div class="admin-queue-actions">'
        + '<div class="admin-btn admin-btn-primary" data-action="approve" style="font-size:11px;padding:5px 10px">Approuver</div>'
        + '<div class="admin-btn admin-btn-ghost" data-action="reject" style="font-size:11px;padding:5px 10px">Rejeter</div>'
      + '</div>';
    } else if (c.status === 'pending_client') {
      actions = '<div class="admin-queue-actions">'
        + '<div class="admin-btn admin-btn-ghost" data-action="remind" style="font-size:11px;padding:5px 10px">Relancer</div>'
      + '</div>';
    }

    return '<div class="admin-queue-item">'
      + '<div style="width:6px;height:6px;border-radius:50%;background:' + (c.status === 'approved' ? 'var(--admin-green)' : c.status === 'pending_pilot' ? 'var(--admin-violet)' : 'var(--admin-orange)') + ';flex-shrink:0"></div>'
      + '<div class="admin-queue-info">'
        + '<div class="admin-queue-title">' + c.title + '</div>'
        + '<div class="admin-queue-meta">' + c.client + ' · ' + c.agent + ' · ' + c.type + ' · ' + c.since + '</div>'
      + '</div>'
      + badge
      + actions
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Total en file</div><div class="admin-kpi-value">' + CONTENT_QUEUE.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Attente pilot</div><div class="admin-kpi-value" style="color:var(--admin-violet)">' + counts.pending_pilot + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Attente client</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + counts.pending_client + '</div></div>'
    + '</div>'
    + '<div class="admin-section">'
      + '<div class="admin-filters">' + filterHtml + '</div>'
    + '</div>'
    + items;
}
