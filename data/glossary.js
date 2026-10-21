// Données complètes issues de l'onglet Glossaire du fichier de cours
const GLOSSARY_CATEGORIES = {
  "strategie-marche": {
    label: "Stratégie, Marché & Cadrage",
    color: "from-blue-600 to-indigo-600",
    badge: "bg-blue-100 text-blue-800 border-blue-300",
    icon: "fa-bullseye"
  },
  "inbound-visibilite": {
    label: "Inbound Marketing & Visibilité",
    color: "from-emerald-600 to-teal-600",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: "fa-magnet"
  },
  "conversion-nurturing": {
    label: "Funnel, Conversion & Nurturing",
    color: "from-amber-600 to-orange-600",
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    icon: "fa-filter"
  },
  "outbound-prospection": {
    label: "Outbound, Prospection & Vente",
    color: "from-violet-600 to-purple-600",
    badge: "bg-violet-100 text-violet-800 border-violet-300",
    icon: "fa-paper-plane"
  },
  "data-ia-martech": {
    label: "MarTech, Data & IA 2025+",
    color: "from-rose-600 to-pink-600",
    badge: "bg-rose-100 text-rose-800 border-rose-300",
    icon: "fa-robot"
  }
};

const GLOSSARY_DATA = [
  {
    id: "btob-btobtob",
    term: "Marché du BtoB et BtoBtoB",
    category: "strategie-marche",
    categoryLabel: "Stratégie, Marché & Cadrage",
    definition: "Ensemble des entreprises qui vendent des produits ou services à d'autres entreprises (Business to Business), ou via des intermédiaires qui s'adressent eux-mêmes à des professionnels (BtoBtoB).",
    example: "Cegid vend son logiciel de comptabilité directement aux cabinets d'expertise comptable (BtoB). HubSpot vend son CRM à des agences marketing partenaires, qui le déploient ensuite chez leurs propres entreprises clientes (BtoBtoB).",
    tools: ["Vente directe", "Réseau d'intégrateurs", "Partenariats Revendeurs"],
    keywords: ["B2B", "BtoBtoB", "Entreprise", "Distribution", "Intermédiaire"],
    bachelorTakeaway: "En BtoB, l'acheteur n'est pas l'utilisateur final unique : la décision est collégiale, rationnelle et à fort enjeu financier."
  },
  {
    id: "tam-sam-som",
    term: "Marché Total / Atteignable / Prévisionnel (TAM / SAM / SOM)",
    category: "strategie-marche",
    categoryLabel: "Stratégie, Marché & Cadrage",
    definition: "Marché total (TAM) = ensemble absolu des clients potentiels. Marché atteignable (SAM) = clients réellement accessibles avec notre modèle/géographie. Marché prévisionnel (SOM) = volume de ventes réaliste visé à court/moyen terme.",
    example: "HubSpot cible théoriquement toutes les entreprises du monde (TAM), mais se concentre au démarrage uniquement sur les agences anglophones (SAM), et projette de signer 5 % de ces agences dès la 1ère année (SOM).",
    tools: ["Études de marché", "Statista", "Calcul TAM/SAM/SOM", "Business Plan"],
    keywords: ["TAM", "SAM", "SOM", "Dimensionnement", "Potentiel", "Ciblage"],
    bachelorTakeaway: "Ne confondez jamais la taille globale d'un marché avec le volume réaliste que votre équipe commerciale peut capter en 12 mois."
  },
  {
    id: "segmentation",
    term: "Segmenter son marché",
    category: "strategie-marche",
    categoryLabel: "Stratégie, Marché & Cadrage",
    definition: "Découper un marché hétérogène en groupes d'entreprises homogènes selon des critères objectifs (taille, chiffre d'affaires, secteur d'activité, maturité digitale, problématique métier).",
    example: "Un éditeur SaaS segmente son offre : d'abord les agences de moins de 1 M€ de CA (PME avec cycle court), avant de cibler les réseaux de 1 à 10 M€ (Mid-Market avec DSI et comités de direction).",
    tools: ["Critères firmographiques", "Critères technologiques", "Segmentation RFM"],
    keywords: ["Segmentation", "ICP", "Critères", "Homogénéité", "Typologie"],
    bachelorTakeaway: "Un bon segment B2B doit être mesurable, accessible, rentable et actionnable par vos campagnes marketing."
  },
  {
    id: "gtm",
    term: "Go To Market (GTM)",
    category: "strategie-marche",
    categoryLabel: "Stratégie, Marché & Cadrage",
    definition: "Plan d'action stratégique et opérationnel qu'une entreprise déploie pour lancer une offre sur un marché cible, définir son positionnement, ses canaux d'acquisition et aligner marketing et ventes.",
    example: "Une startup SaaS structure son GTM : Définir l'ICP → Valider le cas d'usage → Rédiger la proposition de valeur → Choisir les canaux (LinkedIn Ads + Cold Email) → Fixer le pricing → Définir les KPI et le Go/No-Go.",
    tools: ["Matrice GTM", "Playbook commercial", "ICP Matrix", "Lancement d'offre"],
    keywords: ["GTM", "Lancement", "Stratégie", "Positionnement", "Alignement"],
    bachelorTakeaway: "Le GTM n'est pas qu'une campagne de pub : c'est l'alignement total entre Produit, Prix, Message, Vente et Canaux."
  },
  {
    id: "matrices-marketing",
    term: "Matrices marketing d'aide à la décision",
    category: "strategie-marche",
    categoryLabel: "Stratégie, Marché & Cadrage",
    definition: "Cadres méthodologiques standardisés permettant d'analyser l'environnement externe, les forces internes ou le portefeuille d'activités pour piloter la stratégie.",
    example: "Réaliser le SWOT d'un secteur commercial avant de décider d'investir en SEO ou en Outbound ; utiliser Porter pour évaluer le pouvoir de négociation des acheteurs B2B.",
    tools: ["SWOT", "BCG", "PESTEL", "5 Forces de Porter", "Matrice 12P"],
    keywords: ["SWOT", "PESTEL", "BCG", "Porter", "Diagnostic", "Stratégie"],
    bachelorTakeaway: "Les matrices ne sont pas des exercices académiques : elles servent à justifier pourquoi on alloue du budget sur un canal plutôt qu'un autre."
  },
  {
    id: "valeur-percue",
    term: "Valeur perçue",
    category: "strategie-marche",
    categoryLabel: "Stratégie, Marché & Cadrage",
    definition: "Évaluation subjective par le client professionnel de l'ensemble des bénéfices apportés par une solution (gain de temps, réduction du risque, ROI, prestige) par rapport à ses coûts totaux.",
    example: "Un logiciel RH vendu 15 000 €/an est perçu comme une opportunité car il fait gagner 2 jours par semaine à chaque DRH et garantit une conformité légale sans faille.",
    tools: ["Proposition de valeur", "Calcul de ROI client", "Études de cas / Verbatim"],
    keywords: ["Valeur perçue", "Bénéfice", "ROI", "Coût", "Positionnement"],
    bachelorTakeaway: "En B2B, le prix n'est qu'un chiffre. Si la valeur perçue démontre un retour sur investissement rapide, le prix devient secondaire."
  },
  {
    id: "customer-journey",
    term: "Customer Journey // Parcours Client",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Représentation semi-fictive et chronologique des étapes franchies par un prospect, depuis sa prise de conscience initiale (veille) jusqu'à la signature, l'adoption et la recommandation (Loop Marketing).",
    example: "Une Directrice Marketing passe par 7 étapes : Veille (lit des articles) → Considération (repère une marque) → Évaluation passive → Évaluation active (démos) → Choix → Déploiement → Ventes additionnelles.",
    tools: ["Loop Marketing (Express, Tailor, Amplify, Evolve)", "Framework Inbound", "Miro / Lucidchart"],
    keywords: ["Customer Journey", "Parcours client", "Points de contact", "Touchpoints", "Cycle d'achat"],
    bachelorTakeaway: "Dans la vraie vie, le parcours B2B n'est jamais purement linéaire : un prospect peut stagner 6 mois puis accélérer en 48h."
  },
  {
    id: "inbound-marketing",
    term: "Inbound Marketing",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Stratégie consistant à faire venir le prospect à soi naturellement en créant et diffusant des contenus à forte valeur ajoutée, plutôt que de l'interrompre par de la prospection agressive.",
    example: "Un cabinet de conseil publie chaque semaine des modèles Excel de calcul de rentabilité et des livres blancs SEO que les directeurs financiers téléchargent spontanément.",
    tools: ["Blog d'entreprise", "Livres blancs / Guides", "Podcasts", "HubSpot", "Plezi"],
    keywords: ["Inbound", "Attraction", "Contenu", "Permission marketing", "Génération de leads"],
    bachelorTakeaway: "L'Inbound prend du temps à décoller (effet cumulatif), mais génère des leads avec un coût d'acquisition marginal décroissant."
  },
  {
    id: "content-marketing",
    term: "Marketing de contenu (Content Marketing)",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Création, publication et distribution stratégique de contenus utiles, informatifs et pertinents pour attirer, convertir et fidéliser une audience professionnelle qualifiée.",
    example: "Publier un baromètre annuel sur les salaires des commerciaux B2B ou un guide pratique sur la directive CSRD à destination des directeurs RSE.",
    tools: ["Articles de fond", "Webinaires", "Infographies", "Notion", "Canva", "Ghost"],
    keywords: ["Contenu", "Valeur", "Éducation", "Notoriété", "Engagement"],
    bachelorTakeaway: "Le bon contenu B2B ne parle pas de votre produit, il résout une souffrance concrète de votre prospect."
  },
  {
    id: "thought-leadership",
    term: "Pensée de leader d’opinion / Thought Leadership",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Démarche stratégique visant à positionner les dirigeants ou experts d'une entreprise comme les références incontournables et visionnaires sur leur marché.",
    example: "HubSpot est devenu le leader d'opinion mondial sur l'Inbound Marketing ; un fondateur de scale-up publie des tribunes dans Les Échos et anime un podcast B2B influent.",
    tools: ["Tribunes de presse", "Conférences keynote", "Études sectorielles exclusives", "LinkedIn Newsletter"],
    keywords: ["Thought leadership", "Expertise", "Légitimité", "Autorité", "Influence"],
    bachelorTakeaway: "En B2B où le risque de se tromper de fournisseur est anxiogène, le leader d'opinion rassure immédiatement l'acheteur."
  },
  {
    id: "seo",
    term: "SEO (Search Engine Optimization)",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Ensemble des techniques et optimisations (techniques, sémantiques et netlinking) visant à positionner durablement un site web dans les premiers résultats naturels des moteurs de recherche.",
    example: "Optimiser les balises Hn, le maillage interne et les mots-clés d'un article pour apparaître en 1ère position sur la requête 'logiciel facturation électronique PME'.",
    tools: ["Semrush", "Ubersuggest", "Similarweb", "Google Search Console", "Screaming Frog"],
    keywords: ["SEO", "Référencement naturel", "Mots-clés", "Google", "Trafic organique"],
    bachelorTakeaway: "Le SEO est un actif durable : un article bien positionné continue de vous apporter des prospects qualifiés gratuitement pendant des années."
  },
  {
    id: "sea",
    term: "SEA (Search Engine Advertising)",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Achat d'espaces publicitaires payants sur les moteurs de recherche via un système d'enchères sur des mots-clés ciblés, afin d'obtenir une visibilité immédiate.",
    example: "Acheter le mot-clé 'CRM pour expert comptable' sur Google Ads pour que votre annonce apparaisse tout en haut avec un lien vers votre landing page de démo.",
    tools: ["Google Ads", "Microsoft Advertising (Bing)", "Enchères CPC/CPA", "Google Keyword Planner"],
    keywords: ["SEA", "Google Ads", "Enchères", "CPC", "Paid search", "Conversion immédiate"],
    bachelorTakeaway: "Le SEA est un robinet : vous ouvrez et vous avez du trafic instantané, mais dès que vous coupez le budget, tout s'arrête."
  },
  {
    id: "sma",
    term: "SMA (Social Media Advertising)",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Diffusion de publicités payantes ciblées sur les réseaux sociaux professionnels ou grand public pour capter des profils selon leurs caractéristiques démographiques ou professionnelles.",
    example: "Une campagne LinkedIn Sponsored Content ciblant uniquement les 'Directeurs des Systèmes d'Information' en France dans les entreprises de plus de 200 salariés.",
    tools: ["LinkedIn Campaign Manager", "Meta Ads Manager", "Audience Builder"],
    keywords: ["SMA", "LinkedIn Ads", "Ciblage sponsorisé", "Retargeting", "Acquisition payante"],
    bachelorTakeaway: "Sur LinkedIn Ads, le coût par clic est élevé (6 € à 15 €+), il faut donc une offre à forte valeur (panier moyen élevé) pour être rentable."
  },
  {
    id: "smm",
    term: "SMM (Social Media Marketing)",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Ensemble des actions marketing non payantes (organiques) menées sur les réseaux sociaux pour développer la notoriété, l'engagement et l'image de marque de l'entreprise.",
    example: "Animer quotidiennement la page LinkedIn d'une entreprise en partageant des retours d'expérience clients, des coulisses de l'équipe et des sondages sectoriels.",
    tools: ["LinkedIn Pages", "Buffer", "Hootsuite", "Agorapulse"],
    keywords: ["SMM", "Réseaux sociaux", "Organique", "Communauté", "Engagement"],
    bachelorTakeaway: "La page entreprise LinkedIn a souvent moins de portée organique que les profils personnels des collaborateurs (d'où l'importance de l'Employee Advocacy)."
  },
  {
    id: "sgo-geo",
    term: "SGO / GEO (Generative Engine Optimization) & SEO Conversationnel",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Techniques d'optimisation visant à rendre les contenus d'un site web facilement indexables, citables et recommandés par les moteurs de recherche IA et LLM (ChatGPT, Perplexity, Google Gemini / AI Overviews).",
    example: "Rédiger des réponses directes, chiffrées, sourcées et structurées en microdonnées (Schema.org) pour que ChatGPT ou Perplexity cite votre marque comme 'meilleure solution B2B'.",
    tools: ["Perplexity", "ChatGPT Search", "Google AI Overviews", "Schema.org", "LLMO / GEO"],
    keywords: ["SGO", "GEO", "LLMO", "IA générative", "Recherche conversationnelle", "Perplexity"],
    bachelorTakeaway: "En 2025+, le clic sur un lien bleu Google diminue ; les décideurs demandent directement la synthèse à l'IA. Votre marque doit être citée dans sa réponse !"
  },
  {
    id: "netlinking-backlink",
    term: "Netlinking & Backlinks",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Stratégie consistant à obtenir des liens hypertextes externes (backlinks) pointant depuis d'autres sites web d'autorité vers le sien, afin d'accroître la crédibilité et le classement SEO.",
    example: "Un média comme Les Échos ou Le Monde Informatique publie une étude et intègre un lien cliquable vers votre livre blanc de cybersécurité.",
    tools: ["Ahrefs", "Semrush Backlink Analytics", "Articles invités", "RP digitales"],
    keywords: ["Netlinking", "Backlink", "Autorité", "PageRank", "Jus de lien"],
    bachelorTakeaway: "Un seul lien provenant d'un site gouvernemental ou d'un média réputé (.gouv, .edu, grand média) vaut 100 fois plus que 50 liens sur des blogs anonymes."
  },
  {
    id: "lead-generation",
    term: "Générer des leads / Lead Generation",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Processus marketing visant à susciter l'intérêt d'un prospect cible et à collecter ses coordonnées professionnelles vérifiées (nom, prénom, email, téléphone, société, fonction).",
    example: "Mettre en place un simulateur d'économies d'énergie en ligne qui transmet les résultats détaillés par email après saisie du formulaire.",
    tools: ["Formulaires en ligne", "Typeform", "Landing Pages (Webflow, Unbounce)", "Lead Magnets"],
    keywords: ["Lead Gen", "Formulaire", "Coordonnées", "Conversion", "Prospect qualifié"],
    bachelorTakeaway: "Un lead n'est pas encore un client : c'est simplement une opportunité de démarrer une conversation commerciale."
  },
  {
    id: "funnel-acquisition",
    term: "Funnel d'acquisition (MQL)",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Entonnoir marketing qui modélise le passage des visiteurs anonymes au statut de Marketing Qualified Lead (MQL), c'est-à-dire un contact ayant montré un intérêt concret justifiant un traitement.",
    example: "Visite d'un article de blog → Téléchargement d'un comparatif de logiciels → Inscription à un webinar live → Le scoring dépasse 50 points : le contact devient MQL.",
    tools: ["Funnel analytics", "HubSpot", "Google Analytics 4", "Dashboard de conversion"],
    keywords: ["Funnel", "Entonnoir", "MQL", "Top of Funnel", "Middle of Funnel"],
    bachelorTakeaway: "Le funnel d'acquisition s'arrête là où commence le travail de qualification commerciale (SDR)."
  },
  {
    id: "funnel-vente",
    term: "Funnel de vente (SQL & Opportunités)",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Entonnoir commercial qui prend le relais du MQL : de la qualification commerciale (SQL) jusqu'au closing (signature du contrat ou abandon), en passant par la négociation et la validation technique.",
    example: "Le SDR appelle le MQL pour valider le budget et l'échéance (SQL) → Rendez-vous démo avec l'Account Executive (AE) → Envoi de la proposition → Accord juridique → Signature électronique.",
    tools: ["CRM Pipeline", "Salesforce", "HubSpot Deals", "DocuSign"],
    keywords: ["Funnel de vente", "SQL", "Opportunité", "Closing", "Cycle de vente"],
    bachelorTakeaway: "L'éternelle guerre Marketing vs Sales se joue à la frontière MQL / SQL. Un bon SLA (Service Level Agreement) clarifie les critères de passage."
  },
  {
    id: "lead-nurturing",
    term: "Lead Nurturing",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Pratique consistant à 'nourrir' et maintenir une relation éducative continue avec des prospects qui ne sont pas encore prêts à acheter immédiatement, via des séquences automatisées personnalisées.",
    example: "Un prospect a téléchargé un guide mais indique un projet pour l'année prochaine : il reçoit un email conseil tous les 15 jours pour rester 'Top of Mind' jusqu'au moment opportun.",
    tools: ["Marketo", "Plezi", "ActiveCampaign", "Webmecanik", "HubSpot Automation"],
    keywords: ["Nurturing", "Maturation", "Éducation", "Scénario email", "Top of Mind"],
    bachelorTakeaway: "70% des leads entrants ne sont pas mûrs pour un appel commercial immédiat. Sans nurturing, ils sont purement et simplement perdus pour la concurrence."
  },
  {
    id: "lead-scoring",
    term: "Scoring de leads (Lead Scoring)",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Système d'attribution de points quantitatifs à un contact en fonction de ses caractéristiques démographiques (taille entreprise, poste) et de ses comportements digitaux (pages visitées, clics, formulaires).",
    example: "Visite de la page tarifs (+25 pts) + Téléchargement cas client (+15 pts) + DAF d'une ETI (+30 pts) = 70 pts : alerte Slack automatique envoyée au commercial pour appel immédiat.",
    tools: ["Règles de scoring HubSpot / Salesforce", "Matrice d'engagement", "Data behavioral"],
    keywords: ["Lead scoring", "Points", "Maturité", "Priorisation", "Alerte commerciale"],
    bachelorTakeaway: "Le scoring évite aux commerciaux de perdre du temps à appeler des stagiaires qui lisent un article par simple curiosité."
  },
  {
    id: "taux-conversion",
    term: "Taux de conversion & Ratios de transformation",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Pourcentage mesurant le passage réussi des contacts d'une étape à l'étape suivante dans le funnel (Visiteur → Lead → MQL → SQL → Client).",
    example: "Sur 1 000 visiteurs d'une landing page, 50 remplissent le formulaire = 5 % de taux de conversion. Sur 50 leads, 20 deviennent SQL (40 %) et 5 signent (25 % de closing commercial).",
    tools: ["Google Analytics", "Mixpanel", "Tableaux de bord KPI", "Formule : (Nbre_convertis / Nbre_total) x 100"],
    keywords: ["Conversion", "Transformation", "Ratio", "Performance", "KPI"],
    bachelorTakeaway: "Améliorer son acquisition ne signifie pas toujours attirer plus de trafic : doubler son taux de conversion divise souvent le coût d'acquisition par deux."
  },
  {
    id: "experience-sans-friction",
    term: "Expérience sans friction (Frictionless Experience)",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Conception du parcours utilisateur et d'achat visant à éliminer tout obstacle, temps d'attente, question superflue ou complexité technique qui freinerait l'action du prospect.",
    example: "Remplacer un formulaire de 12 champs par un formulaire de 3 champs avec autocomplétion des données d'entreprise via l'adresse email professionnelle.",
    tools: ["Clearbit Forms", "Chili Piper (prise de RDV instantanée)", "Single Sign-On (SSO)"],
    keywords: ["Sans friction", "UX", "Optimisation conversion", "Formulaire court", "Fluidité"],
    bachelorTakeaway: "Chaque champ supplémentaire dans un formulaire B2B fait chuter le taux de conversion d'environ 10 %."
  },
  {
    id: "nudge-marketing",
    term: "Nudge Marketing",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Méthode issue des sciences comportementales qui incite doucement un individu à prendre une décision souhaitée sans jamais recourir à la contrainte financière ou physique.",
    example: "Pré-sélectionner par défaut l'option d'abonnement annuel avec la mention 'Choix recommandé par 80% des directeurs commerciaux' ; ou afficher 'Plus que 3 places pour ce webinar live'.",
    tools: ["Sciences comportementales", "Preuve sociale", "Option par défaut", "Biais cognitifs"],
    keywords: ["Nudge", "Biais cognitifs", "Incitation", "Psychologie", "Preuve sociale"],
    bachelorTakeaway: "Le nudge exploite les raccourcis mentaux (Système 1 de Kahneman) pour faciliter la prise de décision rapide en situation d'incertitude."
  },
  {
    id: "co-branding",
    term: "Co-branding & Partenariats d'acquisition",
    category: "conversion-nurturing",
    categoryLabel: "Funnel, Conversion & Nurturing",
    definition: "Alliance stratégique entre deux entreprises non concurrentes mais partageant la même cible client, pour co-créer une offre, un événement ou un contenu et croiser leurs bases de prospects.",
    example: "HubSpot s'associe à LinkedIn pour publier un grand baromètre conjoint sur l'état des ventes B2B en France, doublant ainsi l'audience de l'événement.",
    tools: ["Webinaires conjoints", "Livres blancs co-brandés", "Échange de visibilité"],
    keywords: ["Co-branding", "Partenariat", "Synergie", "Cible commune", "Partage d'audience"],
    bachelorTakeaway: "Le co-branding permet d'acquérir la confiance d'une nouvelle audience 3 fois plus vite en profitant du capital sympathie de la marque partenaire."
  },
  {
    id: "outbound-marketing",
    term: "Outbound Marketing",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Stratégie proactive et directe où l'entreprise va activement chercher ses prospects cibles qui ne la connaissent pas encore, à travers des messages personnalisés multicanaux (email, téléphone, LinkedIn).",
    example: "Identifier 200 directeurs logistiques sur LinkedIn, enrichir leurs emails professionnels et leur envoyer une séquence cadencée de 4 emails à haute valeur ajoutée.",
    tools: ["Lemlist", "Salesloft", "Waalaxy", "Kaspr", "Téléphonie VoIP (Aircall)"],
    keywords: ["Outbound", "Prospection directe", "Chasse", "Cold email", "Cold calling"],
    bachelorTakeaway: "L'Outbound donne des résultats immédiats et prévisibles, mais exige une ultra-personnalisation pour éviter d'être classé en spam."
  },
  {
    id: "abm",
    term: "ABM (Account-Based Marketing)",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Approche marketing et commerciale d'élite qui traite un compte stratégique ou un nombre très restreint d'entreprises cibles comme des micromarchés uniques avec des actions sur-mesure.",
    example: "Concevoir une campagne dédiée exclusivement à 10 grands comptes du CAC 40 (ex: Renault, Total), avec des vidéos personnalisées pour chaque membre du comité de direction.",
    tools: ["Demandbase", "RollWorks", "LinkedIn Matched Audiences", "Cadeaux personnalisés"],
    keywords: ["ABM", "Comptes stratégiques", "Sur-mesure", "Alignement Sales-Marketing", "High-ticket"],
    bachelorTakeaway: "L'ABM renverse le funnel : au lieu de filtrer des milliers de leads, on sélectionne 20 comptes en or et on mobilise toutes les ressources pour les signer."
  },
  {
    id: "social-selling",
    term: "Social Selling",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Utilisation professionnelle des réseaux sociaux (principalement LinkedIn en B2B) pour développer son réseau, écouter les besoins, interagir avec les décideurs et amorcer des relations d'affaires de confiance.",
    example: "Un commercial commente pertinemment les publications d'un prospect pendant 3 semaines avant de lui envoyer un message privé contextuel sur une problématique précise.",
    tools: ["LinkedIn Sales Navigator", "Limber", "Buffer", "Shield Analytics"],
    keywords: ["Social selling", "LinkedIn", "Réseautage", "Confiance", "Interactions"],
    bachelorTakeaway: "Le Social Selling n'est pas du spamming de messages automatiques : c'est l'art d'établir sa crédibilité avant de demander un échange téléphonique."
  },
  {
    id: "sales-automation",
    term: "Sales Automation (Automatisation commerciale)",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Utilisation de logiciels pour automatiser les tâches répétitives de prospection et de suivi des ventes : envoi de séquences d'emails, relances, invitations LinkedIn et tâches de rappel CRM.",
    example: "Programmer une séquence combinant : J0 (visite du profil LinkedIn) → J1 (invitation) → J3 (email de valeur) → J7 (relance avec cas client) → J10 (tâche d'appel téléphonique).",
    tools: ["Lemlist", "Salesloft", "Emelia", "Waalaxy", "Outreach"],
    keywords: ["Sales automation", "Séquences", "Relances", "Automatisation", "Gain de temps"],
    bachelorTakeaway: "Automatiser un mauvais message le transforme juste en spam massif. Automatisez uniquement ce qui a déjà fait ses preuves manuellement !"
  },
  {
    id: "bases-donnees-contacts",
    term: "Bases de données de contacts & Prospection",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Plateformes spécialisées fournissant des listes qualifiées d'entreprises et de décideurs avec leurs coordonnées directes (organigrammes, emails nominatifs, lignes directes, actualités d'affaires).",
    example: "Utiliser Nomination ou Corporama pour extraire la liste des 150 Directeurs Financiers d'entreprises industrielles en région Auvergne-Rhône-Alpes ayant recruté récemment.",
    tools: ["Nomination", "Corporama", "Sparklane", "MixData", "ZoomInfo", "Dropcontact"],
    keywords: ["Base de contacts", "Données B2B", "Enrichissement", "Email vérifié", "Signaux d'affaires"],
    bachelorTakeaway: "La qualité de vos données est le carburant de votre machine d'acquisition : une base avec 30% d'adresses invalides ruine votre délivrabilité email."
  },
  {
    id: "copywriting",
    term: "Copywriting",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Science et art d'écrire des textes persuasifs qui captent l'attention du lecteur, éveillent son désir et le poussent à accomplir une action précise (répondre, cliquer, réserver un appel).",
    example: "Rédiger un email de cold outreach selon le framework AIDA (Attention, Intérêt, Désir, Action) ou PAS (Problème, Agitation, Solution) en moins de 100 mots.",
    tools: ["Frameworks : AIDA, PAS, BAB (Before-After-Bridge), CDS, FDB", "Tests A/B"],
    keywords: ["Copywriting", "Persuasion", "Accroche", "Structure de message", "Taux de réponse"],
    bachelorTakeaway: "Un bon texte de vente B2B ne se lit pas comme une brochure corporative : il est centré à 100% sur le problème du client, clair et concis."
  },
  {
    id: "campagne-prospection",
    term: "Campagne Marketing de prospection",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Dispositif commercial temporaire et ciblé, intégré au plan Go-To-Market, visant à générer des opportunités commerciales sur un segment précis avec des objectifs quantitatifs définis.",
    example: "Lancer une campagne de prospection de 6 semaines visant 500 PME soumises à la nouvelle réglementation de facturation électronique, avec un objectif de 30 démos qualifiées.",
    tools: ["Playbook de campagne", "Cadence multicanale", "KPI Tracker"],
    keywords: ["Campagne prospection", "Objectif quanti/quali", "Cadence", "Cible", "Bilan stop/go"],
    bachelorTakeaway: "Une campagne de prospection a un début, une fin, des jalons hebdomadaires et une décision finale : 'Stop ou Encore'."
  },
  {
    id: "employee-advocacy",
    term: "Employee Advocacy",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Programme incitant et accompagnant les collaborateurs d'une entreprise à devenir les ambassadeurs officiels de la marque sur leurs réseaux sociaux personnels.",
    example: "Les ingénieurs et commerciaux partagent sur LinkedIn les retours d'expérience clients et les innovations techniques de leur boîte, multipliant la portée organique par 10.",
    tools: ["Social Seeder", "Sociabble", "Limber", "Banque de contenus interne"],
    keywords: ["Employee advocacy", "Ambassadeurs", "Collaborateurs", "Crédibilité", "Portée"],
    bachelorTakeaway: "Les gens font confiance aux vraies personnes, pas aux logos anonymes. Les publications de vos équipes suscitent jusqu'à 8 fois plus d'engagement que celles de votre marque."
  },
  {
    id: "community-management",
    term: "Community Management",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Gestion active, animation, modération et développement d'une communauté professionnelle engagée autour de la marque, sur les réseaux sociaux ou des espaces d'échanges dédiés.",
    example: "Modérer un groupe Slack ou une communauté Discord de 1 200 responsables de sécurité informatique qui échangent quotidiennement sur les bonnes pratiques.",
    tools: ["Slack Community", "Discord", "Circle", "Modération LinkedIn"],
    keywords: ["Communauté", "Animation", "Modération", "Engagement", "Fidélisation"],
    bachelorTakeaway: "Une communauté active transforme vos clients en promoteurs et diminue drastiquement le coût d'acquisition de vos futurs clients."
  },
  {
    id: "crm",
    term: "CRM (Customer Relationship Management)",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Logiciel central de l'entreprise regroupant l'ensemble des données, interactions, historiques et opportunités commerciales liées aux prospects et clients.",
    example: "Salesforce ou HubSpot centralise tous les emails échangés, les appels passés, les devis émis et permet d'automatiser les rappels des commerciaux.",
    tools: ["Salesforce", "HubSpot", "Pipedrive", "Monday CRM", "Ines CRM"],
    keywords: ["CRM", "Données clients", "Historique", "Centralisation", "Suivi commercial"],
    bachelorTakeaway: "Si ce n'est pas consigné dans le CRM, cela n'existe pas ! Le CRM garantit la mémoire commerciale de l'entreprise même si un commercial s'en va."
  },
  {
    id: "reverse-ip",
    term: "Reverse IP (Identification d'entreprises visiteuses)",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Technologie MarTech permettant de convertir l'adresse IP anonyme des visiteurs d'un site web en nom d'entreprise, pour révéler quels comptes s'intéressent discrètement à vos offres.",
    example: "Détecter qu'une équipe de chez L'Oréal a passé 15 minutes sur votre page 'Tarifs Entreprise', permettant à vos commerciaux de contacter immédiatement le décideur concerné.",
    tools: ["GetQuanty", "Albacross", "Leadfeeder", "Snitcher", "Clearbit Reveal"],
    keywords: ["Reverse IP", "Visiteurs anonymes", "Intention d'achat", "Signal faible", "Prospection chaude"],
    bachelorTakeaway: "Le Reverse IP transforme votre site web en radar d'intention d'achat pour alimenter vos commerciaux en signaux d'affaires chauds."
  },
  {
    id: "growth-hacking",
    term: "Growth Hacking",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Approche méthodique combinant créativité, analyse de données, automatisation et expérimentations rapides pour déclencher une croissance accélérée à coût maîtrisé.",
    example: "Automatiser l'extraction d'entreprises qui viennent de publier une offre d'emploi sur Welcome to the Jungle, enrichir les emails de leurs RH et leur proposer un test gratuit sous 24h.",
    tools: ["Zapier", "Make", "PhantomBuster", "Dropcontact", "The Growth Machine"],
    keywords: ["Growth Hacking", "AARRR", "Scraping", "Automatisation", "Expérimentation"],
    bachelorTakeaway: "Le Growth Hacking n'est pas de la magie noire : c'est une méthode scientifique de tests rapides (test, measure, learn) itérée chaque semaine."
  },
  {
    id: "email-marketing",
    term: "Email Marketing & Newsletters",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Canal direct d'acquisition et de fidélisation permettant d'adresser des messages collectifs personnalisés (newsletters, annonces produit, emails promotionnels) à une audience consentante (opt-in).",
    example: "Envoyer chaque mardi matin une veille réglementaire synthétique à 4 000 experts-comptables abonnés, intégrant en pied de page une invitation à tester un nouveau module.",
    tools: ["Brevo (ex-Sendinblue)", "Mailchimp", "Customer.io", "HubSpot Email"],
    keywords: ["Emailing", "Newsletter", "Taux d'ouverture", "Taux de clic", "Délivrabilité"],
    bachelorTakeaway: "Votre liste d'abonnés email est l'un des rares canaux que vous possédez réellement (Owned Media), contrairement à vos abonnés LinkedIn ou Google."
  },
  {
    id: "ia-generative",
    term: "IA Générative (LLM)",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Système d'intelligence artificielle fondé sur de grands modèles de langage capable de comprendre des instructions et de générer du texte, du code ou des images de qualité professionnelle.",
    example: "Utiliser Claude ou ChatGPT pour synthétiser un document d'appel d'offres de 80 pages en 5 points clés ou pour rédiger 10 variantes d'accroches pour une campagne LinkedIn.",
    tools: ["ChatGPT (OpenAI)", "Claude (Anthropic)", "Gemini (Google)", "Mistral AI"],
    keywords: ["IA générative", "LLM", "Prompting", "Automatisation de contenu", "Productivité"],
    bachelorTakeaway: "L'IA générative est le cerveau d'appoint du marketeur : elle accélère la réflexion et le prototypage, mais nécessite toujours une validation humaine experte."
  },
  {
    id: "agent-ia",
    term: "Agent IA",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Système autonome basé sur l'IA capable de planifier des étapes, d'utiliser des outils tiers (API, web, CRM), d'exécuter des actions complexes en boucle et d'ajuster son comportement pour atteindre un objectif fixé.",
    example: "Un agent IA qui reçoit la consigne 'Trouve 50 directeurs logistiques en région lyonnaise, vérifie leurs emails avec Dropcontact et ajoute-les dans la campagne Lemlist'.",
    tools: ["Dust", "CrewAI", "AutoGPT", "Zapier Central", "n8n AI Agents"],
    keywords: ["Agent IA", "Autonomie", "Outils", "Multi-étapes", "Exécution"],
    bachelorTakeaway: "Si l'IA générative est le cerveau qui rédige, l'agent IA est le bras qui agit dans vos logiciels sans surveillance continue."
  },
  {
    id: "ia-fine-tunee",
    term: "IA fine-tunée (Modèle spécialisé)",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Modèle d'IA spécifiquement ré-entraîné ou adapté sur des données propriétaires d'un secteur, d'une entreprise ou d'une tâche précise pour atteindre une précision et une pertinence maximales.",
    example: "Une IA entraînée exclusivement sur le corpus juridique du droit fiscal français pour analyser instantanément les contrats clients et proposer des arguments de closing ciblés.",
    tools: ["Fine-tuning OpenAI", "Meet-Magnet (signaux d'affaires)", "Custom GPTs", "Hugging Face"],
    keywords: ["Fine-tuning", "Spécialisation", "Données propriétaires", "Précision métier"],
    bachelorTakeaway: "Une IA généraliste répond à tout moyennement bien ; une IA fine-tunée répond parfaitement aux questions pointues de votre marché B2B."
  },
  {
    id: "prompting-cofre",
    term: "Méthode de prompting COFRE & 7 méthodes",
    category: "data-ia-martech",
    categoryLabel: "MarTech, Data & IA 2025+",
    definition: "Framework rigoureux de structuration d'un prompt pour l'IA : Contexte (qui sommes-nous), Objectif (le résultat visé), Format (forme attendue), Rôle (la casquette de l'IA), Étape (la tâche immédiate).",
    example: "Prompt COFRE : Contexte (Startup RH) + Objectif (500 clients) + Format (Tableau 3 colonnes) + Rôle (Directeur Marketing) + Étape (Rédige le brief de campagne).",
    tools: ["Méthode COFRE", "Few-shot prompting", "Raisonnement pas à pas", "Prompt engineering"],
    keywords: ["COFRE", "Prompting", "Méthode", "Précision", "Ingénierie de prompt"],
    bachelorTakeaway: "Le résultat d'une IA dépend à 90 % de la qualité du cadrage de votre prompt. Garbage in = Garbage out !"
  },
  {
    id: "pipeline-commercial",
    term: "Suivi du pipeline commercial & Vélocité",
    category: "outbound-prospection",
    categoryLabel: "Outbound, Prospection & Vente",
    definition: "Mécanisme de pilotage visuel de toutes les affaires en cours à chaque étape du cycle de vente, permettant d'anticiper le chiffre d'affaires et de mesurer la vélocité commerciale.",
    example: "Réunion hebdomadaire du directeur commercial pour analyser les 30 opportunités en étape 'Négociation' et débloquer les signatures avant la fin du trimestre.",
    tools: ["Tableaux Kanban CRM", "Forecast commercial", "Tableau / Looker Studio"],
    keywords: ["Pipeline", "Vélocité", "Prévisions", "Cycle de vente", "Deals"],
    bachelorTakeaway: "Piloter un pipeline ne consiste pas à regarder le passé, mais à anticiper le chiffre d'affaires des 3 prochains mois pour ajuster les efforts marketing en amont."
  },
  {
    id: "calendrier-editorial",
    term: "Calendrier éditorial & Plan de communication",
    category: "inbound-visibilite",
    categoryLabel: "Inbound Marketing & Visibilité",
    definition: "Outil de planification stratégique et opérationnelle fixant à l'avance les thématiques, formats, canaux de diffusion, dates et responsables de chaque publication marketing.",
    example: "Planning trimestriel précisant : chaque mardi un post LinkedIn d'expertise, chaque jeudi un article de blog SEO, et le dernier vendredi du mois une newsletter récapitulative.",
    tools: ["Notion", "Trello", "Airtable", "Asana", "Google Sheets"],
    keywords: ["Calendrier éditorial", "Planning", "Régularité", "Contenu", "Organisation"],
    bachelorTakeaway: "Sans calendrier éditorial, la création de contenu fonctionne par à-coups et s'effondre à la première urgence opérationnelle."
  }
];
