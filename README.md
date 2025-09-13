# 📘 QuizHub

Une application de quiz interactive développée avec **Next.js**, permettant aux utilisateurs de tester leurs connaissances, suivre leurs performances et progresser dans un environnement moderne et responsive.

---

## 🚀 Aperçu

**QuizHub** propose une expérience complète autour des quiz, avec :

- Système d'authentification sécurisé avec better-auth
- Création et gestion de quiz (admin)
- Participation avec correction en temps réel
- Tableau de bord personnalisé
- Statistiques détaillées et classement

---

## ✨ Fonctionnalités principales

- 🔐 **Authentification** – Inscription et connexion sécurisée (Better-auth)
- 📝 **Création & gestion de quiz** – Interface admin pour gérer les questions
- 🎯 **Participation interactive** – Correction immédiate, feedback en temps réel
- 📊 **Classement** – Affichage des meilleurs scores/joueurs
- 📈 **Statistiques** – Graphiques dynamiques via Recharts
- 🌙 **Mode clair / sombre** – Thème personnalisable
- 🎨 **UI moderne** – Tailwind CSS + daisyUI + shadcn
- 💾 **Sauvegarde des données** – Mysql 

---

## 🛠️ Stack technique

### 🖥️ Frontend
- [Next.js](https://nextjs.org/) – Framework React
- [Tailwind CSS](https://tailwindcss.com/) – Design rapide et responsive

### ⚙️ Backend
- [Mysql](https://www.mysql.com/) – Base de données relationnelle
- [Next.js API Routes / Server Actions](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) – Logique côté serveur
- [Nodemailer](https://nodemailer.com/about/) – Envoi d'e-mails 

### 🧰 Outils & Qualité
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) – Linting et formatage

---

## 📂 Structure du projet

quiz-app/
├── app/ # Pages (App Router)
│ ├── quiz/ # Pages liées aux quiz
│ ├── auth/ # Pages d'authentification
│ └── dashboard/ # Tableau de bord utilisateur
├── components/ # Composants réutilisables
├── lib/ # Fonctions utilitaires (auth, db, etc.)
├── prisma/ # Schéma Prisma + seed
├── public/ # Images et assets
├── styles/ # Fichiers CSS globaux
├── tests/ # Tests unitaires
├── .env.example # Exemple de configuration
├── package.json
├── README.md
└── tsconfig.json

## ⚙️ Installation et démarrage

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/ton-github/quiz-app.git
cd quiz-app

## Installer les dépendances

npm install
# ou
yarn install

### .env.exemple

DATABASE_URL="postgresql://user:password@localhost:5432/quizdb"
NEXTAUTH_SECRET="un_secret_pour_nextauth"
NEXTAUTH_URL="http://localhost:3000"
EMAIL_SERVER_USER="ton_email@gmail.com"
EMAIL_SERVER_PASSWORD="mot_de_passe_application"


npm run dev

