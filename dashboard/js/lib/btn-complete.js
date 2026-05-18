// Button completion animation: idle → loading → done ✓

export function animateButton(btn, opts) {
  if (!btn || btn.classList.contains('btn-loading')) return;

  var originalText = btn.textContent;
  var loadingText = (opts && opts.loadingText) || originalText;
  var doneText = (opts && opts.doneText) || '✓';
  var duration = (opts && opts.duration) || 800;
  var onDone = (opts && opts.onDone) || null;

  btn.classList.add('btn-completable', 'btn-loading');
  btn.textContent = loadingText;

  setTimeout(function() {
    btn.classList.remove('btn-loading');
    btn.classList.add('btn-done');
    btn.textContent = doneText;

    setTimeout(function() {
      if (onDone) onDone();
    }, duration);
  }, 600);
}
