// ═══════════════════════════════════════════════════════════
//  Phantom Landing Page — Scripts
// ═══════════════════════════════════════════════════════════

// ── Menu overlay toggle ──
(function() {
  var burger = document.getElementById('mobile-burger');
  var overlay = document.getElementById('menu-overlay');
  var closeBtn = document.getElementById('menu-close');
  if (!burger || !overlay || !closeBtn) return;

  burger.addEventListener('click', function() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeMenu);

  overlay.querySelectorAll('.menu-link, .menu-cta').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
})();

// ── Manifesto horizontal scroll ──
(function() {
  var outer = document.getElementById('manifesto');
  var track = document.getElementById('manifesto-track');
  if (!outer || !track) return;

  var slideEls = track.querySelectorAll('.manifesto-slide');
  var count = slideEls.length;

  function onScroll() {
    if (window.innerWidth <= 960) {
      track.style.transform = '';
      return;
    }
    var rect = outer.getBoundingClientRect();
    var scrollable = outer.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    var progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    track.style.transform = 'translateX(' + (progress * (count - 1) * -100) + 'vw)';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Scroll reveal (IntersectionObserver) ──
(function() {
  var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(function(el) {
    if (!el.hasAttribute('data-delay')) observer.observe(el);
  });
})();

// ── Counter animation ──
(function() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      observer.unobserve(el);

      var target = parseFloat(el.dataset.count);
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      var isFloat = target % 1 !== 0;
      var duration = 1200;
      var start = performance.now();

      function tick(now) {
        var t = Math.min((now - start) / duration, 1);
        var ease = 1 - Math.pow(1 - t, 3);
        var val = ease * target;
        el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) { observer.observe(el); });
})();

// ── FAQ toggle (delegated) ──
(function() {
  var faqList = document.querySelector('.faq-list');
  if (!faqList) return;
  faqList.addEventListener('click', function(e) {
    var q = e.target.closest('.faq-q');
    if (!q) return;
    q.parentElement.classList.toggle('open');
  });
})();

// ── Agents show more / less ──
(function() {
  var btn = document.getElementById('agents-show-more');
  var grid = document.querySelector('.services-grid');
  if (!btn || !grid) return;
  var textEl = btn.querySelector('.agents-show-more-text');
  btn.addEventListener('click', function() {
    var isExpanded = grid.classList.toggle('expanded');
    btn.classList.toggle('expanded', isExpanded);
    textEl.textContent = isExpanded ? 'Voir moins' : 'Voir les 20 agents';
  });
})();

// ── Dashboard scale on mobile ──
(function() {
  var frame = document.querySelector('.browser-frame');
  if (!frame) return;
  var mockApp = frame.querySelector('.mock-app');
  if (!mockApp) return;

  function scaleMock() {
    if (window.innerWidth > 960) {
      mockApp.style.transform = '';
      mockApp.style.width = '';
      mockApp.style.height = '';
      frame.style.height = '';
      return;
    }
    var containerW = frame.clientWidth;
    var nativeW = 1100;
    var s = containerW / nativeW;
    mockApp.style.width = nativeW + 'px';
    mockApp.style.transform = 'scale(' + s + ')';
    mockApp.style.transformOrigin = 'top left';
    var nativeH = mockApp.scrollHeight;
    frame.style.height = (nativeH * s + frame.querySelector('.browser-chrome').offsetHeight) + 'px';
    mockApp.style.height = nativeH + 'px';
  }

  scaleMock();
  window.addEventListener('resize', scaleMock);
})();

// ── Chat widget ──
(function() {
  var fab = document.getElementById('chat-fab');
  var panel = document.getElementById('chat-panel');
  var closeBtn = document.getElementById('chat-close');
  var input = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');
  var messages = document.getElementById('chat-messages');
  var quickReplies = document.getElementById('chat-quick');
  if (!fab || !panel) return;

  fab.addEventListener('click', function() {
    fab.classList.add('open');
    panel.classList.add('open');
  });
  closeBtn.addEventListener('click', function() {
    panel.classList.remove('open');
    setTimeout(function() { fab.classList.remove('open'); }, 200);
  });

  var botReplies = [
    "Top ! Nos clients dans ce secteur voient en moyenne +35% de demandes entrantes le premier mois. On gère Instagram, avis Google, SEO — tout en pilote automatique.",
    "Concrètement : tes agents IA sont configurés en 72h, premier livrable dans la foulée. Zéro formation, zéro technique de ton côté. Un appel de 20 min suffit pour démarrer.",
    "Résultat type : 1 790 €/mois tout compris, au lieu de 8 400 € en agence+freelances. On te propose un créneau ? → phantom.fr/rdv 🚀",
    "Fun fact : il y a un secret caché sur cette page. Tape ↑↑ au clavier. 👀"
  ];
  var replyIndex = 0;

  function addMsg(text, isUser) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + (isUser ? 'chat-msg-user' : 'chat-msg-bot');
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTypingThenReply() {
    if (replyIndex >= botReplies.length) return;
    var typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span class="chat-typing-dot"></span><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    var reply = botReplies[replyIndex++];
    setTimeout(function() {
      if (typing.parentNode) typing.parentNode.removeChild(typing);
      addMsg(reply, false);
    }, 1200);
  }

  function handleSend() {
    var text = input.value.trim();
    if (!text) return;
    addMsg(text, true);
    input.value = '';
    showTypingThenReply();
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSend();
  });

  quickReplies.querySelectorAll('.chat-quick-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      addMsg(btn.textContent, true);
      quickReplies.style.display = 'none';
      showTypingThenReply();
    });
  });
})();

// ── Prevent scroll-to-top on placeholder links ──
document.querySelectorAll('a[href="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) { e.preventDefault(); });
});

// ── Ghost Cursor ──
(function() {
  var ghost = document.getElementById('ghost-cursor');
  if (!ghost || 'ontouchstart' in window) return;

  var mx = 0, my = 0, gx = 0, gy = 0;
  var colors = ['#FF2D87','#FFD400','#FF8A1F','#00D26A','#0066FF','#6E3CFF','#FF4D2E'];
  var currentColor = '#6E3CFF';

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    ghost.classList.add('visible');
  });

  document.addEventListener('mouseleave', function() {
    ghost.classList.remove('visible');
  });

  document.addEventListener('mousedown', function() {
    ghost.classList.remove('clicking');
    void ghost.offsetWidth;
    ghost.classList.add('clicking');
  });

  var sections = document.querySelectorAll('section');
  var sectionColors = {};
  sections.forEach(function(s, i) {
    sectionColors[s.id || i] = colors[i % colors.length];
  });

  function tick() {
    gx += (mx - gx) * 0.15;
    gy += (my - gy) * 0.15;
    ghost.style.left = (gx + 12) + 'px';
    ghost.style.top = (gy - 30) + 'px';

    var el = document.elementFromPoint(mx, my);
    if (el) {
      var sec = el.closest('section');
      var target = sec ? (sectionColors[sec.id] || '#6E3CFF') : '#6E3CFF';
      if (target !== currentColor) {
        currentColor = target;
        ghost.style.color = currentColor;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// ── Scroll Progress Bar ──
(function() {
  var fill = document.getElementById('scroll-fill');
  var ghostEl = document.getElementById('scroll-ghost');
  if (!fill) return;

  var lastScroll = 0;
  var isScrolling = false;
  var scrollTimer;

  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    fill.style.width = pct + '%';

    var dir = window.scrollY > lastScroll ? 1 : -1;
    ghostEl.style.transform = dir > 0 ? 'scaleX(1)' : 'scaleX(-1)';
    lastScroll = window.scrollY;

    if (!isScrolling) {
      isScrolling = true;
      ghostEl.classList.add('walking');
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      isScrolling = false;
      ghostEl.classList.remove('walking');
    }, 150);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  ghostEl.style.color = '#6E3CFF';
})();

// ── Konami Code Easter Egg ──
(function() {
  var code = [38,38];
  var pos = 0;
  var colors = ['#FF2D87','#FFD400','#FF8A1F','#00D26A','#0066FF','#6E3CFF','#FF4D2E','#9472FF'];

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        startGhostRain();
      }
    } else {
      pos = 0;
    }
  });

  function startGhostRain() {
    var container = document.createElement('div');
    container.className = 'ghost-rain-container';
    document.body.appendChild(container);

    var total = 40;
    for (var i = 0; i < total; i++) {
      (function(idx) {
        setTimeout(function() {
          var g = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          g.setAttribute('viewBox', '0 0 200 200');
          g.setAttribute('fill', 'none');
          g.classList.add('ghost-rain');
          var size = 24 + Math.random() * 36;
          g.style.width = size + 'px';
          g.style.height = size + 'px';
          g.style.left = Math.random() * 100 + 'vw';
          g.style.color = colors[Math.floor(Math.random() * colors.length)];
          g.style.animationDuration = (1.5 + Math.random() * 2) + 's';
          g.style.animationDelay = '0s';
          g.innerHTML = '<path d="M 20 100 A 80 80 0 0 1 180 100 L 180 160 Q 160 182 140 160 Q 120 182 100 160 Q 80 182 60 160 Q 40 182 20 160 Z" fill="currentColor"/><ellipse cx="78" cy="92" rx="10" ry="15" fill="#0A0A0A"/><ellipse cx="122" cy="92" rx="10" ry="15" fill="#0A0A0A"/>';
          container.appendChild(g);
        }, idx * 60);
      })(i);
    }

    setTimeout(function() {
      if (container.parentNode) document.body.removeChild(container);
    }, 5000);
  }
})();
