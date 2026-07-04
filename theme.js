/* MANPAGES.EXE — theme.js
   Sélecteur de thème partagé par TOUTES les pages.
   Le bouton (#themeToggle ou #themeBtn) fait défiler les thèmes ;
   les palettes vivent dans style.css / commands.css / packages.html. */

(function() {
  'use strict';

  var THEMES = [
    { id: 'dark',      icon: '🌙', label: 'After Dark Arcade' },
    { id: 'light',     icon: '☀️', label: 'Shōnen Paper' },
    { id: 'matrix',    icon: '💊', label: 'Matrix Terminal' },
    { id: 'crt',       icon: '📟', label: 'Amber CRT' },
    { id: 'synthwave', icon: '🌆', label: 'Synthwave' }
  ];

  var html = document.documentElement;

  function themeIndex(id) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return i;
    return 0;
  }

  function currentTheme() {
    return THEMES[themeIndex(html.getAttribute('data-theme') || 'dark')];
  }

  function buttons() {
    return [document.getElementById('themeToggle'), document.getElementById('themeBtn')]
      .filter(function(b) { return b; });
  }

  function paintButtons() {
    var t = currentTheme();
    buttons().forEach(function(btn) {
      btn.innerHTML = '<span style="font-size:16px;line-height:1">' + t.icon + '</span>';
      btn.title = 'Thème : ' + t.label + ' — cliquer pour changer';
    });
  }

  function apply(id) {
    html.setAttribute('data-theme', id);
    try { localStorage.setItem('mpx-theme', id); } catch (e) {}
    paintButtons();
  }

  // ── Toast « nom du thème » ────────────────────────────────
  var toast = null;
  var toastTimer = null;
  function showToast(t) {
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'themeToast';
      toast.style.cssText =
        'position:fixed;bottom:24px;right:24px;z-index:9999;' +
        'font-family:"JetBrains Mono",monospace;font-size:12px;' +
        'padding:8px 16px;background:var(--bg2, #160d2e);color:var(--text, #d9d2e8);' +
        'border:2px solid var(--accent, #ff2e88);box-shadow:4px 4px 0 rgba(0,0,0,0.5);' +
        'opacity:0;transform:translateY(10px);transition:opacity .2s,transform .2s;' +
        'pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = t.icon + ' ' + t.label;
    requestAnimationFrame(function() {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 1600);
  }

  // ── Init : restaure le thème sauvegardé ──────────────────
  var saved = null;
  try { saved = localStorage.getItem('mpx-theme'); } catch (e) {}
  if (saved && themeIndex(saved) === 0 && saved !== 'dark') saved = null; // thème inconnu → défaut
  if (saved) html.setAttribute('data-theme', saved);
  else if (!html.getAttribute('data-theme')) html.setAttribute('data-theme', 'dark');

  function bind() {
    paintButtons();
    buttons().forEach(function(btn) {
      btn.addEventListener('click', function() {
        var next = THEMES[(themeIndex(html.getAttribute('data-theme')) + 1) % THEMES.length];
        apply(next.id);
        showToast(next);
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
