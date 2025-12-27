export interface Badge {
    id: string;
    nom: string;
    description: string;
    icone: string;
    couleur: string;
    rarete: RareteBadge;
    categorie: CategorieBadge;
    pointsRecompense: number;
    conditions: ConditionBadge[];
    reglesObtention: RegleObtentionBadge;
    dateCreation: Date;
    creePar: string;
    statut: StatutBadge;
    nombreObtentions: number;
    dernierObtention?: Date;
    animationObtention?: string;
    effetsSpeciaux?: EffetSpecialBadge[];
}
export interface ConditionBadge {
    type: TypeConditionBadge;
    description: string;
    parametres: ParametresCondition;
    obligatoire: boolean;
}
export interface ParametresCondition {
    valeur: number;
    unite?: string;
    typeExercice?: string;
    niveauDifficulte?: string;
    duree?: number;
    consecutif?: boolean;
    [key: string]: any;
}
export interface RegleObtentionBadge {
    typeRegle: TypeRegleObtention;
    conditionsRequises: 'toutes' | 'au_moins_une' | number;
    delaiValidation?: number;
    peutEtreObtenuPlusieurs: boolean;
    delaiEntreDuplicationObtention?: number;
}
export interface EffetSpecialBadge {
    type: TypeEffetSpecial;
    valeur: number;
    duree?: number;
    description: string;
}
export interface BadgeUtilisateurDetaille {
    badgeId: string;
    badge: Badge;
    dateObtention: Date;
    defiAssocie?: string;
    conditionsRemplies: ConditionRemplie[];
    niveauBadge: number;
    estNouveau: boolean;
}
export interface ConditionRemplie {
    conditionId: string;
    dateRealisation: Date;
    valeurAtteinte: number;
    contexte?: string;
}
export interface ProgressionBadge {
    badgeId: string;
    badge: Badge;
    progressionConditions: ProgressionCondition[];
    pourcentageGlobal: number;
    prochainNiveau?: number;
    estimationObtention?: Date;
}
export interface ProgressionCondition {
    conditionId: string;
    condition: ConditionBadge;
    valeurActuelle: number;
    valeurCible: number;
    pourcentage: number;
    remplie: boolean;
}
export declare enum RareteBadge {
    COMMUN = "commun",
    PEU_COMMUN = "peu_commun",
    RARE = "rare",
    EPIQUE = "epique",
    LEGENDAIRE = "legendaire",
    MYTHIQUE = "mythique"
}
export declare enum CategorieBadge {
    PROGRESSION = "progression",
    ACHIEVEMENT = "achievement",
    SOCIAL = "social",
    COMPETITION = "competition",
    EXPLORATION = "exploration",
    DEDICATION = "dedication",
    SPECIAL_EVENT = "special_event",
    MILESTONE = "milestone"
}
export declare enum StatutBadge {
    ACTIF = "actif",
    INACTIF = "inactif",
    ARCHIVE = "archive",
    BETA = "beta"
}
export declare enum TypeConditionBadge {
    DEFIS_COMPLETES = "defis_completes",
    DEFIS_CREES = "defis_crees",
    CALORIES_BRULEES = "calories_brulees",
    TEMPS_ENTRAINEMENT = "temps_entrainement",
    SESSIONS_CONSECUTIVES = "sessions_consecutives",
    EXERCICE_SPECIFIQUE = "exercice_specifique",
    NIVEAU_ATTEINT = "niveau_atteint",
    AMIS_INVITES = "amis_invites",
    CLASSEMENT_POSITION = "classement_position",
    PREMIERE_FOIS = "premiere_fois",
    STREAK_JOURS = "streak_jours",
    PARTICIPATION_EVENEMENT = "participation_evenement",
    SCORE_TOTAL = "score_total",
    BADGES_OBTENUS = "badges_obtenus",
    SALLES_VISITEES = "salles_visitees",
    TYPES_EXERCICES_VARIES = "types_exercices_varies"
}
export declare enum TypeRegleObtention {
    IMMEDIAT = "immediat",
    PERIODIQUE = "periodique",
    CUMULATIVE = "cumulative",
    PROGRESSIVE = "progressive"
}
export declare enum TypeEffetSpecial {
    MULTIPLICATEUR_POINTS = "multiplicateur_points",
    BONUS_EXPERIENCE = "bonus_experience",
    ACCES_SPECIAL = "acces_special",
    REDUCTION_COUT = "reduction_cout",
    BOOST_PROGRESSION = "boost_progression"
}
export interface CreateBadgeDto {
    nom: string;
    description: string;
    icone: string;
    couleur: string;
    rarete: RareteBadge;
    categorie: CategorieBadge;
    pointsRecompense: number;
    conditions: Omit<ConditionBadge, 'id'>[];
    reglesObtention: RegleObtentionBadge;
    animationObtention?: string;
    effetsSpeciaux?: EffetSpecialBadge[];
}
export interface UpdateBadgeDto {
    nom?: string;
    description?: string;
    icone?: string;
    couleur?: string;
    rarete?: RareteBadge;
    categorie?: CategorieBadge;
    pointsRecompense?: number;
    conditions?: ConditionBadge[];
    reglesObtention?: RegleObtentionBadge;
    statut?: StatutBadge;
    animationObtention?: string;
    effetsSpeciaux?: EffetSpecialBadge[];
}
export interface BadgeFilters {
    categorie?: CategorieBadge[];
    rarete?: RareteBadge[];
    statut?: StatutBadge[];
    recherche?: string;
    creePar?: string;
    dateCreationMin?: Date;
    dateCreationMax?: Date;
}
export interface AttributeBadgeDto {
    utilisateurId: string;
    badgeId: string;
    defiAssocie?: string;
    conditionsRemplies: string[];
    niveauBadge?: number;
}
//# sourceMappingURL=badge.interface.d.ts.map