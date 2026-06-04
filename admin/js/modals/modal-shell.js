// ═══════════════════════════════════════════════════════════
//  ADMIN MODAL SHELL — overlay + container + close logic
// ═══════════════════════════════════════════════════════════

import { esc } from '../lib/esc.js';

var overlay = null;
var _clickHandler = null;

export function openModal(title, bodyHtml, footerHtml) {
  closeModal();

  overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.id = 'admin-modal-overlay';

  overlay.innerHTML = ''
    + '<div class="admin-modal-box">'
      + '<div class="admin-modal-header">'
        + '<div class="admin-modal-title">' + esc(title) + '</div>'
        + '<button class="admin-modal-close" data-modal-close aria-label="Fermer">&times;</button>'
      + '</div>'
      + '<div class="admin-modal-body">'
        + bodyHtml
      + '</div>'
      + (footerHtml ? '<div class="admin-modal-footer">' + footerHtml + '</div>' : '')
    + '</div>';

  document.body.appendChild(overlay);

  _clickHandler = function(e) {
    if (e.target === overlay || e.target.closest('[data-modal-close]')) {
      closeModal();
    }
  };
  overlay.addEventListener('click', _clickHandler);
  document.addEventListener('keydown', handleEsc);

  var firstInput = overlay.querySelector('input, select, textarea');
  if (firstInput) firstInput.focus();
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal();
}

export function closeModal() {
  if (overlay) {
    if (_clickHandler) { overlay.removeEventListener('click', _clickHandler); _clickHandler = null; }
    overlay.remove();
    overlay = null;
  }
  document.removeEventListener('keydown', handleEsc);
}

export function getModalElement() {
  return overlay;
}
