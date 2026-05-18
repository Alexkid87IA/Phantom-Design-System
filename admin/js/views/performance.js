// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Agent Performance
// ═══════════════════════════════════════════════════════════

import { ALL_AGENTS } from '../data/admin-agents.js';

export function renderPerformance() {
  var byType = {};
  ALL_AGENTS.forEach(function(a) {
    if (!byType[a.type]) byType[a.type] = { agents: [], totalTasks: 0, totalSuccess: 0, totalValue: 0 };
    byType[a.type].agents.push(a);
    byType[a.type].totalTasks += a.tasks;
    byType[a.type].totalSuccess += a.success;
    byType[a.type].totalValue += a.value;
  });

  var typeNames = { social: 'Social Manager', google: 'Avis Google', photos: 'Photos', seo: 'SEO', web: 'Site Web', brand: 'Brand B2C' };
  var typeColors = { social: '#FF2D87', google: '#FFD400', photos: '#00D26A', seo: '#0066FF', web: '#6E3CFF', brand: '#FF8A1F' };

  var typeCards = Object.keys(byType).map(function(type) {
    var data = byType[type];
    var avgSuccess = Math.round(data.totalSuccess / data.agents.length);
    var avgTasks = Math.round(data.totalTasks / data.agents.length);
    return '<div class="admin-card">'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">'
        + '<div style="width:10px;height:10px;border-radius:50%;background:' + (typeColors[type] || '#6E3CFF') + '"></div>'
        + '<div style="font-size:14px;font-weight:600">' + (typeNames[type] || type) + '</div>'
        + '<span class="admin-badge admin-badge-muted" style="margin-left:auto">' + data.agents.length + ' agents</span>'
      + '</div>'
      + '<div class="admin-grid admin-grid-3" style="gap:10px">'
        + '<div><div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase">Tâches moy.</div><div style="font-size:18px;font-weight:600">' + avgTasks + '</div></div>'
        + '<div><div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase">Succès moy.</div><div style="font-size:18px;font-weight:600;color:' + (avgSuccess >= 90 ? 'var(--admin-green)' : 'var(--admin-orange)') + '">' + avgSuccess + '%</div></div>'
        + '<div><div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase">Valeur totale</div><div style="font-size:18px;font-weight:600;color:var(--admin-green)">' + data.totalValue.toLocaleString('fr-FR') + '€</div></div>'
      + '</div>'
    + '</div>';
  }).join('');

  var topAgents = ALL_AGENTS.slice().sort(function(a, b) { return b.value - a.value; }).slice(0, 10);
  var topRows = topAgents.map(function(a, i) {
    return '<tr>'
      + '<td style="font-weight:600;color:var(--admin-text-muted)">#' + (i + 1) + '</td>'
      + '<td><strong>' + a.name + '</strong></td>'
      + '<td>' + a.client + '</td>'
      + '<td>' + a.tasks + '</td>'
      + '<td>' + a.success + '%</td>'
      + '<td style="color:var(--admin-green);font-weight:600">' + a.value.toLocaleString('fr-FR') + ' €</td>'
    + '</tr>';
  }).join('');

  var lowPerf = ALL_AGENTS.filter(function(a) { return a.success < 85 || a.status === 'error'; });
  var lowRows = lowPerf.map(function(a) {
    return '<tr>'
      + '<td><strong>' + a.name + '</strong></td>'
      + '<td>' + a.client + '</td>'
      + '<td style="color:var(--admin-red)">' + a.success + '%</td>'
      + '<td>' + a.status + '</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + a.lastAction + '</td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Performance par type d\'agent</div></div>'
      + '<div class="admin-grid admin-grid-3">' + typeCards + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Top 10 agents (par valeur générée)</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>#</th><th>Agent</th><th>Client</th><th>Tâches</th><th>Succès</th><th>Valeur</th></tr></thead><tbody>' + topRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + (lowPerf.length > 0 ? '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Sous-performance détectée</div><span class="admin-badge admin-badge-red">' + lowPerf.length + '</span></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Agent</th><th>Client</th><th>Succès</th><th>Statut</th><th>Dernière action</th></tr></thead><tbody>' + lowRows + '</tbody></table>'
      + '</div>'
    + '</div>' : '');
}
