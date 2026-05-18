// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Automations & Workflows
//  Automated rules running across all client accounts
// ═══════════════════════════════════════════════════════════

var AUTOMATIONS = [
  { id: 'aut1', name: 'Auto-réponse avis 5★', client: 'Tous', trigger: 'Nouvel avis Google 5★', action: 'Générer réponse + publier', status: 'active', runs: 142, lastRun: 'Il y a 3h', successRate: 98 },
  { id: 'aut2', name: 'Relance validation 24h', client: 'Tous', trigger: 'Contenu en attente >24h', action: 'Email relance au client', status: 'active', runs: 67, lastRun: 'Il y a 1h', successRate: 100 },
  { id: 'aut3', name: 'Publication story weekend', client: 'Sushi Boy', trigger: 'Samedi 11:00', action: 'Publier story cuisine du chef', status: 'active', runs: 18, lastRun: 'Il y a 2j', successRate: 94 },
  { id: 'aut4', name: 'Alerte NPS détracteur', client: 'Tous', trigger: 'NPS ≤ 6 reçu', action: 'Notification Slack + créer tâche pilot', status: 'active', runs: 5, lastRun: 'Il y a 4j', successRate: 100 },
  { id: 'aut5', name: 'Backup photos hebdo', client: 'Tous', trigger: 'Dimanche 02:00', action: 'Export photos vers Cloudinary', status: 'active', runs: 24, lastRun: 'Il y a 3j', successRate: 96 },
  { id: 'aut6', name: 'Rapport mensuel auto', client: 'Tous', trigger: '1er du mois, 09:00', action: 'Générer + envoyer rapport au client', status: 'active', runs: 48, lastRun: 'Il y a 16j', successRate: 100 },
  { id: 'aut7', name: 'Réponse avis négatif (draft)', client: 'Tous', trigger: 'Nouvel avis ≤ 3★', action: 'Générer draft + notifier pilot', status: 'active', runs: 23, lastRun: 'Il y a 1j', successRate: 91 },
  { id: 'aut8', name: 'Auto-post citation lundi', client: 'L\'Atelier Zen', trigger: 'Lundi 08:00', action: 'Générer citation bien-être + publier', status: 'paused', runs: 12, lastRun: 'Il y a 8j', successRate: 83 },
  { id: 'aut9', name: 'Détection churn signal', client: 'Tous', trigger: 'Client inactif >5j', action: 'Alerte email pilot + CS', status: 'active', runs: 8, lastRun: 'Il y a 2j', successRate: 100 },
  { id: 'aut10', name: 'Planification contenu semaine', client: 'Green Garden', trigger: 'Lundi 07:00', action: 'Générer planning 7j + notifier pilot', status: 'active', runs: 14, lastRun: 'Il y a 4j', successRate: 100 },
  { id: 'aut11', name: 'Sync menu Uber Eats', client: 'Sushi Boy', trigger: 'Mise à jour menu détectée', action: 'Mettre à jour photos Uber Eats', status: 'error', runs: 9, lastRun: 'Il y a 1j', successRate: 67 },
  { id: 'aut12', name: 'Post Instagram best-of', client: 'Bike & Run', trigger: 'Vendredi 17:00', action: 'Sélectionner meilleur post semaine + republier story', status: 'active', runs: 8, lastRun: 'Il y a 2j', successRate: 100 },
];

export function renderAutomations() {
  var active = AUTOMATIONS.filter(function(a) { return a.status === 'active'; }).length;
  var paused = AUTOMATIONS.filter(function(a) { return a.status === 'paused'; }).length;
  var errored = AUTOMATIONS.filter(function(a) { return a.status === 'error'; }).length;
  var totalRuns = AUTOMATIONS.reduce(function(s, a) { return s + a.runs; }, 0);

  function statusBadge(s) {
    if (s === 'active') return '<span class="admin-badge admin-badge-green">Actif</span>';
    if (s === 'paused') return '<span class="admin-badge admin-badge-orange">Pause</span>';
    return '<span class="admin-badge admin-badge-red">Erreur</span>';
  }

  var rows = AUTOMATIONS.map(function(a) {
    return '<tr>'
      + '<td><strong>' + a.name + '</strong></td>'
      + '<td><span class="admin-badge admin-badge-muted">' + a.client + '</span></td>'
      + '<td style="font-size:12px;color:var(--admin-text-secondary)">' + a.trigger + '</td>'
      + '<td style="font-size:12px">' + a.action + '</td>'
      + '<td>' + statusBadge(a.status) + '</td>'
      + '<td style="font-size:12px">' + a.runs + '</td>'
      + '<td style="font-size:12px;color:' + (a.successRate >= 90 ? 'var(--admin-green)' : 'var(--admin-orange)') + ';font-weight:500">' + a.successRate + '%</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + a.lastRun + '</td>'
    + '</tr>';
  }).join('');

  var recentActivity = [
    { time: 'Il y a 1h', auto: 'Relance validation 24h', client: 'Green Garden', result: 'Email envoyé à Lucas M.' },
    { time: 'Il y a 3h', auto: 'Auto-réponse avis 5★', client: 'Pizza Roma', result: 'Réponse publiée sur Google' },
    { time: 'Il y a 3h', auto: 'Auto-réponse avis 5★', client: 'Fleur de Sel', result: 'Réponse publiée sur Google' },
    { time: 'Il y a 1j', auto: 'Sync menu Uber Eats', client: 'Sushi Boy', result: '❌ Erreur API Uber — timeout' },
    { time: 'Il y a 1j', auto: 'Réponse avis négatif', client: 'Chez Marcel', result: 'Draft envoyé à Marie' },
    { time: 'Il y a 2j', auto: 'Détection churn signal', client: 'Garage Auto+', result: 'Alerte envoyée à Paul' },
  ];

  var activityRows = recentActivity.map(function(a) {
    var isError = a.result.indexOf('❌') >= 0;
    return '<div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--admin-border)">'
      + '<div style="font-size:10px;color:var(--admin-text-muted);min-width:70px;padding-top:2px">' + a.time + '</div>'
      + '<div style="flex:1">'
        + '<div style="font-size:12px;font-weight:500">' + a.auto + '</div>'
        + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:2px">' + a.client + ' → ' + '<span style="color:' + (isError ? 'var(--admin-red)' : 'var(--admin-text-secondary)') + '">' + a.result + '</span></div>'
      + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Automations actives</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + active + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">En pause</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + paused + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">En erreur</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + errored + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Exécutions totales</div><div class="admin-kpi-value">' + totalRuns + '</div></div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1fr 320px;gap:16px">'

      + '<div class="admin-section">'
        + '<div class="admin-section-header">'
          + '<div class="admin-section-title">Toutes les automations</div>'
          + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:5px 14px">+ Nouvelle automation</div>'
        + '</div>'
        + '<div class="admin-card" style="padding:0;overflow:hidden">'
          + '<table class="admin-table">'
            + '<thead><tr><th>Nom</th><th>Client</th><th>Déclencheur</th><th>Action</th><th>Statut</th><th>Runs</th><th>Succès</th><th>Dernier</th></tr></thead>'
            + '<tbody>' + rows + '</tbody>'
          + '</table>'
        + '</div>'
      + '</div>'

      + '<div class="admin-section">'
        + '<div class="admin-section-header"><div class="admin-section-title">Activité récente</div></div>'
        + '<div class="admin-card" style="padding:12px">' + activityRows + '</div>'
      + '</div>'

    + '</div>';
}
