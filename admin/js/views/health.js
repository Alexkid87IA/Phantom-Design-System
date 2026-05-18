// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Client Health Score
//  Composite health metric combining engagement, NPS, usage, churn signals
// ═══════════════════════════════════════════════════════════

var HEALTH_DATA = [
  { client: 'Sushi Boy', score: 96, activity: 'high', lastLogin: 'Il y a 2h', validationSpeed: '3.2h', contentApproval: 95, nps: 10, signals: ['Très engagé', 'Valide vite', 'NPS 10'], risk: 'none' },
  { client: 'Green Garden', score: 94, activity: 'high', lastLogin: 'Il y a 4h', validationSpeed: '5.1h', contentApproval: 92, nps: 9, signals: ['SEO en forte hausse', 'Feedback positif régulier'], risk: 'none' },
  { client: 'Bike & Run', score: 92, activity: 'high', lastLogin: 'Il y a 1h', validationSpeed: '4.8h', contentApproval: 90, nps: 9, signals: ['Multi-agent actif', 'Upgrade récent'], risk: 'none' },
  { client: 'Fleur de Sel', score: 89, activity: 'medium', lastLogin: 'Il y a 8h', validationSpeed: '6.5h', contentApproval: 88, nps: 8, signals: ['Stable', 'Peu de feedback'], risk: 'low' },
  { client: 'Pizza Roma', score: 88, activity: 'medium', lastLogin: 'Il y a 1j', validationSpeed: '8h', contentApproval: 85, nps: 9, signals: ['Nouveau client', 'Enthousiaste'], risk: 'none' },
  { client: 'Chez Marcel', score: 85, activity: 'medium', lastLogin: 'Il y a 6h', validationSpeed: '12h', contentApproval: 82, nps: 8, signals: ['Valide lentement', 'Autonome'], risk: 'low' },
  { client: 'Bella Donna', score: 82, activity: 'medium', lastLogin: 'Il y a 12h', validationSpeed: '10h', contentApproval: 80, nps: 8, signals: ['Demandes de personnalisation fréquentes'], risk: 'low' },
  { client: 'L\'Atelier Zen', score: 75, activity: 'low', lastLogin: 'Il y a 2j', validationSpeed: '18h', contentApproval: 72, nps: 7, signals: ['Connexion en baisse', 'Feedback mitigé'], risk: 'medium' },
  { client: 'Studio Lumière', score: 68, activity: 'low', lastLogin: 'Il y a 3j', validationSpeed: '24h', contentApproval: 65, nps: 6, signals: ['Attentes élevées non rencontrées', 'Peu d\'engagement'], risk: 'medium' },
  { client: 'Maison Dupont', score: 35, activity: 'none', lastLogin: 'Il y a 4j', validationSpeed: '48h+', contentApproval: 40, nps: 4, signals: ['Agent en erreur', 'Pas de connexion', 'Ticket ouvert non résolu'], risk: 'critical' },
];

export function renderHealth() {
  var healthy = HEALTH_DATA.filter(function(h) { return h.score >= 80; }).length;
  var atRisk = HEALTH_DATA.filter(function(h) { return h.score >= 50 && h.score < 80; }).length;
  var critical = HEALTH_DATA.filter(function(h) { return h.score < 50; }).length;
  var avgScore = Math.round(HEALTH_DATA.reduce(function(s, h) { return s + h.score; }, 0) / HEALTH_DATA.length);

  function scoreColor(s) {
    if (s >= 80) return 'var(--admin-green)';
    if (s >= 60) return 'var(--admin-orange)';
    return 'var(--admin-red)';
  }

  function riskBadge(r) {
    if (r === 'critical') return '<span class="admin-badge admin-badge-red">Critique</span>';
    if (r === 'medium') return '<span class="admin-badge admin-badge-orange">À risque</span>';
    if (r === 'low') return '<span class="admin-badge admin-badge-muted">Surveillance</span>';
    return '<span class="admin-badge admin-badge-green">Sain</span>';
  }

  function activityDot(a) {
    var color = a === 'high' ? 'var(--admin-green)' : a === 'medium' ? 'var(--admin-orange)' : a === 'low' ? 'var(--admin-red)' : 'var(--admin-text-muted)';
    return '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + color + '"></span>';
  }

  var cards = HEALTH_DATA.map(function(h) {
    var signalHtml = h.signals.map(function(s) {
      return '<span style="font-size:10px;background:rgba(255,255,255,0.04);border:1px solid var(--admin-border);padding:2px 8px;border-radius:4px">' + s + '</span>';
    }).join(' ');

    return '<div class="admin-card" style="margin-bottom:10px;padding:16px;border-left:3px solid ' + scoreColor(h.score) + '">'
      + '<div style="display:flex;align-items:center;gap:16px">'
        + '<div style="min-width:48px;text-align:center">'
          + '<div style="font-size:22px;font-weight:700;color:' + scoreColor(h.score) + '">' + h.score + '</div>'
          + '<div style="font-size:9px;color:var(--admin-text-muted)">score</div>'
        + '</div>'
        + '<div style="flex:1">'
          + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">'
            + '<strong style="font-size:14px">' + h.client + '</strong>'
            + riskBadge(h.risk)
            + '<span style="margin-left:auto;display:flex;align-items:center;gap:4px">' + activityDot(h.activity) + '<span style="font-size:10px;color:var(--admin-text-muted)">Vu ' + h.lastLogin + '</span></span>'
          + '</div>'
          + '<div style="display:flex;gap:16px;margin-bottom:6px">'
            + '<span style="font-size:11px;color:var(--admin-text-muted)">Validation: <span style="color:var(--admin-text-secondary)">' + h.validationSpeed + '</span></span>'
            + '<span style="font-size:11px;color:var(--admin-text-muted)">Approbation: <span style="color:var(--admin-text-secondary)">' + h.contentApproval + '%</span></span>'
            + '<span style="font-size:11px;color:var(--admin-text-muted)">NPS: <span style="color:' + scoreColor(h.nps * 10) + '">' + h.nps + '</span></span>'
          + '</div>'
          + '<div style="display:flex;gap:4px;flex-wrap:wrap">' + signalHtml + '</div>'
        + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Score santé moyen</div><div class="admin-kpi-value" style="color:' + scoreColor(avgScore) + '">' + avgScore + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Sains (≥80)</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + healthy + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">À risque (50-79)</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + atRisk + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Critiques (&lt;50)</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + critical + '</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Santé client — Score composite</div>'
        + '<div style="display:flex;gap:8px">'
          + '<div class="admin-btn admin-btn-ghost" data-action="export" style="font-size:11px;padding:5px 12px">Export</div>'
          + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:5px 12px">Actions recommandées</div>'
        + '</div>'
      + '</div>'
      + '<div style="font-size:11px;color:var(--admin-text-muted);margin-bottom:16px">Score basé sur : activité (25%) + vitesse validation (20%) + taux approbation (20%) + NPS (20%) + signaux engagement (15%)</div>'
      + cards
    + '</div>';
}
