// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Pipeline
// ═══════════════════════════════════════════════════════════

import { PIPELINE } from '../data/revenue.js';

var STAGES = [
  { id: 'lead', label: 'Lead', color: 'var(--admin-text-muted)' },
  { id: 'demo', label: 'Démo', color: 'var(--admin-blue)' },
  { id: 'proposal', label: 'Proposal', color: 'var(--admin-violet)' },
  { id: 'negotiation', label: 'Négociation', color: 'var(--admin-orange)' },
  { id: 'closed', label: 'Gagné', color: 'var(--admin-green)' },
];

export function renderPipeline() {
  var totalValue = PIPELINE.reduce(function(s, l) { return s + l.value; }, 0);

  var columns = STAGES.map(function(stage) {
    var leads = PIPELINE.filter(function(l) { return l.stage === stage.id; });
    var stageValue = leads.reduce(function(s, l) { return s + l.value; }, 0);

    var cards = leads.map(function(l) {
      return '<div class="admin-pipeline-card">'
        + '<div class="admin-pipeline-name">' + l.name + '</div>'
        + '<div class="admin-pipeline-meta">' + l.sector + ' · ' + l.city + '</div>'
        + '<div class="admin-pipeline-meta">' + l.source + ' · ' + l.contact + '</div>'
        + '<div class="admin-pipeline-value">' + l.value.toLocaleString('fr-FR') + ' €/mois</div>'
        + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:6px">' + l.nextAction + '</div>'
      + '</div>';
    }).join('');

    return ''
      + '<div style="flex:1;min-width:200px">'
        + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding:0 4px">'
          + '<div style="display:flex;align-items:center;gap:6px">'
            + '<div style="width:8px;height:8px;border-radius:50%;background:' + stage.color + '"></div>'
            + '<span style="font-size:12px;font-weight:600">' + stage.label + '</span>'
          + '</div>'
          + '<span style="font-size:11px;color:var(--admin-text-muted)">' + leads.length + '</span>'
        + '</div>'
        + cards
        + (leads.length === 0 ? '<div style="padding:20px;text-align:center;font-size:11px;color:var(--admin-text-muted);border:1px dashed var(--admin-border-2);border-radius:var(--admin-radius-sm)">Aucun lead</div>' : '')
      + '</div>';
  }).join('');

  var conversionRate = PIPELINE.length > 0 ? Math.round((PIPELINE.filter(function(l) { return l.stage === 'negotiation' || l.stage === 'closed'; }).length / PIPELINE.length) * 100) : 0;

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Leads actifs</div><div class="admin-kpi-value">' + PIPELINE.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Valeur pipeline</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + totalValue.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Taux conversion</div><div class="admin-kpi-value">' + conversionRate + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Deal moyen</div><div class="admin-kpi-value">' + Math.round(totalValue / PIPELINE.length).toLocaleString('fr-FR') + ' €</div></div>'
    + '</div>'
    + '<div class="admin-section-header"><div class="admin-section-title">Pipeline commercial</div></div>'
    + '<div style="display:flex;gap:14px;overflow-x:auto;padding-bottom:12px">' + columns + '</div>';
}
