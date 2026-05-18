// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Cost Management / AI Spend
//  Track AI costs, margins, and cost-per-client
// ═══════════════════════════════════════════════════════════

var COST_DATA = [
  { client: 'Sushi Boy', plan: 'Pro', mrr: 499, aiCost: 42.80, apiCalls: 1847, margin: 91.4, agents: 6 },
  { client: 'Chez Marcel', plan: 'Pro', mrr: 499, aiCost: 28.50, apiCalls: 1203, margin: 94.3, agents: 3 },
  { client: 'Bella Donna', plan: 'Starter', mrr: 199, aiCost: 15.20, apiCalls: 680, margin: 92.4, agents: 1 },
  { client: 'Green Garden', plan: 'Scale', mrr: 899, aiCost: 56.30, apiCalls: 2340, margin: 93.7, agents: 4 },
  { client: 'Maison Dupont', plan: 'Pro', mrr: 499, aiCost: 8.40, apiCalls: 320, margin: 98.3, agents: 3 },
  { client: 'Bike & Run', plan: 'Scale', mrr: 899, aiCost: 48.90, apiCalls: 2100, margin: 94.6, agents: 4 },
  { client: 'L\'Atelier Zen', plan: 'Starter', mrr: 199, aiCost: 12.80, apiCalls: 540, margin: 93.6, agents: 2 },
  { client: 'Pizza Roma', plan: 'Starter', mrr: 199, aiCost: 9.60, apiCalls: 410, margin: 95.2, agents: 1 },
  { client: 'Fleur de Sel', plan: 'Pro', mrr: 499, aiCost: 22.10, apiCalls: 920, margin: 95.6, agents: 2 },
  { client: 'Studio Lumière', plan: 'Starter', mrr: 199, aiCost: 6.30, apiCalls: 270, margin: 96.8, agents: 1 },
  { client: 'Garage Auto+', plan: 'Pro', mrr: 0, aiCost: 0, apiCalls: 0, margin: 0, agents: 2 },
];

var COST_BREAKDOWN = [
  { model: 'Claude Sonnet 4', calls: 6420, cost: 128.40, pct: 51 },
  { model: 'Claude Haiku 4.5', calls: 3100, cost: 18.60, pct: 7 },
  { model: 'Gemini Flash', calls: 2400, cost: 14.40, pct: 6 },
  { model: 'DALL-E 3', calls: 480, cost: 48.00, pct: 19 },
  { model: 'Whisper', calls: 230, cost: 6.90, pct: 3 },
  { model: 'Embeddings', calls: 8500, cost: 8.50, pct: 3 },
  { model: 'Autres', calls: 1200, cost: 26.10, pct: 10 },
];

export function renderCosts() {
  var activeClients = COST_DATA.filter(function(c) { return c.mrr > 0; });
  var totalMRR = activeClients.reduce(function(s, c) { return s + c.mrr; }, 0);
  var totalAiCost = COST_DATA.reduce(function(s, c) { return s + c.aiCost; }, 0);
  var totalCalls = COST_DATA.reduce(function(s, c) { return s + c.apiCalls; }, 0);
  var avgMargin = Math.round(activeClients.reduce(function(s, c) { return s + c.margin; }, 0) / activeClients.length * 10) / 10;

  var rows = COST_DATA.filter(function(c) { return c.mrr > 0; }).sort(function(a, b) { return b.aiCost - a.aiCost; }).map(function(c) {
    var costBar = Math.round((c.aiCost / c.mrr) * 100);
    var marginColor = c.margin >= 93 ? 'var(--admin-green)' : c.margin >= 85 ? 'var(--admin-orange)' : 'var(--admin-red)';
    return '<tr>'
      + '<td><strong>' + c.client + '</strong></td>'
      + '<td><span class="admin-badge admin-badge-muted">' + c.plan + '</span></td>'
      + '<td style="font-weight:500">' + c.mrr + ' €</td>'
      + '<td style="color:var(--admin-red)">' + c.aiCost.toFixed(2) + ' €</td>'
      + '<td>'
        + '<div style="display:flex;align-items:center;gap:6px">'
          + '<div style="flex:1;height:4px;background:var(--admin-border);border-radius:2px;overflow:hidden;max-width:60px">'
            + '<div style="width:' + Math.min(costBar, 100) + '%;height:100%;background:var(--admin-red);border-radius:2px"></div>'
          + '</div>'
          + '<span style="font-size:10px;color:var(--admin-text-muted)">' + costBar + '%</span>'
        + '</div>'
      + '</td>'
      + '<td style="font-size:12px">' + c.apiCalls.toLocaleString('fr-FR') + '</td>'
      + '<td style="font-weight:600;color:' + marginColor + '">' + c.margin + '%</td>'
    + '</tr>';
  }).join('');

  var breakdownRows = COST_BREAKDOWN.map(function(b) {
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--admin-border)">'
      + '<div style="flex:1">'
        + '<div style="font-size:13px;font-weight:500">' + b.model + '</div>'
        + '<div style="font-size:10px;color:var(--admin-text-muted)">' + b.calls.toLocaleString('fr-FR') + ' appels</div>'
      + '</div>'
      + '<div style="width:100px">'
        + '<div style="height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden"><div style="width:' + b.pct + '%;height:100%;background:var(--admin-violet);border-radius:3px"></div></div>'
      + '</div>'
      + '<div style="min-width:60px;text-align:right">'
        + '<div style="font-size:13px;font-weight:600">' + b.cost.toFixed(2) + ' €</div>'
        + '<div style="font-size:10px;color:var(--admin-text-muted)">' + b.pct + '%</div>'
      + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">MRR total</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + totalMRR.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Coût AI total (mois)</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + totalAiCost.toFixed(0) + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Appels API</div><div class="admin-kpi-value">' + totalCalls.toLocaleString('fr-FR') + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Marge moy.</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + avgMargin + '%</div></div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1fr 320px;gap:16px">'

      + '<div class="admin-section">'
        + '<div class="admin-section-header">'
          + '<div class="admin-section-title">Coûts par client</div>'
          + '<div class="admin-btn admin-btn-ghost" data-action="export" style="font-size:11px;padding:5px 12px">Export</div>'
        + '</div>'
        + '<div class="admin-card" style="padding:0;overflow:hidden">'
          + '<table class="admin-table">'
            + '<thead><tr><th>Client</th><th>Plan</th><th>MRR</th><th>Coût AI</th><th>% MRR</th><th>Appels</th><th>Marge</th></tr></thead>'
            + '<tbody>' + rows + '</tbody>'
          + '</table>'
        + '</div>'
      + '</div>'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Répartition par modèle</div></div>'
          + '<div class="admin-card" style="padding:14px">' + breakdownRows + '</div>'
        + '</div>'

        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Alertes budget</div></div>'
          + '<div class="admin-card" style="padding:14px">'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)">'
              + '<div style="font-size:12px"><span class="admin-badge admin-badge-green">OK</span> Budget mensuel : 250.90 € / 500 €</div>'
              + '<div style="margin-top:6px;height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden"><div style="width:50%;height:100%;background:var(--admin-green);border-radius:3px"></div></div>'
            + '</div>'
            + '<div style="padding:8px 0">'
              + '<div style="font-size:12px"><span class="admin-badge admin-badge-muted">Info</span> Projection fin de mois : ~320 €</div>'
              + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:4px">Basé sur la consommation des 17 premiers jours</div>'
            + '</div>'
          + '</div>'
        + '</div>'
      + '</div>'

    + '</div>';
}
