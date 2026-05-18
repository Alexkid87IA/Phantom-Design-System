// ═══════════════════════════════════════════════════════════
//  ADMIN MODAL SHELL — overlay + container + close logic
// ═══════════════════════════════════════════════════════════

var overlay = null;

export function openModal(title, bodyHtml, footerHtml) {
  closeModal();

  overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.id = 'admin-modal-overlay';

  overlay.innerHTML = ''
    + '<div class="admin-modal-box">'
      + '<div class="admin-modal-header">'
        + '<div class="admin-modal-title">' + title + '</div>'
        + '<button class="admin-modal-close" data-modal-close>&times;</button>'
      + '</div>'
      + '<div class="admin-modal-body">'
        + bodyHtml
      + '</div>'
      + (footerHtml ? '<div class="admin-modal-footer">' + footerHtml + '</div>' : '')
    + '</div>';

  document.body.appendChild(overlay);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target.closest('[data-modal-close]')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', handleEsc);

  var firstInput = overlay.querySelector('input, select, textarea');
  if (firstInput) firstInput.focus();
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal();
}

export function closeModal() {
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
  document.removeEventListener('keydown', handleEsc);
}

export function getModalElement() {
  return overlay;
}
