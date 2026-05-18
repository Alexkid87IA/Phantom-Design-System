// ═══════════════════════════════════════════════════════════
//  VIEW — Facturation client
// ═══════════════════════════════════════════════════════════

import { ROI_KPIS } from '../data/roi.js';

var PLAN = {
  name: 'Standard',
  price: 1490,
  agents: 6,
  maxAgents: 8,
  renewal: '1er juin 2026',
  since: '12 mars 2026',
  card: '•••• •••• •••• 4242',
  cardType: 'Visa',
};

var INVOICES = [
  { id: 'f1', period: 'Mai 2026', amount: 1490, status: 'paid', date: '01/05/2026', pdf: '#' },
  { id: 'f2', period: 'Avril 2026', amount: 1490, status: 'paid', date: '01/04/2026', pdf: '#' },
  { id: 'f3', period: 'Mars 2026', amount: 1490, status: 'paid', date: '12/03/2026', pdf: '#' },
];

export function renderBilling() {
  var invoiceRows = INVOICES.map(function(inv) {
    return '<div class="billing-invoice-row">'
      + '<span class="billing-invoice-period">' + inv.period + '</span>'
      + '<span class="billing-invoice-amount">' + inv.amount + ' €</span>'
      + '<span class="billing-invoice-status billing-status-' + inv.status + '">' + (inv.status === 'paid' ? 'Payée' : 'En attente') + '</span>'
      + '<span class="billing-invoice-date">' + inv.date + '</span>'
      + '<span class="billing-invoice-dl" data-action="billing-download-pdf">PDF ↓</span>'
    + '</div>';
  }).join('');

  var kpi = ROI_KPIS.length > 0 ? ROI_KPIS[0] : null;
  var roiMulti = ROI_KPIS.length > 2 ? ROI_KPIS[2] : null;
  var valueGenerated = kpi ? kpi.value : '—';
  var multiValue = roiMulti ? roiMulti.value : '—';

  var roiCard = ''
    + '<div class="billing-roi-card">'
      + '<div class="billing-roi-header">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--rainbow-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
        + '<span class="billing-roi-title">Ce que tes agents te rapportent</span>'
      + '</div>'
      + '<div class="billing-roi-grid">'
        + '<div class="billing-roi-stat">'
          + '<div class="billing-roi-stat-value billing-roi-generated">' + valueGenerated + '</div>'
          + '<div class="billing-roi-stat-label">Valeur générée ce mois</div>'
        + '</div>'
        + '<div class="billing-roi-stat">'
          + '<div class="billing-roi-stat-value billing-roi-cost">' + PLAN.price + ' €</div>'
          + '<div class="billing-roi-stat-label">Ton abonnement</div>'
        + '</div>'
        + '<div class="billing-roi-stat">'
          + '<div class="billing-roi-stat-value billing-roi-multi">' + multiValue + '</div>'
          + '<div class="billing-roi-stat-label">Retour sur investissement</div>'
        + '</div>'
      + '</div>'
      + '<div class="billing-roi-footer">Chaque euro investi dans Phantom te rapporte ' + multiValue + ' en retour. <a data-nav="roi" style="color:var(--phantom-violet);cursor:pointer;font-weight:600">Voir le détail &rarr;</a></div>'
    + '</div>';

  return '<div class="view-billing">'
    + '<h2 class="view-title">Facturation</h2>'
    + '<p class="view-subtitle">Ton abonnement et tes factures en un coup d\'œil</p>'

    + roiCard

    + '<div class="billing-grid">'
      + '<div class="billing-plan-card">'
        + '<div class="billing-plan-header">'
          + '<div class="billing-plan-name">Plan ' + PLAN.name + '</div>'
          + '<div class="billing-plan-price">' + PLAN.price + ' €<span>/mois</span></div>'
        + '</div>'
        + '<div class="billing-plan-details">'
          + '<div class="billing-plan-row"><span>Agents actifs</span><span>' + PLAN.agents + ' / ' + PLAN.maxAgents + '</span></div>'
          + '<div class="billing-plan-row"><span>Prochain renouvellement</span><span>' + PLAN.renewal + '</span></div>'
          + '<div class="billing-plan-row"><span>Client depuis</span><span>' + PLAN.since + '</span></div>'
        + '</div>'
        + '<div class="billing-plan-actions">'
          + '<button class="billing-btn billing-btn-primary" data-action="billing-change-plan">Changer de plan</button>'
        + '</div>'
      + '</div>'

      + '<div class="billing-payment-card">'
        + '<div class="billing-section-title">Moyen de paiement</div>'
        + '<div class="billing-card-display">'
          + '<div class="billing-card-icon">💳</div>'
          + '<div class="billing-card-info">'
            + '<div class="billing-card-number">' + PLAN.card + '</div>'
            + '<div class="billing-card-type">' + PLAN.cardType + ' · Expire 08/28</div>'
          + '</div>'
        + '</div>'
        + '<button class="billing-btn billing-btn-ghost" data-action="billing-edit-payment">Modifier</button>'
      + '</div>'
    + '</div>'

    + '<div class="billing-invoices">'
      + '<div class="billing-section-title">Historique des factures</div>'
      + '<div class="billing-invoice-header">'
        + '<span>Période</span><span>Montant</span><span>Statut</span><span>Date</span><span></span>'
      + '</div>'
      + invoiceRows
    + '</div>'
  + '</div>';
}
