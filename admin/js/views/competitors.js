// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Competitive Intelligence
//  Market positioning, competitor tracking, win/loss analysis
// ═══════════════════════════════════════════════════════════

var COMPETITORS = [
  { name: 'SocialBee', type: 'Tool SaaS', pricing: '29-199 €/mo', strength: 'Scheduling puissant', weakness: 'Pas de human-in-the-loop', threat: 'medium' },
  { name: 'Hootsuite', type: 'Enterprise', pricing: '99-599 €/mo', strength: 'Brand recognition', weakness: 'Complexe, pas de production contenu', threat: 'low' },
  { name: 'Agence locale #1', type: 'Agence trad.', pricing: '800-2000 €/mo', strength: 'Relation humaine', weakness: 'Lent, cher, pas scalable', threat: 'high' },
  { name: 'Freelance SMM', type: 'Indépendant', pricing: '400-1000 €/mo', strength: 'Flexible, personnalisé', weakness: 'Single point of failure, pas de tech', threat: 'high' },
  { name: 'Buffer + ChatGPT', type: 'Stack DIY', pricing: '60-100 €/mo', strength: 'Pas cher', weakness: 'Pas intégré, qualité variable, pas de supervision', threat: 'medium' },
  { name: 'Jasper', type: 'AI Content', pricing: '49-125 €/mo', strength: 'Génération rapide', weakness: 'Pas de distribution ni gestion client', threat: 'low' },
];

var WIN_LOSS = [
  { date: '14/05', company: 'Brasserie Saint-Paul', competitor: 'Freelance SMM', result: 'win', reason: 'Multi-agent + transparence ROI convaincants' },
  { date: '10/05', company: 'Boutique Léa', competitor: 'Agence locale #1', result: 'win', reason: 'Prix 60% inférieur pour service comparable' },
  { date: '05/05', company: 'Garage Central', competitor: 'Buffer + ChatGPT', result: 'loss', reason: 'Budget trop serré, préfère DIY' },
  { date: '28/04', company: 'Spa Horizon', competitor: 'Freelance SMM', result: 'win', reason: 'Disponibilité 24/7 + pas de congés' },
  { date: '20/04', company: 'Resto Gastronomique', competitor: 'Agence locale #1', result: 'loss', reason: 'Veut relation "humaine seule", méfiant AI' },
  { date: '15/04', company: 'Salle CrossFit', competitor: 'SocialBee', result: 'win', reason: 'Production contenu incluse, pas juste planning' },
];

var POSITIONING = {
  pricePerception: 'Milieu de gamme',
  valuePerception: 'Élevée — ratio prix/service imbattable',
  mainDifferentiators: ['AI + Human supervision', 'Multi-agent spécialisé', 'Transparence totale (ROI visible)', 'Pas de lock-in'],
  mainObjections: ['Méfiance AI', 'Préfère "vrai" humain', 'Budget insuffisant', 'Pas besoin de tous les agents'],
};

export function renderCompetitors() {
  var wins = WIN_LOSS.filter(function(w) { return w.result === 'win'; }).length;
  var losses = WIN_LOSS.filter(function(w) { return w.result === 'loss'; }).length;
  var winRate = (wins + losses) > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  function threatBadge(t) {
    if (t === 'high') return '<span class="admin-badge admin-badge-red">Élevée</span>';
    if (t === 'medium') return '<span class="admin-badge admin-badge-orange">Moyenne</span>';
    return '<span class="admin-badge admin-badge-green">Faible</span>';
  }

  var competitorRows = COMPETITORS.map(function(c) {
    return '<tr>'
      + '<td><strong>' + c.name + '</strong></td>'
      + '<td><span class="admin-badge admin-badge-muted">' + c.type + '</span></td>'
      + '<td style="font-size:12px">' + c.pricing + '</td>'
      + '<td style="font-size:12px;color:var(--admin-green)">' + c.strength + '</td>'
      + '<td style="font-size:12px;color:var(--admin-red)">' + c.weakness + '</td>'
      + '<td>' + threatBadge(c.threat) + '</td>'
    + '</tr>';
  }).join('');

  var winLossRows = WIN_LOSS.map(function(w) {
    var icon = w.result === 'win' ? '<span class="admin-badge admin-badge-green">Win</span>' : '<span class="admin-badge admin-badge-red">Loss</span>';
    return '<tr>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + w.date + '</td>'
      + '<td><strong>' + w.company + '</strong></td>'
      + '<td style="font-size:12px">' + w.competitor + '</td>'
      + '<td>' + icon + '</td>'
      + '<td style="font-size:11px;color:var(--admin-text-secondary)">' + w.reason + '</td>'
    + '</tr>';
  }).join('');

  var diffList = POSITIONING.mainDifferentiators.map(function(d) {
    return '<div style="display:flex;align-items:center;gap:6px;padding:6px 0"><span style="color:var(--admin-green)">✓</span><span style="font-size:12px">' + d + '</span></div>';
  }).join('');

  var objList = POSITIONING.mainObjections.map(function(o) {
    return '<div style="display:flex;align-items:center;gap:6px;padding:6px 0"><span style="color:var(--admin-red)">✗</span><span style="font-size:12px">' + o + '</span></div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Taux de win</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + winRate + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Wins / Losses</div><div class="admin-kpi-value">' + wins + ' / ' + losses + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Concurrents suivis</div><div class="admin-kpi-value">' + COMPETITORS.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Position marché</div><div class="admin-kpi-value" style="font-size:14px;color:var(--admin-violet)">Leader local</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div><div class="admin-section-title">Landscape concurrentiel</div><div style="font-size:11px;color:var(--admin-text-secondary);margin-top:2px">Menace élevée → priorité rétention sales</div></div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table">'
          + '<thead><tr><th>Concurrent</th><th>Type</th><th>Pricing</th><th>Force</th><th>Faiblesse</th><th>Menace</th></tr></thead>'
          + '<tbody>' + competitorRows + '</tbody>'
        + '</table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1fr 300px;gap:16px">'

      + '<div class="admin-section">'
        + '<div class="admin-section-header"><div class="admin-section-title">Win/Loss récents</div></div>'
        + '<div class="admin-card" style="padding:0;overflow:hidden">'
          + '<table class="admin-table">'
            + '<thead><tr><th>Date</th><th>Prospect</th><th>Vs.</th><th>Résultat</th><th>Raison</th></tr></thead>'
            + '<tbody>' + winLossRows + '</tbody>'
          + '</table>'
        + '</div>'
      + '</div>'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Nos différenciateurs</div></div>'
          + '<div class="admin-card" style="padding:12px">' + diffList + '</div>'
        + '</div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Objections fréquentes</div></div>'
          + '<div class="admin-card" style="padding:12px">' + objList + '</div>'
        + '</div>'
      + '</div>'

    + '</div>';
}
