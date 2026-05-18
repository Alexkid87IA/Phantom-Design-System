// ═══════════════════════════════════════════════════════════
//  COUNT-UP — Animate numeric KPI values on first render
// ═══════════════════════════════════════════════════════════

export function initCountUp() {
  var elements = document.querySelectorAll('.admin-kpi-value');
  elements.forEach(function(el) {
    var text = el.textContent.trim();
    var match = text.match(/^([\d\s]+)/);
    if (!match) return;

    var raw = match[1].replace(/\s/g, '');
    var target = parseInt(raw, 10);
    if (isNaN(target) || target === 0) return;

    var suffix = text.replace(match[1], '');
    var duration = 600;
    var start = performance.now();

    el.textContent = '0' + suffix;

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = current.toLocaleString('fr-FR') + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  });
}
