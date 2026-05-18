// ═══════════════════════════════════════════════════════════
//  VIEW — Profil Business
// ═══════════════════════════════════════════════════════════

import { WORKSPACE } from '../data/workspace.js';

var PROFILE = {
  name: 'Sushi Boy',
  sector: 'Restauration japonaise',
  address: '42 Rue du Prado, 13006 Marseille',
  phone: '04 91 22 33 44',
  hours: 'Lun-Sam 11h30-14h30 / 18h30-22h30',
  website: 'sushiboy.fr',
  instagram: '@sushiboy_marseille',
  facebook: 'Sushi Boy Marseille',
  tone: 'Fun, direct, gourmand. Tutoiement. Emojis modérés.',
  keywords: ['sushi marseille', 'restaurant japonais prado', 'livraison sushi', 'menu midi marseille'],
  competitors: ['Planet Sushi', 'Sushi Shop', 'O\'Sushi Prado'],
  description: 'Restaurant japonais authentique à Marseille. Spécialités : nigiri, maki signature, bowls poké. Poisson frais du marché chaque matin.',
};

export function renderProfile() {
  var keywords = PROFILE.keywords.map(function(k) {
    return '<span class="profile-tag">' + k + '</span>';
  }).join('');

  var competitors = PROFILE.competitors.map(function(c) {
    return '<span class="profile-tag profile-tag-red">' + c + '</span>';
  }).join('');

  var filledFields = 0;
  var totalFields = 8;
  if (PROFILE.address) filledFields++;
  if (PROFILE.phone) filledFields++;
  if (PROFILE.hours) filledFields++;
  if (PROFILE.website) filledFields++;
  if (PROFILE.instagram) filledFields++;
  if (PROFILE.tone) filledFields++;
  if (PROFILE.description) filledFields++;
  if (PROFILE.keywords.length > 0) filledFields++;
  var completePct = Math.round((filledFields / totalFields) * 100);

  var editIcon = '<svg class="profile-edit-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';

  return '<div class="view-profile">'
    + '<div class="profile-header">'
      + '<div class="profile-avatar">' + WORKSPACE.initials + '</div>'
      + '<div class="profile-header-info">'
        + '<h2 class="view-title">' + PROFILE.name + '</h2>'
        + '<p class="view-subtitle">' + PROFILE.sector + ' · Marseille</p>'
      + '</div>'
      + '<div class="profile-complete">'
        + '<div class="profile-complete-bar"><div class="profile-complete-fill" style="width:' + completePct + '%"></div></div>'
        + '<span class="profile-complete-label">' + completePct + '% complet</span>'
      + '</div>'
    + '</div>'

    + '<div class="profile-grid">'
      + '<div class="profile-section">'
        + '<h3 class="profile-section-title">Informations ' + editIcon + '</h3>'
        + '<div class="profile-field"><span class="profile-label">Adresse</span><span class="profile-value">' + PROFILE.address + '</span></div>'
        + '<div class="profile-field"><span class="profile-label">Téléphone</span><span class="profile-value">' + PROFILE.phone + '</span></div>'
        + '<div class="profile-field"><span class="profile-label">Horaires</span><span class="profile-value">' + PROFILE.hours + '</span></div>'
        + '<div class="profile-field"><span class="profile-label">Site web</span><span class="profile-value">' + PROFILE.website + '</span></div>'
      + '</div>'

      + '<div class="profile-section">'
        + '<h3 class="profile-section-title">Réseaux sociaux ' + editIcon + '</h3>'
        + '<div class="profile-field"><span class="profile-label">Instagram</span><span class="profile-value">' + PROFILE.instagram + '</span></div>'
        + '<div class="profile-field"><span class="profile-label">Facebook</span><span class="profile-value">' + PROFILE.facebook + '</span></div>'
      + '</div>'

      + '<div class="profile-section">'
        + '<h3 class="profile-section-title">Ton de voix ' + editIcon + '</h3>'
        + '<p class="profile-tone">' + PROFILE.tone + '</p>'
      + '</div>'

      + '<div class="profile-section">'
        + '<h3 class="profile-section-title">Description ' + editIcon + '</h3>'
        + '<p class="profile-tone">' + PROFILE.description + '</p>'
      + '</div>'

      + '<div class="profile-section">'
        + '<h3 class="profile-section-title">Mots-clés SEO</h3>'
        + '<div class="profile-tags">' + keywords + '</div>'
      + '</div>'

      + '<div class="profile-section">'
        + '<h3 class="profile-section-title">Concurrents surveillés</h3>'
        + '<div class="profile-tags">' + competitors + '</div>'
      + '</div>'
    + '</div>'
  + '</div>';
}
