// Système d'authentification, gestion des droits et persistance des utilisateurs
// Administrateur / Formateur officiel : thibaut.ducleuziou@weesifi.com / Weesifi!2026

const AUTH_CONFIG = {
  ADMIN_EMAIL: "thibaut.ducleuziou@weesifi.com",
  ADMIN_PASS: "Weesifi!2026",
  ADMIN_NAME: "Thibaut Ducleuziou",
  ADMIN_ROLE: "Formateur & Administrateur Weesifi"
};

// Base vierge prête pour la promotion réelle
const INITIAL_STUDENT_COHORT = [];

// Clé de stockage propre pour les données réelles
const DB_VERSION_KEY = "acquisition_quest_b2b_users_prod";

// Nettoyage automatique des anciennes données de démonstration dans le navigateur
try {
  localStorage.removeItem("acquisition_quest_b2b_users");
  localStorage.removeItem("acquisition_quest_b2b_users_v2");
  localStorage.removeItem("acquisition_quest_b2b_users_v3");
} catch (e) {}

function getRegisteredUsers() {
  const localData = localStorage.getItem(DB_VERSION_KEY);
  if (!localData) {
    localStorage.setItem(DB_VERSION_KEY, JSON.stringify([]));
    return [];
  }
  try {
    const parsed = JSON.parse(localData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(DB_VERSION_KEY, JSON.stringify(users));
}

function clearAllStudentData() {
  localStorage.setItem(DB_VERSION_KEY, JSON.stringify([]));
}

function getCurrentUserSession() {
  const session = localStorage.getItem("acquisition_quest_b2b_session");
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch (e) {
    return null;
  }
}

function setCurrentUserSession(user) {
  localStorage.setItem("acquisition_quest_b2b_session", JSON.stringify(user));
}

function clearUserSession() {
  localStorage.removeItem("acquisition_quest_b2b_session");
}
