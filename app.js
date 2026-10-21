// Logique applicative principale - Acquisition Quest B2B
// Intégration Droits d'Accès, Back Office Formateur (Thibaut Ducleuziou) et Analytics Collectives

// --- ÉTAT GLOBAL DE L'APPLICATION ---
const APP_STATE = {
  currentUser: null, // { id, nom, prenom, niveau, promo, role, email }
  soundEnabled: true,
  currentTab: "missions",
  activeMissionId: null,
  activeQuestionIndex: 0,
  missionsProgress: {},
  quiz: {
    active: false,
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    selectedOption: null,
    answered: false
  },
  skillPoints: {
    "strategie-marche": 0,
    "inbound-visibilite": 0,
    "conversion-nurturing": 0,
    "outbound-prospection": 0,
    "data-ia-martech": 0
  },
  glossaryMode: "cards",
  glossaryCategory: "all",
  glossarySearchQuery: "",
  radarChartInstance: null,
  backofficePromoFilter: "all",
  backofficeExpandedScenarios: false,
  backofficeExpandedVocab: false
};

// --- INITIALISATION AU CHARGEMENT (RÉSISTANT À DOMCONTENTLOADED DÉJÀ DÉCLENCHÉ) ---
function initApp() {
  // 1. Raccourcis URL pour tests rapides (?admin=true ou ?logout=true)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("logout") === "true") {
      clearUserSession();
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get("admin") === "true") {
      const adminSession = {
        id: "admin",
        nom: "Ducleuziou",
        prenom: "Thibaut",
        email: AUTH_CONFIG.ADMIN_EMAIL,
        role: "admin",
        promo: "Formateur Weesifi"
      };
      setCurrentUserSession(adminSession);
      APP_STATE.currentUser = adminSession;
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } catch (e) {}

  // 2. Vérification de l'authentification
  checkUserAuth();
  updateHeaderUI();
  renderMissionsList();
  renderGlossaryCategoryFilters();
  renderGlossary();
  renderQuizIntro();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// --- GESTION DE L'AUTHENTIFICATION & DES SESSIONS ---
function checkUserAuth() {
  const session = getCurrentUserSession();
  const authModal = document.getElementById("authScreenModal");

  if (!session) {
    // Aucun utilisateur connecté : afficher la page de login par défaut
    if (authModal) authModal.classList.remove("hidden");
    APP_STATE.currentUser = null;
  } else {
    // Utilisateur déjà en session
    APP_STATE.currentUser = session;
    if (authModal) authModal.classList.add("hidden");
    applyUserSession(session);
  }
}

function applyUserSession(user) {
  const nameDisplay = document.getElementById("studentNameDisplay");
  const promoBadge = document.getElementById("headerPromoBadge");
  const profileIcon = document.getElementById("userProfileIcon");
  const bannerPromo = document.getElementById("bannerPromoDisplay");

  if (user.role === "admin") {
    if (nameDisplay) nameDisplay.textContent = "Thibaut Ducleuziou (Formateur)";
    if (promoBadge) {
      promoBadge.textContent = "ADMIN FORMATEUR";
      promoBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30";
    }
    if (profileIcon) profileIcon.className = "fa-solid fa-user-shield text-amber-400";
    // Ouvrir immédiatement le Back Office pour le formateur
    switchTab("backoffice");
  } else {
    if (nameDisplay) nameDisplay.textContent = `${user.prenom} ${user.nom}`;
    if (promoBadge) {
      promoBadge.textContent = user.promo || "BACHELOR 3";
      promoBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
    }
    if (profileIcon) profileIcon.className = "fa-solid fa-user-graduate text-indigo-400";
    if (bannerPromo) bannerPromo.textContent = `Évaluation Diagnostique • ${user.niveau || "Bachelor 3"} • Promo ${user.promo || "B3-MKT-2026"}`;
    
    // Charger la progression de l'étudiant
    loadStudentData(user.id);
  }
}

function loadStudentData(userId) {
  const users = getRegisteredUsers();
  const student = users.find(u => u.id === userId);
  if (student) {
    if (student.answers) {
      SCENARIOS_DATA.forEach(m => {
        let mScore = 0;
        const mAnswers = {};
        let answeredCount = 0;
        m.questions.forEach(q => {
          if (student.answers[q.id] !== undefined) {
            const chosen = student.answers[q.id];
            mAnswers[q.id] = chosen;
            answeredCount++;
            if (q.options[chosen]?.correct) mScore += 25;
          }
        });
        if (answeredCount > 0) {
          APP_STATE.missionsProgress[m.id] = {
            completed: answeredCount === m.questions.length,
            score: mScore,
            answers: mAnswers
          };
        }
      });
    }

    if (student.quizScore) {
      APP_STATE.quiz.score = student.quizScore;
    }

    recalcSkillPoints();
    updateHeaderUI();
    renderMissionsList();
    updateDiagnosticDashboard();
  }
}

function recalcSkillPoints() {
  APP_STATE.skillPoints = {
    "strategie-marche": 0,
    "inbound-visibilite": 0,
    "conversion-nurturing": 0,
    "outbound-prospection": 0,
    "data-ia-martech": 0
  };

  SCENARIOS_DATA.forEach(mission => {
    const p = APP_STATE.missionsProgress[mission.id];
    if (p && p.answers) {
      mission.questions.forEach(q => {
        const chosen = p.answers[q.id];
        if (chosen !== undefined && q.options[chosen]?.correct && q.skillPoints) {
          Object.entries(q.skillPoints).forEach(([cat, pts]) => {
            APP_STATE.skillPoints[cat] = (APP_STATE.skillPoints[cat] || 0) + pts;
          });
        }
      });
    }
  });
}

function setAuthTab(tab) {
  playSound("click");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const trainerForm = document.getElementById("trainerLoginForm");
  const tabLogin = document.getElementById("authTabBtn_login");
  const tabRegister = document.getElementById("authTabBtn_register");
  const tabTrainer = document.getElementById("authTabBtn_trainer");

  // Réinitialiser les formulaires
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  trainerForm.classList.add("hidden");

  tabLogin.className = "py-2.5 rounded-xl transition text-slate-400 hover:text-white";
  tabRegister.className = "py-2.5 rounded-xl transition text-slate-400 hover:text-white";
  tabTrainer.className = "py-2.5 rounded-xl transition text-amber-400 hover:text-amber-300 hover:bg-amber-950/20";

  if (tab === "login") {
    loginForm.classList.remove("hidden");
    tabLogin.className = "py-2.5 rounded-xl transition bg-indigo-600 text-white shadow";
  } else if (tab === "register") {
    registerForm.classList.remove("hidden");
    tabRegister.className = "py-2.5 rounded-xl transition bg-indigo-600 text-white shadow";
  } else if (tab === "trainer") {
    trainerForm.classList.remove("hidden");
    tabTrainer.className = "py-2.5 rounded-xl transition bg-amber-500 text-slate-950 font-black shadow";
    const tEmail = document.getElementById("trainerEmailInput");
    const tPass = document.getElementById("trainerPasswordInput");
    if (tEmail) tEmail.value = "";
    if (tPass) tPass.value = "";
  }
}

// 1. Connexion Étudiant
function handleLoginSubmit(e) {
  e.preventDefault();
  const identifier = document.getElementById("loginIdentifier").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  // Si l'utilisateur a saisi l'email formateur par erreur dans le formulaire étudiant
  if (identifier.toLowerCase() === AUTH_CONFIG.ADMIN_EMAIL.toLowerCase()) {
    if (password === AUTH_CONFIG.ADMIN_PASS) {
      loginAsAdmin();
      return;
    }
  }

  const users = getRegisteredUsers();
  const cleanId = identifier.toLowerCase();
  
  const student = users.find(u => {
    const fullName = `${u.prenom} ${u.nom}`.toLowerCase();
    const reverseFullName = `${u.nom} ${u.prenom}`.toLowerCase();
    return (fullName === cleanId || reverseFullName === cleanId || u.nom.toLowerCase() === cleanId || u.id.toLowerCase() === cleanId);
  });

  if (!student) {
    playSound("error");
    alert(`Aucun compte étudiant trouvé pour "${identifier}". Veuillez vérifier l'orthographe ou créer un compte via l'onglet "Inscription".`);
    return;
  }

  if (student.pass && student.pass !== password) {
    playSound("error");
    alert("Mot de passe incorrect pour cet étudiant. Utilisez le lien 'Mot de passe oublié ?' si nécessaire.");
    return;
  }

  // Connexion étudiante réussie
  playSound("success");
  const studentSession = {
    id: student.id,
    nom: student.nom,
    prenom: student.prenom,
    niveau: student.niveau || "Bachelor 3",
    promo: student.promo || "B3-MKT-2026",
    role: "student"
  };

  setCurrentUserSession(studentSession);
  APP_STATE.currentUser = studentSession;
  document.getElementById("authScreenModal").classList.add("hidden");
  applyUserSession(studentSession);
  switchTab("missions");
}

// 2. Connexion Formateur (Back Office)
function handleTrainerLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("trainerEmailInput").value.trim();
  const password = document.getElementById("trainerPasswordInput").value.trim();

  if (email.toLowerCase() === AUTH_CONFIG.ADMIN_EMAIL.toLowerCase() && password === AUTH_CONFIG.ADMIN_PASS) {
    loginAsAdmin();
  } else {
    playSound("error");
    alert("Identifiants formateur invalides. Veuillez vérifier l'email et le mot de passe.");
  }
}

function loginAsAdmin() {
  playSound("complete");
  const adminSession = {
    id: "admin",
    nom: "Ducleuziou",
    prenom: "Thibaut",
    email: AUTH_CONFIG.ADMIN_EMAIL,
    role: "admin",
    promo: "Formateur Weesifi"
  };
  setCurrentUserSession(adminSession);
  APP_STATE.currentUser = adminSession;
  
  const authModal = document.getElementById("authScreenModal");
  if (authModal) authModal.classList.add("hidden");

  closeAdminAuthModal();
  applyUserSession(adminSession);
}

// 3. Inscription Étudiant
function handleRegisterSubmit(e) {
  e.preventDefault();
  const nom = document.getElementById("regNom").value.trim();
  const prenom = document.getElementById("regPrenom").value.trim();
  const niveau = document.getElementById("regNiveau").value;
  const promo = document.getElementById("regPromo").value.trim();
  const pass = document.getElementById("regPassword").value;
  const passConfirm = document.getElementById("regPasswordConfirm").value;

  if (pass !== passConfirm) {
    playSound("error");
    alert("Les deux mots de passe ne correspondent pas.");
    return;
  }

  const users = getRegisteredUsers();
  const existing = users.find(u => u.nom.toLowerCase() === nom.toLowerCase() && u.prenom.toLowerCase() === prenom.toLowerCase());
  if (existing) {
    playSound("error");
    alert(`Un étudiant nommé ${prenom} ${nom} est déjà enregistré. Veuillez vous connecter.`);
    setAuthTab("login");
    document.getElementById("loginIdentifier").value = `${prenom} ${nom}`;
    return;
  }

  const newId = `std_${Date.now()}`;
  const newUser = {
    id: newId,
    nom,
    prenom,
    niveau,
    promo: promo || "B3-MKT-2026",
    pass,
    scenarioScore: 0,
    quizScore: 0,
    completedMissions: 0,
    answers: {},
    quizAnswers: {}
  };

  users.push(newUser);
  saveRegisteredUsers(users);

  playSound("complete");
  triggerConfetti(0.5);

  const studentSession = {
    id: newUser.id,
    nom: newUser.nom,
    prenom: newUser.prenom,
    niveau: newUser.niveau,
    promo: newUser.promo,
    role: "student"
  };

  setCurrentUserSession(studentSession);
  APP_STATE.currentUser = studentSession;
  document.getElementById("authScreenModal").classList.add("hidden");
  applyUserSession(studentSession);
  switchTab("missions");
}

function handleLogout() {
  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    clearUserSession();
    APP_STATE.currentUser = null;
    playSound("click");
    
    // Réafficher l'écran de login
    const authModal = document.getElementById("authScreenModal");
    if (authModal) authModal.classList.remove("hidden");

    // Réinitialiser la barre supérieure
    const nameDisplay = document.getElementById("studentNameDisplay");
    if (nameDisplay) nameDisplay.textContent = "Étudiant(e)";
  }
}

// Modal Admin Auth en cours de navigation
function openAdminAuthModal() {
  playSound("click");
  const modal = document.getElementById("adminAuthModal");
  if (modal) modal.classList.remove("hidden");
  const mEmail = document.getElementById("modalAdminEmail");
  const mPass = document.getElementById("modalAdminPassword");
  if (mEmail) mEmail.value = "";
  if (mPass) mPass.value = "";
}

function closeAdminAuthModal() {
  const modal = document.getElementById("adminAuthModal");
  if (modal) modal.classList.add("hidden");
}

function handleDirectAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById("modalAdminEmail").value.trim();
  const pass = document.getElementById("modalAdminPassword").value.trim();

  if (email.toLowerCase() === AUTH_CONFIG.ADMIN_EMAIL.toLowerCase() && pass === AUTH_CONFIG.ADMIN_PASS) {
    loginAsAdmin();
  } else {
    playSound("error");
    alert("Identifiants formateur incorrects.");
  }
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

function openForgotPasswordModal() {
  playSound("click");
  document.getElementById("forgotPasswordModal").classList.remove("hidden");
}

function closeForgotPasswordModal() {
  playSound("click");
  document.getElementById("forgotPasswordModal").classList.add("hidden");
}

function handleResetPasswordSubmit(e) {
  e.preventDefault();
  const nom = document.getElementById("resetNom").value.trim().toLowerCase();
  const prenom = document.getElementById("resetPrenom").value.trim().toLowerCase();
  const promo = document.getElementById("resetPromo").value.trim().toLowerCase();
  const newPass = document.getElementById("resetNewPass").value.trim();

  const users = getRegisteredUsers();
  const user = users.find(u => u.nom.toLowerCase() === nom && u.prenom.toLowerCase() === prenom && u.promo.toLowerCase() === promo);

  if (!user) {
    playSound("error");
    alert("Aucun étudiant ne correspond à ces informations (Nom, Prénom, Promotion).");
    return;
  }

  user.pass = newPass;
  saveRegisteredUsers(users);
  playSound("success");
  alert(`Mot de passe renouvelé avec succès pour ${user.prenom} ${user.nom}.`);
  closeForgotPasswordModal();
  setAuthTab("login");
  document.getElementById("loginIdentifier").value = `${user.prenom} ${user.nom}`;
  document.getElementById("loginPassword").value = newPass;
}

// Sauvegarde automatique des scores étudiants
function persistStudentProgress() {
  if (!APP_STATE.currentUser || APP_STATE.currentUser.role === "admin") return;

  const users = getRegisteredUsers();
  const userIndex = users.findIndex(u => u.id === APP_STATE.currentUser.id);
  if (userIndex === -1) return;

  let totalScenarioScore = 0;
  let completedCount = 0;
  const flatAnswers = {};

  SCENARIOS_DATA.forEach(m => {
    const p = APP_STATE.missionsProgress[m.id];
    if (p) {
      if (p.completed) completedCount++;
      if (p.score) totalScenarioScore += p.score;
      if (p.answers) {
        Object.entries(p.answers).forEach(([qId, ans]) => {
          flatAnswers[qId] = ans;
        });
      }
    }
  });

  const maxPossibleScenario = SCENARIOS_DATA.length * 75;
  const scenarioPct = maxPossibleScenario > 0 ? Math.min(100, Math.round((totalScenarioScore / maxPossibleScenario) * 100)) : 0;

  users[userIndex].scenarioScore = scenarioPct;
  users[userIndex].completedMissions = completedCount;
  users[userIndex].answers = flatAnswers;

  if (APP_STATE.quiz.score > 0) {
    users[userIndex].quizScore = Math.min(100, Math.round((APP_STATE.quiz.score / (APP_STATE.quiz.questions.length * 10 || 100)) * 100));
  }

  saveRegisteredUsers(users);
}

// --- SYNTHÈSE SONORE WEB AUDIO API ---
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playSound(type) {
  if (!APP_STATE.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.50, now + 0.24);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === "error") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "complete") {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + idx * 0.07);
        g.gain.setValueAtTime(0.12, now + idx * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
        o.start(now + idx * 0.07);
        o.stop(now + idx * 0.07 + 0.3);
      });
    }
  } catch (e) {}
}

function toggleSound() {
  APP_STATE.soundEnabled = !APP_STATE.soundEnabled;
  const icon = document.getElementById("soundIcon");
  if (APP_STATE.soundEnabled) {
    icon.className = "fa-solid fa-volume-high";
    playSound("click");
  } else {
    icon.className = "fa-solid fa-volume-xmark";
  }
}

// --- NAVIGATION PAR ONGLETS ---
function switchTab(tabId) {
  // Protection de l'onglet Back Office
  if (tabId === "backoffice") {
    if (!APP_STATE.currentUser || APP_STATE.currentUser.role !== "admin") {
      openAdminAuthModal();
      return;
    }
  }

  APP_STATE.currentTab = tabId;
  playSound("click");

  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.classList.remove("bg-indigo-600", "text-white", "font-semibold");
    btn.classList.add("text-slate-400", "hover:text-slate-200", "hover:bg-slate-800/60");
  });

  const targetContent = document.getElementById(`tab-${tabId}`);
  if (targetContent) targetContent.classList.add("active");

  const targetBtn = document.getElementById(`tab-btn-${tabId}`);
  if (targetBtn) {
    targetBtn.classList.remove("text-slate-400", "hover:text-slate-200", "hover:bg-slate-800/60");
    targetBtn.classList.add("bg-indigo-600", "text-white", "font-semibold");
  }

  if (tabId === "bilan") {
    updateDiagnosticDashboard();
  } else if (tabId === "backoffice") {
    renderBackoffice();
  }
}

function updateHeaderUI() {
  let totalScore = 0;
  Object.values(APP_STATE.missionsProgress).forEach(m => {
    if (m && m.score) totalScore += m.score;
  });
  if (APP_STATE.quiz.score) totalScore += APP_STATE.quiz.score;

  const scoreDisplay = document.getElementById("topScoreDisplay");
  if (scoreDisplay) scoreDisplay.textContent = `${totalScore} pts`;
}

// --- MODULE 1 : MISSIONS EN SITUATION ---
function renderMissionsList() {
  const container = document.getElementById("missionViewContainer");
  if (!container) return;

  if (APP_STATE.activeMissionId) {
    renderActiveMissionRunner();
    return;
  }

  let completedCount = 0;
  SCENARIOS_DATA.forEach(s => {
    if (APP_STATE.missionsProgress[s.id]?.completed) completedCount++;
  });

  const missionsHtml = `
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center space-x-2">
          <i class="fa-solid fa-folder-tree text-indigo-400"></i>
          <span>Les 6 Missions Professionnelles</span>
        </h2>
        <p class="text-xs text-slate-400">Choisissez une situation réelle pour tester vos réflexes d'acquisition.</p>
      </div>
      <div class="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
        Progression : <span class="text-indigo-400">${completedCount}</span> / ${SCENARIOS_DATA.length} missions
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${SCENARIOS_DATA.map((mission, index) => {
        const progress = APP_STATE.missionsProgress[mission.id];
        const isCompleted = progress?.completed;
        const score = progress?.score || 0;
        const maxScore = mission.questions.length * 25;

        return `
          <div class="glass-card rounded-2xl p-6 border ${isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'} flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-indigo-400 border border-slate-700'}">
                  ${isCompleted ? '✓ Complétée' : `Mission ${index + 1}`}
                </span>
                <span class="text-xs font-mono font-bold ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}">
                  ${isCompleted ? `${score} / ${maxScore} pts` : `${maxScore} pts`}
                </span>
              </div>

              <h3 class="text-base font-extrabold text-white leading-snug line-clamp-2">
                ${mission.title}
              </h3>

              <div class="space-y-1 text-xs text-slate-400">
                <div class="flex items-center space-x-1.5">
                  <i class="fa-solid fa-building text-slate-400 text-[10px]"></i>
                  <span class="text-slate-300 font-medium">${mission.client}</span>
                </div>
                <div class="flex items-center space-x-1.5">
                  <i class="fa-solid fa-user-tie text-slate-400 text-[10px]"></i>
                  <span>${mission.role}</span>
                </div>
              </div>

              <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                ${mission.context}
              </p>
            </div>

            <div class="pt-2 border-t border-slate-800/80">
              <button onclick="startMission('${mission.id}')" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${isCompleted ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'}">
                <span>${isCompleted ? 'Recommencer la mission' : 'Relever le défi'}</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  container.innerHTML = missionsHtml;
}

function startMission(missionId) {
  APP_STATE.activeMissionId = missionId;
  APP_STATE.activeQuestionIndex = 0;
  playSound("click");
  renderActiveMissionRunner();
}

function renderActiveMissionRunner() {
  const container = document.getElementById("missionViewContainer");
  const mission = SCENARIOS_DATA.find(s => s.id === APP_STATE.activeMissionId);
  if (!container || !mission) return;

  const currentQIndex = APP_STATE.activeQuestionIndex;
  const question = mission.questions[currentQIndex];
  const totalQuestions = mission.questions.length;
  const currentStep = currentQIndex + 1;
  const progressPercent = Math.round((currentStep / totalQuestions) * 100);

  const missionSaved = APP_STATE.missionsProgress[mission.id] || { answers: {}, score: 0 };
  const selectedAnswer = missionSaved.answers?.[question.id];
  const hasAnswered = selectedAnswer !== undefined;

  const html = `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <div class="flex items-center justify-between">
        <button onclick="exitActiveMission()" class="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Retour aux 6 missions</span>
        </button>

        <div class="flex items-center space-x-2 text-xs">
          <span class="text-slate-400">Étape ${currentStep} sur ${totalQuestions}</span>
          <div class="w-24 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div class="bg-indigo-500 h-full transition-all duration-300" style="width: ${progressPercent}%"></div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            ${mission.client}
          </span>
          <span class="text-xs text-slate-400 flex items-center space-x-1">
            <i class="fa-solid fa-user-tie text-indigo-400"></i>
            <span>Votre rôle : <strong class="text-slate-200">${mission.role}</strong></span>
          </span>
        </div>
        
        <h2 class="text-xl sm:text-2xl font-black text-white">${mission.title}</h2>
        <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <i class="fa-solid fa-circle-info text-indigo-400 mr-1.5"></i>
          <strong>Situation :</strong> ${mission.context}
        </div>
      </div>

      <div class="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
        <div class="space-y-2">
          <span class="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>${question.stage}</span>
          </span>
          <h3 class="text-lg sm:text-xl font-bold text-white leading-relaxed">
            ${question.dilemma}
          </h3>
        </div>

        <div class="space-y-3">
          ${question.options.map((option, optIdx) => {
            let optionClasses = "border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/40 text-slate-200";
            let iconHtml = `<div class="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0">${String.fromCharCode(65 + optIdx)}</div>`;

            if (hasAnswered) {
              if (optIdx === selectedAnswer) {
                if (option.correct) {
                  optionClasses = "border-emerald-500 bg-emerald-950/40 text-emerald-200";
                  iconHtml = `<div class="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 text-xs flex items-center justify-center font-bold flex-shrink-0"><i class="fa-solid fa-check"></i></div>`;
                } else {
                  optionClasses = "border-rose-500 bg-rose-950/40 text-rose-200";
                  iconHtml = `<div class="w-7 h-7 rounded-lg bg-rose-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0"><i class="fa-solid fa-xmark"></i></div>`;
                }
              } else if (option.correct) {
                optionClasses = "border-emerald-500/60 bg-emerald-950/20 text-emerald-300";
                iconHtml = `<div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold flex-shrink-0"><i class="fa-solid fa-check"></i></div>`;
              } else {
                optionClasses = "border-slate-800/40 opacity-50 text-slate-400";
              }
            }

            return `
              <button 
                onclick="${hasAnswered ? '' : `chooseMissionOption(${optIdx})`}"
                ${hasAnswered ? 'disabled' : ''}
                class="w-full text-left p-4 rounded-xl border bg-slate-900/60 flex items-start space-x-3.5 transition ${optionClasses} cursor-pointer"
              >
                ${iconHtml}
                <div class="flex-1 text-xs sm:text-sm leading-relaxed">${option.text}</div>
              </button>
            `;
          }).join("")}
        </div>

        ${hasAnswered ? `
          <div class="p-5 rounded-xl border ${question.options[selectedAnswer].correct ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-rose-500/40 bg-rose-950/20'} space-y-4 animate-fadeIn">
            <div class="flex items-center space-x-2">
              <i class="fa-solid ${question.options[selectedAnswer].correct ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-400'} text-lg"></i>
              <h4 class="font-bold text-sm ${question.options[selectedAnswer].correct ? 'text-emerald-300' : 'text-rose-300'}">
                ${question.options[selectedAnswer].correct ? 'Décision Stratégique Recommandée !' : 'Attention : Piège de Situation !'}
              </h4>
            </div>

            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              ${question.options[selectedAnswer].feedback}
            </p>

            ${question.linkedTerms?.length ? `
              <div class="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span class="text-[11px] font-bold text-slate-400">Concepts du glossaire mobilisés :</span>
                ${question.linkedTerms.map(termId => {
                  const termObj = GLOSSARY_DATA.find(t => t.id === termId);
                  return `
                    <button onclick="openTermModal('${termId}')" class="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center space-x-1 transition">
                      <i class="fa-solid fa-book-open text-[10px]"></i>
                      <span>${termObj ? termObj.term : termId}</span>
                    </button>
                  `;
                }).join("")}
              </div>
            ` : ''}

            <div class="pt-3 flex justify-end">
              <button onclick="advanceMissionQuestion()" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition">
                <span>${currentStep < totalQuestions ? "Continuer vers l'étape suivante" : "Voir le bilan de la mission"}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;

  container.innerHTML = html;
}

function chooseMissionOption(optIndex) {
  const mission = SCENARIOS_DATA.find(s => s.id === APP_STATE.activeMissionId);
  if (!mission) return;

  const question = mission.questions[APP_STATE.activeQuestionIndex];
  const isCorrect = question.options[optIndex].correct;

  if (!APP_STATE.missionsProgress[mission.id]) {
    APP_STATE.missionsProgress[mission.id] = { completed: false, score: 0, answers: {} };
  }

  APP_STATE.missionsProgress[mission.id].answers[question.id] = optIndex;

  if (isCorrect) {
    playSound("success");
    triggerConfetti(0.3);
    APP_STATE.missionsProgress[mission.id].score += 25;

    if (question.skillPoints) {
      Object.entries(question.skillPoints).forEach(([category, pts]) => {
        APP_STATE.skillPoints[category] = (APP_STATE.skillPoints[category] || 0) + pts;
      });
    }
  } else {
    playSound("error");
  }

  persistStudentProgress();
  updateHeaderUI();
  renderActiveMissionRunner();
}

function advanceMissionQuestion() {
  const mission = SCENARIOS_DATA.find(s => s.id === APP_STATE.activeMissionId);
  if (!mission) return;

  if (APP_STATE.activeQuestionIndex < mission.questions.length - 1) {
    APP_STATE.activeQuestionIndex++;
    playSound("click");
    renderActiveMissionRunner();
  } else {
    APP_STATE.missionsProgress[mission.id].completed = true;
    persistStudentProgress();
    playSound("complete");
    triggerConfetti(0.8);
    renderMissionCompletionSummary(mission);
  }
}

function renderMissionCompletionSummary(mission) {
  const container = document.getElementById("missionViewContainer");
  const progress = APP_STATE.missionsProgress[mission.id];
  const score = progress?.score || 0;
  const maxScore = mission.questions.length * 25;

  let feedbackTitle = "Mission Validée avec Succès !";
  let feedbackDesc = "Vos décisions stratégiques ont été enregistrées. Consultez le Bilan pour voir l'évolution de vos compétences.";
  if (score < 50) {
    feedbackTitle = "Mission Terminée - Points d'arbitrage à consolider";
    feedbackDesc = "Certains pièges classiques du B2B ont été rencontrés. Consultez les notions associées dans le Glossaire.";
  }

  const html = `
    <div class="max-w-2xl mx-auto glass-card rounded-2xl p-8 border border-indigo-500/30 text-center space-y-6 shadow-2xl animate-fadeIn">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white text-3xl mx-auto shadow-lg shadow-indigo-500/30">
        <i class="fa-solid fa-trophy"></i>
      </div>

      <div class="space-y-2">
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          Mission Enregistrée
        </span>
        <h2 class="text-2xl font-black text-white">${feedbackTitle}</h2>
        <p class="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">${feedbackDesc}</p>
      </div>

      <div class="p-6 rounded-xl bg-slate-950/80 border border-slate-800 max-w-sm mx-auto">
        <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Score de la Mission</span>
        <div class="text-4xl font-extrabold text-gradient mt-1">${score} / ${maxScore} pts</div>
        <span class="text-xs text-emerald-400 font-semibold mt-1 block">${Math.round((score / maxScore) * 100)}% de réussite</span>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button onclick="exitActiveMission()" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition">
          Retour aux 6 missions
        </button>
        <button onclick="switchTab('bilan')" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Consulter mon Bilan</span>
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function exitActiveMission() {
  APP_STATE.activeMissionId = null;
  playSound("click");
  renderMissionsList();
}

// --- MODULE 2 : DÉFI VOCABULAIRE EXPRESS ---
function renderQuizIntro() {
  const container = document.getElementById("quizContainer");
  if (!container) return;

  const html = `
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <i class="fa-solid fa-stopwatch"></i>
          <span>Mode Chrono & Diagnostic Rapide</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
          Le Défi Vocabulaire <span class="text-gradient">Express</span>
        </h2>
        <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Testez votre maîtrise instantanée des termes clés, des outils MarTech (Lemlist, HubSpot, Reverse IP, CRM...) et déjouez les pièges du marketing d'acquisition B2B.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <label class="text-xs font-bold text-slate-300 flex items-center space-x-2">
              <i class="fa-solid fa-list-ol text-indigo-400"></i>
              <span>Nombre de questions :</span>
            </label>
            <div class="flex space-x-2">
              <button onclick="setQuizQuestionCount(10)" id="qCountBtn10" class="flex-1 py-2 rounded-lg bg-indigo-600 text-white font-bold text-xs">10 Questions (5 min)</button>
              <button onclick="setQuizQuestionCount(20)" id="qCountBtn20" class="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs">20 Questions (Complet)</button>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <label class="text-xs font-bold text-slate-300 flex items-center space-x-2">
              <i class="fa-solid fa-fire text-amber-400"></i>
              <span>Série de victoires (Streak) :</span>
            </label>
            <div class="text-xs text-slate-400 leading-relaxed">
              Enchaînez les bonnes réponses consécutives pour booster votre score final !
            </div>
          </div>
        </div>

        <div class="pt-4 flex justify-center">
          <button onclick="startQuiz()" class="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition">
            <i class="fa-solid fa-play"></i>
            <span>Démarrer le Défi Vocabulaire</span>
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

let selectedQuizCount = 10;
function setQuizQuestionCount(count) {
  selectedQuizCount = count;
  const btn10 = document.getElementById("qCountBtn10");
  const btn20 = document.getElementById("qCountBtn20");
  if (count === 10) {
    btn10.className = "flex-1 py-2 rounded-lg bg-indigo-600 text-white font-bold text-xs";
    btn20.className = "flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs";
  } else {
    btn20.className = "flex-1 py-2 rounded-lg bg-indigo-600 text-white font-bold text-xs";
    btn10.className = "flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs";
  }
}

function startQuiz() {
  playSound("click");
  const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
  APP_STATE.quiz.questions = shuffled.slice(0, selectedQuizCount);
  APP_STATE.quiz.currentIndex = 0;
  APP_STATE.quiz.score = 0;
  APP_STATE.quiz.streak = 0;
  APP_STATE.quiz.maxStreak = 0;
  APP_STATE.quiz.active = true;
  APP_STATE.quiz.answered = false;
  APP_STATE.quiz.selectedOption = null;

  renderActiveQuizQuestion();
}

function renderActiveQuizQuestion() {
  const container = document.getElementById("quizContainer");
  const qState = APP_STATE.quiz;
  const currentQ = qState.questions[qState.currentIndex];
  if (!container || !currentQ) return;

  const currentNum = qState.currentIndex + 1;
  const total = qState.questions.length;

  const html = `
    <div class="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      
      <div class="flex items-center justify-between glass-panel px-5 py-3 rounded-xl border border-slate-800 text-xs">
        <div class="flex items-center space-x-2">
          <span class="font-bold text-white">Question ${currentNum} / ${total}</span>
          <span class="text-slate-500">•</span>
          <span class="px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-semibold uppercase text-[10px]">${currentQ.category}</span>
        </div>

        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1.5 text-amber-400 font-bold">
            <i class="fa-solid fa-fire"></i>
            <span>Streak : ${qState.streak}</span>
          </div>
          <div class="flex items-center space-x-1.5 text-emerald-400 font-bold font-mono">
            <i class="fa-solid fa-bolt"></i>
            <span>${qState.score} pts</span>
          </div>
        </div>
      </div>

      <div class="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
        <h3 class="text-lg sm:text-xl font-bold text-white leading-relaxed">
          ${currentQ.question}
        </h3>

        <div class="space-y-3">
          ${currentQ.options.map((opt, idx) => {
            let btnClass = "border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/40 text-slate-200";
            let icon = `<div class="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0">${String.fromCharCode(65 + idx)}</div>`;

            if (qState.answered) {
              if (idx === qState.selectedOption) {
                if (idx === currentQ.correct) {
                  btnClass = "border-emerald-500 bg-emerald-950/40 text-emerald-200";
                  icon = `<div class="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 text-xs flex items-center justify-center font-bold flex-shrink-0"><i class="fa-solid fa-check"></i></div>`;
                } else {
                  btnClass = "border-rose-500 bg-rose-950/40 text-rose-200";
                  icon = `<div class="w-7 h-7 rounded-lg bg-rose-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0"><i class="fa-solid fa-xmark"></i></div>`;
                }
              } else if (idx === currentQ.correct) {
                btnClass = "border-emerald-500/60 bg-emerald-950/20 text-emerald-300";
                icon = `<div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold flex-shrink-0"><i class="fa-solid fa-check"></i></div>`;
              } else {
                btnClass = "border-slate-800/40 opacity-40 text-slate-400";
              }
            }

            return `
              <button 
                onclick="${qState.answered ? '' : `chooseQuizOption(${idx})`}"
                ${qState.answered ? 'disabled' : ''}
                class="w-full text-left p-4 rounded-xl border bg-slate-900/60 flex items-start space-x-3 transition ${btnClass} cursor-pointer"
              >
                ${icon}
                <div class="flex-1 text-xs sm:text-sm leading-relaxed">${opt}</div>
              </button>
            `;
          }).join("")}
        </div>

        ${qState.answered ? `
          <div class="p-4 rounded-xl border ${qState.selectedOption === currentQ.correct ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-rose-500/40 bg-rose-950/20'} space-y-3 animate-fadeIn">
            <div class="flex items-center space-x-2 text-xs font-bold ${qState.selectedOption === currentQ.correct ? 'text-emerald-300' : 'text-rose-300'}">
              <i class="fa-solid ${qState.selectedOption === currentQ.correct ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
              <span>${qState.selectedOption === currentQ.correct ? 'Bonne réponse !' : 'Explication pédagogique :'}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${currentQ.explanation}</p>
            <div class="pt-2 flex justify-end">
              <button onclick="nextQuizQuestion()" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition">
                <span>${currentNum < total ? 'Question suivante' : 'Voir le score final'}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;

  container.innerHTML = html;
}

function chooseQuizOption(idx) {
  const qState = APP_STATE.quiz;
  const currentQ = qState.questions[qState.currentIndex];
  qState.selectedOption = idx;
  qState.answered = true;

  if (idx === currentQ.correct) {
    playSound("success");
    qState.streak++;
    if (qState.streak > qState.maxStreak) qState.maxStreak = qState.streak;
    const bonus = qState.streak > 1 ? qState.streak * 2 : 0;
    qState.score += (10 + bonus);
    APP_STATE.skillPoints[currentQ.category] = (APP_STATE.skillPoints[currentQ.category] || 0) + 10;
    if (qState.streak >= 3) triggerConfetti(0.2);
  } else {
    playSound("error");
    qState.streak = 0;
  }

  persistStudentProgress();
  updateHeaderUI();
  renderActiveQuizQuestion();
}

function nextQuizQuestion() {
  const qState = APP_STATE.quiz;
  if (qState.currentIndex < qState.questions.length - 1) {
    qState.currentIndex++;
    qState.answered = false;
    qState.selectedOption = null;
    playSound("click");
    renderActiveQuizQuestion();
  } else {
    playSound("complete");
    triggerConfetti(0.7);
    persistStudentProgress();
    renderQuizResults();
  }
}

function renderQuizResults() {
  const container = document.getElementById("quizContainer");
  const qState = APP_STATE.quiz;

  const html = `
    <div class="max-w-2xl mx-auto glass-card rounded-2xl p-8 border border-indigo-500/30 text-center space-y-6 shadow-2xl animate-fadeIn">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white text-3xl mx-auto shadow-lg shadow-amber-500/30">
        <i class="fa-solid fa-award"></i>
      </div>

      <div class="space-y-2">
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
          Défi Vocabulaire Terminé
        </span>
        <h2 class="text-2xl font-black text-white">Résultats du Diagnostic Express</h2>
        <p class="text-xs sm:text-sm text-slate-300">
          Meilleure série consécutive (Streak) : <strong class="text-amber-400">${qState.maxStreak} réponses d'affilée</strong> !
        </p>
      </div>

      <div class="p-6 rounded-xl bg-slate-950/80 border border-slate-800 max-w-sm mx-auto">
        <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Score Final</span>
        <div class="text-4xl font-extrabold text-gradient mt-1">${qState.score} pts</div>
        <span class="text-xs text-emerald-400 font-semibold mt-1 block">Points enregistrés dans votre bilan</span>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button onclick="startQuiz()" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition">
          Rejouer avec de nouvelles questions
        </button>
        <button onclick="switchTab('bilan')" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Consulter mon Bilan Global</span>
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// --- MODULE 3 : GRAND GLOSSAIRE & OUTILS MARTECH ---
function renderGlossaryCategoryFilters() {
  const container = document.getElementById("categoryFilterContainer");
  if (!container) return;

  const categories = [
    { id: "all", label: "Tous les termes", count: GLOSSARY_DATA.length },
    ...Object.entries(GLOSSARY_CATEGORIES).map(([catId, cat]) => ({
      id: catId,
      label: cat.label,
      count: GLOSSARY_DATA.filter(t => t.category === catId).length
    }))
  ];

  container.innerHTML = categories.map(cat => `
    <button 
      onclick="setGlossaryCategory('${cat.id}')" 
      id="catFilterBtn_${cat.id}"
      class="px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${cat.id === APP_STATE.glossaryCategory ? 'bg-indigo-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'}"
    >
      <span>${cat.label}</span>
      <span class="text-[10px] px-1.5 py-0.2 rounded-full ${cat.id === APP_STATE.glossaryCategory ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'} font-bold">${cat.count}</span>
    </button>
  `).join("");
}

function setGlossaryCategory(catId) {
  APP_STATE.glossaryCategory = catId;
  playSound("click");
  renderGlossaryCategoryFilters();
  renderGlossary();
}

function filterGlossary() {
  const query = document.getElementById("glossarySearchInput").value.trim().toLowerCase();
  APP_STATE.glossarySearchQuery = query;

  const clearBtn = document.getElementById("clearSearchBtn");
  if (clearBtn) {
    if (query.length > 0) clearBtn.classList.remove("hidden");
    else clearBtn.classList.add("hidden");
  }

  renderGlossary();
}

function clearGlossarySearch() {
  document.getElementById("glossarySearchInput").value = "";
  APP_STATE.glossarySearchQuery = "";
  document.getElementById("clearSearchBtn").classList.add("hidden");
  renderGlossary();
}

function toggleGlossaryMode() {
  APP_STATE.glossaryMode = APP_STATE.glossaryMode === "cards" ? "flashcards" : "cards";
  playSound("click");
  const label = document.getElementById("glossaryModeLabel");
  if (label) {
    label.textContent = APP_STATE.glossaryMode === "cards" ? "Mode Flashcards (Révision)" : "Mode Fiches Détaillées";
  }
  renderGlossary();
}

function renderGlossary() {
  const container = document.getElementById("glossaryContentContainer");
  if (!container) return;

  let filtered = GLOSSARY_DATA;

  if (APP_STATE.glossaryCategory !== "all") {
    filtered = filtered.filter(t => t.category === APP_STATE.glossaryCategory);
  }

  const q = APP_STATE.glossarySearchQuery;
  if (q) {
    filtered = filtered.filter(t => 
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.example.toLowerCase().includes(q) ||
      t.tools.some(tool => tool.toLowerCase().includes(q)) ||
      (t.keywords && t.keywords.some(k => k.toLowerCase().includes(q)))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-panel rounded-2xl p-12 text-center space-y-3 border border-slate-800">
        <i class="fa-solid fa-magnifying-glass text-3xl text-slate-500"></i>
        <h3 class="text-base font-bold text-white">Aucun terme correspondant trouvé</h3>
        <p class="text-xs text-slate-400">Essayez un autre mot-clé (ex: Lemlist, SEO, GTM, MQL, Scoring, CRM...).</p>
      </div>
    `;
    return;
  }

  if (APP_STATE.glossaryMode === "cards") {
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered.map(item => {
          const catMeta = GLOSSARY_CATEGORIES[item.category] || { badge: 'bg-slate-800 text-slate-300' };
          return `
            <div class="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${catMeta.badge}">
                    ${item.categoryLabel}
                  </span>
                  <button onclick="openTermModal('${item.id}')" title="Agrandir la fiche" class="text-slate-400 hover:text-white text-xs">
                    <i class="fa-solid fa-up-right-from-square"></i>
                  </button>
                </div>

                <h3 class="text-base font-extrabold text-white leading-snug">${item.term}</h3>

                <p class="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  ${item.definition}
                </p>

                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1">
                  <span class="font-bold text-[10px] text-emerald-400 uppercase tracking-wider block">Exemple réel :</span>
                  <p class="line-clamp-2 italic text-slate-300">${item.example}</p>
                </div>
              </div>

              <div class="space-y-3 pt-3 border-t border-slate-800/80">
                <div class="flex flex-wrap gap-1.5">
                  ${item.tools.map(tool => `
                    <span class="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-slate-300 font-mono">
                      ${tool}
                    </span>
                  `).join("")}
                </div>

                <button onclick="openTermModal('${item.id}')" class="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-indigo-300 font-semibold border border-indigo-500/20 hover:border-indigo-500/40 transition flex items-center justify-center space-x-1.5">
                  <i class="fa-solid fa-graduation-cap text-[10px]"></i>
                  <span>Le Réflexe Bachelor & Détails</span>
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered.map((item, idx) => `
          <div class="flashcard-container perspective cursor-pointer" onclick="flipFlashcard(${idx})">
            <div id="flashcardInner_${idx}" class="relative h-64 w-full rounded-2xl transition-transform duration-500 transform-style-3d glass-card border border-slate-800 p-6 flex flex-col justify-between">
              
              <div id="flashcardFront_${idx}" class="space-y-4">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Flashcard ${idx + 1} • Cliquez pour révéler
                </span>
                <h3 class="text-xl font-extrabold text-white mt-4">${item.term}</h3>
                <p class="text-xs text-slate-400 italic">Savez-vous définir ce terme et son application en B2B ?</p>
                <div class="pt-4 flex items-center space-x-1 text-xs text-indigo-400 font-semibold">
                  <i class="fa-solid fa-rotate"></i>
                  <span>Retourner la carte</span>
                </div>
              </div>

              <div id="flashcardBack_${idx}" class="hidden space-y-3 text-left">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Définition & Réflexe
                </span>
                <p class="text-xs text-slate-200 leading-relaxed">${item.definition}</p>
                <div class="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200">
                  <strong>Réflexe :</strong> ${item.bachelorTakeaway}
                </div>
              </div>

            </div>
          </div>
        `).join("")}
      </div>
    `;
  }
}

function flipFlashcard(idx) {
  const front = document.getElementById(`flashcardFront_${idx}`);
  const back = document.getElementById(`flashcardBack_${idx}`);
  if (!front || !back) return;

  playSound("click");
  if (front.classList.contains("hidden")) {
    front.classList.remove("hidden");
    back.classList.add("hidden");
  } else {
    front.classList.add("hidden");
    back.classList.remove("hidden");
  }
}

function openTermModal(termId) {
  const item = GLOSSARY_DATA.find(t => t.id === termId);
  if (!item) return;

  playSound("click");
  const modal = document.getElementById("termModal");
  const catBadge = document.getElementById("modalCategoryBadge");
  const title = document.getElementById("modalTermTitle");
  const definition = document.getElementById("modalDefinition");
  const example = document.getElementById("modalExample");
  const takeaway = document.getElementById("modalTakeaway");
  const toolsContainer = document.getElementById("modalToolsContainer");

  const catMeta = GLOSSARY_CATEGORIES[item.category] || { badge: 'bg-slate-800 text-slate-300' };

  catBadge.className = `text-xs px-2.5 py-1 rounded-full font-bold ${catMeta.badge}`;
  catBadge.textContent = item.categoryLabel;

  title.textContent = item.term;
  definition.textContent = item.definition;
  example.textContent = item.example;
  takeaway.textContent = item.bachelorTakeaway;

  toolsContainer.innerHTML = item.tools.map(tool => `
    <span class="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-indigo-300 font-mono font-semibold">
      ${tool}
    </span>
  `).join("");

  modal.classList.remove("hidden");
}

function closeTermModal() {
  playSound("click");
  document.getElementById("termModal").classList.add("hidden");
}

window.onclick = function(event) {
  const modal = document.getElementById("termModal");
  if (event.target === modal) closeTermModal();
};

// --- MODULE 4 : BILAN & DIAGNOSTIC INDIVIDUEL ---
function updateDiagnosticDashboard() {
  const nameEl = document.getElementById("reportStudentName");
  if (nameEl) {
    nameEl.textContent = APP_STATE.currentUser ? `${APP_STATE.currentUser.prenom} ${APP_STATE.currentUser.nom}` : "l'Étudiant(e)";
  }

  let missionScore = 0;
  let missionsDone = 0;
  SCENARIOS_DATA.forEach(s => {
    const p = APP_STATE.missionsProgress[s.id];
    if (p && p.completed) {
      missionsDone++;
      missionScore += (p.score || 0);
    }
  });

  const totalPossible = (SCENARIOS_DATA.length * 75) + 100;
  const currentTotal = missionScore + (APP_STATE.quiz.score || 0);
  const percent = Math.min(100, Math.round((currentTotal / totalPossible) * 100));

  const totalScoreEl = document.getElementById("reportTotalScore");
  if (totalScoreEl) totalScoreEl.textContent = `${currentTotal} pts`;

  const percentEl = document.getElementById("reportScorePercent");
  if (percentEl) percentEl.textContent = `${percent}% de maîtrise globale`;

  const progressEl = document.getElementById("reportMissionsProgress");
  if (progressEl) progressEl.textContent = `${missionsDone} / ${SCENARIOS_DATA.length}`;

  const quizProgressEl = document.getElementById("reportQuizProgress");
  if (quizProgressEl) {
    quizProgressEl.textContent = APP_STATE.quiz.score > 0 ? `${APP_STATE.quiz.score} pts` : "Non réalisé";
  }

  calculateArchetype();
  generateRecommendations();
  renderRadarChart();
}

function calculateArchetype() {
  const points = APP_STATE.skillPoints;
  const nameEl = document.getElementById("archetypeName");
  const descEl = document.getElementById("archetypeDesc");
  const reportArchEl = document.getElementById("reportArchetype");
  const iconEl = document.getElementById("archetypeIcon");

  let maxCat = "strategie-marche";
  let maxPts = -1;
  Object.entries(points).forEach(([cat, pts]) => {
    if (pts > maxPts) {
      maxPts = pts;
      maxCat = cat;
    }
  });

  const archetypes = {
    "strategie-marche": {
      name: "Le Stratège Go-To-Market",
      desc: "Vous excellez dans le dimensionnement (TAM/SAM/SOM), la segmentation rigoureuse et la compréhension des comités d'achats complexes.",
      icon: "fa-compass"
    },
    "inbound-visibilite": {
      name: "L'Architecte Inbound & Contenu",
      desc: "Vous maîtrisez les leviers d'attraction pérenne (SEO, SGO/GEO conversationnel, thought leadership et réputation de marque).",
      icon: "fa-magnet"
    },
    "conversion-nurturing": {
      name: "Le Maître du Funnel & CRO",
      desc: "Vous êtes obsédé(e) par la conversion sans friction, le Lead Scoring prédictif et l'alignement strict entre MQL et SQL.",
      icon: "fa-filter"
    },
    "outbound-prospection": {
      name: "Le Chasseur ABM & Outbound",
      desc: "Vous avez l'âme d'un conquérant : séquences multicanales ultra-ciblées, copywriting persuasif AIDA et Sales Automation éthique.",
      icon: "fa-bullseye"
    },
    "data-ia-martech": {
      name: "L'Expert MarTech & IA Augmenté 2025+",
      desc: "Vous naviguez avec aisance dans la stack moderne : Reverse IP, CRM, Prompting rigoureux COFRE et orchestration d'Agents IA.",
      icon: "fa-robot"
    }
  };

  const currentArch = archetypes[maxCat] || archetypes["strategie-marche"];
  if (nameEl) nameEl.textContent = currentArch.name;
  if (descEl) descEl.textContent = currentArch.desc;
  if (reportArchEl) reportArchEl.textContent = currentArch.name;
  if (iconEl) iconEl.className = `fa-solid ${currentArch.icon}`;
}

function generateRecommendations() {
  const container = document.getElementById("recommendationsList");
  if (!container) return;

  const points = APP_STATE.skillPoints;
  const categoriesSorted = Object.entries(points).sort((a, b) => a[1] - b[1]);

  const recommendationsMap = {
    "strategie-marche": "Consolider la frontière entre TAM, SAM et SOM pour éviter de surdimensionner les prévisions d'acquisition.",
    "inbound-visibilite": "Approfondir le rôle du SGO/GEO (moteurs d'IA comme Perplexity/ChatGPT) en complément du SEO traditionnel.",
    "conversion-nurturing": "Formaliser les critères stricts de passage MQL → SQL (accord SLA) pour fluidifier le travail avec les commerciaux.",
    "outbound-prospection": "Travailler la concision du copywriting d'accroche (<100 mots) et l'approche ABM sur grands comptes.",
    "data-ia-martech": "Expérimenter l'usage du Reverse IP (Albacross) et la méthode de prompt engineering COFRE."
  };

  const weakCategories = categoriesSorted.slice(0, 3);
  container.innerHTML = weakCategories.map(([cat]) => `
    <li class="flex items-start space-x-2">
      <i class="fa-solid fa-arrow-right text-indigo-400 mt-1 flex-shrink-0"></i>
      <span>${recommendationsMap[cat] || "Poursuivez les cas pratiques pour affiner vos compétences."}</span>
    </li>
  `).join("");
}

function renderRadarChart() {
  const canvas = document.getElementById("competencyRadarChart");
  if (!canvas) return;

  const labels = [
    "Stratégie & GTM",
    "Inbound & SEO",
    "Funnel & Conversion",
    "Outbound & Vente",
    "MarTech & IA 2025+"
  ];

  const scores = [
    Math.min(100, Math.round(((APP_STATE.skillPoints["strategie-marche"] || 0) / 75) * 100)),
    Math.min(100, Math.round(((APP_STATE.skillPoints["inbound-visibilite"] || 0) / 75) * 100)),
    Math.min(100, Math.round(((APP_STATE.skillPoints["conversion-nurturing"] || 0) / 75) * 100)),
    Math.min(100, Math.round(((APP_STATE.skillPoints["outbound-prospection"] || 0) / 75) * 100)),
    Math.min(100, Math.round(((APP_STATE.skillPoints["data-ia-martech"] || 0) / 75) * 100))
  ];

  if (APP_STATE.radarChartInstance) {
    APP_STATE.radarChartInstance.destroy();
  }

  APP_STATE.radarChartInstance = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Niveau Diagnostiqué (%)',
        data: scores,
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderColor: '#6366f1',
        borderWidth: 2,
        pointBackgroundColor: '#a855f7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#a855f7'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: {
            color: '#cbd5e1',
            font: { size: 10, weight: 'bold' }
          },
          ticks: { display: false, min: 0, max: 100 }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function copyReportToClipboard() {
  let missionsDone = 0;
  SCENARIOS_DATA.forEach(s => {
    if (APP_STATE.missionsProgress[s.id]?.completed) missionsDone++;
  });

  const studentName = APP_STATE.currentUser ? `${APP_STATE.currentUser.prenom} ${APP_STATE.currentUser.nom}` : "Étudiant";
  const promo = APP_STATE.currentUser ? APP_STATE.currentUser.promo : "B3-MKT-2026";

  const reportText = `=== ÉVALUATION DIAGNOSTIQUE MARKETING D'ACQUISITION B2B (NETYPARÉO) ===
Participant(e) : ${studentName} (${promo})
Date : ${new Date().toLocaleDateString('fr-FR')}
Missions de situation réalisées : ${missionsDone} / ${SCENARIOS_DATA.length}
Score Défi Vocabulaire : ${APP_STATE.quiz.score} pts
Profil Diagnostiqué : ${document.getElementById("archetypeName")?.textContent || "Non déterminé"}

Compétences clés :
- Stratégie & GTM : ${Math.min(100, Math.round(((APP_STATE.skillPoints["strategie-marche"] || 0) / 75) * 100))}%
- Inbound & Visibilité : ${Math.min(100, Math.round(((APP_STATE.skillPoints["inbound-visibilite"] || 0) / 75) * 100))}%
- Conversion & Nurturing : ${Math.min(100, Math.round(((APP_STATE.skillPoints["conversion-nurturing"] || 0) / 75) * 100))}%
- Outbound & Prospection : ${Math.min(100, Math.round(((APP_STATE.skillPoints["outbound-prospection"] || 0) / 75) * 100))}%
- MarTech & IA 2025+ : ${Math.min(100, Math.round(((APP_STATE.skillPoints["data-ia-martech"] || 0) / 75) * 100))}%
========================================================================`;

  navigator.clipboard.writeText(reportText).then(() => {
    playSound("success");
    alert("Bilan individuel copié dans le presse-papier !");
  }).catch(() => {
    alert("Veuillez utiliser la fonction Imprimer.");
  });
}

// --- MODULE 5 : BACK OFFICE FORMATEUR & ANALYSE COLLECTIVE ---

function toggleBackofficeExpand(blockId) {
  if (blockId === "scenarios") {
    APP_STATE.backofficeExpandedScenarios = !APP_STATE.backofficeExpandedScenarios;
  } else if (blockId === "vocab") {
    APP_STATE.backofficeExpandedVocab = !APP_STATE.backofficeExpandedVocab;
  }
  playSound("click");
  renderBackoffice();
}

function renderGlobalSynthesisCard({ containerId, blockId, title, badgeText, badgeClass, data, isExpanded }) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;

  const displayLimit = isExpanded ? data.mostMastered.length : 6;
  const hasMore = data.mostMastered.length > 6;

  const masteredRows = data.mostMastered.slice(0, displayLimit).map((item) => {
    let pctClass = "text-emerald-400";
    if (item.pct < 45) pctClass = "text-rose-400";
    else if (item.pct < 75) pctClass = "text-amber-400";

    return `
      <div class="flex items-baseline justify-between py-2 text-xs border-b border-slate-800/40 hover:bg-slate-800/30 px-2.5 rounded-lg transition gap-3">
        <span class="text-slate-200 font-medium leading-relaxed flex-1">${item.masteredLabel}</span>
        <span class="text-slate-400 font-mono text-xs whitespace-nowrap text-right pl-2">
          <span class="text-slate-200 font-semibold">${item.correctAnswers}/${item.totalAnswers}</span>
          <span class="text-slate-600 mx-1">·</span>
          <span class="font-bold ${pctClass}">${item.pct}%</span>
        </span>
      </div>
    `;
  }).join("");

  const missingRows = data.mostMissing.slice(0, displayLimit).map((item) => {
    let pctClass = "text-rose-400";
    if (item.pct >= 75) pctClass = "text-emerald-400";
    else if (item.pct >= 45) pctClass = "text-amber-400";

    return `
      <div class="flex items-baseline justify-between py-2 text-xs border-b border-slate-800/40 hover:bg-slate-800/30 px-2.5 rounded-lg transition gap-3">
        <span class="text-slate-200 font-medium leading-relaxed flex-1">${item.missingLabel}</span>
        <span class="text-slate-400 font-mono text-xs whitespace-nowrap text-right pl-2">
          <span class="text-slate-200 font-semibold">${item.correctAnswers}/${item.totalAnswers}</span>
          <span class="text-slate-600 mx-1">·</span>
          <span class="font-bold ${pctClass}">${item.pct}%</span>
        </span>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
      <!-- En-tête : Titre à gauche, métriques à droite (calqué sur la maquette utilisateur) -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div class="flex items-center space-x-3">
          <span class="px-2.5 py-1 rounded-lg ${badgeClass} text-xs font-bold uppercase tracking-wider">
            ${badgeText}
          </span>
          <div>
            <h3 class="text-lg sm:text-xl font-black text-white">${title}</h3>
            <p class="text-xs text-slate-400">Synthèse collective ordonnée selon les taux réels d'assimilation</p>
          </div>
        </div>

        <div class="text-xs font-mono text-slate-400 bg-slate-950/70 px-4 py-2 rounded-xl border border-slate-800 flex items-center space-x-2 flex-wrap">
          <span class="font-bold text-slate-200">${data.totalAttempts} essai(s)</span>
          <span class="text-slate-600">·</span>
          <span class="text-emerald-400 font-bold">${data.masteredCount} maîtrisé</span>
          <span class="text-slate-600">·</span>
          <span class="text-amber-400 font-bold">${data.inProgressCount} en progression</span>
          <span class="text-slate-600">·</span>
          <span class="text-rose-400 font-bold">${data.reworkCount} à retravailler</span>
        </div>
      </div>

      <!-- Grille 2 Colonnes fidèle à la capture : Vert à gauche, Rouge à droite -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- COLONNE GAUCHE : LE PLUS SOUVENT MIS EN ŒUVRE (VERT) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-emerald-500/30">
            <h4 class="text-xs font-black text-emerald-400 tracking-wider uppercase flex items-center space-x-2">
              <i class="fa-solid fa-circle-check text-[11px]"></i>
              <span>LE PLUS SOUVENT MIS EN ŒUVRE</span>
            </h4>
            <span class="text-[10px] text-slate-400 font-mono">Taux de réussite</span>
          </div>
          <div class="space-y-1">
            ${masteredRows}
          </div>
        </div>

        <!-- COLONNE DROITE : CE QUI MANQUE LE PLUS SOUVENT (ROUGE) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-rose-500/30">
            <h4 class="text-xs font-black text-rose-400 tracking-wider uppercase flex items-center space-x-2">
              <i class="fa-solid fa-circle-exclamation text-[11px]"></i>
              <span>CE QUI MANQUE LE PLUS SOUVENT</span>
            </h4>
            <span class="text-[10px] text-slate-400 font-mono">Priorités formateur</span>
          </div>
          <div class="space-y-1">
            ${missingRows}
          </div>
        </div>
      </div>

      <!-- Footer du bloc avec bouton d'expansion -->
      ${hasMore ? `
        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span class="text-slate-400">
            Affichage de <strong>${displayLimit}</strong> sur <strong>${data.mostMastered.length}</strong> items analysés.
          </span>
          <button onclick="toggleBackofficeExpand('${blockId}')" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold border border-slate-700 transition flex items-center space-x-1.5">
            <i class="fa-solid ${isExpanded ? 'fa-compress' : 'fa-expand'} text-xs"></i>
            <span>${isExpanded ? 'Réduire à la vue synthétique' : `Afficher l'intégralité (${data.mostMastered.length})`}</span>
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderBackoffice() {
  let users = getRegisteredUsers();

  if (APP_STATE.backofficePromoFilter !== "all") {
    users = users.filter(u => u.promo === APP_STATE.backofficePromoFilter);
  }

  const analytics = calculateCollectiveAnalytics(users);

  // 1. KPIs
  const totalEl = document.getElementById("kpiTotalStudents");
  if (totalEl) totalEl.textContent = analytics.totalStudents;

  const scAvgEl = document.getElementById("kpiAvgScenario");
  if (scAvgEl) scAvgEl.textContent = `${Math.round((analytics.avgScenario / 100) * 20 * 10) / 10} / 20`;

  const scAvgPctEl = document.getElementById("kpiAvgScenarioPercent");
  if (scAvgPctEl) scAvgPctEl.textContent = `${analytics.avgScenario}% de réussite`;

  const qzAvgEl = document.getElementById("kpiAvgQuiz");
  if (qzAvgEl) qzAvgEl.textContent = `${Math.round((analytics.avgQuiz / 100) * 20 * 10) / 10} / 20`;

  const qzAvgPctEl = document.getElementById("kpiAvgQuizPercent");
  if (qzAvgPctEl) qzAvgPctEl.textContent = `${analytics.avgQuiz}% de réussite`;

  const criticalCount = (analytics.scenarios ? analytics.scenarios.reworkCount : 0) + (analytics.vocab ? analytics.vocab.reworkCount : 0);
  const critEl = document.getElementById("kpiCriticalCount");
  if (critEl) critEl.textContent = `${criticalCount} alertes`;

  // 2. Bloc 1 : Mises en situation (Synthèse globale 2 colonnes comme la capture)
  if (analytics.scenarios) {
    renderGlobalSynthesisCard({
      containerId: "collectiveScenariosContainer",
      blockId: "scenarios",
      title: "Attendus + situations B2B",
      badgeText: "Bloc 1 • Mises en situation",
      badgeClass: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
      data: analytics.scenarios,
      isExpanded: !!APP_STATE.backofficeExpandedScenarios
    });
  }

  // 3. Bloc 2 : Défi Vocabulaire (Synthèse globale 2 colonnes comme la capture)
  if (analytics.vocab) {
    renderGlobalSynthesisCard({
      containerId: "collectiveQuizContainer",
      blockId: "vocab",
      title: "Attendus + notions MarTech",
      badgeText: "Bloc 2 • Défi Vocabulaire",
      badgeClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
      data: analytics.vocab,
      isExpanded: !!APP_STATE.backofficeExpandedVocab
    });
  }

  // 4. Bloc 3 : Tableau des Participants
  const tbody = document.getElementById("participantsTableBody");
  if (tbody) {
    tbody.innerHTML = users.map(u => {
      const noteScenario20 = Math.round(((u.scenarioScore || 0) / 100) * 20 * 10) / 10;
      const noteQuiz20 = Math.round(((u.quizScore || 0) / 100) * 20 * 10) / 10;
      const noteFinale20 = Math.round(((noteScenario20 + noteQuiz20) / 2) * 10) / 10;

      let scoreBadgeClass = "bg-slate-800 text-slate-300";
      if (noteFinale20 >= 15) scoreBadgeClass = "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      else if (noteFinale20 >= 10) scoreBadgeClass = "bg-amber-500/20 text-amber-300 border border-amber-500/30";
      else if (noteFinale20 > 0) scoreBadgeClass = "bg-rose-500/20 text-rose-300 border border-rose-500/30";

      return `
        <tr class="hover:bg-slate-900/60 transition">
          <td class="py-3 px-4 font-bold text-white flex items-center space-x-2">
            <div class="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              ${u.prenom[0]}${u.nom[0]}
            </div>
            <span>${u.prenom} ${u.nom}</span>
          </td>
          <td class="py-3 px-4 text-slate-400">
            ${u.promo || "B3-MKT-2026"} <span class="text-slate-400">(${u.niveau || "Bachelor 3"})</span>
          </td>
          <td class="py-3 px-4 text-center font-mono font-semibold text-slate-200">
            ${noteScenario20} / 20 <span class="text-[10px] text-slate-400">(${u.scenarioScore || 0}%)</span>
          </td>
          <td class="py-3 px-4 text-center font-mono font-semibold text-slate-200">
            ${noteQuiz20} / 20 <span class="text-[10px] text-slate-400">(${u.quizScore || 0}%)</span>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="px-2.5 py-1 rounded-lg font-mono font-black text-xs ${scoreBadgeClass}">
              ${noteFinale20} / 20
            </span>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${u.completedMissions >= 6 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}">
              ${u.completedMissions >= 6 ? 'Complet' : `${u.completedMissions || 0}/6 cas`}
            </span>
          </td>
          <td class="py-3 px-4 text-right">
            <button onclick="viewStudentDetail('${u.id}')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold transition">
              Bilan
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }
}

function filterBackofficeByPromo() {
  const select = document.getElementById("backofficePromoFilter");
  APP_STATE.backofficePromoFilter = select ? select.value : "all";
  playSound("click");
  renderBackoffice();
}

function refreshBackofficeData() {
  playSound("click");
  renderBackoffice();
  alert("Données du Back Office actualisées avec succès.");
}

function exportBackofficeCSV() {
  const users = getRegisteredUsers();
  let csvContent = "data:text/csv;charset=utf-8,ID,Nom,Prenom,Niveau,Promotion,Note_Mises_Situation_Sur_20,Note_Defi_Vocabulaire_Sur_20,Note_Finale_Sur_20,Statut\n";

  users.forEach(u => {
    const noteSc = Math.round(((u.scenarioScore || 0) / 100) * 20 * 10) / 10;
    const noteQz = Math.round(((u.quizScore || 0) / 100) * 20 * 10) / 10;
    const noteFin = Math.round(((noteSc + noteQz) / 2) * 10) / 10;
    const statut = u.completedMissions >= 6 ? "Complet" : "En cours";
    csvContent += `"${u.id}","${u.nom}","${u.prenom}","${u.niveau || 'Bachelor 3'}","${u.promo || 'B3-MKT-2026'}",${noteSc},${noteQz},${noteFin},"${statut}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Releve_Notes_Acquisition_B2B_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  playSound("success");
}

function copyNetyparéoGrid() {
  const users = getRegisteredUsers();
  let text = "NOM\tPRÉNOM\tPROMOTION\tMISES EN SITUATION (/20)\tDÉFI VOCABULAIRE (/20)\tNOTE GLOBALE (/20)\n";

  users.forEach(u => {
    const noteSc = Math.round(((u.scenarioScore || 0) / 100) * 20 * 10) / 10;
    const noteQz = Math.round(((u.quizScore || 0) / 100) * 20 * 10) / 10;
    const noteFin = Math.round(((noteSc + noteQz) / 2) * 10) / 10;
    text += `${u.nom.toUpperCase()}\t${u.prenom}\t${u.promo || 'B3-MKT-2026'}\t${noteSc}\t${noteQz}\t${noteFin}\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    playSound("success");
    alert("Grille des notes copiée au format compatible Excel et Netyparéo !");
  }).catch(() => {
    alert("Impossible de copier automatiquement.");
  });
}

function viewStudentDetail(studentId) {
  loadStudentData(studentId);
  playSound("click");
  switchTab("bilan");
}

function triggerConfetti(intensity = 0.5) {
  if (typeof confetti === "function") {
    confetti({
      particleCount: Math.floor(60 * intensity),
      spread: 70,
      origin: { y: 0.7 }
    });
  }
}
