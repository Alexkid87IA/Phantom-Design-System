// ═══════════════════════════════════════════════════════════
//  MODAL — Nouveau client (admin)
// ═══════════════════════════════════════════════════════════

import { openModal, closeModal, getModalElement } from './modal-shell.js';
import { CLIENTS } from '../data/clients.js';
import { toast } from '../lib/toast.js';
import { setState } from '../store.js';
import { esc } from '../lib/esc.js';

var SECTORS = ['Restauration', 'Coiffure', 'Bien-être', 'Boulangerie', 'Commerce', 'Photographie', 'Automobile', 'Hôtellerie', 'Santé', 'Services'];
var PLANS = ['Starter', 'Croissance', 'Standard'];
var PILOTS = ['Marie', 'Julie', 'Paul'];

function sectorOptions() {
  return SECTORS.map(function(s) {
    return '<option value="' + s + '">' + s + '</option>';
  }).join('');
}

function planOptions() {
  return PLANS.map(function(p) {
    return '<option value="' + p + '">' + p + '</option>';
  }).join('');
}

function pilotOptions() {
  return PILOTS.map(function(p) {
    return '<option value="' + p + '">' + p + '</option>';
  }).join('');
}

export function openNewClientModal() {
  var body = ''
    + '<div class="admin-form-row">'
      + '<div class="admin-form-group">'
        + '<label class="admin-form-label">Nom de l\'entreprise</label>'
        + '<input type="text" class="admin-form-input" id="nc-name" placeholder="Mon Restaurant">'
      + '</div>'
      + '<div class="admin-form-group">'
        + '<label class="admin-form-label">Secteur</label>'
        + '<select class="admin-form-select" id="nc-sector"><option value="">Choisir...</option>' + sectorOptions() + '</select>'
      + '</div>'
    + '</div>'

    + '<div class="admin-form-row">'
      + '<div class="admin-form-group">'
        + '<label class="admin-form-label">Ville</label>'
        + '<input type="text" class="admin-form-input" id="nc-city" placeholder="Marseille">'
      + '</div>'
      + '<div class="admin-form-group">'
        + '<label class="admin-form-label">Plan</label>'
        + '<select class="admin-form-select" id="nc-plan"><option value="">Choisir...</option>' + planOptions() + '</select>'
      + '</div>'
    + '</div>'

    + '<div class="admin-form-row">'
      + '<div class="admin-form-group">'
        + '<label class="admin-form-label">Contact principal</label>'
        + '<input type="text" class="admin-form-input" id="nc-owner" placeholder="Prénom Nom">'
      + '</div>'
      + '<div class="admin-form-group">'
        + '<label class="admin-form-label">Email</label>'
        + '<input type="email" class="admin-form-input" id="nc-email" placeholder="email@exemple.fr">'
      + '</div>'
    + '</div>'

    + '<div class="admin-form-group">'
      + '<label class="admin-form-label">Pilot assigné</label>'
      + '<select class="admin-form-select" id="nc-pilot"><option value="">Choisir...</option>' + pilotOptions() + '</select>'
    + '</div>'

    + '<div class="admin-form-group">'
      + '<label class="admin-form-label">Notes d\'onboarding</label>'
      + '<textarea class="admin-form-textarea" id="nc-notes" placeholder="Contexte, besoins particuliers, objectifs..."></textarea>'
    + '</div>';

  var footer = ''
    + '<button class="admin-modal-btn admin-modal-btn-ghost" type="button" data-modal-close>Annuler</button>'
    + '<button class="admin-modal-btn admin-modal-btn-primary" type="button" id="nc-submit">Créer le client</button>';

  openModal('Nouveau client', body, footer);

  var el = getModalElement();
  if (!el) return;

  var submitBtn = el.querySelector('#nc-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      var name = el.querySelector('#nc-name').value.trim();
      var sector = el.querySelector('#nc-sector').value;
      var city = el.querySelector('#nc-city').value.trim();
      var plan = el.querySelector('#nc-plan').value;
      var owner = el.querySelector('#nc-owner').value.trim();
      var email = el.querySelector('#nc-email').value.trim();
      var pilot = el.querySelector('#nc-pilot').value;

      if (!name) { toast('Le nom est obligatoire'); return; }
      if (!sector) { toast('Choisis un secteur'); return; }
      if (!plan) { toast('Choisis un plan'); return; }
      if (!pilot) { toast('Assigne un pilot'); return; }

      var planMrr = { 'Starter': 490, 'Croissance': 890, 'Standard': 1490 };
      var newId = 'c' + (CLIENTS.length + 1);
      var today = new Date().toISOString().split('T')[0];

      CLIENTS.push({
        id: newId,
        name: name,
        sector: sector,
        city: city || '—',
        plan: plan,
        mrr: planMrr[plan] || 490,
        status: 'trial',
        agents: 0,
        lastLogin: today,
        health: 'green',
        since: today,
        owner: owner || '—',
        email: email || '—',
        pilot: pilot,
      });

      closeModal();
      toast('Client "' + esc(name) + '" créé !');
      setState({ view: 'clients', selectedClient: newId });
    });
  }
}
