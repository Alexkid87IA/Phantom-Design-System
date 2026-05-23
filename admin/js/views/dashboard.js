// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Dashboard
// ═══════════════════════════════════════════════════════════

import { CLIENTS, totalMRR, activeClientCount } from '../data/clients.js';
import { ALL_AGENTS, ALERTS, CONTENT_QUEUE, totalAgents, activeAgents, errorAgents, pendingContent } from '../data/admin-agents.js';
import { PILOTS } from '../data/pilots.js';
import { MRR_HISTORY, REVENUE_KPIS } from '../data/revenue.js';
import { esc } from '../lib/esc.js';

var HEALTH_TRENDS = {
  c3: [8, 7, 7, 6, 5, 4, 4, 3],
  c5: [7, 6, 6, 5, 5, 4, 3, 3],
  c7: [9, 7, 5, 4, 3, 2, 1, 0],
  c12: [6, 5, 4, 3, 2, 1, 0, 0],
};

function miniSparkline(data, color) {
  var w = 64, h = 20;
  var max = Math.max.apply(null, data);
  var min = Math.min.apply(null, data);
  var range = max - min || 1;
  var pts = data.map(function(v, i) {
    var x = data.length > 1 ? (i / (data.length - 1)) * w : w / 2;
    var y = h - ((v - min) / range) * (h * 0.7) - h * 0.15;
    return x + ',' + y;
  }).join(' ');
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" style="display:block;opacity:0.7">'
    + '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
  + '</svg>';
}

function renderChurnRisk() {
  var atRisk = CLIENTS.filter(function(c) {
    return (c.health === 'red' || c.health === 'orange') && c.status !== 'churned';
  });

  if (atRisk.length === 0) {
    return '<div class="admin-card">'
      + '<div class="admin-card-header"><div class="admin-card-title">Santé clients</div>'
      + '<span class="admin-badge admin-badge-green">OK</span></div>'
      + '<div style="text-align:center;padding:20px 0;color:var(--admin-text-muted);font-size:13px">Tous les clients sont en bonne santé</div>'
    + '</div>';
  }

  var items = atRisk.map(function(c) {
    var healthColor = c.health === 'red' ? 'var(--admin-red)' : 'var(--admin-orange)';
    var healthLabel = c.health === 'red' ? 'Critique' : 'À surveiller';
    var healthBadge = c.health === 'red' ? 'admin-badge-red' : 'admin-badge-orange';

    var alert = ALERTS.find(function(a) { return a.client === c.name; });
    var reason = alert ? alert.message : 'Activité en baisse';

    var daysSince = '';
    var urgencyHtml = '';
    if (c.lastLogin) {
      var last = new Date(c.lastLogin);
      var now = new Date();
      var diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
      daysSince = diff === 0 ? 'Aujourd\'hui' : diff === 1 ? 'Hier' : 'Il y a ' + diff + 'j';
      if (diff >= 5) {
        urgencyHtml = '<div class="admin-churn-urgency admin-churn-urgency-red">Critique — relancer aujourd\'hui</div>';
      } else if (diff >= 3) {
        urgencyHtml = '<div class="admin-churn-urgency admin-churn-urgency-orange">Escalade sous 48h</div>';
      }
    }

    var trendData = HEALTH_TRENDS[c.id];
    var sparkHtml = trendData ? miniSparkline(trendData, healthColor) : '';
    var isUrgent = c.health === 'red';

    return '<div class="admin-churn-item' + (isUrgent ? ' admin-churn-urgent' : '') + '" data-nav="clients">'
      + '<div class="admin-churn-left">'
        + '<div class="admin-churn-dot' + (isUrgent ? ' admin-churn-dot-pulse' : '') + '" style="background:' + healthColor + '"></div>'
        + '<div>'
          + '<div class="admin-churn-name">' + esc(c.name) + '</div>'
          + '<div class="admin-churn-reason">' + esc(reason) + '</div>'
          + '<div class="admin-churn-mrr-risk">' + c.mrr.toLocaleString('fr-FR') + ' €/mois à risque</div>'
          + urgencyHtml
        + '</div>'
      + '</div>'
      + '<div class="admin-churn-right">'
        + sparkHtml
        + '<span class="admin-churn-login">' + daysSince + '</span>'
        + '<span class="admin-badge ' + healthBadge + '">' + healthLabel + '</span>'
        + '<button class="admin-churn-action" data-churn-client="' + c.id + '">Contacter</button>'
      + '</div>'
    + '</div>';
  }).join('');

  var mrrAtRisk = atRisk.reduce(function(sum, c) { return sum + c.mrr; }, 0);

  return '<div class="admin-card admin-churn-card">'
    + '<div class="admin-card-header">'
      + '<div>'
        + '<div class="admin-card-title">Clients à risque</div>'
        + '<div class="admin-card-subtitle">' + mrrAtRisk.toLocaleString('fr-FR') + ' € MRR exposé</div>'
      + '</div>'
      + '<span class="admin-badge admin-badge-red">' + atRisk.length + '</span>'
    + '</div>'
    + items
  + '</div>';
}

function renderKPIs() {
  var mrr = totalMRR().toLocaleString('fr-FR');
  var active = activeClientCount();
  var agents = totalAgents();
  var agentsActive = activeAgents();
  var errors = errorAgents();
  var pending = pendingContent();

  return ''
    + '<div class="admin-grid admin-grid-4">'
      + '<div class="admin-kpi" data-nav="revenue">'
        + '<div class="admin-kpi-label">MRR</div>'
        + '<div class="admin-kpi-value" style="color:var(--admin-green)">' + mrr + ' €</div>'
        + '<div class="admin-kpi-change admin-kpi-up">+' + REVENUE_KPIS.mrrNet.toLocaleString('fr-FR') + ' € ce mois</div>'
      + '</div>'
      + '<div class="admin-kpi" data-nav="clients">'
        + '<div class="admin-kpi-label">Clients actifs</div>'
        + '<div class="admin-kpi-value">' + active + '</div>'
        + '<div class="admin-kpi-change admin-kpi-up">+2 ce mois</div>'
      + '</div>'
      + '<div class="admin-kpi" data-nav="agents">'
        + '<div class="admin-kpi-label">Agents</div>'
        + '<div class="admin-kpi-value">' + agents + '</div>'
        + '<div class="admin-kpi-change">' + agentsActive + ' actifs · <span style="color:var(--admin-red)">' + errors + ' erreur</span></div>'
      + '</div>'
      + '<div class="admin-kpi" data-nav="validation">'
        + '<div class="admin-kpi-label">Contenu en attente</div>'
        + '<div class="admin-kpi-value">' + pending + '</div>'
        + '<div class="admin-kpi-change">' + CONTENT_QUEUE.filter(function(c) { return c.status === 'pending_pilot'; }).length + ' côté pilot</div>'
      + '</div>'
    + '</div>';
}

function renderMRRChart() {
  var maxMrr = Math.max.apply(null, MRR_HISTORY.map(function(m) { return m.mrr; }));
  var bars = MRR_HISTORY.map(function(m) {
    var h = maxMrr > 0 ? Math.round((m.mrr / maxMrr) * 100) : 0;
    return '<div class="admin-chart-bar-col">'
      + '<div class="admin-chart-bar-value">' + (m.mrr / 1000).toFixed(1) + 'k</div>'
      + '<div class="admin-chart-bar" style="height:' + h + '%"></div>'
      + '<div class="admin-chart-bar-label">' + m.month.split(' ')[0].substring(0, 3) + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-card">'
      + '<div class="admin-card-header">'
        + '<div><div class="admin-card-title">Évolution MRR</div><div class="admin-card-subtitle">6 derniers mois</div></div>'
      + '</div>'
      + '<div class="admin-chart-bars">' + bars + '</div>'
    + '</div>';
}

function renderAlerts() {
  var highAlerts = ALERTS.filter(function(a) { return a.severity === 'high'; });
  var items = highAlerts.map(function(a) {
    var color = a.severity === 'high' ? 'var(--admin-red)' : 'var(--admin-orange)';
    return '<div class="admin-alert-item">'
      + '<div class="admin-alert-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>'
      + '<div class="admin-alert-body">'
        + '<div class="admin-alert-title">' + a.client + '</div>'
        + '<div class="admin-alert-desc">' + a.message + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-card">'
      + '<div class="admin-card-header">'
        + '<div class="admin-card-title">Alertes critiques</div>'
        + '<span class="admin-badge admin-badge-red">' + highAlerts.length + '</span>'
      + '</div>'
      + items
    + '</div>';
}

function renderPilotLoad() {
  var items = PILOTS.map(function(p) {
    var barColor = p.workload > 80 ? 'var(--admin-orange)' : 'var(--admin-violet)';
    return '<div style="margin-bottom:14px">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">'
        + '<div style="display:flex;align-items:center;gap:8px">'
          + '<div style="width:24px;height:24px;border-radius:50%;background:' + p.color + ';display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff">' + p.avatar + '</div>'
          + '<span style="font-size:12px;font-weight:500">' + p.name.split(' ')[0] + '</span>'
        + '</div>'
        + '<span style="font-size:11px;color:var(--admin-text-muted)">' + p.workload + '%</span>'
      + '</div>'
      + '<div class="admin-progress"><div class="admin-progress-fill" style="width:' + p.workload + '%;background:' + barColor + '"></div></div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-card">'
      + '<div class="admin-card-header"><div class="admin-card-title">Charge Pilots</div></div>'
      + items
    + '</div>';
}

function renderRecentActivity() {
  var recent = CONTENT_QUEUE.slice(0, 5).map(function(c) {
    var statusBadge = c.status === 'pending_client'
      ? '<span class="admin-badge admin-badge-orange">Client</span>'
      : c.status === 'pending_pilot'
        ? '<span class="admin-badge admin-badge-violet">Pilot</span>'
        : '<span class="admin-badge admin-badge-green">OK</span>';
    return '<div class="admin-queue-item">'
      + '<div class="admin-queue-info">'
        + '<div class="admin-queue-title">' + c.title + '</div>'
        + '<div class="admin-queue-meta">' + c.client + ' · ' + c.agent + ' · ' + c.since + '</div>'
      + '</div>'
      + statusBadge
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-card">'
      + '<div class="admin-card-header"><div class="admin-card-title">Activité récente</div></div>'
      + recent
    + '</div>';
}

function renderTodayFocus() {
  var pending = pendingContent();
  var errors = errorAgents();
  var highAlerts = ALERTS.filter(function(a) { return a.severity === 'high'; }).length;

  var tasks = [];
  if (pending > 0) tasks.push({ label: pending + ' contenus à valider', action: 'validation', color: 'var(--admin-orange)', icon: '📝', urgent: true });
  if (errors > 0) tasks.push({ label: errors + ' agent en erreur', action: 'agents', color: 'var(--admin-red)', icon: '⚠️', urgent: true });
  if (highAlerts > 0) tasks.push({ label: highAlerts + ' alerte(s) client', action: 'health', color: 'var(--admin-red)', icon: '🚨', urgent: true });
  tasks.push({ label: 'Vérifier SLA', action: 'sla', color: 'var(--admin-blue)', icon: '⏱' });
  tasks.push({ label: 'Messages non lus', action: 'messaging', color: 'var(--admin-violet)', icon: '💬' });

  var taskItems = tasks.map(function(t) {
    return '<div class="admin-focus-item' + (t.urgent ? ' admin-focus-urgent' : '') + '" data-nav="' + t.action + '">'
      + '<span class="admin-focus-icon">' + t.icon + '</span>'
      + '<span class="admin-focus-label">' + t.label + '</span>'
      + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto;opacity:0.4"><polyline points="9 18 15 12 9 6"/></svg>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-card admin-focus-card">'
      + '<div class="admin-card-header">'
        + '<div><div class="admin-card-title">Focus du jour</div><div class="admin-card-subtitle">Actions prioritaires</div></div>'
      + '</div>'
      + '<div class="admin-focus-list">' + taskItems + '</div>'
    + '</div>';
}

function renderHealthVerdict() {
  var atRisk = CLIENTS.filter(function(c) {
    return (c.health === 'red' || c.health === 'orange') && c.status !== 'churned';
  });
  var mrrAtRisk = atRisk.reduce(function(sum, c) { return sum + c.mrr; }, 0);
  var growing = REVENUE_KPIS.mrrNet > 0;
  var ltvCac = REVENUE_KPIS.cac > 0 ? (REVENUE_KPIS.ltv / REVENUE_KPIS.cac).toFixed(1) : '0.0';
  var color = growing ? 'var(--admin-green)' : 'var(--admin-red)';
  var label = growing ? 'En croissance' : 'Attention requise';
  var arrow = growing ? '&#9650;' : '&#9660;';

  var riskLine = mrrAtRisk > 0
    ? '<span style="color:var(--admin-red);font-weight:600">' + mrrAtRisk.toLocaleString('fr-FR') + ' &euro; MRR exposé</span> sur ' + atRisk.length + ' client' + (atRisk.length > 1 ? 's' : '') + ' à risque — un appel aujourd\'hui peut tout sauver. '
    : '';

  return ''
    + '<div class="admin-card" style="border-left:4px solid ' + color + '">'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">'
        + '<span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:' + color + '">' + arrow + ' ' + label + '</span>'
        + '<span style="font-size:11px;color:var(--admin-text-muted)">LTV/CAC ' + ltvCac + 'x</span>'
      + '</div>'
      + '<div style="font-size:15px;font-weight:600;line-height:1.5;color:var(--admin-text)">'
        + '<strong>' + totalMRR().toLocaleString('fr-FR') + ' &euro;</strong> MRR actuel. '
        + riskLine
        + '+' + REVENUE_KPIS.mrrNet.toLocaleString('fr-FR') + ' &euro; net ce mois.'
      + '</div>'
    + '</div>';
}

export function renderDashboard() {
  return ''
    + '<div class="admin-section">' + renderHealthVerdict() + '</div>'
    + '<div class="admin-section">' + renderTodayFocus() + '</div>'
    + '<div class="admin-section">' + renderKPIs() + '</div>'
    + '<div class="admin-grid admin-grid-2" style="margin-bottom:28px">'
      + renderMRRChart()
      + renderAlerts()
    + '</div>'
    + '<div class="admin-grid admin-grid-2" style="margin-bottom:28px">'
      + renderChurnRisk()
      + renderPilotLoad()
    + '</div>'
    + '<div class="admin-section">'
      + renderRecentActivity()
    + '</div>';
}
