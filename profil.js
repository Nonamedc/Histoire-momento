/* profil.js */

const Profil = (() => {
  const BADGES = [
    { id: 'premier_quiz',   icone: '⚔️', nom: 'Premier combat',   condition: function(j) { return Object.keys(j.quizFait).length >= 1; } },
    { id: 'premiere_lecon', icone: '📖', nom: 'Premier savoir',   condition: function(j) { return Object.keys(j.leconFaite).length >= 1; } },
    { id: 'parfait',        icone: '🏆', nom: 'Sans faute',        condition: function(j) { return Object.values(j.quizFait).some(function(q) { return q.score === q.total; }); } },
    { id: 'niveau5',        icone: '⭐', nom: 'Veteran',           condition: function(j) { return j.niveau >= 5; } },
    { id: 'collectionneur', icone: '🎁', nom: 'Collectionneur',   condition: function(j) { return j.boutique.length >= 3; } },
    { id: 'etoiles10',      icone: '🌟', nom: 'Eclat d etoiles',  condition: function(j) { return j.etoiles >= 10; } },
    { id: 'cinq_quiz',      icone: '📚', nom: 'Studieux',          condition: function(j) { return Object.keys(j.quizFait).length >= 5; } },
    { id: 'pieces100',      icone: '🪙', nom: 'Tresorier',         condition: function(j) { return j.pieces >= 100; } },
  ];

  function evaluerBadges(joueur) {
    BADGES.forEach(function(b) {
      if (!joueur.badges.includes(b.id) && b.condition(joueur)) {
        joueur.badges.push(b.id);
        try { localStorage.setItem('memento_joueur', JSON.stringify(joueur)); } catch (e) {}
        App.toast('🏅 Badge debloque : ' + b.nom + ' !');
      }
    });
  }

  function render() {
    var joueur = App.getJoueur();
    evaluerBadges(joueur);

    var totalQuiz   = Object.keys(joueur.quizFait).length;
    var totalLecons = Object.keys(joueur.leconFaite).length;
    var xpPour      = joueur.niveau * 100;
    var xpPct       = Math.min(100, Math.round((joueur.xp / xpPour) * 100));
    var allQuiz     = Object.values(joueur.quizFait);
    var totalQ      = allQuiz.reduce(function(s, q) { return s + q.total; }, 0);
    var totalB      = allQuiz.reduce(function(s, q) { return s + q.score; }, 0);
    var precision   = totalQ ? Math.round((totalB / totalQ) * 100) : 0;

    var html = '<div class="screen profil-wrapper">'
             + '<div class="page-header"><span class="page-ornament">✦ ✦ ✦</span><h2 class="page-title">Profil</h2><div class="page-divider"></div></div>'
             + '<div class="profil-hero">'
             + '<span class="profil-avatar">📚</span>'
             + '<div class="profil-name">Historien</div>'
             + '<div class="profil-level-line">Niveau ' + joueur.niveau + '</div>'
             + '<div class="profil-xp-bar-wrap"><div class="profil-xp-bar"><div class="profil-xp-fill" style="width:' + xpPct + '%"></div></div>'
             + '<div class="profil-xp-label">' + joueur.xp + ' / ' + xpPour + ' XP</div></div>'
             + '</div>'
             + '<p class="section-label">Statistiques</p>'
             + '<div class="profil-stats">'
             + '<div class="stat-card"><span class="stat-val">' + totalQuiz + '</span><span class="stat-label">Quiz faits</span></div>'
             + '<div class="stat-card"><span class="stat-val">' + precision + '%</span><span class="stat-label">Precision</span></div>'
             + '<div class="stat-card"><span class="stat-val">' + totalLecons + '</span><span class="stat-label">Lecons lues</span></div>'
             + '<div class="stat-card"><span class="stat-val">' + joueur.etoiles + '</span><span class="stat-label">Etoiles ⭐</span></div>'
             + '<div class="stat-card"><span class="stat-val">' + joueur.pieces + '</span><span class="stat-label">Pieces 🪙</span></div>'
             + '<div class="stat-card"><span class="stat-val">' + joueur.badges.length + '</span><span class="stat-label">Badges</span></div>'
             + '</div>'
             + '<p class="section-label">Badges</p><div class="badges-grid">';

    BADGES.forEach(function(b) {
      var gagne = joueur.badges.includes(b.id);
      html += '<div class="badge-item ' + (gagne ? 'earned' : 'locked') + '">'
            + '<span class="badge-icon">' + b.icone + '</span>'
            + '<div class="badge-name">' + b.nom + '</div>'
            + '</div>';
    });

    html += '</div>'
          + '<div style="text-align:center;margin-top:24px">'
          + '<button onclick="Profil.reinitialiser()" style="font-family:Crimson Text,serif;font-size:.8rem;color:rgba(200,170,100,0.3);background:none;border:1px solid rgba(160,120,50,0.1);border-radius:3px;padding:6px 14px;cursor:pointer;">Reinitialiser la progression</button>'
          + '</div></div>';

    document.getElementById('main').innerHTML = html;
  }

  function reinitialiser() {
    if (!confirm('Reinitialiser toute ta progression ?')) return;
    try { localStorage.removeItem('memento_joueur'); } catch (e) {}
    App.toast('Progression reinitialisee.');
    App.navigate('home');
  }

  return { render, reinitialiser };
})();
