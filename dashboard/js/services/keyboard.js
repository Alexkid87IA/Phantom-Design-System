// =====================================================
//  SERVICE -- Keyboard Shortcuts
// =====================================================

import { getState, setState } from '../store.js';
import { renderSearch, closeSearch } from '../components/search-overlay.js';
import { closeModal } from '../modals/modal-shell.js';

var NAV_SHORTCUTS = {
  '1': 'dashboard',
  '2': 'inbox',
  '3': 'work',
  '4': 'planning',
  '5': 'analytics',
  '6': 'roi',
  '7': 'team',
};

export function initKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    var tag = document.activeElement && document.activeElement.tagName;
    var isInput = tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable);

    // Cmd+K / Ctrl+K: toggle search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      var STATE = getState();
      if (STATE.searchOpen) {
        closeSearch();
      } else {
        setState({ searchOpen: true });
        renderSearch();
      }
      return;
    }

    // Cmd+B / Ctrl+B: new brief
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      if (isInput) return;
      e.preventDefault();
      var briefBtn = document.querySelector('[data-action="new-brief"]');
      if (briefBtn) briefBtn.click();
      return;
    }

    // Escape: close modal, then search, then go back from agent
    if (e.key === 'Escape') {
      var modalOverlay = document.getElementById('modal-overlay');
      if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
        closeModal();
        return;
      }
      var STATE2 = getState();
      if (STATE2.searchOpen) {
        closeSearch();
        return;
      }
      if (STATE2.activeAgent) {
        setState({ activeAgent: null, agentTab: 'chat' });
        return;
      }
    }

    if (isInput) return;

    // Number shortcuts: 1-7 for quick nav
    if (!e.metaKey && !e.ctrlKey && !e.altKey && NAV_SHORTCUTS[e.key]) {
      var STATE3 = getState();
      if (STATE3.searchOpen) return;
      setState({ view: NAV_SHORTCUTS[e.key], activeAgent: null });
      return;
    }

    // G then H: go home (dashboard)
    if (e.key === 'h' && !e.metaKey && !e.ctrlKey) {
      setState({ view: 'dashboard', activeAgent: null });
      return;
    }
  });
}
