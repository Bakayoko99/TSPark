export interface Client {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe: Sexe;
  taille?: number; // en cm
  poids?: number; // en kg
  niveauActivite: NiveauActivite;
  objectifs: ObjectifFitness[];
  dateCreation: Date;
  dernierConnection: Date;
  statut: StatutClient;
  photo?: string;
  badges: BadgeUtilisateur[];
  statistiques: StatistiquesClient;
  preferences: PreferencesClient;
  amis: string[]; // IDs des amis
  defisEnCours: string[]; // IDs des défis en cours
  defisCompletes: string[]; // IDs des défis complétés
  defisCreees: string[]; // IDs des défis créés
}

export interface StatistiquesClient {
  nombreDefisCompletes: number;
  nombreDefisCreees: number;
  tempsEntrainementTotal: number; // en minutes
  caloriesBrulees: number;
  scoreTotal: number;
  classementGlobal: number;
  streakActuelle: number; // jours consécutifs d'activité
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
  dureeSessionPreferred: number; // en minutes
}

export interface BadgeUtilisateur {
  badgeId: string;
  dateObtention: Date;
  defiAssocie?: string; // ID du défi qui a permis d'obtenir le badge
}

export enum Sexe {
  HOMME = 'homme',
  FEMME = 'femme',
  AUTRE = 'autre'
}

export enum NiveauActivite {
  SEDENTAIRE = 'sedentaire',
  LEGER = 'leger',
  MODERE = 'modere',
  INTENSE = 'intense',
  TRES_INTENSE = 'tres_intense'
}

export enum ObjectifFitness {
  PERTE_POIDS = 'perte_poids',
  PRISE_MASSE = 'prise_masse',
  ENDURANCE = 'endurance',
  FORCE = 'force',
  FLEXIBILITE = 'flexibilite',
  SANTE_GENERALE = 'sante_generale',
  COMPETITION = 'competition'
}

export enum StatutClient {
  ACTIF = 'actif',
  INACTIF = 'inactif',
  SUSPENDU = 'suspendu'
}

export enum NiveauDifficulte {
  DEBUTANT = 'debutant',
  INTERMEDIAIRE = 'intermediaire',
  AVANCE = 'avance',
  EXPERT = 'expert'
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

export enum StatutInvitation {
  EN_ATTENTE = 'en_attente',
  ACCEPTEE = 'acceptee',
  REFUSEE = 'refusee'
}
