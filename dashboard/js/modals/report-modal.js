// =====================================================
//  MODAL -- Monthly Report
// =====================================================

import { AGENTS, AGENT_MISSIONS } from '../data/agents.js';
import { STATS } from '../data/stats.js';
import { ROI_KPIS, ROI_AGENTS } from '../data/roi.js';
import { activeAgentCount, escapeHtml } from '../lib/helpers.js';
import { ghostSvg } from '../lib/icons.js';
import { openModal, closeModal } from './modal-shell.js';
import { toast } from '../lib/toast.js';

export function openReportModal() {
  var totalTasks = 0;
  var totalRate = 0;
  var missionKeys = Object.keys(AGENT_MISSIONS);
  for (var i = 0; i < missionKeys.length; i++) {
    totalTasks += AGENT_MISSIONS[missionKeys[i]].completed;
    totalRate += AGENT_MISSIONS[missionKeys[i]].successRate;
  }
  var avgSuccess = Math.round(totalRate / missionKeys.length);

  var agentRows = AGENTS.map(function(a) {
    var m = AGENT_MISSIONS[a.id] || { completed: 0, successRate: 0 };
    return '<div class="report-row">'
      + '<span class="report-row-agent">' + ghostSvg(a.color, 14) + ' ' + escapeHtml(a.name) + '</span>'
      + '<div class="report-bar"><div class="report-bar-fill" style="width:' + m.successRate + '%;background:' + a.color + ';border-radius:2px"></div></div>'
      + '<span class="report-row-value">' + m.completed + ' tâches &middot; ' + m.successRate + '%</span>'
    + '</div>';
  }).join('');

  var kpiRows = STATS.map(function(s) {
    return '<div class="report-row">'
      + '<span class="report-row-agent">' + s.label + '</span>'
      + '<span class="report-row-value">' + s.value + '</span>'
    + '</div>';
  }).join('');

  var roiValue = ROI_KPIS.length > 0 ? ROI_KPIS[0].value : '—';
  var roiMulti = ROI_KPIS.length > 2 ? ROI_KPIS[2].value : '—';
  var hoursSaved = ROI_KPIS.length > 1 ? ROI_KPIS[1].value : '—';

  var roiAgentRows = ROI_AGENTS.map(function(r) {
    var a = AGENTS.find(function(ag) { return ag.id === r.id; });
    var color = a ? a.color : 'var(--ink-30)';
    var name = a ? a.name : r.label;
    return '<div class="report-row">'
      + '<span class="report-row-agent">' + ghostSvg(color, 14) + ' ' + escapeHtml(name) + '</span>'
      + '<span class="report-row-value" style="color:' + color + '">' + r.value.toLocaleString('fr-FR') + ' &euro;</span>'
    + '</div>';
  }).join('');

  openModal(
    '<div class="modal-header">'
      + '<span class="modal-title">Rapport mensuel &mdash; Mai 2026</span>'
      + '<button class="modal-close" data-action="close-modal">&times;</button>'
    + '</div>'
    + '<div class="modal-body">'
      + '<div class="report-grid">'
        + '<div class="report-card">'
          + '<div class="report-card-value">' + roiValue + '</div>'
          + '<div class="report-card-label">Valeur générée</div>'
        + '</div>'
        + '<div class="report-card">'
          + '<div class="report-card-value">' + hoursSaved + '</div>'
          + '<div class="report-card-label">Heures économisées</div>'
        + '</div>'
        + '<div class="report-card">'
          + '<div class="report-card-value">' + activeAgentCount() + '</div>'
          + '<div class="report-card-label">Agents actifs</div>'
        + '</div>'
        + '<div class="report-card">'
          + '<div class="report-card-value">' + roiMulti + '</div>'
          + '<div class="report-card-label">ROI</div>'
        + '</div>'
      + '</div>'
      + '<div class="report-section-title">Performance par agent</div>'
      + agentRows
      + '<div class="report-section-title">Valeur par agent</div>'
      + roiAgentRows
      + '<div class="report-section-title">KPIs business</div>'
      + kpiRows
    + '</div>'
    + '<div class="modal-footer">'
      + '<button class="btn-outline" data-action="close-modal">Fermer</button>'
      + '<button class="btn-primary" id="report-export-pdf">Exporter PDF &#8599;</button>'
    + '</div>'
  );

  // Export PDF button
  var exportBtn = document.getElementById('report-export-pdf');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      exportBtn.textContent = 'Envoyé !';
      exportBtn.disabled = true;
      toast('Rapport envoyé par email — vérifie ta boîte');
    });
  }

  // Close buttons
  document.querySelectorAll('[data-action="close-modal"]').forEach(function(el) {
    el.addEventListener('click', closeModal);
  });
}
