// ═══════════════════════════════════════════════════════════
//  VIEW — Intégrations
// ═══════════════════════════════════════════════════════════

var INTEGRATIONS = [
  { id: 'ig', name: 'Instagram', status: 'connected', account: '@sushiboy_marseille', lastSync: 'Il y a 12 min', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>', color: '#E1306C' },
  { id: 'fb', name: 'Facebook', status: 'connected', account: 'Sushi Boy Marseille', lastSync: 'Il y a 12 min', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>', color: '#1877F2' },
  { id: 'google', name: 'Google Business', status: 'connected', account: 'Sushi Boy — 4.7★ (234 avis)', lastSync: 'Il y a 1h', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>', color: '#4285F4' },
  { id: 'uber', name: 'Uber Eats', status: 'connected', account: 'Sushi Boy Prado', lastSync: 'Il y a 3h', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12h6M12 9v6"/></svg>', color: '#06C167' },
  { id: 'site', name: 'Site web', status: 'warning', account: 'sushiboy.fr — SSL expire dans 12j', lastSync: 'Il y a 6h', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>', color: 'var(--phantom-violet)' },
  { id: 'analytics', name: 'Google Analytics', status: 'disconnected', account: 'Non connecté', lastSync: '—', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>', color: '#F9AB00' },
];

export function renderIntegrations() {
  var connected = INTEGRATIONS.filter(function(i) { return i.status === 'connected'; }).length;

  var items = INTEGRATIONS.map(function(i) {
    var statusHtml = i.status === 'connected'
      ? '<span class="integ-badge integ-badge-green">Connecté</span>'
      : i.status === 'warning'
        ? '<span class="integ-badge integ-badge-orange">Attention</span>'
        : '<span class="integ-badge integ-badge-muted">À connecter</span>';

    var actionBtn = i.status === 'disconnected'
      ? '<button class="integ-connect-btn" data-action="integ-connect" data-integ="' + i.id + '">Connecter</button>'
      : '<button class="integ-sync-btn integ-btn-disabled" disabled>Synchro auto</button>';

    return '<div class="integ-card">'
      + '<div class="integ-card-left">'
        + '<div class="integ-icon" style="color:' + i.color + '">' + i.icon + '</div>'
        + '<div class="integ-info">'
          + '<div class="integ-name">' + i.name + '</div>'
          + '<div class="integ-account">' + i.account + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="integ-card-right">'
        + '<div class="integ-sync">Dernière synchro : ' + i.lastSync + '</div>'
        + statusHtml
        + actionBtn
      + '</div>'
    + '</div>';
  }).join('');

  return '<div class="view-integrations">'
    + '<div class="integ-header">'
      + '<div class="integ-header-text">'
        + '<h2 class="view-title">Intégrations</h2>'
        + '<p class="view-subtitle">Plus tu connectes, plus tes agents sont puissants — ' + connected + '/' + INTEGRATIONS.length + ' en place</p>'
      + '</div>'
    + '</div>'
    + '<div class="integ-list">' + items + '</div>'
  + '</div>';
}
