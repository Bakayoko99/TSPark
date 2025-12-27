export interface Exercise {
  id: string;
  nom: string;
  description: string;
  instructions: string[];
  musclesPrimaires: GroupeMusculaire[];
  musclesSecondaires: GroupeMusculaire[];
  typeExercice: TypeExercice;
  niveauDifficulte: NiveauDifficulte;
  equipementRequis: string[];
  dureeEstimee: number; // en minutes
  caloriesParMinute: number;
  photos: string[];
  videos?: string[];
  conseils: string[];
  variantes?: VarianteExercice[];
  dateCreation: Date;
  creeParSuperAdmin: boolean;
  creePar?: string; // ID du créateur (SuperAdmin)
  statut: StatutExercice;
  nombreUtilisations: number;
  noteMoyenne: number;
}

export interface VarianteExercice {
  nom: string;
  description: string;
  modificateur: ModificateurDifficulte;
  equipementSupplementaire?: string[];
}

export enum GroupeMusculaire {
  // Haut du corps
  PECTORAUX = 'pectoraux',
  DORSAUX = 'dorsaux',
  EPAULES = 'epaules',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  AVANT_BRAS = 'avant_bras',
  ABDOMINAUX = 'abdominaux',
  OBLIQUES = 'obliques',
  
  // Bas du corps
  QUADRICEPS = 'quadriceps',
  ISCHIO_JAMBIERS = 'ischio_jambiers',
  FESSIERS = 'fessiers',
  MOLLETS = 'mollets',
  ADDUCTEURS = 'adducteurs',
  
  // Corps entier
  CARDIO = 'cardio',
  FONCTIONNEL = 'fonctionnel'
}

export enum TypeExercice {
  MUSCULATION = 'musculation',
  CARDIO = 'cardio',
  STRETCHING = 'stretching',
  YOGA = 'yoga',
  PILATES = 'pilates',
  CROSSFIT = 'crossfit',
  CALISTHENICS = 'calisthenics',
  NATATION = 'natation',
  COURSE = 'course',
  CYCLISME = 'cyclisme',
  BOXE = 'boxe',
  DANSE = 'danse',
  SPORT_COLLECTIF = 'sport_collectif'
}

export enum NiveauDifficulte {
  DEBUTANT = 'debutant',
  INTERMEDIAIRE = 'intermediaire',
  AVANCE = 'avance',
  EXPERT = 'expert'
}

export enum ModificateurDifficulte {
  PLUS_FACILE = 'plus_facile',
  PLUS_DIFFICILE = 'plus_difficile',
  NEUTRE = 'neutre'
}

export enum StatutExercice {
  ACTIF = 'actif',
  INACTIF = 'inactif',
  EN_REVISION = 'en_revision'
}

export interface CreateExerciseDto {
  nom: string;
  description: string;
  instructions: string[];
  musclesPrimaires: GroupeMusculaire[];
  musclesSecondaires?: GroupeMusculaire[];
  typeExercice: TypeExercice;
  niveauDifficulte: NiveauDifficulte;
  equipementRequis?: string[];
  dureeEstimee: number;
  caloriesParMinute: number;
  photos?: string[];
  videos?: string[];
  conseils?: string[];
  variantes?: Omit<VarianteExercice, 'id'>[];
}

export interface UpdateExerciseDto {
  nom?: string;
  description?: string;
  instructions?: string[];
  musclesPrimaires?: GroupeMusculaire[];
  musclesSecondaires?: GroupeMusculaire[];
  typeExercice?: TypeExercice;
  niveauDifficulte?: NiveauDifficulte;
  equipementRequis?: string[];
  dureeEstimee?: number;
  caloriesParMinute?: number;
  photos?: string[];
  videos?: string[];
  conseils?: string[];
  variantes?: VarianteExercice[];
  statut?: StatutExercice;
}

export interface ExerciseFilters {
  typeExercice?: TypeExercice[];
  niveauDifficulte?: NiveauDifficulte[];
  musclesPrimaires?: GroupeMusculaire[];
  equipementRequis?: string[];
  dureeMax?: number;
  dureeMin?: number;
  recherche?: string;
}
