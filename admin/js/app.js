// ═══════════════════════════════════════════════════════════
//  ADMIN APP — Entry point
// ═══════════════════════════════════════════════════════════

import { subscribe } from './store.js';
import { render } from './router.js';
import { initCountUp } from './lib/countup.js';

subscribe(function() {
  render();
  requestAnimationFrame(initCountUp);
});
render();
requestAnimationFrame(initCountUp);
