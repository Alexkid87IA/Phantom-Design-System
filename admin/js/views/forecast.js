// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Forecasting & Growth Projections
//  MRR projections, growth scenarios, financial planning
// ═══════════════════════════════════════════════════════════

var MRR_HISTORY = [
  { month: 'Jan', mrr: 2196, clients: 6 },
  { month: 'Fév', mrr: 2695, clients: 7 },
  { month: 'Mar', mrr: 3194, clients: 8 },
  { month: 'Avr', mrr: 3892, clients: 10 },
  { month: 'Mai', mrr: 4591, clients: 11 },
];

var SCENARIOS = [
  { name: 'Conservateur', mrrM6: 6500, mrrM12: 9800, clients: 18, assumption: '2 clients/mois, 3% churn' },
  { name: 'Réaliste', mrrM6: 8200, mrrM12: 14500, clients: 25, assumption: '3 clients/mois, 2% churn, 10% upgrades' },
  { name: 'Ambitieux', mrrM6: 11000, mrrM12: 22000, clients: 35, assumption: '4-5 clients/mois, 1% churn, channel partner' },
];

var PIPELINE_FORECAST = [
  { stage: 'Démo planifiée', count: 3, value: 1497, probability: 30 },
  { stage: 'Proposition envoyée', count: 2, value: 1398, probability: 50 },
  { stage: 'Négociation', count: 1, value: 899, probability: 70 },
  { stage: 'Verbal OK', count: 1, value: 499, probability: 90 },
];

var UNIT_ECONOMICS = {
  avgMRR: 417,
  cac: 180,
  ltv: 5004,
  ltvCac: 27.8,
  payback: 0.4,
  avgLifespan: 12,
  grossMargin: 94,
  netMargin: 72,
};

export function renderForecast() {
  var currentMRR = MRR_HISTORY[MRR_HISTORY.length - 1].mrr;
  var prevMRR = MRR_HISTORY[MRR_HISTORY.length - 2].mrr;
  var mrrGrowth = Math.round(((currentMRR - prevMRR) / prevMRR) * 100);
  var arr = currentMRR * 12;

  var historyBars = MRR_HISTORY.map(function(h) {
    var height = Math.round((h.mrr / 5000) * 80);
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">'
      + '<div style="font-size:9px;font-weight:600;color:var(--admin-green)">' + (h.mrr / 1000).toFixed(1) + 'k</div>'
      + '<div style="width:100%;max-width:32px;height:' + height + 'px;background:var(--admin-green);border-radius:4px;opacity:0.7"></div>'
      + '<div style="font-size:9px;color:var(--admin-text-muted)">' + h.month + '</div>'
    + '</div>';
  }).join('');

  var scenarioCards = SCENARIOS.map(function(s) {
    var color = s.name === 'Conservateur' ? 'var(--admin-text-muted)' : s.name === 'Réaliste' ? 'var(--admin-green)' : 'var(--admin-violet)';
    return '<div class="admin-card" style="padding:16px;flex:1;border-top:3px solid ' + color + '">'
      + '<div style="font-size:12px;font-weight:600;color:' + color + ';margin-bottom:10px">' + s.name + '</div>'
      + '<div style="margin-bottom:8px"><span style="font-size:10px;color:var(--admin-text-muted)">MRR à 6 mois</span><div style="font-size:18px;font-weight:700">' + s.mrrM6.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div style="margin-bottom:8px"><span style="font-size:10px;color:var(--admin-text-muted)">MRR à 12 mois</span><div style="font-size:18px;font-weight:700">' + s.mrrM12.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div style="margin-bottom:8px"><span style="font-size:10px;color:var(--admin-text-muted)">Clients</span><div style="font-size:14px;font-weight:600">' + s.clients + '</div></div>'
      + '<div style="font-size:10px;color:var(--admin-text-muted);font-style:italic;border-top:1px solid var(--admin-border);padding-top:8px">' + s.assumption + '</div>'
    + '</div>';
  }).join('');

  var pipelineRows = PIPELINE_FORECAST.map(function(p) {
    var weighted = Math.round(p.value * p.probability / 100);
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--admin-border)">'
      + '<div style="flex:1">'
        + '<div style="font-size:12px;font-weight:500">' + p.stage + '</div>'
        + '<div style="font-size:10px;color:var(--admin-text-muted)">' + p.count + ' prospect(s) · ' + p.value + ' € MRR potentiel</div>'
      + '</div>'
      + '<div style="text-align:right">'
        + '<div style="font-size:12px;font-weight:600;color:var(--admin-green)">' + weighted + ' €</div>'
        + '<div style="font-size:10px;color:var(--admin-text-muted)">' + p.probability + '% prob.</div>'
      + '</div>'
    + '</div>';
  }).join('');

  var weightedPipeline = PIPELINE_FORECAST.reduce(function(s, p) { return s + Math.round(p.value * p.probability / 100); }, 0);

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">MRR actuel</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + currentMRR.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Croissance MoM</div><div class="admin-kpi-value" style="color:var(--admin-green)">+' + mrrGrowth + '%</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">ARR projeté</div><div class="admin-kpi-value">' + arr.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Pipeline pondéré</div><div class="admin-kpi-value" style="color:var(--admin-violet)">+' + weightedPipeline + ' €</div></div>'
    + '</div>'

    + '<div class="admin-section" style="margin-bottom:16px">'
      + '<div class="admin-section-header"><div class="admin-section-title">Scénarios de croissance</div></div>'
      + '<div style="display:flex;gap:12px">' + scenarioCards + '</div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1fr 1fr;gap:16px">'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Historique MRR</div></div>'
          + '<div class="admin-card" style="padding:20px">'
            + '<div style="display:flex;align-items:flex-end;justify-content:space-between;height:100px">' + historyBars + '</div>'
          + '</div>'
        + '</div>'

        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Pipeline → MRR</div></div>'
          + '<div class="admin-card" style="padding:14px">' + pipelineRows + '</div>'
        + '</div>'
      + '</div>'

      + '<div class="admin-section">'
        + '<div class="admin-section-header"><div class="admin-section-title">Unit Economics</div></div>'
        + '<div class="admin-card" style="padding:16px">'
          + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">'
            + '<div style="padding:10px 0;border-bottom:1px solid var(--admin-border)"><div style="font-size:10px;color:var(--admin-text-muted)">ARPU (moy.)</div><div style="font-size:18px;font-weight:700;margin-top:4px">' + UNIT_ECONOMICS.avgMRR + ' €</div></div>'
            + '<div style="padding:10px 0;border-bottom:1px solid var(--admin-border)"><div style="font-size:10px;color:var(--admin-text-muted)">CAC</div><div style="font-size:18px;font-weight:700;margin-top:4px">' + UNIT_ECONOMICS.cac + ' €</div></div>'
            + '<div style="padding:10px 0;border-bottom:1px solid var(--admin-border)"><div style="font-size:10px;color:var(--admin-text-muted)">LTV</div><div style="font-size:18px;font-weight:700;color:var(--admin-green);margin-top:4px">' + UNIT_ECONOMICS.ltv.toLocaleString('fr-FR') + ' €</div></div>'
            + '<div style="padding:10px 0;border-bottom:1px solid var(--admin-border)"><div style="font-size:10px;color:var(--admin-text-muted)">LTV/CAC</div><div style="font-size:18px;font-weight:700;color:var(--admin-green);margin-top:4px">' + UNIT_ECONOMICS.ltvCac + 'x</div></div>'
            + '<div style="padding:10px 0;border-bottom:1px solid var(--admin-border)"><div style="font-size:10px;color:var(--admin-text-muted)">Payback (mois)</div><div style="font-size:18px;font-weight:700;margin-top:4px">' + UNIT_ECONOMICS.payback + '</div></div>'
            + '<div style="padding:10px 0;border-bottom:1px solid var(--admin-border)"><div style="font-size:10px;color:var(--admin-text-muted)">Durée vie moy.</div><div style="font-size:18px;font-weight:700;margin-top:4px">' + UNIT_ECONOMICS.avgLifespan + ' mois</div></div>'
            + '<div style="padding:10px 0"><div style="font-size:10px;color:var(--admin-text-muted)">Marge brute</div><div style="font-size:18px;font-weight:700;color:var(--admin-green);margin-top:4px">' + UNIT_ECONOMICS.grossMargin + '%</div></div>'
            + '<div style="padding:10px 0"><div style="font-size:10px;color:var(--admin-text-muted)">Marge nette</div><div style="font-size:18px;font-weight:700;color:var(--admin-green);margin-top:4px">' + UNIT_ECONOMICS.netMargin + '%</div></div>'
          + '</div>'
        + '</div>'
      + '</div>'

    + '</div>';
}
