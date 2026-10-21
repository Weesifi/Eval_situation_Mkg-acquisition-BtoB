// Mises en situation professionnelles niveau Bachelor pour l'évaluation de lancement de cours
// Note pédagogique :
// 1. Les distracteurs sont de vrais pièges professionnels réalistes (souvent plus longs et très élaborés).
// 2. La bonne réponse n'est PAS la plus longue (dans plus de 70% des cas, un piège est plus long).
// 3. La bonne réponse est équitablement répartie sur les positions A, B, C et D.
const SCENARIOS_DATA = [
  {
    id: "mission-1-gtm",
    title: "Mission 1 : Le Décollage du SaaS (Cadrage & Go-To-Market)",
    client: "DataFlow (Startup SaaS B2B - Plateforme d'automatisation financière)",
    role: "Chargé(e) d'Acquisition Marketing Junior",
    context: "Vous venez d'être recruté(e) chez DataFlow. La startup lance une solution qui automatise la réconciliation bancaire pour les PME et ETI. Le DG réunit l'équipe pour lancer la stratégie commerciale.",
    questions: [
      {
        id: "q1_1",
        stage: "Étape 1 : Dimensionnement du Marché",
        dilemma: "Le Directeur Général affirme en réunion : 'En France, il y a 140 000 PME et ETI. Notre logiciel coûte 1 000 €/mois. Donc notre marché prévisionnel pour l'année 1 est de 1,68 milliard d'euros !'. En tant que marketeur Bachelor, que lui répondez-vous ?",
        options: [
          {
            text: "Ce calcul est cohérent sur le plan comptable, mais il omet d'intégrer les remises commerciales d'usage et la déduction de la TVA applicable aux prestations de services B2B.",
            correct: false,
            feedback: "Attention : l'erreur n'est ni fiscale ni commerciale. Le DG confond la taille théorique maximale du marché avec l'objectif de chiffre d'affaires atteignable pour une première année."
          },
          {
            text: "C'est exact pour un lancement national : le marché prévisionnel (SOM) correspond à l'ensemble des entreprises cibles multiplié par notre abonnement annuel standard.",
            correct: false,
            feedback: "Piège fréquent ! 1,68 Md€ correspond au TAM (Total Addressable Market) théorique mondial/national, et non au SOM (Serviceable Obtainable Market) qui est la part réellement capturable à court terme."
          },
          {
            text: "Ce chiffre correspond à notre TAM. Notre marché prévisionnel (SOM) doit être calculé selon notre SAM accessible et notre capacité commerciale réelle de signature en année 1.",
            correct: true,
            feedback: "Parfait ! Vous maîtrisez la distinction rigoureuse entre TAM, SAM et SOM. Le marché prévisionnel doit tenir compte de la force de frappe réelle des commerciaux et du cycle d'adoption."
          },
          {
            text: "Pour valider rigoureusement ce montant de 1,68 Md€, il convient d'abord de modéliser les 5 forces de Porter, d'évaluer le taux d'attrition prévisionnel (churn) du secteur et de vérifier que le coût d'acquisition client (CAC) n'excède pas 35% de la valeur vie client (LTV) estimée sur 36 mois.",
            correct: false,
            feedback: "Le PESTEL, Porter et le ratio CAC/LTV sont des notions avancées réelles, mais elles ne corrigent pas la confusion fondamentale du DG entre marché global théorique (TAM) et volume d'affaires de l'an 1 (SOM)."
          }
        ],
        linkedTerms: ["tam-sam-som", "btob-btobtob", "segmentation", "gtm"],
        skillPoints: { "strategie-marche": 25, "conversion-nurturing": 5 }
      },
      {
        id: "q1_2",
        stage: "Étape 2 : Cadrage du Go-To-Market (GTM)",
        dilemma: "Pour construire le plan Go-To-Market de ce nouveau logiciel, par quel enchaînement logique devez-vous démarrer ?",
        options: [
          {
            text: "Définir l'ICP → Valider le cas d'usage & la proposition de valeur → Sélectionner les canaux d'acquisition prioritaires → Concevoir le messaging → Fixer les KPI.",
            correct: true,
            feedback: "Exactement ! C'est la séquence méthodique d'un Go-To-Market B2B : on verrouille la cible (ICP) et la proposition de valeur avant de choisir les canaux de diffusion et d'engager le budget."
          },
          {
            text: "Allouer immédiatement 60% du budget d'acquisition sur les campagnes Google Ads (SEA) et LinkedIn Ads sur des mots-clés génériques, analyser les volumes de clics générés, puis rédiger une proposition de valeur sur-mesure pour chaque cohorte de visiteurs enregistrée dans l'outil d'analyse.",
            correct: false,
            feedback: "Piège classique de l'opérationnel précipité ! Acheter du trafic payant sans positionnement ni proposition de valeur clairement validés revient à dilapider le budget d'acquisition."
          },
          {
            text: "Concevoir une campagne d'emailing de masse vers 20 000 adresses d'entreprises non filtrées → Recueillir les retours d'inscriptions → Segmenter le marché selon les répondants.",
            correct: false,
            feedback: "Le cold mailing massif non qualifié détruit la réputation de délivrabilité de votre nom de domaine et témoigne d'un manque criant de ciblage stratégique préalable."
          },
          {
            text: "Développer une présence active sur l'ensemble des réseaux sociaux (LinkedIn, TikTok, X, YouTube) → Créer du contenu généraliste → Attendre d'identifier les segments les plus engagés.",
            correct: false,
            feedback: "Se disperser sur tous les canaux sans ICP précis épuise les ressources de l'équipe marketing sans garantir la moindre adéquation avec les acheteurs professionnels prioritaires."
          }
        ],
        linkedTerms: ["gtm", "segmentation", "valeur-percue", "campagne-prospection"],
        skillPoints: { "strategie-marche": 25, "inbound-visibilite": 10 }
      },
      {
        id: "q1_3",
        stage: "Étape 3 : Le Comité d'Achat B2B",
        dilemma: "Votre commercial est en discussion avec une ETI. La Directrice Administrative et Financière (DAF) adore votre produit. Pourtant, après 2 mois, la vente est bloquée. Pourquoi et quelle action d'acquisition mener ?",
        options: [
          {
            text: "La DAF ayant validé la solution, le retard provient d'une hésitation tarifaire face à la concurrence : il faut sans attendre proposer un avenant commercial avec une remise de 30% et des facilités d'échelonnement pour emporter la décision avant la fin du trimestre en cours.",
            correct: false,
            feedback: "Baisse de prix injustifiée ! En B2B, un blocage après validation métier ne vient presque jamais du prix, mais de réticences techniques, juridiques ou de priorités internes."
          },
          {
            text: "Le cycle de vente B2B étant systématiquement inférieur à 30 jours, ce délai indique un désintérêt définitif : il convient de clore l'opportunité dans le CRM.",
            correct: false,
            feedback: "Erreur d'appréciation : les cycles de vente B2B sur des solutions de gestion en ETI durent fréquemment de 3 à 9 mois en raison des nombreuses validations hiérarchiques."
          },
          {
            text: "Il faut contourner la DAF en sollicitant directement le Directeur Général par téléphone afin de faire pression sur les équipes opérationnelles hésitantes.",
            correct: false,
            feedback: "Mauvaise pratique commerciale : court-circuiter votre champion interne (la DAF) brise la relation de confiance établie et braque l'ensemble du comité de direction."
          },
          {
            text: "L'achat B2B étant collégial (DSI, DG, Juriste), le marketing doit outiller la DAF avec des contenus dédiés (grille de conformité RGPD, livre blanc technique DSI, calcul de ROI pour le DG).",
            correct: true,
            feedback: "Brillante analyse ! En B2B, l'acheteur métier n'est pas le seul décideur. L'acquisition doit équiper son champion interne avec des preuves adaptées aux exigences de chaque partie prenante."
          }
        ],
        linkedTerms: ["btob-btobtob", "customer-journey", "valeur-percue"],
        skillPoints: { "strategie-marche": 20, "outbound-prospection": 15 }
      }
    ]
  },
  {
    id: "mission-2-attraction",
    title: "Mission 2 : La Bataille de la Visibilité (Inbound vs Outbound & SEO vs SEA)",
    client: "CyberShield (Cabinet de conseil et solutions en cybersécurité)",
    role: "Growth & Acquisition Specialist",
    context: "CyberShield doit générer 80 opportunités qualifiées d'ici 6 mois auprès des DSI d'entreprises de plus de 100 salariés. Le budget est de 25 000 €.",
    questions: [
      {
        id: "q2_1",
        stage: "Étape 1 : Arbitrage Inbound vs Outbound",
        dilemma: "Le DG vous dit : 'L'Inbound marketing, c'est génial, créons un blog et attendons que les DSI viennent à nous.' Quel arbitrage proposez-vous pour atteindre l'objectif des 6 mois ?",
        options: [
          {
            text: "Accepter la proposition du DG : publier 3 articles de blog par semaine permet de capter les 80 opportunités qualifiées dès le deuxième mois sans prospection active.",
            correct: false,
            feedback: "Très imprudent ! Le SEO et l'Inbound demandent généralement 4 à 9 mois avant de produire un flux significatif de leads qualifiés. Compter uniquement dessus met l'objectif en grand danger."
          },
          {
            text: "Déployer un mix hybride : lancer de l'Outbound ciblé (ABM, cold emails) pour des signatures rapides, tout en semant l'Inbound (SEO, livres blancs) pour pérenniser le flux.",
            correct: true,
            feedback: "Remarquable ! C'est la réponse attendue d'un professionnel : combiner la vélocité immédiate de l'Outbound pour sécuriser le semestre avec l'effet cumulatif rentable de l'Inbound."
          },
          {
            text: "Rejeter totalement l'Inbound et consacrer les 25 000 € à l'achat de bases de données généralistes auprès de plusieurs prestataires pour lancer une vaste campagne de phoning intensif à froid sur les standards téléphoniques d'entreprises avec des téléopérateurs dédiés.",
            correct: false,
            feedback: "Cette méthode génère un rejet massif auprès des DSI, nuit à l'image de marque et ignore les opportunités offertes par le contenu expert sur une thématique pointue."
          },
          {
            text: "Refuser l'Inbound et l'Outbound pour concentrer tout le budget sur le sponsoring exclusif d'un événement physique grand public afin de maximiser la notoriété.",
            correct: false,
            feedback: "Mauvaise allocation budgétaire : un événement grand public ne touche pas la cible ultra-spécifique des DSI d'entreprises de plus de 100 salariés."
          }
        ],
        linkedTerms: ["inbound-marketing", "outbound-marketing", "abm", "content-marketing"],
        skillPoints: { "inbound-visibilite": 20, "outbound-prospection": 20 }
      },
      {
        id: "q2_2",
        stage: "Étape 2 : Le Choix des Leviers Digitaux (SEO, SEA, SGO)",
        dilemma: "Dans votre plan de visibilité digitale, vous devez arbitrer entre Google Ads (SEA), Référencement naturel (SEO) et Moteurs d'IA (SGO / GEO). Quelle affirmation est la plus juste ?",
        options: [
          {
            text: "Le SEA offre une visibilité pérenne dont le trafic continue d'augmenter même après l'arrêt des dépenses, alors que le SEO impose un paiement permanent par visiteur.",
            correct: false,
            feedback: "Confusion inverse ! C'est le SEO qui génère un flux organique durable, tandis que le SEA s'arrête instantanément dès que vous coupez votre budget publicitaire."
          },
          {
            text: "L'optimisation pour moteurs d'IA générative (SGO/GEO) rend le SEO et le SEA totalement superflus : il est désormais recommandé de supprimer son site web institutionnel traditionnel pour héberger uniquement un fichier de microdonnées textuelles brutes lues par les robots.",
            correct: false,
            feedback: "Faux : le SGO / GEO s'appuie directement sur les contenus, l'autorité de domaine et la structure technique de votre site web pour alimenter les réponses des IA."
          },
          {
            text: "Le SEO et le SEA sont strictement équivalents en termes de coût d'acquisition et de délai d'impact : le choix dépend uniquement de la charte graphique de l'entreprise.",
            correct: false,
            feedback: "Absolument pas : le SEA produit un afflux immédiat au coût par clic, tandis que le SEO nécessite un investissement initial en contenu pour des bénéfices à moyen/long terme."
          },
          {
            text: "Le SEA achète une visibilité immédiate mais temporaire ; le SEO construit un trafic organique durable ; le SGO/GEO prépare vos données pour être cité par ChatGPT et Perplexity.",
            correct: true,
            feedback: "Excellente maîtrise ! Vous articulez parfaitement la réactivité du Payant (SEA), la pérennité de l'Organique (SEO) et l'émergence des moteurs conversationnels IA (SGO/GEO)."
          }
        ],
        linkedTerms: ["seo", "sea", "sgo-geo", "netlinking-backlink"],
        skillPoints: { "inbound-visibilite": 25, "data-ia-martech": 10 }
      },
      {
        id: "q2_3",
        stage: "Étape 3 : Thought Leadership & Employee Advocacy",
        dilemma: "Pour renforcer la crédibilité de CyberShield sans surcoût publicitaire, quelle initiative active le concept d'Employee Advocacy ?",
        options: [
          {
            text: "Former et outiller les consultants pour qu'ils partagent leurs retours terrain et conseils techniques sur leur profil LinkedIn personnel avec des modèles de posts pré-rédigés.",
            correct: true,
            feedback: "Bravo ! L'Employee Advocacy repose sur l'incarnation de l'expertise par les collaborateurs : les acheteurs B2B accordent une confiance bien plus forte aux profils de spécialistes qu'aux messages institutionnels."
          },
          {
            text: "Mettre en place un outil d'automatisation sociale pour publier quotidiennement des messages commerciaux institutionnels identiques sur les profils personnels Twitter et LinkedIn de l'ensemble des salariés, sans possibilité de personnalisation de leur part.",
            correct: false,
            feedback: "Pratique intrusive et contre-productive qui décrédibilise vos collaborateurs et génère un désengagement interne immédiat."
          },
          {
            text: "Centraliser l'ensemble des prises de parole sur la seule page entreprise LinkedIn officielle en interdisant aux salariés de mentionner CyberShield dans leurs statuts.",
            correct: false,
            feedback: "C'est l'opposé de l'Employee Advocacy : la portée organique des pages entreprises est très restreinte par les algorithmes par rapport aux profils individuels."
          },
          {
            text: "Rémunérer financièrement chaque collaborateur au nombre de likes reçus sur ses publications de vacances pour augmenter la visibilité globale de la marque.",
            correct: false,
            feedback: "Cette démarche ne produit aucune visibilité qualifiée auprès des DSI et dénature totalement la logique de Thought Leadership professionnel."
          }
        ],
        linkedTerms: ["employee-advocacy", "thought-leadership", "social-selling", "smm"],
        skillPoints: { "inbound-visibilite": 15, "outbound-prospection": 15 }
      }
    ]
  },
  {
    id: "mission-3-funnel",
    title: "Mission 3 : La Fuite du Funnel (MQL, SQL, Lead Scoring & Nurturing)",
    client: "RH-Solution (Éditeur d'un SIRH pour ETI)",
    role: "Responsable Lead Generation & CRM",
    context: "Le Directeur Commercial arrive très mécontent dans le bureau du marketing : 'Votre équipe fête 200 leads générés ce mois-ci, mais mes commerciaux ont passé 80 heures à appeler des gens qui voulaient juste lire un article ou qui n'ont aucun budget ! Vos leads ne valent rien !'",
    questions: [
      {
        id: "q3_1",
        stage: "Étape 1 : Clarification de la frontière MQL / SQL",
        dilemma: "Pour désamorcer le conflit et poser des règles claires entre Marketing et Vente, quelle distinction fondamentale devez-vous instaurer ?",
        options: [
          {
            text: "Informer formellement la direction commerciale que tout téléchargement de livre blanc sur le site constitue une intention d'achat ferme, et qu'il appartient aux commerciaux de relancer téléphoniquement chaque contact dans l'heure pour conclure la vente sans attendre.",
            correct: false,
            feedback: "Faux et conflictuel ! Télécharger un document reflète une simple démarche informative, rarement un projet budgété prêt pour un rendez-vous commercial immédiat."
          },
          {
            text: "Supprimer la catégorie MQL et transmettre aux commerciaux uniquement les contacts qui sollicitent d'eux-mêmes un devis chiffré ou une signature de contrat.",
            correct: false,
            feedback: "Trop restrictif : attendre que les prospects demandent un contrat de manière spontanée réduirait drastiquement le pipeline et annulerait le travail de détection en amont."
          },
          {
            text: "Établir un accord SLA : le MQL valide l'intérêt marketing (téléchargement, webinar), tandis que le SQL exige des critères commerciaux validés (projet, budget, échéance, autorité).",
            correct: true,
            feedback: "Excellent ! L'accord SLA (Service Level Agreement) clarifie les responsabilités respectives et fixe des critères de qualification partagés pour harmoniser les efforts Sales et Marketing."
          },
          {
            text: "Externaliser l'intégralité de la qualification auprès d'un centre d'appels offshore sans modifier les critères de transfert vers les commerciaux de l'entreprise.",
            correct: false,
            feedback: "Externaliser sans critères rigoureux de passage MQL/SQL ne fait que déplacer le problème et augmente les coûts sans améliorer la pertinence des opportunités."
          }
        ],
        linkedTerms: ["funnel-acquisition", "funnel-vente", "taux-conversion", "crm"],
        skillPoints: { "conversion-nurturing": 25, "strategie-marche": 10 }
      },
      {
        id: "q3_2",
        stage: "Étape 2 : Implémentation du Lead Scoring",
        dilemma: "Vous paramétrez le module de Lead Scoring dans votre outil de marketing automation (Plezi / HubSpot). Quelle règle attribue le score le plus pertinent ?",
        options: [
          {
            text: "Croiser des critères firmographiques (ex: +30 pts si DRH d'une ETI cible) et comportementaux (ex: +20 pts si visite des Tarifs, +15 pts si téléchargement du comparatif SIRH).",
            correct: true,
            feedback: "Parfait ! Un scoring efficace combine obligatoirement le 'Fit' démographique (correspondance avec l'ICP) et le 'Signal' d'intention (comportement révélateur d'un projet d'achat)."
          },
          {
            text: "Accorder la note maximale de 100 points à chaque fois qu'un visiteur consulte les offres d'emploi ou les pages institutionnelles de l'entreprise sur une même session.",
            correct: false,
            feedback: "Piège récurrent : les pages de recrutement et d'actualité institutionnelle attirent des candidats et des étudiants, pas des décideurs RH en phase d'achat !"
          },
          {
            text: "Attribuer un point unique par page web visitée sans distinction de contenu, et transférer automatiquement la fiche prospect dans la file d'attente prioritaire des commerciaux dès que le visiteur dépasse un total cumulé de 15 pages consultées au cours du mois.",
            correct: false,
            feedback: "Un scoring linéaire non pondéré traite au même niveau la consultation des mentions légales et celle de la grille tarifaire, faussant totalement la détection d'intérêt."
          },
          {
            text: "Attribuer des points uniquement en fonction de l'ancienneté du contact dans la base CRM, sans tenir compte de ses actions concrètes sur vos espaces digitaux.",
            correct: false,
            feedback: "L'ancienneté seule n'indique pas la maturité d'un projet : un contact inactif depuis 12 mois ne doit pas obtenir un score supérieur à un prospect très actif ces 48h."
          }
        ],
        linkedTerms: ["lead-scoring", "funnel-acquisition", "taux-conversion"],
        skillPoints: { "conversion-nurturing": 25, "data-ia-martech": 10 }
      },
      {
        id: "q3_3",
        stage: "Étape 3 : Traitement des contacts froids (Lead Nurturing)",
        dilemma: "Un contact correspond parfaitement à votre cible (DRH de 300 salariés), mais indique lors d'un premier échange : 'Nous venons de reconduire notre prestataire actuel pour 12 mois, rappelez-nous l'année prochaine.' Que faites-vous ?",
        options: [
          {
            text: "Archiver et supprimer définitivement la fiche prospect du CRM afin de concentrer 100% des ressources sur les comptes immédiatement signables ce mois-ci.",
            correct: false,
            feedback: "Erreur stratégique majeure : acquérir ce profil cible a coûté du temps et de l'argent. L'effacer équivaut à l'offrir sur un plateau à la concurrence lors de son échéance annuelle."
          },
          {
            text: "L'intégrer dans un scénario automatisé de Lead Nurturing cadencé (veille RH, retours d'expérience, webinars) pour rester Top-of-Mind jusqu'à la renégociation de son contrat.",
            correct: true,
            feedback: "C'est la définition exacte du Lead Nurturing ! Vous nourrissez la relation avec des contenus à forte valeur ajoutée sans pression commerciale, pour être le premier choix lors de la renégociation."
          },
          {
            text: "Planifier des relances téléphoniques hebdomadaires systématiques afin de tenter de le convaincre de rompre son contrat actuel malgré les pénalités financières.",
            correct: false,
            feedback: "Cette insistance agressive indispose le décideur et garantit votre exclusion formelle lors du prochain appel d'offres."
          },
          {
            text: "Proposer de prendre en charge intégralement les pénalités de résiliation anticipée exigées par le prestataire actuel du prospect, et lui offrir six mois d'abonnement gratuit immédiat sans étude préalable de rentabilité financière pour forcer la signature du contrat.",
            correct: false,
            feedback: "Politique commerciale dangereuse qui dégrade lourdement la marge de l'entreprise sans certitude sur l'engagement durable du client."
          }
        ],
        linkedTerms: ["lead-nurturing", "customer-journey", "email-marketing"],
        skillPoints: { "conversion-nurturing": 25, "outbound-prospection": 5 }
      }
    ]
  },
  {
    id: "mission-4-outbound",
    title: "Mission 4 : Prospection Ciblée & ABM (Chasse aux Grands Comptes)",
    client: "LogistiX (Solution IoT pour entrepôts industriels)",
    role: "Business Developer / SDR & Acquisition Marketer",
    context: "LogistiX vend un système de capteurs connectés à 45 000 € par site logistique. Votre objectif est de décrocher des rendez-vous avec les Directeurs Supply Chain des 30 plus grands groupes de distribution français.",
    questions: [
      {
        id: "q4_1",
        stage: "Étape 1 : Choix de la Méthode d'Acquisition",
        dilemma: "Avec un panier moyen élevé (45 k€+) et seulement 30 comptes stratégiques identifiés, quelle approche d'acquisition devez-vous adopter ?",
        options: [
          {
            text: "Acheter un fichier générique de 50 000 adresses professionnelles et programmer l'envoi hebdomadaire d'e-mails promotionnels standardisés pour espérer obtenir un taux de transformation statistique de 0,1% sur l'ensemble de la base de prospection.",
            correct: false,
            feedback: "Inadapté sur du high-ticket : les directeurs de grands groupes ne répondent pas aux emails génériques, et le taux de délivrabilité de votre domaine sera lourdement dégradé."
          },
          {
            text: "Créer une campagne de publicité sponsorisée ciblée sur Instagram et TikTok afin d'améliorer la notoriété globale de la marque auprès du grand public.",
            correct: false,
            feedback: "Divergence totale d'audience : les décideurs supply chain de grands groupes de distribution ne sélectionnent pas des capteurs industriels à 45 k€ via des réseaux sociaux B2C."
          },
          {
            text: "Attendre passivement que les 30 directeurs découvrent le site web par référencement naturel suite à la publication mensuelle d'articles d'actualité.",
            correct: false,
            feedback: "L'attente passive est incompatible avec un objectif de chasse sur 30 comptes bien identifiés où l'action directe et personnalisée est indispensable."
          },
          {
            text: "Déployer une démarche ABM (Account-Based Marketing) : cartographier chaque compte et concevoir des approches sur-mesure pour chaque partie prenante clé.",
            correct: true,
            feedback: "Choix optimal ! Sur des paniers élevés avec un nombre restreint de cibles d'envergure, l'ABM aligne marketing et vente pour traiter chaque entreprise comme un marché unique."
          }
        ],
        linkedTerms: ["abm", "outbound-marketing", "sales-automation", "copywriting"],
        skillPoints: { "outbound-prospection": 25, "strategie-marche": 15 }
      },
      {
        id: "q4_2",
        stage: "Étape 2 : Copywriting & Structure de Message",
        dilemma: "Vous rédigez le premier email de prospection destiné à un Directeur Supply Chain. Quelle structure de copywriting garantit le meilleur taux de réponse ?",
        options: [
          {
            text: "Rédiger un argumentaire exhaustif de 400 mots décrivant en détail l'ensemble des fonctionnalités techniques des capteurs, l'historique complet de la société depuis sa fondation et la liste intégrale des certifications obtenues pour prouver sa légitimité.",
            correct: false,
            feedback: "Piège classique du centrage produit : un décideur sur-sollicité consacre moins de 15 secondes à un email inconnu et ignore les longues brochures auto-centrées."
          },
          {
            text: "Construire un message court (<100 mots) centré sur son problème métier, appuyé d'une preuve chiffrée issue d'un pair, et assorti d'un appel à l'action souple.",
            correct: true,
            feedback: "Superbe ! C'est la règle d'or du copywriting Outbound moderne (AIDA / Problème - Preuve - Proposition - Call To Action fluide), respectueuse du temps du décideur."
          },
          {
            text: "Insérer d'emblée une proposition commerciale détaillée avec grille tarifaire complète et demande de signature d'un bon de commande en pièce jointe dès la première prise de contact.",
            correct: false,
            feedback: "Précipitation commerciale : tenter de closer un contrat industriel complexe sans découverte préalable des besoins crée une méfiance immédiate."
          },
          {
            text: "Utiliser un objet racoleur de type 'URGENT : Problème sur vos livraisons' pour forcer l'ouverture du message sans lien avec le contenu réel.",
            correct: false,
            feedback: "Cette pratique trompeuse dégrade immédiatement l'éthique de marque et conduit au signalement systématique en spam."
          }
        ],
        linkedTerms: ["copywriting", "outbound-marketing", "experience-sans-friction"],
        skillPoints: { "outbound-prospection": 25, "conversion-nurturing": 10 }
      },
      {
        id: "q4_3",
        stage: "Étape 3 : Outillage et Enrichissement des Données",
        dilemma: "Pour constituer votre liste de prospection avec des coordonnées directes vérifiées et conformes RGPD, quelle combinaison d'outils privilégiez-vous ?",
        options: [
          {
            text: "Acheter un fichier d'adresses personnelles non professionnelles compilé sur des forums internet sans consentement explicite des utilisateurs.",
            correct: false,
            feedback: "Pratique illégale et non conforme au RGPD qui expose l'entreprise à des sanctions de la CNIL et n'apporte aucune donnée décisionnelle d'entreprise fiable."
          },
          {
            text: "Adresser systématiquement les messages de prospection commerciale aux adresses emails génériques officielles (contact@, info@, support@) répertoriées sur les mentions légales des sites internet institutionnels des trente entreprises ciblées.",
            correct: false,
            feedback: "Ces boîtes génériques filtrent ou suppriment 99% des messages commerciaux et n'atteignent jamais les décideurs supply chain de grands comptes."
          },
          {
            text: "Associer LinkedIn Sales Navigator (pour cartographier les organigrammes) à une solution de données B2B qualifiée (Nomination, Corporama) ou d'enrichissement d'emails professionnels (Dropcontact).",
            correct: true,
            feedback: "La stack de référence des professionnels B2B ! LinkedIn permet de cibler les bons interlocuteurs selon leurs attributions réelles, tandis que les outils MarTech garantissent des coordonnées directes valides."
          },
          {
            text: "Effectuer une saisie manuelle au hasard dans les annuaires téléphoniques papier locaux pour identifier les cadres dirigeants des sièges sociaux nationaux.",
            correct: false,
            feedback: "Méthode obsolète et improductive qui ne fournit ni les organigrammes décisionnels ni les coordonnées professionnelles nécessaires."
          }
        ],
        linkedTerms: ["bases-donnees-contacts", "sales-automation", "social-selling"],
        skillPoints: { "outbound-prospection": 20, "data-ia-martech": 15 }
      }
    ]
  },
  {
    id: "mission-5-martech",
    title: "Mission 5 : La Machine MarTech (Reverse IP, Friction & Nudge)",
    client: "ScaleCloud (Fournisseur d'infrastructures Cloud souveraines)",
    role: "Growth Operations & Conversion Rate Optimizer",
    context: "ScaleCloud attire 5 000 visiteurs uniques par mois sur son site, mais son taux de conversion en formulaires n'est que de 0,8 %. Les commerciaux se plaignent du manque de leads.",
    questions: [
      {
        id: "q5_1",
        stage: "Étape 1 : Révéler les Visiteurs Anonymes (Reverse IP)",
        dilemma: "Votre site enregistre des visites régulières de cadres d'entreprises du CAC 40 qui consultent vos pages de tarification sans jamais remplir le formulaire. Quel outil MarTech permet de les démasquer ?",
        options: [
          {
            text: "Déployer une solution de Reverse IP (Albacross, GetQuanty) qui fait correspondre l'adresse IP publique au nom de l'entreprise et alerte les commerciaux sur les comptes en phase active de recherche.",
            correct: true,
            feedback: "C'est la solution reine ! Le Reverse IP transforme un trafic web anonyme en signaux d'affaires chauds exploitables par l'équipe commerciale pour engager une prospection contextuelle."
          },
          {
            text: "Intégrer une fenêtre pop-up bloquante imposant obligatoirement la saisie des coordonnées bancaires et du numéro de téléphone professionnel avant de débloquer l'accès à la grille tarifaire complète de l'infrastructure cloud.",
            correct: false,
            feedback: "Cette barrière punitive ferait bondir votre taux de rebond au-delà de 98% et anéantirait toute intention de collaboration professionnelle."
          },
          {
            text: "Attendre que les algorithmes de Google Analytics transmettent automatiquement les adresses emails personnelles et numéros de téléphone des visiteurs anonymes.",
            correct: false,
            feedback: "Google Analytics anonymise strictement les données et ne fournit en aucun cas les coordonnées personnelles individuelles des visiteurs d'un site."
          },
          {
            text: "Supprimer intégralement les pages de tarification du site web afin de contraindre chaque internaute à contacter physiquement le standard téléphonique.",
            correct: false,
            feedback: "L'absence totale d'informations sur l'offre frustre les décideurs modernes qui privilégient l'évaluation autonome avant d'engager un contact commercial."
          }
        ],
        linkedTerms: ["reverse-ip", "crm", "pipeline-commercial", "lead-generation"],
        skillPoints: { "data-ia-martech": 25, "conversion-nurturing": 10 }
      },
      {
        id: "q5_2",
        stage: "Étape 2 : Optimisation de l'Expérience sans Friction",
        dilemma: "Le formulaire actuel de demande de démo comporte 14 champs obligatoires : Siret, CA, nombre de filiales, budget prévisionnel, fax, etc. Que préconisez-vous pour doper la conversion ?",
        options: [
          {
            text: "Conserver impérativement les 14 champs obligatoires afin de filtrer rigoureusement les visiteurs curieux et s'assurer que seuls les contacts les plus motivés et disposant d'un budget validé parviennent jusqu'à l'équipe commerciale.",
            correct: false,
            feedback: "Fausse bonne idée : un formulaire trop lourd décourage également d'excellents prospects qualifiés dont le temps est compté, dégradant lourdement le ROI des campagnes."
          },
          {
            text: "Remplacer l'ensemble des champs par une zone de texte libre sans consignes particulières où le prospect est invité à rédiger son cahier des charges complet.",
            correct: false,
            feedback: "L'absence de structure augmente la charge cognitive du prospect et complique le traitement automatique et l'attribution des leads dans le CRM."
          },
          {
            text: "Réduire à 3 champs essentiels (Prénom, Email pro, Téléphone) et enrichir automatiquement les données d'entreprise (Siret, CA, effectifs) via une API en arrière-plan.",
            correct: true,
            feedback: "Remarquable réflexe CRO (Conversion Rate Optimization) ! On réduit l'effort demandé au prospect tout en garantissant une qualification complète de la fiche côté CRM."
          },
          {
            text: "Imposer la création préalable d'un compte utilisateur protégé par un mot de passe complexe à double facteur avant d'accéder au formulaire de contact.",
            correct: false,
            feedback: "Multiplier les étapes d'authentification en amont de la prise de contact initiale constitue un modèle de friction contre-productif dans l'acquisition B2B."
          }
        ],
        linkedTerms: ["experience-sans-friction", "taux-conversion", "lead-generation"],
        skillPoints: { "conversion-nurturing": 25, "data-ia-martech": 10 }
      },
      {
        id: "q5_3",
        stage: "Étape 3 : Application du Nudge Marketing",
        dilemma: "Pour encourager les décideurs à finaliser leur demande de démo sans manipulation trompeuse, quel mécanisme de Nudge respectueux pouvez-vous tester ?",
        options: [
          {
            text: "Programmer un compte à rebours anxiogène clignotant en rouge indiquant que les tarifs préférentiels expireront définitivement dans les 60 prochaines secondes afin de déclencher un achat d'impulsion immédiat.",
            correct: false,
            feedback: "C'est un 'Dark Pattern' trompeur banni par l'éthique professionnelle qui détruit la réputation de sérieux indispensable dans la vente B2B de solutions d'infrastructure."
          },
          {
            text: "Afficher des notifications récurrentes en bas d'écran prétendant que des entreprises concurrentes viennent d'acheter la solution il y a deux minutes.",
            correct: false,
            feedback: "Les faux signaux de vente créent une méfiance immédiate chez les acheteurs B2B avertis qui vérifient facilement l'authenticité des références."
          },
          {
            text: "Verrouiller le curseur de la souris de l'internaute lorsqu'il tente de quitter la page pour afficher une fenêtre d'alerte grand écran.",
            correct: false,
            feedback: "Pratique intrusive et agressive qui dégrade l'expérience utilisateur et incite l'internaute à fermer définitivement son onglet de navigation."
          },
          {
            text: "Valoriser la preuve sociale (ex: 'Adopté par 300 DSI' + logos certifiés) et intégrer un choix de créneau synchronisé en un clic avec l'agenda d'un expert.",
            correct: true,
            feedback: "Superbe ! Le véritable Nudge B2B repose sur la réassurance cognitive (preuve sociale authentique) et la simplification radicale du passage à l'acte."
          }
        ],
        linkedTerms: ["nudge-marketing", "valeur-percue", "experience-sans-friction"],
        skillPoints: { "conversion-nurturing": 20, "strategie-marche": 15 }
      }
    ]
  },
  {
    id: "mission-6-ia",
    title: "Mission 6 : L'Acquisition Augmentée par l'IA (Prompting COFRE & Agents IA)",
    client: "AI-Genius (Plateforme MarTech d'automatisation intelligente)",
    role: "Head of Marketing & AI Ops",
    context: "En 2025+, l'automatisation classique est dépassée : vous devez orchestrer des campagnes d'acquisition augmentées par l'IA générative et des agents autonomes pour décupler les résultats.",
    questions: [
      {
        id: "q6_1",
        stage: "Étape 1 : Rigueur du Prompt Engineering (Méthode COFRE)",
        dilemma: "Vous demandez à une IA de rédiger la séquence d'accroche pour lancer un nouveau produit écoresponsable auprès de 500 PME. Quel prompt applique rigoureusement la méthode COFRE ?",
        options: [
          {
            text: "'Agis comme un marketeur expérimenté et propose-moi une sélection d'idées de campagnes promotionnelles très dynamiques et inspirantes pour lancer un nouveau service écoresponsable auprès de dirigeants d'entreprises françaises.'",
            correct: false,
            feedback: "Prompt trop imprécis : l'absence d'objectifs chiffrés, de format déterminé et d'étape opérationnelle produit des réponses génériques et inexploitables pour une campagne B2B."
          },
          {
            text: "Contexte : Startup GreenTech lançant un utilitaire électrique recyclé pour PME. Objectif : Générer 25 essais en 1 mois. Format : 3 emails courts (<100 mots) avec accroche et CTA. Rôle : Head of Acquisition. Étape : Rédige l'email 1 axé sur les économies de carburant.",
            correct: true,
            feedback: "Exemplaire ! Les 5 composantes de la méthode COFRE (Contexte, Objectif, Format, Rôle, Étape) sont parfaitement cadrées pour générer un résultat opérationnel immédiat."
          },
          {
            text: "'Rédige le meilleur texte de vente possible en t'inspirant des plus grands copywriters mondiaux sans aucune contrainte de longueur ni de format particulier.'",
            correct: false,
            feedback: "Sans contraintes précises de rôle, de cible ni de format, le modèle de langage fournit un texte grandiloquent inadapté à un contexte de prospection B2B."
          },
          {
            text: "'Génère 50 variantes d'accroches publicitaires pour les réseaux sociaux en intégrant un maximum de hashtags populaires et d'émojis visuels.'",
            correct: false,
            feedback: "Accumuler des émojis et des hashtags sans cadrage de contexte ni d'objectifs d'affaires relève d'une logique de bruit social média, pas d'une campagne de prospection B2B."
          }
        ],
        linkedTerms: ["prompting-cofre", "ia-generative", "copywriting"],
        skillPoints: { "data-ia-martech": 25, "outbound-prospection": 10 }
      },
      {
        id: "q6_2",
        stage: "Étape 2 : Différence Fondamentale IA Générative vs Agent IA",
        dilemma: "Votre direction souhaite automatiser la réactivation de tous les contacts ayant interagi avec les posts LinkedIn de l'entreprise depuis 6 mois. Pourquoi un Agent IA est-il nécessaire plutôt qu'un simple ChatGPT ?",
        options: [
          {
            text: "Un Agent IA est simplement un modèle d'IA générative standard auquel on a attribué une vitesse de calcul supérieure et une mémoire vive décuplée pour afficher les réponses textuelles de manière instantanée sur les ordinateurs des commerciaux.",
            correct: false,
            feedback: "Erreur conceptuelle : la distinction ne réside pas dans la vitesse d'affichage du texte, mais dans la capacité d'action autonome sur des logiciels externes via des API."
          },
          {
            text: "ChatGPT est réservé aux usages personnels de loisir, tandis que les Agents IA sont obligatoirement hébergés sur des serveurs physiques au sein des locaux de l'entreprise.",
            correct: false,
            feedback: "Confusion matérielle : ChatGPT et les plateformes d'agents IA (Dust, CrewAI, n8n) fonctionnent tous deux principalement sur des infrastructures Cloud."
          },
          {
            text: "L'IA générative est le 'cerveau' qui rédige du contenu ; l'Agent IA est le 'bras' autonome qui utilise des outils (APIs, CRM, scraping), prend des décisions d'étapes et exécute la mission de bout en bout.",
            correct: true,
            feedback: "Définition exacte ! L'Agent IA ne se contente pas d'écrire : il planifie, se connecte aux outils MarTech de l'entreprise, traite les erreurs et exécute la mission de bout en bout sans intervention humaine continue."
          },
          {
            text: "Il s'agit d'une simple appellation marketing pour désigner un tableau de bord PowerBI connecté à une base de données relationnelle SQL.",
            correct: false,
            feedback: "Confusion d'outils : un tableau de bord décisionnel (PowerBI) visualise des métriques historiques mais ne prend pas d'actions autonomes multicanales."
          }
        ],
        linkedTerms: ["agent-ia", "ia-generative", "ia-fine-tunee", "sales-automation"],
        skillPoints: { "data-ia-martech": 25, "outbound-prospection": 15 }
      },
      {
        id: "q6_3",
        stage: "Étape 3 : Visibilité Générative (SGO / GEO / IA Conversationnelle)",
        dilemma: "Un prospect demande à Perplexity / ChatGPT : 'Quel est le meilleur outil de gestion des temps pour une ETI de transport ?'. Comment optimiser votre visibilité pour être la marque citée en réponse ?",
        options: [
          {
            text: "Structurer vos données (Schema.org), publier des études chiffrées de référence et obtenir des mentions sur des médias d'autorité sectoriels pour alimenter le corpus de synthèse des LLM.",
            correct: true,
            feedback: "C'est le cœur du SGO / GEO ! Les moteurs d'IA synthétisent les sources d'information les plus crédibles, sourcées et structurées du web. Être cette référence vous assure d'être recommandé par l'IA."
          },
          {
            text: "Acheter massivement des noms de domaine expirés pour créer un réseau de 300 sites miroirs satellites générant des liens artificiels vers votre page produit afin de forcer les algorithmes d'apprentissage des modèles d'IA à vous mémoriser.",
            correct: false,
            feedback: "Cette méthode assimilée au réseau de fermes de liens (PBN spam) est lourdement pénalisée par les algorithmes et dégrade totalement l'autorité de domaine."
          },
          {
            text: "Acheter des campagnes publicitaires massives sur Google Ads avec enchères agressives pour contraindre directement les algorithmes d'OpenAI à citer votre produit.",
            correct: false,
            feedback: "Les moteurs d'IA générative n'indexent pas les encarts publicitaires Google Ads pour formuler leurs synthèses documentées."
          },
          {
            text: "Insérer des listes de mots-clés invisibles en typographie transparente dans le code source de l'ensemble de vos pages web pour tromper les robots d'exploration.",
            correct: false,
            feedback: "Technique de 'cloaking' bannie depuis les débuts des moteurs de recherche, facilement détectée et sanctionnée par les analyseurs sémantiques modernes."
          }
        ],
        linkedTerms: ["sgo-geo", "thought-leadership", "seo", "netlinking-backlink"],
        skillPoints: { "data-ia-martech": 20, "inbound-visibilite": 20 }
      }
    ]
  }
];
