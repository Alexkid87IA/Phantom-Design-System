// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Client Satisfaction & NPS
//  Net Promoter Score tracking and feedback analysis
// ═══════════════════════════════════════════════════════════

var NPS_RESPONSES = [
  { id: 'n1', client: 'Sushi Boy', contact: 'Kenji T.', score: 10, date: '15/05/2026', comment: 'Incroyable. En 2 mois on a doublé nos abonnés Instagram.', category: 'promoter' },
  { id: 'n2', client: 'Green Garden', contact: 'Lucas M.', score: 9, date: '14/05/2026', comment: 'Le SEO a vraiment boosté notre trafic organique. Top.', category: 'promoter' },
  { id: 'n3', client: 'Bike & Run', contact: 'Thomas B.', score: 9, date: '13/05/2026', comment: 'Pro et réactif. Les agents comprennent notre marque.', category: 'promoter' },
  { id: 'n4', client: 'Bella Donna', contact: 'Isabella V.', score: 8, date: '12/05/2026', comment: 'Bon service, parfois un peu de latence sur les validations.', category: 'passive' },
  { id: 'n5', client: 'Fleur de Sel', contact: 'Sophie L.', score: 8, date: '11/05/2026', comment: 'Content du travail mais j\'aimerais plus de créativité sur les stories.', category: 'passive' },
  { id: 'n6', client: 'Pizza Roma', contact: 'Marco P.', score: 9, date: '10/05/2026', comment: 'Perfetto ! Mon Instagram n\'a jamais été aussi beau.', category: 'promoter' },
  { id: 'n7', client: 'L\'Atelier Zen', contact: 'Camille R.', score: 7, date: '09/05/2026', comment: 'Correct mais les visuels manquent un peu de personnalité.', category: 'passive' },
  { id: 'n8', client: 'Chez Marcel', contact: 'Marcel D.', score: 8, date: '08/05/2026', comment: 'Ça tourne tout seul, c\'est ce que je voulais.', category: 'passive' },
  { id: 'n9', client: 'Maison Dupont', contact: 'Henri D.', score: 4, date: '07/05/2026', comment: 'Depuis 2 semaines rien ne marche. Mon agent Instagram est en panne.', category: 'detractor' },
  { id: 'n10', client: 'Studio Lumière', contact: 'Claire S.', score: 6, date: '05/05/2026', comment: 'Pas mal mais j\'attendais plus de résultats concrets.', category: 'detractor' },
];

var SATISFACTION_TRENDS = [
  { month: 'Jan', nps: 62 },
  { month: 'Fév', nps: 65 },
  { month: 'Mar', nps: 68 },
  { month: 'Avr', nps: 71 },
  { month: 'Mai', nps: 74 },
];

export function renderSatisfaction() {
  var promoters = NPS_RESPONSES.filter(function(r) { return r.category === 'promoter'; }).length;
  var passives = NPS_RESPONSES.filter(function(r) { return r.category === 'passive'; }).length;
  var detractors = NPS_RESPONSES.filter(function(r) { return r.category === 'detractor'; }).length;
  var total = NPS_RESPONSES.length;
  var npsScore = Math.round(((promoters - detractors) / total) * 100);

  function scoreColor(s) {
    if (s >= 9) return 'var(--admin-green)';
    if (s >= 7) return 'var(--admin-orange)';
    return 'var(--admin-red)';
  }

  function categoryBadge(cat) {
    if (cat === 'promoter') return '<span class="admin-badge admin-badge-green">Promoteur</span>';
    if (cat === 'passive') return '<span class="admin-badge admin-badge-orange">Passif</span>';
    return '<span class="admin-badge admin-badge-red">Détracteur</span>';
  }

  var responseCards = NPS_RESPONSES.map(function(r) {
    return '<div class="admin-card" style="margin-bottom:8px;padding:14px">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">'
        + '<div style="display:flex;align-items:center;gap:10px">'
          + '<div style="width:36px;height:36px;border-radius:50%;background:' + scoreColor(r.score) + ';display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff">' + r.score + '</div>'
          + '<div>'
            + '<div style="font-size:13px;font-weight:600">' + r.client + '</div>'
            + '<div style="font-size:11px;color:var(--admin-text-muted)">' + r.contact + ' · ' + r.date + '</div>'
          + '</div>'
        + '</div>'
        + categoryBadge(r.category)
      + '</div>'
      + '<div style="font-size:12px;color:var(--admin-text-secondary);font-style:italic;padding-left:46px">"' + r.comment + '"</div>'
    + '</div>';
  }).join('');

  var trendBars = SATISFACTION_TRENDS.map(function(t) {
    var height = Math.round((t.nps / 100) * 80);
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px">'
      + '<div style="font-size:10px;font-weight:600;color:var(--admin-green)">' + t.nps + '</div>'
      + '<div style="width:32px;height:' + height + 'px;background:var(--admin-green);border-radius:4px;opacity:0.7"></div>'
      + '<div style="font-size:10px;color:var(--admin-text-muted)">' + t.month + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Score NPS</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + npsScore + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Promoteurs (9-10)</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + promoters + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Passifs (7-8)</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + passives + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Détracteurs (0-6)</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + detractors + '</div></div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1fr 280px;gap:16px">'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header">'
            + '<div class="admin-section-title">Dernières réponses NPS</div>'
            + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:5px 14px">Envoyer enquête</div>'
          + '</div>'
          + responseCards
        + '</div>'
      + '</div>'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Évolution NPS</div></div>'
          + '<div class="admin-card" style="padding:16px">'
            + '<div style="display:flex;align-items:flex-end;justify-content:space-between;height:100px">'
              + trendBars
            + '</div>'
          + '</div>'
        + '</div>'

        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Répartition</div></div>'
          + '<div class="admin-card" style="padding:16px">'
            + '<div style="margin-bottom:12px">'
              + '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Promoteurs</span><span style="color:var(--admin-green);font-weight:600">' + Math.round((promoters/total)*100) + '%</span></div>'
              + '<div style="height:8px;background:var(--admin-border);border-radius:4px;overflow:hidden"><div style="width:' + Math.round((promoters/total)*100) + '%;height:100%;background:var(--admin-green);border-radius:4px"></div></div>'
            + '</div>'
            + '<div style="margin-bottom:12px">'
              + '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Passifs</span><span style="color:var(--admin-orange);font-weight:600">' + Math.round((passives/total)*100) + '%</span></div>'
              + '<div style="height:8px;background:var(--admin-border);border-radius:4px;overflow:hidden"><div style="width:' + Math.round((passives/total)*100) + '%;height:100%;background:var(--admin-orange);border-radius:4px"></div></div>'
            + '</div>'
            + '<div>'
              + '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Détracteurs</span><span style="color:var(--admin-red);font-weight:600">' + Math.round((detractors/total)*100) + '%</span></div>'
              + '<div style="height:8px;background:var(--admin-border);border-radius:4px;overflow:hidden"><div style="width:' + Math.round((detractors/total)*100) + '%;height:100%;background:var(--admin-red);border-radius:4px"></div></div>'
            + '</div>'
          + '</div>'
        + '</div>'

        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Actions recommandées</div></div>'
          + '<div class="admin-card" style="padding:14px">'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border);font-size:12px"><span class="admin-badge admin-badge-red">Urgent</span> Appeler Maison Dupont — NPS 4, agent en erreur</div>'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border);font-size:12px"><span class="admin-badge admin-badge-orange">Moyen</span> Proposer upgrade à Studio Lumière — attentes élevées</div>'
            + '<div style="padding:8px 0;font-size:12px"><span class="admin-badge admin-badge-green">Positif</span> Demander témoignage à Sushi Boy — score 10</div>'
          + '</div>'
        + '</div>'
      + '</div>'

    + '</div>';
}
