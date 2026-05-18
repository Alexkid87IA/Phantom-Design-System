// =====================================================
//  PERSISTENCE -- localStorage save/load with debounce
// =====================================================

import { getState } from '../store.js';
import { AGENTS, AGENT_MISSIONS, AGENT_RESPONSES, AGENT_CHIPS } from '../data/agents.js';
import { getInboxItems } from '../data/inbox.js';
import { getConversations } from '../data/conversations.js';

var STORAGE_KEY = 'phantom_v1';
var DEBOUNCE_MS = 500;
var timer = null;

export function save() {
  var s = getState();
  var data = {
    version: 1,
    ts: Date.now(),
    state: {
      view: s.view,
      activeAgent: s.activeAgent,
      agentTab: s.agentTab,
      settingsPrefs: s.settingsPrefs,
    },
    agents: AGENTS,
    agentMissions: AGENT_MISSIONS,
    agentResponses: AGENT_RESPONSES,
    agentChips: AGENT_CHIPS,
    conversations: getConversations(),
    inbox: getInboxItems(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('[persistence] save failed', e);
  }
}

export function scheduleSave() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(save, DEBOUNCE_MS);
}

export function load() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    var data = JSON.parse(raw);
    if (!data || data.version !== 1) return null;
    return data;
  } catch (e) {
    console.warn('[persistence] load failed', e);
    return null;
  }
}
