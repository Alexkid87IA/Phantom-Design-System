// ═══════════════════════════════════════════════════════════
//  VIEW — Help Center (client-facing support & documentation)
// ═══════════════════════════════════════════════════════════

var HELP_ARTICLES = [
  { id: 'h1', category: 'Démarrage', title: 'Comment valider un contenu', desc: 'Approuve ou demande des modifications en un clic', icon: '✓' },
  { id: 'h2', category: 'Démarrage', title: 'Parler à ton agent', desc: 'Utilise le chat pour donner des instructions ou du feedback', icon: '💬' },
  { id: 'h3', category: 'Démarrage', title: 'Comprendre ton tableau de bord', desc: 'KPIs, ROI, activité des agents — tout est là', icon: '📊' },
  { id: 'h4', category: 'Agents', title: 'Modifier le brief d\'un agent', desc: 'Ajuste la direction créative à tout moment', icon: '✏️' },
  { id: 'h5', category: 'Agents', title: 'Mettre un agent en pause', desc: 'Stoppe temporairement un agent sans le supprimer', icon: '⏸' },
  { id: 'h6', category: 'Agents', title: 'Ajouter un nouvel agent', desc: 'Étends ton équipe avec un agent supplémentaire', icon: '➕' },
  { id: 'h7', category: 'Compte', title: 'Gérer ton abonnement', desc: 'Upgrade, downgrade, ou annuler ton plan', icon: '💳' },
  { id: 'h8', category: 'Compte', title: 'Inviter un collaborateur', desc: 'Ajoute des membres de ton équipe à Phantom', icon: '👥' },
  { id: 'h9', category: 'Compte', title: 'Connecter tes réseaux sociaux', desc: 'Lie Instagram, Facebook, Google Business', icon: '🔗' },
];

var RECENT_TICKETS = [
  { id: 't1', subject: 'Horaires affichés incorrects sur Google', status: 'resolved', date: 'Il y a 3j' },
  { id: 't2', subject: 'Demande de style plus coloré', status: 'resolved', date: 'Il y a 1sem' },
];

export function renderHelp() {
  var categories = {};
  HELP_ARTICLES.forEach(function(a) {
    if (!categories[a.category]) categories[a.category] = [];
    categories[a.category].push(a);
  });

  var categoryHtml = Object.keys(categories).map(function(cat) {
    var articles = categories[cat].map(function(a) {
      return '<div class="work-item help-article" data-action="help-article" data-help-id="' + a.id + '" role="button" tabindex="0">'
        + '<div class="help-article-icon">' + a.icon + '</div>'
        + '<div>'
          + '<div class="help-article-title">' + a.title + '</div>'
          + '<div class="help-article-desc">' + a.desc + '</div>'
        + '</div>'
        + '<svg class="help-article-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>'
      + '</div>';
    }).join('');

    return '<div class="help-category">'
      + '<div class="help-category-title">' + cat + '</div>'
      + '<div class="help-category-grid">' + articles + '</div>'
    + '</div>';
  }).join('');

  var ticketHtml = RECENT_TICKETS.map(function(t) {
    return '<div class="help-ticket-row">'
      + '<div>'
        + '<div class="help-ticket-subject">' + t.subject + '</div>'
        + '<div class="help-ticket-date">' + t.date + '</div>'
      + '</div>'
      + '<span class="help-ticket-badge">Résolu</span>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="work-view">'
      + '<div class="work-header">'
        + '<div class="work-title">Centre d\'aide</div>'
      + '</div>'

      + '<div class="help-hero">'
        + '<div class="help-hero-inner">'
          + '<div class="help-hero-body">'
            + '<div class="help-pilot-card">'
              + '<div class="help-pilot-avatar-wrap">'
                + '<div class="help-pilot-avatar">ML</div>'
                + '<span class="help-pilot-online"></span>'
              + '</div>'
              + '<div>'
                + '<div class="help-hero-title">Marie est en ligne</div>'
                + '<div class="help-hero-desc">Ton pilot · Temps de réponse moyen : <strong>23 min</strong></div>'
              + '</div>'
            + '</div>'
          + '</div>'
          + '<div class="help-hero-actions">'
            + '<button class="help-hero-btn help-hero-btn-primary" data-nav="messaging">Démarrer un chat</button>'
            + '<button class="help-hero-btn help-hero-btn-ghost" data-nav="notifications">Nouveau ticket</button>'
          + '</div>'
        + '</div>'
      + '</div>'

      + categoryHtml

      + '<div class="help-shortcuts-card">'
        + '<div class="help-section-title">Raccourcis clavier</div>'
        + '<div class="help-shortcuts-grid">'
          + '<div class="help-shortcut"><kbd>1</kbd><span>Tableau de bord</span></div>'
          + '<div class="help-shortcut"><kbd>2</kbd><span>Boîte de réception</span></div>'
          + '<div class="help-shortcut"><kbd>3</kbd><span>Travail produit</span></div>'
          + '<div class="help-shortcut"><kbd>4</kbd><span>Planning</span></div>'
          + '<div class="help-shortcut"><kbd>5</kbd><span>Statistiques</span></div>'
          + '<div class="help-shortcut"><kbd>6</kbd><span>Impact & ROI</span></div>'
          + '<div class="help-shortcut"><kbd>7</kbd><span>Équipe</span></div>'
          + '<div class="help-shortcut"><kbd>⌘K</kbd><span>Recherche rapide</span></div>'
          + '<div class="help-shortcut"><kbd>⌘B</kbd><span>Nouveau brief</span></div>'
          + '<div class="help-shortcut"><kbd>Esc</kbd><span>Fermer / Retour</span></div>'
        + '</div>'
      + '</div>'

      + '<div class="help-bottom-grid">'
        + '<div class="help-section-card">'
          + '<div class="help-section-title">Mes tickets récents</div>'
          + ticketHtml
        + '</div>'
        + '<div class="help-section-card">'
          + '<div class="help-section-title">Infos rapides</div>'
          + '<div class="help-info-row"><div class="help-info-label">Ton pilot</div><div class="help-info-value">Marie L.</div></div>'
          + '<div class="help-info-row"><div class="help-info-label">Temps de réponse moy.</div><div class="help-info-value">23 minutes</div></div>'
          + '<div class="help-info-row"><div class="help-info-label">Plan actuel</div><div class="help-info-value help-info-value-accent">Pro — 6 agents</div></div>'
        + '</div>'
      + '</div>'
    + '</div>';
}
