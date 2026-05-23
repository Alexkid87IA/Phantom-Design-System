// ═══════════════════════════════════════════════════════════
//  VIEW — Parrainage
// ═══════════════════════════════════════════════════════════

var REFERRAL = {
  code: 'SUSHIBOY-VIP',
  link: 'https://phantom.fr/r/sushiboy-vip',
  reward: '1 mois offert',
  referred: 1,
  pending: 0,
  earned: '1 490 €',
};

var MILESTONES = [
  { count: 1, reward: '1 mois offert', unlocked: true },
  { count: 3, reward: '10% à vie', unlocked: false },
  { count: 5, reward: '1 mois offert + hoodie', unlocked: false },
  { count: 10, reward: 'Accès VIP Beta', unlocked: false },
];

var REFERRALS = [
  { name: 'Chez Marcel', status: 'active', date: '01/04/2026', reward: '1 mois offert ✓' },
];

function renderProgressRing() {
  var total = REFERRAL.referred + REFERRAL.pending;
  var nextMilestone = MILESTONES.find(function(m) { return !m.unlocked; });
  var target = nextMilestone ? nextMilestone.count : MILESTONES[MILESTONES.length - 1].count;
  var pct = Math.min(total / target, 1);
  var radius = 54;
  var circumference = 2 * Math.PI * radius;
  var offset = circumference * (1 - pct);

  var milestoneSteps = MILESTONES.map(function(m) {
    var cls = m.unlocked ? 'referral-milestone-done' : 'referral-milestone-locked';
    var icon = m.unlocked
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rainbow-green)" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'
      : '<span class="referral-milestone-count">' + m.count + '</span>';
    return '<div class="referral-milestone ' + cls + '">'
      + '<div class="referral-milestone-icon">' + icon + '</div>'
      + '<div class="referral-milestone-info">'
        + '<div class="referral-milestone-label">' + m.count + ' filleul' + (m.count > 1 ? 's' : '') + '</div>'
        + '<div class="referral-milestone-reward">' + m.reward + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  return '<div class="referral-progress-card">'
    + '<div class="referral-progress-top">'
      + '<div class="referral-ring-wrap">'
        + '<svg class="referral-ring" viewBox="0 0 120 120">'
          + '<circle cx="60" cy="60" r="' + radius + '" fill="none" stroke="rgba(10,10,10,0.06)" stroke-width="8"/>'
          + '<circle cx="60" cy="60" r="' + radius + '" fill="none" stroke="url(#refGrad)" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 0.6s ease"/>'
          + '<defs><linearGradient id="refGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--phantom-violet)"/><stop offset="100%" stop-color="var(--rainbow-green)"/></linearGradient></defs>'
        + '</svg>'
        + '<div class="referral-ring-center">'
          + '<div class="referral-ring-number">' + total + '/' + target + '</div>'
          + '<div class="referral-ring-label">filleuls</div>'
        + '</div>'
      + '</div>'
      + '<div class="referral-progress-info">'
        + '<div class="referral-progress-title">Progression</div>'
        + (nextMilestone
          ? '<div class="referral-progress-next">Prochain palier : <strong>' + nextMilestone.reward + '</strong></div>'
          : '<div class="referral-progress-next" style="color:var(--green-600)">Tous les paliers débloqués !</div>')
      + '</div>'
    + '</div>'
    + '<div class="referral-milestones">' + milestoneSteps + '</div>'
  + '</div>';
}

export function renderReferral() {
  var referralRows = REFERRALS.map(function(r) {
    return '<div class="referral-row">'
      + '<span class="referral-row-name">' + r.name + '</span>'
      + '<span class="referral-row-status">' + r.status + '</span>'
      + '<span class="referral-row-date">' + r.date + '</span>'
      + '<span class="referral-row-reward">' + r.reward + '</span>'
    + '</div>';
  }).join('');

  return '<div class="view-referral">'
    + '<div class="referral-hero">'
      + '<div class="referral-hero-text">'
        + '<h2 class="view-title">Parrainage</h2>'
        + '<p class="referral-hero-desc">Parraine un commerce — vous gagnez tous les deux <strong>1 mois offert</strong>. Ton réseau grandit, ton abonnement se paie tout seul.</p>'
      + '</div>'
    + '</div>'

    + renderProgressRing()

    + '<div class="referral-stats">'
      + '<div class="referral-stat"><div class="referral-stat-value">' + REFERRAL.referred + '</div><div class="referral-stat-label">Filleul actif</div></div>'
      + '<div class="referral-stat"><div class="referral-stat-value">' + REFERRAL.pending + '</div><div class="referral-stat-label">En attente</div></div>'
      + '<div class="referral-stat"><div class="referral-stat-value">' + REFERRAL.earned + '</div><div class="referral-stat-label">Économisé</div></div>'
    + '</div>'

    + '<div class="referral-link-box">'
      + '<div class="referral-link-label">Ton lien de parrainage</div>'
      + '<div class="referral-link-row">'
        + '<input class="referral-link-input" type="text" value="' + REFERRAL.link + '" readonly>'
        + '<button class="referral-copy-btn">Copier</button>'
      + '</div>'
      + '<div class="referral-code">Code : <strong>' + REFERRAL.code + '</strong></div>'
    + '</div>'

    + '<div class="referral-share">'
      + '<span class="referral-share-label">Partager via</span>'
      + '<button class="referral-share-btn referral-share-whatsapp">WhatsApp</button>'
      + '<button class="referral-share-btn referral-share-email">Email</button>'
      + '<button class="referral-share-btn referral-share-sms">SMS</button>'
    + '</div>'

    + (REFERRALS.length > 0
      ? '<div class="referral-history">'
        + '<div class="referral-history-title">Historique</div>'
        + '<div class="referral-history-header"><span>Commerce</span><span>Statut</span><span>Date</span><span>Récompense</span></div>'
        + referralRows
        + '</div>'
      : '')
  + '</div>';
}
