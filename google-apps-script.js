// =========================================================================================
// WEESIFI FORMATION — SCRIPT GOOGLE APPS SCRIPT POUR LA BASE DE DONNÉES EN BACK OFFICE
// Application : Acquisition Quest B2B (Évaluation de situation & vocabulaire Bachelor)
// =========================================================================================
//
// GUIDE D'INSTALLATION EN 2 MINUTES :
// 1. Créez une nouvelle feuille Google Sheets sur votre Google Drive (ex: "Acquisition_Quest_B2B_Notes").
// 2. Dans le menu, cliquez sur : Extensions > Apps Script.
// 3. Effacez tout le code existant dans l'éditeur et collez l'intégralité de ce fichier.
// 4. Cliquez sur "Enregistrer" (icône disquette).
// 5. Cliquez sur le bouton bleu "Déployer" (en haut à droite) > "Nouveau déploiement".
// 6. Cliquez sur l'engrenage à côté de "Sélectionner le type" > choisissez "Application Web".
// 7. Renseignez :
//    - Description : Base de données Acquisition Quest B2B
//    - Exécuter en tant que : "Moi (votre adresse email)"
//    - Qui a accès : "Tout le monde" (IMPORTANT pour que les étudiants puissent envoyer leurs notes sans compte Google)
// 8. Cliquez sur "Déployer", autorisez les accès Google, puis copiez l'URL de l'application Web fournie
//    (elle ressemble à : https://script.google.com/macros/s/AKfycb.../exec).
// 9. Collez cette URL dans le Back Office de votre application web !
// =========================================================================================

const SHEET_NAME = "Participants";

// En-têtes du tableau
const HEADERS = [
  "ID",
  "Nom",
  "Prénom",
  "Promotion",
  "Niveau",
  "Note_Mises_Situation_Sur_20",
  "Note_Defi_Vocabulaire_Sur_20",
  "Note_Globale_Sur_20",
  "Missions_Completees",
  "Derniere_Activite",
  "Reponses_Scenarios_JSON",
  "Reponses_Quiz_JSON"
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    // Mise en forme des en-têtes
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#1e1b4b");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// -------------------------------------------------------------
// GET : Récupération de tous les étudiants pour le Back Office
// -------------------------------------------------------------
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const users = [];

    // Ligne 0 = en-têtes, on commence à la ligne 1
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue; // Ignore les lignes vides

      let answers = {};
      let quizAnswers = {};
      try { answers = JSON.parse(row[10] || "{}"); } catch (err) {}
      try { quizAnswers = JSON.parse(row[11] || "{}"); } catch (err) {}

      const noteSc20 = parseFloat(row[5]) || 0;
      const noteQz20 = parseFloat(row[6]) || 0;

      users.push({
        id: String(row[0]),
        nom: String(row[1]),
        prenom: String(row[2]),
        promo: String(row[3]),
        niveau: String(row[4]),
        scenarioScore: Math.round((noteSc20 / 20) * 100),
        quizScore: Math.round((noteQz20 / 20) * 100),
        completedMissions: parseInt(row[8], 10) || 0,
        lastUpdated: row[9] ? String(row[9]) : "",
        answers: answers,
        quizAnswers: quizAnswers
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      count: users.length,
      users: users
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// -------------------------------------------------------------
// POST : Enregistrement ou mise à jour d'un étudiant en direct
// -------------------------------------------------------------
function doPost(e) {
  try {
    const rawContent = e.postData.contents;
    const payload = JSON.parse(rawContent);
    const user = payload.user || payload;

    if (!user || !user.nom || !user.prenom) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Données étudiant incomplètes (nom et prénom requis)"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const userId = String(user.id || `std_${Date.now()}`);
    const nomClean = String(user.nom).trim().toLowerCase();
    const prenomClean = String(user.prenom).trim().toLowerCase();

    // Calcul des notes sur 20
    const noteSc20 = Math.round(((user.scenarioScore || 0) / 100) * 20 * 10) / 10;
    const noteQz20 = Math.round(((user.quizScore || 0) / 100) * 20 * 10) / 10;
    const noteGlobale20 = Math.round(((noteSc20 + noteQz20) / 2) * 10) / 10;

    const rowData = [
      userId,
      user.nom,
      user.prenom,
      user.promo || "B3-MKT-2026",
      user.niveau || "Bachelor 3",
      noteSc20,
      noteQz20,
      noteGlobale20,
      user.completedMissions || 0,
      new Date().toLocaleString("fr-FR"),
      JSON.stringify(user.answers || {}),
      JSON.stringify(user.quizAnswers || {})
    ];

    // Recherche si l'étudiant existe déjà (par ID ou par Nom + Prénom)
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      const rowId = String(data[i][0]);
      const rowNom = String(data[i][1]).trim().toLowerCase();
      const rowPrenom = String(data[i][2]).trim().toLowerCase();

      if (rowId === userId || (rowNom === nomClean && rowPrenom === prenomClean)) {
        rowIndex = i + 1; // 1-based index dans Sheets
        break;
      }
    }

    if (rowIndex > 0) {
      // Mise à jour de la ligne existante
      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Ajout d'une nouvelle ligne
      sheet.appendRow(rowData);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      userId: userId,
      updated: rowIndex > 0
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
