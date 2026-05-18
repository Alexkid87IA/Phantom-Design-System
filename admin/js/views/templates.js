// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Agent Templates
// ═══════════════════════════════════════════════════════════

var TEMPLATES = [
  { id: 't1', name: 'Social Manager', pole: 'Visibilité', sectors: ['Restauration', 'Commerce', 'Beauté'], agents: 12, description: 'Gestion des réseaux sociaux (Instagram, Facebook). Création de posts, stories, reels. Calendrier éditorial automatisé.' },
  { id: 't2', name: 'Avis Google', pole: 'Réputation', sectors: ['Restauration', 'Bien-être', 'Commerce'], agents: 7, description: 'Surveillance et réponse aux avis Google. Stratégie de collecte d\'avis positifs. Alertes avis négatifs.' },
  { id: 't3', name: 'Photos Pro', pole: 'Visibilité', sectors: ['Restauration', 'Beauté'], agents: 4, description: 'Shooting photo professionnel des plats, produits, espaces. Retouche et livraison multi-format.' },
  { id: 't4', name: 'SEO Local', pole: 'Acquisition', sectors: ['Restauration', 'Commerce', 'Automobile'], agents: 4, description: 'Optimisation Google Business, articles de blog SEO, maillage local, citations NAP.' },
  { id: 't5', name: 'Site Web', pole: 'Acquisition', sectors: ['Restauration', 'Commerce', 'Sport'], agents: 3, description: 'Création et mise à jour du site vitrine. Landing pages, menu en ligne, réservation.' },
  { id: 't6', name: 'Brand B2C', pole: 'Image', sectors: ['Restauration', 'Commerce'], agents: 2, description: 'Identité visuelle, charte graphique, supports marketing, cartes de visite, flyers.' },
];

export function renderTemplates() {
  var cards = TEMPLATES.map(function(t) {
    var sectors = t.sectors.map(function(s) {
      return '<span class="admin-badge admin-badge-muted" style="margin-right:4px">' + s + '</span>';
    }).join('');

    return ''
      + '<div class="admin-card">'
        + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">'
          + '<div>'
            + '<div style="font-size:15px;font-weight:600;margin-bottom:2px">' + t.name + '</div>'
            + '<div style="font-size:11px;color:var(--admin-text-muted)">' + t.pole + '</div>'
          + '</div>'
          + '<span class="admin-badge admin-badge-violet">' + t.agents + ' actifs</span>'
        + '</div>'
        + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:12px;line-height:1.5">' + t.description + '</div>'
        + '<div style="margin-bottom:12px">' + sectors + '</div>'
        + '<div style="display:flex;gap:6px">'
          + '<div class="admin-btn admin-btn-ghost" style="font-size:11px;padding:5px 10px">Modifier</div>'
          + '<div class="admin-btn admin-btn-ghost" style="font-size:11px;padding:5px 10px">Dupliquer</div>'
        + '</div>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Templates</div><div class="admin-kpi-value">' + TEMPLATES.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Agents déployés</div><div class="admin-kpi-value">' + TEMPLATES.reduce(function(s, t) { return s + t.agents; }, 0) + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Pôles couverts</div><div class="admin-kpi-value">4</div></div>'
    + '</div>'
    + '<div class="admin-section-header">'
      + '<div class="admin-section-title">Templates agents</div>'
      + '<div class="admin-btn admin-btn-primary">+ Nouveau template</div>'
    + '</div>'
    + '<div class="admin-grid admin-grid-2">' + cards + '</div>';
}
