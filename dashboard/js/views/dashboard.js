// =====================================================
//  VIEW -- Dashboard (proof → ROI → action)
// =====================================================

import { USER } from '../data/workspace.js';
import { AGENTS, getAgent } from '../data/agents.js';
import { getInboxItems } from '../data/inbox.js';
import { getAgentRequests } from '../data/agent-requests.js';
import { AGENT_PROOF, PROOF_HEADLINE } from '../data/agent-proof.js';
import { ROI_KPIS, ROI_CONFIG, ROI_AGENTS } from '../data/roi.js';
import { ghostSvg } from '../lib/icons.js';
import { renderMorningSummaryCard } from '../components/morning-summary.js';

// ── 1. GREETING ──

function renderGreeting() {
  var firstName = USER.name.split(' ')[0];
  var h = new Date().getHours();
  var salut = h < 6 ? 'Bonne nuit' : h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir';
  var kpi = ROI_KPIS.length > 0 ? ROI_KPIS[0] : null;
  var activeCount = AGENTS.filter(function(a) { return a.status === 'active'; }).length;
  var recentCount = LIVE_ACTIVITIES.length;
  var subText = kpi
    ? '<strong>' + activeCount + ' agents actifs</strong> ont déjà généré <strong>' + kpi.value + '</strong> ce mois — <strong>' + recentCount + ' actions</strong> dans les dernières heures. Ça accélère.'
    : '<strong>' + activeCount + ' agents actifs</strong> accélèrent ton business en ce moment.';
  var activeGhosts = AGENTS.filter(function(a) { return a.status === 'active'; })
    .map(function(a) { return '<span class="dash-greeting-ghost" title="' + a.name + '">' + ghostSvg(a.color, 16) + '</span>'; })
    .join('');
  var presenceHtml = activeGhosts
    ? '<div class="dash-greeting-presence">' + activeGhosts + '<span class="dash-greeting-presence-label">travaillent pour toi en ce moment</span></div>'
    : '';
  return ''
    + '<div class="dash-greeting">'
      + '<div class="dash-greeting-text">' + salut + ' ' + firstName + '.</div>'
      + '<div class="dash-greeting-sub">' + subText + '</div>'
      + presenceHtml
    + '</div>';
}

// ── 1b. LIVE TICKER — Real-time agent activity ──

var LIVE_ACTIVITIES = [
  { agent: 'social', action: 'a publié un Reel', detail: '"Nigiri du jour"', time: 'Il y a 3 min', impact: '+23 clients potentiels' },
  { agent: 'google', action: 'a répondu à un avis', detail: 'Paul M. — 4★', time: 'Il y a 12 min', impact: 'Confiance renforcée' },
  { agent: 'seo', action: 'a publié un article', detail: '"Sushi et oméga-3"', time: 'Il y a 28 min', impact: '45 futurs clients ce soir' },
  { agent: 'social', action: 'a programmé une Story', detail: 'Coulisses livraison', time: 'Il y a 45 min', impact: '800 yeux sur ta cuisine' },
  { agent: 'brand', action: 'a finalisé un design', detail: 'Affiche terrasse été', time: 'Il y a 1h', impact: 'Terrasse visible' },
  { agent: 'social', action: 'a gagné +23 followers', detail: 'via Reel "Découpe sashimi"', time: 'Il y a 1h30', impact: '+23 abonnés fidèles' },
  { agent: 'google', action: 'a mis à jour les horaires', detail: 'Google Business Profile', time: 'Il y a 2h', impact: 'Horaires fiables' },
];

var EXTRA_ACTIVITIES = [
  { agent: 'social', action: 'a répondu à 5 commentaires', detail: 'Instagram', time: 'À l\'instant', impact: 'Communauté engagée' },
  { agent: 'seo', action: 'a optimisé une fiche', detail: '"Sashimi Bordeaux"', time: 'À l\'instant', impact: '+8 places Google' },
  { agent: 'google', action: 'a obtenu un nouvel avis', detail: 'Julie R. — 5★', time: 'À l\'instant', impact: 'Réputation blindée' },
  { agent: 'brand', action: 'a généré un visuel', detail: 'Promo weekend', time: 'À l\'instant', impact: 'Prêt à valider' },
  { agent: 'web', action: 'a mis à jour le menu', detail: 'Carte été 2026', time: 'À l\'instant', impact: 'Clients informés' },
  { agent: 'social', action: 'a planifié 3 posts', detail: 'Semaine prochaine', time: 'À l\'instant', impact: 'Feed rempli 7 jours' },
];
var _tickerInterval = null;
var _extraIndex = 0;

function startTickerRotation() {
  if (_tickerInterval) return;
  _tickerInterval = setInterval(function() {
    var list = document.getElementById('ticker-list');
    if (!list) { clearInterval(_tickerInterval); _tickerInterval = null; return; }
    var extra = EXTRA_ACTIVITIES[_extraIndex % EXTRA_ACTIVITIES.length];
    _extraIndex++;
    var a = getAgent(extra.agent);
    var color = a ? a.color : 'var(--ink-30)';
    var name = a ? a.name : extra.agent;
    var newItem = document.createElement('div');
    newItem.className = 'dash-ticker-item dash-ticker-new';
    newItem.innerHTML = ''
      + '<div class="dash-ticker-dot" style="background:' + color + '"></div>'
      + '<span class="dash-ticker-agent" style="color:' + color + '">' + name + '</span>'
      + '<span class="dash-ticker-action">' + extra.action + '</span>'
      + '<span class="dash-ticker-detail">' + extra.detail + '</span>'
      + '<span class="dash-ticker-impact">' + extra.impact + '</span>'
      + '<span class="dash-ticker-time">' + extra.time + '</span>';
    list.insertBefore(newItem, list.firstChild);
    if (list.children.length > 8) list.removeChild(list.lastChild);
  }, 25000);
}

function renderLiveTicker() {
  var activeCount = AGENTS.filter(function(a) { return a.status === 'active'; }).length;

  var agentPills = AGENTS.map(function(a) {
    var statusDot = a.status === 'active'
      ? '<div class="dash-agent-pill-dot dash-agent-pill-dot-active" style="background:' + a.color + '"></div>'
      : '<div class="dash-agent-pill-dot" style="background:var(--ink-20)"></div>';
    return '<div class="dash-agent-pill" data-agent="' + a.id + '" title="' + a.name + '">'
      + statusDot
      + ghostSvg(a.color, 14)
      + '<span class="dash-agent-pill-name">' + a.name + '</span>'
      + (a.tasks > 0 ? '<span class="dash-agent-pill-tasks">' + a.tasks + '</span>' : '')
    + '</div>';
  }).join('');

  var items = LIVE_ACTIVITIES.map(function(act, i) {
    var a = getAgent(act.agent);
    var color = a ? a.color : 'var(--ink-30)';
    var name = a ? a.name : act.agent;
    var impactHtml = act.impact
      ? '<span class="dash-ticker-impact">' + act.impact + '</span>'
      : '';
    return ''
      + '<div class="dash-ticker-item" style="animation-delay:' + (i * 0.06) + 's">'
        + '<div class="dash-ticker-dot" style="background:' + color + '"></div>'
        + '<span class="dash-ticker-agent" style="color:' + color + '">' + name + '</span>'
        + '<span class="dash-ticker-action">' + act.action + '</span>'
        + '<span class="dash-ticker-detail">' + act.detail + '</span>'
        + impactHtml
        + '<span class="dash-ticker-time">' + act.time + '</span>'
      + '</div>';
  }).join('');

  var workingAgent = getAgent('seo');
  var workingHtml = workingAgent
    ? '<div class="dash-ticker-working">'
        + '<div class="dash-ticker-dot dash-ticker-dot-pulse" style="background:' + workingAgent.color + '"></div>'
        + '<span class="dash-ticker-agent" style="color:' + workingAgent.color + '">' + workingAgent.name + '</span>'
        + '<span class="dash-ticker-action">rédige un article...</span>'
        + '<span class="dash-ticker-typing"><span></span><span></span><span></span></span>'
      + '</div>'
    : '';

  return ''
    + '<div class="dash-ticker">'
      + '<div class="dash-ticker-header">'
        + '<div class="dash-ticker-live-dot"></div>'
        + '<span class="dash-ticker-label">Ton équipe</span>'
        + '<span class="dash-ticker-count">' + activeCount + '/' + AGENTS.length + ' agents actifs · ' + LIVE_ACTIVITIES.length + ' actions aujourd\'hui</span>'
      + '</div>'
      + '<div class="dash-agent-pills">' + agentPills + '</div>'
      + workingHtml
      + '<div class="dash-ticker-list" id="ticker-list">'
        + items
      + '</div>'
    + '</div>';
}

export function initTickerRotation() {
  startTickerRotation();
}

// ── 1b-bis. ONBOARDING CHECKLIST (shows until 100%) ──

var ONBOARDING_STEPS = [
  { id: 'connect', label: 'Connecter Instagram', done: true },
  { id: 'google', label: 'Connecter Google Business', done: true },
  { id: 'brief', label: 'Écrire ton premier brief', done: true },
  { id: 'photos', label: 'Uploader 3 photos produit', time: '2 min', done: false },
  { id: 'approve', label: 'Valider ton premier post', time: '1 min', done: false },
];

function renderOnboardingChecklist() {
  var doneCount = ONBOARDING_STEPS.filter(function(s) { return s.done; }).length;
  var total = ONBOARDING_STEPS.length;
  if (doneCount === total) return '';
  var pct = Math.round((doneCount / total) * 100);

  var steps = ONBOARDING_STEPS.map(function(s) {
    var icon = s.done
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rainbow-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
      : '<div class="onboarding-circle"></div>';
    var timeHint = (!s.done && s.time) ? '<span class="onboarding-time">' + s.time + '</span>' : '';
    return '<div class="onboarding-step' + (s.done ? ' done' : '') + '">'
      + icon
      + '<span>' + s.label + '</span>'
      + timeHint
    + '</div>';
  }).join('');

  return ''
    + '<div class="dash-onboarding">'
      + '<div class="dash-onboarding-header">'
        + '<div class="dash-onboarding-title">Configure ton espace</div>'
        + '<div class="dash-onboarding-pct">' + pct + '%</div>'
      + '</div>'
      + '<div class="dash-onboarding-bar"><div class="dash-onboarding-fill" style="width:' + pct + '%"></div></div>'
      + '<div class="dash-onboarding-steps">' + steps + '</div>'
    + '</div>';
}

// ── 1c. NUDGE CARD — Contextual micro-task ──

var NUDGES = [
  { agent: 'social', icon: '📸', label: 'Approuver', title: 'Un post Instagram est prêt', desc: 'Social Manager a préparé un carrousel. Un clic pour publier.', time: '30 sec', action: 'Voir & approuver' },
  { agent: 'google', icon: '⭐', label: 'Répondre', title: 'Nouvel avis 5★ reçu', desc: '"Meilleur sushi de la ville !" — une réponse rapide fidélise.', time: '15 sec', action: 'Répondre en 1 clic' },
  { agent: 'seo', icon: '📝', label: 'Relire', title: 'Article SEO prêt à relire', desc: '"10 bienfaits du poisson cru" — jette un œil avant publication.', time: '1 min', action: 'Lire l\'article' },
];

function renderNudgeCard() {
  var nudge = NUDGES[Math.floor(Math.random() * NUDGES.length)];
  var a = getAgent(nudge.agent);
  var color = a ? a.color : 'var(--ink-30)';

  return ''
    + '<div class="dash-nudge">'
      + '<div class="dash-nudge-left">'
        + '<div class="dash-nudge-icon">' + nudge.icon + '</div>'
        + '<div class="dash-nudge-body">'
          + '<div class="dash-nudge-title">' + nudge.title + '</div>'
          + '<div class="dash-nudge-desc">' + nudge.desc + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="dash-nudge-right">'
        + '<div class="dash-nudge-time">' + nudge.time + '</div>'
        + '<button class="dash-nudge-btn" data-agent="' + nudge.agent + '" style="background:' + color + '">' + nudge.action + '</button>'
      + '</div>'
    + '</div>';
}

// ── 1d. SINCE YOU WERE AWAY — Summary for returning users ──

var AWAY_SUMMARY = [
  { agent: 'social', stat: '+142 followers', detail: 'dont +89 via le Reel sashimi', icon: '📈' },
  { agent: 'google', stat: '6 avis traités', detail: 'Note maintenue à 4.7★', icon: '⭐' },
  { agent: 'seo', stat: '2 articles publiés', detail: 'Position 8 → 5 sur "sushi marseille"', icon: '🔍' },
  { agent: 'brand', stat: '1 design livré', detail: 'Affiche terrasse prête à imprimer', icon: '🎨' },
];

function renderSinceAway() {
  var items = AWAY_SUMMARY.map(function(s) {
    var a = getAgent(s.agent);
    var color = a ? a.color : 'var(--ink-30)';
    return ''
      + '<div class="dash-away-item">'
        + '<div class="dash-away-icon">' + s.icon + '</div>'
        + '<div class="dash-away-text">'
          + '<div class="dash-away-stat" style="color:' + color + '">' + s.stat + '</div>'
          + '<div class="dash-away-detail">' + s.detail + '</div>'
        + '</div>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="dash-away">'
      + '<div class="dash-away-header">'
        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
        + '<span class="dash-away-title">Depuis ta dernière visite</span>'
        + '<span class="dash-away-time">il y a 14h</span>'
      + '</div>'
      + '<div class="dash-away-grid">'
        + items
      + '</div>'
    + '</div>';
}

// ── 2. PROOF — What agents accomplished ──

function renderProof() {
  var proofItems = AGENT_PROOF.map(function(p) {
    var a = getAgent(p.agent);
    var color = a ? a.color : 'var(--ink-30)';
    var name = a ? a.name : p.agent;
    return ''
      + '<div class="dash-proof-item">'
        + '<div class="dash-proof-left">'
          + ghostSvg(color, 20)
          + '<div class="dash-proof-text">'
            + '<div class="dash-proof-action"><strong>' + name + '</strong> ' + p.action + '</div>'
            + '<div class="dash-proof-impact">' + p.impact + '</div>'
          + '</div>'
        + '</div>'
        + '<div class="dash-proof-metric" style="color:' + color + '">'
          + '<div class="dash-proof-metric-value">' + p.metric + '</div>'
          + '<div class="dash-proof-metric-label">' + p.metricLabel + '</div>'
        + '</div>'
      + '</div>';
  }).join('');

  var headlines = '';
  if (PROOF_HEADLINE) {
    headlines = '<div class="dash-proof-headlines">';
    if (PROOF_HEADLINE.ordersUp) {
      headlines += '<span class="dash-proof-hl"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--rainbow-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> ' + PROOF_HEADLINE.ordersUp + '</span>';
    }
    if (PROOF_HEADLINE.followersUp) {
      headlines += '<span class="dash-proof-hl"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--rainbow-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> ' + PROOF_HEADLINE.followersUp + '</span>';
    }
    headlines += '</div>';
  }

  return ''
    + '<div class="dash-section dash-proof-section">'
      + '<div class="dash-proof-header">'
        + '<div class="dash-proof-header-icon">'
          + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
        + '</div>'
        + '<div>'
          + '<div class="dash-section-title">Pendant que tu gérais ton business</div>'
          + '<div class="dash-section-sub">Tes agents ont bossé pour toi</div>'
        + '</div>'
      + '</div>'
      + headlines
      + '<div class="dash-proof-list">'
        + proofItems
      + '</div>'
    + '</div>';
}

// ── 3. ROI SCORE — Always visible ──

function renderROIScore() {
  var kpi = ROI_KPIS.length > 0 ? ROI_KPIS[0] : null;
  var roiMulti = ROI_KPIS.length > 2 ? ROI_KPIS[2] : null;
  if (!kpi) return '';

  var price = ROI_CONFIG ? ROI_CONFIG.monthlyPrice : 1490;
  var multiValue = roiMulti ? roiMulti.value : '—';
  var rawValue = parseInt(kpi.value.replace(/[^\d]/g, ''), 10) || 0;
  var multiNum = parseFloat((multiValue + '').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

  var verdict;
  if (rawValue > price * 2) {
    verdict = 'Rentabilité doublée. En un mois, tes agents financent les 3 suivants.';
  } else if (rawValue > price) {
    verdict = 'Rentabilisé. Chaque euro investi t\'en rapporte ' + multiValue + '.';
  } else if (multiNum > 0.5) {
    verdict = 'Tes agents accélèrent. La rentabilité est à portée de main.';
  } else {
    verdict = 'Tes agents montent en puissance. Les premiers résultats arrivent.';
  }

  return ''
    + '<div class="dash-roi-score dash-roi-celebrate" data-nav="roi">'
      + '<div class="dash-roi-score-main">'
        + '<div class="dash-roi-generated">'
          + '<span class="dash-roi-big" data-countup="' + rawValue + '" data-suffix=" €">0 €</span>'
          + '<span class="dash-roi-sub">générés ce mois</span>'
        + '</div>'
        + '<div class="dash-roi-divider"></div>'
        + '<div class="dash-roi-cost">'
          + '<span class="dash-roi-big dash-roi-cost-val">' + price + ' €</span>'
          + '<span class="dash-roi-sub">ton abonnement</span>'
        + '</div>'
        + '<div class="dash-roi-divider"></div>'
        + '<div class="dash-roi-multi">'
          + '<span class="dash-roi-big dash-roi-multi-val">' + multiValue + '</span>'
          + '<span class="dash-roi-sub">retour sur investissement</span>'
        + '</div>'
      + '</div>'
      + '<div class="dash-roi-victory">'
        + '<span class="dash-roi-victory-text">' + verdict + '</span>'
      + '</div>'
      + '<div class="dash-roi-live-ticker" id="roi-ticker">'
        + '<span class="dash-roi-pulse"></span>'
        + '<span class="dash-roi-ticker-text">Tes agents travaillent en ce moment...</span>'
      + '</div>'
      + '<div class="dash-roi-score-footer">'
        + '<span class="dash-roi-score-cta">Voir le détail des calculs &rarr;</span>'
      + '</div>'
    + '</div>';
}

// ── 4. ACTIONS — What needs the user ──

function renderActions() {
  var requests = getAgentRequests() || [];
  var inbox = getInboxItems() || [];
  var totalActions = requests.length + inbox.length;

  if (totalActions === 0) {
    return ''
      + '<div class="dash-section dash-actions-empty">'
        + '<div class="dash-section-header">'
          + '<div class="dash-section-icon dash-section-icon-done">'
            + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
          + '</div>'
          + '<div>'
            + '<div class="dash-section-title">Rien à faire !</div>'
            + '<div class="dash-section-sub">Tes agents gèrent tout. Profite de ta journée — ou <a data-nav="work" style="color:var(--phantom-violet);cursor:pointer;font-weight:500">vois ce qu\'ils ont produit</a>.</div>'
          + '</div>'
        + '</div>'
      + '</div>';
  }

  var reqItems = requests.map(function(req) {
    var a = getAgent(req.agent);
    var color = a ? a.color : 'var(--ink-30)';
    var name = a ? a.name : req.agent;

    var actionHtml = '';
    if (req.action === 'choice' && req.choices) {
      actionHtml = '<div class="dash-req-choices">';
      req.choices.forEach(function(c) {
        actionHtml += '<button class="dash-req-choice" data-req-choice="' + req.id + '" data-agent="' + req.agent + '">' + c + '</button>';
      });
      actionHtml += '</div>';
    } else {
      actionHtml = '<button class="dash-req-action" data-req-action="' + req.id + '" data-req-type="' + req.action + '" data-agent="' + req.agent + '" style="background:' + color + '">' + req.actionLabel + '</button>';
    }

    return ''
      + '<div class="dash-action-card' + (req.priority === 'high' ? ' dash-action-urgent' : '') + '">'
        + '<div class="dash-action-agent">'
          + ghostSvg(color, 20)
          + '<span class="dash-action-agent-name" style="color:' + color + '">' + name + '</span>'
          + '<span class="dash-action-time">' + req.time + '</span>'
        + '</div>'
        + '<div class="dash-action-title">' + req.title + '</div>'
        + '<div class="dash-action-desc">' + req.desc + '</div>'
        + actionHtml
      + '</div>';
  }).join('');

  var inboxItems = inbox.map(function(item) {
    var a = getAgent(item.agent);
    var color = a ? a.color : 'var(--ink-30)';
    return ''
      + '<div class="dash-inbox-item" data-inbox-preview="' + item.id + '">'
        + ghostSvg(color, 18)
        + '<div class="dash-inbox-text">'
          + '<span class="dash-inbox-title">' + item.title + '</span>'
          + '<span class="dash-inbox-desc">' + item.desc + '</span>'
        + '</div>'
        + '<svg class="dash-inbox-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="dash-section">'
      + '<div class="dash-section-header">'
        + '<div class="dash-section-icon dash-section-icon-action">'
          + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>'
        + '</div>'
        + '<div>'
          + '<div class="dash-section-title">2 minutes de ton temps</div>'
          + '<div class="dash-section-sub">' + totalActions + ' action' + (totalActions > 1 ? 's' : '') + ' en attente</div>'
        + '</div>'
      + '</div>'
      + (reqItems ? '<div class="dash-action-list">' + reqItems + '</div>' : '')
      + (inboxItems
        ? '<div class="dash-action-inbox-header">'
            + '<span class="dash-action-inbox-label">Livrables à valider</span>'
            + '<button class="dash-section-link" data-nav="inbox">Tout voir &rarr;</button>'
          + '</div>'
          + '<div class="dash-inbox-list">' + inboxItems + '</div>'
        : '')
    + '</div>';
}

// ── 5. WEEKLY PROGRESS ──

function renderWeeklyProgress() {
  var total = 12;
  var done = 7;
  var pct = Math.round((done / total) * 100);

  return ''
    + '<div class="dash-weekly" data-nav="planning">'
      + '<div class="dash-weekly-top">'
        + '<div class="dash-weekly-label">Cette semaine</div>'
        + '<div class="dash-weekly-stats"><span data-countup="' + done + '">0</span> / ' + total + ' contenus publiés</div>'
      + '</div>'
      + '<div class="dash-weekly-bar">'
        + '<div class="dash-weekly-fill" style="width:' + pct + '%"></div>'
      + '</div>'
      + '<div class="dash-weekly-cta">Voir le planning &rarr;</div>'
    + '</div>';
}

// ── ROI LIVE TICKER ──

var roiTickerInterval = null;

var ROI_TICKER_MESSAGES = [
  'Social Manager a publié 1 story — portée estimée +120 vues',
  'SEO a optimisé 2 pages — trafic organique +45 visites/jour',
  'Google Reviews a répondu à 1 avis — note maintenue 4.7★',
  'Photos Resto a livré 3 visuels — prêts pour Uber Eats',
  'Social Manager a programmé 2 posts — engagement prévu +3.2%',
  'Brand B2C a créé 1 visuel story — cohérence marque ✓',
];

function startROITicker() {
  if (roiTickerInterval) clearInterval(roiTickerInterval);
  var idx = 0;
  var amounts = [12, 27, 8, 42, 18, 15];

  roiTickerInterval = setInterval(function() {
    var ticker = document.getElementById('roi-ticker');
    if (!ticker) { clearInterval(roiTickerInterval); roiTickerInterval = null; return; }

    var textEl = ticker.querySelector('.dash-roi-ticker-text');
    if (!textEl) return;

    var msg = ROI_TICKER_MESSAGES[idx % ROI_TICKER_MESSAGES.length];
    var amount = amounts[idx % amounts.length];
    textEl.innerHTML = '<span class="dash-roi-ticker-amount">+' + amount + ' €</span> · ' + msg;

    idx++;
  }, 8000);
}

// ── 5b. AGENT ROI SNAPSHOT — Per-agent value breakdown ──

function renderAgentROISnapshot() {
  if (!ROI_AGENTS || ROI_AGENTS.length === 0) return '';
  var sorted = ROI_AGENTS.slice().sort(function(a, b) { return b.value - a.value; });
  var maxVal = sorted[0].value;
  var totalVal = sorted.reduce(function(s, r) { return s + r.value; }, 0);

  var bars = sorted.map(function(row, i) {
    var ag = getAgent(row.id);
    var color = ag ? ag.color : 'var(--phantom-violet)';
    var pct = Math.round((row.value / maxVal) * 100);
    return ''
      + '<div class="dash-roi-snap-row" style="animation-delay:' + (i * 0.04) + 's">'
        + '<div class="dash-roi-snap-agent">'
          + ghostSvg(color, 14)
          + '<span>' + row.label + '</span>'
        + '</div>'
        + '<div class="dash-roi-snap-track">'
          + '<div class="dash-roi-snap-fill" style="width:' + pct + '%;background:' + color + '"></div>'
        + '</div>'
        + '<div class="dash-roi-snap-val">' + row.value.toLocaleString('fr-FR') + ' €</div>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="dash-roi-snapshot">'
      + '<div class="dash-roi-snap-header">'
        + '<div class="dash-roi-snap-title">Chaque agent, son impact</div>'
        + '<div class="dash-roi-snap-total">' + totalVal.toLocaleString('fr-FR') + ' € ce mois</div>'
      + '</div>'
      + bars
      + '<div class="dash-roi-snap-footer" data-nav="roi">Voir le rapport complet &rarr;</div>'
    + '</div>';
}

// ── DASHBOARD ──

function getMorningDismissKey() {
  var d = new Date();
  return 'phantom_ms_card_' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function isMorningCardDismissed() {
  return localStorage.getItem(getMorningDismissKey()) === '1';
}

export function dismissMorningCard() {
  localStorage.setItem(getMorningDismissKey(), '1');
}

export function renderDashboard() {
  setTimeout(startROITicker, 3000);

  var morningCard = isMorningCardDismissed() ? '' : renderMorningSummaryCard();

  return ''
    + '<div class="content dash-home">'
      + morningCard
      + renderGreeting()
      + renderROIScore()
      + renderOnboardingChecklist()
      + renderNudgeCard()
      + renderSinceAway()
      + renderLiveTicker()
      + renderProof()
      + renderAgentROISnapshot()
      + renderWeeklyProgress()
      + renderActions()
    + '</div>';
}
