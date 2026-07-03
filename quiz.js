/* MANPAGES.EXE — quiz.js
   Quiz arcade : questions générées à partir de l'annuaire COMMANDS.
   Deux types de questions :
   - "cmd"  : on montre la description, il faut trouver la commande
   - "desc" : on montre la commande, il faut trouver sa description */

(function() {
  'use strict';

  var QUIZ_META = {
    universal:  { label: 'Universel',       color: '#999999' },
    debian:     { label: 'Debian/Ubuntu',   color: '#D70A53' },
    alpine:     { label: 'Alpine Linux',    color: '#0D597F' },
    arch:       { label: 'Arch Linux',      color: '#1793D1' },
    rhel:       { label: 'RHEL/Fedora',     color: '#EE0000' },
    freebsd:    { label: 'FreeBSD',         color: '#AB2B28' },
    macos:      { label: 'macOS',           color: '#A8A8A8' },
    windows:    { label: 'Windows',         color: '#0078D4' },
    'windows-server': { label: 'Windows Server', color: '#2f6fb3' },
    powershell: { label: 'PowerShell',      color: '#5391FE' },
    docker:     { label: 'Docker',          color: '#2496ED' },
    ansible:    { label: 'Ansible',         color: '#EE0000' },
    git:        { label: 'Git',             color: '#F05032' },
    kubectl:    { label: 'Kubernetes',      color: '#326CE5' },
    terraform:  { label: 'Terraform',       color: '#7B42BC' },
    vagrant:    { label: 'Vagrant',         color: '#1868F2' },
    nmap:       { label: 'Nmap',            color: '#4682B4' },
    tshark:     { label: 'Wireshark',       color: '#1679A7' },
    helm:       { label: 'Helm',            color: '#0F1689' },
    awscli:     { label: 'AWS CLI',         color: '#FF9900' },
    azurecli:   { label: 'Azure CLI',       color: '#0078D4' },
    cisco:      { label: 'Cisco IOS',       color: '#049FD9' },
    proxmox:    { label: 'Proxmox VE',      color: '#E57000' },
    mysql:      { label: 'MySQL/MariaDB',   color: '#4479A1' },
    nginx:      { label: 'Nginx',           color: '#009639' },
    openssl:    { label: 'OpenSSL/SSH',     color: '#8F1D14' },
    tcpdump:    { label: 'tcpdump',         color: '#3E6E93' },
    iptables:   { label: 'iptables/nft',    color: '#DA4E2B' },
    tmux:       { label: 'tmux',            color: '#1BB91F' },
    vim:        { label: 'Vim',             color: '#019733' },
    npm:        { label: 'npm/Node',        color: '#CB3837' },
    python:     { label: 'Python/pip',      color: '#3776AB' },
  };

  var state = {
    os: 'all',
    total: 10,
    current: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    questions: [],
    locked: false,
  };

  function $(id) { return document.getElementById(id); }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ── Records par domaine (localStorage) ───────────────────
  function loadBest() {
    try { return JSON.parse(localStorage.getItem('mpx-quiz-best')) || {}; } catch (e) { return {}; }
  }

  // Affiche le record (%) sur chaque chip de domaine
  function decorateChips() {
    var best = loadBest();
    document.querySelectorAll('#osChoices .quiz-chip').forEach(function(btn) {
      var os = btn.dataset.os;
      var old = btn.querySelector('.chip-best');
      if (old) old.remove();
      if (best[os] != null) {
        var b = document.createElement('span');
        b.className = 'chip-best' + (best[os] >= 100 ? ' gold' : '');
        b.textContent = (best[os] >= 100 ? '★ ' : '') + best[os] + '%';
        btn.appendChild(b);
      }
    });
  }

  // ── Construction de l'écran de config ────────────────────
  function buildOsChoices() {
    var wrap = $('osChoices');
    // Compte les commandes par OS et ne propose que ceux qui en ont assez
    var counts = {};
    COMMANDS.forEach(function(c) { counts[c.os] = (counts[c.os] || 0) + 1; });
    Object.keys(QUIZ_META).forEach(function(os) {
      if ((counts[os] || 0) < 8) return;
      var btn = document.createElement('button');
      btn.className = 'quiz-chip';
      btn.dataset.os = os;
      btn.textContent = QUIZ_META[os].label;
      wrap.appendChild(btn);
    });

    wrap.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-os]');
      if (!btn) return;
      wrap.querySelectorAll('.quiz-chip').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.os = btn.dataset.os;
    });

    $('countChoices').addEventListener('click', function(e) {
      var btn = e.target.closest('[data-count]');
      if (!btn) return;
      document.querySelectorAll('#countChoices .quiz-chip').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.total = parseInt(btn.dataset.count, 10);
    });
  }

  // ── Génération des questions ─────────────────────────────
  function buildQuestions() {
    var pool = COMMANDS.filter(function(c) {
      if (state.os !== 'all' && c.os !== state.os) return false;
      return c.description && c.description.length > 15;
    });
    var picked = shuffle(pool).slice(0, state.total);

    return picked.map(function(cmd) {
      var type = Math.random() < 0.5 ? 'cmd' : 'desc';
      // Les leurres viennent en priorité du même OS/outil (plus dur)
      var sameOs = pool.filter(function(c) { return c !== cmd && c.os === cmd.os; });
      var others = pool.filter(function(c) { return c !== cmd && c.os !== cmd.os; });
      var decoys = shuffle(sameOs).slice(0, 3);
      if (decoys.length < 3) decoys = decoys.concat(shuffle(others).slice(0, 3 - decoys.length));

      var options = shuffle([cmd].concat(decoys));
      return { cmd: cmd, type: type, options: options };
    });
  }

  // ── Affichage d'une question ─────────────────────────────
  function showQuestion() {
    var q = state.questions[state.current];
    var meta = QUIZ_META[q.cmd.os] || { label: q.cmd.os, color: '#c9a84c' };
    state.locked = false;

    $('hudQ').textContent = state.current + 1;
    $('hudTotal').textContent = state.total;
    $('hudScore').textContent = state.score;
    $('hudStreak').textContent = state.streak;
    $('barFill').style.width = (state.current / state.total * 100) + '%';

    var badge = $('qBadge');
    badge.textContent = meta.label + ' · ' + q.cmd.category;
    badge.style.setProperty('--q-color', meta.color);

    var qText = $('qText');
    var qCode = $('qCode');
    if (q.type === 'cmd') {
      qText.textContent = 'Quelle commande correspond à cette description ?';
      qCode.textContent = '« ' + q.cmd.description + ' »';
      qCode.classList.remove('hidden');
    } else {
      qText.textContent = 'À quoi sert cette commande ?';
      qCode.textContent = q.cmd.syntax || q.cmd.name;
      qCode.classList.remove('hidden');
    }

    var keys = ['A', 'B', 'C', 'D'];
    var optWrap = $('qOptions');
    optWrap.innerHTML = '';
    q.options.forEach(function(opt, i) {
      var btn = document.createElement('button');
      btn.className = 'q-opt';
      var label = q.type === 'cmd' ? opt.name : opt.description;
      btn.innerHTML = '<span class="opt-key">[' + keys[i] + ']</span>';
      btn.appendChild(document.createTextNode(label));
      btn.addEventListener('click', function() { answer(opt, btn); });
      optWrap.appendChild(btn);
    });

    $('qFeedback').textContent = '';
    $('qFeedback').className = 'q-feedback';
    $('nextBtn').style.display = 'none';
  }

  function answer(opt, btn) {
    if (state.locked) return;
    state.locked = true;
    var q = state.questions[state.current];
    var good = opt === q.cmd;
    var feedback = $('qFeedback');

    // Révèle la bonne réponse
    var buttons = document.querySelectorAll('.q-opt');
    buttons.forEach(function(b) { b.disabled = true; });
    q.options.forEach(function(o, i) {
      if (o === q.cmd) buttons[i].classList.add('correct');
    });

    if (good) {
      state.score++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      var msgs = ['✓ EXACT !', '✓ PERFECT !', '✓ NICE COMBO !', '✓ GG !'];
      feedback.textContent = msgs[Math.floor(Math.random() * msgs.length)] +
        (state.streak >= 3 ? '  🔥 x' + state.streak : '');
      feedback.classList.add('good');
    } else {
      btn.classList.add('wrong');
      state.streak = 0;
      feedback.textContent = '✗ Raté — la bonne réponse était : ' + q.cmd.name;
      feedback.classList.add('bad');
    }

    $('hudScore').textContent = state.score;
    $('hudStreak').textContent = state.streak;
    $('nextBtn').style.display = 'inline-block';
    $('nextBtn').textContent = (state.current + 1 >= state.total) ? 'RÉSULTAT →' : 'SUIVANT →';
    $('nextBtn').focus();
  }

  function next() {
    state.current++;
    if (state.current >= state.total) {
      showResult();
    } else {
      showQuestion();
    }
  }

  // ── Écran de résultat ────────────────────────────────────
  function rankFor(ratio) {
    if (ratio >= 1)    return { r: 'S',  c: '#ffd60a', msg: 'PERFECT ! Sans faute, machine de guerre.' };
    if (ratio >= 0.8)  return { r: 'A',  c: '#2ecc71', msg: 'Excellent — presque parfait.' };
    if (ratio >= 0.6)  return { r: 'B',  c: '#5ce1ff', msg: 'Solide. Encore quelques révisions et c\'est le rang S.' };
    if (ratio >= 0.4)  return { r: 'C',  c: '#e67e22', msg: 'Pas mal, mais retourne faire un tour dans l\'annuaire.' };
    return               { r: 'D',  c: '#e74c3c', msg: 'Aïe... man man ! L\'annuaire est ton ami.' };
  }

  function showResult() {
    $('gameScreen').classList.add('hidden');
    $('resultScreen').classList.remove('hidden');

    var ratio = state.score / state.total;
    var rank = rankFor(ratio);
    var rankEl = $('resultRank');
    rankEl.textContent = rank.r;
    rankEl.style.color = rank.c;

    $('resultScore').textContent = state.score + ' / ' + state.total +
      '  ·  meilleure série 🔥 ' + state.bestStreak;
    $('resultMsg').textContent = rank.msg;

    // Meilleur score par domaine, en pourcentage
    var key = 'mpx-quiz-best';
    var best = {};
    try { best = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
    var pct = Math.round(ratio * 100);
    var prev = best[state.os] || 0;
    if (pct > prev) {
      best[state.os] = pct;
      try { localStorage.setItem(key, JSON.stringify(best)); } catch (e) {}
      $('resultBest').textContent = '★ NOUVEAU RECORD : ' + pct + '% ★';
    } else {
      $('resultBest').textContent = 'Record sur ce domaine : ' + prev + '%';
    }
  }

  function start() {
    state.current = 0;
    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.questions = buildQuestions();
    if (state.questions.length < state.total) state.total = state.questions.length;
    if (!state.total) return;

    $('setupScreen').classList.add('hidden');
    $('resultScreen').classList.add('hidden');
    $('gameScreen').classList.remove('hidden');
    showQuestion();
  }

  // Raccourcis clavier : A/B/C/D ou 1/2/3/4 pour répondre, Entrée pour suivant
  document.addEventListener('keydown', function(e) {
    if ($('gameScreen').classList.contains('hidden')) return;
    var map = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 };
    var k = e.key.toLowerCase();
    if (k in map && !state.locked) {
      var btns = document.querySelectorAll('.q-opt');
      if (btns[map[k]]) btns[map[k]].click();
    }
    if ((e.key === 'Enter' || e.key === ' ') && state.locked) {
      e.preventDefault();
      next();
    }
  });

  $('startBtn').addEventListener('click', start);
  $('nextBtn').addEventListener('click', next);
  $('replayBtn').addEventListener('click', function() {
    $('resultScreen').classList.add('hidden');
    $('setupScreen').classList.remove('hidden');
    decorateChips(); // rafraîchit les records après la partie
  });

  buildOsChoices();
  decorateChips();

  // ── Thème (même mécanique que le reste du site) ──────────
  var html = document.documentElement;
  var themeBtn = $('themeToggle');
  var saved = localStorage.getItem('mpx-theme');
  if (saved) html.setAttribute('data-theme', saved);
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var current = html.getAttribute('data-theme') || 'dark';
      var nextTheme = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('mpx-theme', nextTheme);
    });
  }
})();
