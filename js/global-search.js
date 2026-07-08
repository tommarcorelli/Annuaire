/* MANPAGES.EXE — global-search.js
   Recherche globale de l'accueil : commandes + paquets + scénarios.
   Les données (data.js, data-extra.js, packages-data.js ≈ 440 Ko) ne
   sont chargées qu'au premier focus du champ, pour garder l'accueil
   léger. */

(function() {
  'use strict';

  var input = document.getElementById('gsInput');
  var box   = document.getElementById('gsResults');
  if (!input || !box) return;

  // Index des scénarios : chargé à la demande avec le reste
  // (scenarios-data.js — source unique partagée avec l'annuaire)

  var loaded  = false;
  var loading = false;
  var lastQ   = '';
  var activeIdx = -1;

  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    s.onerror = cb; // en cas d'échec, la recherche montrera ce qu'elle a
    document.head.appendChild(s);
  }

  function ensureData() {
    if (loaded || loading) return;
    loading = true;
    loadScript('data.js', function() {
      loadScript('data-extra.js', function() {
        loadScript('packages-data.js', function() {
          loadScript('scenarios-data.js', function() {
            loaded = true;
            loading = false;
            if (lastQ.trim().length >= 2) render(lastQ);
            else box.classList.remove('show');
          });
        });
      });
    });
  }

  function slugify(name) {
    return name.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Score simple : préfixe > sous-chaîne (plus tôt = mieux), -1 sinon
  function score(q, txt) {
    if (!txt) return -1;
    var i = txt.toLowerCase().indexOf(q);
    if (i === 0) return 100;
    if (i > 0) return 60 - Math.min(i, 40);
    return -1;
  }

  function best(q, primary, secondary) {
    var sP = score(q, primary);
    var sS = score(q, secondary);
    return Math.max(sP >= 0 ? sP + 40 : -1, sS);
  }

  function item(href, name, desc) {
    var a = document.createElement('a');
    a.className = 'gs-item';
    a.href = href;
    var n = document.createElement('span');
    n.className = 'gs-name';
    n.textContent = name;
    var d = document.createElement('span');
    d.className = 'gs-desc';
    d.textContent = desc;
    a.appendChild(n);
    a.appendChild(d);
    return a;
  }

  function section(label) {
    var h = document.createElement('div');
    h.className = 'gs-head';
    h.textContent = label;
    return h;
  }

  function top(list, n) {
    return list.sort(function(a, b) { return b.s - a.s; }).slice(0, n);
  }

  function render(qRaw) {
    var q = qRaw.toLowerCase().trim();
    activeIdx = -1;
    box.innerHTML = '';

    var cmds = [], pkgs = [], scs = [];

    (typeof COMMANDS !== 'undefined' ? COMMANDS : []).forEach(function(c) {
      var s = best(q, c.name, c.description);
      if (s >= 0) cmds.push({ s: s, v: c });
    });
    (typeof PACKAGES !== 'undefined' ? PACKAGES : []).forEach(function(p) {
      var s = best(q, p.name, p.desc);
      if (s >= 0) pkgs.push({ s: s, v: p });
    });
    (typeof SCENARIOS_DATA !== 'undefined' ? SCENARIOS_DATA : []).forEach(function(sc) {
      var s = best(q, sc.title, sc.kw);
      if (s >= 0) scs.push({ s: s, v: sc });
    });

    if (!cmds.length && !pkgs.length && !scs.length) {
      box.innerHTML = '<div class="gs-empty">// aucun résultat — essaie l\'annuaire et sa recherche floue</div>';
      box.classList.add('show');
      return;
    }

    if (cmds.length) {
      box.appendChild(section('⌘ Commandes'));
      top(cmds, 6).forEach(function(r) {
        box.appendChild(item(
          'commands.html#cmd-' + slugify(r.v.name),
          r.v.name,
          r.v.description
        ));
      });
    }
    if (pkgs.length) {
      box.appendChild(section('📦 Paquets'));
      top(pkgs, 3).forEach(function(r) {
        box.appendChild(item(
          'packages.html?q=' + encodeURIComponent(r.v.name),
          r.v.name,
          r.v.desc
        ));
      });
    }
    if (scs.length) {
      box.appendChild(section('🧭 Scénarios'));
      top(scs, 3).forEach(function(r) {
        box.appendChild(item('scenarios.html#' + r.v.id, r.v.title, 'guide pas-à-pas'));
      });
    }

    box.classList.add('show');
  }

  function hide() {
    box.classList.remove('show');
    activeIdx = -1;
  }

  function items() { return box.querySelectorAll('.gs-item'); }

  function setActive(idx) {
    var els = items();
    if (!els.length) return;
    activeIdx = (idx + els.length) % els.length;
    els.forEach(function(el, i) { el.classList.toggle('active', i === activeIdx); });
    els[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('focus', ensureData);

  input.addEventListener('input', function() {
    lastQ = this.value;
    if (lastQ.trim().length < 2) { hide(); return; }
    if (!loaded) {
      ensureData();
      box.innerHTML = '<div class="gs-empty">// chargement de l\'index…</div>';
      box.classList.add('show');
      return;
    }
    render(lastQ);
  });

  input.addEventListener('keydown', function(e) {
    var els = items();
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
    else if (e.key === 'Enter' && els.length) {
      e.preventDefault();
      location.href = els[activeIdx >= 0 ? activeIdx : 0].href;
    }
    else if (e.key === 'Escape') { hide(); input.blur(); }
  });

  // "/" ou Ctrl+K depuis n'importe où sur la page
  document.addEventListener('keydown', function(e) {
    var tag = document.activeElement && document.activeElement.tagName;
    var inField = tag === 'INPUT' || tag === 'TEXTAREA';
    if ((e.key === '/' && !inField) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.gsearch')) hide();
  });
})();
