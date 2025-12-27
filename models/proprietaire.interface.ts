export interface Proprietaire {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  dateCreation: Date;
  dernierConnection: Date;
  statut: StatutProprietaire;
  salles: string[]; // IDs des salles
  scoreJoueur: number;
  defisProposees: string[]; // IDs des défis proposés
  documentsVerification: DocumentVerification[];
  informationsEntreprise?: InformationsEntreprise;
}

export interface DocumentVerification {
  type: TypeDocument;
  url: string;
  dateUpload: Date;
  statut: StatutDocument;
  commentaire?: string;
}

export interface InformationsEntreprise {
  nomEntreprise: string;
  siret: string;
  formeJuridique: string;
  adresseSiege: string;
  villeSiege: string;
  codePostalSiege: string;
}

export enum StatutProprietaire {
  ACTIF = 'actif',
  INACTIF = 'inactif',
  SUSPENDU = 'suspendu',
  EN_VERIFICATION = 'en_verification'
}

export enum TypeDocument {
  CARTE_IDENTITE = 'carte_identite',
  JUSTIFICATIF_DOMICILE = 'justificatif_domicile',
  EXTRAIT_KBIS = 'extrait_kbis',
  ASSURANCE = 'assurance',
  AUTORISATION_EXPLOITATION = 'autorisation_exploitation'
}

export enum StatutDocument {
  EN_ATTENTE = 'en_attente',
  VALIDE = 'valide',
  REFUSE = 'refuse'
}

export interface CreateProprietaireDto {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  informationsEntreprise?: InformationsEntreprise;
}

export interface UpdateProprietaireDto {
  email?: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  informationsEntreprise?: InformationsEntreprise;
}

export interface ProprietaireStats {
  nombreSalles: number;
  nombreDefisProposees: number;
  scoreTotal: number;
  classement: number;
  nombreVuesProfile: number;
}
