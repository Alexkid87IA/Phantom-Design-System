// =====================================================
//  COMPONENT -- Notification Panel (dropdown)
// =====================================================

import { getNotifications, unreadCount } from '../data/notifications.js';
import { getAgent } from '../data/agents.js';
import { ghostSvg } from '../lib/icons.js';

var panelOpen = false;

export function openNotifPanel() {
  panelOpen = true;
  var el = document.getElementById('notif-panel');
  if (el) {
    el.innerHTML = renderNotifPanel();
    el.classList.remove('hidden');
  }
  // Close panel on outside click (added on next tick to avoid closing immediately)
  setTimeout(function() {
    document.addEventListener('click', handleOutsideClick);
  }, 0);
}

export function closeNotifPanel() {
  panelOpen = false;
  var el = document.getElementById('notif-panel');
  if (el) {
    el.classList.add('hidden');
    el.innerHTML = '';
  }
  document.removeEventListener('click', handleOutsideClick);
}

export function toggleNotifPanel() {
  if (panelOpen) {
    closeNotifPanel();
  } else {
    openNotifPanel();
  }
}

function handleOutsideClick(e) {
  var panel = document.getElementById('notif-panel');
  var bell = document.querySelector('.notif-bell');
  if (!panel || !bell) {
    // DOM was destroyed (e.g. by a re-render), clean up
    panelOpen = false;
    document.removeEventListener('click', handleOutsideClick);
    return;
  }
  if (!panel.contains(e.target) && !bell.contains(e.target)) {
    closeNotifPanel();
  }
}

export function renderNotifPanel() {
  var notifications = getNotifications();

  var header = ''
    + '<div class="notif-panel-header">'
    + '  <span class="notif-panel-title">Notifications</span>'
    + (unreadCount() > 0
        ? '  <button class="notif-panel-mark" data-action="mark-all-read">Tout marquer lu</button>'
        : '')
    + '</div>';

  var body = '';
  if (notifications.length === 0) {
    body = '<div class="notif-empty">Aucune notification</div>';
  } else {
    body = '<div class="notif-list">';
    for (var i = 0; i < notifications.length; i++) {
      var n = notifications[i];
      var agent = getAgent(n.agent);
      var color = agent ? agent.color : '#6E3CFF';
      body += ''
        + '<div class="notif-item' + (n.read ? '' : ' unread') + '" data-notif-agent="' + n.agent + '">'
        + (n.read ? '<div style="width:6px;flex-shrink:0"></div>' : '<div class="notif-dot"></div>')
        + ghostSvg(color, 18)
        + '<div class="notif-item-text">'
        +   '<strong>' + (n.title || '') + '</strong> '
        +   (n.text || '')
        + '</div>'
        + '<span class="notif-item-time">' + n.time + '</span>'
        + '</div>';
    }
    body += '</div>';
  }

  return '<div class="notif-panel">' + header + body + '</div>';
}
