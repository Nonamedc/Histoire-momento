/* boutique.js */

const Boutique = (() => {
  const ARTICLES = [
    { id: 'avatar_chevalier', categorie: 'Avatars', icone: '🏰', nom: 'Chevalier',        desc: 'Un noble defenseur',     prix: 50  },
    { id: 'avatar_pharaon',   categorie: 'Avatars', icone: '𓂀', nom: 'Pharaon',           desc: "Maitre de l'Egypte",    prix: 80  },
    { id: 'avatar_napoleon',  categorie: 'Avatars', icone: '🎖️', nom: 'General',           desc: 'Stratege legendaire',    prix: 120 },
    { id: 'theme_nuit',       categorie: 'Themes',  icone: '🌙', nom: 'Nuit profonde',      desc: 'Interface sombre',       prix: 100 },
    { id: 'bonus_hint',       categorie: 'Bonus',   icone: '💡', nom: 'Indice',             desc: 'Eliminer un mauvais choix', prix: 30 },
  ];

  function render() {
    var joueur = App.getJoueur();
    var cats   = ['Avatars', 'Themes', 'Bonus'];
    var html   = '<div class="screen boutique-wrapper">'
               + '<div class="page-header"><span class="page-ornament">✦ ✦ ✦</span><h2 class="page-title">Boutique</h2><div class="page-divider"></div></div>'
               + '<div class="boutique-balance">'
               + '<div class="balance-card"><span class="balance-icon">🪙</span><div class="balance-val">' + joueur.pieces + '</div><div class="balance-label">Pieces</div></div>'
               + '<div class="balance-card"><span class="balance-icon">⭐</span><div class="balance-val">' + joueur.etoiles + '</div><div class="balance-label">Etoiles</div></div>'
               + '</div>';

    cats.forEach(function(cat) {
      var items = ARTICLES.filter(function(a) { return a.categorie === cat; });
      html += '<p class="boutique-section-title">' + cat + '</p><div class="boutique-grid">';
      items.forEach(function(a) {
        var possede = joueur.boutique.includes(a.id);
        html += '<div class="boutique-item ' + (possede ? 'owned' : '') + '">'
              + '<span class="boutique-item-icon">' + a.icone + '</span>'
              + '<div class="boutique-item-name">' + a.nom + '</div>'
              + '<div class="boutique-item-desc">' + a.desc + '</div>'
              + '<div class="boutique-item-price">' + (possede ? '✓ Possede' : '🪙 ' + a.prix) + '</div>'
              + '<button class="boutique-buy-btn ' + (possede ? 'owned-btn' : '') + '" '
              + (possede ? 'disabled' : 'onclick="Boutique.acheter(\'' + a.id + '\')"') + '>'
              + (possede ? 'Deja achete' : 'Acheter')
              + '</button></div>';
      });
      html += '</div>';
    });

    html += '</div>';
    document.getElementById('main').innerHTML = html;
  }

  function acheter(id) {
    var joueur  = App.getJoueur();
    var article = ARTICLES.find(function(a) { return a.id === id; });
    if (!article || joueur.boutique.includes(id)) return;
    if (joueur.pieces < article.prix) { App.toast('Pas assez de pieces !'); return; }
    joueur.pieces -= article.prix;
    joueur.boutique.push(id);
    try { localStorage.setItem('memento_joueur', JSON.stringify(joueur)); } catch (e) {}
    App.toast('✓ ' + article.nom + ' achete !');
    render();
  }

  return { render, acheter };
})();
