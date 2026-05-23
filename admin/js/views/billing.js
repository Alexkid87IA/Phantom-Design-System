// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Billing / Facturation
// ═══════════════════════════════════════════════════════════

import { getState } from '../store.js';
import { INVOICES, REVENUE_KPIS } from '../data/revenue.js';

export function renderBilling() {
  var STATE = getState();
  var filter = STATE.filter || 'all';

  var filtered = filter === 'all'
    ? INVOICES
    : INVOICES.filter(function(i) { return i.status === filter; });

  var counts = {
    all: INVOICES.length,
    paid: INVOICES.filter(function(i) { return i.status === 'paid'; }).length,
    pending: INVOICES.filter(function(i) { return i.status === 'pending'; }).length,
    overdue: INVOICES.filter(function(i) { return i.status === 'overdue'; }).length,
    trial: INVOICES.filter(function(i) { return i.status === 'trial'; }).length,
  };

  var totalPaid = INVOICES.filter(function(i) { return i.status === 'paid'; }).reduce(function(s, i) { return s + i.amount; }, 0);
  var totalPending = INVOICES.filter(function(i) { return i.status === 'pending' || i.status === 'overdue'; }).reduce(function(s, i) { return s + i.amount; }, 0);

  var filters = [
    { id: 'all', label: 'Toutes (' + counts.all + ')' },
    { id: 'paid', label: 'Payées (' + counts.paid + ')' },
    { id: 'pending', label: 'Attente (' + counts.pending + ')' },
    { id: 'overdue', label: 'Retard (' + counts.overdue + ')' },
    { id: 'trial', label: 'Trial (' + counts.trial + ')' },
  ];

  var filterHtml = filters.map(function(f) {
    return '<div class="admin-filter-btn' + (filter === f.id ? ' admin-filter-active' : '') + '" data-filter="' + f.id + '">' + f.label + '</div>';
  }).join('');

  var rows = filtered.map(function(inv) {
    var badge = inv.status === 'paid'
      ? '<span class="admin-badge admin-badge-green">Payée</span>'
      : inv.status === 'overdue'
        ? '<span class="admin-badge admin-badge-red">Retard</span>'
        : inv.status === 'trial'
          ? '<span class="admin-badge admin-badge-blue">Trial</span>'
          : '<span class="admin-badge admin-badge-orange">Attente</span>';

    var actions = '';
    if (inv.status === 'pending' || inv.status === 'overdue') {
      actions = '<div class="admin-btn admin-btn-ghost" data-action="remind" style="font-size:10px;padding:4px 8px">Relancer</div>';
    }

    return '<tr>'
      + '<td>' + inv.client + '</td>'
      + '<td>' + inv.period + '</td>'
      + '<td style="font-weight:600">' + inv.amount.toLocaleString('fr-FR') + ' €</td>'
      + '<td>' + inv.date + '</td>'
      + '<td>' + badge + '</td>'
      + '<td>' + actions + '</td>'
    + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Encaissé ce mois</div><div class="admin-kpi-value" style="color:var(--admin-green)">' + totalPaid.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">En attente</div><div class="admin-kpi-value" style="color:var(--admin-orange)">' + totalPending.toLocaleString('fr-FR') + ' €</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Factures en retard</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + counts.overdue + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Taux recouvrement</div><div class="admin-kpi-value">' + ((totalPaid + totalPending) > 0 ? Math.round((totalPaid / (totalPaid + totalPending)) * 100) : 0) + '%</div></div>'
    + '</div>'
    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Factures</div>'
        + '<div class="admin-btn admin-btn-ghost" data-action="export">Exporter CSV</div>'
      + '</div>'
      + '<div class="admin-filters">' + filterHtml + '</div>'
    + '</div>'
    + '<div class="admin-card" style="padding:0;overflow:hidden">'
      + '<table class="admin-table"><thead><tr><th>Client</th><th>Période</th><th>Montant</th><th>Date</th><th>Statut</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>'
    + '</div>';
}
