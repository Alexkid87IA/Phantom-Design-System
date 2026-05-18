// ═══════════════════════════════════════════════════════════
//  LIVE PULSE — Simulated real-time agent activity toasts
// ═══════════════════════════════════════════════════════════

import { getAgent } from '../data/agents.js';
import { ghostSvg } from './icons.js';

var PULSE_EVENTS = [
  { agent: 'social', text: 'a publié un Reel sur Instagram', icon: '📱' },
  { agent: 'social', text: 'a programmé 3 Stories pour demain', icon: '📅' },
  { agent: 'google', text: 'a répondu à un avis 5★', icon: '⭐' },
  { agent: 'google', text: 'a mis à jour tes horaires Google', icon: '🕐' },
  { agent: 'seo', text: 'a publié un article SEO', icon: '📝' },
  { agent: 'seo', text: 'a gagné 2 positions sur "sushi marseille"', icon: '📈' },
  { agent: 'brand', text: 'a finalisé un visuel promo', icon: '🎨' },
  { agent: 'photos', text: 'a retouché 4 photos produits', icon: '📸' },
  { agent: 'social', text: '+18 followers cette heure', icon: '🚀' },
  { agent: 'google', text: 'note moyenne : 4.7★ (+0.1)', icon: '⭐' },
];

var timer = null;
var eventIndex = 0;

function showPulse(event) {
  var a = getAgent(event.agent);
  if (!a) return;

  var container = document.getElementById('toasts');
  if (!container) return;

  var el = document.createElement('div');
  el.className = 'pulse-toast';
  el.innerHTML = ''
    + '<div class="pulse-toast-inner">'
      + '<div class="pulse-toast-icon">' + ghostSvg(a.color, 20) + '</div>'
      + '<div class="pulse-toast-body">'
        + '<div class="pulse-toast-agent" style="color:' + a.color + '">' + a.name + '</div>'
        + '<div class="pulse-toast-text">' + event.text + '</div>'
      + '</div>'
      + '<div class="pulse-toast-badge">' + event.icon + '</div>'
    + '</div>';

  container.appendChild(el);
  setTimeout(function() { el.classList.add('pulse-toast-out'); }, 4000);
  setTimeout(function() { el.remove(); }, 4400);
}

export function startLivePulse() {
  if (timer) return;
  timer = setInterval(function() {
    var event = PULSE_EVENTS[eventIndex % PULSE_EVENTS.length];
    eventIndex++;
    showPulse(event);
  }, 15000);
}

