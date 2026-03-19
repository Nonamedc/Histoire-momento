/* frise.js */

const Frise = (() => {
  const ETOILES_REQUISES = 5;
  const NB_CARTES        = 5;

  const EVENEMENTS_FRISE = [
    { id: 'f_egypte',     nom: "Unification de l'Egypte",    annee: -3100, icone: '𓂀' },
    { id: 'f_grece_demo', nom: 'Naissance de la democratie', annee: -507,  icone: '🏛️' },
    { id: 'f_cesar',      nom: 'Conquete de la Gaule',       annee: -52,   icone: '⚔️' },
    { id: 'f_rome_chute', nom: 'Chute de Rome',              annee: 476,   icone: '🏚️' },
    { id: 'f_charlemagne',nom: 'Sacre de Charlemagne',       annee: 800,   icone: '👑' },
    { id: 'f_croisades',  nom: 'Premiere Croisade',          annee: 1096,  icone: '✝️' },
    { id: 'f_jeanne',     nom: "Liberation d'Orleans",       annee: 1429,  icone: '⚔️' },
    { id: 'f_colomb',     nom: "Decouverte de l'Amerique",   annee: 1492,  icone: '⛵' },
    { id: 'f_revolution', nom: 'Revolution francaise',       annee: 1789,  icone: '🗽' },
    { id: 'f_napoleon',   nom: 'Sacre de Napoleon',          annee: 1804,  icone: '🎖️' },
    { id: 'f_ww1',        nom: 'Grande Guerre',              annee: 1914,  icone: '🪖' },
    { id: 'f_ww2',        nom: 'Seconde Guerre mondiale',    annee: 1939,  icone: '✡️' },
    { id: 'f_berlin',     nom: 'Chute du mur de Berlin',     annee: 1989,  icone: '🧱' },
  ];

  var mode     = null;
  var pige     = [];
  var slots    = [];
  var selected = null;

  function piger() {
    var melange = EVENEMENTS_FRISE.slice().sort(function() { return Math.random() - 0.5; });
    return melange.slice(0, NB_CARTES);
  }

  function render() {
    var joueur   = App.getJoueur();
    var debloque = joueur.etoiles >= ETOILES_REQUISES;

    if (mode === 'jeu') { renderJeu(); return; }

    var html = '<div class="screen frise-wrapper">'
             + '<div class="page-header"><span class="page-ornament">✦ ✦ ✦</span><h2 class="page-title">La Frise</h2><p class="page-subtitle">Replace les evenements dans l\'ordre</p><div class="page-divider"></div></div>'
             + '<div class="frise-intro">'
             + '<span class="frise-intro-icon">📜</span>'
             + '<p class="frise-intro-text">' + NB_CARTES + ' evenements s\'affichent en desordre.<br/>Replace-les dans le bon ordre chronologique !</p>'
             + '<div class="frise-stars-required">⭐ ' + joueur.etoiles + ' / ' + ETOILES_REQUISES + ' etoiles requises</div>';

    if (debloque) {
      html += '<button class="frise-play-btn" onclick="Frise.commencer()">✦ Commencer la Frise ✦</button>';
    } else {
      html += '<div style="margin-top:14px;font-family:Crimson Text,serif;font-style:italic;font-size:.85rem;color:rgba(200,170,100,0.35);">Gagne des etoiles en reussissant les quiz pour debloquer la Frise.</div>';
    }

    html += '</div></div>';
    document.getElementById('main').innerHTML = html;
  }

  function commencer() {
    mode = 'jeu'; pige = piger(); slots = new Array(pige.length).fill(null); selected = null;
    renderJeu();
  }

  function renderJeu() {
    var html = '<div class="screen frise-wrapper">'
             + '<button class="back-btn" onclick="Frise.quitter()">← Quitter</button>'
             + '<p class="frise-instruction">Clique un evenement puis clique une position sur la frise.</p>'
             + '<div class="frise-timeline">';

    for (var i = 0; i < pige.length; i++) {
      var placed = slots[i];
      html += '<div class="frise-slot" onclick="Frise.placerDans(' + i + ')" id="slot-' + i + '">'
            + (placed
                ? '<div class="frise-event-card" style="margin:0;cursor:default">' + placed.icone + ' ' + placed.nom + '</div>'
                : '<span class="frise-slot-label">Position ' + (i + 1) + '</span>')
            + '</div>';
    }

    html += '</div><p class="section-label" style="margin-top:16px">Evenements a placer</p><div class="frise-cards">';

    pige.forEach(function(ev) {
      if (slots.indexOf(ev) !== -1) return;
      var actif = selected && selected.id === ev.id;
      html += '<div class="frise-event-card" style="' + (actif ? 'border-color:var(--gold);box-shadow:0 0 12px rgba(184,134,11,0.4)' : '') + '" onclick="Frise.selectionner(\'' + ev.id + '\')">'
            + ev.icone + ' ' + ev.nom + '</div>';
    });

    html += '</div><button class="frise-play-btn" style="background:linear-gradient(135deg,var(--red),#5a1010);border-color:#6b1414;margin-top:14px" onclick="Frise.valider()">✓ Valider l\'ordre</button></div>';

    document.getElementById('main').innerHTML = html;
  }

  function selectionner(id) {
    selected = pige.find(function(e) { return e.id === id; }) || null;
    renderJeu();
  }

  function placerDans(i) {
    if (!selected) { App.toast('Selectionne d\'abord un evenement !'); return; }
    slots[i] = selected;
    selected  = null;
    renderJeu();
  }

  function valider() {
    if (slots.some(function(s) { return !s; })) { App.toast('Place tous les evenements !'); return; }
    var anneesSlots    = slots.map(function(s) { return s.annee; });
    var anneesCorr     = pige.slice().sort(function(a, b) { return a.annee - b.annee; }).map(function(e) { return e.annee; });
    var bonnes = 0;
    anneesSlots.forEach(function(a, i) { if (a === anneesCorr[i]) bonnes++; });
    mode = null;
    renderResultats(bonnes, pige.length);
  }

  function renderResultats(bonnes, total) {
    var pct     = Math.round((bonnes / total) * 100);
    var etoiles = bonnes === total ? 3 : bonnes >= Math.ceil(total * 0.6) ? 2 : bonnes > 0 ? 1 : 0;
    var seal    = bonnes === total ? '🏆' : pct >= 60 ? '📜' : '🕯️';
    var verdict = bonnes === total ? 'Ordre parfait ! Tu es un vrai historien.' : pct >= 60 ? 'Bonne memoire ! Quelques erreurs.' : 'La chronologie s\'apprend ! Reessaie.';
    var xpGagne = 30 + bonnes * 15;
    var joueur  = App.getJoueur();
    joueur.xp      += xpGagne;
    joueur.etoiles += etoiles;
    try { localStorage.setItem('memento_joueur', JSON.stringify(joueur)); } catch (e) {}

    var html = '<div class="screen results-wrapper">'
             + '<span class="results-seal">' + seal + '</span>'
             + '<h2 class="results-title">Frise terminee</h2>'
             + '<p class="results-verdict"><em>' + verdict + '</em></p>'
             + '<div class="score-circle"><span class="score-big">' + bonnes + '</span><span class="score-total">/ ' + total + '</span></div>'
             + '<div class="rewards-earned">'
             + '<div class="reward-earned"><span class="reward-earned-icon">⚡</span><div class="reward-earned-val">+' + xpGagne + '</div><div class="reward-earned-label">XP</div></div>'
             + '<div class="reward-earned"><span class="reward-earned-icon">⭐</span><div class="reward-earned-val">+' + etoiles + '</div><div class="reward-earned-label">Etoiles</div></div>'
             + '</div>'
             + '<div class="results-actions">'
             + '<button class="btn-primary" onclick="Frise.commencer()">↺ Rejouer</button>'
             + '<button class="btn-secondary" onclick="App.navigate(\'frise\')">Accueil Frise</button>'
             + '</div></div>';

    document.getElementById('main').innerHTML = html;
  }

  function quitter() {
    mode = null; selected = null; pige = []; slots = [];
    App.navigate('frise');
  }

  return { render, commencer, selectionner, placerDans, valider, quitter };
})();
