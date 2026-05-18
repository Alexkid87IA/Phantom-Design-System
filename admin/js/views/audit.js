// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Audit Trail
// ═══════════════════════════════════════════════════════════

var AUDIT_LOG = [
  { id: 'au1', user: 'Alex Q.', action: 'Approuvé contenu', target: 'Post Instagram — Sushi Boy', time: 'Il y a 15 min', type: 'content' },
  { id: 'au2', user: 'Marie L.', action: 'Créé agent', target: 'Social Manager — Pizza Roma', time: 'Il y a 1h', type: 'agent' },
  { id: 'au3', user: 'Paul M.', action: 'Mis en pause agent', target: 'Social Manager — Garage Auto+', time: 'Il y a 2h', type: 'agent' },
  { id: 'au4', user: 'System', action: 'Facture émise', target: 'Maison Dupont — 890 €', time: 'Il y a 3h', type: 'billing' },
  { id: 'au5', user: 'Julie M.', action: 'Rejeté contenu', target: 'Carousel — Bella Donna', time: 'Il y a 4h', type: 'content' },
  { id: 'au6', user: 'Alex Q.', action: 'Modifié plan', target: 'Chez Marcel → Croissance', time: 'Il y a 5h', type: 'billing' },
  { id: 'au7', user: 'Marie L.', action: 'Répondu avis', target: 'Avis 2★ Thomas R. — Sushi Boy', time: 'Il y a 6h', type: 'content' },
  { id: 'au8', user: 'System', action: 'Alerte créée', target: 'Maison Dupont — Agent en erreur', time: 'Il y a 7h', type: 'alert' },
  { id: 'au9', user: 'Paul M.', action: 'Relancé client', target: 'L\'Atelier Zen — facture mai', time: 'Il y a 8h', type: 'billing' },
  { id: 'au10', user: 'Alex Q.', action: 'Invité membre', target: 'Julie Moreau — rôle Pilot', time: 'Hier', type: 'team' },
  { id: 'au11', user: 'System', action: 'Backup DB', target: 'Snapshot quotidien', time: 'Hier 03:00', type: 'system' },
  { id: 'au12', user: 'Marie L.', action: 'Publié contenu', target: 'Reel — Chez Marcel', time: 'Hier', type: 'content' },
];

var TYPE_COLORS = {
  content: 'var(--admin-violet)',
  agent: 'var(--admin-blue)',
  billing: 'var(--admin-green)',
  alert: 'var(--admin-red)',
  team: 'var(--admin-orange)',
  system: 'var(--admin-text-muted)',
};

export function renderAudit() {
  var rows = AUDIT_LOG.map(function(log) {
    var dotColor = TYPE_COLORS[log.type] || 'var(--admin-text-muted)';
    return '<tr>'
      + '<td><div style="width:6px;height:6px;border-radius:50%;background:' + dotColor + ';display:inline-block;margin-right:8px"></div>' + log.user + '</td>'
      + '<td>' + log.action + '</td>'
      + '<td style="color:var(--admin-text-secondary)">' + log.target + '</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + log.time + '</td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Actions aujourd\'hui</div><div class="admin-kpi-value">9</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Utilisateurs actifs</div><div class="admin-kpi-value">4</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Actions système</div><div class="admin-kpi-value">2</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Journal d\'audit</div>'
        + '<div class="admin-btn admin-btn-ghost" data-action="export">Exporter</div>'
      + '</div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Utilisateur</th><th>Action</th><th>Cible</th><th>Quand</th></tr></thead><tbody>' + rows + '</tbody></table>'
      + '</div>'
    + '</div>';
}
