// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Reports & Exports
// ═══════════════════════════════════════════════════════════

var PRESET_REPORTS = [
  { id: 'r1', name: 'Rapport MRR mensuel', desc: 'Évolution MRR, churn, expansion, nouveau.', format: 'PDF', frequency: 'Mensuel (1er)', lastRun: '1 mai 2026', recipients: ['Alex Q.'] },
  { id: 'r2', name: 'Performance agents', desc: 'Taux succès, tâches, valeur par agent et type.', format: 'CSV', frequency: 'Hebdo (lundi)', lastRun: '12 mai 2026', recipients: ['Alex Q.', 'Marie L.'] },
  { id: 'r3', name: 'Rapport client individuel', desc: 'ROI, contenus, métriques pour 1 client.', format: 'PDF', frequency: 'À la demande', lastRun: '10 mai 2026', recipients: ['Client'] },
  { id: 'r4', name: 'Export comptable', desc: 'Toutes factures du mois, format compatible comptabilité.', format: 'CSV', frequency: 'Mensuel (5)', lastRun: '5 mai 2026', recipients: ['Alex Q.'] },
  { id: 'r5', name: 'Dashboard investisseurs', desc: 'ARR, croissance, churn, LTV/CAC, cohortes.', format: 'PDF', frequency: 'Trimestriel', lastRun: '1 avril 2026', recipients: ['Alex Q.'] },
  { id: 'r6', name: 'Audit activité', desc: 'Log complet actions admin, export compliance.', format: 'CSV', frequency: 'À la demande', lastRun: '15 mai 2026', recipients: ['Alex Q.'] },
];

var SCHEDULED_EXPORTS = [
  { report: 'Rapport MRR mensuel', next: '1 juin 2026', format: 'PDF', destination: 'Email + Google Drive' },
  { report: 'Performance agents', next: '26 mai 2026', format: 'CSV', destination: 'Email' },
  { report: 'Export comptable', next: '5 juin 2026', format: 'CSV', destination: 'Email + Sheets' },
];

export function renderReports() {
  var reportCards = PRESET_REPORTS.map(function(r) {
    var formatBadge = r.format === 'PDF'
      ? '<span class="admin-badge admin-badge-pink">PDF</span>'
      : '<span class="admin-badge admin-badge-blue">CSV</span>';

    return '<div class="admin-card">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">'
        + '<div>'
          + '<div style="font-size:14px;font-weight:600">' + r.name + '</div>'
          + '<div style="font-size:12px;color:var(--admin-text-muted);margin-top:3px">' + r.desc + '</div>'
        + '</div>'
        + formatBadge
      + '</div>'
      + '<div style="display:flex;gap:16px;font-size:11px;color:var(--admin-text-muted);margin-bottom:12px">'
        + '<span>📅 ' + r.frequency + '</span>'
        + '<span>🕐 ' + r.lastRun + '</span>'
      + '</div>'
      + '<div style="display:flex;gap:6px">'
        + '<div class="admin-btn admin-btn-primary" data-action="export" style="font-size:11px;padding:5px 12px">Générer</div>'
        + '<div class="admin-btn admin-btn-ghost" style="font-size:11px;padding:5px 12px">Planifier</div>'
      + '</div>'
    + '</div>';
  }).join('');

  var scheduleRows = SCHEDULED_EXPORTS.map(function(s) {
    return '<tr>'
      + '<td><strong>' + s.report + '</strong></td>'
      + '<td>' + s.next + '</td>'
      + '<td>' + s.format + '</td>'
      + '<td style="font-size:12px;color:var(--admin-text-secondary)">' + s.destination + '</td>'
      + '<td><div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:4px 8px">Modifier</div></td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Rapports configurés</div><div class="admin-kpi-value">' + PRESET_REPORTS.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Exports planifiés</div><div class="admin-kpi-value">' + SCHEDULED_EXPORTS.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Exports ce mois</div><div class="admin-kpi-value">14</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Rapports disponibles</div>'
        + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:6px 14px">+ Rapport custom</div>'
      + '</div>'
      + '<div class="admin-grid admin-grid-2" style="gap:12px">' + reportCards + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Exports planifiés</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Rapport</th><th>Prochain</th><th>Format</th><th>Destination</th><th></th></tr></thead><tbody>' + scheduleRows + '</tbody></table>'
      + '</div>'
    + '</div>';
}
