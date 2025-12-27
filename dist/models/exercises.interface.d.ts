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
    dureeEstimee: number;
    caloriesParMinute: number;
    photos: string[];
    videos?: string[];
    conseils: string[];
    variantes?: VarianteExercice[];
    dateCreation: Date;
    creeParSuperAdmin: boolean;
    creePar?: string;
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
export declare enum GroupeMusculaire {
    PECTORAUX = "pectoraux",
    DORSAUX = "dorsaux",
    EPAULES = "epaules",
    BICEPS = "biceps",
    TRICEPS = "triceps",
    AVANT_BRAS = "avant_bras",
    ABDOMINAUX = "abdominaux",
    OBLIQUES = "obliques",
    QUADRICEPS = "quadriceps",
    ISCHIO_JAMBIERS = "ischio_jambiers",
    FESSIERS = "fessiers",
    MOLLETS = "mollets",
    ADDUCTEURS = "adducteurs",
    CARDIO = "cardio",
    FONCTIONNEL = "fonctionnel"
}
export declare enum TypeExercice {
    MUSCULATION = "musculation",
    CARDIO = "cardio",
    STRETCHING = "stretching",
    YOGA = "yoga",
    PILATES = "pilates",
    CROSSFIT = "crossfit",
    CALISTHENICS = "calisthenics",
    NATATION = "natation",
    COURSE = "course",
    CYCLISME = "cyclisme",
    BOXE = "boxe",
    DANSE = "danse",
    SPORT_COLLECTIF = "sport_collectif"
}
export declare enum NiveauDifficulte {
    DEBUTANT = "debutant",
    INTERMEDIAIRE = "intermediaire",
    AVANCE = "avance",
    EXPERT = "expert"
}
export declare enum ModificateurDifficulte {
    PLUS_FACILE = "plus_facile",
    PLUS_DIFFICILE = "plus_difficile",
    NEUTRE = "neutre"
}
export declare enum StatutExercice {
    ACTIF = "actif",
    INACTIF = "inactif",
    EN_REVISION = "en_revision"
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
//# sourceMappingURL=exercises.interface.d.ts.map