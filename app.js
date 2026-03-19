/* app.js */

const App = (() => {

  const state = {
    screen: 'home',
    epoqueId: null,
    evenementId: null,
    quiz: { qi:0, score:0, answered:false, chosen:null, log:[], xpGagne:0, piecesGagne:0, etoilesGagne:0 }
  };

  /* ── JOUEUR ── */
  function joueurDefaut() {
    return { xp:0, niveau:1, pieces:0, etoiles:0, leconFaite:{}, quizFait:{}, badges:[], boutique:[] };
  }
  let joueur = (() => {
    try { return JSON.parse(localStorage.getItem('memento_joueur')) || joueurDefaut(); }
    catch(e) { return joueurDefaut(); }
  })();
  function sauver() { try { localStorage.setItem('memento_joueur', JSON.stringify(joueur)); } catch(e){} }

  function ajouterXP(v) {
    joueur.xp += v;
    if (joueur.xp >= joueur.niveau * 100) { joueur.xp -= joueur.niveau * 100; joueur.niveau++; toast('🎉 Niveau ' + joueur.niveau + ' !'); }
    sauver(); hud();
  }
  function ajouterPieces(v)  { joueur.pieces  += v; sauver(); hud(); }
  function ajouterEtoiles(v) { joueur.etoiles += v; sauver(); hud(); }

  /* ── HUD ── */
  function hud() {
    var max = joueur.niveau * 100;
    var pct = Math.min(100, Math.round(joueur.xp / max * 100));
    document.getElementById('level-badge').textContent = 'Nv.' + joueur.niveau;
    document.getElementById('xp-fill').style.width     = pct + '%';
    document.getElementById('xp-label').textContent    = joueur.xp + ' / ' + max + ' XP';
    document.getElementById('hud-coins').textContent   = '🪙 ' + joueur.pieces;
    document.getElementById('hud-stars').textContent   = '⭐ ' + joueur.etoiles;
  }

  function chrome(visible) {
    document.getElementById('topbar').classList.toggle('hidden', !visible);
    document.getElementById('bottomnav').classList.toggle('hidden', !visible);
  }

  function navActif(id) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    var b = document.getElementById('nav-' + id);
    if (b) b.classList.add('active');
  }

  function setMain(html) {
    document.getElementById('main').innerHTML = html;
  }

  /* ── NAVIGATE ── */
  function navigate(screen, params) {
    params = params || {};
    state.screen = screen;
    if (params.epoqueId)    state.epoqueId    = params.epoqueId;
    if (params.evenementId) state.evenementId = params.evenementId;

    chrome(screen !== 'lecon' && screen !== 'quiz');

    var map = { home:'home', epoque:'home', evenement:'home', lecon:'home', quiz:'home', 'quiz-results':'home', frise:'frise', boutique:'boutique', profil:'profil' };
    navActif(map[screen] || 'home');

    try {
      if      (screen === 'home')         renderHome();
      else if (screen === 'epoque')       renderEpoque();
      else if (screen === 'evenement')    renderEvenement();
      else if (screen === 'lecon')        renderLecon();
      else if (screen === 'quiz')         renderQuiz();
      else if (screen === 'quiz-results') renderResultats();
      else if (screen === 'frise'    && typeof Frise    !== 'undefined') Frise.render();
      else if (screen === 'boutique' && typeof Boutique !== 'undefined') Boutique.render();
      else if (screen === 'profil'   && typeof Profil   !== 'undefined') Profil.render();
    } catch(e) {
      setMain('<div style="padding:30px;color:#e88;font-family:monospace;font-size:12px;">Erreur : ' + e.message + '<br>' + e.stack + '</div>');
    }
  }

  /* ── HOME ── */
  function renderHome() {
    var epoques = Registre.getEpoques();

    var grid = '';
    epoques.forEach(function(ep) {
      var total = ep.evenements.length;
      var faits = ep.evenements.filter(function(e) { return joueur.quizFait[e.id]; }).length;
      var pct   = total ? Math.round(faits / total * 100) : 0;

      grid += '<button class="epoque-card" data-epoque="' + ep.id + '" style="border-top:3px solid ' + ep.couleur + ';width:100%;text-align:center;">'
            + '<div class="epoque-icon">' + ep.icone + '</div>'
            + '<div class="epoque-name" style="color:#f5e9c8">' + ep.nom + '</div>'
            + '<div class="epoque-dates">' + ep.dates + '</div>'
            + '<div class="epoque-progress"><div class="epoque-progress-fill" style="width:' + pct + '%;background:' + ep.couleur + '"></div></div>'
            + '<div class="epoque-count">' + faits + '/' + total + '</div>'
            + '</button>';
    });

    setMain(
      '<div style="padding:16px;">'
      + '<div class="home-logo">'
      + '<h1 class="home-logo-title">Memento</h1>'
      + '<p class="home-logo-sub">Souviens-toi du passe</p>'
      + '<span class="home-logo-ornament">✦ ✦ ✦</span>'
      + '</div>'
      + '<p class="section-label">Choisir une epoque</p>'
      + '<div class="epoque-grid">' + grid + '</div>'
      + '</div>'
    );

    /* Event delegation - evite les inline onclick avec quotes */
    document.querySelectorAll('.epoque-card[data-epoque]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        navigate('epoque', { epoqueId: btn.getAttribute('data-epoque') });
      });
    });
  }

  /* ── EPOQUE ── */
  function renderEpoque() {
    var ep = Registre.getEpoque(state.epoqueId);
    if (!ep) { navigate('home'); return; }

    var list = '';
    ep.evenements.forEach(function(ev) {
      var lFait = joueur.leconFaite[ev.id];
      var qFait = joueur.quizFait[ev.id];
      list += '<button class="event-card" data-ev="' + ev.id + '" style="border-left-color:' + ep.couleur + ';width:100%;text-align:left;">'
            + '<span class="event-icon">' + ev.icone + '</span>'
            + '<div class="event-info">'
            + '<div class="event-name">' + ev.nom + '</div>'
            + '<div class="event-period">' + ev.periode + '</div>'
            + '<div class="event-status">'
            + '<span class="status-pill ' + (lFait ? 'done' : 'new') + '">📖 Lecon' + (lFait ? ' ✓' : '') + '</span>'
            + '<span class="status-pill ' + (qFait ? 'done' : lFait ? 'new' : 'locked') + '">⚔️ Quiz' + (qFait ? ' ✓' : lFait ? '' : ' 🔒') + '</span>'
            + '</div></div>'
            + '<span class="event-arrow">›</span>'
            + '</button>';
    });

    setMain(
      '<div style="padding:16px;">'
      + '<button id="btn-back-home" class="back-btn">← Accueil</button>'
      + '<div class="page-header">'
      + '<span class="page-ornament">✦ ✦ ✦</span>'
      + '<h2 class="page-title">' + ep.icone + ' ' + ep.nom + '</h2>'
      + '<p class="page-subtitle">' + ep.dates + '</p>'
      + '<div class="page-divider" style="background:' + ep.couleur + '"></div>'
      + '</div>'
      + '<div class="event-list">' + list + '</div>'
      + '</div>'
    );

    document.getElementById('btn-back-home').addEventListener('click', function() { navigate('home'); });
    document.querySelectorAll('.event-card[data-ev]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        navigate('evenement', { evenementId: btn.getAttribute('data-ev') });
      });
    });
  }

  /* ── EVENEMENT ── */
  function renderEvenement() {
    var ev = Registre.getEvenement(state.evenementId);
    if (!ev) { navigate('home'); return; }
    var ep = Registre.getEpoque(ev.epoque);
    var couleur = ep ? ep.couleur : '#b8860b';
    var lFait   = !!joueur.leconFaite[ev.id];

    setMain(
      '<div style="padding:16px;">'
      + '<button id="btn-back-ep" class="back-btn">← ' + (ep ? ep.nom : 'Retour') + '</button>'
      + '<div class="event-hero">'
      + '<span class="event-hero-icon">' + ev.icone + '</span>'
      + '<h2 class="event-hero-title">' + ev.nom + '</h2>'
      + '<p class="event-hero-period">' + ev.periode + '</p>'
      + '<div class="event-hero-bar" style="background:linear-gradient(to right,transparent,' + couleur + ',transparent)"></div>'
      + '</div>'
      + '<div class="event-actions">'
      + '<button id="btn-lecon" class="action-card lecon" style="cursor:pointer;">'
      + '<span class="action-icon">📖</span>'
      + '<div class="action-title">Lecon</div>'
      + '<div class="action-desc">Lis et apprends</div>'
      + '<div class="action-reward"><span class="reward-pill">+20 XP</span><span class="reward-pill">🪙 +5</span></div>'
      + '</button>'
      + '<button id="btn-quiz" class="action-card quiz ' + (lFait ? '' : 'locked') + '" style="cursor:pointer;">'
      + '<span class="action-icon">' + (lFait ? '⚔️' : '🔒') + '</span>'
      + '<div class="action-title">Quiz</div>'
      + '<div class="action-desc">Teste-toi</div>'
      + (lFait
          ? '<div class="action-reward"><span class="reward-pill">+50 XP</span><span class="reward-pill">🪙 +15</span><span class="reward-pill">⭐ +1</span></div>'
          : '<div class="action-lock">Lis la lecon d\'abord</div>')
      + '</button>'
      + '</div></div>'
    );

    document.getElementById('btn-back-ep').addEventListener('click', function() { navigate('epoque', { epoqueId: ev.epoque }); });
    document.getElementById('btn-lecon').addEventListener('click', function() { navigate('lecon'); });
    document.getElementById('btn-quiz').addEventListener('click', function() {
      if (lFait) navigate('quiz');
      else toast('Lis la lecon pour debloquer le quiz !');
    });
  }

  /* ── LECON ── */
  function renderLecon() {
    var ev = Registre.getEvenement(state.evenementId);
    if (!ev) { navigate('home'); return; }
    var contenu = ev.lecon || '<p class="lecon-placeholder">✦ Lecon a venir... ✦</p>';

    setMain(
      '<div class="lecon-wrapper">'
      + '<button id="btn-back-ev" class="back-btn">← ' + ev.nom + '</button>'
      + '<div class="lecon-card">'
      + '<div class="lecon-title">' + ev.nom + '</div>'
      + '<div class="lecon-period">' + ev.periode + '</div>'
      + '<div class="lecon-divider"></div>'
      + '<div class="lecon-body">' + contenu + '</div>'
      + '<div class="lecon-btn-wrap">'
      + '<button id="btn-valider" class="lecon-validate-btn">J\'ai lu — Continuer →</button>'
      + '</div></div></div>'
    );

    document.getElementById('btn-back-ev').addEventListener('click', function() { navigate('evenement'); });
    document.getElementById('btn-valider').addEventListener('click', function() { validerLecon(); });
  }

  function validerLecon() {
    var ev = Registre.getEvenement(state.evenementId);
    if (!joueur.leconFaite[ev.id]) {
      joueur.leconFaite[ev.id] = true;
      sauver(); ajouterXP(20); ajouterPieces(5);
      toast('📖 Lecon validee ! +20 XP +5 🪙');
    }
    navigate('evenement');
  }

  /* ── QUIZ ── */
  function renderQuiz() {
    var ev = Registre.getEvenement(state.evenementId);
    if (!ev || !ev.questions || !ev.questions.length) {
      setMain('<div style="padding:30px;text-align:center;color:rgba(200,170,100,0.5);font-family:Crimson Text,serif;font-style:italic;">✦ Questions a venir... ✦<br><br><button id="btn-back-nq" class="back-btn">← Retour</button></div>');
      document.getElementById('btn-back-nq').addEventListener('click', function() { navigate('evenement'); });
      return;
    }

    var q       = ev.questions[state.quiz.qi];
    var total   = ev.questions.length;
    var pct     = Math.round(state.quiz.qi / total * 100);
    var letters = ['A','B','C','D'];

    var choixHtml = '';
    q.choix.forEach(function(ch, i) {
      var cls = '', emoji = '';
      if (state.quiz.answered) {
        if (i === q.reponse)                              { cls = state.quiz.chosen === i ? 'correct' : 'revealed'; emoji = '✓'; }
        else if (i === state.quiz.chosen)                 { cls = 'wrong'; emoji = '✗'; }
        cls += ' answered';
      }
      choixHtml += '<button class="choice-btn ' + cls + '" data-idx="' + i + '">'
                 + '<span class="choice-letter">' + letters[i] + '</span>'
                 + '<span>' + ch + '</span>'
                 + (emoji ? '<span class="choice-emoji">' + emoji + '</span>' : '')
                 + '</button>';
    });

    var feedbackHtml = '';
    if (state.quiz.answered) {
      var bon     = state.quiz.chosen === q.reponse;
      var dernier = state.quiz.qi >= total - 1;
      feedbackHtml = '<div class="feedback-box ' + (bon ? 'good' : 'bad') + '">'
                   + (bon ? '<strong>✦ Excellent !</strong>' : '<strong>✗ Pas tout a fait...</strong>')
                   + ' ' + (q.expl || '') + '</div>'
                   + '<button id="btn-next" class="next-btn">' + (dernier ? 'Voir les resultats →' : 'Question suivante →') + '</button>';
    }

    setMain(
      '<div class="quiz-wrapper">'
      + '<div class="quiz-topbar">'
      + '<button id="btn-quit-quiz" class="back-btn" style="margin:0;border:none">←</button>'
      + '<span class="quiz-topbar-icon">' + ev.icone + '</span>'
      + '<div class="quiz-topbar-info"><div class="quiz-topbar-title">' + ev.nom + '</div><div class="quiz-topbar-count">' + (state.quiz.qi+1) + ' / ' + total + '</div></div>'
      + '<div class="quiz-progress"><div class="quiz-progress-fill" style="width:' + pct + '%"></div></div>'
      + '</div>'
      + '<div class="question-card"><p class="question-text">' + q.q + '</p>'
      + (q.hint ? '<span class="question-hint">' + q.hint + '</span>' : '')
      + '</div>'
      + '<div class="choices">' + choixHtml + '</div>'
      + feedbackHtml
      + '</div>'
    );

    document.getElementById('btn-quit-quiz').addEventListener('click', function() { navigate('evenement'); });

    if (!state.quiz.answered) {
      document.querySelectorAll('.choice-btn').forEach(function(btn) {
        btn.addEventListener('click', function() { repondre(parseInt(btn.getAttribute('data-idx'))); });
      });
    } else {
      var btnNext = document.getElementById('btn-next');
      if (btnNext) {
        var dernier2 = state.quiz.qi >= total - 1;
        btnNext.addEventListener('click', function() { if (dernier2) terminerQuiz(); else questionSuivante(); });
      }
    }
  }

  function repondre(i) {
    if (state.quiz.answered) return;
    var ev = Registre.getEvenement(state.evenementId);
    var q  = ev.questions[state.quiz.qi];
    state.quiz.answered = true;
    state.quiz.chosen   = i;
    if (i === q.reponse) state.quiz.score++;
    state.quiz.log.push({ chosen:i, correct:q.reponse });
    renderQuiz();
  }

  function questionSuivante() {
    state.quiz.qi++;
    state.quiz.answered = false;
    state.quiz.chosen   = null;
    renderQuiz();
  }

  function terminerQuiz() {
    var ev    = Registre.getEvenement(state.evenementId);
    var total = ev.questions.length;
    var score = state.quiz.score;
    joueur.quizFait[ev.id] = { score:score, total:total };
    sauver();
    state.quiz.xpGagne      = 20 + score * 10;
    state.quiz.piecesGagne  = 5  + score * 3;
    state.quiz.etoilesGagne = score === total ? 3 : score >= Math.ceil(total * .8) ? 2 : score >= Math.ceil(total * .5) ? 1 : 0;
    ajouterXP(state.quiz.xpGagne);
    ajouterPieces(state.quiz.piecesGagne);
    ajouterEtoiles(state.quiz.etoilesGagne);
    navigate('quiz-results');
  }

  /* ── RESULTATS ── */
  function renderResultats() {
    var ev    = Registre.getEvenement(state.evenementId);
    var total = ev.questions.length;
    var score = state.quiz.score;
    var pct   = Math.round(score / total * 100);
    var seal  = pct === 100 ? '🏆' : pct >= 80 ? '🥇' : pct >= 60 ? '📜' : '🕯️';
    var verd  = pct === 100 ? 'Parfait !' : pct >= 80 ? 'Excellent !' : pct >= 60 ? 'Bien ! Quelques revisions.' : 'Continuez vos efforts !';

    var revue = state.quiz.log.map(function(item, i) {
      var q  = ev.questions[i];
      var ok = item.chosen === item.correct;
      return '<div style="margin-bottom:8px;padding:10px;border-left:3px solid ' + (ok ? '#4caf50' : '#8b1a1a') + ';background:rgba(255,255,255,0.03);font-family:Crimson Text,serif;color:#f5e9c8;font-size:.9rem;">'
           + '<div style="font-weight:600">' + (ok ? '✓' : '✗') + ' ' + q.q + '</div>'
           + '<div style="font-style:italic;color:rgba(200,170,100,.5);font-size:.82rem">' + (ok ? 'Bonne reponse !' : 'Reponse : ' + q.choix[item.correct]) + '</div>'
           + '</div>';
    }).join('');

    setMain(
      '<div class="results-wrapper">'
      + '<span class="results-seal">' + seal + '</span>'
      + '<h2 class="results-title">' + ev.nom + '</h2>'
      + '<p class="results-verdict"><em>' + verd + '</em></p>'
      + '<div class="score-circle"><span class="score-big">' + score + '</span><span class="score-total">/ ' + total + '</span></div>'
      + '<div class="rewards-earned">'
      + '<div class="reward-earned"><span class="reward-earned-icon">⚡</span><div class="reward-earned-val">+' + state.quiz.xpGagne + '</div><div class="reward-earned-label">XP</div></div>'
      + '<div class="reward-earned"><span class="reward-earned-icon">🪙</span><div class="reward-earned-val">+' + state.quiz.piecesGagne + '</div><div class="reward-earned-label">Pieces</div></div>'
      + '<div class="reward-earned"><span class="reward-earned-icon">⭐</span><div class="reward-earned-val">+' + state.quiz.etoilesGagne + '</div><div class="reward-earned-label">Etoiles</div></div>'
      + '</div>'
      + '<div style="margin-bottom:20px">' + revue + '</div>'
      + '<div class="results-actions">'
      + '<button id="btn-retry" class="btn-primary">↺ Recommencer</button>'
      + '<button id="btn-back-res" class="btn-secondary">‹ Retour</button>'
      + '</div></div>'
    );

    document.getElementById('btn-retry').addEventListener('click', function() {
      state.quiz = { qi:0, score:0, answered:false, chosen:null, log:[], xpGagne:0, piecesGagne:0, etoilesGagne:0 };
      navigate('quiz');
    });
    document.getElementById('btn-back-res').addEventListener('click', function() { navigate('evenement'); });
  }

  /* ── TOAST ── */
  function toast(msg) {
    var el = document.createElement('div');
    el.className   = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 2500);
  }

  /* ── INIT ── */
  function init() {
    hud();
    navigate('home');
  }

  return {
    navigate: navigate,
    toast: toast,
    init: init,
    getJoueur: function() { return joueur; },
    getState:  function() { return state; }
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { App.init(); });
} else {
  App.init();
}
