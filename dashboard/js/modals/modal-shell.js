// =====================================================
//  MODAL SHELL -- openModal / closeModal
// =====================================================

var _overlayHandler = null;

export function openModal(html) {
  var overlay = document.getElementById('modal-overlay');
  if (_overlayHandler) overlay.removeEventListener('click', _overlayHandler);
  overlay.classList.remove('hidden');
  overlay.innerHTML = '<div class="modal">' + html + '</div>';
  _overlayHandler = function(e) {
    if (e.target === overlay) closeModal();
    if (e.target.closest('[data-action="close-modal"]')) closeModal();
  };
  overlay.addEventListener('click', _overlayHandler);
}

export function closeModal() {
  var overlay = document.getElementById('modal-overlay');
  if (_overlayHandler) { overlay.removeEventListener('click', _overlayHandler); _overlayHandler = null; }
  overlay.classList.add('hidden');
}
