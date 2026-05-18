// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Settings
// ═══════════════════════════════════════════════════════════

var TEAM = [
  { name: 'Alex Quilghini', email: 'alex@phantom.fr', role: 'Super Admin', avatar: 'AQ', color: '#6E3CFF' },
  { name: 'Marie Lefèvre', email: 'marie@phantom.fr', role: 'Pilot', avatar: 'ML', color: '#FF2D87' },
  { name: 'Julie Moreau', email: 'julie@phantom.fr', role: 'Pilot', avatar: 'JM', color: '#6E3CFF' },
  { name: 'Paul Martin', email: 'paul@phantom.fr', role: 'Pilot', avatar: 'PM', color: '#0066FF' },
];

var INTEGRATIONS = [
  { name: 'Stripe', status: 'connected', description: 'Paiements et facturation' },
  { name: 'Meta Business', status: 'connected', description: 'Instagram & Facebook' },
  { name: 'Google Business', status: 'connected', description: 'Google Avis & Maps' },
  { name: 'SendGrid', status: 'connected', description: 'Emails transactionnels' },
  { name: 'OpenAI', status: 'connected', description: 'GPT-4 pour les agents' },
  { name: 'Anthropic', status: 'warning', description: 'Claude — crédits bas' },
  { name: 'Cloudinary', status: 'connected', description: 'Stockage médias' },
  { name: 'Slack', status: 'disconnected', description: 'Notifications internes' },
];

export function renderSettings() {
  var teamRows = TEAM.map(function(t) {
    var roleBadge = t.role === 'Super Admin'
      ? '<span class="admin-badge admin-badge-violet">' + t.role + '</span>'
      : '<span class="admin-badge admin-badge-muted">' + t.role + '</span>';
    return '<tr>'
      + '<td><div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:50%;background:' + t.color + ';display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff">' + t.avatar + '</div><strong>' + t.name + '</strong></div></td>'
      + '<td style="color:var(--admin-text-muted)">' + t.email + '</td>'
      + '<td>' + roleBadge + '</td>'
    + '</tr>';
  }).join('');

  var integrationItems = INTEGRATIONS.map(function(i) {
    var statusBadge = i.status === 'connected'
      ? '<span class="admin-badge admin-badge-green">Connecté</span>'
      : i.status === 'warning'
        ? '<span class="admin-badge admin-badge-orange">Attention</span>'
        : '<span class="admin-badge admin-badge-red">Déconnecté</span>';
    return '<div class="admin-queue-item">'
      + '<div class="admin-queue-info">'
        + '<div class="admin-queue-title">' + i.name + '</div>'
        + '<div class="admin-queue-meta">' + i.description + '</div>'
      + '</div>'
      + statusBadge
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Équipe</div>'
        + '<div class="admin-btn admin-btn-primary">+ Inviter</div>'
      + '</div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Membre</th><th>Email</th><th>Rôle</th></tr></thead><tbody>' + teamRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Intégrations</div></div>'
      + integrationItems
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Plateforme</div></div>'
      + '<div class="admin-grid admin-grid-2">'
        + '<div class="admin-card">'
          + '<div class="admin-card-title" style="margin-bottom:12px">Configuration AI</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:8px">Modèle principal : GPT-4 Turbo</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:8px">Fallback : Claude 3.5 Sonnet</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:8px">Budget mensuel : 450 € / 800 € max</div>'
          + '<div class="admin-progress" style="margin-top:8px"><div class="admin-progress-fill" style="width:56%;background:var(--admin-violet)"></div></div>'
        + '</div>'
        + '<div class="admin-card">'
          + '<div class="admin-card-title" style="margin-bottom:12px">Sécurité</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:8px">2FA : Activé pour tous les admins</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:8px">Sessions : Expiration 24h</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:8px">Audit trail : Activé</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary)">Dernière rotation API keys : 3 mai 2026</div>'
        + '</div>'
      + '</div>'
    + '</div>';
}
