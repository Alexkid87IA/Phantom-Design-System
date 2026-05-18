// ═══════════════════════════════════════════════════════════
//  ADMIN TOAST
// ═══════════════════════════════════════════════════════════

export function toast(text) {
  var container = document.getElementById('toasts');
  if (!container) return;
  var el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  container.appendChild(el);
  setTimeout(function() {
    el.classList.add('toast-out');
    setTimeout(function() { el.remove(); }, 300);
  }, 2500);
}
