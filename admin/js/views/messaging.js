// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Client Messaging Center
//  Unified inbox for all client communications
// ═══════════════════════════════════════════════════════════

import { getState, setState } from '../store.js';

var CONVERSATIONS = [
  { id: 'm1', client: 'Sushi Boy', contact: 'Kenji T.', channel: 'email', subject: 'Validation photos plats', lastMessage: 'Super les photos ! On garde la 3 et la 5.', time: 'Il y a 12min', unread: true, priority: 'normal' },
  { id: 'm2', client: 'Chez Marcel', contact: 'Marcel D.', channel: 'whatsapp', subject: 'Horaires weekend', lastMessage: 'On ferme dimanche cette semaine, pas de story svp', time: 'Il y a 45min', unread: true, priority: 'high' },
  { id: 'm3', client: 'Bella Donna', contact: 'Isabella V.', channel: 'email', subject: 'Carousel balayage', lastMessage: 'Le before/after est parfait, merci !', time: 'Il y a 2h', unread: false, priority: 'normal' },
  { id: 'm4', client: 'Green Garden', contact: 'Lucas M.', channel: 'slack', subject: 'Article SEO bio', lastMessage: 'Juste un truc : on dit "végétal" pas "végan" dans notre com', time: 'Il y a 3h', unread: true, priority: 'normal' },
  { id: 'm5', client: 'Maison Dupont', contact: 'Henri D.', channel: 'email', subject: 'Problème Instagram', lastMessage: 'Je n\'arrive plus à me connecter à mon Instagram pro', time: 'Il y a 5h', unread: true, priority: 'high' },
  { id: 'm6', client: 'Bike & Run', contact: 'Thomas B.', channel: 'email', subject: 'Carte de visite OK', lastMessage: 'C\'est validé. Envoyez à l\'imprimeur.', time: 'Il y a 6h', unread: false, priority: 'normal' },
  { id: 'm7', client: 'Fleur de Sel', contact: 'Sophie L.', channel: 'whatsapp', subject: 'Menu cassoulet', lastMessage: 'Tout bon pour le menu, on peut publier 👍', time: 'Il y a 7h', unread: false, priority: 'normal' },
  { id: 'm8', client: 'L\'Atelier Zen', contact: 'Camille R.', channel: 'email', subject: 'Citations lundi', lastMessage: 'Peut-on varier les fonds ? Toujours le même rose...', time: 'Il y a 8h', unread: false, priority: 'low' },
  { id: 'm9', client: 'Pizza Roma', contact: 'Marco P.', channel: 'whatsapp', subject: 'Photo margherita', lastMessage: 'Bellissimo ! 🤌', time: 'Il y a 10h', unread: false, priority: 'normal' },
  { id: 'm10', client: 'Sushi Boy', contact: 'Kenji T.', channel: 'email', subject: 'Planning juin', lastMessage: 'On prépare un événement le 15 juin, on en parle ?', time: 'Hier', unread: false, priority: 'normal' },
];

var TEMPLATES_MSG = [
  { id: 't1', name: 'Relance validation', body: 'Salut [prénom], on a [X] contenus en attente de ta validation...', usedCount: 34 },
  { id: 't2', name: 'Bienvenue client', body: 'Bienvenue chez Phantom ! Ton équipe d\'agents est prête...', usedCount: 12 },
  { id: 't3', name: 'Rapport mensuel', body: 'Voici ton rapport de performance pour [mois]...', usedCount: 28 },
  { id: 't4', name: 'Demande feedback', body: 'Comment s\'est passé ton mois avec Phantom ?...', usedCount: 8 },
];

export function renderMessaging() {
  var STATE = getState();
  var channelFilter = STATE.msgChannel || 'all';

  var unreadCount = CONVERSATIONS.filter(function(c) { return c.unread; }).length;
  var highPriority = CONVERSATIONS.filter(function(c) { return c.priority === 'high'; }).length;

  var filtered = channelFilter === 'all' ? CONVERSATIONS : CONVERSATIONS.filter(function(c) { return c.channel === channelFilter; });

  function channelIcon(ch) {
    if (ch === 'email') return '<span style="color:#0066FF">✉</span>';
    if (ch === 'whatsapp') return '<span style="color:#25D366">◉</span>';
    if (ch === 'slack') return '<span style="color:#E01E5A">⬡</span>';
    return '';
  }

  function channelBadge(ch) {
    if (ch === 'email') return '<span class="admin-badge admin-badge-muted">Email</span>';
    if (ch === 'whatsapp') return '<span class="admin-badge admin-badge-green">WhatsApp</span>';
    if (ch === 'slack') return '<span class="admin-badge admin-badge-red">Slack</span>';
    return '';
  }

  var conversationCards = filtered.map(function(c) {
    return '<div class="admin-card" style="margin-bottom:8px;padding:14px;border-left:3px solid ' + (c.unread ? 'var(--admin-violet)' : 'transparent') + '">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start">'
        + '<div style="flex:1">'
          + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">'
            + channelIcon(c.channel)
            + '<span style="font-size:13px;font-weight:' + (c.unread ? '600' : '400') + '">' + c.subject + '</span>'
            + (c.priority === 'high' ? ' <span class="admin-badge admin-badge-red">Urgent</span>' : '')
          + '</div>'
          + '<div style="font-size:12px;color:var(--admin-text-secondary);margin-bottom:6px">' + c.client + ' — ' + c.contact + '</div>'
          + '<div style="font-size:12px;color:var(--admin-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:500px">' + c.lastMessage + '</div>'
        + '</div>'
        + '<div style="text-align:right;min-width:80px">'
          + '<div style="font-size:10px;color:var(--admin-text-muted)">' + c.time + '</div>'
          + '<div style="margin-top:6px">' + channelBadge(c.channel) + '</div>'
        + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  var templateCards = TEMPLATES_MSG.map(function(t) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--admin-border)">'
      + '<div>'
        + '<div style="font-size:13px;font-weight:500">' + t.name + '</div>'
        + '<div style="font-size:11px;color:var(--admin-text-muted);margin-top:2px">' + t.body.substring(0, 50) + '...</div>'
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:8px">'
        + '<span style="font-size:10px;color:var(--admin-text-muted)">' + t.usedCount + ' envois</span>'
        + '<div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:3px 8px">Utiliser</div>'
      + '</div>'
    + '</div>';
  }).join('');

  var channelCounts = {
    all: CONVERSATIONS.length,
    email: CONVERSATIONS.filter(function(c) { return c.channel === 'email'; }).length,
    whatsapp: CONVERSATIONS.filter(function(c) { return c.channel === 'whatsapp'; }).length,
    slack: CONVERSATIONS.filter(function(c) { return c.channel === 'slack'; }).length,
  };

  var filterBtns = [
    { id: 'all', label: 'Tous (' + channelCounts.all + ')' },
    { id: 'email', label: 'Email (' + channelCounts.email + ')' },
    { id: 'whatsapp', label: 'WhatsApp (' + channelCounts.whatsapp + ')' },
    { id: 'slack', label: 'Slack (' + channelCounts.slack + ')' },
  ].map(function(f) {
    return '<div class="admin-filter-btn' + (channelFilter === f.id ? ' admin-filter-active' : '') + '" data-msg-channel="' + f.id + '">' + f.label + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-4" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Conversations</div><div class="admin-kpi-value">' + CONVERSATIONS.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Non lus</div><div class="admin-kpi-value" style="color:var(--admin-violet)">' + unreadCount + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Priorité haute</div><div class="admin-kpi-value" style="color:var(--admin-red)">' + highPriority + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Temps rép. moy.</div><div class="admin-kpi-value">1.8h</div></div>'
    + '</div>'

    + '<div class="admin-grid" style="grid-template-columns:1fr 320px;gap:16px">'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header">'
            + '<div class="admin-section-title">Messages</div>'
            + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:5px 14px">Nouveau message</div>'
          + '</div>'
          + '<div class="admin-filters" style="margin-bottom:12px">' + filterBtns + '</div>'
          + conversationCards
        + '</div>'
      + '</div>'

      + '<div>'
        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Templates rapides</div></div>'
          + '<div class="admin-card">' + templateCards + '</div>'
        + '</div>'

        + '<div class="admin-section">'
          + '<div class="admin-section-header"><div class="admin-section-title">Stats réponse</div></div>'
          + '<div class="admin-card">'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Réponse &lt;2h vs. cible 95%</span><div style="font-size:18px;font-weight:600;color:var(--admin-green);margin-top:4px">87%</div></div>'
            + '<div style="padding:8px 0;border-bottom:1px solid var(--admin-border)"><span style="font-size:12px;color:var(--admin-text-muted)">Messages/jour (moy.)</span><div style="font-size:18px;font-weight:600;margin-top:4px">12.4</div></div>'
            + '<div style="padding:8px 0"><span style="font-size:12px;color:var(--admin-text-muted)">Canal le plus actif</span><div style="font-size:14px;font-weight:500;margin-top:4px">Email (62%)</div></div>'
          + '</div>'
        + '</div>'
      + '</div>'

    + '</div>';
}
