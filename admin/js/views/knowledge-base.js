// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Knowledge Base / Brand Guidelines
//  Per-client brand voice, tone, visual guidelines for agents
// ═══════════════════════════════════════════════════════════

var BRAND_PROFILES = [
  { id: 'bp1', client: 'Sushi Boy', completeness: 95, tone: 'Fun, jeune, urbain', voice: 'Tutoiement, emojis OK, références pop culture', colors: '#FF2D55, #1A1A2E, #FFD700', fonts: 'Poppins, Space Grotesk', doNot: 'Pas de références à la concurrence, pas de "cuisine fusion"', lastUpdated: 'Il y a 3j' },
  { id: 'bp2', client: 'Chez Marcel', completeness: 88, tone: 'Chaleureux, familial, terroir', voice: 'Vouvoiement, vocabulaire cuisine classique', colors: '#8B4513, #F5F5DC, #2F4F4F', fonts: 'Playfair Display, Lora', doNot: 'Pas de termes anglais, pas de "gastro moléculaire"', lastUpdated: 'Il y a 1sem' },
  { id: 'bp3', client: 'Bella Donna', completeness: 82, tone: 'Élégant, confidentiel, féminin', voice: 'Tutoiement, vocabulaire beauté expert', colors: '#D4A574, #2C2C2C, #F8F0E8', fonts: 'Cormorant Garamond, Montserrat', doNot: 'Pas de prix affichés, pas de "promo"', lastUpdated: 'Il y a 5j' },
  { id: 'bp4', client: 'Green Garden', completeness: 92, tone: 'Engagé, éducatif, positif', voice: 'Tutoiement, vulgarisation nutrition', colors: '#2D8B4E, #F0FFF0, #8B6914', fonts: 'Inter, Space Mono', doNot: 'Pas de "végan" (dire "végétal"), pas de moralisation', lastUpdated: 'Il y a 2j' },
  { id: 'bp5', client: 'Maison Dupont', completeness: 60, tone: 'Raffiné, discret, haut de gamme', voice: 'Vouvoiement strict, vocabulaire sommellerie', colors: '#1A1A1A, #C9A96E, #FFFFFF', fonts: 'Didot, Helvetica Neue', doNot: 'Pas de prix, pas d\'emojis, pas de langage familier', lastUpdated: 'Il y a 3sem' },
  { id: 'bp6', client: 'Bike & Run', completeness: 90, tone: 'Dynamique, communautaire, motivant', voice: 'Tutoiement, jargon sportif OK, ton coach', colors: '#FF6B00, #1A1A1A, #00D4AA', fonts: 'Space Grotesk, JetBrains Mono', doNot: 'Pas de comparaisons physiques, pas de "régime"', lastUpdated: 'Il y a 4j' },
  { id: 'bp7', client: 'L\'Atelier Zen', completeness: 75, tone: 'Apaisant, bienveillant, spirituel', voice: 'Tutoiement doux, vocabulaire bien-être', colors: '#9B7CB8, #F5F0FA, #2C5545', fonts: 'Quicksand, Nunito', doNot: 'Pas de termes médicaux, pas de promesses de guérison', lastUpdated: 'Il y a 10j' },
  { id: 'bp8', client: 'Pizza Roma', completeness: 70, tone: 'Authentique, gourmand, convivial', voice: 'Tutoiement, mots italiens bienvenus', colors: '#D32F2F, #FFF8E1, #388E3C', fonts: 'Libre Baskerville, Open Sans', doNot: 'Pas de "fast-food", pas de comparaison avec les chaînes', lastUpdated: 'Il y a 2sem' },
  { id: 'bp9', client: 'Fleur de Sel', completeness: 85, tone: 'Terroir, authenticité, saisons', voice: 'Vouvoiement, vocabulaire gastronomique', colors: '#4A6741, #FFF5EE, #8B6914', fonts: 'Merriweather, Source Sans Pro', doNot: 'Pas de "bistrot", dire "table d\'hôte"', lastUpdated: 'Il y a 6j' },
  { id: 'bp10', client: 'Studio Lumière', completeness: 45, tone: 'Créatif, moderne, artsy', voice: 'Tutoiement, langage visuel', colors: '#6C63FF, #FFFFFF, #FFD93D', fonts: 'Syne, DM Sans', doNot: 'Non renseigné', lastUpdated: 'Il y a 1mois' },
];

export function renderKnowledgeBase() {
  var avgCompleteness = Math.round(BRAND_PROFILES.reduce(function(s, b) { return s + b.completeness; }, 0) / BRAND_PROFILES.length);
  var complete = BRAND_PROFILES.filter(function(b) { return b.completeness >= 90; }).length;
  var incomplete = BRAND_PROFILES.filter(function(b) { return b.completeness < 70; }).length;

  function completenessBar(pct) {
    var color = pct >= 90 ? 'var(--admin-green)' : pct >= 70 ? 'var(--admin-orange)' : 'var(--admin-red)';
    return '<div style="display:flex;align-items:center;gap:8px">'
      + '<div style="flex:1;height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden">'
        + '<div style="width:' + pct + '%;height:100%;background:' + color + ';border-radius:3px"></div>'
      + '</div>'
      + '<span style="font-size:11px;font-weight:500;color:' + color + ';min-width:36px">' + pct + '%</span>'
    + '</div>';
  }

  var cards = BRAND_PROFILES.map(function(b) {
    var colorDots = b.colors.split(', ').map(function(c) {
      return '<div style="width:14px;height:14px;border-radius:50%;background:' + c + ';border:1px solid var(--admin-border)"></div>';
    }).join('');

    return '<div class="admin-card" style="margin-bottom:12px;padding:16px">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">'
        + '<div>'
          + '<div style="font-size:14px;font-weight:600">' + b.client + '</div>'
          + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:2px">Mis à jour ' + b.lastUpdated + '</div>'
        + '</div>'
        + '<div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:3px 10px">Éditer</div>'
      + '</div>'

      + '<div style="margin-bottom:12px">' + completenessBar(b.completeness) + '</div>'

      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">'
        + '<div>'
          + '<div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Ton</div>'
          + '<div style="font-size:12px">' + b.tone + '</div>'
        + '</div>'
        + '<div>'
          + '<div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Voix</div>'
          + '<div style="font-size:12px">' + b.voice + '</div>'
        + '</div>'
      + '</div>'

      + '<div style="display:flex;align-items:center;gap:16px">'
        + '<div style="display:flex;align-items:center;gap:4px">' + colorDots + '</div>'
        + '<div style="font-size:11px;color:var(--admin-text-muted)">' + b.fonts + '</div>'
      + '</div>'

      + (b.doNot !== 'Non renseigné' ? '<div style="margin-top:10px;padding:8px 10px;background:rgba(255,45,135,0.06);border-radius:6px;font-size:11px;color:var(--admin-red)">⚠ ' + b.doNot + '</div>' : '')
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Profiles marque</div><div class="admin-kpi-value">' + BRAND_PROFILES.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Complétude moy.</div><div class="admin-kpi-value" style="color:' + (avgCompleteness >= 80 ? 'var(--admin-green)' : 'var(--admin-orange)') + '">' + avgCompleteness + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Complets (≥90%)</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + complete + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Incomplets (&lt;70%)</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + incomplete + '</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Brand Guidelines par client</div>'
        + '<div style="display:flex;gap:8px">'
          + '<div class="admin-btn admin-btn-ghost" data-action="export" style="font-size:11px;padding:5px 12px">Exporter tout</div>'
          + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:5px 12px">+ Nouveau profil</div>'
        + '</div>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
        + cards
      + '</div>'
    + '</div>';
}
