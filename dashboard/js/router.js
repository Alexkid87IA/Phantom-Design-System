// =====================================================
//  ROUTER -- render + event delegation
// =====================================================

import { getState, setState } from './store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderTopbar } from './components/topbar.js';
import { renderDashboard, dismissMorningCard } from './views/dashboard.js';
import { renderAgentChat } from './views/agent.js';
import { renderInbox } from './views/inbox.js';
import { renderWork } from './views/work.js';
import { renderPlanning, updatePlanningStatus } from './views/planning.js';
import { renderAnalytics } from './views/analytics.js';
import { renderHelp } from './views/help.js';
import { renderROI } from './views/roi.js';
import { renderTeam } from './views/team.js';
import { renderIntegrations } from './views/integrations.js';
import { renderProfile } from './views/profile.js';
import { renderBilling } from './views/billing.js';
import { renderSettings } from './views/settings.js';
import { renderTeamPermissions } from './views/team-permissions.js';
import { renderNotifications, markNotifRead, markAllNotifs } from './views/notifications.js';
import { renderReferral } from './views/referral.js';
import { sendMessage, scrollMessages } from './services/messaging.js';
import { toast, celebrate } from './lib/toast.js';
import { initCountUp } from './lib/countup.js';
import { animateButton } from './lib/btn-complete.js';
import { AGENTS, getAgent, removeAgent } from './data/agents.js';
import { renderSearch } from './components/search-overlay.js';
import { openBriefModal } from './modals/brief-modal.js';
import { openReportModal } from './modals/report-modal.js';
import { openEditBriefModal } from './modals/edit-brief-modal.js';
import { openApprovalModal } from './modals/approval-modal.js';
import { toggleNotifPanel, closeNotifPanel } from './components/notif-panel.js';
import { markAllRead } from './data/notifications.js';
import { removeAgentRequest } from './data/agent-requests.js';
import { addMessage } from './data/conversations.js';
import { setInboxItems } from './data/inbox.js';

function renderMainContent() {
  var STATE = getState();
  if (STATE.activeAgent) return renderAgentChat();
  if (STATE.view === 'inbox') return renderInbox();
  if (STATE.view === 'work') return renderWork();
  if (STATE.view === 'planning') return renderPlanning();
  if (STATE.view === 'analytics') return renderAnalytics();
  if (STATE.view === 'roi') return renderROI();
  if (STATE.view === 'team') return renderTeam();
  if (STATE.view === 'integrations') return renderIntegrations();
  if (STATE.view === 'profile') return renderProfile();
  if (STATE.view === 'billing') return renderBilling();
  if (STATE.view === 'settings') return renderSettings();
  if (STATE.view === 'team-permissions') return renderTeamPermissions();
  if (STATE.view === 'notifications') return renderNotifications();
  if (STATE.view === 'referral') return renderReferral();
  if (STATE.view === 'help') return renderHelp();
  return renderDashboard();
}

function renderShortcutBar() {
  var STATE = getState();
  var shortcuts = [];
  if (STATE.activeAgent) {
    shortcuts = [
      { key: 'Esc', label: 'Retour' },
      { key: '⌘K', label: 'Chercher' },
    ];
  } else {
    shortcuts = [
      { key: '⌘K', label: 'Chercher' },
      { key: '⌘B', label: 'Nouveau brief' },
      { key: '1-7', label: 'Navigation' },
      { key: 'H', label: 'Accueil' },
    ];
  }
  return '<div class="shortcut-bar">'
    + shortcuts.map(function(s) {
      return '<div class="shortcut-item"><kbd>' + s.key + '</kbd><span>' + s.label + '</span></div>';
    }).join('')
  + '</div>';
}

export function render() {
  var app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = ''
    + '<div class="app">'
      + renderSidebar()
      + '<div class="main">'
        + renderTopbar()
        + renderMainContent()
        + renderShortcutBar()
      + '</div>'
    + '</div>';
  bindAllEvents();
  requestAnimationFrame(initCountUp);
}

var clickBound = false;

function bindAllEvents() {
  var app = document.getElementById('app');
  if (!app) return;

  if (!clickBound) {
    clickBound = true;
    app.addEventListener('click', handleAppClick);
  }

  var dashInput = document.getElementById('dashboard-composer');
  if (dashInput) {
    dashInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(dashInput.dataset.agent, dashInput.value);
      }
    });
  }

  var agentInput = document.getElementById('agent-composer');
  if (agentInput) {
    agentInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(agentInput.dataset.agent, agentInput.value);
      }
    });
    agentInput.focus();
  }
}

function handleAppClick(e) {
    var target = e.target;

    // data-nav: navigate to view
    var navEl = target.closest('[data-nav]');
    if (navEl) {
      setState({ view: navEl.dataset.nav, activeAgent: null });
      var main = document.querySelector('.main');
      if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // data-req-action: agent request action button
    var reqActionEl = target.closest('[data-req-action]');
    if (reqActionEl) {
      var reqId = reqActionEl.dataset.reqAction;
      var reqType = reqActionEl.dataset.reqType;
      var reqAgent = reqActionEl.dataset.agent;
      removeAgentRequest(reqId);
      if (reqType === 'validate') {
        setState({ view: 'inbox', activeAgent: null });
        toast('Consulte les livrables ci-dessous');
      } else if (reqType === 'upload') {
        addMessage(reqAgent, { from: 'agent', text: 'J\'attends ta photo ! Envoie-la ici et je m\'en occupe.' });
        setState({ activeAgent: reqAgent, agentTab: 'chat' });
        scrollMessages();
      } else {
        setState({ activeAgent: reqAgent, agentTab: 'chat' });
        scrollMessages();
      }
      return;
    }

    // data-req-choice: agent request choice button
    var reqChoiceEl = target.closest('[data-req-choice]');
    if (reqChoiceEl) {
      var choiceReqId = reqChoiceEl.dataset.reqChoice;
      var choiceAgent = reqChoiceEl.dataset.agent;
      var choiceText = reqChoiceEl.textContent;
      animateButton(reqChoiceEl, { doneText: '✓', onDone: function() {
        removeAgentRequest(choiceReqId);
        addMessage(choiceAgent, { from: 'user', text: 'Je choisis : "' + choiceText + '"' });
        addMessage(choiceAgent, { from: 'agent', text: 'Parfait, je pars sur "' + choiceText + '". Tu auras le résultat final rapidement.' });
        toast('Choix envoyé !');
        setState({});
      }});
      return;
    }

    // data-notif-read: mark single notification as read
    var notifReadEl = target.closest('[data-notif-read]');
    if (notifReadEl) {
      markNotifRead(notifReadEl.dataset.notifRead);
      setState({});
      return;
    }

    // referral copy button
    if (target.closest('.referral-copy-btn')) {
      var input = document.querySelector('.referral-link-input');
      if (input && navigator.clipboard) {
        navigator.clipboard.writeText(input.value);
        toast('Lien copié !');
      } else if (input) {
        input.select();
        document.execCommand('copy');
        toast('Lien copié !');
      }
      return;
    }

    // data-inbox-check: checkbox click (stop propagation to prevent modal)
    var inboxCheckEl = target.closest('[data-inbox-check]');
    if (inboxCheckEl) {
      e.stopPropagation();
      return;
    }

    // data-inbox-preview: open approval modal
    var inboxPreviewEl = target.closest('[data-inbox-preview]');
    if (inboxPreviewEl) {
      openApprovalModal(inboxPreviewEl.dataset.inboxPreview);
      return;
    }

    // data-settings-toggle: toggle a settings preference
    var settingsToggleEl = target.closest('[data-settings-toggle]');
    if (settingsToggleEl) {
      var key = settingsToggleEl.dataset.settingsToggle;
      var cur = getState();
      var prefs = cur.settingsPrefs || {
        notifApp: true, emailWeekly: true, emailReady: true,
        emailUrgent: true, pushBrowser: false, darkMode: false,
      };
      prefs[key] = !prefs[key];
      var label = prefs[key] ? 'activé' : 'désactivé';
      toast('Paramètre ' + label);
      setState({ settingsPrefs: prefs, _settingsSaved: true });
      setTimeout(function() { setState({ _settingsSaved: false }); }, 2000);
      return;
    }

    // data-planning-action: planning card actions
    var planActionEl = target.closest('[data-planning-action]');
    if (planActionEl) {
      e.stopPropagation();
      var planAction = planActionEl.dataset.planningAction;
      var planId = planActionEl.dataset.planningId;
      if (planAction === 'approve') {
        animateButton(planActionEl, { doneText: 'Validé ✓', onDone: function() {
          updatePlanningStatus(planId, 'ready');
          toast('Contenu validé — prêt à publier !');
          celebrate();
          setState({});
        }});
      } else if (planAction === 'mark-ready') {
        animateButton(planActionEl, { doneText: 'Prêt ✓', onDone: function() {
          updatePlanningStatus(planId, 'ready');
          toast('Prêt à envoyer au monde !');
          setState({});
        }});
      } else if (planAction === 'publish') {
        animateButton(planActionEl, { doneText: 'Publié ✓', onDone: function() {
          updatePlanningStatus(planId, 'scheduled');
          toast('Publication planifiée ✓');
          celebrate();
          setState({});
        }});
      } else if (planAction === 'preview') {
        var previewAgent = planActionEl.dataset.agent;
        if (previewAgent) {
          setState({ activeAgent: previewAgent });
          scrollMessages();
        }
      }
      return;
    }

    // data-work-filter
    var workFilterEl = target.closest('[data-work-filter]');
    if (workFilterEl) {
      setState({ workFilter: workFilterEl.dataset.workFilter });
      return;
    }

    // data-agent-tab
    var agentTabEl = target.closest('[data-agent-tab]');
    if (agentTabEl) {
      setState({ agentTab: agentTabEl.dataset.agentTab });
      var STATE = getState();
      if (STATE.agentTab === 'chat') scrollMessages();
      return;
    }

    // data-chip: send chip as message
    var chipEl = target.closest('[data-chip]');
    if (chipEl) {
      sendMessage(chipEl.dataset.chipAgent, chipEl.dataset.chip);
      return;
    }

    // data-action handlers
    var actionEl = target.closest('[data-action]');
    if (actionEl) {
      var action = actionEl.dataset.action;

      if (action === 'toggle-notif-panel') {
        toggleNotifPanel();
        return;
      }

      if (action === 'mark-all-read') {
        markAllNotifs();
        closeNotifPanel();
        toast('Ardoise nettoyée !');
        setState({});
        return;
      }

      if (action === 'inbox-select-all') {
        var checkboxes = document.querySelectorAll('.inbox-checkbox');
        var allChecked = Array.from(checkboxes).every(function(cb) { return cb.checked; });
        checkboxes.forEach(function(cb) { cb.checked = !allChecked; });
        return;
      }

      if (action === 'inbox-approve-all') {
        var approveCount = document.querySelectorAll('.inbox-item').length;
        setInboxItems([]);
        celebrate();
        celebrate();
        var impactHtml = ''
          + '<div class="approval-impact">'
            + '<div class="approval-impact-icon">&#x1F680;</div>'
            + '<div class="approval-impact-body">'
              + '<div class="approval-impact-title">' + approveCount + ' livrable' + (approveCount > 1 ? 's' : '') + ' en ligne !</div>'
              + '<div class="approval-impact-stats">'
                + '<span class="approval-impact-stat">+142 reach</span>'
                + '<span class="approval-impact-dot"></span>'
                + '<span class="approval-impact-stat">+24 &euro; estimés</span>'
                + '<span class="approval-impact-dot"></span>'
                + '<span class="approval-impact-stat">4 agents actifs</span>'
              + '</div>'
            + '</div>'
          + '</div>';
        var el = document.createElement('div');
        el.className = 'toast';
        el.innerHTML = impactHtml;
        el.style.background = 'var(--paper)';
        el.style.color = 'var(--ink)';
        el.style.padding = '0';
        el.style.border = '1px solid rgba(110,60,255,0.15)';
        document.getElementById('toasts').appendChild(el);
        setTimeout(function() { el.classList.add('toast-out'); }, 3500);
        setTimeout(function() { el.remove(); }, 3800);
        setState({});
        return;
      }

      if (action === 'dismiss-morning') {
        dismissMorningCard();
        setState({});
        return;
      }

      if (action === 'search') {
        setState({ searchOpen: true });
        renderSearch();
        return;
      }

      if (action === 'back') {
        setState({ activeAgent: null, agentTab: 'chat' });
        return;
      }

      if (action === 'new-brief' || action === 'add-agent') {
        openBriefModal();
        return;
      }

      if (action === 'report') {
        openReportModal();
        return;
      }

      if (action === 'agent-edit-brief') {
        openEditBriefModal();
        return;
      }

      if (action === 'toggle-agent') {
        var STATE3 = getState();
        var ag2 = getAgent(STATE3.activeAgent);
        if (ag2) {
          ag2.status = ag2.status === 'active' ? 'idle' : 'active';
          toast(ag2.status === 'active' ? ag2.name + ' réactivé' : ag2.name + ' mis en pause');
          setState({});
        }
        return;
      }

      if (action === 'toggle-notif' || action === 'toggle-auto') {
        actionEl.classList.toggle('on');
        toast('Paramètre mis à jour');
        return;
      }

      if (action === 'export-data') {
        toast('Export en cours... Tu recevras un email.');
        return;
      }

      if (action === 'delete-account') {
        toast('Contacte ton pilot pour supprimer ton compte.');
        return;
      }

      if (action === 'billing-change-plan') {
        toast('Contacte ton pilot pour changer de plan.');
        return;
      }

      if (action === 'billing-edit-payment') {
        toast('Contacte ton pilot pour mettre à jour ton paiement.');
        return;
      }

      if (action === 'billing-download-pdf') {
        toast('Téléchargement de la facture en cours...');
        return;
      }

      if (action === 'integ-connect') {
        var integId = actionEl.dataset.integ;
        toast('Connexion à ' + (integId || 'l\'intégration') + ' en cours...');
        return;
      }

      if (action === 'integ-sync') {
        var syncId = actionEl.dataset.integ;
        actionEl.textContent = 'Sync...';
        toast('Resynchronisation lancée');
        setTimeout(function() {
          actionEl.textContent = 'Resync';
          toast('Synchronisation terminée');
        }, 1500);
        return;
      }

      if (action === 'team-invite') {
        toast('Copie le lien et partage-le avec ton équipe.');
        return;
      }

      if (action === 'delete-agent') {
        var STATE4 = getState();
        var ag3 = getAgent(STATE4.activeAgent);
        if (ag3 && confirm('Supprimer l\'agent "' + ag3.name + '" ?')) {
          removeAgent(ag3.id);
          setState({ activeAgent: null, agentTab: 'chat' });
          toast('Agent "' + ag3.name + '" supprimé');
        }
        return;
      }

      // fallthrough: unknown action
      return;
    }

    // data-notif-agent: click a notification item to open agent
    var notifAgentEl = target.closest('[data-notif-agent]');
    if (notifAgentEl) {
      closeNotifPanel();
      setState({ activeAgent: notifAgentEl.dataset.notifAgent });
      scrollMessages();
      return;
    }

    // data-agent: click agent row or work item
    var agentEl = target.closest('[data-agent]');
    if (agentEl) {
      setState({ activeAgent: agentEl.dataset.agent });
      scrollMessages();
      return;
    }

    // Send buttons (dashboard-send, agent-send)
    if (target.closest('#dashboard-send')) {
      var dashInput = document.getElementById('dashboard-composer');
      if (dashInput) {
        sendMessage(dashInput.dataset.agent, dashInput.value);
      }
      return;
    }
    if (target.closest('#agent-send')) {
      var agentInput = document.getElementById('agent-composer');
      if (agentInput) {
        sendMessage(agentInput.dataset.agent, agentInput.value);
      }
      return;
    }
}
