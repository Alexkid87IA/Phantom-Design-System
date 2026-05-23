// =====================================================
//  VIEW -- Inbox
// =====================================================

import { getInboxItems } from '../data/inbox.js';
import { getAgent } from '../data/agents.js';
import { WORK_ITEMS } from '../data/work.js';
import { ghostSvg } from '../lib/icons.js';

export function renderInbox() {
  var items = getInboxItems();

  var listHtml = '';
  if (items.length === 0) {
    var published = WORK_ITEMS.filter(function(w) { return w.status === 'Publie' || w.status === 'Envoye'; });
    var posts = published.filter(function(w) { return w.agent === 'social'; }).length;
    var articles = published.filter(function(w) { return w.agent === 'seo'; }).length;
    var avis = published.filter(function(w) { return w.agent === 'google'; }).length;

    var total = posts + articles + avis;
    listHtml = '<div class="empty-state inbox-empty-celebrate">'
      + '<div class="inbox-celebrate-icon">'
        + '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--rainbow-green)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
          + '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
        + '</svg>'
      + '</div>'
      + '<div class="empty-state-title">Victoire — tout est en ligne.</div>'
      + '<div class="empty-state-text">Tes agents ont produit, tu as validé, c\'est publié.<br>Tes concurrents font encore ça à la main.</div>'
      + '<div class="inbox-celebrate-total">'
        + '<span class="inbox-celebrate-num">' + total + '</span>'
        + '<span class="inbox-celebrate-label">contenus publiés ce mois</span>'
      + '</div>'
      + '<div class="inbox-impact-grid">'
        + '<div class="inbox-impact-stat"><span class="inbox-impact-value">' + posts + '</span><span class="inbox-impact-label">posts publiés</span></div>'
        + '<div class="inbox-impact-stat"><span class="inbox-impact-value">' + articles + '</span><span class="inbox-impact-label">articles SEO</span></div>'
        + '<div class="inbox-impact-stat"><span class="inbox-impact-value">' + avis + '</span><span class="inbox-impact-label">avis traités</span></div>'
      + '</div>'
      + '<button class="inbox-empty-cta" data-nav="roi">Voir le ROI complet &rarr;</button>'
      + '<button class="inbox-empty-cta" data-nav="planning" style="background:transparent;color:var(--ink-60);border:1px solid var(--border);box-shadow:none;margin-top:8px">Briefer un nouveau contenu</button>'
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
        + '<button class="inbox-item-approve" data-action="inbox-approve-item" data-item-id="' + item.id + '" title="Approuver">'
          + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
        + '</button>'
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
