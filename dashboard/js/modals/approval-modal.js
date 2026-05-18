// =====================================================
//  MODAL -- Inbox Approval Preview
// =====================================================

import { getInboxItem, getInboxItems, removeInboxItem } from '../data/inbox.js';
import { getAgent } from '../data/agents.js';
import { addMessage } from '../data/conversations.js';
import { ghostSvg } from '../lib/icons.js';
import { openModal, closeModal } from './modal-shell.js';
import { toast, celebrate } from '../lib/toast.js';
import { setState } from '../store.js';
import { scrollMessages } from '../services/messaging.js';

var GRADIENTS = [
  'linear-gradient(135deg, #1a1a2e, #16213e)',
  'linear-gradient(135deg, #0f3460, #1a1a2e)',
  'linear-gradient(135deg, #2c3e50, #1a1a2e)',
  'linear-gradient(135deg, #1a1a2e, #0f3460)',
  'linear-gradient(135deg, #16213e, #2c3e50)',
];

function renderGallery(preview) {
  var html = '<div class="approval-gallery">';
  for (var i = 0; i < preview.items.length; i++) {
    var item = preview.items[i];
    var grad = GRADIENTS[i % GRADIENTS.length];
    html += '<div class="approval-gallery-item" style="background:' + grad + '">'
      + '<div class="approval-gallery-title">' + item.title + '</div>'
      + '<div class="approval-gallery-detail">' + item.detail + '</div>'
    + '</div>';
  }
  html += '</div>';
  return html;
}

function renderPosts(preview) {
  var html = '<div class="approval-posts-list">';
  for (var i = 0; i < preview.items.length; i++) {
    var item = preview.items[i];
    html += '<div class="approval-post-item">'
      + '<div class="approval-post-title">' + item.title + '</div>'
      + '<div class="approval-post-detail">' + item.detail + '</div>'
    + '</div>';
  }
  html += '</div>';
  return html;
}

function renderText(preview, agentColor) {
  var borderColor = agentColor || 'var(--phantom-violet)';
  return ''
    + '<div class="approval-text-label">' + preview.label + '</div>'
    + '<div class="approval-text-block" style="border-left-color:' + borderColor + '">'
      + preview.content
    + '</div>';
}

function renderKeyword(preview) {
  return ''
    + '<div class="approval-kw-keyword">' + preview.keyword + '</div>'
    + '<div class="approval-kw-grid">'
      + '<div class="approval-kw-stat">'
        + '<div class="approval-kw-stat-value">' + preview.volume + '</div>'
        + '<div class="approval-kw-stat-label">Volume</div>'
      + '</div>'
      + '<div class="approval-kw-stat">'
        + '<div class="approval-kw-stat-value">' + preview.difficulty + '</div>'
        + '<div class="approval-kw-stat-label">Difficulté</div>'
      + '</div>'
      + '<div class="approval-kw-stat">'
        + '<div class="approval-kw-stat-value">' + preview.position + '</div>'
        + '<div class="approval-kw-stat-label">Position</div>'
      + '</div>'
    + '</div>'
    + '<div class="approval-suggestion">' + preview.suggestion + '</div>';
}

function renderPreviewBody(preview, agentColor) {
  if (preview.type === 'gallery') return renderGallery(preview);
  if (preview.type === 'posts') return renderPosts(preview);
  if (preview.type === 'text') return renderText(preview, agentColor);
  if (preview.type === 'keyword') return renderKeyword(preview);
  return '<div style="padding:12px;color:var(--ink-40)">Aucun aperçu disponible.</div>';
}

export function openApprovalModal(itemId) {
  var item = getInboxItem(itemId);
  if (!item || !item.preview) return;

  var agent = getAgent(item.agent);
  var agentColor = agent ? agent.color : '#999';
  var agentName = agent ? agent.name : item.agent;

  var bodyHtml = renderPreviewBody(item.preview, agentColor);

  openModal(
    '<div class="modal-header">'
      + '<div class="approval-header-left">'
        + ghostSvg(agentColor, 22)
        + '<div>'
          + '<div class="modal-title">' + item.title + '</div>'
          + '<span class="approval-agent-badge" style="background:' + agentColor + '">' + agentName + '</span>'
        + '</div>'
      + '</div>'
      + '<button class="modal-close" data-action="close-modal">&times;</button>'
    + '</div>'
    + '<div class="modal-body">'
      + bodyHtml
    + '</div>'
    + '<div class="approval-feedback-zone hidden" id="approval-feedback-zone">'
      + '<div class="approval-feedback-label">Ton feedback pour ' + agentName + '</div>'
      + '<textarea class="approval-feedback-input" id="approval-feedback-input" placeholder="Ex : Refais la photo 3 avec un fond plus clair..." rows="3"></textarea>'
      + '<button class="btn-primary approval-feedback-send" id="approval-feedback-send">Envoyer le feedback</button>'
    + '</div>'
    + '<div class="modal-footer" id="approval-footer">'
      + '<button class="btn-outline approval-btn-dismiss" id="approval-dismiss">Ignorer</button>'
      + '<button class="btn-outline approval-btn-feedback" id="approval-feedback-btn" style="border-color:' + agentColor + '33;color:' + agentColor + '">Retourner à l\'agent</button>'
      + '<button class="btn-primary approval-btn-approve" id="approval-approve">Valider &#10003;</button>'
    + '</div>'
  );

  document.getElementById('approval-approve').addEventListener('click', function() {
    removeInboxItem(itemId);
    var remaining = getInboxItems();
    closeModal();
    if (remaining.length === 0) {
      celebrate();
      celebrate();
      toast('Tout est validé ! Tes agents envoient tout en ligne.');
    } else {
      toast('Validé ! Plus que ' + remaining.length + ' livrable' + (remaining.length > 1 ? 's' : ''));
      celebrate();
    }
    setState({});
  });

  document.getElementById('approval-dismiss').addEventListener('click', function() {
    removeInboxItem(itemId);
    closeModal();
    toast('Élément ignoré');
    setState({});
  });

  document.getElementById('approval-feedback-btn').addEventListener('click', function() {
    var zone = document.getElementById('approval-feedback-zone');
    var footer = document.getElementById('approval-footer');
    zone.classList.remove('hidden');
    footer.classList.add('hidden');
    var input = document.getElementById('approval-feedback-input');
    if (input) input.focus();
  });

  document.getElementById('approval-feedback-send').addEventListener('click', function() {
    var input = document.getElementById('approval-feedback-input');
    var text = input ? input.value.trim() : '';
    if (!text) {
      toast('Écris un feedback avant d\'envoyer');
      return;
    }
    addMessage(item.agent, { from: 'user', text: '[Feedback] ' + item.title + ' — ' + text });
    addMessage(item.agent, { from: 'agent', text: 'Bien reçu. Je prends en compte ton retour et je révise. Tu auras une nouvelle version rapidement.' });
    removeInboxItem(itemId);
    closeModal();
    toast('Feedback envoyé à ' + agentName);
    setState({ activeAgent: item.agent, agentTab: 'chat' });
    scrollMessages();
  });

  document.querySelectorAll('[data-action="close-modal"]').forEach(function(el) {
    el.addEventListener('click', closeModal);
  });
}
