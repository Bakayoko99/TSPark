export interface SuperAdmin {
  id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  dateCreation: Date;
  dernierConnection: Date;
  permissions: SuperAdminPermissions;
}

export interface SuperAdminPermissions {
  gestionSalles: boolean;
  gestionExercices: boolean;
  gestionBadges: boolean;
  gestionUtilisateurs: boolean;
  gestionProprietaires: boolean;
  approuverSalles: boolean;
  statistiquesGlobales: boolean;
}

export interface CreateSuperAdminDto {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  permissions?: SuperAdminPermissions;
}

export interface UpdateSuperAdminDto {
  email?: string;
  lastName?: string;
  firstName?: string;
  permissions?: SuperAdminPermissions;
}
