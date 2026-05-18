// =====================================================
//  SERVICE -- Background Activity Simulation
// =====================================================

import { getState, setState } from '../store.js';
import { getFeed, addFeedItem, getNextFeedId, BACKGROUND_EVENTS } from '../data/feed.js';
import { getAgent } from '../data/agents.js';
import { toast } from '../lib/toast.js';
import { addNotification } from '../data/notifications.js';

var backgroundEventIndex = 0;
var intervalId = null;

function simulateActivity() {
  var event = BACKGROUND_EVENTS[backgroundEventIndex % BACKGROUND_EVENTS.length];
  backgroundEventIndex++;

  var now = new Date();
  var time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  addFeedItem({
    id: getNextFeedId(),
    time: time,
    agent: event.agent,
    title: event.title,
    text: event.text,
    sub: event.sub,
    status: Math.random() > 0.6 ? 'waiting' : 'done',
  });

  addNotification({
    agent: event.agent,
    title: event.title,
    text: event.text,
  });

  setState({});

  toast(event.title + ' ' + event.text.slice(0, 40) + '...');
}

export function startBackgroundSimulation() {
  if (intervalId) return;
  intervalId = setInterval(simulateActivity, 45000 + Math.random() * 45000);
}

