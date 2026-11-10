// Système d'authentification, gestion des droits et persistance des utilisateurs
// Administrateur / Formateur officiel : thibaut.ducleuziou@weesifi.com / Weesifi!2026

const AUTH_CONFIG = {
  ADMIN_EMAIL: "thibaut.ducleuziou@weesifi.com",
  ADMIN_PASS: "Weesifi!2026",
  ADMIN_NAME: "Thibaut Ducleuziou",
  ADMIN_ROLE: "Formateur & Administrateur Weesifi"
};

// =========================================================================
// CONFIGURATION BASE DE DONNÉES GOOGLE SHEETS
// =========================================================================
// Vous pouvez coller l'URL de votre application Web Google Apps Script ici,
// ou la configurer directement depuis le bouton ⚙️ du Back Office.
const DB_CONFIG = {
  DEFAULT_GOOGLE_SHEET_URL: "" // ex: "https://script.google.com/macros/s/AKfycb.../exec"
};

function getGoogleSheetUrl() {
  const custom = localStorage.getItem("weesifi_gsheet_url");
  if (custom && custom.trim().length > 10) return custom.trim();
  return DB_CONFIG.DEFAULT_GOOGLE_SHEET_URL.trim();
}

function setGoogleSheetUrl(url) {
  if (url && url.trim().length > 0) {
    localStorage.setItem("weesifi_gsheet_url", url.trim());
  } else {
    localStorage.removeItem("weesifi_gsheet_url");
  }
}

// Clé de stockage local pour le cache rapide et mode hors-ligne
const DB_VERSION_KEY = "acquisition_quest_b2b_users_prod";

// Nettoyage automatique des anciennes données de test antérieures
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

// -------------------------------------------------------------
// SYNCHRONISATION HYBRIDE AVEC GOOGLE SHEETS (CLOUD)
// -------------------------------------------------------------
async function syncStudentToCloud(student) {
  if (!student) return;

  // 1. Sauvegarde locale immédiate
  const users = getRegisteredUsers();
  const existingIndex = users.findIndex(u => u.id === student.id || (u.nom.toLowerCase() === student.nom.toLowerCase() && u.prenom.toLowerCase() === student.prenom.toLowerCase()));
  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...student };
  } else {
    users.push(student);
  }
  saveRegisteredUsers(users);

  // 2. Envoi vers Google Sheets en tâche de fond si l'URL est configurée
  const gsheetUrl = getGoogleSheetUrl();
  if (!gsheetUrl) return;

  try {
    // Utilisation de text/plain pour éviter tout blocage de pré-requête CORS par les navigateurs
    await fetch(gsheetUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "saveUser",
        user: student
      })
    });
    console.log(`[Google Sheets] Synchronisation réussie pour ${student.prenom} ${student.nom}`);
  } catch (error) {
    console.warn("[Google Sheets] Erreur de synchronisation cloud (sauvegardé en local) :", error);
  }
}

// Récupération de tous les participants depuis Google Sheets pour le Back Office Formateur
async function fetchStudentsFromCloud() {
  const gsheetUrl = getGoogleSheetUrl();
  if (!gsheetUrl) {
    return getRegisteredUsers();
  }

  try {
    const separator = gsheetUrl.includes("?") ? "&" : "?";
    const response = await fetch(`${gsheetUrl}${separator}action=getUsers&t=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data && data.status === "success" && Array.isArray(data.users)) {
      // Met à jour le cache local avec les données réelles du Google Sheet
      saveRegisteredUsers(data.users);
      console.log(`[Google Sheets] ${data.users.length} participant(s) synchronisé(s) depuis le cloud.`);
      return data.users;
    }
    return getRegisteredUsers();
  } catch (error) {
    console.warn("[Google Sheets] Impossible de joindre le Google Sheet, utilisation du cache local :", error);
    return getRegisteredUsers();
  }
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
