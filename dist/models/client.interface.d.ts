export interface Client {
    id: string;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    sexe: Sexe;
    taille?: number;
    poids?: number;
    niveauActivite: NiveauActivite;
    objectifs: ObjectifFitness[];
    dateCreation: Date;
    dernierConnection: Date;
    statut: StatutClient;
    photo?: string;
    badges: BadgeUtilisateur[];
    statistiques: StatistiquesClient;
    preferences: PreferencesClient;
    amis: string[];
    defisEnCours: string[];
    defisCompletes: string[];
    defisCreees: string[];
}
export interface StatistiquesClient {
    nombreDefisCompletes: number;
    nombreDefisCreees: number;
    tempsEntrainementTotal: number;
    caloriesBrulees: number;
    scoreTotal: number;
    classementGlobal: number;
    streakActuelle: number;
    meilleurStreak: number;
    nombreAmis: number;
}
export interface PreferencesClient {
    notificationsEmail: boolean;
    notificationsPush: boolean;
    partageStats: boolean;
    profilPublic: boolean;
    typesExercicesPreferred: string[];
    niveauxDifficultePreferred: NiveauDifficulte[];
    dureeSessionPreferred: number;
}
export interface BadgeUtilisateur {
    badgeId: string;
    dateObtention: Date;
    defiAssocie?: string;
}
export declare enum Sexe {
    HOMME = "homme",
    FEMME = "femme",
    AUTRE = "autre"
}
export declare enum NiveauActivite {
    SEDENTAIRE = "sedentaire",
    LEGER = "leger",
    MODERE = "modere",
    INTENSE = "intense",
    TRES_INTENSE = "tres_intense"
}
export declare enum ObjectifFitness {
    PERTE_POIDS = "perte_poids",
    PRISE_MASSE = "prise_masse",
    ENDURANCE = "endurance",
    FORCE = "force",
    FLEXIBILITE = "flexibilite",
    SANTE_GENERALE = "sante_generale",
    COMPETITION = "competition"
}
export declare enum StatutClient {
    ACTIF = "actif",
    INACTIF = "inactif",
    SUSPENDU = "suspendu"
}
export declare enum NiveauDifficulte {
    DEBUTANT = "debutant",
    INTERMEDIAIRE = "intermediaire",
    AVANCE = "avance",
    EXPERT = "expert"
}
export interface CreateClientDto {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    sexe: Sexe;
    taille?: number;
    poids?: number;
    niveauActivite: NiveauActivite;
    objectifs: ObjectifFitness[];
}
export interface UpdateClientDto {
    email?: string;
    nom?: string;
    prenom?: string;
    taille?: number;
    poids?: number;
    niveauActivite?: NiveauActivite;
    objectifs?: ObjectifFitness[];
    photo?: string;
    preferences?: PreferencesClient;
}
export interface InvitationAmi {
    id: string;
    expediteurId: string;
    destinataireId: string;
    dateInvitation: Date;
    statut: StatutInvitation;
    message?: string;
}
export declare enum StatutInvitation {
    EN_ATTENTE = "en_attente",
    ACCEPTEE = "acceptee",
    REFUSEE = "refusee"
}
//# sourceMappingURL=client.interface.d.ts.map