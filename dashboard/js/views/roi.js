// =====================================================
//  VIEW -- Impact & ROI
// =====================================================

import { ROI_CONFIG, ROI_KPIS, ROI_AGENTS, ROI_COMPARISON } from '../data/roi.js';
import { getAgent } from '../data/agents.js';
import { ghostSvg } from '../lib/icons.js';
import { sparkline } from '../lib/sparkline.js';

function fmt(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// --- Confidence badge ---

function confidenceBadge(level) {
  if (level === 'verified') {
    return '<span class="roi-confidence roi-confidence--verified">Vérifié</span>';
  }
  if (level === 'projected') {
    return '<span class="roi-confidence roi-confidence--projected">Projeté</span>';
  }
  return '<span class="roi-confidence roi-confidence--estimated">Estimé</span>';
}

// --- KPI Tooltip ---

function renderTooltip(kpi) {
  var rows = kpi.sources.map(function(s) {
    return ''
      + '<div class="roi-tooltip-row">'
        + '<div class="roi-tooltip-row-label">' + s.label + '</div>'
        + '<div class="roi-tooltip-row-value">' + s.value + '</div>'
        + '<div class="roi-tooltip-row-detail">' + s.detail + '</div>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="roi-tooltip" id="roi-tip-' + kpi.id + '">'
      + '<div class="roi-tooltip-header">'
        + '<div class="roi-tooltip-formula">' + kpi.formula + '</div>'
        + confidenceBadge(kpi.confidence)
      + '</div>'
      + '<div class="roi-tooltip-body">'
        + rows
      + '</div>'
    + '</div>';
}

// --- KPI Cards ---

function renderKPICards() {
  var cards = ROI_KPIS.map(function(kpi) {
    return ''
      + '<div class="roi-kpi" style="background:' + kpi.bg + ';color:' + kpi.fg + '">'
        + '<button class="roi-info-btn" data-roi-tooltip="' + kpi.id + '" title="Voir le détail du calcul">?</button>'
        + '<div class="roi-kpi-label">' + kpi.label + '</div>'
        + '<div class="roi-kpi-value">' + kpi.value + '</div>'
        + renderTooltip(kpi)
        + (kpi.trend ? sparkline(kpi.trend, 200, 40, { color: kpi.fg, opacity: 0.25 }) : '')
      + '</div>';
  }).join('');

  return '<div class="roi-kpis">' + cards + '</div>';
}

// --- Agent bars ---

function renderAgentBars() {
  var sorted = ROI_AGENTS.slice().sort(function(a, b) { return b.value - a.value; });
  var maxValue = sorted.length > 0 ? sorted[0].value : 1;

  var rows = sorted.map(function(row) {
    var ag = getAgent(row.id);
    var pct = Math.round((row.value / maxValue) * 100);
    var color = ag ? ag.color : 'var(--phantom-violet)';

    return ''
      + '<div class="roi-agent-row" data-roi-agent-tip="' + row.id + '">'
        + '<div class="roi-agent-name">'
          + ghostSvg(color, 16)
          + row.label
        + '</div>'
        + '<div class="roi-bar-track">'
          + '<div class="roi-bar-fill" style="width:' + pct + '%;background:' + color + '"></div>'
        + '</div>'
        + '<div class="roi-agent-value">' + fmt(row.value) + ' &euro;</div>'
        + '<div class="roi-agent-sub">' + row.hours + 'h &middot; ' + row.tasks + ' tâches</div>'
        + '<div class="roi-agent-tooltip">' + row.detail + '</div>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="card roi-agent-card">'
      + '<div class="roi-section-title">Valeur par agent</div>'
      + rows
    + '</div>';
}

// --- Comparison before/after ---

function renderComparison() {
  var comp = ROI_COMPARISON;

  return ''
    + '<div class="roi-section-title">Comparaison</div>'
    + '<div class="roi-compare">'

      + '<div class="roi-compare-card">'
        + '<div class="roi-kpi-label" style="color:var(--ink-30)">' + comp.before.label + '</div>'
        + '<div class="roi-compare-amount">' + fmt(comp.before.monthly) + ' &euro; / mois</div>'
        + '<div class="roi-compare-detail">' + comp.before.detail + '</div>'
      + '</div>'

      + '<div class="roi-comparison-arrow">'
        + '<div class="roi-comparison-arrow-line"></div>'
        + '<div class="roi-comparison-arrow-badge">-' + comp.saving.percent + '%</div>'
        + '<div class="roi-comparison-arrow-line"></div>'
      + '</div>'

      + '<div class="roi-compare-card highlight">'
        + '<div class="roi-kpi-label" style="color:var(--green-600)">' + comp.after.label + '</div>'
        + '<div class="roi-compare-amount">' + fmt(comp.after.monthly) + ' &euro; / mois</div>'
        + '<div class="roi-compare-detail">' + comp.after.detail + '</div>'
      + '</div>'

    + '</div>'

    + '<div class="roi-saving">'
      + 'Tu économises <strong>' + fmt(comp.saving.monthly) + ' &euro; / mois</strong> soit <strong>' + fmt(comp.saving.annual) + ' &euro; / an</strong>'
    + '</div>';
}

// --- Timeline chart (SVG) ---

function renderTimeline() {
  var months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
  var data = ROI_KPIS[0].trend; // value-generated trend
  var svgW = 520;
  var svgH = 180;
  var padL = 50;
  var padR = 20;
  var padT = 20;
  var padB = 30;
  var chartW = svgW - padL - padR;
  var chartH = svgH - padT - padB;

  var max = Math.max.apply(null, data);
  var min = Math.min.apply(null, data);
  var range = max - min || 1;

  // Build polyline points
  var points = data.map(function(v, i) {
    var x = padL + (i / (data.length - 1)) * chartW;
    var y = padT + chartH - ((v - min) / range) * chartH;
    return x + ',' + y;
  }).join(' ');

  // Build area polygon (fill under curve)
  var areaPoints = '';
  data.forEach(function(v, i) {
    var x = padL + (i / (data.length - 1)) * chartW;
    var y = padT + chartH - ((v - min) / range) * chartH;
    areaPoints += x + ',' + y + ' ';
  });
  // Close the area path
  var lastX = padL + chartW;
  var firstX = padL;
  var baseY = padT + chartH;
  areaPoints += lastX + ',' + baseY + ' ' + firstX + ',' + baseY;

  // Dots
  var dots = data.map(function(v, i) {
    var x = padL + (i / (data.length - 1)) * chartW;
    var y = padT + chartH - ((v - min) / range) * chartH;
    return '<circle cx="' + x + '" cy="' + y + '" r="4" fill="var(--phantom-violet)" stroke="#fff" stroke-width="2"/>';
  }).join('');

  // Y axis labels (3 marks)
  var yMarks = [min, min + range / 2, max];
  var yLabels = yMarks.map(function(v) {
    var y = padT + chartH - ((v - min) / range) * chartH;
    return '<text x="' + (padL - 8) + '" y="' + (y + 4) + '" text-anchor="end" fill="var(--ink-30,#999)" font-size="9" font-family="var(--font-mono,monospace)">' + fmt(Math.round(v)) + '</text>';
  }).join('');

  // X axis labels
  var xLabels = months.map(function(m, i) {
    var x = padL + (i / (months.length - 1)) * chartW;
    return '<text x="' + x + '" y="' + (svgH - 6) + '" text-anchor="middle" fill="var(--ink-30,#999)" font-size="9" font-family="var(--font-mono,monospace)">' + m + '</text>';
  }).join('');

  // Grid lines (horizontal, 3)
  var gridLines = yMarks.map(function(v) {
    var y = padT + chartH - ((v - min) / range) * chartH;
    return '<line x1="' + padL + '" y1="' + y + '" x2="' + (padL + chartW) + '" y2="' + y + '" stroke="var(--ink-10,#eee)" stroke-width="1" stroke-dasharray="4,4"/>';
  }).join('');

  var svg = ''
    + '<svg class="roi-timeline-chart" width="100%" viewBox="0 0 ' + svgW + ' ' + svgH + '" preserveAspectRatio="xMidYMid meet">'
      + '<defs>'
        + '<linearGradient id="roi-area-grad" x1="0" y1="0" x2="0" y2="1">'
          + '<stop offset="0%" stop-color="var(--phantom-violet)" stop-opacity="0.2"/>'
          + '<stop offset="100%" stop-color="var(--phantom-violet)" stop-opacity="0.02"/>'
        + '</linearGradient>'
      + '</defs>'
      + gridLines
      + '<polygon points="' + areaPoints + '" fill="url(#roi-area-grad)"/>'
      + '<polyline points="' + points + '" fill="none" stroke="var(--phantom-violet)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
      + dots
      + yLabels
      + xLabels
    + '</svg>';

  return ''
    + '<div class="roi-section-title">Évolution de la valeur générée</div>'
    + '<div class="roi-timeline">'
      + svg
    + '</div>';
}

// --- Close tooltips (hoisted to avoid listener leak) ---

function closeRoiTips() {
  document.querySelectorAll('.roi-tooltip.open').forEach(function(t) {
    t.classList.remove('open');
  });
}

// --- Main render ---

export function renderROI() {
  var html = ''
    + '<div class="content">'
      + '<div class="roi-hero"><div class="roi-hero-title">Ton investissement travaille pour toi.</div><div class="roi-hero-sub">Voici ce que tes agents ont généré — et ce que ça débloque ensuite.</div></div>'
      + '<div class="roi-meaning">En clair : tes agents font l\'équivalent de 127h de travail par mois pour ' + ROI_CONFIG.monthlyPrice + ' €. Un freelance te coûterait ' + fmt(127 * ROI_CONFIG.hourlyRate) + ' €. Tu économises ' + fmt((127 * ROI_CONFIG.hourlyRate) - ROI_CONFIG.monthlyPrice) + ' € chaque mois — et tu récupères ton temps.</div>'
      + renderKPICards()
      + renderAgentBars()
      + renderComparison()
      + renderTimeline()
      + '<div class="roi-verdict">'
        + '<div class="roi-verdict-line">Ton investissement s\'est payé. En ' + ROI_CONFIG.monthsActive + ' mois, c\'est ton agent qui finance les 3 suivants.</div>'
        + '<div class="roi-verdict-sub">Partage ce rapport avec ton équipe — ou utilise-le pour justifier le passage aux 6 agents. À toi de piloter la croissance.</div>'
        + '<button class="roi-verdict-btn" data-action="report">Télécharger le rapport &rarr;</button>'
      + '</div>'
    + '</div>';

  setTimeout(function() {
    document.querySelectorAll('[data-roi-tooltip]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var id = btn.dataset.roiTooltip;
        document.querySelectorAll('.roi-tooltip.open').forEach(function(t) {
          if (t.id !== 'roi-tip-' + id) t.classList.remove('open');
        });
        var tip = document.getElementById('roi-tip-' + id);
        if (tip) tip.classList.toggle('open');
      });
    });

    document.removeEventListener('click', closeRoiTips);
    document.addEventListener('click', closeRoiTips);
  }, 0);

  return html;
}
