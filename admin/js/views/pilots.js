// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Pilots
// ═══════════════════════════════════════════════════════════

import { PILOTS } from '../data/pilots.js';
import { ALL_AGENTS } from '../data/admin-agents.js';
import { CLIENTS } from '../data/clients.js';

export function renderPilots() {
  var cards = PILOTS.map(function(p) {
    var pilotAgents = ALL_AGENTS.filter(function(a) { return a.pilot === p.name.split(' ')[0]; });
    var pilotClients = CLIENTS.filter(function(c) { return c.pilot === p.name.split(' ')[0]; });
    var totalTasks = pilotAgents.reduce(function(sum, a) { return sum + a.tasks; }, 0);
    var avgSuccess = pilotAgents.length > 0
      ? Math.round(pilotAgents.reduce(function(sum, a) { return sum + a.success; }, 0) / pilotAgents.length)
      : 0;
    var workloadColor = p.workload > 80 ? 'var(--admin-orange)' : 'var(--admin-violet)';

    var clientList = pilotClients.slice(0, 4).map(function(c) {
      return '<span class="admin-badge admin-badge-muted" style="margin-right:4px;margin-bottom:4px">' + c.name + '</span>';
    }).join('');

    return ''
      + '<div class="admin-card" data-pilot="' + p.id + '" style="cursor:pointer">'
        + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">'
          + '<div style="width:40px;height:40px;border-radius:50%;background:' + p.color + ';display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:#fff">' + p.avatar + '</div>'
          + '<div>'
            + '<div style="font-size:15px;font-weight:600">' + p.name + '</div>'
            + '<div style="font-size:11px;color:var(--admin-text-muted)">' + p.role + ' · ' + p.specialties.join(', ') + '</div>'
          + '</div>'
        + '</div>'

        + '<div class="admin-grid admin-grid-4" style="margin-bottom:16px">'
          + '<div><div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase">Clients</div><div style="font-size:18px;font-weight:600">' + pilotClients.length + '</div></div>'
          + '<div><div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase">Agents</div><div style="font-size:18px;font-weight:600">' + pilotAgents.length + '</div></div>'
          + '<div><div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase">Tâches</div><div style="font-size:18px;font-weight:600">' + totalTasks + '</div></div>'
          + '<div><div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase">Qualité</div><div style="font-size:18px;font-weight:600;color:var(--admin-green)">' + p.quality + '%</div></div>'
        + '</div>'

        + '<div style="margin-bottom:12px">'
          + '<div style="display:flex;justify-content:space-between;margin-bottom:5px">'
            + '<span style="font-size:11px;color:var(--admin-text-muted)">Charge de travail</span>'
            + '<span style="font-size:11px;font-weight:600;color:' + workloadColor + '">' + p.workload + '%</span>'
          + '</div>'
          + '<div class="admin-progress"><div class="admin-progress-fill" style="width:' + p.workload + '%;background:' + workloadColor + '"></div></div>'
        + '</div>'

        + '<div style="font-size:11px;color:var(--admin-text-muted);margin-bottom:6px">Clients assignés</div>'
        + '<div style="display:flex;flex-wrap:wrap">' + clientList + '</div>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Total Pilots</div><div class="admin-kpi-value">' + PILOTS.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Charge moyenne</div><div class="admin-kpi-value">' + (PILOTS.length > 0 ? Math.round(PILOTS.reduce(function(s, p) { return s + p.workload; }, 0) / PILOTS.length) : 0) + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Qualité moyenne</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + (PILOTS.length > 0 ? Math.round(PILOTS.reduce(function(s, p) { return s + p.quality; }, 0) / PILOTS.length) : 0) + '%</div></div>'
    + '</div>'
    + '<div class="admin-grid admin-grid-3">' + cards + '</div>';
}
