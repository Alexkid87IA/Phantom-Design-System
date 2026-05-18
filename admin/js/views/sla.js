// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — SLA Monitoring
//  Track delivery and response time commitments per client
// ═══════════════════════════════════════════════════════════

var SLA_DATA = [
  { client: 'Sushi Boy', plan: 'Pro', contentSla: 24, actualContent: 18, responseSla: 4, actualResponse: 1.2, publishSla: 48, actualPublish: 32, score: 98, trend: 'up' },
  { client: 'Chez Marcel', plan: 'Pro', contentSla: 24, actualContent: 22, responseSla: 4, actualResponse: 2.8, publishSla: 48, actualPublish: 44, score: 91, trend: 'stable' },
  { client: 'Bella Donna', plan: 'Starter', contentSla: 48, actualContent: 36, responseSla: 8, actualResponse: 5.5, publishSla: 72, actualPublish: 60, score: 94, trend: 'up' },
  { client: 'Green Garden', plan: 'Scale', contentSla: 12, actualContent: 10, responseSla: 2, actualResponse: 1.5, publishSla: 24, actualPublish: 18, score: 96, trend: 'up' },
  { client: 'Maison Dupont', plan: 'Pro', contentSla: 24, actualContent: 52, responseSla: 4, actualResponse: 12.0, publishSla: 48, actualPublish: 96, score: 42, trend: 'down' },
  { client: 'Bike & Run', plan: 'Scale', contentSla: 12, actualContent: 11, responseSla: 2, actualResponse: 1.8, publishSla: 24, actualPublish: 20, score: 95, trend: 'stable' },
  { client: 'L\'Atelier Zen', plan: 'Starter', contentSla: 48, actualContent: 40, responseSla: 8, actualResponse: 6.0, publishSla: 72, actualPublish: 55, score: 92, trend: 'stable' },
  { client: 'Pizza Roma', plan: 'Starter', contentSla: 48, actualContent: 30, responseSla: 8, actualResponse: 3.0, publishSla: 72, actualPublish: 48, score: 97, trend: 'up' },
  { client: 'Fleur de Sel', plan: 'Pro', contentSla: 24, actualContent: 20, responseSla: 4, actualResponse: 2.2, publishSla: 48, actualPublish: 36, score: 95, trend: 'up' },
  { client: 'Studio Lumière', plan: 'Starter', contentSla: 48, actualContent: 44, responseSla: 8, actualResponse: 7.0, publishSla: 72, actualPublish: 68, score: 88, trend: 'down' },
];

var SLA_INCIDENTS = [
  { date: '16/05', client: 'Maison Dupont', type: 'Contenu', sla: '24h', actual: '52h', cause: 'Agent Social en erreur — token expiré', resolved: false },
  { date: '15/05', client: 'Maison Dupont', type: 'Réponse', sla: '4h', actual: '12h', cause: 'Pas de pilot assigné en backup', resolved: false },
  { date: '14/05', client: 'Studio Lumière', type: 'Publication', sla: '72h', actual: '68h', cause: 'Limite quasi atteinte — client lent à valider', resolved: true },
  { date: '12/05', client: 'Chez Marcel', type: 'Contenu', sla: '24h', actual: '26h', cause: 'Surcharge pilot Marie — 3 urgences en parallèle', resolved: true },
  { date: '10/05', client: 'L\'Atelier Zen', type: 'Réponse', sla: '8h', actual: '9h', cause: 'Message weekend non routé', resolved: true },
];

export function renderSla() {
  var avgScore = Math.round(SLA_DATA.reduce(function(s, d) { return s + d.score; }, 0) / SLA_DATA.length);
  var breaches = SLA_DATA.filter(function(d) { return d.score < 80; }).length;
  var atRisk = SLA_DATA.filter(function(d) { return d.score >= 80 && d.score < 90; }).length;
  var compliant = SLA_DATA.filter(function(d) { return d.score >= 90; }).length;

  function scoreColor(s) {
    if (s >= 90) return 'var(--admin-green)';
    if (s >= 80) return 'var(--admin-orange)';
    return 'var(--admin-red)';
  }

  function trendIcon(t) {
    if (t === 'up') return '<span style="color:var(--admin-green)">↑</span>';
    if (t === 'down') return '<span style="color:var(--admin-red)">↓</span>';
    return '<span style="color:var(--admin-text-muted)">→</span>';
  }

  function progressBar(actual, sla) {
    var pct = Math.min(Math.round((actual / sla) * 100), 150);
    var color = pct <= 75 ? 'var(--admin-green)' : pct <= 100 ? 'var(--admin-orange)' : 'var(--admin-red)';
    return '<div style="display:flex;align-items:center;gap:6px">'
      + '<div style="flex:1;height:4px;background:var(--admin-border);border-radius:2px;overflow:hidden">'
        + '<div style="width:' + Math.min(pct, 100) + '%;height:100%;background:' + color + ';border-radius:2px"></div>'
      + '</div>'
      + '<span style="font-size:10px;color:' + color + ';min-width:32px">' + actual + '/' + sla + 'h</span>'
    + '</div>';
  }

  var rows = SLA_DATA.map(function(d) {
    return '<tr>'
      + '<td><strong>' + d.client + '</strong></td>'
      + '<td><span class="admin-badge admin-badge-muted">' + d.plan + '</span></td>'
      + '<td>' + progressBar(d.actualContent, d.contentSla) + '</td>'
      + '<td>' + progressBar(d.actualResponse, d.responseSla) + '</td>'
      + '<td>' + progressBar(d.actualPublish, d.publishSla) + '</td>'
      + '<td style="font-weight:600;color:' + scoreColor(d.score) + '">' + d.score + '%</td>'
      + '<td>' + trendIcon(d.trend) + '</td>'
    + '</tr>';
  }).join('');

  var incidentRows = SLA_INCIDENTS.map(function(i) {
    return '<tr>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + i.date + '</td>'
      + '<td><strong>' + i.client + '</strong></td>'
      + '<td><span class="admin-badge admin-badge-muted">' + i.type + '</span></td>'
      + '<td style="font-size:12px"><span style="color:var(--admin-text-muted)">' + i.sla + '</span> → <span style="color:var(--admin-red);font-weight:500">' + i.actual + '</span></td>'
      + '<td style="font-size:11px;color:var(--admin-text-secondary)">' + i.cause + '</td>'
      + '<td>' + (i.resolved ? '<span class="admin-badge admin-badge-green">Résolu</span>' : '<span class="admin-badge admin-badge-red">Ouvert</span>') + '</td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Score SLA global</div><div class="admin-kpi-value" style="color:' + scoreColor(avgScore) + '">' + avgScore + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Conformes (≥90%)</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + compliant + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">À risque (80-90%)</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + atRisk + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">En breach (&lt;80%)</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + breaches + '</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">SLA par client</div>'
        + '<div class="admin-btn admin-btn-ghost" data-action="export" style="font-size:11px;padding:5px 12px">Export CSV</div>'
      + '</div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table">'
          + '<thead><tr><th>Client</th><th>Plan</th><th>Création contenu</th><th>Temps réponse</th><th>Publication</th><th>Score</th><th>Trend</th></tr></thead>'
          + '<tbody>' + rows + '</tbody>'
        + '</table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Incidents SLA récents</div>'
        + '<span class="admin-badge admin-badge-red">' + SLA_INCIDENTS.filter(function(i) { return !i.resolved; }).length + ' ouverts</span>'
      + '</div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table">'
          + '<thead><tr><th>Date</th><th>Client</th><th>Type</th><th>SLA → Réel</th><th>Cause</th><th>Statut</th></tr></thead>'
          + '<tbody>' + incidentRows + '</tbody>'
        + '</table>'
      + '</div>'
    + '</div>';
}
