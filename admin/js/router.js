// ═══════════════════════════════════════════════════════════
//  ADMIN ROUTER — Render + event delegation
// ═══════════════════════════════════════════════════════════

import { getState, setState } from './store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderTopbar } from './components/topbar.js';
import { renderDashboard } from './views/dashboard.js';
import { renderClients } from './views/clients.js';
import { renderClientDetail } from './views/client-detail.js';
import { renderAgents } from './views/agents.js';
import { renderPilots } from './views/pilots.js';
import { renderContent } from './views/content.js';
import { renderCalendar } from './views/calendar.js';
import { renderTemplates } from './views/templates.js';
import { renderRevenue } from './views/revenue.js';
import { renderPipeline } from './views/pipeline.js';
import { renderBilling } from './views/billing.js';
import { renderSettings } from './views/settings.js';
import { renderChurn } from './views/churn.js';
import { renderOnboardingTracker } from './views/onboarding-tracker.js';
import { renderPerformance } from './views/performance.js';
import { renderPilotDetail } from './views/pilot-detail.js';
import { renderAudit } from './views/audit.js';
import { renderAgentDetail } from './views/agent-detail.js';
import { renderRoles } from './views/roles.js';
import { renderApiKeys } from './views/api-keys.js';
import { renderAiConfig } from './views/ai-config.js';
import { renderNotificationsAdmin } from './views/notifications-admin.js';
import { renderReports } from './views/reports.js';
import { renderValidation } from './views/validation.js';
import { renderMessaging } from './views/messaging.js';
import { renderSla } from './views/sla.js';
import { renderSatisfaction } from './views/satisfaction.js';
import { renderAutomations } from './views/automations.js';
import { renderKnowledgeBase } from './views/knowledge-base.js';
import { renderCosts } from './views/costs.js';
import { renderWorkload } from './views/workload.js';
import { renderCompetitors } from './views/competitors.js';
import { renderForecast } from './views/forecast.js';
import { renderHealth } from './views/health.js';
import { toast } from './lib/toast.js';
import { openNewClientModal } from './modals/new-client-modal.js';

function renderMainContent() {
  var STATE = getState();
  if (STATE.selectedClient) return renderClientDetail();
  if (STATE.selectedAgent) return renderAgentDetail();
  if (STATE.selectedPilot) return renderPilotDetail();
  if (STATE.view === 'clients') return renderClients();
  if (STATE.view === 'agents') return renderAgents();
  if (STATE.view === 'pilots') return renderPilots();
  if (STATE.view === 'content') return renderContent();
  if (STATE.view === 'calendar') return renderCalendar();
  if (STATE.view === 'templates') return renderTemplates();
  if (STATE.view === 'revenue') return renderRevenue();
  if (STATE.view === 'pipeline') return renderPipeline();
  if (STATE.view === 'billing') return renderBilling();
  if (STATE.view === 'settings') return renderSettings();
  if (STATE.view === 'churn') return renderChurn();
  if (STATE.view === 'onboarding') return renderOnboardingTracker();
  if (STATE.view === 'performance') return renderPerformance();
  if (STATE.view === 'audit') return renderAudit();
  if (STATE.view === 'roles') return renderRoles();
  if (STATE.view === 'api-keys') return renderApiKeys();
  if (STATE.view === 'ai-config') return renderAiConfig();
  if (STATE.view === 'notifications-admin') return renderNotificationsAdmin();
  if (STATE.view === 'reports') return renderReports();
  if (STATE.view === 'validation') return renderValidation();
  if (STATE.view === 'messaging') return renderMessaging();
  if (STATE.view === 'sla') return renderSla();
  if (STATE.view === 'satisfaction') return renderSatisfaction();
  if (STATE.view === 'automations') return renderAutomations();
  if (STATE.view === 'knowledge') return renderKnowledgeBase();
  if (STATE.view === 'costs') return renderCosts();
  if (STATE.view === 'workload') return renderWorkload();
  if (STATE.view === 'competitors') return renderCompetitors();
  if (STATE.view === 'forecast') return renderForecast();
  if (STATE.view === 'health') return renderHealth();
  return renderDashboard();
}

export function render() {
  var app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = ''
    + '<div class="admin-app">'
      + renderSidebar()
      + '<div class="admin-main">'
        + renderTopbar()
        + '<div class="admin-content">'
          + renderMainContent()
        + '</div>'
      + '</div>'
    + '</div>';
  bindEvents();
}

var bound = false;

function bindEvents() {
  var app = document.getElementById('app');
  if (!app || bound) return;
  bound = true;

  app.addEventListener('click', function(e) {
    var target = e.target;

    var churnActionEl = target.closest('[data-churn-client]');
    if (churnActionEl) {
      e.stopPropagation();
      toast('Contact planifié — relance envoyée au pilote');
      return;
    }

    var navEl = target.closest('[data-nav]');
    if (navEl) {
      setState({ view: navEl.dataset.nav, selectedClient: null, selectedPilot: null, selectedAgent: null, filter: 'all' });
      return;
    }

    var clientEl = target.closest('[data-client]');
    if (clientEl) {
      setState({ selectedClient: clientEl.dataset.client });
      return;
    }

    var pilotEl = target.closest('[data-pilot]');
    if (pilotEl) {
      setState({ selectedPilot: pilotEl.dataset.pilot });
      return;
    }

    var agentToggleEl = target.closest('[data-agent-toggle]');
    if (agentToggleEl) {
      e.stopPropagation();
      toast('Statut agent mis à jour');
      setState({});
      return;
    }

    var agentRestartEl = target.closest('[data-agent-restart]');
    if (agentRestartEl) {
      e.stopPropagation();
      toast('Agent relancé');
      setState({});
      return;
    }

    var agentAdminEl = target.closest('[data-agent-admin]');
    if (agentAdminEl) {
      setState({ selectedAgent: agentAdminEl.dataset.agentAdmin });
      return;
    }

    var filterEl = target.closest('[data-filter]');
    if (filterEl) {
      setState({ filter: filterEl.dataset.filter });
      return;
    }

    var msgChannelEl = target.closest('[data-msg-channel]');
    if (msgChannelEl) {
      setState({ msgChannel: msgChannelEl.dataset.msgChannel });
      return;
    }

    var backEl = target.closest('[data-action="back"]');
    if (backEl) {
      setState({ selectedClient: null, selectedPilot: null, selectedAgent: null });
      return;
    }

    var actionEl = target.closest('[data-action]');
    if (actionEl) {
      var action = actionEl.dataset.action;
      if (action === 'new-client') { openNewClientModal(); return; }
      if (action === 'approve') { toast('Contenu approuvé'); setState({}); return; }
      if (action === 'reject') { toast('Contenu rejeté'); setState({}); return; }
      if (action === 'remind') { toast('Relance envoyée'); return; }
      if (action === 'call') { toast('Appel planifié'); return; }
      if (action === 'email') { toast('Email envoyé'); return; }
      if (action === 'pause-client') { toast('Client mis en pause'); setState({}); return; }
      if (action === 'export') { toast('Export en cours...'); return; }
      if (action === 'rotate') { toast('Rotation de clé effectuée'); return; }
    }
  });
}
