// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Team Workload & Capacity
//  Pilot capacity planning and workload distribution
// ═══════════════════════════════════════════════════════════

import { ALL_AGENTS } from '../data/admin-agents.js';

var PILOTS = [
  { id: 'pilot1', name: 'Marie', role: 'Lead Pilot', maxClients: 5, currentClients: 4, maxAgents: 12, satisfaction: 96 },
  { id: 'pilot2', name: 'Paul', role: 'Senior Pilot', maxClients: 6, currentClients: 5, maxAgents: 15, satisfaction: 92 },
  { id: 'pilot3', name: 'Julie', role: 'Pilot', maxClients: 4, currentClients: 4, maxAgents: 10, satisfaction: 94 },
];

var UPCOMING_CAPACITY = [
  { date: '19/05', event: 'Onboarding "Le Comptoir"', pilot: 'Paul', impact: '+2 agents', type: 'increase' },
  { date: '22/05', event: 'Vacances Julie (3j)', pilot: 'Julie', impact: '-4 agents à couvrir', type: 'decrease' },
  { date: '01/06', event: 'Nouveau pilot (Léa)', pilot: 'Équipe', impact: '+1 pilot, +4 slots', type: 'increase' },
  { date: '05/06', event: 'Upgrade Green Garden → Scale', pilot: 'Paul', impact: '+2 agents', type: 'increase' },
];

export function renderWorkload() {
  var pilotCards = PILOTS.map(function(p) {
    var agents = ALL_AGENTS.filter(function(a) { return a.pilot === p.name; });
    var activeAgents = agents.filter(function(a) { return a.status === 'active' || a.status === 'waiting'; }).length;
    var totalAgents = agents.length;
    var capacityPct = Math.round((totalAgents / p.maxAgents) * 100);
    var clientLoad = Math.round((p.currentClients / p.maxClients) * 100);

    var capacityColor = capacityPct >= 90 ? 'var(--admin-red)' : capacityPct >= 70 ? 'var(--admin-orange)' : 'var(--admin-green)';
    var clientColor = clientLoad >= 90 ? 'var(--admin-red)' : clientLoad >= 70 ? 'var(--admin-orange)' : 'var(--admin-green)';

    var clientList = [];
    agents.forEach(function(a) {
      if (clientList.indexOf(a.client) === -1) clientList.push(a.client);
    });

    return '<div class="admin-card" style="padding:20px">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">'
        + '<div>'
          + '<div style="font-size:16px;font-weight:600">' + p.name + '</div>'
          + '<div style="font-size:12px;color:var(--admin-text-muted)">' + p.role + '</div>'
        + '</div>'
        + '<div style="text-align:right">'
          + '<div style="font-size:20px;font-weight:700;color:' + capacityColor + '">' + capacityPct + '%</div>'
          + '<div style="font-size:10px;color:var(--admin-text-muted)">capacité</div>'
        + '</div>'
      + '</div>'

      + '<div style="margin-bottom:12px">'
        + '<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px"><span style="color:var(--admin-text-muted)">Agents</span><span>' + totalAgents + '/' + p.maxAgents + '</span></div>'
        + '<div style="height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden"><div style="width:' + capacityPct + '%;height:100%;background:' + capacityColor + ';border-radius:3px"></div></div>'
      + '</div>'

      + '<div style="margin-bottom:12px">'
        + '<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px"><span style="color:var(--admin-text-muted)">Clients</span><span>' + p.currentClients + '/' + p.maxClients + '</span></div>'
        + '<div style="height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden"><div style="width:' + clientLoad + '%;height:100%;background:' + clientColor + ';border-radius:3px"></div></div>'
      + '</div>'

      + '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--admin-border)">'
        + '<div style="font-size:11px;color:var(--admin-text-muted)">' + clientList.join(' · ') + '</div>'
        + '<div style="font-size:11px;color:var(--admin-green);font-weight:500">Sat. ' + p.satisfaction + '%</div>'
      + '</div>'
    + '</div>';
  }).join('');

  var totalAgents = ALL_AGENTS.filter(function(a) { return a.status !== 'paused'; }).length;
  var totalCapacity = PILOTS.reduce(function(s, p) { return s + p.maxAgents; }, 0);
  var globalCapacity = Math.round((totalAgents / totalCapacity) * 100);
  var totalClients = PILOTS.reduce(function(s, p) { return s + p.currentClients; }, 0);
  var maxClients = PILOTS.reduce(function(s, p) { return s + p.maxClients; }, 0);

  var eventRows = UPCOMING_CAPACITY.map(function(e) {
    var icon = e.type === 'increase' ? '<span style="color:var(--admin-green)">↑</span>' : '<span style="color:var(--admin-red)">↓</span>';
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--admin-border)">'
      + '<span style="font-size:11px;color:var(--admin-text-muted);min-width:45px">' + e.date + '</span>'
      + icon
      + '<div style="flex:1">'
        + '<div style="font-size:12px;font-weight:500">' + e.event + '</div>'
        + '<div style="font-size:10px;color:var(--admin-text-muted)">' + e.pilot + ' · ' + e.impact + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Capacité globale</div><div class="admin-kpi-value" style="color:' + (globalCapacity >= 85 ? 'var(--admin-orange)' : 'var(--admin-green)') + '">' + globalCapacity + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Pilots actifs</div><div class="admin-kpi-value">' + PILOTS.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Clients gérés</div><div class="admin-kpi-value">' + totalClients + '/' + maxClients + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Agents supervisés</div><div class="admin-kpi-value">' + totalAgents + '/' + totalCapacity + '</div></div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1fr 320px;gap:16px">'

      + '<div class="admin-section">'
        + '<div class="admin-section-header">'
          + '<div class="admin-section-title">Charge par pilot</div>'
          + '<div class="admin-btn admin-btn-ghost" style="font-size:11px;padding:5px 12px">Rééquilibrer</div>'
        + '</div>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">'
          + pilotCards
        + '</div>'
      + '</div>'

      + '<div class="admin-section">'
        + '<div class="admin-section-header"><div class="admin-section-title">Prévisions capacité</div></div>'
        + '<div class="admin-card" style="padding:14px">'
          + eventRows
        + '</div>'

        + '<div class="admin-card" style="padding:14px;margin-top:12px;background:rgba(110,60,255,0.04);border-color:rgba(110,60,255,0.15)">'
          + '<div style="font-size:12px;font-weight:600;color:var(--admin-violet);margin-bottom:6px">Recommandation</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary)">Avec l\'onboarding prévu + les vacances de Julie, la capacité atteindra <strong>95%</strong> la semaine du 22/05. Envisager :</div>'
          + '<ul style="font-size:11px;color:var(--admin-text-secondary);margin:6px 0 0 16px;padding:0">'
            + '<li>Redistribuer 2 clients de Julie vers Paul</li>'
            + '<li>Ou reporter l\'onboarding d\'une semaine</li>'
          + '</ul>'
        + '</div>'
      + '</div>'

    + '</div>';
}
