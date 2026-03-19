/* egypte.js */

Registre.ajouterEvenement({
  id:      'egypte',
  epoque:  'antiquite',
  nom:     "L'Egypte ancienne",
  icone:   '𓂀',
  periode: '3100 av. J.-C. — 30 av. J.-C.',

  lecon: `
    lecon: `
  <h2>Une civilisation du Nil</h2>
  <p>L'Égypte ancienne est une des premières grandes civilisations de l'humanité.
  Elle naît vers <strong>3100 av. J.-C.</strong> avec l'unification de la Haute et de la Basse-Égypte.</p>

  <p>Cette civilisation se développe le long du <strong>Nil</strong>, un fleuve essentiel.
  Chaque année, ses crues déposent une terre fertile qui permet de cultiver
  dans un environnement désertique.</p>

  <h2>Le pharaon, un roi-dieu</h2>
  <p>L'Égypte est dirigée par un <strong>pharaon</strong>, considéré comme un dieu vivant.
  Il possède tous les pouvoirs : politique, militaire et religieux.</p>

  <p>Le pharaon organise la société, fait construire des monuments et rend la justice.</p>

  <h2>Une société organisée</h2>
  <p>La société égyptienne est hiérarchisée :</p>
  <ul>
    <li>Le pharaon</li>
    <li>Les prêtres et les scribes</li>
    <li>Les artisans et les paysans</li>
    <li>Les esclaves</li>
  </ul>

  <h2>Les pyramides et la vie après la mort</h2>
  <p>Les Égyptiens croient en la vie après la mort.
  Les pharaons font construire des <strong>pyramides</strong>, immenses tombeaux
  destinés à les accompagner dans l'au-delà.</p>

  <p>Les corps sont conservés grâce à la <strong>momification</strong>.</p>

  <h2>L'écriture</h2>
  <p>Les Égyptiens inventent une écriture : les <strong>hiéroglyphes</strong>.
  Elle est utilisée par les scribes et gravée sur les monuments.</p>

  <h2>La fin de l'Égypte ancienne</h2>
  <p>Cette civilisation dure près de <strong>3 000 ans</strong>.
  Elle prend fin en <strong>30 av. J.-C.</strong> lorsque l'Égypte est conquise par Rome.</p>
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
    {
  q: "Pourquoi le Nil est-il essentiel à l'Égypte ?",
  choix: [
    "Il sert de frontière",
    "Il apporte de l'eau et fertilise les terres",
    "Il protège des ennemis",
    "Il sert uniquement au commerce"
  ],
  reponse: 1,
  expl: "Les crues du Nil apportaient une terre fertile indispensable à l'agriculture."
},
{
  q: "Comment s'appelle la conservation des corps après la mort ?",
  choix: ["La crémation", "La momification", "L'enterrement", "La fossilisation"],
  reponse: 1,
  expl: "La momification permettait de préserver le corps pour la vie après la mort."
},
{
  q: "Qui savait lire et écrire en Égypte ?",
  choix: ["Tout le monde", "Les soldats", "Les scribes", "Les paysans"],
  reponse: 2,
  expl: "Les scribes étaient les seuls à maîtriser l'écriture."
},
  ],
});
