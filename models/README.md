# Documentation des Modèles TSPark

## Vue d'ensemble

Les modèles définissent la structure des données pour l'application TSPark, une plateforme de défis fitness gamifiée.

## Modèles Principaux

### 1. SuperAdmin (`superAdmin.interface.ts`)
- Gestion complète de la plateforme
- Permissions granulaires pour chaque fonctionnalité
- Capacité d'approuver les salles et de gérer tous les utilisateurs

### 2. Proprietaire (`proprietaire.interface.ts`)
- Propriétaires de salles de sport
- Système de score joueur pour gamification
- Documents de vérification pour la validation
- Possibilité de proposer des défis spécifiques à leurs salles

### 3. Client (`client.interface.ts`)
- Utilisateurs finaux de la plateforme
- Système complet de profil fitness avec objectifs
- Statistiques détaillées et badges
- Système d'amitié et de défis sociaux

### 4. Salle (`salle.interface.ts`)
- Salles d'entraînement avec équipements
- Système d'approbation par les super admins
- Géolocalisation et horaires d'ouverture
- Tarification et système d'évaluation

### 5. Exercise (`exercises.interface.ts`)
- Base de données complète d'exercices
- Classification par groupes musculaires et types
- Variantes et niveaux de difficulté
- Estimations caloriques et temporelles

### 6. Defi (`defis.interface.ts`)
- Défis d'entraînement personnalisables
- Système de participation collaborative
- Suivi de progression en temps réel
- Conditions de victoire flexibles
- Règles spéciales pour la gamification

### 7. Badge (`badge.interface.ts`)
- Système de récompenses virtuelles
- Conditions d'obtention dynamiques configurables
- Différents niveaux de rareté
- Effets spéciaux pour la motivation

## Fonctionnalités Clés par Rôle

### Super Admin
- ✅ Création, modification, suppression de salles
- ✅ Approbation des demandes de salles
- ✅ Gestion complète des types d'exercices
- ✅ Création de badges avec règles dynamiques
- ✅ Désactivation/suppression d'utilisateurs et propriétaires

### Propriétaire de Salle
- ✅ Gestion des informations de salle (nom, adresse, équipements)
- ✅ Proposition de défis spécifiques à la salle
- ✅ Système de score joueur pour engagement
- ✅ Documents de vérification pour validation

### Client
- ✅ Création et partage de défis personnalisés
- ✅ Exploration de défis avec filtres avancés
- ✅ Suivi détaillé de progression d'entraînement
- ✅ Défis sociaux avec invitation d'amis
- ✅ Système de récompenses et badges
- ✅ Classements et statistiques

## Utilisation des Modèles

### Import des types
```typescript
// Import direct depuis les fichiers individuels
import { Client, CreateClientDto } from './models/client.interface';
import { Defi, TypeDefi } from './models/defis.interface';
import { Exercise, GroupeMusculaire } from './models/exercises.interface';
```

### Éviter les conflits de noms
Certains enums comme `NiveauDifficulte` existent dans plusieurs modèles. Utilisez des imports avec alias :

```typescript
import { NiveauDifficulte as NiveauDifficulteClient } from './models/client.interface';
import { NiveauDifficulte as NiveauDifficulteExercise } from './models/exercises.interface';
```

## Extensibilité

Les modèles sont conçus pour être extensibles :
- Ajout facile de nouveaux types d'exercices
- Conditions de badges configurables dynamiquement
- Règles de défis personnalisables
- Système de permissions granulaire

## Validation

Tous les modèles incluent :
- DTOs pour la création et mise à jour
- Interfaces de filtrage pour les recherches
- Enums pour les valeurs contrôlées
- Types optionnels pour la flexibilité

## Base de Données

Les modèles sont agnostiques de la base de données mais incluent :
- IDs string pour flexibilité (UUID recommandé)
- Timestamps pour auditabilité
- Relations par IDs pour performance
- Structures JSON pour données complexes
