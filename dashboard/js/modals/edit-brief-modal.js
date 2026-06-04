// =====================================================
//  MODAL -- Edit Agent Brief
// =====================================================

import { getState, setState } from '../store.js';
import { getAgent, AGENT_MISSIONS } from '../data/agents.js';
import { PILOTS, RAINBOW_COLORS } from '../data/workspace.js';
import { openModal, closeModal } from './modal-shell.js';
import { toast } from '../lib/toast.js';
import { escapeHtml } from '../lib/helpers.js';

export function openEditBriefModal() {
  var STATE = getState();
  var a = getAgent(STATE.activeAgent);
  if (!a) return;
  var m = AGENT_MISSIONS[a.id] || { brief: '' };

  openModal(
    '<div class="modal-header">'
      + '<span class="modal-title">Modifier le brief &mdash; ' + escapeHtml(a.name) + '</span>'
      + '<button class="modal-close" data-action="close-modal" aria-label="Fermer">&times;</button>'
    + '</div>'
    + '<div class="modal-body">'
      + '<div class="form-group">'
        + '<label class="form-label">Nom</label>'
        + '<input type="text" class="form-input" id="edit-name" value="' + escapeHtml(a.name) + '" />'
      + '</div>'
      + '<div class="form-group">'
        + '<label class="form-label">Brief / Mission</label>'
        + '<textarea class="form-textarea" id="edit-mission" style="min-height:120px">' + escapeHtml(m.brief) + '</textarea>'
      + '</div>'
      + '<div class="form-row">'
        + '<div class="form-group">'
          + '<label class="form-label">Pilote</label>'
          + '<select class="form-select" id="edit-pilot">'
            + PILOTS.map(function(p) {
                return '<option value="' + p + '"' + (a.pilot === p ? ' selected' : '') + '>' + p + '</option>';
              }).join('')
          + '</select>'
        + '</div>'
        + '<div class="form-group">'
          + '<label class="form-label">Couleur</label>'
          + '<div class="color-picker" id="edit-color-picker">'
            + RAINBOW_COLORS.map(function(c) {
                return '<div class="color-swatch ' + (a.color === c ? 'selected' : '') + '" style="background:' + c + '" data-color="' + c + '"></div>';
              }).join('')
          + '</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '<div class="modal-footer">'
      + '<button class="btn-outline" data-action="close-modal">Annuler</button>'
      + '<button class="btn-primary" id="edit-submit">Enregistrer</button>'
    + '</div>'
  );

  var editColor = a.color;

  // Color picker
  document.querySelectorAll('#edit-color-picker .color-swatch').forEach(function(el) {
    el.addEventListener('click', function() {
      editColor = el.dataset.color;
      document.querySelectorAll('#edit-color-picker .color-swatch').forEach(function(s) {
        s.classList.remove('selected');
      });
      el.classList.add('selected');
    });
  });

  // Submit
  document.getElementById('edit-submit').addEventListener('click', function() {
    var name = document.getElementById('edit-name').value.trim();
    if (!name) { toast('Le nom ne peut pas être vide'); return; }
    a.name = name;
    a.pilot = document.getElementById('edit-pilot').value;
    a.color = editColor;
    var missionText = document.getElementById('edit-mission').value.trim();
    if (AGENT_MISSIONS[a.id]) {
      AGENT_MISSIONS[a.id].brief = missionText;
    }
    closeModal();
    setState({});
    toast('Brief mis à jour');
  });

  // Cancel buttons
  document.querySelectorAll('[data-action="close-modal"]').forEach(function(el) {
    el.addEventListener('click', closeModal);
  });
}
