// ═══════════════════════════════════════════════════════════
//  COMPONENT — Search Overlay
// ═══════════════════════════════════════════════════════════

import { getState, setState } from '../store.js';
import { AGENTS } from '../data/agents.js';
import { WORK_ITEMS } from '../data/work.js';
import { getFeed } from '../data/feed.js';
import { ICONS, ghostSvg } from '../lib/icons.js';
import { statusLabel, escapeHtml } from '../lib/helpers.js';
import { openBriefModal } from '../modals/brief-modal.js';
import { openReportModal } from '../modals/report-modal.js';

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  var safe = escapeHtml(text);
  var safeQ = escapeHtml(query);
  var idx = safe.toLowerCase().indexOf(safeQ.toLowerCase());
  if (idx === -1) return safe;
  return safe.slice(0, idx) + '<mark class="search-highlight">' + safe.slice(idx, idx + safeQ.length) + '</mark>' + safe.slice(idx + safeQ.length);
}

// === Quick Actions ===
var QUICK_ACTIONS = [
  { label: 'Nouveau brief', action: 'new-brief', icon: 'plus', shortcut: '⌘B' },
  { label: 'Rapport mensuel', action: 'report', icon: 'dashboard', shortcut: '' },
  { label: 'Voir le planning', action: 'nav-planning', icon: 'work', shortcut: '4' },
  { label: 'Voir les statistiques', action: 'nav-analytics', icon: 'dashboard', shortcut: '5' },
  { label: 'Voir l\'impact ROI', action: 'nav-roi', icon: 'dashboard', shortcut: '6' },
];

var focusedIdx = -1;
var _keydownHandler = null;
var _overlayClickHandler = null;

function executeAction(action) {
  if (action === 'new-brief') {
    openBriefModal();
    closeSearch();
  } else if (action === 'report') {
    openReportModal();
    closeSearch();
  } else if (action.startsWith('nav-')) {
    setState({ view: action.replace('nav-', ''), activeAgent: null });
    closeSearch();
  } else if (action.startsWith('pause-')) {
    var agentId = action.replace('pause-', '');
    var ag = AGENTS.find(function(a) { return a.id === agentId; });
    if (ag) {
      ag.status = ag.status === 'active' ? 'idle' : 'active';
      setState({});
    }
    closeSearch();
  }
}

function getAllResults() {
  var container = document.getElementById('search-results');
  if (!container) return [];
  return container.querySelectorAll('.search-result');
}

function updateFocus() {
  var results = getAllResults();
  results.forEach(function(el, i) {
    if (i === focusedIdx) {
      el.classList.add('focused');
      el.scrollIntoView({ block: 'nearest' });
    } else {
      el.classList.remove('focused');
    }
  });
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    closeSearch();
    return;
  }

  var results = getAllResults();
  var count = results.length;
  if (!count) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    focusedIdx = focusedIdx < count - 1 ? focusedIdx + 1 : 0;
    updateFocus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    focusedIdx = focusedIdx > 0 ? focusedIdx - 1 : count - 1;
    updateFocus();
  } else if (e.key === 'Enter') {
    if (focusedIdx >= 0 && focusedIdx < count) {
      e.preventDefault();
      results[focusedIdx].click();
    }
  }
}

function renderQuickActionsHTML() {
  return '<div class="search-section-title">Actions rapides</div>'
    + QUICK_ACTIONS.map(function(qa) {
      var shortcutHtml = qa.shortcut ? '<span class="search-shortcut">' + qa.shortcut + '</span>' : '';
      return '<div class="search-result" data-search-action="' + qa.action + '">'
        + (ICONS[qa.icon] || '')
        + '<div class="search-result-text">' + qa.label + '</div>'
        + shortcutHtml
        + '</div>';
    }).join('');
}

export function renderSearch() {
  focusedIdx = -1;

  var overlay = document.getElementById('search-overlay');
  overlay.classList.remove('hidden');
  overlay.innerHTML = '<div class="search-box">'
    + '<div class="search-input-row">'
    + ICONS.search
    + '<input type="text" class="search-input" id="search-input" placeholder="Que veux-tu faire ? (agent, brief, ROI, tâche...)" autofocus />'
    + '<span class="search-kbd">ESC</span>'
    + '</div>'
    + '<div class="search-results" id="search-results">'
    + renderQuickActionsHTML()
    + '<div class="search-section-title">Agents</div>'
    + AGENTS.map(function(a) {
      return '<div class="search-result" data-search-agent="' + a.id + '">'
        + ghostSvg(a.color, 18)
        + '<div>'
        + '<div class="search-result-text">' + a.name + '</div>'
        + '<div class="search-result-sub">' + statusLabel(a.status) + ' &middot; ' + a.pilot + ' pilote</div>'
        + '</div></div>';
    }).join('')
    + '<div class="search-section-title">Vues</div>'
    + '<div class="search-result" data-search-nav="dashboard">'
    + ICONS.dashboard
    + '<div class="search-result-text">Tableau de bord</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="inbox">'
    + ICONS.inbox
    + '<div class="search-result-text">Boîte de réception</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="work">'
    + ICONS.work
    + '<div class="search-result-text">Travail produit</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="planning">'
    + '<div class="search-result-text">Planning</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="analytics">'
    + '<div class="search-result-text">Statistiques</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="roi">'
    + '<div class="search-result-text">Impact & ROI</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="team">'
    + '<div class="search-result-text">Mon équipe</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="integrations">'
    + '<div class="search-result-text">Intégrations</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="billing">'
    + '<div class="search-result-text">Facturation</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="settings">'
    + '<div class="search-result-text">Paramètres</div>'
    + '</div>'
    + '<div class="search-result" data-search-nav="help">'
    + '<div class="search-result-text">Centre d\'aide</div>'
    + '</div>'
    + '</div></div>';

  var input = document.getElementById('search-input');
  input.focus();
  input.addEventListener('input', handleSearchInput);

  if (_overlayClickHandler) overlay.removeEventListener('click', _overlayClickHandler);
  _overlayClickHandler = function(e) {
    if (e.target === overlay) closeSearch();
  };
  overlay.addEventListener('click', _overlayClickHandler);

  // Keyboard navigation
  if (_keydownHandler) {
    overlay.removeEventListener('keydown', _keydownHandler);
  }
  _keydownHandler = handleKeydown;
  overlay.addEventListener('keydown', _keydownHandler);

  bindSearchClicks(overlay);
}

function handleSearchInput(e) {
  var q = e.target.value.toLowerCase().trim();
  var results = document.getElementById('search-results');

  focusedIdx = -1;

  if (!q) {
    // Rebuild default results without re-rendering the whole overlay
    results.innerHTML = renderQuickActionsHTML()
      + '<div class="search-section-title">Agents</div>'
      + AGENTS.map(function(a) {
        return '<div class="search-result" data-search-agent="' + a.id + '">'
          + ghostSvg(a.color, 18)
          + '<div>'
          + '<div class="search-result-text">' + a.name + '</div>'
          + '<div class="search-result-sub">' + statusLabel(a.status) + ' &middot; ' + a.pilot + ' pilote</div>'
          + '</div></div>';
      }).join('')
      + '<div class="search-section-title">Vues</div>'
      + '<div class="search-result" data-search-nav="dashboard">'
      + ICONS.dashboard
      + '<div class="search-result-text">Tableau de bord</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="inbox">'
      + ICONS.inbox
      + '<div class="search-result-text">Boîte de réception</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="work">'
      + ICONS.work
      + '<div class="search-result-text">Travail produit</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="planning">'
      + '<div class="search-result-text">Planning</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="analytics">'
      + '<div class="search-result-text">Statistiques</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="roi">'
      + '<div class="search-result-text">Impact & ROI</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="team">'
      + '<div class="search-result-text">Mon équipe</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="integrations">'
      + '<div class="search-result-text">Intégrations</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="billing">'
      + '<div class="search-result-text">Facturation</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="settings">'
      + '<div class="search-result-text">Paramètres</div>'
      + '</div>'
      + '<div class="search-result" data-search-nav="help">'
      + '<div class="search-result-text">Centre d\'aide</div>'
      + '</div>';
    bindSearchClicks(results);
    return;
  }

  var matchedActions = QUICK_ACTIONS.filter(function(qa) {
    return qa.label.toLowerCase().includes(q);
  });
  var matchedAgents = AGENTS.filter(function(a) { return a.name.toLowerCase().includes(q); });
  var matchedWork = WORK_ITEMS.filter(function(w) { return w.title.toLowerCase().includes(q) || w.type.toLowerCase().includes(q); });
  var feed = getFeed();
  var matchedFeed = feed.filter(function(f) { return f.text.toLowerCase().includes(q) || f.title.toLowerCase().includes(q); });

  var html = '';

  if (matchedActions.length) {
    html += '<div class="search-section-title">Actions</div>';
    html += matchedActions.map(function(qa) {
      return '<div class="search-result" data-search-action="' + qa.action + '">'
        + (ICONS[qa.icon] || '')
        + '<div class="search-result-text">' + highlightMatch(qa.label, q) + '</div>'
        + '</div>';
    }).join('');
  }

  if (matchedAgents.length) {
    html += '<div class="search-section-title">Agents</div>';
    html += matchedAgents.map(function(a) {
      return '<div class="search-result" data-search-agent="' + a.id + '">'
        + ghostSvg(a.color, 18)
        + '<div><div class="search-result-text">' + highlightMatch(a.name, q) + '</div>'
        + '<div class="search-result-sub">' + statusLabel(a.status) + ' &middot; ' + a.pilot + ' pilote</div></div></div>';
    }).join('');
  }

  if (matchedWork.length) {
    html += '<div class="search-section-title">Travail produit</div>';
    html += matchedWork.map(function(w) {
      return '<div class="search-result" data-search-agent="' + w.agent + '">'
        + '<div><div class="search-result-text">' + highlightMatch(w.title, q) + '</div>'
        + '<div class="search-result-sub">' + highlightMatch(w.type, q) + ' &middot; ' + w.date + '</div></div></div>';
    }).join('');
  }

  if (matchedFeed.length) {
    html += '<div class="search-section-title">Activité</div>';
    html += matchedFeed.map(function(f) {
      return '<div class="search-result" data-search-agent="' + f.agent + '">'
        + '<div><div class="search-result-text">' + highlightMatch(f.title + ' ' + f.text, q) + '</div>'
        + '<div class="search-result-sub">' + f.time + '</div></div></div>';
    }).join('');
  }

  if (!html) {
    html = '<div class="search-empty">Aucun résultat pour &laquo; ' + q + ' &raquo;</div>';
  }

  results.innerHTML = html;
  bindSearchClicks(results);
}

function bindSearchClicks(container) {
  container.querySelectorAll('[data-search-agent]').forEach(function(el) {
    el.addEventListener('click', function() {
      setState({ activeAgent: el.dataset.searchAgent });
      closeSearch();
    });
  });
  container.querySelectorAll('[data-search-nav]').forEach(function(el) {
    el.addEventListener('click', function() {
      setState({ view: el.dataset.searchNav, activeAgent: null });
      closeSearch();
    });
  });
  container.querySelectorAll('[data-search-action]').forEach(function(el) {
    el.addEventListener('click', function() {
      executeAction(el.dataset.searchAction);
    });
  });
}

export function closeSearch() {
  var overlay = document.getElementById('search-overlay');
  if (_keydownHandler) {
    overlay.removeEventListener('keydown', _keydownHandler);
    _keydownHandler = null;
  }
  if (_overlayClickHandler) {
    overlay.removeEventListener('click', _overlayClickHandler);
    _overlayClickHandler = null;
  }
  overlay.classList.add('hidden');
  setState({ searchOpen: false });
}
