// =====================================================
//  VIEW -- Centre de commande (Command Center)
//  Connects to localhost:3847 API for live agent data
// =====================================================

import { ghostSvg } from '../lib/icons.js';
import { esc } from '../lib/esc.js';

var CC_API = 'http://localhost:3847';
var ccState = {
  missions: [],
  agents: [],
  liveEvents: [],
  apiOnline: false,
  lastSync: null,
  evtSource: null,
  projectFilter: 'all',
};

var PROJECTS = {
  origines: { label: 'Origines Media', icon: 'OM', color: '#00d26a' },
  thinkerview: { label: 'Thinkerview', icon: 'TV', color: '#6e3cff' },
  highvalue: { label: 'High Value', icon: 'HV', color: '#0066ff' },
  renaissance: { label: 'Renaissance', icon: 'RE', color: '#ff2d87' },
  octogoal: { label: 'Octogoal', icon: 'OG', color: '#ffd400' },
  ppagency: { label: 'PP Agency', icon: 'PP', color: '#18c8c8' },
  petitheros: { label: 'Petit Heros', icon: 'PH', color: '#ff8a1f' },
  codex: { label: 'Codex Lab', icon: 'CX', color: '#9472ff' },
};

var STATUS_LABELS = {
  queued: 'En file',
  running: 'En cours',
  waiting: 'À décider',
  stale: 'Bloquée',
  failed: 'Erreur',
  done: 'Terminée',
  archived: 'Archivée',
};

var AGENT_ROLES = {
  writer: { label: 'Rédacteur', color: '#6E3CFF', icon: '✍' },
  fact: { label: 'Fact-checker', color: '#0066FF', icon: '🔍' },
  chief: { label: 'Rédac-chef', color: '#FF8A1F', icon: '📋' },
  corrector: { label: 'Correcteur', color: '#00D26A', icon: '✅' },
  images: { label: 'Images', color: '#FF2D87', icon: '🖼' },
  seo: { label: 'SEO', color: '#18C8C8', icon: '📊' },
  jarvis: { label: 'Jarvis', color: '#FFD400', icon: '⚡' },
  agent: { label: 'Agent', color: '#A3A3A3', icon: '◆' },
};

// ── Helpers ──

function shortTitle(text, length) {
  length = length || 54;
  var clean = String(text || 'Mission').replace(/\s+/g, ' ').trim();
  return clean.length > length ? clean.slice(0, length - 1) + '…' : clean;
}

function formatAge(iso) {
  var delta = Math.max(0, Date.now() - new Date(iso || Date.now()).getTime());
  var mins = Math.floor(delta / 60000);
  if (mins < 1) return 'maintenant';
  if (mins < 60) return mins + ' min';
  var hours = Math.floor(mins / 60);
  if (hours < 24) return hours + ' h';
  return Math.floor(hours / 24) + ' j';
}

function normalizeStatus(status) {
  if (status === 'error') return 'failed';
  if (status === 'idle') return 'waiting';
  if (STATUS_LABELS[status]) return status;
  return 'running';
}

function getMissionHealth(mission) {
  var status = normalizeStatus(mission.status);
  var age = Date.now() - new Date(mission.updatedAt || mission.startedAt).getTime();
  if (status === 'running' && age > 3 * 60 * 60 * 1000) {
    return { status: 'stale', reason: 'Aucune mise à jour depuis plus de 3 heures.' };
  }
  if (status === 'waiting') return { status: status, reason: 'Décision ou réponse humaine attendue.' };
  if (status === 'failed') return { status: status, reason: 'La mission a échoué ou demande une reprise.' };
  if (status === 'done') return { status: status, reason: 'Mission terminée.' };
  if (status === 'queued') return { status: status, reason: 'La mission attend son démarrage.' };
  return { status: 'running', reason: 'Le travail avance normalement.' };
}

function getAttentionBucket(mission) {
  var status = getMissionHealth(mission).status;
  if (status === 'archived') return 'archived';
  if (status === 'waiting') return 'decide';
  if (status === 'failed' || status === 'stale') return 'fix';
  if (status === 'done') return 'ready';
  return 'background';
}

function groupByBucket(missions) {
  var grouped = { decide: [], fix: [], ready: [], background: [] };
  missions.forEach(function(m) {
    var bucket = getAttentionBucket(m);
    if (grouped[bucket]) grouped[bucket].push(m);
  });
  return grouped;
}

function getAttentionCounts(missions) {
  var buckets = groupByBucket(missions);
  var active = missions.filter(function(m) {
    var s = getMissionHealth(m).status;
    return s === 'running' || s === 'queued';
  }).length;
  return {
    decide: buckets.decide.length,
    fix: buckets.fix.length,
    ready: buckets.ready.length,
    background: buckets.background.length,
    active: active,
    actionable: buckets.decide.length + buckets.fix.length + buckets.ready.length,
  };
}

function detectRole(mission) {
  var text = String(mission.name || '') + ' ' + String(mission.lastAction || '');
  var clean = text.toLowerCase();
  if (clean.indexOf('jarvis') !== -1) return 'jarvis';
  if (clean.indexOf('fact') !== -1 || clean.indexOf('source') !== -1 || clean.indexOf('vérif') !== -1) return 'fact';
  if (clean.indexOf('chef') !== -1 || clean.indexOf('rédac-chef') !== -1) return 'chief';
  if (clean.indexOf('correct') !== -1 || clean.indexOf('relecture') !== -1) return 'corrector';
  if (clean.indexOf('image') !== -1 || clean.indexOf('carrousel') !== -1 || clean.indexOf('carousel') !== -1) return 'images';
  if (clean.indexOf('seo') !== -1 || clean.indexOf('audit') !== -1) return 'seo';
  if (clean.indexOf('article') !== -1 || clean.indexOf('rédac') !== -1 || clean.indexOf('writer') !== -1) return 'writer';
  return 'agent';
}

function statusDotColor(status) {
  var map = {
    running: 'var(--phantom-violet)',
    queued: 'var(--rainbow-blue)',
    waiting: 'var(--rainbow-orange)',
    stale: 'var(--rainbow-yellow)',
    failed: 'var(--rainbow-red)',
    done: 'var(--rainbow-green)',
  };
  return map[status] || 'var(--ink-30)';
}

function toneBg(tone) {
  var map = {
    waiting: 'var(--orange-100)',
    failed: 'var(--red-100)',
    done: 'var(--green-100)',
    running: 'var(--phantom-violet-50)',
  };
  return map[tone] || 'var(--ink-05)';
}

function toneColor(tone) {
  var map = {
    waiting: 'var(--orange-600)',
    failed: 'var(--red-600)',
    done: 'var(--green-600)',
    running: 'var(--phantom-violet-600)',
  };
  return map[tone] || 'var(--ink-60)';
}

// ── API ──

function fetchCC(path) {
  return fetch(CC_API + path, { cache: 'no-store' })
    .then(function(r) { return r.ok ? r.json() : null; })
    .catch(function() { return null; });
}

function syncData() {
  return Promise.all([
    fetchCC('/api/missions'),
    fetchCC('/api/agents'),
  ]).then(function(results) {
    var missions = results[0];
    var agents = results[1];
    ccState.apiOnline = Boolean(missions || agents);
    if (Array.isArray(missions)) {
      ccState.missions = missions
        .filter(function(m) { return !m.parentId; })
        .slice(0, 80)
        .map(function(m) {
          return {
            id: m.id,
            name: m.name || 'Mission sans nom',
            project: projectFromMission(m),
            status: normalizeStatus(m.status),
            progress: Number.isFinite(m.progress) ? m.progress : 0,
            updatedAt: m.updatedAt || m.startedAt || new Date().toISOString(),
            startedAt: m.startedAt || m.updatedAt || new Date().toISOString(),
            lastAction: m.lastAction || 'Aucune action récente',
          };
        });
    }
    if (Array.isArray(agents)) {
      ccState.agents = agents.map(function(a) {
        return {
          id: a.id,
          name: a.name || 'Agent Claude',
          role: a.role || 'Agent',
          project: a.project || 'codex',
          model: a.model || 'sonnet',
          active: a.active !== false,
        };
      });
    }
    ccState.lastSync = new Date().toISOString();
  });
}

function projectFromMission(mission) {
  if (mission.projectKey && PROJECTS[mission.projectKey]) return mission.projectKey;
  var cat = String(mission.category || '') + ' ' + String(mission.cwd || '');
  if (cat.indexOf('thinkerview') !== -1) return 'thinkerview';
  if (cat.indexOf('octo') !== -1) return 'octogoal';
  if (cat.indexOf('origines') !== -1 || cat === 'cms') return 'origines';
  return 'codex';
}

function connectSSE() {
  if (ccState.evtSource) return;
  try {
    var es = new EventSource(CC_API + '/api/events');
    ccState.evtSource = es;
    es.onmessage = function(e) {
      try {
        var data = JSON.parse(e.data);
        ccState.liveEvents.unshift({
          title: data.mission || data.name || 'Signal',
          body: data.action || data.message || '',
          status: normalizeStatus(data.status || 'running'),
          time: data.timestamp || new Date().toISOString(),
        });
        if (ccState.liveEvents.length > 20) ccState.liveEvents.length = 20;
        var feedList = document.querySelector('.cc-live-feed-list');
        if (feedList) {
          feedList.innerHTML = renderFeedItems();
        }
      } catch (err) { /* ignore parse errors */ }
    };
    es.onerror = function() {
      es.close();
      ccState.evtSource = null;
      setTimeout(connectSSE, 10000);
    };
  } catch (err) { /* SSE not available */ }
}

// ── Render ──

function renderRoleAvatar(roleKey) {
  var role = AGENT_ROLES[roleKey] || AGENT_ROLES.agent;
  return '<span class="cc-role-avatar" style="background:' + role.color + '">' + role.icon + '</span>';
}

function renderStatusDot(status) {
  var pulsing = status === 'running' ? ' cc-pulse' : '';
  return '<span class="cc-status-dot' + pulsing + '" style="background:' + statusDotColor(status) + '"></span>';
}

function renderHero(counts) {
  var tone, eyebrow, title, body;
  if (counts.fix) {
    tone = 'failed';
    eyebrow = 'Alerte atelier';
    title = counts.fix + ' blocage' + (counts.fix > 1 ? 's' : '') + ' à reprendre';
    body = 'Le système sait où ça coince. Ouvre les cartes rouges en premier.';
  } else if (counts.decide) {
    tone = 'waiting';
    eyebrow = 'Réponse attendue';
    title = counts.decide + ' agent' + (counts.decide > 1 ? 's' : '') + ' attend' + (counts.decide > 1 ? 'ent' : '') + ' ton choix';
    body = 'Ces missions ne repartiront pas sans décision humaine.';
  } else if (counts.active) {
    tone = 'running';
    eyebrow = 'Production vivante';
    title = counts.active + ' agent' + (counts.active > 1 ? 's' : '') + ' en mouvement';
    body = 'Le cockpit respire, aucun feu critique.';
  } else {
    tone = 'done';
    eyebrow = 'Silence opérationnel';
    title = 'Rien ne brûle. Le système est calme.';
    body = 'Aucun agent ne réclame ton attention immédiate.';
  }

  return ''
    + '<div class="cc-hero cc-tone-' + tone + '">'
      + '<div class="cc-hero-copy">'
        + '<div class="cc-eyebrow">' + esc(eyebrow) + '</div>'
        + '<div class="cc-hero-title">' + esc(title) + '</div>'
        + '<div class="cc-hero-body">' + esc(body) + '</div>'
      + '</div>'
      + '<div class="cc-hero-radar">'
        + '<div class="cc-radar-ring"><span></span><span></span><span></span></div>'
        + '<div class="cc-radar-core">'
          + '<strong>' + counts.actionable + '</strong>'
          + '<small>' + (counts.fix ? 'à corriger' : counts.decide ? 'à décider' : counts.active ? 'actifs' : 'calme') + '</small>'
        + '</div>'
      + '</div>'
    + '</div>';
}

function renderBucket(id, label, description, tone, missions) {
  var items = missions.slice(0, 5).map(function(m) {
    var health = getMissionHealth(m);
    var project = PROJECTS[m.project] || PROJECTS.codex;
    var role = detectRole(m);
    var progress = Math.max(0, Math.min(100, Math.round(Number(m.progress) || 0)));
    return ''
      + '<div class="cc-mission-card cc-tone-' + health.status + '">'
        + '<div class="cc-mission-glyph">' + (health.status === 'failed' || health.status === 'stale' ? '!' : health.status === 'waiting' ? '?' : health.status === 'done' ? '✓' : '●') + '</div>'
        + '<div class="cc-mission-body">'
          + '<div class="cc-mission-kicker">' + esc(STATUS_LABELS[health.status]) + ' · ' + esc(formatAge(m.updatedAt)) + '</div>'
          + '<div class="cc-mission-title">'
            + renderRoleAvatar(role)
            + '<span>' + esc(shortTitle(m.name, 60)) + '</span>'
          + '</div>'
          + '<div class="cc-mission-action">' + esc(shortTitle(m.lastAction || health.reason, 120)) + '</div>'
          + '<div class="cc-mission-meta">'
            + renderStatusDot(health.status)
            + '<span class="cc-badge" style="color:' + project.color + '">' + esc(project.label) + '</span>'
            + '<span>' + progress + '%</span>'
          + '</div>'
        + '</div>'
      + '</div>';
  }).join('');

  var empty = '<div class="cc-empty">Rien ici. C\'est exactement ce qu\'on veut.</div>';

  return ''
    + '<div class="cc-bucket cc-tone-' + tone + '">'
      + '<div class="cc-bucket-header">'
        + '<div class="cc-bucket-title">' + esc(label) + '</div>'
        + '<div class="cc-bucket-count">' + missions.length + '</div>'
      + '</div>'
      + '<div class="cc-bucket-desc">' + esc(description) + '</div>'
      + (missions.length ? items : empty)
    + '</div>';
}

function renderAgentsPanel() {
  var active = ccState.agents.filter(function(a) { return a.active; });
  if (!active.length) {
    return ''
      + '<div class="cc-panel">'
        + '<div class="cc-panel-title">Agents actifs</div>'
        + '<div class="cc-empty">Aucun agent actif.</div>'
      + '</div>';
  }
  var rows = active.slice(0, 8).map(function(a) {
    var project = PROJECTS[a.project] || PROJECTS.codex;
    return ''
      + '<div class="cc-agent-row">'
        + '<span class="cc-agent-dot" style="background:' + project.color + '"></span>'
        + '<div class="cc-agent-info">'
          + '<strong>' + esc(a.name) + '</strong>'
          + '<span>' + esc(a.role) + ' · ' + esc(project.label) + '</span>'
        + '</div>'
        + '<span class="cc-agent-model">' + esc(a.model) + '</span>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="cc-panel">'
      + '<div class="cc-panel-title">Agents actifs</div>'
      + rows
    + '</div>';
}

function renderSystemPulse(counts) {
  return ''
    + '<div class="cc-panel">'
      + '<div class="cc-panel-title">Pouls système</div>'
      + '<div class="cc-pulse-grid">'
        + '<div class="cc-pulse-stat"><strong>' + counts.active + '</strong><span>agents actifs</span></div>'
        + '<div class="cc-pulse-stat"><strong>' + counts.ready + '</strong><span>livrables prêts</span></div>'
        + '<div class="cc-pulse-stat"><strong>' + counts.decide + '</strong><span>en attente</span></div>'
        + '<div class="cc-pulse-stat"><strong>' + ccState.missions.length + '</strong><span>missions total</span></div>'
      + '</div>'
    + '</div>';
}

function renderFeedItems() {
  var events;
  if (ccState.liveEvents.length) {
    events = ccState.liveEvents.slice(0, 8);
  } else {
    events = ccState.missions
      .filter(function(m) { return getMissionHealth(m).status !== 'archived'; })
      .sort(function(a, b) { return new Date(b.updatedAt) - new Date(a.updatedAt); })
      .slice(0, 8)
      .map(function(m) {
        var health = getMissionHealth(m);
        return {
          title: shortTitle(m.name, 46),
          body: shortTitle(m.lastAction || health.reason, 80),
          status: health.status,
          time: m.updatedAt,
        };
      });
  }

  if (!events.length) return '<div class="cc-empty">Aucun événement récent.</div>';

  return events.map(function(ev) {
    return ''
      + '<div class="cc-feed-row">'
        + renderStatusDot(ev.status)
        + '<div class="cc-feed-body">'
          + '<strong>' + esc(ev.title) + '</strong>'
          + '<span>' + esc(ev.body) + '</span>'
        + '</div>'
        + '<span class="cc-feed-time">' + esc(formatAge(ev.time)) + '</span>'
      + '</div>';
  }).join('');
}

function renderLiveFeed() {
  return ''
    + '<div class="cc-panel">'
      + '<div class="cc-panel-title">Signal live</div>'
      + '<div class="cc-live-feed-list">'
        + renderFeedItems()
      + '</div>'
    + '</div>';
}

function renderOffline() {
  return ''
    + '<div class="content cc-view">'
      + '<div class="welcome-row">'
        + '<div>'
          + '<div class="welcome-date">CENTRE DE COMMANDE</div>'
          + '<div class="welcome-title">Command Center</div>'
        + '</div>'
      + '</div>'
      + '<div class="cc-offline">'
        + '<div class="cc-offline-icon">⚠</div>'
        + '<div class="cc-offline-title">API hors ligne</div>'
        + '<div class="cc-offline-body">Le serveur Command Center ne répond pas sur <code>localhost:3847</code>.</div>'
        + '<div class="cc-offline-hint">Lance le serveur avec : <code>cd ~/Desktop/command-center && node server.js</code></div>'
      + '</div>'
    + '</div>';
}

function renderView() {
  var missions = ccState.missions;
  var counts = getAttentionCounts(missions);
  var buckets = groupByBucket(missions);

  return ''
    + '<div class="content cc-view">'
      + '<div class="welcome-row">'
        + '<div>'
          + '<div class="welcome-date">CENTRE DE COMMANDE</div>'
          + '<div class="welcome-title">Command Center</div>'
        + '</div>'
        + '<div class="welcome-actions">'
          + '<a href="http://localhost:3847" target="_blank" rel="noopener" class="btn-dark cc-open-full">Ouvrir l\'outil complet</a>'
          + '<button class="btn-primary cc-sync-btn" data-action="cc-sync">Resynchroniser</button>'
          + '<span class="cc-status-badge ' + (ccState.apiOnline ? 'cc-online' : 'cc-offline-badge') + '">'
            + (ccState.apiOnline ? 'API live' : 'Hors ligne')
          + '</span>'
        + '</div>'
      + '</div>'

      + renderHero(counts)

      + '<div class="cc-priority-row">'
        + renderBucket('decide', 'À décider', 'Des agents attendent une réponse, une validation, ou un choix.', 'waiting', buckets.decide)
        + renderBucket('fix', 'À corriger', 'Erreurs, missions mortes, ou workflows qui demandent une reprise.', 'failed', buckets.fix)
      + '</div>'

      + '<div class="cc-main-grid">'
        + '<div class="cc-main-left">'
          + renderBucket('ready', 'Prêt à publier', 'Livrables terminés qui méritent une revue ou une publication.', 'done', buckets.ready)
          + renderBucket('background', 'En arrière-plan', 'Le travail avance sans intervention nécessaire.', 'running', buckets.background)
        + '</div>'
        + '<div class="cc-main-right">'
          + renderSystemPulse(counts)
          + renderAgentsPanel()
          + renderLiveFeed()
        + '</div>'
      + '</div>'
    + '</div>';
}

export function renderCommandCenter() {
  if (ccState.lastSync && ccState.missions.length) {
    scheduleSSE();
    return renderView();
  }
  if (ccState.lastSync && !ccState.apiOnline) {
    return renderOffline();
  }

  setTimeout(function() {
    syncData().then(function() {
      scheduleSSE();
      var el = document.querySelector('.cc-view');
      if (!el) return;
      if (ccState.apiOnline) {
        el.outerHTML = renderView();
      } else {
        el.outerHTML = renderOffline();
      }
    }).catch(function() {
      var el = document.querySelector('.cc-view');
      if (el) el.outerHTML = renderOffline();
    });
  }, 0);

  return ''
    + '<div class="content cc-view">'
      + '<div class="welcome-row">'
        + '<div>'
          + '<div class="welcome-date">CENTRE DE COMMANDE</div>'
          + '<div class="welcome-title">Command Center</div>'
        + '</div>'
      + '</div>'
      + '<div class="cc-loading">'
        + '<div class="cc-loading-spinner"></div>'
        + '<div>Connexion à l\'API…</div>'
      + '</div>'
    + '</div>';
}

function scheduleSSE() {
  if (!ccState.evtSource && ccState.apiOnline) {
    connectSSE();
  }
}

export function cleanupCommandCenter() {
  if (ccState.evtSource) {
    ccState.evtSource.close();
    ccState.evtSource = null;
  }
}
