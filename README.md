# Projet-DevWeb

## Titre
Projet Campus Events Hub
# Description
Ce projet est une application web pour gérer des événements sur un campus. Les utilisateurs peuvent s'inscrire, se connecter, créer, modifier, supprimer et consulter des événements. Le frontend utilise HTML, CSS et JavaScript, et le backend est basé sur Node.js, Express et SQLite.
## Fonctionnalités
- Inscription et connexion avec rôles (étudiant ou organisateur).
- Création, modification et suppression d'événements (organisateur uniquement).
- Affichage et filtrage des événements par catégorie et date.
- API sécurisée avec JWT.
## Structure
### Frontend :
- Fichiers HTML :  
  - `index.html` : Page d'accueil avec choix entre se connecter ou s'inscrire.  
  - `signup.html` : Formulaire d'inscription.  
  - `login.html` : Formulaire de connexion.  
  - `test.html` : Page principale avec liste des événements.  
  - `event.html` : Détails d’un événement individuel.  
  - `createevent.html` : Formulaire de création/modification d’événement.

- Fichiers JavaScript :  
  - `auth.js` : Gestion de l'inscription, connexion et stockage du token.  
  - `test.js` : Affichage de la liste des événements sur la page principale.  
  - `event.js` : Affichage des détails d’un événement.  
  - `create_event.js` : Gestion de la création/modification d’événements.

### Backend :
- `app.js` : Fichier principal du serveur Express.
- `routes/auth.js` : Routes pour l'inscription et la connexion.
- `routes/event.js` : Routes pour la gestion des événements.
- `middleware/auth.js` : Middleware pour la vérification des tokens JWT.
- `models/` : Contient les modèles et requêtes vers la base de données.
- `db.js` : Initialisation de la base SQLite.
## Prérequis
- Node.js (v16+)
- npm (inclus avec Node.js)
- Navigateur web (Chrome)
- Serveur local (Live Server de VS Code)
##  Installation
### 1. Backend

```bash
cd projet-evenements
npm install
npm run dev
```
Le serveur démarre sur :
http://localhost:5001

### 2. Frontend
- Live Server (VS Code)
- Clic droit sur index.html → Open with Live Server

⚠️ Important
Assurez-vous que le backend est lancé avant d’ouvrir le frontend.

## Exécution
- Lancez le backend :
```bash
npm run dev
```
- Ouvrez le frontend dans un navigateur (index.html).
- Inscrivez-vous, connectez-vous et testez les fonctionnalités.
## Dépannage
- Erreurs CORS :
  Vérifiez que le backend tourne sur http://localhost:5001 et le frontend sur un serveur local.

- Base de données :
  Assurez-vous que le fichier `db.sqlite` est présent et accessible en écriture.

- Authentification :
  Le token JWT est stocké dans localStorage.

- Port occupé :
  Changez le port dans  `app.js` si nécessaire (exemple : 5002, etc.).
# Dépendances
### Backend
- express – Création de l’API et des routes

- cors – Autorisation des requêtes cross-origin

- bcryptjs – Hachage des mots de passe

- jsonwebtoken – Génération et vérification des tokens JWT

- better-sqlite3 – Accès à la base SQLite

- nodemon (en développement) – Redémarrage automatique du serveur
Installation :
```bash
npm install express cors bcryptjs jsonwebtoken better-sqlite3
npm install --save-dev nodemon
```
### Frontend
- Aucune dépendance externe (HTML / CSS / JS )
