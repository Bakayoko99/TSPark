// Note: Importez directement depuis les fichiers individuels pour éviter les conflits de noms
// Exemple: import { Client } from './models/client.interface';
//          import { NiveauDifficulte } from './models/exercises.interface';

// Types communs utilisés dans plusieurs modèles
export enum StatutGeneral {
  ACTIF = 'actif',
  INACTIF = 'inactif',
  SUSPENDU = 'suspendu'
}

export interface BaseEntity {
  id: string;
  dateCreation: Date;
  dateModification?: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: any; // Utilisez les types spécifiques dans les contrôleurs
  tokens: AuthTokens;
  userType: 'client' | 'proprietaire' | 'superAdmin';
}
