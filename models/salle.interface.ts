export interface Salle {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  coordonnees: Coordonnees;
  proprietaireId: string;
  capaciteAccueil: number;
  equipements: Equipement[];
  description: string;
  typesActivites: string[];
  heuresOuverture: HeuresOuverture;
  statut: StatutSalle;
  dateCreation: Date;
  dateApprobation?: Date;
  approuvePar?: string; // SuperAdmin ID
  photos: string[]; // URLs des photos
  tarifs?: Tarif[];
  notesMoyenne: number;
  nombreAvis: number;
}

export interface Coordonnees {
  latitude: number;
  longitude: number;
}

export interface Equipement {
  id: string;
  nom: string;
  quantite: number;
  etat: EtatEquipement;
  description?: string;
}

export interface HeuresOuverture {
  lundi: CreneauHoraire[];
  mardi: CreneauHoraire[];
  mercredi: CreneauHoraire[];
  jeudi: CreneauHoraire[];
  vendredi: CreneauHoraire[];
  samedi: CreneauHoraire[];
  dimanche: CreneauHoraire[];
}

export interface CreneauHoraire {
  ouverture: string; // Format HH:mm
  fermeture: string; // Format HH:mm
}

export interface Tarif {
  type: TypeTarif;
  prix: number;
  duree: number; // en jours
  description?: string;
}

export enum StatutSalle {
  EN_ATTENTE = 'en_attente',
  APPROUVE = 'approuve',
  REFUSE = 'refuse',
  SUSPENDU = 'suspendu',
  FERME = 'ferme'
}

export enum EtatEquipement {
  EXCELLENT = 'excellent',
  BON = 'bon',
  MOYEN = 'moyen',
  MAUVAIS = 'mauvais',
  HORS_SERVICE = 'hors_service'
}

export enum TypeTarif {
  JOURNEE = 'journee',
  SEMAINE = 'semaine',
  MOIS = 'mois',
  ANNEE = 'annee'
}

export interface CreateSalleDto {
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  coordonnees: Coordonnees;
  proprietaireId: string;
  capaciteAccueil: number;
  equipements: Omit<Equipement, 'id'>[];
  description: string;
  typesActivites: string[];
  heuresOuverture: HeuresOuverture;
  photos?: string[];
  tarifs?: Tarif[];
}

export interface UpdateSalleDto {
  nom?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  coordonnees?: Coordonnees;
  capaciteAccueil?: number;
  equipements?: Equipement[];
  description?: string;
  typesActivites?: string[];
  heuresOuverture?: HeuresOuverture;
  photos?: string[];
  tarifs?: Tarif[];
}

export interface ApproveSalleDto {
  statut: StatutSalle.APPROUVE | StatutSalle.REFUSE;
  commentaire?: string;
}
