export interface SuperAdmin {
    id: string;
    email: string;
    password: string;
    nom: string;
    prenom: string;
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
    nom: string;
    prenom: string;
    permissions?: SuperAdminPermissions;
}
export interface UpdateSuperAdminDto {
    email?: string;
    nom?: string;
    prenom?: string;
    permissions?: SuperAdminPermissions;
}
//# sourceMappingURL=superAdmin.interface.d.ts.map