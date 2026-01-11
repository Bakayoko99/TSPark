# 🏋️ TSPark - Plateforme de Gestion de Salles de Sport et Défis Fitness

TSPark est une plateforme complète de gestion de salles de sport permettant aux utilisateurs de participer à des défis fitness, suivre leurs entraînements et gagner des badges.

## 🎯 Fonctionnalités Principales

### 👤 Gestion des Utilisateurs
- **Inscription et Authentification** : Système sécurisé avec JWT
- **Trois rôles distincts** :
  - 🔴 **ADMIN** : Gestion complète de la plateforme
  - 🟢 **GYM_OWNER** : Gestion de leurs salles de sport
  - 🔵 **CLIENT** : Accès aux défis et suivi d'entraînement
- **Profils personnalisables** : Avatar, informations personnelles
- **Système de points** : Score joueur pour gamification

### 🏢 Gestion des Salles (Gym Owners + Admin)
- **CRUD complet des salles de sport**
- **Système d'approbation** : Les nouvelles salles doivent être validées par un admin
- **Statuts multiples** : PENDING, APPROVED, REJECTED, ACTIVE, INACTIVE
- **Informations détaillées** : Adresse, capacité, contact, description
- **Gestion des équipements** : Association d'équipements à chaque salle
- **Gestion des types d'exercices** : Définition des exercices disponibles par salle

### 🏋️ Équipements et Exercices
- **Catalogue d'équipements** : Tapis de course, haltères, machines, etc.
- **Types d'exercices variés** :
  - 13+ exercices prédéfinis (marche, course, musculation, CrossFit)
  - Niveaux de difficulté : BEGINNER, INTERMEDIATE, ADVANCED
  - Muscles ciblés et calories brûlées par heure
- **Recherche et filtres** : Par difficulté, muscles ciblés, etc.

### 🎯 Système de Défis (Challenges)
- **Création de défis personnalisés** :
  - Par les gym owners pour leurs salles
  - Par les admins pour toute la plateforme
- **Types de défis** :
  - 🏃 **Individuels** : Chacun progresse de son côté
  - 🤝 **Collaboratifs** : Objectif commun à atteindre ensemble
- **Paramètres configurables** :
  - Durée (en jours)
  - Niveau de difficulté
  - Objectif calorique
  - Liste d'exercices à réaliser
- **Statuts de défis** : DRAFT, ACTIVE, COMPLETED, ARCHIVED
- **Participations utilisateurs** :
  - Statuts : INVITED, ACCEPTED, IN_PROGRESS, COMPLETED, ABANDONED
  - Suivi de progression en temps réel (%)
  - Classement (leaderboard)

### 📊 Suivi des Entraînements
- **Séances d'entraînement** :
  - Création de sessions liées à un défi ou libres
  - Date, durée, calories brûlées
  - Notes personnelles
- **Exercices par séance** :
  - Type d'exercice effectué
  - Répétitions, séries, poids
  - Durée de l'exercice
- **Statistiques personnelles** :
  - Total de calories brûlées
  - Nombre de séances
  - Exercices les plus pratiqués
  - Progression dans les défis

### 🏅 Système de Badges et Gamification
- **Types de badges** :
  - 🎯 **CHALLENGE_COMPLETION** : Pour avoir complété des défis
  - 🔥 **STREAK** : Pour séries d'entraînements consécutifs
  - 📈 **MILESTONE** : Pour atteindre des jalons (100 séances, 50k calories)
  - ⭐ **SPECIAL** : Badges spéciaux (fondateurs, événements)
- **Règles d'attribution automatique** :
  - Configuration JSON flexible
  - Plusieurs types de règles : compte de défis, jours consécutifs, calories totales, score joueur
- **Leaderboard des badges** : Classement des utilisateurs par nombre de badges
- **Statistiques de badges** : Par utilisateur, par type

### 📈 Statistiques et Analytics
- **Statistiques globales** :
  - Types d'exercices les plus populaires
  - Répartition par niveau de difficulté
  - Statistiques des défis
- **Statistiques utilisateur** :
  - Progression dans les défis
  - Historique des entraînements
  - Badges obtenus
  - Classements

### 🔍 Recherche et Filtres
- **Salles de sport** : Par ville, statut, propriétaire
- **Exercices** : Par difficulté, muscles ciblés, nom
- **Défis** : Par statut, difficulté, salle, type (collaboratif)
- **Badges** : Par type, nom

## 🛠️ Choix Techniques

### Pourquoi PostgreSQL ?

1. **Intégrité des données** :
   - Relations complexes entre entités (salles, défis, utilisateurs, badges)
   - Contraintes de clés étrangères strictes
   - Support transactionnel ACID

2. **Performances** :
   - Indexation avancée pour les recherches
   - Optimisation des requêtes JOIN complexes
   - Gestion efficace de milliers d'utilisateurs simultanés

3. **Évolutivité** :
   - Support des JSON pour configurations flexibles (badge rules)
   - Extensions possibles (PostGIS pour localisation future)
   - Partitionnement de tables pour gros volumes

4. **Fiabilité** :
   - Open-source mature et stable
   - Grande communauté
   - Excellent support de TypeScript via Prisma

### Pourquoi Prisma ORM ?

1. **Type Safety** :
   - Génération automatique des types TypeScript
   - Auto-complétion intelligente
   - Détection d'erreurs à la compilation

2. **Developer Experience** :
   ```typescript
   // Requête typée et lisible
   const user = await prisma.user.findUnique({
     where: { email: 'user@example.com' },
     include: { 
       owned_salles: true,
       user_badges: {
         include: { badge: true }
       }
     }
   });
   ```

3. **Migrations sécurisées** :
   - Historique des modifications de schéma
   - Rollback possible
   - Détection automatique des conflits

4. **Performance** :
   - Connection pooling intégré
   - Requêtes optimisées automatiquement
   - Lazy loading et eager loading intelligents

5. **Schema centralisé** :
   - Single source of truth avec `schema.prisma`
   - Documentation auto-générée
   - Visualisation du modèle de données

## 🚀 Installation et Démarrage

### Prérequis
- Node.js v18+ 
- Docker et Docker Compose
- npm ou yarn

### Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer la base de données PostgreSQL** (via Docker) :
```bash
cd docker/
docker compose up -d
```

3. **Créer le fichier `.env`** :
```env
DATABASE_URL="postgresql://tspark_user:tspark_password@localhost:5432/tspark_db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000
```

4. **Lancer les migrations Prisma** :
```bash
npx prisma migrate dev
```

5. **Remplir la base avec des données de test** :
```bash
npm run prisma:seed
```

6. **Lancer l'application** :
```bash
npm run dev
```

L'API sera accessible sur `http://localhost:3000`

## 📚 Documentation API

### Collections Postman

Importez les collections Postman pour tester toutes les APIs :

1. **Admin features** :  
   `postman collections/TSPark API - Admin Complete Collection.postman_collection.json`
   - Gestion des utilisateurs
   - Approbation des salles
   - Gestion globale des badges
   - Création d'exercices et équipements

2. **Gym Owner features** :  
   `postman collections/TSPark API - Gym Owner Collection.postman_collection.json`
   - CRUD de ses salles de sport
   - Gestion des équipements de ses salles
   - Création de défis pour ses salles
   - Consultation des statistiques

3. **Client features** :  
   `postman collections/TSPark API - Client Collection (Corrected).postman_collection.json`
   - Recherche de salles et défis
   - Inscription aux défis
   - Création et suivi d'entraînements
   - Consultation de ses badges
   - Leaderboards et statistiques

### Comptes de test (après seed)

```
Admin:
  Email: admin@tspark.com
  Password: Password123!

Gym Owner 1:
  Email: owner1@gym.com
  Password: Password123!

Gym Owner 2:
  Email: owner2@gym.com
  Password: Password123!

Clients:
  Email: client1@example.com - client4@example.com
  Password: Password123!
```

## 📁 Structure du Projet

```
TSPark/
├── prisma/
│   ├── schema.prisma          # Schéma de base de données
│   ├── migrations/            # Historique des migrations
│   └── seed.ts                # Données de test
├── src/
│   ├── controllers/           # Logique métier
│   ├── middlewares/           # Auth, validation, erreurs
│   ├── routes/                # Endpoints API
│   ├── types/                 # Types TypeScript
│   └── utils/                 # Utilitaires
├── docker/
│   └── docker-compose.yml     # Configuration PostgreSQL
├── postman collections/       # Collections API
└── server.ts                  # Point d'entrée

```

## 🔐 Sécurité

- ✅ Authentification JWT
- ✅ Hash des mots de passe avec bcrypt (salt rounds: 10)
- ✅ Validation des entrées utilisateur
- ✅ Middlewares de contrôle d'accès par rôle
- ✅ Vérification de propriété des ressources
- ✅ Protection contre les injections SQL (Prisma ORM)

## 📊 Modèle de Données

Le projet utilise **14 entités principales** avec des relations complexes :

- **User** ↔ **Salle** (propriétaire)
- **Salle** ↔ **Equipment** (many-to-many via GymEquipment)
- **Salle** ↔ **ExerciceType** (many-to-many via GymExerciceType)
- **User** ↔ **Defi** (créateur et participants)
- **Defi** ↔ **ExerciceType** (many-to-many via DefiExercice)
- **User** ↔ **WorkoutSession** ↔ **ExerciceType**
- **User** ↔ **Badge** (many-to-many via UserBadge)
- **Badge** ↔ **BadgeRule** (règles d'attribution)

Voir `prisma/schema.prisma` pour le détail complet.




## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 👥 Équipe

Projet réalisé dans le cadre du Master 1 ESGI - Semestre 2

---

**TSPark** - Transformez vos objectifs fitness en réalité ! 💪🏆