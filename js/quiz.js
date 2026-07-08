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
    total: 10,        // choix de l'utilisateur (chips)
    sessionTotal: 10, // nb réel de questions de la partie en cours
    reviewOnly: false, // mode « réviser mes erreurs »
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

  // ── Révision espacée : erreurs mémorisées ─────────────────
  // Une commande ratée gagne 2 points de "dette" ; chaque bonne
  // réponse en retire 1. Tant qu'elle a de la dette, elle revient
  // en priorité dans les prochaines parties.
  function loadErrors() {
    try { return JSON.parse(localStorage.getItem('mpx-quiz-errors')) || {}; } catch (e) { return {}; }
  }
  function saveErrors(errs) {
    try { localStorage.setItem('mpx-quiz-errors', JSON.stringify(errs)); } catch (e) {}
  }
  function cmdKey(c) { return c.os + '|' + c.name; }

  function updateReviewNote() {
    var errs = loadErrors();
    var n = COMMANDS.filter(function(c) {
      if (state.os !== 'all' && c.os !== state.os) return false;
      return errs[cmdKey(c)];
    }).length;
    var el = $('reviewNote');
    if (el) {
      el.textContent = n
        ? '🔁 ' + n + ' commande' + (n > 1 ? 's' : '') + ' à revoir — elles reviendront en priorité.'
        : '';
    }
    var btn = $('reviewBtn');
    if (btn) {
      btn.classList.toggle('hidden', !n);
      btn.textContent = '🔁 RÉVISER MES ERREURS (' + n + ')';
    }
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

    // Domaine présélectionné via l'URL : quiz.html?os=cisco
    var osParam = new URLSearchParams(location.search).get('os');
    if (osParam) {
      var preChip = wrap.querySelector('[data-os="' + osParam + '"]');
      if (preChip) {
        wrap.querySelectorAll('.quiz-chip').forEach(function(b) { b.classList.remove('active'); });
        preChip.classList.add('active');
        state.os = osParam;
      }
    }

    wrap.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-os]');
      if (!btn) return;
      wrap.querySelectorAll('.quiz-chip').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.os = btn.dataset.os;
      updateReviewNote();
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

    var errors = loadErrors();
    var picked;
    if (state.reviewOnly) {
      // Mode révision : UNIQUEMENT les commandes en dette d'erreur
      picked = shuffle(pool.filter(function(c) { return errors[cmdKey(c)]; }))
        .slice(0, state.total);
    } else {
      // Révision espacée : ~40% des questions viennent des commandes
      // déjà ratées, le reste est tiré au hasard.
      var revShuffled = shuffle(pool.filter(function(c) { return errors[cmdKey(c)]; }));
      var fresh = shuffle(pool.filter(function(c) { return !errors[cmdKey(c)]; }));
      var nReview = Math.min(revShuffled.length, Math.ceil(state.total * 0.4));
      picked = revShuffled.slice(0, nReview).concat(fresh.slice(0, state.total - nReview));
      if (picked.length < state.total) {
        picked = picked.concat(revShuffled.slice(nReview, nReview + state.total - picked.length));
      }
      picked = shuffle(picked);
    }

    return picked.map(function(cmd) {
      var review = !!errors[cmdKey(cmd)];

      // ~1 question sur 4 porte sur une option de la commande
      var flags = parseFlags(cmd);
      if (flags.length && Math.random() < 0.25) {
        var fq = buildFlagQuestion(cmd, flags, pool, review);
        if (fq) return fq;
      }

      var type = Math.random() < 0.5 ? 'cmd' : 'desc';
      var labelOf = function(c) { return type === 'cmd' ? c.name : c.description; };

      // Leurres : d'abord le même OS/outil (plus dur), puis le reste du pool.
      // On écarte tout leurre dont le libellé est identique à la bonne réponse
      // ou à un leurre déjà retenu, pour ne jamais afficher deux options égales.
      var seen = [labelOf(cmd)];
      var decoys = [];
      shuffle(pool.filter(function(c) { return c !== cmd && c.os === cmd.os; }))
        .concat(shuffle(pool.filter(function(c) { return c !== cmd && c.os !== cmd.os; })))
        .forEach(function(c) {
          var lbl = labelOf(c);
          if (decoys.length >= 3 || seen.indexOf(lbl) !== -1) return;
          seen.push(lbl);
          decoys.push(c);
        });

      var options = shuffle([cmd].concat(decoys)).map(function(c) {
        return { label: labelOf(c), good: c === cmd };
      });
      return {
        cmd: cmd, type: type, review: review, options: options,
        prompt: type === 'cmd' ? 'Quelle commande correspond à cette description ?' : 'À quoi sert cette commande ?',
        code: type === 'cmd' ? '« ' + cmd.description + ' »' : (cmd.syntax || cmd.name)
      };
    });
  }

  // Extrait les options au format "-x (explication)" du champ flags
  function parseFlags(cmd) {
    var out = [];
    (cmd.flags || []).forEach(function(f) {
      var m = /^(.{1,28}?)\s*\((.{6,})\)$/.exec(f);
      if (m) out.push({ flag: m[1], desc: m[2] });
    });
    return out;
  }

  // Question « Que fait cette option ? » — leurres : les autres options
  // de la même commande d'abord, puis celles du reste du pool.
  function buildFlagQuestion(cmd, flags, pool, review) {
    var f = flags[Math.floor(Math.random() * flags.length)];
    var decoys = shuffle(flags.filter(function(x) { return x !== f; })
      .map(function(x) { return x.desc; }));
    shuffle(pool).slice(0, 30).forEach(function(c) {
      if (c !== cmd) parseFlags(c).forEach(function(x) { decoys.push(x.desc); });
    });

    var options = [{ label: f.desc, good: true }];
    for (var i = 0; i < decoys.length && options.length < 4; i++) {
      if (decoys[i] !== f.desc && !options.some(function(o) { return o.label === decoys[i]; })) {
        options.push({ label: decoys[i], good: false });
      }
    }
    if (options.length < 4) return null; // pas assez de leurres : repli sur cmd/desc

    return {
      cmd: cmd, type: 'flag', review: review, options: shuffle(options),
      prompt: "Que fait l'option de cette commande ?",
      code: cmd.name + '  ' + f.flag
    };
  }

  // ── Affichage d'une question ─────────────────────────────
  function showQuestion() {
    var q = state.questions[state.current];
    var meta = QUIZ_META[q.cmd.os] || { label: q.cmd.os, color: '#c9a84c' };
    state.locked = false;

    $('hudQ').textContent = state.current + 1;
    $('hudTotal').textContent = state.sessionTotal;
    $('hudScore').textContent = state.score;
    $('hudStreak').textContent = state.streak;
    $('barFill').style.width = (state.current / state.sessionTotal * 100) + '%';

    var badge = $('qBadge');
    badge.textContent = meta.label + ' · ' + q.cmd.category + (q.review ? ' · 🔁 à revoir' : '');
    badge.style.setProperty('--q-color', meta.color);

    $('qText').textContent = q.prompt;
    var qCode = $('qCode');
    qCode.textContent = q.code;
    qCode.classList.remove('hidden');

    var keys = ['A', 'B', 'C', 'D'];
    var optWrap = $('qOptions');
    optWrap.innerHTML = '';
    q.options.forEach(function(opt, i) {
      var btn = document.createElement('button');
      btn.className = 'q-opt';
      btn.innerHTML = '<span class="opt-key">[' + keys[i] + ']</span>';
      btn.appendChild(document.createTextNode(opt.label));
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
    var good = !!opt.good;
    var feedback = $('qFeedback');

    // Révèle la bonne réponse
    var buttons = document.querySelectorAll('.q-opt');
    buttons.forEach(function(b) { b.disabled = true; });
    q.options.forEach(function(o, i) {
      if (o.good) buttons[i].classList.add('correct');
    });

    // Révision espacée : met à jour la dette de la commande
    var errs = loadErrors();
    var key = cmdKey(q.cmd);
    if (good) {
      if (errs[key]) {
        errs[key]--;
        if (errs[key] <= 0) delete errs[key];
        saveErrors(errs);
      }
    } else {
      errs[key] = (errs[key] || 0) + 2;
      saveErrors(errs);
    }

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
      var correct = '';
      q.options.forEach(function(o) { if (o.good) correct = o.label; });
      feedback.textContent = '✗ Raté — la bonne réponse était : ' +
        (q.type === 'flag' ? correct : q.cmd.name);
      feedback.classList.add('bad');
    }

    $('hudScore').textContent = state.score;
    $('hudStreak').textContent = state.streak;
    $('nextBtn').style.display = 'inline-block';
    $('nextBtn').textContent = (state.current + 1 >= state.sessionTotal) ? 'RÉSULTAT →' : 'SUIVANT →';
    $('nextBtn').focus();
  }

  function next() {
    state.current++;
    if (state.current >= state.sessionTotal) {
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

    var ratio = state.score / state.sessionTotal;
    var rank = rankFor(ratio);
    var rankEl = $('resultRank');
    rankEl.textContent = rank.r;
    rankEl.style.color = rank.c;

    $('resultScore').textContent = state.score + ' / ' + state.sessionTotal +
      '  ·  meilleure série 🔥 ' + state.bestStreak;
    $('resultMsg').textContent = rank.msg;

    if (state.reviewOnly) {
      // Pas de record en mode révision : on affiche la dette restante
      var left = Object.keys(loadErrors()).length;
      $('resultBest').textContent = left
        ? '🔁 Encore ' + left + ' commande' + (left > 1 ? 's' : '') + ' à revoir — remets une pièce !'
        : '✨ Ardoise effacée : plus aucune erreur à revoir !';
      return;
    }

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

  function start(reviewOnly) {
    state.reviewOnly = !!reviewOnly;
    state.current = 0;
    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.questions = buildQuestions();
    state.sessionTotal = state.questions.length; // ≤ state.total, sans l'écraser
    if (!state.sessionTotal) return;

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

  $('startBtn').addEventListener('click', function() { start(false); });
  var reviewBtn = $('reviewBtn');
  if (reviewBtn) reviewBtn.addEventListener('click', function() { start(true); });
  $('nextBtn').addEventListener('click', next);
  $('replayBtn').addEventListener('click', function() {
    $('resultScreen').classList.add('hidden');
    $('setupScreen').classList.remove('hidden');
    decorateChips();     // rafraîchit les records après la partie
    updateReviewNote();  // ... et le compteur de commandes à revoir
  });

  buildOsChoices();
  decorateChips();
  updateReviewNote();

  // ── Export / import de la progression ─────────────────────
  // Tout vit dans le localStorage : un fichier JSON permet de le
  // sauvegarder ou de le transférer sur un autre appareil.
  var IO_KEYS = ['mpx-favorites', 'mpx-quiz-best', 'mpx-quiz-errors', 'mpx-scenarios-done', 'mpx-search-history', 'mpx-theme', 'mpx-sound'];

  function ioStatus(msg) {
    var el = $('ioStatus');
    if (!el) return;
    el.textContent = msg;
    setTimeout(function() { if (el.textContent === msg) el.textContent = ''; }, 4000);
  }

  var exportBtn = $('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      var data = { app: 'manpages.exe', date: new Date().toISOString(), values: {} };
      IO_KEYS.forEach(function(k) {
        var v = localStorage.getItem(k);
        if (v !== null) data.values[k] = v;
      });
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'manpages-progression-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(a.href);
      ioStatus('✓ Fichier exporté');
    });
  }

  var importBtn = $('importBtn');
  var importFile = $('importFile');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', function() { importFile.click(); });
    importFile.addEventListener('change', function() {
      var file = this.files[0];
      this.value = '';
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function() {
        try {
          var data = JSON.parse(reader.result);
          if (!data || data.app !== 'manpages.exe' || !data.values) {
            ioStatus('✗ Fichier non reconnu');
            return;
          }
          var n = 0;
          IO_KEYS.forEach(function(k) {
            if (typeof data.values[k] === 'string') {
              localStorage.setItem(k, data.values[k]);
              n++;
            }
          });
          decorateChips();
          updateReviewNote();
          ioStatus('✓ Progression importée (' + n + ' éléments)');
        } catch (err) {
          ioStatus('✗ JSON invalide');
        }
      };
      reader.readAsText(file);
    });
  }

  // Le thème est géré par theme.js (partagé par toutes les pages).
})();
