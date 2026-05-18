// =====================================================
//  SERVICE -- Messaging (send, typing, scroll)
// =====================================================

import { getState, setState } from '../store.js';
import { getConversation, addMessage } from '../data/conversations.js';
import { AGENT_RESPONSES } from '../data/agents.js';
import { findResponse } from '../data/agent-responses.js';

// Current dynamic chips per agent (updated after each agent response)
var _currentChips = {};

export function getCurrentChips(agentId) {
  return _currentChips[agentId] || null;
}

export function sendMessage(agentId, text) {
  if (!text.trim()) return;

  var userMessage = text.trim();
  addMessage(agentId, { from: 'user', text: userMessage });

  // Trigger re-render
  setState({});
  scrollMessages();

  setTimeout(function() {
    showTyping(agentId);
  }, 400);

  setTimeout(function() {
    // Try smart contextual response first
    var smart = findResponse(agentId, userMessage);
    var response;

    if (smart && smart.text) {
      response = smart.text;
      _currentChips[agentId] = smart.chips;
    } else {
      // Fallback to legacy static responses
      var responses = AGENT_RESPONSES[agentId] || ['Compris, je m\'en occupe.', 'Bien reçu. Je regarde ça tout de suite.', 'OK ! Je te reviens avec une proposition.'];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(agentId, { from: 'agent', text: response });
    setState({});
    scrollMessages();
  }, 1500 + Math.random() * 1000);
}

export function showTyping(agentId) {
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
