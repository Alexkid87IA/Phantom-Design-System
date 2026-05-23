// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — AI Configuration
// ═══════════════════════════════════════════════════════════

var AI_MODELS = [
  { task: 'Social Media Content', provider: 'Anthropic', model: 'Claude Sonnet 4', temp: 0.7, maxTokens: 2048, cost: '12.40 €/jour', status: 'active' },
  { task: 'Google Reviews Replies', provider: 'OpenAI', model: 'GPT-4o', temp: 0.5, maxTokens: 1024, cost: '8.20 €/jour', status: 'active' },
  { task: 'SEO Content', provider: 'Anthropic', model: 'Claude Sonnet 4', temp: 0.6, maxTokens: 4096, cost: '15.80 €/jour', status: 'active' },
  { task: 'Photo Captions', provider: 'OpenAI', model: 'GPT-4o-mini', temp: 0.8, maxTokens: 512, cost: '2.10 €/jour', status: 'active' },
  { task: 'Brand Strategy', provider: 'Anthropic', model: 'Claude Opus 4', temp: 0.4, maxTokens: 8192, cost: '22.50 €/jour', status: 'active' },
  { task: 'Fallback', provider: 'Google', model: 'Gemini 2.5 Pro', temp: 0.6, maxTokens: 2048, cost: '—', status: 'standby' },
];

var COST_BREAKDOWN = [
  { provider: 'Anthropic', daily: 50.70, monthly: 1521, percent: 58 },
  { provider: 'OpenAI', daily: 10.30, monthly: 309, percent: 12 },
  { provider: 'Google', daily: 0, monthly: 0, percent: 0 },
];

var BUDGET = { monthly: 2500, current: 1830, alert: 2000 };

export function renderAiConfig() {
  var modelRows = AI_MODELS.map(function(m) {
    var statusBadge = m.status === 'active'
      ? '<span class="admin-badge admin-badge-green">Actif</span>'
      : '<span class="admin-badge admin-badge-muted">Standby</span>';
    return '<tr>'
      + '<td><strong>' + m.task + '</strong></td>'
      + '<td>' + m.provider + '</td>'
      + '<td>' + m.model + '</td>'
      + '<td>' + m.temp + '</td>'
      + '<td>' + m.maxTokens.toLocaleString('fr-FR') + '</td>'
      + '<td>' + m.cost + '</td>'
      + '<td>' + statusBadge + '</td>'
      + '<td><div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:4px 8px">Éditer</div></td>'
    + '</tr>';
  }).join('');

  var costBars = COST_BREAKDOWN.map(function(c) {
    return '<div style="display:flex;align-items:center;gap:12px;padding:8px 0">'
      + '<div style="width:100px;font-size:13px;font-weight:500">' + c.provider + '</div>'
      + '<div class="admin-progress" style="flex:1"><div class="admin-progress-fill" style="width:' + c.percent + '%;background:var(--admin-violet)"></div></div>'
      + '<div style="font-size:12px;font-weight:600;min-width:80px;text-align:right">' + c.monthly.toLocaleString('fr-FR') + ' €/mois</div>'
    + '</div>';
  }).join('');

  var budgetPercent = BUDGET.monthly > 0 ? Math.round((BUDGET.current / BUDGET.monthly) * 100) : 0;
  var budgetColor = budgetPercent > 90 ? 'var(--admin-red)' : budgetPercent > 70 ? 'var(--admin-orange)' : 'var(--admin-green)';

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Coût journalier</div><div class="admin-kpi-value">61 €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Coût mensuel</div><div class="admin-kpi-value">' + BUDGET.current.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Budget mensuel</div><div class="admin-kpi-value">' + BUDGET.monthly.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Consommation</div><div class="admin-kpi-value" style="color:' + budgetColor + '">' + budgetPercent + '%</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Configuration par tâche</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Tâche</th><th>Provider</th><th>Modèle</th><th>Temp</th><th>Tokens</th><th>Coût/jour</th><th>Statut</th><th></th></tr></thead><tbody>' + modelRows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Répartition des coûts</div></div>'
      + '<div class="admin-card">'
        + costBars
        + '<div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--admin-border)">'
          + '<div style="display:flex;justify-content:space-between;margin-bottom:6px">'
            + '<span style="font-size:12px;color:var(--admin-text-muted)">Budget consommé</span>'
            + '<span style="font-size:12px;font-weight:600;color:' + budgetColor + '">' + BUDGET.current.toLocaleString('fr-FR') + ' / ' + BUDGET.monthly.toLocaleString('fr-FR') + ' €</span>'
          + '</div>'
          + '<div class="admin-progress"><div class="admin-progress-fill" style="width:' + budgetPercent + '%;background:' + budgetColor + '"></div></div>'
          + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:6px">Alerte à ' + BUDGET.alert.toLocaleString('fr-FR') + ' €</div>'
        + '</div>'
      + '</div>'
    + '</div>';
}
