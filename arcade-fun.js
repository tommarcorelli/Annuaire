/* ════════════════════════════════════════════════════════════════
   MANPAGES.EXE — arcade-fun.js  (OPTIONNEL · séparable)
   Module fun indépendant : combo, XP, achievements, Konami, SFX.
   Ne touche PAS à commands.js / data.js / la logique principale.
   Pour désactiver : retirer la balise <script src="arcade-fun.js">.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ───────────────────────────────────────────────
  // 1. THEME TOGGLE (landing UNIQUEMENT — commands.js gère le sien)
  //    On détecte la page annuaire via la présence de #searchInput.
  // ───────────────────────────────────────────────
  (function initThemeToggle() {
    var html = document.documentElement;
    var saved = localStorage.getItem('mpx-theme');
    if (saved) html.setAttribute('data-theme', saved);
    else if (!html.getAttribute('data-theme')) html.setAttribute('data-theme', 'dark');

    // Skip si on est sur la page annuaire (commands.js gère déjà le toggle)
    if (document.getElementById('searchInput')) return;

    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('mpx-theme', next);
      playBeep(420, 0.05, 'square');
    });
  })();

  // ───────────────────────────────────────────────
  // 2. AUDIO MINI-ENGINE (WebAudio · zéro asset)
  // ───────────────────────────────────────────────
  var audioCtx = null;
  var soundOn = localStorage.getItem('mpx-sound') !== 'off';
  function ctx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return null; }
    }
    return audioCtx;
  }
  function playBeep(freq, dur, type) {
    if (!soundOn) return;
    var c = ctx(); if (!c) return;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = type || 'square';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.08, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur + 0.02);
  }
  function playCopySfx() {
    playBeep(880, 0.06, 'square');
    setTimeout(function () { playBeep(1320, 0.08, 'square'); }, 60);
  }
  function playAchSfx() {
    [523, 659, 784, 1047].forEach(function (f, i) {
      setTimeout(function () { playBeep(f, 0.1, 'triangle'); }, i * 80);
    });
  }

  // ───────────────────────────────────────────────
  // 3. COMBO BADGE (visible sur les deux pages)
  // ───────────────────────────────────────────────
  var combo = 0;
  var comboTimer = null;
  var comboEl = null;

  function ensureComboBadge() {
    if (comboEl) return comboEl;
    comboEl = document.createElement('div');
    comboEl.className = 'combo-badge';
    comboEl.setAttribute('data-testid', 'combo-badge');
    comboEl.innerHTML = 'COMBO ×<span id="comboNum">1</span>';
    document.body.appendChild(comboEl);
    return comboEl;
  }

  function bumpCombo() {
    combo++;
    var el = ensureComboBadge();
    el.querySelector('#comboNum').textContent = combo;
    el.classList.add('show', 'bump');
    setTimeout(function () { el.classList.remove('bump'); }, 400);
    clearTimeout(comboTimer);
    comboTimer = setTimeout(function () {
      el.classList.remove('show');
      combo = 0;
    }, 3500);
  }

  // ───────────────────────────────────────────────
  // 4. XP POP (au clic de copie)
  // ───────────────────────────────────────────────
  function popXP(x, y, amount) {
    var el = document.createElement('div');
    el.className = 'xp-pop';
    el.textContent = '+' + (amount || 10) + ' XP';
    el.style.left = (x - 20) + 'px';
    el.style.top = (y - 30) + 'px';
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1100);
  }

  // ───────────────────────────────────────────────
  // 5. ACHIEVEMENTS
  // ───────────────────────────────────────────────
  var ACHIEVEMENTS = {
    first_copy:  { icon: '🥷', title: 'First Blood',     desc: 'Première commande copiée !' },
    five_copies: { icon: '⚔️', title: 'Combo Streak',    desc: '5 commandes au compteur.' },
    ten_copies:  { icon: '🐉', title: 'Dragon Slayer',   desc: '10 commandes copiées. Sensei niveau.' },
    explorer:    { icon: '🗺️', title: 'Hyperexplorer',   desc: '3 OS différents filtrés.' },
    searcher:    { icon: '🔍', title: 'Detective',       desc: 'Première recherche effectuée.' },
    konami:      { icon: '🌈', title: 'Konami Master',   desc: '↑↑↓↓←→←→BA · mode rainbow activé !' },
    night_owl:   { icon: '🦉', title: 'Night Owl',       desc: 'Mode sombre activé.' },
    bright_side: { icon: '☀️', title: 'Bright Side',     desc: 'Mode jour activé. Shōnen vibes.' }
  };

  function unlocked() {
    try { return JSON.parse(localStorage.getItem('mpx-achievements') || '{}'); }
    catch (e) { return {}; }
  }
  function saveUnlocked(map) {
    try { localStorage.setItem('mpx-achievements', JSON.stringify(map)); } catch (e) {}
  }
  function unlock(key) {
    var map = unlocked();
    if (map[key]) return;
    var ach = ACHIEVEMENTS[key];
    if (!ach) return;
    map[key] = Date.now();
    saveUnlocked(map);
    showAchievement(ach);
    playAchSfx();
  }
  function showAchievement(ach) {
    var t = document.createElement('div');
    t.className = 'achievement-toast';
    t.setAttribute('data-testid', 'achievement-toast');
    t.innerHTML =
      '<div class="ach-icon">' + ach.icon + '</div>' +
      '<div>' +
        '<div class="ach-title">★ Achievement</div>' +
        '<div class="ach-desc">' + ach.title + ' — ' + ach.desc + '</div>' +
      '</div>';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 500);
    }, 4200);
  }

  // ───────────────────────────────────────────────
  // 6. COPY HOOK (intercepte les copies des commandes)
  // ───────────────────────────────────────────────
  var copyCount = parseInt(localStorage.getItem('mpx-copies') || '0', 10);
  function trackCopy(x, y) {
    copyCount++;
    try { localStorage.setItem('mpx-copies', String(copyCount)); } catch (e) {}
    bumpCombo();
    popXP(x, y, 10);
    playCopySfx();
    if (copyCount === 1)  unlock('first_copy');
    if (copyCount === 5)  unlock('five_copies');
    if (copyCount === 10) unlock('ten_copies');
  }

  // On délègue au document : intercepte tout clic sur un bouton copy
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    trackCopy(r.left + r.width / 2, r.top);
  });

  // ───────────────────────────────────────────────
  // 7. SEARCH / FILTER tracking (page annuaire)
  // ───────────────────────────────────────────────
  var osFilters = new Set();
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    var searchOnce = false;
    searchInput.addEventListener('input', function () {
      if (!searchOnce && this.value.trim().length > 1) {
        searchOnce = true;
        unlock('searcher');
      }
    });
  }
  document.addEventListener('click', function (e) {
    var pill = e.target.closest('[data-os]');
    if (!pill) return;
    var os = pill.dataset.os;
    if (os && os !== 'all') {
      osFilters.add(os);
      if (osFilters.size >= 3) unlock('explorer');
    }
  });

  // ───────────────────────────────────────────────
  // 8. THEME-BASED ACHIEVEMENTS
  // ───────────────────────────────────────────────
  function checkThemeAch() {
    var t = document.documentElement.getAttribute('data-theme') || 'dark';
    if (t === 'dark')  unlock('night_owl');
    if (t === 'light') unlock('bright_side');
  }
  checkThemeAch();
  new MutationObserver(checkThemeAch).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });

  // ───────────────────────────────────────────────
  // 9. KONAMI CODE  ↑↑↓↓←→←→BA
  // ───────────────────────────────────────────────
  var konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var ki = 0;
  document.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === konami[ki]) {
      ki++;
      if (ki === konami.length) {
        ki = 0;
        document.body.classList.toggle('konami');
        unlock('konami');
        playAchSfx();
      }
    } else {
      ki = (k === konami[0]) ? 1 : 0;
    }
  });

  // ───────────────────────────────────────────────
  // 10. SOUND TOGGLE (touche M pour mute)
  // ───────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (e.key === 'm' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // évite de couper le son si on est dans un input
      if (document.activeElement && /input|textarea/i.test(document.activeElement.tagName)) return;
      soundOn = !soundOn;
      localStorage.setItem('mpx-sound', soundOn ? 'on' : 'off');
      if (soundOn) playBeep(660, 0.08, 'sine');
      showAchievement({
        icon: soundOn ? '🔊' : '🔇',
        title: 'SOUND',
        desc: soundOn ? 'Sons activés (M pour couper)' : 'Sons coupés (M pour réactiver)'
      });
    }
  });
})();
