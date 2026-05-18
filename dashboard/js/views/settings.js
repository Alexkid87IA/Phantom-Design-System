// ═══════════════════════════════════════════════════════════
//  VIEW — Paramètres client
// ═══════════════════════════════════════════════════════════

import { USER, WORKSPACE } from '../data/workspace.js';
import { getState } from '../store.js';

export function renderSettings() {
  var STATE = getState();
  var prefs = STATE.settingsPrefs || {
    notifApp: true, emailWeekly: true, emailReady: true,
    emailUrgent: true, pushBrowser: false, darkMode: false,
  };

  function tog(key, on) {
    return '<button class="settings-toggle' + (on ? ' on' : '') + '" data-settings-toggle="' + key + '" role="switch" aria-checked="' + on + '"></button>';
  }

  var savedIndicator = STATE._settingsSaved
    ? '<div class="settings-saved"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Sauvegardé</div>'
    : '';

  return '<div class="view-settings">'
    + '<div class="settings-header">'
      + '<div>'
        + '<h2 class="view-title">Paramètres</h2>'
        + '<p class="view-subtitle">Configure ton espace comme tu veux</p>'
      + '</div>'
      + savedIndicator
    + '</div>'

    + '<div class="settings-sections">'

      + '<div class="settings-section">'
        + '<h3 class="settings-section-title">Compte</h3>'
        + '<div class="settings-field"><span class="settings-label">Nom</span><span class="settings-value">' + USER.name + '</span></div>'
        + '<div class="settings-field"><span class="settings-label">Email</span><span class="settings-value">' + USER.email + '</span></div>'
        + '<div class="settings-field"><span class="settings-label">Mot de passe</span><span class="settings-value">••••••••••</span></div>'
        + '<div class="settings-field"><span class="settings-label">2FA</span><span class="settings-value settings-badge-on">Activé</span></div>'
        + '<div class="settings-field"><span class="settings-label">Espace</span><span class="settings-value">' + WORKSPACE.name + ' · ' + WORKSPACE.city + '</span></div>'
      + '</div>'

      + '<div class="settings-section">'
        + '<h3 class="settings-section-title">Notifications</h3>'
        + '<div class="settings-toggle-row"><span>Notifications in-app</span>' + tog('notifApp', prefs.notifApp) + '</div>'
        + '<div class="settings-toggle-row"><span>Email — Rapport hebdo</span>' + tog('emailWeekly', prefs.emailWeekly) + '</div>'
        + '<div class="settings-toggle-row"><span>Email — Livrable prêt</span>' + tog('emailReady', prefs.emailReady) + '</div>'
        + '<div class="settings-toggle-row"><span>Email — Avis urgent</span>' + tog('emailUrgent', prefs.emailUrgent) + '</div>'
        + '<div class="settings-toggle-row"><span>Push navigateur</span>' + tog('pushBrowser', prefs.pushBrowser) + '</div>'
      + '</div>'

      + '<div class="settings-section">'
        + '<h3 class="settings-section-title">Préférences</h3>'
        + '<div class="settings-field"><span class="settings-label">Langue</span><span class="settings-value">Français</span></div>'
        + '<div class="settings-field"><span class="settings-label">Fuseau horaire</span><span class="settings-value">Europe/Paris (UTC+2)</span></div>'
        + '<div class="settings-toggle-row"><span>Mode sombre</span>' + tog('darkMode', prefs.darkMode) + '</div>'
      + '</div>'

      + '<div class="settings-section">'
        + '<h3 class="settings-section-title">Données & Confidentialité</h3>'
        + '<div class="settings-action-row"><span>Exporter mes données</span><button class="settings-btn" data-action="export-data">Exporter</button></div>'
        + '<div class="settings-action-row"><span>Supprimer mon compte</span><button class="settings-btn settings-btn-danger" data-action="delete-account">Supprimer</button></div>'
      + '</div>'

    + '</div>'
  + '</div>';
}
