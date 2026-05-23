// ═══════════════════════════════════════════════════════════
//  TOAST — Notification toasts
// ═══════════════════════════════════════════════════════════

export function toast(text) {
  var el = document.createElement('div');
  el.className = 'toast toast-success';
  el.textContent = text;
  var container = document.getElementById('toasts');
  if (!container) return;
  container.appendChild(el);
  setTimeout(function () { el.classList.add('toast-out'); }, 2500);
  setTimeout(function () { el.remove(); }, 2800);
}

export function celebrate() {
  var container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  var colors = ['#6E3CFF', '#FF2D87', '#FFD400', '#00D26A', '#0066FF'];
  for (var i = 0; i < 30; i++) {
    var particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.left = (Math.random() * 100) + '%';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDelay = (Math.random() * 0.3) + 's';
    particle.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
    container.appendChild(particle);
  }

  setTimeout(function() { container.remove(); }, 2000);
}
