// Module d'analyse collective pour le Back Office Formateur
// Structure calquée sur la synthèse globale souhaitée (Le plus souvent mis en œuvre vs Ce qui manque le plus souvent)

const SCENARIO_SKILL_LABELS = {
  "q1_1": {
    mastered: "Dimensionnement SOM réaliste (vs TAM théorique)",
    missing: "Distinguer le marché atteignable (SOM) du marché total (TAM)"
  },
  "q1_2": {
    mastered: "Cadrage GTM ordonné (ICP et valeur avant canaux)",
    missing: "Cadrer l'ICP avant d'investir massivement en publicité SEA"
  },
  "q1_3": {
    mastered: "Outillage du comité d'achat B2B (DSI, DAF, DG)",
    missing: "Prendre en compte les bloqueurs techniques/juridiques du comité B2B"
  },
  "q2_1": {
    mastered: "Mix hybride Inbound / Outbound équilibré",
    missing: "Articuler la vélocité Outbound avec la pérennité Inbound"
  },
  "q2_2": {
    mastered: "Complémentarité SEO, SEA et SGO conversationnel",
    missing: "Comprendre l'impact des moteurs d'IA (SGO/GEO) face au SEO"
  },
  "q2_3": {
    mastered: "Employee Advocacy & Thought Leadership incarné",
    missing: "Mobiliser les collaborateurs sans spammer leurs profils personnels"
  },
  "q3_1": {
    mastered: "Frontière stricte MQL vs SQL (Accord SLA)",
    missing: "Formaliser les critères de passage MQL vers SQL avec les ventes"
  },
  "q3_2": {
    mastered: "Lead Scoring pondéré (Fit démographique + Comportement)",
    missing: "Éviter de sur-noter les visites non commerciales (offres d'emploi)"
  },
  "q3_3": {
    mastered: "Lead Nurturing automatisé des comptes froids",
    missing: "Maintenir le contact avec les prospects non mûrs (cycle long)"
  },
  "q4_1": {
    mastered: "Démarche ABM personnalisée sur grands comptes",
    missing: "Privilégier l'ABM ultra-ciblé sur les offres à panier élevé (>40k€)"
  },
  "q4_2": {
    mastered: "Copywriting court (<100 mots) centré problème prospect",
    missing: "Éviter les argumentaires auto-centrés sur l'histoire de l'entreprise"
  },
  "q4_3": {
    mastered: "Enrichissement des données B2B (Sales Nav + Dropcontact)",
    missing: "Cibler les décideurs directs plutôt que les boîtes génériques (contact@)"
  },
  "q5_1": {
    mastered: "Reverse IP pour révéler les visiteurs anonymes",
    missing: "Identifier les comptes en intention d'achat via leur adresse IP"
  },
  "q5_2": {
    mastered: "Expérience sans friction (Formulaire court + API serveur)",
    missing: "Limiter les champs obligatoires des formulaires de capture de leads"
  },
  "q5_3": {
    mastered: "Nudge éthique B2B (Preuve sociale + prise de RDV fluide)",
    missing: "Différencier un Nudge vertueux d'un Dark Pattern anxiogène"
  },
  "q6_1": {
    mastered: "Prompting structuré COFRE (Contexte, Objectif, Format, Rôle, Étape)",
    missing: "Structurer un prompt IA avec des contraintes explicites de résultat"
  },
  "q6_2": {
    mastered: "Distinction IA générative (cerveau) vs Agent IA (bras autonome)",
    missing: "Comprendre la capacité d'action autonome sur API d'un Agent IA"
  },
  "q6_3": {
    mastered: "Optimisation SGO / GEO pour les moteurs IA (Schema.org, autorité)",
    missing: "Optimiser les microdonnées pour être cité par ChatGPT et Perplexity"
  }
};

const VOCAB_SKILL_LABELS = {
  "qz_01": { term: "TAM vs SOM", mastered: "Distinction TAM / SOM", missing: "Différence entre potentiel total et cible réaliste" },
  "qz_02": { term: "Inbound Marketing", mastered: "Attraction de contenu Inbound", missing: "Principe de permission vs démarchage agressif" },
  "qz_03": { term: "ABM (Account-Based Marketing)", mastered: "Stratégie ABM comptes clés", missing: "Ciblage sur-mesure d'un nombre restreint de comptes" },
  "qz_04": { term: "Sales Automation", mastered: "Outils de prospection cadencée", missing: "Rôle de Lemlist, Salesloft et Waalaxy" },
  "qz_05": { term: "Reverse IP", mastered: "Identification Reverse IP", missing: "Détection des entreprises visitant le site web" },
  "qz_06": { term: "MQL vs SQL", mastered: "Frontière MQL / SQL", missing: "Qualification marketing vs projet de vente validé" },
  "qz_07": { term: "Lead Nurturing", mastered: "Maturation Lead Nurturing", missing: "Relation éducative continue avec les leads froids" },
  "qz_08": { term: "SGO / GEO", mastered: "Optimisation Moteurs IA (SGO)", missing: "Visibilité dans les réponses de ChatGPT/Perplexity" },
  "qz_09": { term: "Bases de données B2B", mastered: "Intelligence commerciale (Nomination)", missing: "Enrichissement des organigrammes et signaux d'affaires" },
  "qz_10": { term: "Agent IA vs LLM", mastered: "Autonomie de l'Agent IA", missing: "Capacité d'action autonome sur outils externes" },
  "qz_11": { term: "ICP (Ideal Customer Profile)", mastered: "Définition de l'ICP", missing: "Profil de client idéal à plus forte valeur" },
  "qz_12": { term: "SEO vs SEA", mastered: "Modèle économique SEO vs SEA", missing: "Pérennité organique vs achat de trafic temporaire" },
  "qz_13": { term: "Marketing Automation", mastered: "Outils de maturation (Plezi/HubSpot)", missing: "Scénarios d'emails et tracking comportemental" },
  "qz_14": { term: "Employee Advocacy", mastered: "Programme d'ambassadeurs internes", missing: "Mobilisation des salariés sur réseaux professionnels" },
  "qz_15": { term: "Friction & Formulaires", mastered: "Ergonomie des formulaires de capture", missing: "Impact négatif du nombre excessif de champs" },
  "qz_16": { term: "Méthode COFRE", mastered: "Framework de prompting COFRE", missing: "5 composantes clés du prompt engineering" },
  "qz_17": { term: "Taux de Conversion", mastered: "Calcul des ratios de conversion", missing: "Formule de passage d'une étape à la suivante" },
  "qz_18": { term: "Framework AIDA", mastered: "Structure de persuasion AIDA", missing: "Attention, Intérêt, Désir, Action en prospection" },
  "qz_19": { term: "CRM Pipeline", mastered: "Centralisation CRM & Pipeline", missing: "Historisation des échanges et vélocité commerciale" },
  "qz_20": { term: "Comité d'Achat B2B", mastered: "Complexité collégiale B2B", missing: "Multiplicité des parties prenantes (DSI, DAF, juriste)" }
};

function calculateCollectiveAnalytics(users) {
  if (!users || users.length === 0) {
    users = getRegisteredUsers();
  }

  // --- 1. SYNTHÈSE GLOBALE : MISES EN SITUATION ---
  const scenarioItems = [];
  let totalScenarioAttempts = 0;
  let masteredScenarioCount = 0;
  let inProgressScenarioCount = 0;
  let reworkScenarioCount = 0;

  SCENARIOS_DATA.forEach(mission => {
    mission.questions.forEach(q => {
      let totalAnswers = 0;
      let correctAnswers = 0;

      users.forEach(u => {
        if (u.answers && u.answers[q.id] !== undefined) {
          totalAnswers++;
          const chosen = u.answers[q.id];
          if (q.options[chosen]?.correct) {
            correctAnswers++;
          }
        }
      });

      const pct = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
      totalScenarioAttempts += totalAnswers;

      if (pct >= 75) masteredScenarioCount++;
      else if (pct >= 45) inProgressScenarioCount++;
      else reworkScenarioCount++;

      const meta = SCENARIO_SKILL_LABELS[q.id] || {
        mastered: q.stage,
        missing: q.stage
      };

      scenarioItems.push({
        id: q.id,
        masteredLabel: meta.mastered,
        missingLabel: meta.missing,
        correctAnswers,
        totalAnswers,
        pct
      });
    });
  });

  // Colonne Gauche : Le plus souvent mis en œuvre (tri décroissant)
  const mostMasteredScenarios = [...scenarioItems].sort((a, b) => b.pct - a.pct);
  // Colonne Droite : Ce qui manque le plus souvent (tri croissant : les taux les plus bas en premier)
  const mostMissingScenarios = [...scenarioItems].sort((a, b) => a.pct - b.pct);

  // --- 2. SYNTHÈSE GLOBALE : DÉFI VOCABULAIRE ---
  const vocabItems = [];
  let totalVocabAttempts = 0;
  let masteredVocabCount = 0;
  let inProgressVocabCount = 0;
  let reworkVocabCount = 0;

  QUIZ_QUESTIONS.forEach(qz => {
    let totalAnswers = 0;
    let correctAnswers = 0;

    users.forEach(u => {
      if (u.quizAnswers && u.quizAnswers[qz.id] !== undefined) {
        totalAnswers++;
        if (u.quizAnswers[qz.id] === qz.correct) {
          correctAnswers++;
        }
      }
    });

    const pct = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
    totalVocabAttempts += totalAnswers;

    if (pct >= 75) masteredVocabCount++;
    else if (pct >= 45) inProgressVocabCount++;
    else reworkVocabCount++;

    const meta = VOCAB_SKILL_LABELS[qz.id] || {
      term: qz.question,
      mastered: qz.question,
      missing: qz.question
    };

    vocabItems.push({
      id: qz.id,
      term: meta.term,
      masteredLabel: meta.mastered,
      missingLabel: meta.missing,
      correctAnswers,
      totalAnswers,
      pct
    });
  });

  const mostMasteredVocab = [...vocabItems].sort((a, b) => b.pct - a.pct);
  const mostMissingVocab = [...vocabItems].sort((a, b) => a.pct - b.pct);

  // --- 3. MOYENNES DE LA PROMO ---
  const totalStudents = users.length;
  let sumSc = 0;
  let sumQz = 0;

  users.forEach(u => {
    sumSc += (u.scenarioScore || 0);
    sumQz += (u.quizScore || 0);
  });

  const avgScenario = totalStudents > 0 ? Math.round(sumSc / totalStudents) : 0;
  const avgQuiz = totalStudents > 0 ? Math.round(sumQz / totalStudents) : 0;

  return {
    totalStudents,
    avgScenario,
    avgQuiz,
    // Synthèse Mises en situation
    scenarios: {
      totalAttempts: totalScenarioAttempts,
      masteredCount: masteredScenarioCount,
      inProgressCount: inProgressScenarioCount,
      reworkCount: reworkScenarioCount,
      mostMastered: mostMasteredScenarios,
      mostMissing: mostMissingScenarios
    },
    // Synthèse Vocabulaire
    vocab: {
      totalAttempts: totalVocabAttempts,
      masteredCount: masteredVocabCount,
      inProgressCount: inProgressVocabCount,
      reworkCount: reworkVocabCount,
      mostMastered: mostMasteredVocab,
      mostMissing: mostMissingVocab
    }
  };
}
