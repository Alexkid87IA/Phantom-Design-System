// =====================================================
//  SERVICE -- Messaging (send, typing, scroll)
// =====================================================

import { getState, setState } from '../store.js';
import { getConversation, addMessage } from '../data/conversations.js';
import { AGENT_RESPONSES } from '../data/agents.js';
import { findResponse } from '../data/agent-responses.js';

// Current dynamic chips per agent (updated after each agent response)
var _currentChips = {};
var _pendingTimers = {};

export function getCurrentChips(agentId) {
  return _currentChips[agentId] || null;
}

export function sendMessage(agentId, text) {
  if (!agentId || !text || !text.trim()) return;

  if (_pendingTimers[agentId]) {
    clearTimeout(_pendingTimers[agentId].typing);
    clearTimeout(_pendingTimers[agentId].reply);
    delete _pendingTimers[agentId];
  }

  var userMessage = text.trim();
  addMessage(agentId, { from: 'user', text: userMessage });

  setState({});

  var timers = {};

  timers.typing = setTimeout(function() {
    showTyping(agentId);
  }, 400);

  timers.reply = setTimeout(function() {
    delete _pendingTimers[agentId];

    var smart = findResponse(agentId, userMessage);
    var response;

    if (smart && smart.text) {
      response = smart.text;
      _currentChips[agentId] = smart.chips;
    } else {
      var responses = AGENT_RESPONSES[agentId] || ['Compris, je m\'en occupe.', 'Bien reçu. Je regarde ça tout de suite.', 'OK ! Je te reviens avec une proposition.'];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(agentId, { from: 'agent', text: response });
    setState({});
    scrollMessages();
  }, 1500 + Math.random() * 1000);

  _pendingTimers[agentId] = timers;
}

function showTyping(agentId) {
  var STATE = getState();
  var container = STATE.activeAgent
    ? document.getElementById('agent-messages')
    : document.getElementById('dashboard-messages');

  if (!container) return;

  var existing = container.querySelector('.typing');
  if (existing) return;

  var div = document.createElement('div');
  div.className = 'typing';
  div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  container.appendChild(div);
  scrollMessages();
}

export function scrollMessages() {
  requestAnimationFrame(function() {
    var STATE = getState();
    var container = STATE.activeAgent
      ? document.getElementById('agent-messages')
      : document.getElementById('dashboard-messages');
    if (container) container.scrollTop = container.scrollHeight;
  });
}
