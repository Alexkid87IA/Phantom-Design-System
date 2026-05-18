// =====================================================
//  MODAL SHELL -- openModal / closeModal
// =====================================================

export function openModal(html) {
  var overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');
  overlay.innerHTML = '<div class="modal">' + html + '</div>';
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
  var closeBtn = overlay.querySelector('[data-action="close-modal"]');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

export function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}
