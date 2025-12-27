export interface Defi {
  id: string;
  titre: string;
  description: string;
  objectifs: ObjectifDefi[];
  exercises: ExerciceDefi[];
  duree: number; // en jours
  niveauDifficulte: NiveauDifficulte;
  typeDefi: TypeDefi;
  salleAssociee?: string; // ID de la salle (pour les défis de propriétaire)
  equipementsRequis: string[];
  caloriesEstimees: number;
  tempsEstime: number; // en minutes par session
  nbSessionsParSemaine: number;
  
  // Métadonnées
  createurId: string;
  typeCreateur: TypeCreateur;
  dateCreation: Date;
  dateDebut?: Date;
  dateFin?: Date;
  statut: StatutDefi;
  
  // Participation et social
  participants: ParticipantDefi[];
  nbParticipants: number;
  nbParticipantsMax?: number;
  estPrive: boolean;
  motDePasse?: string;
  
  // Récompenses
  badges: string[]; // IDs des badges à obtenir
  pointsRecompense: number;
  
  // Statistiques
  nombreCompletions: number;
  noteMoyenne: number;
  nombreAvis: number;
  
  // Média
  image?: string;
  videos?: string[];
  
  // Règles spéciales
  reglesSpeciales?: RegleSpeciale[];
  conditionsVictoire: ConditionVictoire[];
}

export interface ObjectifDefi {
  type: TypeObjectif;
  valeurCible: number;
  unite: string;
  description: string;
}

export interface ExerciceDefi {
  exerciceId: string;
  ordre: number;
  series?: number;
  repetitions?: number;
  duree?: number; // en minutes
  repos?: number; // en secondes
  poids?: number; // en kg
  distance?: number; // en mètres
  notes?: string;
  obligatoire: boolean;
}

export interface ParticipantDefi {
  userId: string;
  typeUtilisateur: TypeCreateur;
  dateInscription: Date;
  statut: StatutParticipation;
  progression: ProgressionParticipant;
  dateCompletion?: Date;
  noteAttribuee?: number;
  commentaire?: string;
}

export interface ProgressionParticipant {
  pourcentageCompletion: number;
  objectifsAtteints: ObjectifAtteint[];
  sessionsRealisees: SessionEntrainement[];
  statistiques: StatistiquesProgression;
}

export interface ObjectifAtteint {
  objectifId: string;
  valeurAtteinte: number;
  dateAtteinte: Date;
  atteint: boolean;
}

export interface SessionEntrainement {
  id: string;
  date: Date;
  duree: number; // en minutes
  caloriesBrulees: number;
  exercicesRealises: ExerciceRealise[];
  notes?: string;
  localisation?: string; // Nom de la salle ou lieu
}

export interface ExerciceRealise {
  exerciceId: string;
  series: SerieRealisee[];
  dureeTotal: number; // en minutes
  caloriesBrulees: number;
  notes?: string;
}

export interface SerieRealisee {
  repetitions?: number;
  poids?: number;
  duree?: number; // en secondes pour les exercices chronométrés
  distance?: number; // en mètres
  repos: number; // en secondes
  difficulteRessentie: number; // 1-10
}

export interface StatistiquesProgression {
  tempsTotal: number; // en minutes
  caloriesTotal: number;
  nombreSessions: number;
  moyenneDifficulte: number;
  meilleurPerformance: Record<string, number>; // exerciceId -> meilleur score
}

export interface RegleSpeciale {
  type: TypeRegleSpeciale;
  description: string;
  parametres: Record<string, any>;
}

export interface ConditionVictoire {
  type: TypeConditionVictoire;
  description: string;
  parametres: Record<string, any>;
  obligatoire: boolean;
}

// Enums
export enum TypeDefi {
  PERSONNEL = 'personnel',
  COLLABORATIF = 'collaboratif',
  COMPETITION = 'competition',
  SALLE_SPECIFIQUE = 'salle_specifique',
  COMMUNAUTAIRE = 'communautaire'
}

export enum TypeCreateur {
  CLIENT = 'client',
  PROPRIETAIRE = 'proprietaire',
  SUPER_ADMIN = 'super_admin'
}

export enum StatutDefi {
  BROUILLON = 'brouillon',
  PUBLIE = 'publie',
  EN_COURS = 'en_cours',
  TERMINE = 'termine',
  ANNULE = 'annule',
  SUSPENDU = 'suspendu'
}

export enum StatutParticipation {
  INSCRIT = 'inscrit',
  EN_COURS = 'en_cours',
  COMPLETE = 'complete',
  ABANDONNE = 'abandonne',
  EXCLU = 'exclu'
}

export enum TypeObjectif {
  CALORIES_BRULEES = 'calories_brulees',
  TEMPS_ENTRAINEMENT = 'temps_entrainement',
  NOMBRE_SESSIONS = 'nombre_sessions',
  DISTANCE_PARCOURUE = 'distance_parcourue',
  POIDS_SOULEVE = 'poids_souleve',
  REPETITIONS_TOTALES = 'repetitions_totales',
  FREQUENCE_CARDIAQUE_MAX = 'frequence_cardiaque_max',
  PROGRESSION_FORCE = 'progression_force',
  FLEXIBILITE = 'flexibilite'
}

export enum TypeRegleSpeciale {
  BONUS_WEEKEND = 'bonus_weekend',
  MALUS_ABSENCE = 'malus_absence',
  MULTIPLICATEUR_GROUPE = 'multiplicateur_groupe',
  DEFI_QUOTIDIEN = 'defi_quotidien',
  PROGRESSION_LINEAIRE = 'progression_lineaire'
}

export enum TypeConditionVictoire {
  OBJECTIFS_MINIMUM = 'objectifs_minimum',
  CLASSEMENT = 'classement',
  TEMPS_LIMITE = 'temps_limite',
  PARTICIPATION_REGULIERE = 'participation_reguliere',
  PROGRESSION_CONTINUE = 'progression_continue'
}

export enum NiveauDifficulte {
  DEBUTANT = 'debutant',
  INTERMEDIAIRE = 'intermediaire',
  AVANCE = 'avance',
  EXPERT = 'expert'
}

// DTOs
export interface CreateDefiDto {
  titre: string;
  description: string;
  objectifs: Omit<ObjectifDefi, 'id'>[];
  exercises: Omit<ExerciceDefi, 'id'>[];
  duree: number;
  niveauDifficulte: NiveauDifficulte;
  typeDefi: TypeDefi;
  salleAssociee?: string;
  equipementsRequis?: string[];
  nbSessionsParSemaine: number;
  nbParticipantsMax?: number;
  estPrive?: boolean;
  motDePasse?: string;
  badges?: string[];
  pointsRecompense?: number;
  image?: string;
  videos?: string[];
  reglesSpeciales?: RegleSpeciale[];
  conditionsVictoire: ConditionVictoire[];
}

export interface UpdateDefiDto {
  titre?: string;
  description?: string;
  objectifs?: ObjectifDefi[];
  exercises?: ExerciceDefi[];
  duree?: number;
  niveauDifficulte?: NiveauDifficulte;
  equipementsRequis?: string[];
  nbSessionsParSemaine?: number;
  nbParticipantsMax?: number;
  estPrive?: boolean;
  motDePasse?: string;
  statut?: StatutDefi;
  image?: string;
  videos?: string[];
  reglesSpeciales?: RegleSpeciale[];
  conditionsVictoire?: ConditionVictoire[];
}

export interface JoinDefiDto {
  motDePasse?: string;
  message?: string;
}

export interface DefiFilters {
  typeDefi?: TypeDefi[];
  niveauDifficulte?: NiveauDifficulte[];
  dureeMin?: number;
  dureeMax?: number;
  equipementsRequis?: string[];
  salleAssociee?: string;
  statut?: StatutDefi[];
  recherche?: string;
  createurId?: string;
  typeCreateur?: TypeCreateur[];
}
