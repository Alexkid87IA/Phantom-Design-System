// =====================================================
//  COMPONENT -- Onboarding guided tour (first launch)
// =====================================================

var TOUR_STEPS = [
  {
    selector: '.agent-list',
    title: 'Tes agents IA',
    text: 'Chaque agent est spécialisé : social media, SEO, photos... Clique sur un agent pour discuter avec lui et suivre son travail.',
    position: 'right',
  },
  {
    selector: '.ms-inline-card',
    title: 'Résumé du matin',
    text: 'Chaque matin, tes agents te résument ce qu\'ils ont fait pendant la nuit. Un coup d\'oeil et tu sais tout.',
    position: 'left',
  },
  {
    selector: '[data-nav="inbox"]',
    title: 'Boîte de réception',
    text: 'Les livrables à valider avant publication. Rien ne part sans ton accord.',
    position: 'right',
  },
  {
    selector: '.search-trigger',
    title: 'Recherche rapide',
    text: 'Tape ⌘K à tout moment pour chercher un agent, une tâche ou une action.',
    position: 'bottom',
  },
  {
    selector: '[data-action="new-brief"]',
    title: 'Créer un agent',
    text: 'Choisis un template ou construis un agent sur-mesure. En quelques clics, ton nouvel agent se met au travail.',
    position: 'bottom',
  },
];

var currentStep = 0;

function getTargetRect(selector) {
  var el = document.querySelector(selector);
  if (!el) return null;
  return el.getBoundingClientRect();
}

function buildStepHTML(step, stepIndex, total) {
  return ''
    + '<div class="tour-overlay" id="tour-overlay">'
      + '<div class="tour-spotlight" id="tour-spotlight"></div>'
      + '<div class="tour-tooltip" id="tour-tooltip">'
        + '<div class="tour-step-count">' + (stepIndex + 1) + '/' + total + '</div>'
        + '<div class="tour-title">' + step.title + '</div>'
        + '<div class="tour-text">' + step.text + '</div>'
        + '<div class="tour-actions">'
          + (stepIndex > 0 ? '<button class="tour-btn-prev" id="tour-prev">&larr; Précédent</button>' : '<span></span>')
          + (stepIndex < total - 1
            ? '<button class="tour-btn-next" id="tour-next">Suivant &rarr;</button>'
            : '<button class="tour-btn-done" id="tour-done">C\'est compris !</button>')
        + '</div>'
      + '</div>'
    + '</div>';
}

function positionTooltip(step) {
  var rect = getTargetRect(step.selector);
  var spotlight = document.getElementById('tour-spotlight');
  var tooltip = document.getElementById('tour-tooltip');
  if (!rect || !spotlight || !tooltip) return;

  var pad = 8;
  spotlight.style.top = (rect.top - pad) + 'px';
  spotlight.style.left = (rect.left - pad) + 'px';
  spotlight.style.width = (rect.width + pad * 2) + 'px';
  spotlight.style.height = (rect.height + pad * 2) + 'px';

  var tw = tooltip.offsetWidth;
  var th = tooltip.offsetHeight;

  if (step.position === 'right') {
    tooltip.style.top = rect.top + 'px';
    tooltip.style.left = (rect.right + 16) + 'px';
  } else if (step.position === 'left') {
    tooltip.style.top = rect.top + 'px';
    tooltip.style.left = (rect.left - tw - 16) + 'px';
  } else if (step.position === 'bottom') {
    tooltip.style.top = (rect.bottom + 12) + 'px';
    tooltip.style.left = Math.max(16, rect.left + rect.width / 2 - tw / 2) + 'px';
  } else {
    tooltip.style.top = (rect.top - th - 12) + 'px';
    tooltip.style.left = Math.max(16, rect.left + rect.width / 2 - tw / 2) + 'px';
  }
}

function renderStep(stepIndex) {
  var existing = document.getElementById('tour-overlay');
  if (existing) existing.remove();

  var step = TOUR_STEPS[stepIndex];
  if (!step) { closeTour(); return; }

  if (!getTargetRect(step.selector)) {
    if (stepIndex < TOUR_STEPS.length - 1) {
      renderStep(stepIndex + 1);
    } else {
      closeTour();
    }
    return;
  }

  document.body.insertAdjacentHTML('beforeend', buildStepHTML(step, stepIndex, TOUR_STEPS.length));
  positionTooltip(step);

  var prevBtn = document.getElementById('tour-prev');
  var nextBtn = document.getElementById('tour-next');
  var doneBtn = document.getElementById('tour-done');

  if (prevBtn) prevBtn.addEventListener('click', function() { currentStep--; renderStep(currentStep); });
  if (nextBtn) nextBtn.addEventListener('click', function() { currentStep++; renderStep(currentStep); });
  if (doneBtn) doneBtn.addEventListener('click', closeTour);

  document.getElementById('tour-overlay').addEventListener('click', function(e) {
    if (e.target.id === 'tour-overlay') closeTour();
  });
}

function closeTour() {
  var overlay = document.getElementById('tour-overlay');
  if (overlay) {
    overlay.classList.add('tour-closing');
    setTimeout(function() { if (overlay.parentNode) overlay.remove(); }, 250);
  }
  localStorage.setItem('phantom_onboarded', '1');
  currentStep = 0;
}

export function showOnboardingTour() {
  if (localStorage.getItem('phantom_onboarded') === '1') return;
  currentStep = 0;
  renderStep(0);
}
