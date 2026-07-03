/* MANPAGES.EXE — packages-ui.js */

var OS_ORDER = ['debian','alpine','arch','rhel','freebsd','macos','windows','winserver'];
var OS_LABELS = {
  debian:    'Debian/Ubuntu',
  alpine:    'Alpine',
  arch:      'Arch',
  rhel:      'RHEL/Fedora',
  freebsd:   'FreeBSD',
  macos:     'macOS',
  windows:   'Windows',
  winserver: 'Windows Server'
};
var OS_COLORS = {
  debian:    '#D70A53',
  alpine:    '#0D597F',
  arch:      '#1793D1',
  rhel:      '#EE0000',
  freebsd:   '#AB2B28',
  macos:     '#A8A8A8',
  windows:   '#0078D4',
  winserver: '#2f6fb3'
};

var activeOS  = new Set(OS_ORDER);
var activeCat = 'all';
var query     = '';

function getVisibleOS() {
  return OS_ORDER.filter(function(os) { return activeOS.has(os); });
}

function renderHead() {
  var tr = document.getElementById('pkgTableHead');
  // Clear colonnes OS (garde la 1ère colonne "Paquet")
  while (tr.children.length > 1) tr.removeChild(tr.lastChild);
  getVisibleOS().forEach(function(os) {
    var th = document.createElement('th');
    th.className = 'col-os';
    th.style.borderBottom = '3px solid ' + OS_COLORS[os];
    th.innerHTML = '<span class="os-dot" style="background:' + OS_COLORS[os] + '"></span>' + OS_LABELS[os];
    tr.appendChild(th);
  });
}

function renderTable(packages) {
  var tbody = document.getElementById('pkgTableBody');
  var empty = document.getElementById('pkgEmpty');
  tbody.innerHTML = '';

  if (!packages.length) {
    document.getElementById('pkgTableWrap').style.display = 'none';
    empty.style.display = 'flex';
    return;
  }
  document.getElementById('pkgTableWrap').style.display = 'block';
  empty.style.display = 'none';

  var visOS = getVisibleOS();

  packages.forEach(function(pkg) {
    var tr = document.createElement('tr');

    // Colonne nom + description
    var tdPkg = document.createElement('td');
    tdPkg.className = 'col-pkg';
    tdPkg.innerHTML =
      '<div class="pkg-name">' + escHtml(pkg.name) + '</div>' +
      '<div class="pkg-desc">' + escHtml(pkg.description) + '</div>' +
      '<div class="pkg-cat-badge">' + escHtml(pkg.category) + '</div>';
    tr.appendChild(tdPkg);

    // Colonnes OS
    visOS.forEach(function(os) {
      var td  = document.createElement('td');
      td.className = 'col-cmd';
      var cmd = pkg.os[os];
      if (cmd) {
        td.innerHTML =
          '<div class="pkg-cmd-wrap">' +
            '<code class="pkg-cmd">' + escHtml(cmd) + '</code>' +
            '<button class="pkg-copy-btn" data-cmd="' + escHtml(cmd) + '" title="Copier">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>' +
            '</button>' +
          '</div>';
      } else {
        td.innerHTML = '<span class="pkg-na">—</span>';
        td.classList.add('pkg-unavail');
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function escHtml(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function filter() {
  var results = PACKAGES.filter(function(p) {
    if (activeCat !== 'all' && p.category !== activeCat) return false;
    if (query) {
      var hay = [p.name, p.description, p.category]
        .concat(p.tags || []).join(' ').toLowerCase();
      if (hay.indexOf(query) === -1) return false;
    }
    return true;
  });
  renderHead();
  renderTable(results);
  var count = document.getElementById('pkgCount');
  if (count) count.textContent = results.length + '/' + PACKAGES.length;
  var sc = document.getElementById('pkgSidebarCount');
  if (sc) sc.textContent = results.length;
}

// ── INIT ────────────────────────────────────────────────────────
window.addEventListener('load', function() {
  filter();

  // Recherche
  document.getElementById('pkgSearch').addEventListener('input', function() {
    query = this.value.toLowerCase().trim();
    filter();
  });

  // Raccourci /
  document.addEventListener('keydown', function(e) {
    var tag = document.activeElement && document.activeElement.tagName;
    var inField = tag === 'INPUT' || tag === 'TEXTAREA';
    if (e.key === '/' && !inField) {
      e.preventDefault();
      document.getElementById('pkgSearch').focus();
    }
    if (e.key === 'Escape' && inField) document.activeElement.blur();
  });

  // Filtres catégories
  document.getElementById('catFilters').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    document.querySelectorAll('[data-cat]').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    filter();
  });

  // Toggles OS
  document.getElementById('osToggles').addEventListener('change', function(e) {
    var os = e.target.dataset.os;
    if (!os) return;
    if (e.target.checked) activeOS.add(os);
    else activeOS.delete(os);
    filter();
  });

  // Copier commande
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.pkg-copy-btn');
    if (!btn) return;
    var cmd = btn.dataset.cmd;
    navigator.clipboard.writeText(cmd).then(function() {
      btn.classList.add('copied');
      setTimeout(function() { btn.classList.remove('copied'); }, 1500);
    });
  });
});

// ── THEME TOGGLE ────────────────────────────────────────────────
(function() {
  var html = document.documentElement;
  var saved = localStorage.getItem('mpx-theme');
  if (saved) html.setAttribute('data-theme', saved);

  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var current = html.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('mpx-theme', next);
  });
})();
