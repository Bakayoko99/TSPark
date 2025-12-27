"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatutExercice = exports.ModificateurDifficulte = exports.NiveauDifficulte = exports.TypeExercice = exports.GroupeMusculaire = void 0;
var GroupeMusculaire;
(function (GroupeMusculaire) {
    // Haut du corps
    GroupeMusculaire["PECTORAUX"] = "pectoraux";
    GroupeMusculaire["DORSAUX"] = "dorsaux";
    GroupeMusculaire["EPAULES"] = "epaules";
    GroupeMusculaire["BICEPS"] = "biceps";
    GroupeMusculaire["TRICEPS"] = "triceps";
    GroupeMusculaire["AVANT_BRAS"] = "avant_bras";
    GroupeMusculaire["ABDOMINAUX"] = "abdominaux";
    GroupeMusculaire["OBLIQUES"] = "obliques";
    // Bas du corps
    GroupeMusculaire["QUADRICEPS"] = "quadriceps";
    GroupeMusculaire["ISCHIO_JAMBIERS"] = "ischio_jambiers";
    GroupeMusculaire["FESSIERS"] = "fessiers";
    GroupeMusculaire["MOLLETS"] = "mollets";
    GroupeMusculaire["ADDUCTEURS"] = "adducteurs";
    // Corps entier
    GroupeMusculaire["CARDIO"] = "cardio";
    GroupeMusculaire["FONCTIONNEL"] = "fonctionnel";
})(GroupeMusculaire || (exports.GroupeMusculaire = GroupeMusculaire = {}));
var TypeExercice;
(function (TypeExercice) {
    TypeExercice["MUSCULATION"] = "musculation";
    TypeExercice["CARDIO"] = "cardio";
    TypeExercice["STRETCHING"] = "stretching";
    TypeExercice["YOGA"] = "yoga";
    TypeExercice["PILATES"] = "pilates";
    TypeExercice["CROSSFIT"] = "crossfit";
    TypeExercice["CALISTHENICS"] = "calisthenics";
    TypeExercice["NATATION"] = "natation";
    TypeExercice["COURSE"] = "course";
    TypeExercice["CYCLISME"] = "cyclisme";
    TypeExercice["BOXE"] = "boxe";
    TypeExercice["DANSE"] = "danse";
    TypeExercice["SPORT_COLLECTIF"] = "sport_collectif";
})(TypeExercice || (exports.TypeExercice = TypeExercice = {}));
var NiveauDifficulte;
(function (NiveauDifficulte) {
    NiveauDifficulte["DEBUTANT"] = "debutant";
    NiveauDifficulte["INTERMEDIAIRE"] = "intermediaire";
    NiveauDifficulte["AVANCE"] = "avance";
    NiveauDifficulte["EXPERT"] = "expert";
})(NiveauDifficulte || (exports.NiveauDifficulte = NiveauDifficulte = {}));
var ModificateurDifficulte;
(function (ModificateurDifficulte) {
    ModificateurDifficulte["PLUS_FACILE"] = "plus_facile";
    ModificateurDifficulte["PLUS_DIFFICILE"] = "plus_difficile";
    ModificateurDifficulte["NEUTRE"] = "neutre";
})(ModificateurDifficulte || (exports.ModificateurDifficulte = ModificateurDifficulte = {}));
var StatutExercice;
(function (StatutExercice) {
    StatutExercice["ACTIF"] = "actif";
    StatutExercice["INACTIF"] = "inactif";
    StatutExercice["EN_REVISION"] = "en_revision";
})(StatutExercice || (exports.StatutExercice = StatutExercice = {}));
//# sourceMappingURL=exercises.interface.js.map