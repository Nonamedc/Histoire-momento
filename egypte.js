/* egypte.js */

Registre.ajouterEvenement({
  id:      'egypte',
  epoque:  'antiquite',
  nom:     "L'Egypte ancienne",
  icone:   '𓂀',
  periode: '3100 av. J.-C. — 30 av. J.-C.',

  lecon: `
    <p>L'Egypte ancienne est l'une des plus vieilles civilisations du monde.
    Elle s'est developpee le long du <strong>Nil</strong>, un grand fleuve
    dont les crues fertiles permettaient de cultiver les terres du desert.</p>

    <p>L'Egypte etait dirigee par un <strong>pharaon</strong>, considere comme
    un dieu vivant sur Terre. Les pharaons faisaient construire d'immenses
    tombeaux : les <strong>pyramides</strong>.</p>

    <p>Les Egyptiens avaient invente leur propre ecriture :
    les <strong>hieroglyphes</strong>, de petits dessins graves sur les murs
    des temples et des tombeaux.</p>

    <p>La civilisation egyptienne a dure pres de <strong>3 000 ans</strong>,
    jusqu'a la conquete par Rome en 30 av. J.-C.</p>
  `,

  questions: [
    {
      q:       "Qui dirigeait l'Egypte ancienne ?",
      hint:    "Il etait considere comme un dieu vivant...",
      choix:   ["Le president", "Le pharaon", "L'empereur", "Le roi des Gaulois"],
      reponse: 1,
      expl:    "Le pharaon etait le roi de l'Egypte ancienne, considere comme un dieu vivant par son peuple."
    },
    {
      q:       "Quel fleuve traverse l'Egypte ?",
      choix:   ["La Loire", "L'Amazone", "Le Nil", "Le Rhin"],
      reponse: 2,
      expl:    "Le Nil est le grand fleuve d'Egypte. Ses crues annuelles apportaient une terre tres fertile."
    },
    {
      q:       "Comment s'appelle l'ecriture des anciens Egyptiens ?",
      choix:   ["L'alphabet latin", "Les hieroglyphes", "Le cuneiforme", "Les runes"],
      reponse: 1,
      expl:    "Les hieroglyphes sont les symboles qui constituaient l'ecriture de l'Egypte ancienne."
    },
    {
      q:       "Que construisaient les pharaons comme tombeaux ?",
      choix:   ["Des chateaux", "Des cathedrales", "Des pyramides", "Des ziggourats"],
      reponse: 2,
      expl:    "Les pyramides sont d'immenses tombeaux construits pour les pharaons."
    },
    {
      q:       "Combien de temps a dure la civilisation egyptienne ?",
      choix:   ["300 ans", "1 000 ans", "3 000 ans", "10 000 ans"],
      reponse: 2,
      expl:    "La civilisation egyptienne a dure pres de 3 000 ans, jusqu'a la conquete romaine en 30 av. J.-C."
    },
  ],
});
