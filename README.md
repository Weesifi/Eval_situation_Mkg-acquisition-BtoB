# 🚀 Acquisition Quest B2B
### Application d'Évaluation de Situation & Diagnostic pour le cours "Marketing d'Acquisition"
**Niveau : Bachelor (Bac+3) • Marketing & Développement Commercial B2B**

---

## 📖 Présentation

**Acquisition Quest B2B** transforme l'ensemble du glossaire et des cadres méthodologiques du marketing d'acquisition B2B en une **application web interactive, moderne et gamifiée**. 

Elle place l'étudiant de Bachelor dans la posture opérationnelle d'un **Responsable d'Acquisition Junior** confronté à des arbitrages concrets au sein d'entreprises B2B réelles.

---

## ✨ Fonctionnalités Principales

### 🎯 1. Missions en Situation Réelle (Cas d'Entreprise)
6 missions immersives avec contexte d'entreprise, rôle assigné, dilemmes à choix multiples et rétroactions pédagogiques immédiates :
- **Mission 1 : Le Décollage du SaaS** *(Cadrage, TAM/SAM/SOM, GTM & Comité d'achat B2B)*
- **Mission 2 : La Bataille de la Visibilité** *(Arbitrage Inbound vs Outbound, SEO, SEA & SGO/GEO)*
- **Mission 3 : La Fuite du Funnel** *(MQL vs SQL, Accord SLA, Lead Scoring & Nurturing)*
- **Mission 4 : Prospection Ciblée & ABM** *(Account-Based Marketing, Séquences & Copywriting AIDA)*
- **Mission 5 : La Machine MarTech** *(Reverse IP, Conversion sans friction & Nudge)*
- **Mission 6 : L'Acquisition Augmentée par l'IA** *(Prompting COFRE, Agents IA autonomes & GEO 2025+)*

### ⚡ 2. Défi Vocabulaire Express (Mode Chrono)
- Quiz diagnostic rapide de 10 ou 20 questions aléatoires.
- Compteur de série de victoires (**Streak**) et calcul de bonus.
- Explications pédagogiques immédiates pour chaque terme.

### 📚 3. Le Grand Glossaire Interactif (44 termes)
- Moteur de recherche instantané (concepts, outils, mots-clés).
- Filtres par catégories : *Stratégie*, *Inbound*, *Funnel*, *Outbound*, *MarTech & IA*.
- Deux modes d'affichage : **Fiches Détaillées** ou **Mode Flashcards (Révision active)**.
- Chaque terme intègre : Définition officielle, Exemple terrain B2B, Outils associés et le **"Réflexe Bachelor"**.

### 📊 4. Bilan & Diagnostic de l'Étudiant
- **Radar des Compétences** interactif à 5 branches (généré via Chart.js).
- Calcul dynamique du **Profil d'Acquisition** (ex: *Le Stratège Go-To-Market*, *L'Architecte Inbound*, *Le Chasseur ABM*, etc.).
- Recommandations prioritaires personnalisées pour le cours à venir.
- Export en un clic vers le presse-papier pour dépôt sur **Netyparéo** ou impression PDF.

### 🎓 5. Espace Formateur & Débriefing
- Corrigé intégral commenté des 6 missions.
- Guide d'animation de séance (Icebreaker individuel, tournoi en binômes, débriefing collectif).
- Grille d'évaluation continue.

---

## 🖥️ Comment Lancer l'Application ?

L'application est 100% autonome et ne nécessite aucune installation de serveur ou de base de données.

### Option 1 : Lancement Direct (Le plus simple)
Double-cliquez simplement sur le fichier **`index.html`** dans votre explorateur de fichiers. Il s'ouvrira directement dans votre navigateur web favori (Chrome, Edge, Firefox, Safari).

### Option 2 : Lancement via un serveur local (Recommandé en classe)
Dans un terminal PowerShell ou Bash ouvert dans ce dossier :
```powershell
# Avec Python 3
python -m http.server 8000
```
Puis ouvrez votre navigateur à l'adresse : **`http://localhost:8000`**

---

## 📁 Structure du Projet

```
├── index.html              # Interface principale Single Page Application
├── style.css               # Styles graphiques, thèmes sombres et animations
├── app.js                  # Moteur logique, gestion d'état, audio Web Audio API, radar
├── GUIDE_PEDAGOGIQUE.md    # Kit complet d'animation pédagogique pour le formateur
├── README.md               # Documentation de l'application
│
└── data/
    ├── glossary.js         # Données des 44 termes du glossaire et catégories
    ├── scenarios.js        # Données des 6 missions en situation professionnelle
    └── quiz.js             # Banque de questions pour le Défi Vocabulaire Express
```

---

## 🔒 Confidentialité & RGPD

Toutes les données (nom de l'étudiant, scores, progression) sont stockées exclusivement dans le **localStorage** du navigateur de l'utilisateur. Aucune donnée n'est envoyée vers un serveur tiers.
