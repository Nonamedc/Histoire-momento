/* registre.js — Registre global des epoques et evenements */

const Registre = (() => {
  const _epoques    = {};
  const _evenements = {};

  function ajouterEpoque(ep) {
    _epoques[ep.id] = Object.assign({ evenements: [] }, ep);
  }

  function ajouterEvenement(ev) {
    _evenements[ev.id] = ev;
    if (_epoques[ev.epoque]) {
      _epoques[ev.epoque].evenements.push(ev);
    }
  }

  function getEpoques() {
    return Object.values(_epoques).sort((a, b) => a.ordre - b.ordre);
  }
  function getEpoque(id)    { return _epoques[id]    || null; }
  function getEvenement(id) { return _evenements[id] || null; }

  return { ajouterEpoque, ajouterEvenement, getEpoques, getEpoque, getEvenement };
})();

/* Declaration des epoques */
Registre.ajouterEpoque({ id: 'antiquite',   nom: 'Antiquite',     icone: '🏺', dates: '-3000 -> 476',  couleur: '#c9a227', ordre: 1 });
Registre.ajouterEpoque({ id: 'moyen-age',   nom: 'Moyen Age',     icone: '⚔️', dates: '476 -> 1492',   couleur: '#4a7a41', ordre: 2 });
Registre.ajouterEpoque({ id: 'renaissance', nom: 'Renaissance',   icone: '🎨', dates: '1450 -> 1600',  couleur: '#8b4a8b', ordre: 3 });
Registre.ajouterEpoque({ id: 'revolution',  nom: 'Revolutions',   icone: '🗽', dates: '1789 -> 1900',  couleur: '#c0392b', ordre: 4 });
Registre.ajouterEpoque({ id: 'xxeme',       nom: 'XXe siecle',    icone: '🌍', dates: '1900 -> 1991',  couleur: '#2c4a6e', ordre: 5 });
