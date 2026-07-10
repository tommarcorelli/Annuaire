/* ════════════════════════════════════════════════════════════════
   MANPAGES.EXE — mobile-nav.js
   Construit un menu hamburger + drawer cohérent sur toutes les pages.
   Autonome : n'a besoin d'aucun markup particulier (juste une <nav>).
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var PAGES = [
    { href: 'index.html',      ico: '🏠', label: 'Accueil'    },
    { href: 'commands.html',   ico: '⌘',  label: 'Annuaire'   },
    { href: 'packages.html',   ico: '📦', label: 'Paquets'    },
    { href: 'quiz.html',       ico: '🎓', label: 'Quiz'       },
    { href: 'terminal.html',   ico: '>_', label: 'Terminal'   },
    { href: 'cheatsheet.html', ico: '⚡', label: 'Cheatsheet' },
    { href: 'scenarios.html',  ico: '🧭', label: 'Scénarios'  },
    { href: 'installation.html', ico: '💿', label: 'Installation' }
  ];

  var THEME_ICON = { dark: '🌙', light: '☀️', matrix: '💊', crt: '📟', synthwave: '🌆' };

  function currentFile() {
    var p = location.pathname.split('/').pop().toLowerCase();
    return p === '' ? 'index.html' : p;
  }

  function init() {
    var nav = document.querySelector('nav.nav') || document.querySelector('nav');
    if (!nav || document.getElementById('mnavToggle')) return;

    var here = currentFile();

    // ── Bouton hamburger (injecté dans la nav) ──────────────
    var toggle = document.createElement('button');
    toggle.id = 'mnavToggle';
    toggle.className = 'mnav-toggle';
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    toggle.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">' +
      '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    var host = nav.querySelector('.nav-right') || nav;
    host.appendChild(toggle);

    // ── Overlay + Drawer ────────────────────────────────────
    var overlay = document.createElement('div');
    overlay.className = 'mnav-overlay';

    var drawer = document.createElement('aside');
    drawer.className = 'mnav-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Navigation');

    var linksHtml = PAGES.map(function (p) {
      var active = p.href === here ? ' active' : '';
      return '<a class="mnav-link' + active + '" href="' + p.href + '">' +
             '<span class="mnav-ico">' + p.ico + '</span>' + p.label + '</a>';
    }).join('');

    drawer.innerHTML =
      '<div class="mnav-head">' +
        '<img src="icons/logo.svg" alt=""/>' +
        '<div><span class="mnav-title">MAN<b>//</b>PAGES.EXE</span>' +
        '<span class="mnav-sub">// MULTI-OS</span></div>' +
        '<button class="mnav-close" aria-label="Fermer le menu">✕</button>' +
      '</div>' +
      '<nav class="mnav-links">' + linksHtml + '</nav>' +
      '<div class="mnav-foot">' +
        '<button class="mnav-theme" id="mnavTheme"><span id="mnavThemeIco">🎨</span> Thème</button>' +
        '<span class="mnav-tag">896 CMD · 74 PKG · 32 OUTILS</span>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // ── Ouverture / fermeture ───────────────────────────────
    function open() {
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.classList.add('mnav-lock');
      paintTheme();
    }
    function close() {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.classList.remove('mnav-lock');
    }
    toggle.addEventListener('click', open);
    overlay.addEventListener('click', close);
    drawer.querySelector('.mnav-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) close();
    });

    // ── Thème : réutilise le bouton existant (theme.js) ─────
    var themeBtn = drawer.querySelector('#mnavTheme');
    var themeIco = drawer.querySelector('#mnavThemeIco');
    function paintTheme() {
      var t = document.documentElement.getAttribute('data-theme') || 'dark';
      themeIco.textContent = THEME_ICON[t] || '🎨';
    }
    themeBtn.addEventListener('click', function () {
      var real = document.querySelector('#themeToggle, #themeBtn');
      if (real) real.click();
      else {
        var order = ['dark', 'light', 'matrix', 'crt', 'synthwave'];
        var cur = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = order[(order.indexOf(cur) + 1) % order.length];
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('mpx-theme', next); } catch (e) {}
      }
      paintTheme();
    });
    paintTheme();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
