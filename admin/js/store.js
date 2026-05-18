// ═══════════════════════════════════════════════════════════
//  ADMIN STORE — Reactive state
// ═══════════════════════════════════════════════════════════

var state = {
  view: 'dashboard',
  subview: null,
  selectedClient: null,
  selectedPilot: null,
  selectedAgent: null,
  filter: 'all',
};

var listeners = new Set();

export function getState() { return state; }

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach(function(fn) { fn(state); });
}

export function subscribe(fn) {
  listeners.add(fn);
  return function() { listeners.delete(fn); };
}
