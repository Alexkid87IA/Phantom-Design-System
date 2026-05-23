// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Revenue & MRR
// ═══════════════════════════════════════════════════════════

import { MRR_HISTORY, REVENUE_KPIS, PLAN_BREAKDOWN } from '../data/revenue.js';
import { activeClientCount } from '../data/clients.js';

export function renderRevenue() {
  var maxMrr = Math.max.apply(null, MRR_HISTORY.map(function(m) { return m.mrr; }));

  var chartBars = MRR_HISTORY.map(function(m) {
    var h = maxMrr > 0 ? Math.round((m.mrr / maxMrr) * 100) : 0;
    return '<div class="admin-chart-bar-col">'
      + '<div class="admin-chart-bar-value">' + (m.mrr / 1000).toFixed(1) + 'k</div>'
      + '<div class="admin-chart-bar" style="height:' + h + '%"></div>'
      + '<div class="admin-chart-bar-label">' + m.month.split(' ')[0].substring(0, 3) + '</div>'
    + '</div>';
  }).join('');

  var planBars = PLAN_BREAKDOWN.map(function(p) {
    return '<div style="margin-bottom:12px">'
      + '<div style="display:flex;justify-content:space-between;margin-bottom:4px">'
        + '<span style="font-size:12px;font-weight:500">' + p.plan + '</span>'
        + '<span style="font-size:11px;color:var(--admin-text-muted)">' + p.clients + ' clients · ' + p.mrr.toLocaleString('fr-FR') + ' €</span>'
      + '</div>'
      + '<div class="admin-progress"><div class="admin-progress-fill" style="width:' + p.percent + '%;background:var(--admin-violet)"></div></div>'
    + '</div>';
  }).join('');

  var mrrFlow = MRR_HISTORY.slice(1).map(function(m) {
    return '<tr>'
      + '<td>' + m.month + '</td>'
      + '<td style="color:var(--admin-green);font-weight:500">+' + m.newMrr.toLocaleString('fr-FR') + ' €</td>'
      + '<td style="color:var(--admin-red)">' + (m.churnMrr > 0 ? '-' + m.churnMrr.toLocaleString('fr-FR') + ' €' : '—') + '</td>'
      + '<td style="font-weight:600">' + m.mrr.toLocaleString('fr-FR') + ' €</td>'
      + '<td>' + m.clients + '</td>'
    + '</tr>';
  }).join('');

  var ltvCac = REVENUE_KPIS.cac > 0 ? (REVENUE_KPIS.ltv / REVENUE_KPIS.cac).toFixed(1) : '0.0';
  var mrrGrowth = MRR_HISTORY.length >= 2
    ? Math.round(((MRR_HISTORY[MRR_HISTORY.length - 1].mrr - MRR_HISTORY[0].mrr) / Math.max(MRR_HISTORY[0].mrr, 1)) * 100)
    : 0;
  var healthVerdict = REVENUE_KPIS.churnRate < 5 && ltvCac > 3
    ? 'Excellente'
    : REVENUE_KPIS.churnRate < 10
      ? 'Correcte'
      : 'Attention requise';
  var healthColor = healthVerdict === 'Excellente' ? 'var(--admin-green)' : healthVerdict === 'Correcte' ? 'var(--admin-orange)' : 'var(--admin-red)';

  return ''
    + '<div class="admin-card" style="margin-bottom:24px;border-left:4px solid ' + healthColor + '">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start">'
        + '<div>'
          + '<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:' + healthColor + ';margin-bottom:6px">Santé business : ' + healthVerdict + '</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);line-height:1.6">'
            + 'De <strong>1 490 €</strong> à <strong>' + REVENUE_KPIS.mrrCurrent.toLocaleString('fr-FR') + ' €</strong> MRR en 5 mois. '
            + 'Churn à <strong>' + REVENUE_KPIS.churnRate + '%</strong> (stable). '
            + 'LTV/CAC à <strong>' + ltvCac + 'x</strong> — chaque euro investi en rapporte ' + ltvCac + '.'
          + '</div>'
        + '</div>'
        + '<div style="text-align:center;padding:12px 20px;background:rgba(0,210,106,0.08);border-radius:var(--admin-radius);flex-shrink:0;margin-left:20px">'
          + '<div style="font-size:22px;font-weight:700;color:var(--admin-green)">+' + mrrGrowth + '%</div>'
          + '<div style="font-size:10px;color:var(--admin-text-muted);margin-top:2px">depuis le lancement</div>'
        + '</div>'
      + '</div>'
    + '</div>'

    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">MRR</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + REVENUE_KPIS.mrrCurrent.toLocaleString('fr-FR') + ' €</div><div class="admin-kpi-change admin-kpi-up">+' + REVENUE_KPIS.mrrNet.toLocaleString('fr-FR') + ' € net</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">ARR projeté</div><div class="admin-kpi-value">' + REVENUE_KPIS.arrProjected.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">ARPU</div><div class="admin-kpi-value">' + REVENUE_KPIS.arpu.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Churn</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + REVENUE_KPIS.churnRate + '%</div></div>'
    + '</div>'

    + '<div class="admin-grid admin-grid-2" style="margin-bottom:28px">'
      + '<div class="admin-card">'
        + '<div class="admin-card-header"><div class="admin-card-title">Courbe MRR</div></div>'
        + '<div class="admin-chart-bars">' + chartBars + '</div>'
      + '</div>'
      + '<div class="admin-card">'
        + '<div class="admin-card-header"><div class="admin-card-title">Répartition par plan</div></div>'
        + planBars
      + '</div>'
    + '</div>'

    + '<div class="admin-grid admin-grid-3" style="margin-bottom:28px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">LTV</div><div class="admin-kpi-value">' + REVENUE_KPIS.ltv.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">CAC</div><div class="admin-kpi-value">' + REVENUE_KPIS.cac + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">LTV/CAC Ratio</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + ltvCac + 'x</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Flux MRR mensuel</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Mois</th><th>Nouveau</th><th>Churn</th><th>MRR total</th><th>Clients</th></tr></thead><tbody>' + mrrFlow + '</tbody></table>'
      + '</div>'
    + '</div>';
}
