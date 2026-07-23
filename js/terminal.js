/* MANPAGES.EXE — terminal.js
   Terminal interactif : on tape une commande, l'app affiche la fiche
   correspondante en direct. Autocomplétion + historique depuis
   l'annuaire de commandes (data.js / data-extra.js / data-extra2.js).
   Aucune commande n'est réellement exécutée — c'est un explorateur,
   pas un vrai shell. */

(function () {
  'use strict';

  if (typeof COMMANDS === 'undefined') return;

  // Libellés + couleurs par outil/OS (mêmes valeurs que l'annuaire)
  var META = {
    universal:  { label: 'Universel',       color: '#999999' },
    debian:     { label: 'Debian/Ubuntu',   color: '#D70A53' },
    alpine:     { label: 'Alpine Linux',    color: '#0D597F' },
    arch:       { label: 'Arch Linux',      color: '#1793D1' },
    rhel:       { label: 'RHEL/Fedora',     color: '#EE0000' },
    bazzite:    { label: 'Bazzite',         color: '#9B59D0' },
    cachyos:    { label: 'CachyOS',         color: '#0FA3E0' },
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
    postgresql: { label: 'PostgreSQL',      color: '#336791' },
    redis:      { label: 'Redis',           color: '#DC382D' },
    mongodb:    { label: 'MongoDB',         color: '#47A248' },
    gcloud:     { label: 'Google Cloud',    color: '#4285F4' },
    rclone:     { label: 'rclone',          color: '#3F51B5' },
    borg:       { label: 'BorgBackup',      color: '#7C6F64' },
    restic:     { label: 'restic',          color: '#4F5D95' },
    httpie:     { label: 'HTTPie',          color: '#73DC8C' },
  };

  function $(id) { return document.getElementById(id); }
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
  function osMeta(os) { return META[os] || { label: os, color: '#c9a84c' }; }

  function slugify(name) {
    return name.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  var log     = $('termLog');
  var input   = $('termInput');
  var sugBox  = $('termSuggest');
  var history = [];
  var histIdx = -1;

  // ── Sortie : ajoute un bloc au journal et défile en bas ──────
  function push(node) {
    log.appendChild(node);
    log.scrollTop = log.scrollHeight;
  }

  // Rappelle la ligne saisie (avec le prompt) avant sa réponse
  function echo(line) {
    var row = el('div', 't-echo');
    var pr = el('span', 't-prompt'); pr.textContent = 'visitor@manpages:~$ ';
    var tx = el('span'); tx.textContent = line;
    row.appendChild(pr); row.appendChild(tx);
    push(row);
  }

  function note(text, cls) {
    var d = el('div', 't-note' + (cls ? ' ' + cls : ''));
    d.textContent = text;
    push(d);
  }

  // Liste de « pistes » cliquables. `prefix` permet de rejouer autre chose
  // que le libellé (ex. cliquer l'outil « docker » lance « ls docker »).
  function chips(names, label, prefix) {
    var wrap = el('div', 't-chips');
    if (label) { var l = el('span', 't-chips-label'); l.textContent = label; wrap.appendChild(l); }
    names.forEach(function (n) {
      var b = el('button', 't-chip');
      b.type = 'button';
      b.textContent = n;
      b.addEventListener('click', function () {
        input.focus();
        run((prefix || '') + n);
        input.value = '';
        refreshSuggest();
      });
      wrap.appendChild(b);
    });
    push(wrap);
  }

  // ── Fiche commande rendue dans le terminal ───────────────────
  function cmdBlock(c) {
    var m = osMeta(c.os);
    var block = el('div', 't-block');
    block.style.setProperty('--c', m.color);

    var head = el('div', 't-block-head');
    var name = el('span', 't-name'); name.textContent = c.name;
    var badge = el('span', 't-badge');
    badge.textContent = m.label + ' · ' + c.category;
    badge.style.color = m.color;
    badge.style.borderColor = m.color + '66';
    head.appendChild(name); head.appendChild(badge);
    block.appendChild(head);

    var desc = el('div', 't-desc'); desc.textContent = c.description;
    block.appendChild(desc);

    var syn = el('div', 't-syntax'); syn.textContent = c.syntax;
    block.appendChild(syn);

    if (c.flags && c.flags.length) {
      var fl = el('div', 't-flags');
      c.flags.forEach(function (f) {
        var s = el('span', 't-flag'); s.textContent = f; fl.appendChild(s);
      });
      block.appendChild(fl);
    }

    (c.examples || []).slice(0, 3).forEach(function (ex) {
      var line = el('div', 't-ex');
      var code = el('code', 't-ex-cmd'); code.textContent = ex.cmd;
      var d = el('span', 't-ex-desc'); d.textContent = '# ' + ex.desc;
      line.appendChild(code); line.appendChild(d);
      block.appendChild(line);
    });

    var link = el('a', 't-link');
    link.href = 'commands.html#cmd-' + slugify(c.name);
    link.textContent = '→ ouvrir la fiche complète dans l\'annuaire';
    block.appendChild(link);

    push(block);
  }

  // ── Recherche ────────────────────────────────────────────────
  // Correspondance « forte » : la ligne EST une commande connue, ou
  // commence par le nom exact d'une commande (ex. « tar -xzf … »).
  function strongMatch(q) {
    var best = null, bestScore = 0;
    for (var i = 0; i < COMMANDS.length; i++) {
      var name = COMMANDS[i].name.toLowerCase();
      var s = 0;
      if (q === name) s = 1000 + name.length;
      else if (q.indexOf(name + ' ') === 0) s = 800 + name.length; // plus le nom est long, plus il est précis
      if (s > bestScore) { bestScore = s; best = COMMANDS[i]; }
    }
    return best;
  }

  // Noms de commandes qui contiennent la saisie (pour suggestions)
  function nameMatches(q, limit) {
    var starts = [], contains = [];
    for (var i = 0; i < COMMANDS.length; i++) {
      var name = COMMANDS[i].name;
      var low = name.toLowerCase();
      var idx = low.indexOf(q);
      if (idx === 0) starts.push(name);
      else if (idx > 0) contains.push(name);
    }
    return starts.concat(contains).slice(0, limit || 8);
  }

  // ── Méta-commandes du terminal (help, clear, random, ls) ─────
  function runMeta(cmd, arg) {
    if (cmd === 'help' || cmd === '?') {
      note('Commandes du terminal :', 't-accent');
      note('  help              cette aide');
      note('  clear             efface l\'écran');
      note('  random            une commande au hasard');
      note('  ls                liste les 40 outils/OS disponibles');
      note('  ls <outil>        liste les commandes d\'un outil (ex: ls docker)');
      note('  <commande>        tape n\'importe quelle commande → sa fiche');
      note('Astuce : Tab complète · ↑/↓ rejoue l\'historique.', 't-dim');
      return true;
    }
    if (cmd === 'clear' || cmd === 'cls') { log.innerHTML = ''; return true; }
    if (cmd === 'random' || cmd === 'rand') {
      cmdBlock(COMMANDS[Math.floor(Math.random() * COMMANDS.length)]);
      return true;
    }
    if (cmd === 'ls' || cmd === 'dir') {
      if (arg) {
        var os = arg.trim().toLowerCase();
        var list = COMMANDS.filter(function (c) { return c.os === os; }).map(function (c) { return c.name; });
        if (!list.length) { note('ls: outil inconnu « ' + arg + ' » — tape « ls » pour la liste.', 't-err'); return true; }
        note((osMeta(os).label) + ' — ' + list.length + ' commandes :', 't-accent');
        chips(list);
      } else {
        var counts = {};
        COMMANDS.forEach(function (c) { counts[c.os] = (counts[c.os] || 0) + 1; });
        note('40 outils / OS — clique pour explorer (ou « ls <outil> ») :', 't-accent');
        chips(Object.keys(counts), null, 'ls ');
      }
      return true;
    }
    return false;
  }

  // ── Exécution d'une ligne ────────────────────────────────────
  function run(raw) {
    var line = raw.trim();
    if (!line) return;
    echo(line);

    var parts = line.split(/\s+/);
    var head = parts[0].toLowerCase();
    var rest = line.slice(parts[0].length).trim();

    // Méta d'abord (mais pas si une vraie commande porte ce nom, ex. « clear »
    // existe sous Windows — on privilégie la méta uniquement pour help/random/ls)
    if (runMeta(head, rest)) return;

    var q = line.toLowerCase();
    var strong = strongMatch(q);
    if (strong) { cmdBlock(strong); return; }

    // Pas de correspondance exacte : on propose des pistes
    var suggestions = nameMatches(q, 10);
    if (suggestions.length) {
      note('Pas de fiche pour « ' + line +' » — tu voulais peut-être :', 't-err');
      chips(suggestions);
    } else {
      note('Commande inconnue : « ' + line + ' ». Tape « help » ou « random ».', 't-err');
    }
  }

  // ── Suggestions live sous le champ (autocomplétion) ──────────
  var sugActive = -1;
  function refreshSuggest() {
    var q = input.value.trim().toLowerCase();
    sugActive = -1;
    if (q.length < 1) { sugBox.classList.remove('show'); sugBox.innerHTML = ''; return; }
    var names = nameMatches(q, 6);
    if (!names.length) { sugBox.classList.remove('show'); sugBox.innerHTML = ''; return; }
    sugBox.innerHTML = '';
    names.forEach(function (n) {
      var it = el('div', 't-sug-item');
      it.textContent = n;
      it.addEventListener('mousedown', function (e) {
        e.preventDefault(); // garde le focus sur l'input
        input.value = n;
        sugBox.classList.remove('show');
        run(n);
        input.value = '';
        refreshSuggest();
      });
      sugBox.appendChild(it);
    });
    sugBox.classList.add('show');
  }

  function moveSuggest(dir) {
    var items = sugBox.querySelectorAll('.t-sug-item');
    if (!items.length) return false;
    sugActive = (sugActive + dir + items.length) % items.length;
    items.forEach(function (it, i) { it.classList.toggle('active', i === sugActive); });
    return true;
  }

  // ── Entrées clavier ──────────────────────────────────────────
  input.addEventListener('input', refreshSuggest);

  input.addEventListener('keydown', function (e) {
    var items = sugBox.querySelectorAll('.t-sug-item');
    var sugOpen = sugBox.classList.contains('show') && items.length;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (sugOpen && sugActive >= 0) {          // valider la suggestion surlignée
        var chosen = items[sugActive].textContent;
        input.value = chosen;
      }
      var v = input.value;
      if (v.trim()) { history.unshift(v); histIdx = -1; }
      run(v);
      input.value = '';
      sugBox.classList.remove('show'); sugBox.innerHTML = '';
      return;
    }

    if (e.key === 'Tab') {                        // complète sur la 1re suggestion
      var names = nameMatches(input.value.trim().toLowerCase(), 1);
      if (names.length) { e.preventDefault(); input.value = names[0]; refreshSuggest(); }
      return;
    }

    if (e.key === 'ArrowDown') {
      if (sugOpen) { e.preventDefault(); moveSuggest(1); }
      return;
    }
    if (e.key === 'ArrowUp') {
      if (sugOpen && sugActive >= 0) { e.preventDefault(); moveSuggest(-1); return; }
      // sinon : navigue dans l'historique
      if (history.length) {
        e.preventDefault();
        histIdx = Math.min(histIdx + 1, history.length - 1);
        input.value = history[histIdx];
        sugBox.classList.remove('show');
      }
      return;
    }
    if (e.key === 'Escape') { sugBox.classList.remove('show'); sugActive = -1; }
  });

  // Cliquer n'importe où dans le terminal redonne le focus au champ
  $('termWindow').addEventListener('click', function (e) {
    if (!e.target.closest('a, button, .t-sug-item')) input.focus();
  });

  // Message d'accueil
  note('MANPAGES.EXE — terminal interactif  ·  1294 commandes indexées', 't-accent');
  note('Tape une commande (ex: tar -xzf archive.tar.gz) ou « help ».', 't-dim');
  input.focus();
})();
