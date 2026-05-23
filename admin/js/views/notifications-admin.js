// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Notifications & Email Templates
// ═══════════════════════════════════════════════════════════

var EMAIL_TEMPLATES = [
  { id: 'e1', name: 'Bienvenue', trigger: 'Inscription confirmée', subject: 'Bienvenue chez Phantom !', lastEdited: '12 avril 2026', sends: 47, openRate: 78 },
  { id: 'e2', name: 'Rapport hebdomadaire', trigger: 'Dimanche 20h (auto)', subject: 'Ta semaine en un coup d\'œil', lastEdited: '3 mai 2026', sends: 612, openRate: 65 },
  { id: 'e3', name: 'Livrable prêt', trigger: 'Validation requise', subject: '[Agent] a préparé un contenu pour toi', lastEdited: '28 avril 2026', sends: 890, openRate: 72 },
  { id: 'e4', name: 'Facture', trigger: 'Paiement réussi', subject: 'Facture Phantom — {{mois}}', lastEdited: '10 mars 2026', sends: 156, openRate: 54 },
  { id: 'e5', name: 'Avis urgent', trigger: 'Avis ≤2★ détecté', subject: '⚠️ Avis négatif détecté — {{client}}', lastEdited: '1 mai 2026', sends: 23, openRate: 91 },
  { id: 'e6', name: 'Relance paiement', trigger: 'Facture J+3 impayée', subject: 'Rappel : ta facture est en attente', lastEdited: '15 avril 2026', sends: 8, openRate: 60 },
  { id: 'e7', name: 'Win-back', trigger: 'Manuel (admin)', subject: 'Tu nous manques — voici ce que tes agents ont accompli', lastEdited: '20 avril 2026', sends: 3, openRate: 67 },
];

var PUSH_CONFIG = [
  { channel: 'In-app', enabled: true, events: 'Livrable, avis, facture, alerte agent' },
  { channel: 'Email', enabled: true, events: 'Rapport hebdo, facture, avis urgent, relance' },
  { channel: 'Push Web', enabled: false, events: 'Avis urgent, livrable prioritaire' },
  { channel: 'SMS', enabled: false, events: 'Non configuré' },
];

var SMTP_CONFIG = {
  provider: 'SendGrid',
  from: 'hello@phantom.fr',
  replyTo: 'support@phantom.fr',
  domain: 'phantom.fr',
  dkim: true,
  spf: true,
};

export function renderNotificationsAdmin() {
  var templateRows = EMAIL_TEMPLATES.map(function(t) {
    return '<tr>'
      + '<td><strong>' + t.name + '</strong></td>'
      + '<td style="font-size:12px;color:var(--admin-text-secondary)">' + t.trigger + '</td>'
      + '<td style="font-size:12px">' + t.subject + '</td>'
      + '<td>' + t.sends + '</td>'
      + '<td style="color:var(--admin-green)">' + t.openRate + '%</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + t.lastEdited + '</td>'
      + '<td><div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:4px 8px">Éditer</div></td>'
    + '</tr>';
  }).join('');

  var pushRows = PUSH_CONFIG.map(function(p) {
    var badge = p.enabled
      ? '<span class="admin-badge admin-badge-green">Actif</span>'
      : '<span class="admin-badge admin-badge-muted">Inactif</span>';
    return '<tr>'
      + '<td><strong>' + p.channel + '</strong></td>'
      + '<td>' + badge + '</td>'
      + '<td style="font-size:12px;color:var(--admin-text-secondary)">' + p.events + '</td>'
      + '<td><div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:4px 8px">Config</div></td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Templates email</div><div class="admin-kpi-value">' + EMAIL_TEMPLATES.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Emails envoyés (mois)</div><div class="admin-kpi-value">1 739</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Taux ouverture moy.</div><div class="admin-kpi-value" style="color:var(--admin-green)">70%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Canaux actifs</div><div class="admin-kpi-value">2/4</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Templates emails transactionnels</div>'
        + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:6px 14px">+ Nouveau template</div>'
      + '</div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Nom</th><th>Déclencheur</th><th>Sujet</th><th>Envois</th><th>Ouverture</th><th>Modifié</th><th></th></tr></thead><tbody>' + templateRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Canaux de notification</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Canal</th><th>Statut</th><th>Événements</th><th></th></tr></thead><tbody>' + pushRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Configuration SMTP</div></div>'
      + '<div class="admin-card">'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
          + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Provider</span><div style="font-size:13px;font-weight:500;margin-top:2px">' + SMTP_CONFIG.provider + '</div></div>'
          + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">From</span><div style="font-size:13px;font-weight:500;margin-top:2px">' + SMTP_CONFIG.from + '</div></div>'
          + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Reply-To</span><div style="font-size:13px;font-weight:500;margin-top:2px">' + SMTP_CONFIG.replyTo + '</div></div>'
          + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Domaine</span><div style="font-size:13px;font-weight:500;margin-top:2px">' + SMTP_CONFIG.domain + '</div></div>'
          + '<div style="padding:8px 0"><span style="font-size:12px;color:var(--admin-text-muted)">DKIM</span><div style="margin-top:2px"><span class="admin-badge admin-badge-green">Vérifié</span></div></div>'
          + '<div style="padding:8px 0"><span style="font-size:12px;color:var(--admin-text-muted)">SPF</span><div style="margin-top:2px"><span class="admin-badge admin-badge-green">Vérifié</span></div></div>'
        + '</div>'
      + '</div>'
    + '</div>';
}
