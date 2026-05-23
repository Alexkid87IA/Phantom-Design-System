// ═══════════════════════════════════════════════════════════
//  VIEW — Analytics (client-facing performance stats)
// ═══════════════════════════════════════════════════════════

import { AGENTS, getAgent } from '../data/agents.js';
import { ghostSvg } from '../lib/icons.js';

var METRICS = {
  instagram: { followers: 2847, followersGrowth: '+312', engagement: '4.8%', engGrowth: '+0.6%', reach: '18.2k', posts: 24 },
  google: { rating: 4.7, ratingGrowth: '+0.2', reviews: 47, responseRate: '100%', avgResponse: '2h' },
  seo: { position: 8, posGrowth: '+4', traffic: '1.2k', trafficGrowth: '+38%', articles: 12, keywords: 24 },
  web: { loadTime: '1.6s', uptime: '99.9%', visitors: '3.4k', bounce: '32%' },
};

var WEEKLY_DATA = [
  { day: 'Lun', posts: 3, engagement: 4.2 },
  { day: 'Mar', posts: 2, engagement: 5.1 },
  { day: 'Mer', posts: 4, engagement: 4.8 },
  { day: 'Jeu', posts: 2, engagement: 3.9 },
  { day: 'Ven', posts: 3, engagement: 6.2 },
  { day: 'Sam', posts: 1, engagement: 5.5 },
  { day: 'Dim', posts: 1, engagement: 4.0 },
];

var TOP_CONTENT = [
  { title: 'Reel — Découpe sashimi ASMR', type: 'Reel', reach: '12.4k', engagement: '8.2%', agent: 'social' },
  { title: 'Carousel — Recette California Roll', type: 'Carousel', reach: '8.1k', engagement: '6.4%', agent: 'social' },
  { title: 'Article — Sushi frais Marseille', type: 'Article', reach: '2.8k', engagement: '—', agent: 'seo' },
  { title: 'Post — Nigiri du jour', type: 'Post', reach: '3.2k', engagement: '5.1%', agent: 'social' },
  { title: 'Story — Behind the scenes', type: 'Story', reach: '4.6k', engagement: '7.8%', agent: 'social' },
];

export function renderAnalytics() {
  function metricCard(label, value, growth, color, countupVal, rec) {
    var growthHtml = growth ? '<span class="analytics-metric-growth">' + growth + '</span>' : '';
    var recHtml = rec ? '<div class="analytics-metric-rec">' + rec + '</div>' : '';
    var valHtml = countupVal
      ? '<div class="analytics-metric-value" style="color:' + (color || 'var(--ink)') + '" data-countup="' + countupVal + '">0</div>'
      : '<div class="analytics-metric-value" style="color:' + (color || 'var(--ink)') + '">' + value + '</div>';
    return '<div class="analytics-metric-card">'
      + '<div class="analytics-metric-label">' + label + '</div>'
      + '<div class="analytics-metric-row">'
        + valHtml
        + growthHtml
      + '</div>'
      + recHtml
    + '</div>';
  }

  var weeklyBars = WEEKLY_DATA.map(function(d) {
    var height = Math.round(d.engagement * 12);
    return '<div class="analytics-bar">'
      + '<div class="analytics-bar-value">' + d.engagement + '%</div>'
      + '<div class="analytics-bar-fill" style="height:' + height + 'px"></div>'
      + '<div class="analytics-bar-label">' + d.day + '</div>'
    + '</div>';
  }).join('');

  var topContentRows = TOP_CONTENT.map(function(c, idx) {
    var a = getAgent(c.agent);
    var color = a ? a.color : 'var(--ink-30)';
    return '<div class="analytics-content-row" data-agent="' + c.agent + '">'
      + '<div class="analytics-content-rank">' + (idx + 1) + '</div>'
      + '<div class="analytics-content-left">'
        + '<div class="analytics-content-title">' + c.title + '</div>'
        + '<div class="analytics-content-meta">'
          + ghostSvg(color, 10)
          + '<span class="analytics-content-agent">' + (a ? a.name : '') + '</span>'
          + '<span class="analytics-content-type">' + c.type + '</span>'
        + '</div>'
      + '</div>'
      + '<div class="analytics-content-right">'
        + '<div class="analytics-content-reach">' + c.reach + '</div>'
        + '<div class="analytics-content-eng">' + c.engagement + '</div>'
      + '</div>'
      + '<svg class="analytics-content-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
    + '</div>';
  }).join('');

  var agentPerf = AGENTS.filter(function(a) { return a.status === 'active'; }).map(function(a) {
    var tasks = a.tasks;
    var barWidth = Math.min(tasks * 8, 100);
    return '<div class="analytics-agent-row">'
      + ghostSvg(a.color, 14)
      + '<span class="analytics-agent-name">' + a.name + '</span>'
      + '<div class="analytics-agent-bar-track"><div class="analytics-agent-bar-fill" style="width:' + barWidth + '%;background:' + a.color + '"></div></div>'
      + '<span class="analytics-agent-tasks">' + tasks + '</span>'
    + '</div>';
  }).join('');

  return ''
    + '<div class="work-view">'
      + '<div class="work-header">'
        + '<div class="work-title">Statistiques</div>'
        + '<div class="work-filters">'
          + '<button class="work-filter">7j</button>'
          + '<button class="work-filter active">30j</button>'
          + '<button class="work-filter">90j</button>'
          + '<button class="work-filter">Année</button>'
        + '</div>'
      + '</div>'

      + '<div class="analytics-verdict-hero">'
        + '<div class="analytics-verdict-hero-left">'
          + '<div class="analytics-verdict-number"><span data-countup="97" data-suffix="%">0%</span></div>'
          + '<div class="analytics-verdict-label">des restaurants surpassés</div>'
        + '</div>'
        + '<div class="analytics-verdict-hero-right">'
          + '<div class="analytics-verdict-copy">Ce mois-ci, tes agents ont surpassé <strong>97 % des restaurants de ta ville</strong> en visibilité digitale.</div>'
          + '<div class="analytics-verdict-sub">Basé sur les métriques Instagram, Google et SEO combinées.</div>'
        + '</div>'
      + '</div>'

      + '<div class="analytics-metrics-grid">'
        + metricCard('Followers Instagram', METRICS.instagram.followers.toLocaleString('fr-FR'), METRICS.instagram.followersGrowth, 'var(--rainbow-pink)', METRICS.instagram.followers, 'Reels = 3x plus de reach → publier 3/sem.')
        + metricCard('Engagement', METRICS.instagram.engagement, METRICS.instagram.engGrowth, 'var(--phantom-violet)', null, 'Mardi et vendredi = pics d’engagement')
        + metricCard('Note Google', METRICS.google.rating + '★', METRICS.google.ratingGrowth, 'var(--rainbow-yellow)', null, 'Objectif 5.0★ → répondre aux avis en <1h')
        + metricCard('Position SEO moy.', '#' + METRICS.seo.position, METRICS.seo.posGrowth, 'var(--rainbow-green)', null, 'Top 5 accessible → 2 articles/sem.')
      + '</div>'

      + '<div class="analytics-two-col">'

        + '<div class="analytics-section-card">'
          + '<div class="analytics-section-title">Engagement par jour</div>'
          + '<div class="analytics-bars-wrap">'
            + weeklyBars
          + '</div>'
        + '</div>'

        + '<div class="analytics-section-card">'
          + '<div class="analytics-section-title">Activité par agent</div>'
          + agentPerf
        + '</div>'

      + '</div>'

      + '<div class="analytics-section-card">'
        + '<div class="analytics-section-title">Top contenus du mois</div>'
        + topContentRows
      + '</div>'

      + '<div class="analytics-insight">'
        + '<div class="analytics-insight-inner">'
          + '<div class="analytics-insight-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>'
          + '<div class="analytics-insight-body">'
            + '<div class="analytics-insight-title">Insights de ton équipe</div>'
            + '<div class="analytics-insight-text">Les Reels génèrent <strong>3.2x plus d\'engagement</strong> que les posts classiques. Ton Social Manager recommande d\'augmenter la cadence à 3 Reels/semaine.</div>'
            + '<div class="analytics-insight-actions">'
              + '<button class="analytics-insight-btn analytics-insight-btn-primary" data-agent="social">Parler au Social Manager</button>'
              + '<button class="analytics-insight-btn analytics-insight-btn-ghost" data-nav="roi">Voir l\'impact ROI &rarr;</button>'
            + '</div>'
          + '</div>'
        + '</div>'
      + '</div>'

      + '<div class="analytics-report-cta">'
        + '<div class="analytics-report-cta-left">'
          + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
          + '<div>'
            + '<div class="analytics-report-cta-title">Rapport mensuel</div>'
            + '<div class="analytics-report-cta-desc">Vue consolidée : performance, ROI et activité agents</div>'
          + '</div>'
        + '</div>'
        + '<button class="analytics-report-cta-btn" data-action="report">Voir le rapport &rarr;</button>'
      + '</div>'
    + '</div>';
}
