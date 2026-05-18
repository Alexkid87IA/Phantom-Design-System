// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — API Keys & Integrations
// ═══════════════════════════════════════════════════════════

var API_KEYS = [
  { id: 'k1', service: 'Stripe', env: 'production', key: 'sk_live_••••••••7Fk2', lastUsed: 'Il y a 2h', status: 'active', rotated: '10 mars 2026' },
  { id: 'k2', service: 'Stripe', env: 'test', key: 'sk_test_••••••••xQ9m', lastUsed: 'Il y a 1j', status: 'active', rotated: '10 mars 2026' },
  { id: 'k3', service: 'Meta (Instagram/Facebook)', env: 'production', key: 'EAAx••••••••H4ZD', lastUsed: 'Il y a 15min', status: 'active', rotated: '28 avril 2026' },
  { id: 'k4', service: 'Google Business Profile', env: 'production', key: 'AIza••••••••vQ3s', lastUsed: 'Il y a 30min', status: 'active', rotated: '15 avril 2026' },
  { id: 'k5', service: 'OpenAI', env: 'production', key: 'sk-proj-••••••••Yz8', lastUsed: 'Il y a 5min', status: 'active', rotated: '1 mai 2026' },
  { id: 'k6', service: 'Anthropic', env: 'production', key: 'sk-ant-••••••••Kp4', lastUsed: 'Il y a 3min', status: 'active', rotated: '1 mai 2026' },
  { id: 'k7', service: 'SendGrid', env: 'production', key: 'SG.••••••••vR7', lastUsed: 'Il y a 6h', status: 'active', rotated: '20 fév 2026' },
  { id: 'k8', service: 'Cloudinary', env: 'production', key: 'cl_••••••••9Xw', lastUsed: 'Il y a 1h', status: 'active', rotated: '5 mars 2026' },
];

var RATE_LIMITS = [
  { service: 'Meta API', limit: '200 req/h', usage: 142, percent: 71 },
  { service: 'OpenAI', limit: '10K tokens/min', usage: 6200, percent: 62 },
  { service: 'Google Business', limit: '100 req/h', usage: 34, percent: 34 },
  { service: 'SendGrid', limit: '100 emails/h', usage: 12, percent: 12 },
];

export function renderApiKeys() {
  var rows = API_KEYS.map(function(k) {
    return '<tr>'
      + '<td><strong>' + k.service + '</strong></td>'
      + '<td><span class="admin-badge admin-badge-muted">' + k.env + '</span></td>'
      + '<td style="font-family:monospace;font-size:11px;color:var(--admin-text-secondary)">' + k.key + '</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + k.lastUsed + '</td>'
      + '<td style="font-size:11px;color:var(--admin-text-muted)">' + k.rotated + '</td>'
      + '<td><span class="admin-badge admin-badge-green">Actif</span></td>'
      + '<td><div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:4px 8px" data-action="rotate">Rotation</div></td>'
    + '</tr>';
  }).join('');

  var rateBars = RATE_LIMITS.map(function(r) {
    var barColor = r.percent > 80 ? 'var(--admin-red)' : r.percent > 60 ? 'var(--admin-orange)' : 'var(--admin-green)';
    return '<div style="margin-bottom:14px">'
      + '<div style="display:flex;justify-content:space-between;margin-bottom:4px">'
        + '<span style="font-size:12px;font-weight:500">' + r.service + '</span>'
        + '<span style="font-size:11px;color:var(--admin-text-muted)">' + r.percent + '% · ' + r.limit + '</span>'
      + '</div>'
      + '<div class="admin-progress"><div class="admin-progress-fill" style="width:' + r.percent + '%;background:' + barColor + '"></div></div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Clés actives</div><div class="admin-kpi-value">' + API_KEYS.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Services connectés</div><div class="admin-kpi-value">7</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Dernière rotation</div><div class="admin-kpi-value" style="font-size:16px">1 mai</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Clés API</div>'
        + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:6px 14px">+ Ajouter clé</div>'
      + '</div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr><th>Service</th><th>Env</th><th>Clé</th><th>Dernier usage</th><th>Rotation</th><th>Statut</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>'
      + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Rate Limiting</div></div>'
      + '<div class="admin-card">' + rateBars + '</div>'
    + '</div>';
}
