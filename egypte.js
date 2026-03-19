/* egypte.js */

Registre.ajouterEvenement({
  id:      'egypte',
  epoque:  'antiquite',
  nom:     "L'Égypte ancienne",
  icone:   '𓂀',
  periode: '3100 av. J.-C. — 30 av. J.-C.',

  lecon: `
    <p><strong>L'Égypte ancienne</strong> est une des premières grandes civilisations.
    Elle apparaît vers <strong>3100 av. J.-C.</strong> le long du Nil.</p>

    <p>Le <strong>Nil</strong> est essentiel : ses crues permettent de cultiver
    des terres fertiles dans un environnement désertique.</p>

    <p>L'Égypte est dirigée par un <strong>pharaon</strong>, considéré comme
    un dieu vivant. Il possède tous les pouvoirs.</p>

    <p>La société est organisée avec :
    les pharaons, les scribes, les artisans et les paysans.</p>

    <p>Les Égyptiens croient à la vie après la mort.
    Ils construisent des <strong>pyramides</strong> et pratiquent la
    <strong>momification</strong> pour conserver les corps.</p>

    <p>Ils utilisent une écriture : les <strong>hiéroglyphes</strong>,
    composée de symboles et de dessins.</p>

    <p>Cette civilisation dure environ <strong>3 000 ans</strong>
    jusqu'à la conquête romaine en <strong>30 av. J.-C.</strong></p>
  `,

  questions: [
    {
      q: "Qui dirigeait l'Égypte ancienne ?",
      hint: "Il était considéré comme un dieu vivant...",
      choix: ["Le président", "Le pharaon", "L'empereur", "Le roi des Gaulois"],
      reponse: 1,
      expl: "Le pharaon était le chef de l'Égypte et était considéré comme un dieu vivant."
    },
    {
      q: "Quel fleuve est essentiel à l'Égypte ?",
      choix: ["La Loire", "Le Nil", "Le Rhin", "Le Danube"],
      reponse: 1,
      expl: "Le Nil permettait de cultiver grâce à ses crues fertiles."
    },
    {
      q: "Pourquoi le Nil est-il important ?",
      choix: [
        "Il sert de frontière",
        "Il apporte de l'eau et rend la terre fertile",
        "Il protège des ennemis",
        "Il sert uniquement au transport"
      ],
      reponse: 1,
      expl: "Les crues du Nil apportaient une terre riche pour l'agriculture."
    },
    {
      q: "Comment s'appelle l'écriture des Égyptiens ?",
      choix: ["Alphabet latin", "Hiéroglyphes", "Runes", "Cunéiforme"],
      reponse: 1,
      expl: "Les hiéroglyphes sont une écriture composée de symboles."
    },
    {
      q: "Que construisaient les pharaons ?",
      choix: ["Des châteaux", "Des pyramides", "Des cathédrales", "Des arènes"],
      reponse: 1,
      expl: "Les pyramides sont des tombeaux pour les pharaons."
    },
    {
      q: "Pourquoi les Égyptiens momifiaient-ils les morts ?",
      choix: [
        "Pour les enterrer plus vite",
        "Pour les conserver pour la vie après la mort",
        "Pour les exposer",
        "Pour les brûler"
      ],
      reponse: 1,
      expl: "La momification permettait de préserver le corps pour l'au-delà."
    },
    {
      q: "Qui savait lire et écrire en Égypte ?",
      choix: ["Tout le monde", "Les soldats", "Les scribes", "Les paysans"],
      reponse: 2,
      expl: "Les scribes étaient les spécialistes de l'écriture."
    },
    {
      q: "Combien de temps a duré la civilisation égyptienne ?",
      choix: ["300 ans", "1 000 ans", "3 000 ans", "10 000 ans"],
      reponse: 2,
      expl: "Elle a duré environ 3 000 ans."
    }
  ],
});
