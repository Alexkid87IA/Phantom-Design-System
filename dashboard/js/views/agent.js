// =====================================================
//  VIEW -- Agent Chat / Info / Config
// =====================================================

import { getState } from '../store.js';
import { getAgent, AGENT_MISSIONS, AGENT_CHIPS } from '../data/agents.js';
import { getConversation } from '../data/conversations.js';
import { getCurrentChips } from '../services/messaging.js';
import { WORK_ITEMS } from '../data/work.js';
import { AGENT_PROOF } from '../data/agent-proof.js';
import { ICONS, ghostSvg } from '../lib/icons.js';
import { statusColor, statusLabel, escapeHtml } from '../lib/helpers.js';

function renderDeliverable(m) {
  var items = (m.items || []).map(function(it) {
    return '<div class="msg-deliv-item"><span class="msg-deliv-bullet">&#10022;</span><span>' + escapeHtml(it) + '</span></div>';
  }).join('');

  return '<div class="msg-deliverable">'
    + '<div class="msg-deliv-header">'
      + '<span class="msg-deliv-badge">Premier livrable</span>'
      + '<span class="msg-deliv-title">' + escapeHtml(m.title || '') + '</span>'
    + '</div>'
    + '<div class="msg-deliv-body">' + items + '</div>'
    + (m.footer ? '<div class="msg-deliv-footer">' + escapeHtml(m.footer) + '</div>' : '')
  + '</div>';
}

export function renderAgentChat() {
  var STATE = getState();
  var a = getAgent(STATE.activeAgent);
  if (!a) return '<div class="content"><p>Agent introuvable</p></div>';

  var convo = getConversation(a.id);
  var chips = getCurrentChips(a.id) || AGENT_CHIPS[a.id] || [];
  var mission = AGENT_MISSIONS[a.id] || { brief: '', since: '', completed: 0, successRate: 0 };

  var tabs = [
    { id: 'chat', label: 'Conversation' },
    { id: 'info', label: 'Mission & Stats' },
    { id: 'config', label: 'Paramètres' },
  ];

  var tabContent = '';

  if (STATE.agentTab === 'chat') {
    var proof = AGENT_PROOF.filter(function(p) { return p.agent === a.id; });
    var accomplishmentHtml = '';
    if (proof.length > 0) {
      var proofItems = proof.map(function(p) {
        return ''
          + '<div class="agent-accomplishment-item">'
            + '<div class="agent-accomplishment-text">' + p.action + '</div>'
            + '<div class="agent-accomplishment-impact">' + p.impact + '</div>'
          + '</div>';
      }).join('');
      accomplishmentHtml = ''
        + '<div class="agent-accomplishments">'
          + '<div class="agent-accomplishments-header">'
            + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' + a.color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
            + '<span class="agent-accomplishments-title">Ce que j\'ai fait récemment</span>'
          + '</div>'
          + proofItems
        + '</div>';
    }

    var workingIndicator = '';
    if (a.status === 'active' && a.tasks > 0) {
      var WORKING_ON = {
        social: 'prépare un Reel pour ce soir...',
        google: 'analyse un nouvel avis reçu...',
        seo: 'rédige un article de blog...',
        photos: 'retouche les photos du jour...',
        web: 'optimise la vitesse du site...',
        brand: 'finalise un visuel de marque...',
      };
      var MOMENTUM = {
        social: 'Tes followers vont adorer — publication dans quelques minutes.',
        google: 'Réponse pro en moins d\'une heure. Tes clients sentent qu\'on les écoute.',
        seo: 'Chaque mot optimisé pour la page 1. Trafic en hausse.',
        photos: 'Visuels pros en cours. Tes clients vont croire que tu as un studio.',
        web: 'Chaque seconde gagnée = plus de clients qui restent.',
        brand: 'Ton identité visuelle prend forme. Reconnaissable au premier regard.',
      };
      var workText = WORKING_ON[a.id] || 'travaille sur une tâche...';
      var momentumText = MOMENTUM[a.id] || '';
      workingIndicator = ''
        + '<div class="agent-working-indicator">'
          + '<div class="agent-working-dot" style="background:' + a.color + '"></div>'
          + ghostSvg(a.color, 16)
          + '<span class="agent-working-text">' + a.name + ' ' + workText + '</span>'
          + '<span class="agent-working-typing"><span></span><span></span><span></span></span>'
        + '</div>'
        + (momentumText ? '<div class="agent-working-momentum">' + momentumText + '</div>' : '');
    }

    tabContent = ''
      + '<div class="agent-chat-messages" id="agent-messages">'
        + accomplishmentHtml
        + convo.map(function(m) {
            if (m.type === 'deliverable') return renderDeliverable(m);
            return '<div class="msg ' + (m.from === 'agent' ? 'msg-agent' : 'msg-user') + '">' + escapeHtml(m.text) + '</div>';
          }).join('')
        + workingIndicator
      + '</div>'
      + '<div class="agent-chat-composer">'
        + '<div class="chips" id="agent-chips">'
          + chips.map(function(c) {
              return '<button class="chip" data-chip="' + escapeHtml(c) + '" data-chip-agent="' + a.id + '">' + c + '</button>';
            }).join('')
        + '</div>'
        + '<div class="agent-chat-input-row">'
          + '<input type="text" class="composer-field" id="agent-composer" placeholder="Dis ce que tu veux à ' + escapeHtml(a.name) + '..." data-agent="' + a.id + '" />'
          + '<button class="send-btn" id="agent-send" data-agent="' + a.id + '">' + ICONS.send + '</button>'
        + '</div>'
      + '</div>';
  } else if (STATE.agentTab === 'info') {
    var agentWork = WORK_ITEMS.filter(function(w) { return w.agent === a.id; }).slice(0, 4);
    var workHtml = agentWork.length > 0
      ? agentWork.map(function(w) {
          var impactTag = w.impact
            ? '<span class="agent-work-impact">' + w.impact + '</span>'
            : '';
          return '<div class="agent-work-row">'
            + '<span class="agent-work-title">' + w.title + '</span>'
            + impactTag
            + '<span class="agent-work-date">' + w.date + '</span>'
          + '</div>';
        }).join('')
      : '<div class="agent-first72">'
          + '<div class="agent-first72-header">'
            + '<span class="agent-first72-badge">Premières 72h</span>'
            + '<span class="agent-first72-countdown">~48h restantes</span>'
          + '</div>'
          + '<div class="agent-first72-steps">'
            + '<div class="agent-first72-step done"><span class="agent-first72-dot done"></span><span>Analyse de ton activité</span><span class="agent-first72-check">&#10003;</span></div>'
            + '<div class="agent-first72-step done"><span class="agent-first72-dot done"></span><span>Configuration des paramètres</span><span class="agent-first72-check">&#10003;</span></div>'
            + '<div class="agent-first72-step active"><span class="agent-first72-dot active"></span><span>Préparation du premier livrable…</span></div>'
            + '<div class="agent-first72-step"><span class="agent-first72-dot"></span><span>Validation & publication</span></div>'
          + '</div>'
          + '<div class="agent-first72-footer">Ton agent travaille. En attendant, tu peux briefer ou configurer d\'autres agents — quand le livrable arrive, tu valides en 10 secondes.</div>'
        + '</div>';

    tabContent = ''
      + '<div class="agent-info">'
        + '<div class="agent-mission-block">'
          + '<div class="agent-mission-label">Brief / Mission</div>'
          + '<div class="agent-mission-text">' + mission.brief + '</div>'
        + '</div>'
        + '<div class="agent-stats-grid">'
          + '<div class="agent-stat-card">'
            + '<div class="agent-stat-value">' + mission.completed + '</div>'
            + '<div class="agent-stat-label">Tâches terminées</div>'
          + '</div>'
          + '<div class="agent-stat-card">'
            + '<div class="agent-stat-value">' + mission.successRate + '%</div>'
            + '<div class="agent-stat-label">Taux de succès</div>'
          + '</div>'
          + '<div class="agent-stat-card">'
            + '<div class="agent-stat-value">' + mission.since + '</div>'
            + '<div class="agent-stat-label">Actif depuis</div>'
          + '</div>'
        + '</div>'
        + '<div class="agent-mission-block">'
          + '<div class="agent-mission-label">Travail récent</div>'
          + workHtml
        + '</div>'
      + '</div>';
  } else if (STATE.agentTab === 'config') {
    tabContent = ''
      + '<div class="agent-info">'
        + '<div class="agent-config-row">'
          + '<span class="agent-config-label">Agent actif</span>'
          + '<button class="toggle ' + (a.status === 'active' ? 'on' : '') + '" data-action="toggle-agent" role="switch" aria-checked="' + (a.status === 'active') + '"></button>'
        + '</div>'
        + '<div class="agent-config-row">'
          + '<span class="agent-config-label">Pilote</span>'
          + '<span class="agent-config-value">' + a.pilot + '</span>'
        + '</div>'
        + '<div class="agent-config-row">'
          + '<span class="agent-config-label">Couleur</span>'
          + '<span class="agent-config-swatch" style="background:' + a.color + '"></span>'
        + '</div>'
        + '<div class="agent-config-row">'
          + '<span class="agent-config-label">Notifications</span>'
          + '<button class="toggle on" data-action="toggle-notif" role="switch" aria-checked="true"></button>'
        + '</div>'
        + '<div class="agent-config-row">'
          + '<span class="agent-config-label">Validation automatique</span>'
          + '<button class="toggle" data-action="toggle-auto" role="switch" aria-checked="false"></button>'
        + '</div>'
        + '<div class="agent-config-row">'
          + '<span class="agent-config-label">Fréquence de rapport</span>'
          + '<span class="agent-config-value">Quotidien</span>'
        + '</div>'
        + '<div class="agent-config-row">'
          + '<button class="btn-outline-danger" data-action="delete-agent">Supprimer cet agent</button>'
        + '</div>'
      + '</div>';
  }

  return ''
    + '<div class="agent-chat-view">'
      + '<div class="agent-chat-header">'
        + '<button class="agent-back" data-action="back">' + ICONS.back + '</button>'
        + ghostSvg(a.color, 32)
        + '<div class="agent-chat-info">'
          + '<div class="agent-breadcrumb">Accueil <span class="agent-breadcrumb-sep">›</span> ' + escapeHtml(a.name) + '</div>'
          + '<div class="agent-chat-name">' + a.name + '</div>'
          + '<div class="agent-chat-meta">'
            + '<span class="status-dot" style="background:' + statusColor(a.status) + '"></span>'
            + statusLabel(a.status) + ' &middot; ' + a.pilot + ' pilote'
            + (a.tasks > 0 ? ' &middot; ' + a.tasks + ' tâches' : '')
          + '</div>'
        + '</div>'
        + '<div class="agent-chat-actions">'
          + '<button class="agent-tag" data-action="toggle-agent">' + (a.status === 'active' ? 'Pause' : 'Activer') + '</button>'
          + '<button class="agent-tag" data-action="agent-edit-brief">Modifier le brief</button>'
        + '</div>'
      + '</div>'
      + '<div class="agent-tabs">'
        + tabs.map(function(t) {
            return '<button class="agent-tab ' + (STATE.agentTab === t.id ? 'active' : '') + '" data-agent-tab="' + t.id + '">' + t.label + '</button>';
          }).join('')
      + '</div>'
      + tabContent
    + '</div>';
}
