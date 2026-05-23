var _escEl = null;
export function esc(str) {
  if (!_escEl) _escEl = document.createElement('span');
  _escEl.textContent = str;
  return _escEl.innerHTML;
}
