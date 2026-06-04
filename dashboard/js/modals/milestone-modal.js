// =====================================================
//  MILESTONE MODAL — ROI threshold celebrations
// =====================================================

import { ROI_KPIS } from '../data/roi.js';
import { openModal, closeModal } from './modal-shell.js';
import { celebrate } from '../lib/toast.js';
import { ghostSvg } from '../lib/icons.js';

var MILESTONES = [
  { threshold: 2, emoji: '🚀', title: 'Tu as doublé ta mise !', sub: 'Ton ROI vient de passer ×2. À ce rythme, tes agents financent les suivants d\'ici 3 mois.' },
  { threshold: 5, emoji: '🔥', title: '×5 — Ça chauffe !', sub: 'Chaque euro investi t\'en rapporte 5. Tes agents fonctionnent en pilote automatique — le prochain palier arrive vite.' },
  { threshold: 10, emoji: '💎', title: '×10 — Machine à valeur', sub: 'Dix fois ton investissement. Tu peux scaler : ajouter 3 agents et rester largement rentable.' },
  { threshold: 15, emoji: '👑', title: '×15 — Niveau patron', sub: 'Top 5% des clients Phantom. Ton business tourne sans toi — c\'est exactement le plan.' },
];

var STORAGE_KEY = 'phantom_roi_milestone';

function getSeenMilestones() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function markMilestoneSeen(threshold) {
  var seen = getSeenMilestones();
  if (seen.indexOf(threshold) === -1) {
    seen.push(threshold);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seen));
  }
}

function getCurrentROIMultiplier() {
  var roiKpi = ROI_KPIS.find(function(k) { return k.id === 'roi-multiplier'; });
  if (!roiKpi) return 0;
  var val = parseFloat((roiKpi.value + '').replace(/[^\d.,]/g, '').replace(',', '.'));
  return isNaN(val) ? 0 : val;
}

function getNewMilestone() {
  var current = getCurrentROIMultiplier();
  var seen = getSeenMilestones();

  for (var i = MILESTONES.length - 1; i >= 0; i--) {
    var m = MILESTONES[i];
    if (current >= m.threshold && seen.indexOf(m.threshold) === -1) {
      return m;
    }
  }
  return null;
}

function renderMilestoneModal(milestone) {
  var current = getCurrentROIMultiplier();
  var nextMilestone = null;
  for (var i = 0; i < MILESTONES.length; i++) {
    if (MILESTONES[i].threshold > milestone.threshold) {
      nextMilestone = MILESTONES[i];
      break;
    }
  }

  var progressHtml = MILESTONES.map(function(m) {
    var reached = current >= m.threshold;
    var isCurrent = m.threshold === milestone.threshold;
    return '<div class="milestone-step' + (reached ? ' milestone-step-done' : '') + (isCurrent ? ' milestone-step-current' : '') + '">'
      + '<div class="milestone-step-dot">' + (reached ? '✓' : m.emoji) + '</div>'
      + '<div class="milestone-step-label">×' + m.threshold + '</div>'
    + '</div>';
  }).join('<div class="milestone-step-line"></div>');

  var nextHtml = nextMilestone
    ? '<div class="milestone-next">Prochain palier : <strong>×' + nextMilestone.threshold + '</strong></div>'
    : '<div class="milestone-next">Tu as atteint tous les paliers. Légendaire.</div>';

  return ''
    + '<div class="modal-header">'
      + '<div></div>'
      + '<button class="modal-close" data-action="close-modal" aria-label="Fermer">&times;</button>'
    + '</div>'
    + '<div class="modal-body" style="text-align:center;padding:12px 24px 28px">'
      + '<div class="milestone-hero-emoji">' + milestone.emoji + '</div>'
      + '<div class="milestone-hero-badge">×' + milestone.threshold + '</div>'
      + '<div class="milestone-hero-title">' + milestone.title + '</div>'
      + '<div class="milestone-hero-sub">' + milestone.sub + '</div>'
      + '<div class="milestone-progress">' + progressHtml + '</div>'
      + nextHtml
      + '<div class="milestone-ghost">' + ghostSvg('var(--phantom-violet)', 40) + '</div>'
    + '</div>'
    + '<div class="modal-footer" style="justify-content:center">'
      + '<button class="btn-primary" id="milestone-close" style="border-radius:9999px;padding:10px 28px">Continuer ' + milestone.emoji + '</button>'
    + '</div>';
}

export function checkAndShowMilestone() {
  var milestone = getNewMilestone();
  if (!milestone) return;

  setTimeout(function() {
    MILESTONES.forEach(function(m) {
      if (m.threshold <= milestone.threshold) markMilestoneSeen(m.threshold);
    });
    openModal(renderMilestoneModal(milestone));
    celebrate();
    celebrate();

    setTimeout(function() {
      var btn = document.getElementById('milestone-close');
      if (btn) {
        btn.addEventListener('click', function() {
          closeModal();
        });
      }
    }, 100);
  }, 1500);
}
