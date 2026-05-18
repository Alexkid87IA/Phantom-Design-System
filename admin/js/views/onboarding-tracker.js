// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Client Onboarding Tracker
// ═══════════════════════════════════════════════════════════

import { CLIENTS } from '../data/clients.js';

var ONBOARDING_STEPS = [
  'Appel bienvenue',
  'Comptes connectés',
  'Premier agent déployé',
  'Quick win 72h',
  'Rapport J7',
  'Point J14',
  'Bilan J30',
];

var CLIENT_ONBOARDING = [
  { clientId: 'c6', client: 'Pizza Roma', completed: 3, total: 7, status: 'in_progress', daysIn: 7, alert: false },
  { clientId: 'c11', client: 'Studio Lumière', completed: 2, total: 7, status: 'in_progress', daysIn: 3, alert: false },
  { clientId: 'c10', client: 'Fleur de Sel', completed: 5, total: 7, status: 'in_progress', daysIn: 25, alert: true },
  { clientId: 'c5', client: "L'Atelier Zen", completed: 6, total: 7, status: 'in_progress', daysIn: 39, alert: true },
];

export function renderOnboardingTracker() {
  var alerts = CLIENT_ONBOARDING.filter(function(c) { return c.alert; }).length;

  var cards = CLIENT_ONBOARDING.map(function(c) {
    var progress = Math.round((c.completed / c.total) * 100);
    var barColor = c.alert ? 'var(--admin-orange)' : 'var(--admin-violet)';
    var steps = ONBOARDING_STEPS.map(function(step, i) {
      var done = i < c.completed;
      return '<div style="display:flex;align-items:center;gap:8px;padding:4px 0">'
        + '<div style="width:16px;height:16px;border-radius:50%;border:2px solid ' + (done ? 'var(--admin-green)' : 'var(--admin-border-2)') + ';display:flex;align-items:center;justify-content:center;font-size:9px;color:' + (done ? 'var(--admin-green)' : 'var(--admin-text-muted)') + '">' + (done ? '✓' : '') + '</div>'
        + '<span style="font-size:12px;color:' + (done ? 'var(--admin-text)' : 'var(--admin-text-muted)') + '">' + step + '</span>'
      + '</div>';
    }).join('');

    return '<div class="admin-card">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'
        + '<div>'
          + '<div style="font-size:14px;font-weight:600">' + c.client + '</div>'
          + '<div style="font-size:11px;color:var(--admin-text-muted)">Jour ' + c.daysIn + ' · ' + c.completed + '/' + c.total + ' étapes</div>'
        + '</div>'
        + (c.alert ? '<span class="admin-badge admin-badge-orange">Retard</span>' : '<span class="admin-badge admin-badge-green">En cours</span>')
      + '</div>'
      + '<div class="admin-progress" style="margin-bottom:14px"><div class="admin-progress-fill" style="width:' + progress + '%;background:' + barColor + '"></div></div>'
      + steps
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Onboardings en cours</div><div class="admin-kpi-value">' + CLIENT_ONBOARDING.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">En retard</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + alerts + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Temps moyen complétion</div><div class="admin-kpi-value">21j</div></div>'
    + '</div>'
    + '<div class="admin-section-header"><div class="admin-section-title">Suivi onboarding clients</div></div>'
    + '<div class="admin-grid admin-grid-2">' + cards + '</div>';
}
