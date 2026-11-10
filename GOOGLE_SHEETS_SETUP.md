# 📊 Guide de Connexion Google Sheets pour le Back Office

Ce guide vous permet d'activer la consolidation automatique des notes de vos 20 étudiants en direct dans une feuille Google Sheets Weesifi.

---

## ⚡ En résumé : comment ça fonctionne ?
1. Chaque étudiant passe son évaluation sur son PC ou Mac (Wifi).
2. Dès qu'un étudiant s'inscrit ou termine une étape, ses notes et réponses sont envoyées instantanément dans votre Google Sheet.
3. Depuis votre Back Office Formateur, un clic sur **Actualiser** récupère l'ensemble des 20 étudiants pour afficher les notes individuelles et calculer la synthèse collective (Le plus souvent mis en œuvre vs Ce qui manque le plus souvent).

---

## 🛠️ Étapes de mise en place (2 minutes)

### Étape 1 : Créer votre feuille Google Sheets
1. Rendez-vous sur votre [Google Drive](https://drive.google.com).
2. Créez une nouvelle feuille de calcul Google Sheets.
3. Nommez-la par exemple : **`Acquisition Quest B2B - Notes Promotion`**.

---

### Étape 2 : Ajouter le script
1. Dans le menu haut de votre feuille Google Sheets, cliquez sur **Extensions** > **Apps Script**.
2. Une nouvelle page s'ouvre avec un éditeur de code.
3. Effacez le code existant (`function myFunction() { ... }`).
4. Ouvrez le fichier [`google-apps-script.js`](./google-apps-script.js) présent dans ce projet, copiez l'intégralité de son contenu et collez-le dans l'éditeur Apps Script.
5. Cliquez sur l'icône **Enregistrer** (disquette) ou faites `Ctrl + S` / `Cmd + S`.

---

### Étape 3 : Déployer l'application Web
1. En haut à droite de l'éditeur Apps Script, cliquez sur le bouton bleu **Déployer** > **Nouveau déploiement**.
2. Dans la boîte de dialogue :
   - À gauche, cliquez sur l'icône d'engrenage ⚙️ à côté de *Sélectionner le type* et choisissez **Application Web**.
   - **Description** : `Base Notes Acquisition Quest B2B`
   - **Exécuter en tant que** : **`Moi (votre adresse email)`**
   - **Qui a accès** : **`Tout le monde`** *(Indispensable pour que les étudiants puissent transmettre leurs notes sans devoir se connecter à Google)*.
3. Cliquez sur **Déployer**.
4. Google vous demande d'autoriser l'accès :
   - Cliquez sur *Autoriser l'accès* et sélectionnez votre compte Google.
   - Si Google affiche un écran "Google n'a pas vérifié cette application", cliquez sur **Paramètres avancés** (en bas à gauche) puis sur **Accéder au projet (non sécurisé)**, et enfin **Autoriser**.
5. Copiez l'**URL de l'application Web** affichée (se terminant par `/exec`).  
   *(Exemple : `https://script.google.com/macros/s/AKfycb.../exec`)*.

---

### Étape 4 : Connecter l'URL à votre Back Office
Deux options au choix pour renseigner cette URL :

* **Option A (Directement dans l'application)** :
  1. Ouvrez votre application sur Netlify et connectez-vous au Back Office Formateur (`thibaut.ducleuziou@weesifi.com` / `Weesifi!2026`).
  2. Cliquez sur le bouton vert **`Connecter Google Sheets`** en haut à droite.
  3. Collez votre URL et cliquez sur **Tester**, puis sur **Enregistrer et synchroniser**.

* **Option B (Durable dans le code source)** :
  - Ouvrez [`data/auth.js`](./data/auth.js) et collez votre URL dans la variable :
    ```javascript
    const DB_CONFIG = {
      DEFAULT_GOOGLE_SHEET_URL: "https://script.google.com/macros/s/VOTRE_URL/exec"
    };
    ```
  - Ainsi, l'URL sera automatiquement active pour tous les utilisateurs même s'ils vident le cache de leur navigateur.

---

## 📋 Colonnes générées automatiquement dans votre Google Sheet
Dès la première note transmise, le script crée un onglet nommé **`Participants`** avec les colonnes suivantes :
* **ID** : Identifiant unique de l'étudiant
* **Nom**
* **Prénom**
* **Promotion** (ex: `B3-MKT-2026`)
* **Niveau** (ex: `Bachelor 3`)
* **Note_Mises_Situation_Sur_20**
* **Note_Defi_Vocabulaire_Sur_20**
* **Note_Globale_Sur_20**
* **Missions_Completees** (sur 6)
* **Derniere_Activite** (Date et heure françaises)
* **Reponses_Scenarios_JSON**
* **Reponses_Quiz_JSON**
