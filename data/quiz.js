// Banque de questions pour le Mode Défi Vocabulaire Express (Diagnostic rapide)
// Options professionnelles équilibrées en longueur et positions de réponse équitablement réparties (A, B, C, D)
const QUIZ_QUESTIONS = [
  {
    id: "qz_01",
    type: "concept",
    category: "strategie-marche",
    question: "Quelle est la différence fondamentale entre le Marché Total (TAM) et le Marché Prévisionnel (SOM) ?",
    options: [
      "Le TAM concerne l'ensemble des dépenses marketing globales d'un secteur, tandis que le SOM représente le budget publicité digital alloué par l'entreprise.",
      "Le TAM s'applique exclusivement aux ventes destinées aux particuliers (B2C), alors que le SOM caractérise les transactions inter-entreprises (B2B).",
      "Le TAM représente le potentiel théorique global du marché, tandis que le SOM est la part de marché réaliste et atteignable par vos ventes à court terme.",
      "Le TAM mesure la notoriété spontanée de la marque sur son marché national, tandis que le SOM quantifie le nombre total de visites sur son site web."
    ],
    correct: 2,
    explanation: "Le TAM (Total Addressable Market) est l'ensemble absolu des clients potentiels. Le SOM (Serviceable Obtainable Market) est la part de marché réaliste que votre équipe commerciale peut capter à court terme compte tenu de ses capacités."
  },
  {
    id: "qz_02",
    type: "concept",
    category: "inbound-visibilite",
    question: "En quoi consiste la stratégie d'Inbound Marketing par rapport à l'Outbound ?",
    options: [
      "Faire venir naturellement le prospect à soi en publiant des contenus experts et utiles, plutôt que de l'interrompre par des sollicitations commerciales directes.",
      "Acheter des bases d'adresses emails volumineuses auprès de courtiers de données pour automatiser des campagnes de prospection intensive à froid.",
      "Sous-traiter l'intégralité du développement commercial à un réseau d'agences partenaires sans investir dans la création de supports de marque.",
      "Mobiliser les forces de vente pour réaliser du démarchage téléphonique direct auprès de standards d'entreprises aux heures d'ouverture."
    ],
    correct: 0,
    explanation: "L'Inbound Marketing repose sur le principe de la permission et de l'attraction : créer et diffuser des contenus à forte valeur ajoutée (articles de blog, livres blancs, podcasts) qui répondent aux problématiques concrètes des prospects."
  },
  {
    id: "qz_03",
    type: "concept",
    category: "outbound-prospection",
    question: "Quelle est la caractéristique distinctive de l'ABM (Account-Based Marketing) ?",
    options: [
      "Diffuser des bannières publicitaires massives sur les moteurs de recherche pour attirer le plus grand nombre de visiteurs sans distinction sectorielle.",
      "Traiter un nombre restreint de comptes stratégiques comme des micromarchés uniques avec des plans d'actions ultra-personnalisés et concertés.",
      "Automatiser l'envoi d'un message standardisé unique à l'ensemble des contacts inscrits dans la base de données CRM de l'entreprise.",
      "Proposer systématiquement une réduction tarifaire de 50% sur l'ensemble du catalogue produit pour tout nouvel abonnement signé en ligne."
    ],
    correct: 1,
    explanation: "L'ABM renverse le funnel classique : au lieu de filtrer des milliers de pistes d'intérêt général, on sélectionne des comptes stratégiques prioritaires et on conçoit des campagnes sur-mesure pour chacun d'eux."
  },
  {
    id: "qz_04",
    type: "outils",
    category: "outbound-prospection",
    question: "Des solutions comme Lemlist, Salesloft, Waalaxy ou Emelia sont principalement dédiées à :",
    options: [
      "La conception graphique et le montage de vidéos promotionnelles pour les réseaux sociaux de divertissement grand public.",
      "La gestion comptable, l'émission des bulletins de paie et la déclaration fiscale automatisée auprès des organismes publics.",
      "L'hébergement physique de serveurs web souverains et la sécurisation des infrastructures cloud contre les cyberattaques.",
      "L'automatisation et le cadencement des séquences de prospection commerciale multicanale (emails, LinkedIn, rappels téléphoniques)."
    ],
    correct: 3,
    explanation: "Ces plateformes de Sales Automation permettent d'orchestrer, personnaliser et automatiser des séquences de prospection auprès de cibles professionnelles pour déclencher des prises de rendez-vous."
  },
  {
    id: "qz_05",
    type: "outils",
    category: "data-ia-martech",
    question: "À quoi sert une technologie de Reverse IP comme Albacross, GetQuanty ou Leadfeeder ?",
    options: [
      "À identifier les entreprises qui consultent votre site web via leur adresse IP publique pour détecter des signaux d'intérêt commercial.",
      "À crypter les données personnelles des internautes pour empêcher les moteurs de recherche d'indexer les pages du site web.",
      "À calculer la vitesse de chargement des serveurs informatiques et à simuler des pannes de réseau à titre préventif.",
      "À convertir automatiquement les devises internationales sur les plateformes de commerce électronique pour les achats en ligne."
    ],
    correct: 0,
    explanation: "Le Reverse IP analyse l'adresse IP publique des visiteurs pour la croiser avec des bases d'entreprises, révélant ainsi quels comptes professionnels s'intéressent discrètement à vos offres."
  },
  {
    id: "qz_06",
    type: "concept",
    category: "conversion-nurturing",
    question: "Quelle est la frontière exacte entre un MQL (Marketing Qualified Lead) et un SQL (Sales Qualified Lead) ?",
    options: [
      "Le MQL est un internaute qui consulte des contenus sans laisser de coordonnées, alors que le SQL a obligatoirement payé la facture de son premier achat.",
      "Le MQL est attribué automatiquement par les juristes de l'entreprise, tandis que le SQL est validé exclusivement par la direction des ressources humaines.",
      "Le MQL valide un engagement marketing (téléchargement, webinar), tandis que le SQL a fait l'objet d'une qualification commerciale (besoin, budget, projet validé).",
      "Il n'existe aucune distinction : ces deux sigles désignent indistinctement tout contact professionnel enregistré dans un fichier informatique."
    ],
    correct: 2,
    explanation: "Le MQL qualifie l'intérêt manifesté par le contact envers vos contenus. Le SQL confirme que ce prospect dispose d'un projet réel, d'un budget et d'un pouvoir de décision justifiant un traitement commercial direct."
  },
  {
    id: "qz_07",
    type: "concept",
    category: "conversion-nurturing",
    question: "En quoi consiste la démarche de 'Lead Nurturing' en B2B ?",
    options: [
      "Obliger chaque prospect à répondre quotidiennement à un questionnaire de satisfaction sous peine de clôturer son compte utilisateur.",
      "Maintenir une relation régulière et éducative avec des prospects non mûrs via des contenus ciblés jusqu'au déclenchement de leur projet d'achat.",
      "Rémunérer financièrement des apporteurs d'affaires externes pour chaque contact transmis sans vérification de sa pertinence sectorielle.",
      "Transférer l'ensemble des coordonnées des visiteurs du site vers une agence de recouvrement pour accélérer le traitement financier."
    ],
    correct: 1,
    explanation: "Nurturer signifie 'nourrir' la réflexion du prospect en lui apportant des informations à forte valeur ajoutée, afin de rester son premier choix naturel lorsqu'il sera prêt à acheter."
  },
  {
    id: "qz_08",
    type: "concept",
    category: "inbound-visibilite",
    question: "Qu'est-ce que le SGO / GEO (Generative Engine Optimization) dans l'acquisition moderne (2025+) ?",
    options: [
      "Une technique consistant à saturer les serveurs des moteurs de recherche avec des requêtes automatiques pour faire grimper les statistiques de visite.",
      "Un protocole de télécommunication sans fil permettant de géolocaliser physiquement les directeurs d'achats lors de salons professionnels.",
      "L'achat systématique d'espaces publicitaires télévisés aux heures de forte écoute pour développer la notoriété de marque institutionnelle.",
      "L'optimisation des contenus et des données structurées d'un site pour être cité et recommandé par les assistants IA (ChatGPT, Perplexity, Gemini)."
    ],
    correct: 3,
    explanation: "Le SGO / GEO est l'adaptation du référencement aux moteurs conversationnels : structurer des données fiables et vérifiables pour que les IA génératives vous citent en réponse aux requêtes des décideurs."
  },
  {
    id: "qz_09",
    type: "outils",
    category: "outbound-prospection",
    question: "Des plateformes comme Nomination, Corporama, Sparklane ou ZoomInfo sont exploitées en prospection pour :",
    options: [
      "Accéder à des bases de données de décideurs B2B qualifiées avec organigrammes, coordonnées vérifiées et signaux d'affaires récents.",
      "Gérer la paie des commerciaux et assurer le suivi des déclarations fiscales trimestrielles auprès de l'administration publique.",
      "Créer des maquettes graphiques et des interfaces logicielles pour des applications mobiles destinées au grand public.",
      "Sauvegarder les vidéos de surveillance physique des locaux industriels et des entrepôts de stockage logistique."
    ],
    correct: 0,
    explanation: "Ces solutions de Sales Intelligence fournissent aux équipes d'acquisition des données fiables sur les entreprises cibles (dirigeants, emails nominatifs, levées de fonds, recrutements récents)."
  },
  {
    id: "qz_10",
    type: "piege",
    category: "data-ia-martech",
    question: "Quelle différence distingue un 'Agent IA' d'un modèle d'IA générative standard (type ChatGPT en interface chat) ?",
    options: [
      "L'Agent IA nécessite obligatoirement l'installation d'un composant matériel physique directement soudé sur les ordinateurs des commerciaux.",
      "L'Agent IA planifie des actions, interagit avec des outils logiciels externes (CRM, web, API) et exécute des tâches complexes en autonomie.",
      "L'IA générative standard est payante pour chaque mot rédigé, tandis que l'Agent IA est obligatoirement un logiciel libre non commercial.",
      "Il n'existe aucune nuance technique : ces deux dénominations représentent de simples déclinaisons graphiques d'un tableur Excel partagé."
    ],
    correct: 1,
    explanation: "Tandis que l'IA générative répond textuellement à une invite unique, l'Agent IA dispose de boucle de décision et d'outils (APIs) pour exécuter une séquence d'actions complète dans l'écosystème MarTech."
  },
  {
    id: "qz_11",
    type: "concept",
    category: "strategie-marche",
    question: "Dans le cadre d'un plan Go-To-Market (GTM), que désigne précisément l'acronyme 'ICP' ?",
    options: [
      "Indicateur Commercial Périodique mesurant l'évolution trimestrielle des marges brutes de l'ensemble des filiales de l'entreprise.",
      "Interface de Contrôle Publicitaire permettant d'ajuster les enchères Google Ads en fonction de la météo locale et des cours de bourse.",
      "Ideal Customer Profile : description synthétique du profil d'entreprise parfait pour lequel votre solution apporte la plus forte valeur.",
      "Instance de Coordination Partagée réunissant obligatoirement les actionnaires financiers et les représentants du personnel d'une société."
    ],
    correct: 2,
    explanation: "L'ICP (Ideal Customer Profile) qualifie le profil d'entreprise cible optimal (taille, secteur, budget, maturité, problème aigu à résoudre) sur lequel concentrer vos efforts d'acquisition."
  },
  {
    id: "qz_12",
    type: "concept",
    category: "inbound-visibilite",
    question: "Quelle est la principale distinction de modèle économique et de temporalité entre le SEO et le SEA ?",
    options: [
      "Le SEO génère un flux d'audience organique durable sans paiement par clic, tandis que le SEA achète un trafic instantané qui cesse dès l'arrêt du budget.",
      "Le SEO est une prestation exclusivement réservée aux grandes entreprises cotées, alors que le SEA est réservé aux micro-entrepreneurs individuels.",
      "Le SEO impose un paiement fixe mensuel versé directement à l'État, tandis que le SEA est un dispositif de subvention publique pour la digitalisation.",
      "Le SEO s'applique uniquement aux recherches vocales sur assistants connectés, alors que le SEA fonctionne exclusivement sur les ordinateurs portables."
    ],
    correct: 0,
    explanation: "Le SEO (Search Engine Optimization) constitue un actif immatériel pérenne qui capitalise sur le contenu. Le SEA (Search Engine Advertising) est un levier payant à la performance (CPC) immédiat mais éphémère."
  },
  {
    id: "qz_13",
    type: "outils",
    category: "conversion-nurturing",
    question: "Des plateformes comme Plezi, HubSpot Marketing Hub, Webmecanik ou Marketo sont principalement exploitées pour :",
    options: [
      "Remplacer les serveurs de téléphonie fixe pour les communications privées des collaborateurs en télétravail.",
      "Éditer des partitions musicales et synchroniser des bandes sonores pour des spots de publicité radiophoniques.",
      "Orchestrer le Marketing Automation B2B, le tracking des comportements, le Lead Scoring et les scénarios de maturation de prospects.",
      "Créer des plans d'aménagement 3D pour les stands d'exposition lors de foires commerciales internationales."
    ],
    correct: 2,
    explanation: "Ces solutions de Marketing Automation constituent le socle de la maturation de leads : tracking des interactions web, scénarios d'emails personnalisés et scoring automatisé."
  },
  {
    id: "qz_14",
    type: "concept",
    category: "outbound-prospection",
    question: "Quel est l'objectif premier d'un programme d'Employee Advocacy en marketing B2B ?",
    options: [
      "Réduire la masse salariale en confiant la prospection commerciale à des prestataires indépendants non déclarés dans l'organigramme.",
      "Inciter et accompagner les collaborateurs pour qu'ils partagent leur expertise et incarnent la marque sur leurs réseaux professionnels (LinkedIn).",
      "Surveiller l'activité numérique privée des employés et bloquer l'accès aux réseaux sociaux sur les téléphones professionnels.",
      "Organiser des réunions obligatoires chaque matin pour faire réciter les slogans publicitaires institutionnels de la direction générale."
    ],
    correct: 1,
    explanation: "L'Employee Advocacy mobilise la voix authentique des collaborateurs (ingénieurs, experts, commerciaux) pour démultiplier la crédibilité et la portée de l'entreprise auprès de ses pairs."
  },
  {
    id: "qz_15",
    type: "piege",
    category: "conversion-nurturing",
    question: "Quelle est la règle ergonomique fondamentale relative aux formulaires de capture de leads en B2B ?",
    options: [
      "Plus un formulaire comporte de champs obligatoires, plus le volume de formulaires complétés augmente de manière proportionnelle.",
      "Les formulaires doivent systématiquement comporter au moins 15 questions détaillées pour décourager les visiteurs non décisionnaires.",
      "Le nombre de champs n'a strictement aucun impact sur le taux de conversion, seule la couleur du bouton de soumission compte.",
      "Chaque champ obligatoire additionnel ajoute une friction cognitive et fait généralement chuter le taux de conversion global du formulaire."
    ],
    correct: 3,
    explanation: "L'optimisation du taux de conversion (CRO) démontre qu'un formulaire court (3 à 4 champs clés) maximise les conversions. Les données complémentaires peuvent être enrichies automatiquement en arrière-plan."
  },
  {
    id: "qz_16",
    type: "concept",
    category: "data-ia-martech",
    question: "Que préconise le framework de prompt engineering 'COFRE' pour obtenir des résultats professionnels d'une IA ?",
    options: [
      "Structure rigoureusement la consigne autour de 5 piliers : Contexte, Objectif, Format, Rôle et Étape opérationnelle immédiate.",
      "Impose de toujours rédiger la demande en lettres majuscules en promettant une prime financière virtuelle au modèle de langage.",
      "Consiste à traduire automatiquement le texte en 10 langues successives avant de l'injecter dans l'interface de conversation de l'IA.",
      "Limite l'utilisation de l'intelligence artificielle aux calculs comptables automatisés sur des tableurs financiers fermés."
    ],
    correct: 0,
    explanation: "La méthode COFRE garantit un cadrage rigoureux : Contexte (situation), Objectif (résultat visé), Format (structure de sortie), Rôle (posture d'expert), Étape (première consigne actionnable)."
  },
  {
    id: "qz_17",
    type: "concept",
    category: "conversion-nurturing",
    question: "Comment se calcule avec précision le Taux de Conversion entre deux étapes successives d'un funnel d'acquisition ?",
    options: [
      "Multiplication du budget d'acquisition marketing par le nombre total de clics enregistrés sur la page d'accueil de l'entreprise.",
      "Division du chiffre d'affaires prévisionnel annuel par le nombre d'heures consacrées aux appels téléphoniques par les commerciaux.",
      "Rapport en pourcentage : (Nombre d'individus ayant franchi l'étape N ÷ Nombre total d'individus entrés à l'étape N-1) × 100.",
      "Soustraction du coût d'acquisition client (CAC) à la marge commerciale brute réalisée sur l'ensemble de l'exercice fiscal."
    ],
    correct: 2,
    explanation: "Le taux de conversion est le ratio (exprimé en %) mesurant le passage réussi des contacts d'une étape du cycle à la suivante (ex: 40 MQL devenus SQL sur 100 contacts entrés = 40% de conversion)."
  },
  {
    id: "qz_18",
    type: "concept",
    category: "outbound-prospection",
    question: "Dans la rédaction d'un message de prospection B2B, quelle démarche structure le framework de copywriting 'AIDA' ?",
    options: [
      "Accorder une remise commerciale immédiate de 20%, puis imposer une signature électronique sous un délai contraignant de 24 heures.",
      "Captiver l'Attention par une accroche pertinente, susciter l'Intérêt sur le problème du prospect, éveiller le Désir avec une preuve, et guider vers l'Action.",
      "Détailler exhaustivement l'organigramme de votre entreprise, lister les récompenses reçues, puis demander les coordonnées bancaires de l'interlocuteur.",
      "Adresser un avertissement juridique formel indiquant au prospect que son système informatique est obsolète et non conforme."
    ],
    correct: 1,
    explanation: "Le framework AIDA (Attention, Intérêt, Désir, Action) structure la psychologie de persuasion : capter l'attention sans détour, intéresser au problème client, donner envie par la solution et appeler à une action simple."
  },
  {
    id: "qz_19",
    type: "outils",
    category: "data-ia-martech",
    question: "Salesforce, HubSpot CRM, Pipedrive ou Ines CRM constituent la colonne vertébrale de l'acquisition pour :",
    options: [
      "Diffuser des flux vidéo en haute définition pour les salons professionnels virtuels organisés sur des serveurs externes.",
      "Remplacer les logiciels de messagerie bureautique en automatisant la suppression des courriels électroniques non lus sous 48 heures.",
      "Centraliser l'historique complet des interactions, assurer le suivi du pipeline commercial et coordonner les actions marketing et vente.",
      "Gérer le paiement des salaires et planifier les congés payés annuels de l'ensemble des collaborateurs de l'entreprise."
    ],
    correct: 2,
    explanation: "Le CRM (Customer Relationship Management) est l'outil central de mémoire et de pilotage : sans lui, les données prospects s'éparpillent et le suivi de vélocité du pipeline est impossible."
  },
  {
    id: "qz_20",
    type: "piege",
    category: "strategie-marche",
    question: "Dans une vente B2B complexe en ETI ou grand compte, quelle est la réalité du processus de décision d'achat ?",
    options: [
      "Le Directeur Général décide systématiquement de manière unilatérale en moins de 48 heures sans solliciter l'avis des directions métiers.",
      "La décision est exclusivement prise par les stagiaires de l'entreprise qui sélectionnent les logiciels sur la base de critères de divertissement.",
      "Le choix est systématiquement confié à un tirage au sort automatique réalisé sous contrôle d'un commissaire de justice indépendant.",
      "La décision implique un comité collégial (utilisateurs métiers, DSI pour la sécurité, DAF pour le ROI, juriste pour les risques, acheteur pour le prix)."
    ],
    correct: 3,
    explanation: "L'achat B2B complexe réunit en moyenne 5 à 7 parties prenantes aux intérêts divergents. L'acquisition doit produire des contenus adaptés aux exigences spécifiques de chaque membre du comité."
  }
];
