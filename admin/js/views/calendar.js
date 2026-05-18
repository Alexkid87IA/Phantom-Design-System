// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Calendar
// ═══════════════════════════════════════════════════════════

import { CONTENT_QUEUE } from '../data/admin-agents.js';

var DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

var SCHEDULED = [
  { day: 19, title: 'Nigiri du jour', client: 'Sushi Boy', color: 'var(--admin-violet)' },
  { day: 19, title: 'Story cassoulet', client: 'Fleur de Sel', color: 'var(--admin-green)' },
  { day: 20, title: 'Reel sauce secrète', client: 'Chez Marcel', color: 'var(--admin-pink)' },
  { day: 20, title: 'Article SEO', client: 'Green Garden', color: 'var(--admin-blue)' },
  { day: 21, title: 'Carousel coiffure', client: 'Bella Donna', color: 'var(--admin-orange)' },
  { day: 21, title: 'Post pizza', client: 'Pizza Roma', color: 'var(--admin-red)' },
  { day: 22, title: 'Photos Uber Eats', client: 'Sushi Boy', color: 'var(--admin-violet)' },
  { day: 22, title: 'Citation bien-être', client: "L'Atelier Zen", color: 'var(--admin-green)' },
  { day: 23, title: 'Carte de visite', client: 'Bike & Run', color: 'var(--admin-blue)' },
  { day: 24, title: 'Post engagement', client: 'Sushi Boy', color: 'var(--admin-violet)' },
  { day: 25, title: 'Réponse avis', client: 'Green Garden', color: 'var(--admin-green)' },
  { day: 26, title: 'Story lundi', client: 'Chez Marcel', color: 'var(--admin-pink)' },
];

export function renderCalendar() {
  var headers = DAYS.map(function(d) {
    return '<div class="admin-cal-header">' + d + '</div>';
  }).join('');

  var startDay = 4;
  var cells = '';

  for (var i = 0; i < startDay; i++) {
    cells += '<div class="admin-cal-day" style="opacity:0.3"><div class="admin-cal-day-num">' + (15 - startDay + i + 1) + '</div></div>';
  }

  for (var d = 1; d <= 31; d++) {
    var events = SCHEDULED.filter(function(s) { return s.day === (d + 18); });
    var evHtml = events.map(function(ev) {
      return '<div class="admin-cal-event" style="background:' + ev.color + '22;color:' + ev.color + '">' + ev.title + '</div>';
    }).join('');
    var isToday = d === 16;
    cells += '<div class="admin-cal-day' + (isToday ? '" style="border:1px solid var(--admin-violet)' : '') + '">'
      + '<div class="admin-cal-day-num"' + (isToday ? ' style="color:var(--admin-violet);font-weight:700"' : '') + '>' + d + '</div>'
      + evHtml
    + '</div>';
  }

  var padding = (7 - ((startDay + 31) % 7)) % 7;
  for (var p = 1; p <= padding; p++) {
    cells += '<div class="admin-cal-day" style="opacity:0.3"><div class="admin-cal-day-num">' + p + '</div></div>';
  }

  var upcoming = SCHEDULED.slice(0, 5).map(function(s) {
    return '<div class="admin-queue-item">'
      + '<div style="width:4px;height:32px;border-radius:2px;background:' + s.color + ';flex-shrink:0"></div>'
      + '<div class="admin-queue-info">'
        + '<div class="admin-queue-title">' + s.title + '</div>'
        + '<div class="admin-queue-meta">' + s.client + ' · ' + s.day + ' mai</div>'
      + '</div>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Publications cette semaine</div><div class="admin-kpi-value">' + SCHEDULED.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Clients avec contenus planifiés</div><div class="admin-kpi-value">7</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Prochaine publication</div><div class="admin-kpi-value" style="font-size:14px">Demain 10h</div></div>'
    + '</div>'
    + '<div class="admin-section-header"><div class="admin-section-title">Mai 2026</div></div>'
    + '<div class="admin-card" style="padding:0;overflow:hidden">'
      + '<div class="admin-cal-grid">'
        + headers
        + cells
      + '</div>'
    + '</div>'
    + '<div style="margin-top:24px">'
      + '<div class="admin-section-header"><div class="admin-section-title">À venir</div></div>'
      + upcoming
    + '</div>';
}
