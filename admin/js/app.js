// ═══════════════════════════════════════════════════════════
//  ADMIN APP — Entry point
// ═══════════════════════════════════════════════════════════

import { subscribe } from './store.js';
import { render } from './router.js';
import { initCountUp } from './lib/countup.js';

function safeRender() {
  try {
    render();
    requestAnimationFrame(initCountUp);
  } catch (e) {
    console.error('[Phantom Admin] Render failed:', e);
    var app = document.getElementById('app');
    if (app) app.innerHTML = '<div style="padding:40px;font-family:var(--admin-font-body,system-ui)">'
      + '<h2 style="color:var(--admin-red,#FF4D2E);margin:0 0 8px">Erreur de rendu</h2>'
      + '<p style="color:var(--admin-text-muted,#666);margin:0 0 16px">' + e.message + '</p>'
      + '<button type="button" onclick="location.reload()" style="padding:8px 16px;border-radius:var(--admin-radius,8px);border:1px solid var(--admin-border,#ddd);cursor:pointer">Recharger</button>'
      + '</div>';
  }
}

subscribe(safeRender);
safeRender();
