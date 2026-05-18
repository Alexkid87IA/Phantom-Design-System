// ═══════════════════════════════════════════════════════════
//  COUNT-UP — Animate numeric values on page enter
// ═══════════════════════════════════════════════════════════

export function initCountUp() {
  var elements = document.querySelectorAll('[data-countup]');
  elements.forEach(function(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';

    var target = parseInt(el.dataset.countup, 10);
    if (isNaN(target) || target === 0) return;

    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 500;
    var start = performance.now();

    el.textContent = prefix + '0' + suffix;

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  });
}
