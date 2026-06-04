// =====================================================
//  MODAL -- New Agent Brief (Wizard 4 steps)
// =====================================================

import { getState, setState } from '../store.js';
import { POLES, PILOTS, RAINBOW_COLORS } from '../data/workspace.js';
import { AGENT_MISSIONS, AGENT_RESPONSES, AGENT_CHIPS, addAgent } from '../data/agents.js';
import { initConversation } from '../data/conversations.js';
import { openModal, closeModal } from './modal-shell.js';
import { ghostSvg } from '../lib/icons.js';
import { toast } from '../lib/toast.js';
import { escapeHtml } from '../lib/helpers.js';
import { AGENT_TEMPLATES, getTemplatesForPole, getQcmForPole } from '../data/agent-templates.js';

// Pole icons (simple SVGs)
var POLE_ICONS = {
  'Visibilite': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
  'Contenu': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  'Web': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  'Admin & Gestion': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  'Commercial': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  'Marque': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
};

function getPoleIcon(pole) {
  var key = pole.replace(/[eéèê]/g, 'e').replace(/[aà]/g, 'a');
  return POLE_ICONS[key] || POLE_ICONS[pole] || '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/></svg>';
}

// Normalize pole names for lookup (strip accents)
function normalizePole(pole) {
  return pole.replace(/[eéèê]/g, 'e').replace(/[aà]/g, 'a');
}

export function openBriefModal() {
  var step = 1;
  var selectedPole = null;
  var selectedTemplate = null;
  var isCustom = false;
  var qcmAnswers = {};
  var formData = { name: '', mission: '', pilot: PILOTS[0] };
  var STATE = getState();

  var GHOST_MINI = '<div class="wiz-phantom-avatar">' + ghostSvg('#6E3CFF', 18) + '</div>';

  function convoHTML() {
    var html = '';
    var exchanges = [];

    if (step >= 2 && selectedPole) {
      exchanges.push({
        q: 'C\'est quoi le domaine de ton agent ?',
        a: selectedPole
      });
    }
    if (step >= 3 && (selectedTemplate || isCustom)) {
      exchanges.push({
        q: 'Quel modèle ?',
        a: isCustom ? 'Agent sur-mesure' : selectedTemplate.name
      });
    }
    if (step >= 4 && formData.name) {
      exchanges.push({
        q: 'Comment il s\'appelle ?',
        a: formData.name
      });
    }

    if (exchanges.length === 0) return '';

    html += '<div class="wiz-history">';
    exchanges.forEach(function(ex) {
      html += '<div class="wiz-phantom">' + GHOST_MINI
        + '<div class="wiz-phantom-text">' + ex.q + '</div></div>'
        + '<div class="wiz-reply"><div class="wiz-reply-chip">' + escapeHtml(ex.a) + '</div></div>';
    });
    html += '</div>';
    return html;
  }

  function phantomSays(text) {
    return '<div class="wiz-phantom">' + GHOST_MINI
      + '<div class="wiz-phantom-text wiz-current">' + text + '</div></div>';
  }

  // ── Step 1: Choose a pole ──
  function renderStep1() {
    var body = phantomSays('Salut ! C\'est quoi le domaine de ton futur agent ?')
      + '<div class="wizard-poles" style="margin-top:14px">';

    POLES.forEach(function(pole) {
      var sel = (selectedPole === pole) ? ' selected' : '';
      body += '<div class="wizard-pole' + sel + '" data-pole="' + pole + '" tabindex="0" role="button" aria-pressed="' + (selectedPole === pole ? 'true' : 'false') + '">'
        + '<div class="wizard-pole-icon">' + getPoleIcon(pole) + '</div>'
        + '<div>' + pole + '</div>'
      + '</div>';
    });

    body += '</div>';

    var footer = '<div class="wizard-footer">'
      + '<button class="btn-outline" data-action="close-modal">Annuler</button>'
      + '<button class="btn-primary' + (selectedPole ? '' : ' disabled') + '" id="wizard-next-1"' + (selectedPole ? '' : ' disabled') + '>Suivant &#8594;</button>'
    + '</div>';

    updateModalContent(body, footer);

    // Bind pole clicks
    document.querySelectorAll('.wizard-pole').forEach(function(el) {
      enableKeyboardClick(el);
      el.addEventListener('click', function() {
        selectedPole = el.dataset.pole;
        document.querySelectorAll('.wizard-pole').forEach(function(p) {
          p.classList.remove('selected');
          p.setAttribute('aria-pressed', 'false');
        });
        el.classList.add('selected');
        el.setAttribute('aria-pressed', 'true');
        var nextBtn = document.getElementById('wizard-next-1');
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.classList.remove('disabled');
        }
      });
    });

    // Bind next
    var nextBtn = document.getElementById('wizard-next-1');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (!selectedPole) return;
        step = 2;
        selectedTemplate = null;
        isCustom = false;
        renderStep2();
      });
    }

    bindCloseButtons();
  }

  // ── Step 2: Choose a template ──
  function renderStep2() {
    var templates = getTemplatesForPole(selectedPole);

    var body = convoHTML()
      + phantomSays('J\'ai des modèles prêts pour <strong>' + escapeHtml(selectedPole) + '</strong>. Lequel te correspond ?')
      + '<div class="template-grid" style="margin-top:14px">';

    templates.forEach(function(tpl) {
      var sel = (selectedTemplate && selectedTemplate.id === tpl.id) ? ' selected' : '';
      body += '<div class="template-card' + sel + '" data-tpl-id="' + tpl.id + '" tabindex="0" role="button" aria-pressed="' + (selectedTemplate && selectedTemplate.id === tpl.id ? 'true' : 'false') + '">'
        + '<div class="template-card-icon">' + tpl.icon + '</div>'
        + '<div class="template-card-info">'
          + '<div class="template-card-name">' + escapeHtml(tpl.name) + '</div>'
          + '<div class="template-card-desc">' + escapeHtml(tpl.description) + '</div>'
        + '</div>'
      + '</div>';
    });

    // Custom agent card
    var customSel = isCustom ? ' selected' : '';
    body += '<div class="template-card template-card-custom' + customSel + '" data-tpl-id="custom" tabindex="0" role="button" aria-pressed="' + (isCustom ? 'true' : 'false') + '">'
      + '<div class="template-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></div>'
      + '<div class="template-card-info">'
        + '<div class="template-card-name">Agent sur-mesure &#10022;</div>'
        + '<div class="template-card-desc">Crée un agent entièrement personnalisé depuis zéro</div>'
      + '</div>'
    + '</div>';

    body += '</div>';

    // Deliverable preview (appears when template selected)
    body += '<div class="tpl-preview hidden" id="tpl-preview"></div>';

    var canProceed = selectedTemplate || isCustom;
    var footer = '<div class="wizard-footer-between">'
      + '<button class="btn-outline" id="wizard-back-2">&#8592; Retour</button>'
      + '<button class="btn-primary' + (canProceed ? '' : ' disabled') + '" id="wizard-next-2"' + (canProceed ? '' : ' disabled') + '>Suivant &#8594;</button>'
    + '</div>';

    updateModalContent(body, footer);

    // Show deliverable preview for selected template
    function showDeliverablePreview(tpl) {
      var previewEl = document.getElementById('tpl-preview');
      if (!previewEl) return;
      if (!tpl || !tpl.firstDeliverable) {
        previewEl.classList.add('hidden');
        return;
      }
      var d = tpl.firstDeliverable;
      var items = (d.items || []).slice(0, 3).map(function(it) {
        return '<div class="tpl-preview-item"><span class="tpl-preview-bullet">&#10022;</span><span>' + escapeHtml(it) + '</span></div>';
      }).join('');
      var moreCount = (d.items || []).length - 3;
      var moreLabel = moreCount > 0 ? '<div class="tpl-preview-more">+ ' + moreCount + ' autres éléments</div>' : '';
      previewEl.innerHTML = ''
        + '<div class="tpl-preview-label">Premier livrable — dès le lancement</div>'
        + '<div class="tpl-preview-title">' + escapeHtml(d.title) + '</div>'
        + items + moreLabel;
      previewEl.classList.remove('hidden');
    }

    if (selectedTemplate) showDeliverablePreview(selectedTemplate);

    // Bind template clicks
    document.querySelectorAll('.template-card').forEach(function(el) {
      enableKeyboardClick(el);
      el.addEventListener('click', function() {
        var tplId = el.dataset.tplId;
        document.querySelectorAll('.template-card').forEach(function(c) {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed', 'false');
        });
        el.classList.add('selected');
        el.setAttribute('aria-pressed', 'true');

        if (tplId === 'custom') {
          selectedTemplate = null;
          isCustom = true;
          formData.name = '';
          formData.mission = '';
          showDeliverablePreview(null);
        } else {
          isCustom = false;
          selectedTemplate = AGENT_TEMPLATES.find(function(t) { return t.id === tplId; });
          if (selectedTemplate) {
            formData.name = selectedTemplate.name;
            formData.mission = selectedTemplate.brief;
            setState({ selectedColor: selectedTemplate.color });
            showDeliverablePreview(selectedTemplate);
          }
        }

        var nextBtn = document.getElementById('wizard-next-2');
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.classList.remove('disabled');
        }
      });
    });

    // Back
    document.getElementById('wizard-back-2').addEventListener('click', function() {
      step = 1;
      renderStep1();
    });

    // Next
    document.getElementById('wizard-next-2').addEventListener('click', function() {
      if (!selectedTemplate && !isCustom) return;
      step = 3;
      renderStep3();
    });
  }

  // ── Step 3: QCM + Configuration ──
  function renderStep3() {
    var currentState = getState();
    var qcmItems = getQcmForPole(selectedPole);

    var configLabel = isCustom
      ? 'Dis-moi tout. Comment s\'appelle ton agent et qu\'est-ce qu\'il doit faire ?'
      : 'Parfait ! Quelques détails pour configurer <strong>' + escapeHtml(selectedTemplate ? selectedTemplate.name : '') + '</strong>.';

    var body = convoHTML()
      + phantomSays(configLabel);

    // QCM sections
    if (qcmItems.length > 0) {
      body += '<div class="qcm-sections" style="margin-top:14px">';
      qcmItems.forEach(function(q) {
        body += '<div class="qcm-section">';
        body += '<div class="qcm-label">' + escapeHtml(q.label) + '</div>';

        if (q.type === 'checkbox') {
          body += '<div class="qcm-checkboxes">';
          q.options.forEach(function(opt) {
            var checked = qcmAnswers[q.id] && qcmAnswers[q.id].indexOf(opt) !== -1;
            body += '<button class="qcm-checkbox' + (checked ? ' active' : '') + '" data-qcm-id="' + q.id + '" data-value="' + escapeAttr(opt) + '">' + escapeHtml(opt) + '</button>';
          });
          body += '</div>';
        } else if (q.type === 'radio') {
          body += '<div class="qcm-radios">';
          q.options.forEach(function(opt) {
            var selected = qcmAnswers[q.id] === opt;
            body += '<button class="qcm-radio' + (selected ? ' active' : '') + '" data-qcm-id="' + q.id + '" data-value="' + escapeAttr(opt) + '">' + escapeHtml(opt) + '</button>';
          });
          body += '</div>';
        } else if (q.type === 'select') {
          body += '<select class="form-select qcm-select" data-qcm-id="' + q.id + '">';
          body += '<option value="">-- Choisir --</option>';
          q.options.forEach(function(opt) {
            var selected = qcmAnswers[q.id] === opt;
            body += '<option value="' + escapeAttr(opt) + '"' + (selected ? ' selected' : '') + '>' + escapeHtml(opt) + '</option>';
          });
          body += '</select>';
        } else if (q.type === 'text') {
          body += '<div class="qcm-inputs">';
          var count = q.count || 1;
          for (var i = 0; i < count; i++) {
            var val = (qcmAnswers[q.id] && qcmAnswers[q.id][i]) ? qcmAnswers[q.id][i] : '';
            body += '<input type="text" class="form-input qcm-text-input" data-qcm-id="' + q.id + '" data-index="' + i + '" placeholder="' + escapeAttr(q.placeholder || '') + '" value="' + escapeAttr(val) + '" />';
          }
          body += '</div>';
        }

        body += '</div>';
      });
      body += '</div>';

      body += '<div class="wizard-divider"></div>';
    }

    // Fixed fields: name, pilot, color
    if (qcmItems.length === 0) body += '<div style="margin-top:14px"></div>';
    body += '<div class="form-group">'
      + '<label class="form-label">Nom de l\'agent</label>'
      + '<input type="text" class="form-input" id="wizard-name" placeholder="Community Manager, Webmaster..." value="' + escapeAttr(formData.name) + '" />'
    + '</div>';

    body += '<div class="form-group">'
      + '<label class="form-label">Pilote</label>'
      + '<select class="form-select" id="wizard-pilot">'
        + PILOTS.map(function(p) {
            var sel = (formData.pilot === p) ? ' selected' : '';
            return '<option value="' + p + '"' + sel + '>' + p + '</option>';
          }).join('')
      + '</select>'
    + '</div>';

    body += '<div class="form-group">'
      + '<label class="form-label">Couleur</label>'
      + '<div class="color-picker" id="wizard-colors">'
        + RAINBOW_COLORS.map(function(c) {
            return '<div class="color-swatch ' + (currentState.selectedColor === c ? 'selected' : '') + '" style="background:' + c + '" data-color="' + c + '" tabindex="0" role="button" aria-label="Choisir cette couleur" aria-pressed="' + (currentState.selectedColor === c ? 'true' : 'false') + '"></div>';
          }).join('')
      + '</div>'
    + '</div>';

    var footer = '<div class="wizard-footer-between">'
      + '<button class="btn-outline" id="wizard-back-3">&#8592; Retour</button>'
      + '<button class="btn-primary" id="wizard-next-3">Suivant &#8594;</button>'
    + '</div>';

    updateModalContent(body, footer);

    // Bind QCM checkboxes
    document.querySelectorAll('.qcm-checkbox').forEach(function(el) {
      el.addEventListener('click', function() {
        var qId = el.dataset.qcmId;
        var val = el.dataset.value;
        if (!qcmAnswers[qId]) qcmAnswers[qId] = [];
        var idx = qcmAnswers[qId].indexOf(val);
        if (idx === -1) {
          qcmAnswers[qId].push(val);
          el.classList.add('active');
        } else {
          qcmAnswers[qId].splice(idx, 1);
          el.classList.remove('active');
        }
      });
    });

    // Bind QCM radios
    document.querySelectorAll('.qcm-radio').forEach(function(el) {
      el.addEventListener('click', function() {
        var qId = el.dataset.qcmId;
        var val = el.dataset.value;
        qcmAnswers[qId] = val;
        // Deselect siblings
        document.querySelectorAll('.qcm-radio[data-qcm-id="' + qId + '"]').forEach(function(r) {
          r.classList.remove('active');
        });
        el.classList.add('active');
      });
    });

    // Bind QCM selects
    document.querySelectorAll('.qcm-select').forEach(function(el) {
      el.addEventListener('change', function() {
        qcmAnswers[el.dataset.qcmId] = el.value;
      });
    });

    // Bind QCM text inputs
    document.querySelectorAll('.qcm-text-input').forEach(function(el) {
      el.addEventListener('input', function() {
        var qId = el.dataset.qcmId;
        var idx = parseInt(el.dataset.index, 10);
        if (!qcmAnswers[qId]) qcmAnswers[qId] = [];
        qcmAnswers[qId][idx] = el.value.trim();
      });
    });

    // Color picker
    document.querySelectorAll('#wizard-colors .color-swatch').forEach(function(el) {
      enableKeyboardClick(el);
      el.addEventListener('click', function() {
        setState({ selectedColor: el.dataset.color });
        document.querySelectorAll('#wizard-colors .color-swatch').forEach(function(s) {
          s.classList.remove('selected');
          s.setAttribute('aria-pressed', 'false');
        });
        el.classList.add('selected');
        el.setAttribute('aria-pressed', 'true');
      });
    });

    // Back
    document.getElementById('wizard-back-3').addEventListener('click', function() {
      saveFormFields();
      step = 2;
      renderStep2();
    });

    // Next
    document.getElementById('wizard-next-3').addEventListener('click', function() {
      saveFormFields();
      var name = formData.name;
      if (!name) { toast('Donne un nom à ton agent'); return; }
      // Generate brief from QCM answers
      formData.mission = generateBrief(selectedPole, qcmAnswers, selectedTemplate);
      step = 4;
      renderStep4();
    });
  }

  // ── Step 4: Summary + Deploy ──
  function renderStep4() {
    var currentState = getState();
    var color = currentState.selectedColor;

    var body = convoHTML()
      + phantomSays('Il te reste une signature. Signe le brief — demain à cette heure, ton agent aura déjà commencé.')
      + '<div class="wizard-deploy" style="margin-top:8px">'
        + '<div class="wizard-deploy-ghost">' + ghostSvg(color, 64) + '</div>'
        + '<div class="wizard-deploy-name">' + escapeHtml(formData.name) + '</div>'
        + '<div class="wizard-deploy-meta">'
          + escapeHtml(selectedPole) + ' &middot; '
          + (isCustom ? 'Sur-mesure' : escapeHtml(selectedTemplate ? selectedTemplate.name : ''))
          + ' &middot; Pilote : ' + escapeHtml(formData.pilot)
        + '</div>'
      + '</div>';

    // QCM summary chips
    var summaryChips = buildSummaryChips();
    if (summaryChips.length > 0) {
      body += '<div class="wizard-summary-chips">';
      summaryChips.forEach(function(chip) {
        body += '<span class="wizard-summary-chip">' + escapeHtml(chip) + '</span>';
      });
      body += '</div>';
    }

    // Editable brief
    body += '<div class="form-group">'
      + '<div style="display:flex;justify-content:space-between;align-items:center">'
        + '<label class="form-label">Brief généré (éditable)</label>'
        + '<span id="brief-save-status" class="brief-save-indicator">✓ Capturé</span>'
      + '</div>'
      + '<textarea class="form-textarea brief-preview" id="wizard-brief" rows="5">' + escapeHtml(formData.mission) + '</textarea>'
    + '</div>';

    var footer = '<div class="wizard-footer-between">'
      + '<button class="btn-outline" id="wizard-back-4">&#8592; Retour</button>'
      + '<button class="btn-primary" id="wizard-deploy">Lancer l\'agent &#10022;</button>'
    + '</div>';

    updateModalContent(body, footer);

    // Autosave indicator on brief edit
    var briefTextarea = document.getElementById('wizard-brief');
    var saveStatus = document.getElementById('brief-save-status');
    if (briefTextarea && saveStatus) {
      saveStatus.style.opacity = '0';
      briefTextarea.addEventListener('input', function() {
        formData.mission = briefTextarea.value;
        saveStatus.style.opacity = '1';
        clearTimeout(briefTextarea._saveTimer);
        briefTextarea._saveTimer = setTimeout(function() {
          saveStatus.style.opacity = '0';
        }, 2000);
      });
    }

    // Back
    document.getElementById('wizard-back-4').addEventListener('click', function() {
      // Save any edits to the brief
      var briefEl = document.getElementById('wizard-brief');
      if (briefEl) formData.mission = briefEl.value;
      step = 3;
      renderStep3();
    });

    // Deploy
    document.getElementById('wizard-deploy').addEventListener('click', function() {
      // Grab final brief (may have been edited)
      var briefEl = document.getElementById('wizard-brief');
      if (briefEl) formData.mission = briefEl.value;

      var name = formData.name;
      var mission = formData.mission;
      var pilot = formData.pilot;
      var pole = selectedPole;
      var currentSt = getState();
      var id = name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20) + '_' + Date.now();

      addAgent({
        id: id,
        name: name,
        color: currentSt.selectedColor,
        status: 'active',
        tasks: 0,
        pilot: pilot,
      });

      AGENT_MISSIONS[id] = {
        brief: mission || ('Agent ' + name + ' -- ' + pole),
        since: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
        completed: 0,
        successRate: 0,
      };

      // Use template responses/chips if available, otherwise defaults
      var agentResponses;
      var agentChips;
      if (selectedTemplate) {
        agentResponses = selectedTemplate.responses.slice();
        agentChips = selectedTemplate.chips.slice();
      } else {
        agentResponses = [
          'Compris. Je me lance tout de suite.',
          'Bien reçu. Je prépare ça et je te tiens au courant.',
          'OK, je m\'en occupe. Tu auras un premier retour dans l\'heure.',
        ];
        agentChips = ['Commence maintenant', 'Montre-moi un plan', 'Attends mon signal', 'Plus de details'];
      }

      var initMessages = [
        { from: 'agent', text: 'Salut ! Je suis ' + name + '. J\'ai lu ton brief — voici ce que j\'ai préparé pour commencer.' },
      ];

      if (selectedTemplate && selectedTemplate.firstDeliverable) {
        var d = selectedTemplate.firstDeliverable;
        initMessages.push({
          from: 'agent',
          type: 'deliverable',
          title: d.title,
          items: d.items,
          footer: d.footer,
        });
      } else {
        initMessages[0].text = 'Salut ! Je suis ' + name + ', ton nouvel agent ' + pole + '. Mon brief est clair, je suis prêt à travailler. Dis-moi par où commencer.';
      }

      initConversation(id, initMessages);

      AGENT_RESPONSES[id] = agentResponses;
      AGENT_CHIPS[id] = agentChips;

      closeModal();
      setState({ activeAgent: id, agentTab: 'chat' });
      toast('✦ ' + name + ' reçoit ses ordres. Il commence maintenant.');
    });
  }

  // ── Brief generator ──
  function generateBrief(pole, answers, template) {
    var parts = [];

    // Start from template brief if available
    if (template && template.brief) {
      parts.push(template.brief);
    }

    // Append QCM details
    var normalizedPole = normalizePole(pole);

    if (normalizedPole === 'Visibilite') {
      if (answers.networks && answers.networks.length > 0) {
        parts.push('Réseaux cibles : ' + answers.networks.join(', ') + '.');
      }
      if (answers.frequency) {
        parts.push('Fréquence de publication : ' + answers.frequency + '.');
      }
      if (answers.content_types && answers.content_types.length > 0) {
        parts.push('Types de contenu : ' + answers.content_types.join(', ') + '.');
      }
      if (answers.tone) {
        parts.push('Ton de voix : ' + answers.tone + '.');
      }
    } else if (normalizedPole === 'Contenu') {
      if (answers.content_type && answers.content_type.length > 0) {
        parts.push('Types de contenu à produire : ' + answers.content_type.join(', ') + '.');
      }
      if (answers.article_length) {
        parts.push('Longueur visée : ' + answers.article_length + '.');
      }
      if (answers.priority_topics) {
        var topics = answers.priority_topics.filter(function(t) { return t && t.length > 0; });
        if (topics.length > 0) {
          parts.push('Sujets prioritaires : ' + topics.join(', ') + '.');
        }
      }
      if (answers.tone) {
        parts.push('Ton de voix : ' + answers.tone + '.');
      }
    } else if (normalizedPole === 'Web') {
      if (answers.cms) {
        parts.push('CMS utilisé : ' + answers.cms + '.');
      }
      if (answers.objective) {
        parts.push('Objectif principal : ' + answers.objective + '.');
      }
      if (answers.update_frequency) {
        parts.push('Fréquence de mise à jour : ' + answers.update_frequency + '.');
      }
    } else if (normalizedPole === 'Admin & Gestion') {
      if (answers.tasks && answers.tasks.length > 0) {
        parts.push('Tâches principales : ' + answers.tasks.join(', ') + '.');
      }
      if (answers.tools && answers.tools.length > 0) {
        parts.push('Outils actuels : ' + answers.tools.join(', ') + '.');
      }
    } else if (normalizedPole === 'Commercial') {
      if (answers.channels && answers.channels.length > 0) {
        parts.push('Canaux de prospection : ' + answers.channels.join(', ') + '.');
      }
      if (answers.volume) {
        parts.push('Volume mensuel visé : ' + answers.volume + '.');
      }
      if (answers.goal) {
        parts.push('Objectif : ' + answers.goal + '.');
      }
    } else if (normalizedPole === 'Marque') {
      if (answers.visual_needs && answers.visual_needs.length > 0) {
        parts.push('Besoins visuels : ' + answers.visual_needs.join(', ') + '.');
      }
      if (answers.visual_style) {
        parts.push('Style visuel : ' + answers.visual_style + '.');
      }
    }

    if (parts.length === 0) {
      return 'Agent ' + (formData.name || 'personnalisé') + ' pour le pôle ' + pole + '.';
    }

    return parts.join(' ');
  }

  // ── Summary chips for step 4 ──
  function buildSummaryChips() {
    var chips = [];
    var qcmItems = getQcmForPole(selectedPole);
    qcmItems.forEach(function(q) {
      var val = qcmAnswers[q.id];
      if (!val) return;
      if (q.type === 'checkbox' && Array.isArray(val) && val.length > 0) {
        val.forEach(function(v) { chips.push(v); });
      } else if (q.type === 'radio' && typeof val === 'string' && val.length > 0) {
        chips.push(val);
      } else if (q.type === 'select' && typeof val === 'string' && val.length > 0) {
        chips.push(val);
      } else if (q.type === 'text' && Array.isArray(val)) {
        val.forEach(function(v) { if (v && v.length > 0) chips.push(v); });
      }
    });
    return chips;
  }

  // ── Helpers ──

  function saveFormFields() {
    var nameEl = document.getElementById('wizard-name');
    var pilotEl = document.getElementById('wizard-pilot');
    if (nameEl) formData.name = nameEl.value.trim();
    if (pilotEl) formData.pilot = pilotEl.value;
  }

  function updateModalContent(bodyHTML, footerHTML) {
    var modal = document.querySelector('.modal');
    if (!modal) return;
    var bodyEl = modal.querySelector('.modal-body');
    var footerEl = modal.querySelector('.modal-footer');
    if (bodyEl) bodyEl.innerHTML = bodyHTML;
    if (footerEl) footerEl.innerHTML = footerHTML;
  }

  function bindCloseButtons() {
    document.querySelectorAll('[data-action="close-modal"]').forEach(function(el) {
      el.addEventListener('click', closeModal);
    });
  }

  function enableKeyboardClick(el) {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        el.click();
      }
    });
  }

  function escapeAttr(str) {
    return escapeHtml(str || '');
  }

  // ── Open the modal shell once ──
  openModal(
    '<div class="modal-header">'
      + '<span class="modal-title">Nouveau brief agent</span>'
      + '<button class="modal-close" data-action="close-modal" aria-label="Fermer">&times;</button>'
    + '</div>'
    + '<div class="modal-body"></div>'
    + '<div class="modal-footer"></div>'
  );

  // Render step 1 inside the already-opened modal
  renderStep1();
}
