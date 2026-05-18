// =====================================================
//  VIEW -- Inbox
// =====================================================

import { getInboxItems } from '../data/inbox.js';
import { getAgent } from '../data/agents.js';
import { ghostSvg } from '../lib/icons.js';

export function renderInbox() {
  var items = getInboxItems();

  var listHtml = '';
  if (items.length === 0) {
    listHtml = '<div class="empty-state inbox-empty-celebrate">'
      + ghostSvg('var(--rainbow-green)', 48)
      + '<div class="empty-state-title">Tout est en ligne !</div>'
      + '<div class="empty-state-text">Tes agents publient, répondent et optimisent pendant que tu fais tourner ta boîte.</div>'
      + '<button class="inbox-empty-cta" data-nav="analytics">Voir les résultats &rarr;</button>'
    + '</div>';
  } else {
    listHtml = items.map(function(item) {
      var a = getAgent(item.agent);
      var color = a ? a.color : 'var(--ink-30)';
      return '<div class="inbox-item" data-inbox-preview="' + item.id + '">'
        + '<label class="inbox-checkbox-wrap" data-inbox-check="' + item.id + '">'
          + '<input type="checkbox" class="inbox-checkbox" />'
        + '</label>'
        + ghostSvg(color, 28)
        + '<div class="inbox-item-text">'
          + '<div class="inbox-item-title">' + item.title + '</div>'
          + '<div class="inbox-item-desc">' + item.desc + '</div>'
        + '</div>'
        + '<div class="inbox-item-time">' + item.time + '</div>'
        + '<span class="inbox-review-badge" style="border-color:' + color + '22;color:' + color + '">'
          + '<span class="inbox-review-dot" style="background:' + color + '"></span>'
          + 'Prêt'
        + '</span>'
        + '<svg class="inbox-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
      + '</div>';
    }).join('');
  }

  var batchBar = items.length > 1
    ? '<div class="inbox-batch">'
        + '<button class="inbox-batch-select" data-action="inbox-select-all">'
          + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
          + ' Tout sélectionner'
        + '</button>'
        + '<button class="inbox-batch-approve" data-action="inbox-approve-all">'
          + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
          + ' C\'est bon, envoie tout'
        + '</button>'
      + '</div>'
    : '';

  return ''
    + '<div class="inbox-view">'
      + '<div class="inbox-header">'
        + '<div>'
          + '<div class="inbox-title">' + items.length + ' livrable' + (items.length > 1 ? 's' : '') + ' prêt' + (items.length > 1 ? 's' : '') + '</div>'
          + '<div class="inbox-count">Tes agents ont produit — un clic et c\'est en ligne</div>'
        + '</div>'
      + '</div>'
      + batchBar
      + '<div class="inbox-list">'
        + listHtml
      + '</div>'
    + '</div>';
}
