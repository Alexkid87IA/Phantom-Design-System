// =====================================================
//  DATA -- Notification store
// =====================================================

var NOTIFICATIONS = [];
var notifCounter = 0;

export function getNotifications() {
  return NOTIFICATIONS;
}

export function addNotification(notif) {
  notifCounter++;
  NOTIFICATIONS.unshift({
    id: 'n' + notifCounter,
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    read: false,
    agent: notif.agent || '',
    title: notif.title || '',
    text: notif.text || '',
  });
  if (NOTIFICATIONS.length > 20) NOTIFICATIONS.pop();
}

export function markAllRead() {
  NOTIFICATIONS.forEach(function(n) { n.read = true; });
}

export function unreadCount() {
  return NOTIFICATIONS.filter(function(n) { return !n.read; }).length;
}
