// =====================================================
//  COMPONENT -- Morning Summary (interactive version)
// =====================================================

import { AGENTS, AGENT_MISSIONS } from '../data/agents.js';
import { USER } from '../data/workspace.js';
import { getInboxItems } from '../data/inbox.js';
import { ROI_KPIS } from '../data/roi.js';
import { ghostSvg } from '../lib/icons.js';
import { formatDate, activeAgentCount } from '../lib/helpers.js';

function getAgentHighlight(agent) {
  var highlights = {
    social: { text: '12 posts programmés, en attente de validation', cta: 'Voir les posts', nav: 'inbox' },
    google: { text: '1 avis négatif à traiter, réponse préparée', cta: 'Voir la réponse', nav: 'inbox' },
    photos: { text: '5 photos prêtes pour Uber Eats', cta: 'Valider les photos', nav: 'inbox' },
    seo: { text: 'Nouvelle opportunité mot-clé détectée', cta: 'Voir le détail', nav: 'inbox' },
    web: { text: 'Tout est au vert, temps de chargement 1.6s', cta: 'Voir le rapport', nav: null },
    brand: { text: 'Packaging baguettes finalisé', cta: 'Voir le livrable', nav: null },
  };
  return highlights[agent.id] || { text: 'En veille', cta: null, nav: null };
}

function totalCompletedThisMonth() {
  var total = 0;
  Object.keys(AGENT_MISSIONS).forEach(function(k) {
    total += AGENT_MISSIONS[k].completed || 0;
  });
  return total;
}

// ── Inline card variant for dashboard embedding ──

export function renderMorningSummaryCard() {
  var firstName = USER.name.split(' ')[0];
  var dateStr = formatDate();
  var completed = totalCompletedThisMonth();
  var active = activeAgentCount();
  var inboxCount = getInboxItems().length;
  var roiValue = ROI_KPIS.length > 0 ? ROI_KPIS[0].value : '—';

  var agentLines = AGENTS.filter(function(a) { return a.status === 'active'; }).map(function(agent) {
    var hl = getAgentHighlight(agent);
    var ghost = ghostSvg(agent.color, 18);
    var ctaHtml = '';
    if (hl.cta && hl.nav) {
      ctaHtml = '<button class="ms-card-agent-cta" data-nav="' + hl.nav + '" style="color:' + agent.color + '">' + hl.cta + ' &rarr;</button>';
    } else if (hl.cta) {
      ctaHtml = '<button class="ms-card-agent-cta" data-agent="' + agent.id + '" style="color:' + agent.color + '">' + hl.cta + ' &rarr;</button>';
    }

    return ''
      + '<div class="ms-card-agent">'
        + '<div class="ms-card-agent-left">'
          + ghost
          + '<div class="ms-card-agent-info">'
            + '<span class="ms-card-agent-name">' + agent.name + '</span>'
            + '<span class="ms-card-agent-detail">' + hl.text + '</span>'
          + '</div>'
        + '</div>'
        + ctaHtml
      + '</div>';
  }).join('');

  return ''
    + '<div class="ms-inline-card">'
      + '<div class="ms-inline-header">'
        + '<div>'
          + '<div class="ms-inline-date">&mdash; ' + dateStr + '</div>'
          + '<div class="ms-inline-greeting">Bonjour ' + firstName + '.</div>'
          + '<div class="ms-inline-subtitle">Pendant la nuit, tes agents ont fait grandir ton business.</div>'
        + '</div>'
        + '<button class="ms-inline-dismiss" data-action="dismiss-morning">&times;</button>'
      + '</div>'
      + '<div class="ms-inline-growth ms-stagger">'
        + '<div class="ms-inline-growth-pill ms-stagger-item" style="animation-delay:0.25s"><span class="ms-inline-growth-val">+142</span><span class="ms-inline-growth-label">followers</span></div>'
        + '<div class="ms-inline-growth-pill ms-stagger-item" style="animation-delay:0.35s"><span class="ms-inline-growth-val">4.7★</span><span class="ms-inline-growth-label">note Google</span></div>'
        + '<div class="ms-inline-growth-pill ms-stagger-item" style="animation-delay:0.45s"><span class="ms-inline-growth-val">#5</span><span class="ms-inline-growth-label">pos. SEO</span></div>'
        + '<div class="ms-inline-growth-pill ms-stagger-item" style="animation-delay:0.55s"><span class="ms-inline-growth-val">' + roiValue + '</span><span class="ms-inline-growth-label">ce mois</span></div>'
      + '</div>'
      + '<div class="ms-inline-agents ms-stagger-item" style="animation-delay:0.65s">'
        + agentLines
      + '</div>'
      + '<div class="ms-inline-footer ms-stagger-item" style="animation-delay:0.8s">'
        + '<span class="ms-inline-completed">' + completed + ' tâches complétées · ' + inboxCount + ' en attente de validation</span>'
      + '</div>'
      + '<div class="ms-inline-protip ms-stagger-item" style="animation-delay:0.9s">'
        + '<span class="ms-protip-icon">⚡</span>'
        + '<span class="ms-protip-text">Raccourci : tape <kbd>⌘K</kbd> pour chercher un agent, une tâche ou une action</span>'
      + '</div>'
    + '</div>';
}
