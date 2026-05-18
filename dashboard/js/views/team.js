// =====================================================
//  VIEW -- Equipe
// =====================================================

import { AGENTS, AGENT_MISSIONS } from '../data/agents.js';
import { ghostSvg } from '../lib/icons.js';
import { sparkline } from '../lib/sparkline.js';
import { formatDate, statusColor, statusLabel, activeAgentCount } from '../lib/helpers.js';

// --- Mock trend data per agent ---

var AGENT_TRENDS = {
  social: [12, 18, 15, 22, 28, 25, 32, 30, 35, 40, 38, 47],
  google: [5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
  photos: [2, 4, 3, 6, 8, 7, 10, 9, 12, 11, 14, 15],
  seo: [1, 3, 2, 5, 4, 7, 6, 8, 9, 10, 11, 12],
  web: [3, 2, 4, 3, 5, 4, 5, 6, 5, 7, 7, 8],
  brand: [1, 1, 2, 2, 3, 3, 4, 3, 4, 5, 5, 6],
};

function getTrend(agentId) {
  return AGENT_TRENDS[agentId] || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}

// --- Truncate text ---

function truncate(str, max) {
  if (!str) return '';
  if (str.length <= max) return str;
  return str.substring(0, max) + '...';
}

// --- Total completed tasks this month ---

function totalCompleted() {
  var total = 0;
  AGENTS.forEach(function(a) {
    var m = AGENT_MISSIONS[a.id];
    if (m) total += m.completed;
  });
  return total;
}

// --- Weekly MVP agent ---

function weeklyMVP() {
  var best = null;
  var bestGrowth = 0;
  AGENTS.forEach(function(a) {
    var trend = AGENT_TRENDS[a.id];
    if (!trend || trend.length < 2) return;
    var prev = trend[trend.length - 2];
    var curr = trend[trend.length - 1];
    var growth = prev > 0 ? Math.round(((curr - prev) / prev) * 100) : 0;
    if (curr > bestGrowth || !best) {
      best = a;
      bestGrowth = growth;
    }
  });
  if (!best) return null;
  var trend = AGENT_TRENDS[best.id];
  return { agent: best, value: trend[trend.length - 1], growth: bestGrowth };
}

var MVP_HIGHLIGHTS = {
  social: { metric: 'engagements', icon: '&#x1F525;' },
  google: { metric: 'avis traités', icon: '&#x2B50;' },
  photos: { metric: 'visuels livrés', icon: '&#x1F4F8;' },
  seo: { metric: 'positions gagnées', icon: '&#x1F4C8;' },
  web: { metric: 'optimisations', icon: '&#x26A1;' },
  brand: { metric: 'créations', icon: '&#x1F3A8;' },
};

// --- Render ---

export function renderTeam() {
  var cards = AGENTS.map(function(a) {
    var mission = AGENT_MISSIONS[a.id] || {};
    var brief = truncate(mission.brief || '', 60);
    var completed = mission.completed || 0;
    var successRate = mission.successRate || 0;
    var trend = getTrend(a.id);
    var sColor = statusColor(a.status);
    var sLabel = statusLabel(a.status);

    return ''
      + '<div class="team-card" data-agent="' + a.id + '">'
        + '<div class="team-card-header">'
          + ghostSvg(a.color, 48)
          + '<div>'
            + '<div class="team-card-name">' + a.name + '</div>'
            + '<div class="team-card-status">'
              + '<span class="team-status-dot" style="background:' + sColor + '"></span> '
              + sLabel
            + '</div>'
          + '</div>'
        + '</div>'
        + '<div class="team-card-brief">' + brief + '</div>'
        + '<div class="team-card-pilot">Piloté par ' + (a.pilot || 'N/A') + '</div>'
        + '<div class="team-card-sparkline">'
          + sparkline(trend, 240, 28, { color: a.color, opacity: 0.45, preserveAspectRatio: 'none' })
        + '</div>'
        + '<div class="team-card-stats">'
          + '<div class="team-card-stat"><strong>' + completed + '</strong> tâches</div>'
          + '<div class="team-card-stat"><strong>' + successRate + '%</strong> succès</div>'
        + '</div>'
        + '<div class="team-card-cta">Voir l\'agent &rarr;</div>'
      + '</div>';
  }).join('');

  var mvp = weeklyMVP();
  var heroCard = '';
  if (mvp) {
    var hl = MVP_HIGHLIGHTS[mvp.agent.id] || { metric: 'actions', icon: '&#x1F680;' };
    heroCard = ''
      + '<div class="team-mvp-card">'
        + '<div class="team-mvp-left">'
          + ghostSvg(mvp.agent.color, 40)
          + '<div>'
            + '<div class="team-mvp-label">' + hl.icon + ' MVP de la semaine</div>'
            + '<div class="team-mvp-title">' + mvp.agent.name + '</div>'
          + '</div>'
        + '</div>'
        + '<div class="team-mvp-right">'
          + '<div class="team-mvp-value" data-countup="' + (mvp.value * 18) + '">' + 0 + '</div>'
          + '<div class="team-mvp-metric">' + hl.metric + '</div>'
        + '</div>'
        + '<div class="team-mvp-growth">+' + mvp.growth + '% vs semaine dernière</div>'
      + '</div>';
  }

  return ''
    + '<div class="content">'
      + '<div class="welcome-row">'
        + '<div>'
          + '<div class="welcome-date">&mdash; ' + formatDate() + '</div>'
          + '<div class="welcome-title">Ton équipe Phantom. <span class="muted">' + activeAgentCount() + ' agents actifs &middot; ' + totalCompleted() + ' tâches complétées ce mois</span></div>'
        + '</div>'
        + '<div class="welcome-actions">'
          + '<button class="btn-primary" data-action="new-brief">Briefer un nouvel agent &#10024;</button>'
        + '</div>'
      + '</div>'
      + '<div class="team-hero-bar">'
        + '<span class="team-hero-pulse"></span>'
        + '<span class="team-hero-copy">' + activeAgentCount() + ' agents ont travaillé pendant que tu dormais</span>'
      + '</div>'
      + heroCard
      + '<div class="team-grid">'
        + cards
      + '</div>'
    + '</div>';
}
