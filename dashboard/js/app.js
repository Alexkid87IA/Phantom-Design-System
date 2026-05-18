// =====================================================
//  APP -- Entry point
// =====================================================

import { subscribe, setState } from './store.js';
import { render } from './router.js';
import { initKeyboardShortcuts } from './services/keyboard.js';
import { startBackgroundSimulation } from './services/background.js';
import { showOnboardingTour } from './components/onboarding-tour.js';
import { startLivePulse } from './lib/live-pulse.js';
import { load } from './services/persistence.js';
import { checkAndShowMilestone } from './modals/milestone-modal.js';
import { setAgents } from './data/agents.js';
import { setConversations } from './data/conversations.js';
import { setInboxItems } from './data/inbox.js';

// Restore persisted data before first render
var saved = load();
if (saved) {
  setAgents({
    agents: saved.agents,
    missions: saved.agentMissions,
    responses: saved.agentResponses,
    chips: saved.agentChips,
  });
  if (saved.conversations) setConversations(saved.conversations);
  if (saved.inbox) setInboxItems(saved.inbox);
}

subscribe(render);

// Apply persisted view state (triggers render via subscriber)
if (saved && saved.state) {
  setState(saved.state);
} else {
  render();
}

initKeyboardShortcuts();
startBackgroundSimulation();
startLivePulse();

// Show onboarding tour if first visit
setTimeout(showOnboardingTour, 600);

// Check ROI milestones after initial render
setTimeout(checkAndShowMilestone, 2000);
