export interface Defi {
    id: string;
    titre: string;
    description: string;
    objectifs: ObjectifDefi[];
    exercises: ExerciceDefi[];
    duree: number;
    niveauDifficulte: NiveauDifficulte;
    typeDefi: TypeDefi;
    salleAssociee?: string;
    equipementsRequis: string[];
    caloriesEstimees: number;
    tempsEstime: number;
    nbSessionsParSemaine: number;
    createurId: string;
    typeCreateur: TypeCreateur;
    dateCreation: Date;
    dateDebut?: Date;
    dateFin?: Date;
    statut: StatutDefi;
    participants: ParticipantDefi[];
    nbParticipants: number;
    nbParticipantsMax?: number;
    estPrive: boolean;
    motDePasse?: string;
    badges: string[];
    pointsRecompense: number;
    nombreCompletions: number;
    noteMoyenne: number;
    nombreAvis: number;
    image?: string;
    videos?: string[];
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
    duree?: number;
    repos?: number;
    poids?: number;
    distance?: number;
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
    duree: number;
    caloriesBrulees: number;
    exercicesRealises: ExerciceRealise[];
    notes?: string;
    localisation?: string;
}
export interface ExerciceRealise {
    exerciceId: string;
    series: SerieRealisee[];
    dureeTotal: number;
    caloriesBrulees: number;
    notes?: string;
}
export interface SerieRealisee {
    repetitions?: number;
    poids?: number;
    duree?: number;
    distance?: number;
    repos: number;
    difficulteRessentie: number;
}
export interface StatistiquesProgression {
    tempsTotal: number;
    caloriesTotal: number;
    nombreSessions: number;
    moyenneDifficulte: number;
    meilleurPerformance: Record<string, number>;
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
export declare enum TypeDefi {
    PERSONNEL = "personnel",
    COLLABORATIF = "collaboratif",
    COMPETITION = "competition",
    SALLE_SPECIFIQUE = "salle_specifique",
    COMMUNAUTAIRE = "communautaire"
}
export declare enum TypeCreateur {
    CLIENT = "client",
    PROPRIETAIRE = "proprietaire",
    SUPER_ADMIN = "super_admin"
}
export declare enum StatutDefi {
    BROUILLON = "brouillon",
    PUBLIE = "publie",
    EN_COURS = "en_cours",
    TERMINE = "termine",
    ANNULE = "annule",
    SUSPENDU = "suspendu"
}
export declare enum StatutParticipation {
    INSCRIT = "inscrit",
    EN_COURS = "en_cours",
    COMPLETE = "complete",
    ABANDONNE = "abandonne",
    EXCLU = "exclu"
}
export declare enum TypeObjectif {
    CALORIES_BRULEES = "calories_brulees",
    TEMPS_ENTRAINEMENT = "temps_entrainement",
    NOMBRE_SESSIONS = "nombre_sessions",
    DISTANCE_PARCOURUE = "distance_parcourue",
    POIDS_SOULEVE = "poids_souleve",
    REPETITIONS_TOTALES = "repetitions_totales",
    FREQUENCE_CARDIAQUE_MAX = "frequence_cardiaque_max",
    PROGRESSION_FORCE = "progression_force",
    FLEXIBILITE = "flexibilite"
}
export declare enum TypeRegleSpeciale {
    BONUS_WEEKEND = "bonus_weekend",
    MALUS_ABSENCE = "malus_absence",
    MULTIPLICATEUR_GROUPE = "multiplicateur_groupe",
    DEFI_QUOTIDIEN = "defi_quotidien",
    PROGRESSION_LINEAIRE = "progression_lineaire"
}
export declare enum TypeConditionVictoire {
    OBJECTIFS_MINIMUM = "objectifs_minimum",
    CLASSEMENT = "classement",
    TEMPS_LIMITE = "temps_limite",
    PARTICIPATION_REGULIERE = "participation_reguliere",
    PROGRESSION_CONTINUE = "progression_continue"
}
export declare enum NiveauDifficulte {
    DEBUTANT = "debutant",
    INTERMEDIAIRE = "intermediaire",
    AVANCE = "avance",
    EXPERT = "expert"
}
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
//# sourceMappingURL=defis.interface.d.ts.map