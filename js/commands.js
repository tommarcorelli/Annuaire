/* MANPAGES.EXE — commands.js */

const OS_META = {
  universal:  { label: '★ Universel',   color: '#999999' },
  debian:     { label: 'Debian/Ubuntu', color: '#D70A53' },
  alpine:     { label: 'Alpine Linux',  color: '#0D597F' },
  arch:       { label: 'Arch Linux',    color: '#1793D1' },
  rhel:       { label: 'RHEL/Fedora',   color: '#EE0000' },
  freebsd:    { label: 'FreeBSD',       color: '#AB2B28' },
  macos:      { label: 'macOS',         color: '#A8A8A8' },
  windows:    { label: 'Windows',       color: '#0078D4' },
  'windows-server': { label: 'Windows Server', color: '#2f6fb3' },
  powershell: { label: 'PowerShell',    color: '#5391FE' },
  docker:     { label: 'Docker',        color: '#2496ED' },
  ansible:    { label: 'Ansible',       color: '#EE0000' },
  git:        { label: 'Git',           color: '#F05032' },
  kubectl:    { label: 'Kubernetes',    color: '#326CE5' },
  terraform:  { label: 'Terraform',     color: '#7B42BC' },
  vagrant:    { label: 'Vagrant',       color: '#1868F2' },
  nmap:       { label: 'Nmap',          color: '#4682B4' },
  tshark:     { label: 'Wireshark/tshark', color: '#1679A7' },
  helm:       { label: 'Helm',          color: '#0F1689' },
  awscli:     { label: 'AWS CLI',       color: '#FF9900' },
  azurecli:   { label: 'Azure CLI',     color: '#0078D4' },
  cisco:      { label: 'Cisco IOS',     color: '#049FD9' },
  proxmox:    { label: 'Proxmox VE',    color: '#E57000' },
  mysql:      { label: 'MySQL/MariaDB', color: '#4479A1' },
  nginx:      { label: 'Nginx',         color: '#009639' },
  openssl:    { label: 'OpenSSL/SSH',   color: '#8F1D14' },
  tcpdump:    { label: 'tcpdump',       color: '#3E6E93' },
  iptables:   { label: 'iptables/nft',  color: '#DA4E2B' },
  tmux:       { label: 'tmux',          color: '#1BB91F' },
  vim:        { label: 'Vim',           color: '#019733' },
  npm:        { label: 'npm/Node',      color: '#CB3837' },
  python:     { label: 'Python/pip',    color: '#3776AB' },
};

let activeOS  = 'all';
let activeCat = 'all';
let query     = '';
let favoritesOnly = false;

// ── RENDU PROGRESSIF ─────────────────────────────────────────
// Les cartes sont rendues par lots : les suivantes n'arrivent que
// quand on approche du bas de la page (IntersectionObserver).
var CHUNK_SIZE = 60;
var renderList = [];
var renderedCount = 0;
var gridSentinel = null;
var searchTimer = null;

// ── HISTORIQUE DE RECHERCHE ──────────────────────────────────
var HISTORY_MAX = 8;

function loadHistory() {
  try {
    var raw = localStorage.getItem('mpx-search-history');
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}
function saveHistory(arr) {
  try { localStorage.setItem('mpx-search-history', JSON.stringify(arr)); } catch(e) {}
}
function addToHistory(term) {
  if (!term || term.length < 2) return;
  var h = loadHistory().filter(function(t) { return t !== term; });
  h.unshift(term);
  if (h.length > HISTORY_MAX) h = h.slice(0, HISTORY_MAX);
  saveHistory(h);
}
function renderHistory(filter) {
  var histEl = document.getElementById('searchHistory');
  if (!histEl) return;
  var h = loadHistory();
  if (filter) h = h.filter(function(t) { return t.toLowerCase().indexOf(filter.toLowerCase()) !== -1 && t !== filter; });
  if (!h.length) { histEl.classList.remove('show'); return; }
  histEl.innerHTML = '';
  // En-tête
  var header = document.createElement('div');
  header.className = 'sh-header';
  header.innerHTML = '<span>Récent</span><button class="sh-clear" id="shClear">Tout effacer</button>';
  histEl.appendChild(header);
  h.forEach(function(term) {
    var item = document.createElement('div');
    item.className = 'sh-item';
    item.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>' +
      '<span class="sh-term">' + escapeHtml(term) + '</span>' +
      '<button class="sh-del" data-term="' + escapeHtml(term) + '">×</button>';
    histEl.appendChild(item);
  });
  histEl.classList.add('show');
}
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function hideHistory() {
  var histEl = document.getElementById('searchHistory');
  if (histEl) histEl.classList.remove('show');
}


function loadFavorites() {
  try {
    var raw = localStorage.getItem('mpx-favorites');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) { return new Set(); }
}
function saveFavorites(set) {
  try { localStorage.setItem('mpx-favorites', JSON.stringify(Array.from(set))); } catch (e) {}
}
var favorites = loadFavorites();

// ── SCÉNARIOS : index inversé commande → scénarios ───────────
// (SCENARIOS_DATA vient de scenarios-data.js ; noms exacts de data.js)
var CMD_SCENARIOS = {};
if (typeof SCENARIOS_DATA !== 'undefined') {
  SCENARIOS_DATA.forEach(function(sc) {
    (sc.cmds || []).forEach(function(n) {
      (CMD_SCENARIOS[n] = CMD_SCENARIOS[n] || []).push(sc);
    });
  });
}

function updateFavCount() {
  var el = document.getElementById('favCount');
  if (el) el.textContent = favorites.size;
}

function slugify(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function init() {
  // Compteurs dynamiques par OS
  var osCounts = {};
  COMMANDS.forEach(function(c) { osCounts[c.os] = (osCounts[c.os] || 0) + 1; });
  Object.keys(osCounts).forEach(function(os) {
    var el = document.getElementById('count-' + os);
    if (el) el.textContent = osCounts[os];
  });
  var allEl = document.getElementById('count-all');
  if (allEl) allEl.textContent = COMMANDS.length;

  // Filtre présélectionné via l'URL : commands.html?os=cisco
  var osParam = new URLSearchParams(location.search).get('os');
  if (osParam && OS_META[osParam]) {
    activeOS = osParam;
    var paramPill = document.querySelector('[data-os="' + osParam + '"]');
    if (paramPill) {
      document.querySelectorAll('[data-os]').forEach(function(p) { p.classList.remove('active'); });
      paramPill.classList.add('active');
    }
  }

  filter();
  updateFavCount();

  document.getElementById('searchInput').addEventListener('input', function() {
    query = this.value.toLowerCase().trim();
    renderHistory(this.value.trim());
    // Debounce : attend une pause dans la frappe avant de filtrer
    clearTimeout(searchTimer);
    searchTimer = setTimeout(filter, 150);
  });

  document.getElementById('searchInput').addEventListener('focus', function() {
    renderHistory(this.value.trim());
  });

  document.getElementById('searchInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim().length >= 2) {
      addToHistory(this.value.trim());
      hideHistory();
    }
  });

  // Délégation pour les items d'historique
  document.getElementById('searchHistory').addEventListener('click', function(e) {
    var item = e.target.closest('.sh-item');
    var del  = e.target.closest('.sh-del');
    var clear= e.target.closest('#shClear');
    if (clear) {
      saveHistory([]);
      hideHistory();
      return;
    }
    if (del) {
      e.stopPropagation();
      var term = del.dataset.term;
      var h = loadHistory().filter(function(t) { return t !== term; });
      saveHistory(h);
      renderHistory(document.getElementById('searchInput').value.trim());
      return;
    }
    if (item) {
      var termEl = item.querySelector('.sh-term');
      if (termEl) {
        var val = termEl.textContent;
        var inp = document.getElementById('searchInput');
        inp.value = val;
        query = val.toLowerCase();
        filter();
        hideHistory();
        inp.focus();
      }
    }
  });

  // Fermer l'historique en cliquant ailleurs
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-wrap')) hideHistory();
  });

  // ── BURGER MENU MOBILE ──────────────────────────────────────
  var burgerBtn = document.getElementById('burgerBtn');
  var sidebar   = document.querySelector('.sidebar');
  var overlay   = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', function() {
      if (sidebar.classList.contains('open')) closeSidebar();
      else openSidebar();
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  // Fermer la sidebar mobile après avoir sélectionné un filtre
  document.querySelectorAll('[data-os],[data-cat]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (window.innerWidth <= 860) closeSidebar();
    });
  });


  var favToggle = document.getElementById('favToggle');
  if (favToggle) {
    favToggle.addEventListener('click', function() {
      favoritesOnly = !favoritesOnly;
      favToggle.classList.toggle('active', favoritesOnly);
      filter();
    });
  }

  var printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function() {
      renderAll(); // imprime toute la sélection, pas juste les cartes visibles
      window.print();
    });
  }
  window.addEventListener('beforeprint', renderAll);

  // Bouton 🎲 : saute sur une carte au hasard parmi celles affichées
  var randomBtn = document.getElementById('randomBtn');
  if (randomBtn) {
    randomBtn.addEventListener('click', function() {
      if (!renderList.length) return;
      // Tire dans la liste complète (pas seulement les cartes déjà rendues)
      var pick = renderList[Math.floor(Math.random() * renderList.length)];
      var id = 'cmd-' + slugify(pick.name);
      ensureCardRendered(id);
      var card = document.getElementById(id);
      if (!card) return;
      document.querySelectorAll('.cmd-card.highlight').forEach(function(c) { c.classList.remove('highlight'); });
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('highlight');
      setTimeout(function() { card.classList.remove('highlight'); }, 2500);
    });
  }

  // Raccourci clavier : "/" ou Ctrl+K / Cmd+K pour focus la recherche
  document.addEventListener('keydown', function(e) {
    var tag = document.activeElement && document.activeElement.tagName;
    var inField = tag === 'INPUT' || tag === 'TEXTAREA';
    if ((e.key === '/' && !inField) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
    if (e.key === 'Escape' && inField) {
      addToHistory(document.getElementById('searchInput').value.trim());
      document.activeElement.blur();
      hideHistory();
    }
  });

  // Lien direct : si l'URL contient #cmd-xxx au chargement, on scrolle/surligne la carte
  if (location.hash && location.hash.indexOf('#cmd-') === 0) {
    setTimeout(function() {
      ensureCardRendered(location.hash.slice(1));
      var target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('highlight');
        setTimeout(function() { target.classList.remove('highlight'); }, 2500);
      }
    }, 300);
  }

  function bindOsFilter(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-os]');
      if (!btn) return;
      // Désactive tous les os-pill dans les deux listes
      document.querySelectorAll('[data-os]').forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      activeOS = btn.dataset.os;
      filter();
    });
  }
  bindOsFilter('osFilters');
  bindOsFilter('toolFilters');

  document.getElementById('catFilters').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    document.querySelectorAll('[data-cat]').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    filter();
  });
}

// ── RECHERCHE FLOUE ──────────────────────────────────────────
// Distance de Levenshtein : tolère les fautes de frappe (substitution,
// ajout, suppression d'1-2 caractères).
function levenshtein(a, b) {
  if (a === b) return 0;
  var al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  var prev = new Array(bl + 1);
  var curr = new Array(bl + 1);
  for (var j = 0; j <= bl; j++) prev[j] = j;
  for (var i = 1; i <= al; i++) {
    curr[0] = i;
    for (var k = 1; k <= bl; k++) {
      var cost = a[i - 1] === b[k - 1] ? 0 : 1;
      curr[k] = Math.min(prev[k] + 1, curr[k - 1] + 1, prev[k - 1] + cost);
    }
    var tmp = prev; prev = curr; curr = tmp;
  }
  return prev[bl];
}

// Score de pertinence d'un texte (haystack) pour une recherche (needle) :
// - correspondance exacte de sous-chaîne → score très élevé (plus la position
//   est proche du début, plus le score est haut)
// - sinon, correspondance en sous-séquence (lettres dans l'ordre, mais
//   pouvant sauter des caractères) → score moyen
// - sinon, tolérance aux fautes de frappe via Levenshtein sur les mots
//   du texte → score faible mais non nul
// Retourne -1 si aucune correspondance, même approximative.
function fuzzyScore(needle, haystack) {
  if (!needle) return 0;
  haystack = (haystack || '').toLowerCase();
  if (!haystack) return -1;

  var idx = haystack.indexOf(needle);
  if (idx !== -1) return 1000 - idx;

  // Sous-séquence : chaque caractère de needle doit apparaître dans l'ordre
  var hi = 0, score = 0, consecutive = 0, matched = true;
  for (var i = 0; i < needle.length; i++) {
    var pos = haystack.indexOf(needle[i], hi);
    if (pos === -1) { matched = false; break; }
    consecutive = (pos === hi) ? consecutive + 1 : 0;
    score += 2 + consecutive;
    hi = pos + 1;
  }
  if (matched && needle.length >= 2) return 200 + score;

  // Tolérance aux fautes de frappe : compare needle à chaque mot du texte
  if (needle.length >= 3) {
    var words = haystack.split(/[^a-z0-9]+/);
    var best = -1;
    for (var w = 0; w < words.length; w++) {
      var word = words[w];
      if (!word || Math.abs(word.length - needle.length) > 3) continue;
      var d = levenshtein(needle, word);
      var maxAllowed = needle.length <= 4 ? 1 : 2;
      if (d <= maxAllowed) {
        var s = 100 - d * 25;
        if (s > best) best = s;
      }
    }
    if (best > -1) return best;
  }

  return -1;
}

// Score combiné d'une commande pour une recherche, en pondérant les champs
// (le nom de la commande compte plus que les exemples par ex.)
function commandScore(c, q) {
  if (!q) return 0;
  var nameScore   = fuzzyScore(q, c.name);
  var descScore   = fuzzyScore(q, c.description);
  var syntaxScore = fuzzyScore(q, c.syntax);

  var exScore = -1;
  (c.examples || []).forEach(function(e) {
    var s = Math.max(fuzzyScore(q, e.cmd), fuzzyScore(q, e.desc));
    if (s > exScore) exScore = s;
  });

  var flagScore = -1;
  (c.flags || []).forEach(function(f) {
    var s = fuzzyScore(q, f);
    if (s > flagScore) flagScore = s;
  });

  var catScore = fuzzyScore(q, c.category);

  return Math.max(
    nameScore   >= 0 ? nameScore * 3 : -1,
    descScore   >= 0 ? descScore     : -1,
    syntaxScore >= 0 ? syntaxScore * 2 : -1,
    exScore,
    flagScore,
    catScore >= 0 ? catScore * 2 : -1
  );
}

function filter() {
  var results = COMMANDS.filter(function(c) {
    if (activeOS  !== 'all' && c.os !== activeOS)       return false;
    if (activeCat !== 'all' && c.category !== activeCat) return false;
    if (favoritesOnly && !favorites.has(c.name)) return false;
    return true;
  });

  if (query) {
    results = results
      .map(function(c) { return { c: c, score: commandScore(c, query) }; })
      .filter(function(r) { return r.score >= 0; })
      .sort(function(a, b) { return b.score - a.score; })
      .map(function(r) { return r.c; });
  }

  renderGrid(results);
  updateCount(results.length);
}

function updateCount(n) {
  var el = document.getElementById('sidebarCount');
  if (el) el.textContent = n;
  var rc = document.getElementById('resultCount');
  if (rc) rc.textContent = n + '/' + COMMANDS.length;
}

function renderGrid(commands) {
  var grid  = document.getElementById('commandGrid');
  var empty = document.getElementById('emptyState');
  grid.innerHTML = '';
  renderList = commands;
  renderedCount = 0;

  if (!commands.length) {
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  if (!window.IntersectionObserver) {
    appendChunk(commands.length); // vieux navigateurs : tout d'un coup
    return;
  }
  appendChunk(CHUNK_SIZE);
  initSentinel();
}

function appendChunk(size) {
  var grid = document.getElementById('commandGrid');
  var tpl  = document.getElementById('cardTemplate');
  var end  = Math.min(renderedCount + (size || CHUNK_SIZE), renderList.length);
  var frag = document.createDocumentFragment();
  for (var i = renderedCount; i < end; i++) {
    frag.appendChild(buildCard(renderList[i], tpl));
  }
  renderedCount = end;
  grid.appendChild(frag);
}

function renderAll() {
  if (renderedCount < renderList.length) {
    appendChunk(renderList.length - renderedCount);
  }
}

// Rend des lots jusqu'à ce que la carte demandée existe (lien direct,
// bouton aléatoire) ou que la liste soit épuisée.
function ensureCardRendered(id) {
  while (!document.getElementById(id) && renderedCount < renderList.length) {
    appendChunk(CHUNK_SIZE * 4);
  }
}

function initSentinel() {
  if (gridSentinel) return;
  gridSentinel = document.createElement('div');
  gridSentinel.style.height = '1px';
  document.getElementById('commandGrid').insertAdjacentElement('afterend', gridSentinel);
  new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) appendChunk();
  }, { rootMargin: '800px' }).observe(gridSentinel);
}

function buildCard(cmd, tpl) {
    var meta  = OS_META[cmd.os] || { label: cmd.os, color: '#c9a84c' };
    var clone = tpl.content.cloneNode(true);
    var card  = clone.querySelector('.cmd-card');

    card.style.setProperty('--os-color', meta.color);
    card.id = 'cmd-' + slugify(cmd.name);

    clone.querySelector('.cmd-name').textContent    = cmd.name;
    clone.querySelector('.cmd-desc').textContent    = cmd.description;
    clone.querySelector('.cmd-syntax').textContent  = cmd.syntax;

    var osBadge = clone.querySelector('.os-badge');
    osBadge.textContent = meta.label;
    osBadge.style.color = meta.color;
    osBadge.style.borderColor = meta.color + '66';

    clone.querySelector('.cat-badge').textContent = cmd.category;

    var quizBadge = clone.querySelector('.quiz-badge');
    if (quizBadge) quizBadge.href = 'quiz.html?os=' + encodeURIComponent(cmd.os);

    var exList = clone.querySelector('.examples-list');
    (cmd.examples || []).forEach(function(ex) {
      var item = document.createElement('div');
      item.className = 'example-item';
      var code = document.createElement('code');
      code.className = 'example-cmd';
      code.textContent = ex.cmd;
      var desc = document.createElement('span');
      desc.className = 'example-desc';
      desc.textContent = ex.desc;
      item.appendChild(code);
      item.appendChild(desc);
      exList.appendChild(item);
    });

    if (cmd.flags && cmd.flags.length) {
      var flagsBlock = clone.querySelector('.cmd-flags');
      flagsBlock.style.display = 'flex';
      var ul = clone.querySelector('.flags-list');
      cmd.flags.forEach(function(f) {
        var li = document.createElement('li');
        li.textContent = f;
        ul.appendChild(li);
      });
    }

    var favBtn = clone.querySelector('.fav-btn');
    if (favorites.has(cmd.name)) favBtn.classList.add('favorited');
    favBtn.addEventListener('click', function() {
      if (favorites.has(cmd.name)) {
        favorites.delete(cmd.name);
        favBtn.classList.remove('favorited');
      } else {
        favorites.add(cmd.name);
        favBtn.classList.add('favorited');
      }
      saveFavorites(favorites);
      updateFavCount();
      if (favoritesOnly) filter();
    });

    var linkBtn = clone.querySelector('.link-btn');
    linkBtn.addEventListener('click', function() {
      var url = location.origin + location.pathname + '#cmd-' + slugify(cmd.name);
      navigator.clipboard.writeText(url).then(function() {
        linkBtn.classList.add('copied');
        setTimeout(function() { linkBtn.classList.remove('copied'); }, 1500);
      });
    });

    var scList = CMD_SCENARIOS[cmd.name];
    if (scList && scList.length) {
      var scBlock = document.createElement('div');
      scBlock.className = 'cmd-scenarios';
      var scLabel = document.createElement('span');
      scLabel.className = 'block-label';
      scLabel.textContent = 'Apparaît dans';
      scBlock.appendChild(scLabel);
      var scLinks = document.createElement('div');
      scLinks.className = 'scenario-links';
      scList.forEach(function(sc) {
        var a = document.createElement('a');
        a.className = 'scenario-link';
        a.href = 'scenarios.html#' + sc.id;
        a.textContent = sc.icon + ' ' + sc.title;
        scLinks.appendChild(a);
      });
      scBlock.appendChild(scLinks);
      card.appendChild(scBlock);
    }

    var copyBtn = clone.querySelector('.copy-btn');
    var syntaxToCopy = cmd.syntax;
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(syntaxToCopy).then(function() {
        var lbl = copyBtn.querySelector('.copy-label');
        copyBtn.classList.add('copied');
        lbl.textContent = '✓ Copié !';
        setTimeout(function() {
          copyBtn.classList.remove('copied');
          lbl.textContent = 'Copier';
        }, 1500);
      });
    });

    return clone;
}

window.addEventListener('load', init);

// Le thème est géré par theme.js (partagé par toutes les pages).

// ── EXPORT / IMPORT DES FAVORIS ──────────────────────────────
// Même format que l'export "progression" de quiz.js (clé mpx-favorites),
// donc les deux fichiers sont interchangeables entre les pages.
(function() {
  function ioStatus(msg) {
    var el = document.getElementById('favIoStatus');
    if (!el) return;
    el.textContent = msg;
    setTimeout(function() { if (el.textContent === msg) el.textContent = ''; }, 4000);
  }

  var exportBtn = document.getElementById('exportFavBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      var raw = localStorage.getItem('mpx-favorites') || '[]';
      var data = { app: 'manpages.exe', date: new Date().toISOString(), values: { 'mpx-favorites': raw } };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'manpages-favoris-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(a.href);
      ioStatus('✓ Favoris exportés');
    });
  }

  var importBtn = document.getElementById('importFavBtn');
  var importFile = document.getElementById('importFavFile');
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
          var raw = data && data.values && data.values['mpx-favorites'];
          if (data.app !== 'manpages.exe' || typeof raw !== 'string') {
            ioStatus('✗ Fichier non reconnu');
            return;
          }
          localStorage.setItem('mpx-favorites', raw);
          favorites = loadFavorites();
          updateFavCount();
          if (favoritesOnly) filter();
          ioStatus('✓ Favoris importés (' + favorites.size + ')');
        } catch (err) {
          ioStatus('✗ JSON invalide');
        }
      };
      reader.readAsText(file);
    });
  }
})();
