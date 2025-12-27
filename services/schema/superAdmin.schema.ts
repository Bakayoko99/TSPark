import { Schema, model } from 'mongoose';
import { SuperAdmin, SuperAdminPermissions } from '../../models/superAdmin.interface';


const SuperAdminPermissionsSchema = new Schema<SuperAdminPermissions>({
  gestionSalles: { type: Boolean, default: true },
  gestionExercices: { type: Boolean, default: true },
  gestionBadges: { type: Boolean, default: true },
  gestionUtilisateurs: { type: Boolean, default: true },
  gestionProprietaires: { type: Boolean, default: true },
  approuverSalles: { type: Boolean, default: true },
  statistiquesGlobales: { type: Boolean, default: true }
}, { _id: false }); // Pas d'ID séparé pour les permissions


const SuperAdminSchema = new Schema<SuperAdmin>({
  email: {
    type: String,
    required: [true, 'Email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Format email invalide'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Mot de passe est requis'],
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères']
  },
  lastName: {
    type: String,
    required: [true, 'Nom est requis'],
    trim: true,
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  firstName: {
    type: String,
    required: [true, 'Prénom est requis'],
    trim: true,
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dernierConnection: {
    type: Date,
    default: Date.now
  },
  permissions: {
    type: SuperAdminPermissionsSchema,
    default: () => ({
      gestionSalles: true,
      gestionExercices: true,
      gestionBadges: true,
      gestionUtilisateurs: true,
      gestionProprietaires: true,
      approuverSalles: true,
      statistiquesGlobales: true
    })
  }
}, {
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  versionKey: false // Supprime le champ __v
});

// L'index email est déjà défini dans le schéma avec unique: true et index: true

// Middleware pre-save pour hasher le mot de passe
SuperAdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  // Ici vous pourrez ajouter le hashage du mot de passe
  // const bcrypt = require('bcrypt');
  // this.password = await bcrypt.hash(this.password, 12);
  
  next();
});

// Méthode pour exclure le mot de passe des réponses JSON
SuperAdminSchema.methods.toJSON = function() {
  const superAdminObject = this.toObject();
  delete superAdminObject.password;
  return superAdminObject;
};

// Création et export du modèle
export const SuperAdminModel = model<SuperAdmin>('SuperAdmin', SuperAdminSchema);
