// ═══════════════════════════════════════════════════════════
//  STORE — Reactive state management
// ═══════════════════════════════════════════════════════════

import { scheduleSave } from './services/persistence.js';

const state = {
  view: 'dashboard',
  activeAgent: null,
  searchOpen: false,
  workFilter: 'all',
  agentTab: 'chat',
  selectedColor: '#FF2D87',
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach(fn => fn(state));
  scheduleSave();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
