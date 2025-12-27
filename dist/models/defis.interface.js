"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NiveauDifficulte = exports.TypeConditionVictoire = exports.TypeRegleSpeciale = exports.TypeObjectif = exports.StatutParticipation = exports.StatutDefi = exports.TypeCreateur = exports.TypeDefi = void 0;
// Enums
var TypeDefi;
(function (TypeDefi) {
    TypeDefi["PERSONNEL"] = "personnel";
    TypeDefi["COLLABORATIF"] = "collaboratif";
    TypeDefi["COMPETITION"] = "competition";
    TypeDefi["SALLE_SPECIFIQUE"] = "salle_specifique";
    TypeDefi["COMMUNAUTAIRE"] = "communautaire";
})(TypeDefi || (exports.TypeDefi = TypeDefi = {}));
var TypeCreateur;
(function (TypeCreateur) {
    TypeCreateur["CLIENT"] = "client";
    TypeCreateur["PROPRIETAIRE"] = "proprietaire";
    TypeCreateur["SUPER_ADMIN"] = "super_admin";
})(TypeCreateur || (exports.TypeCreateur = TypeCreateur = {}));
var StatutDefi;
(function (StatutDefi) {
    StatutDefi["BROUILLON"] = "brouillon";
    StatutDefi["PUBLIE"] = "publie";
    StatutDefi["EN_COURS"] = "en_cours";
    StatutDefi["TERMINE"] = "termine";
    StatutDefi["ANNULE"] = "annule";
    StatutDefi["SUSPENDU"] = "suspendu";
})(StatutDefi || (exports.StatutDefi = StatutDefi = {}));
var StatutParticipation;
(function (StatutParticipation) {
    StatutParticipation["INSCRIT"] = "inscrit";
    StatutParticipation["EN_COURS"] = "en_cours";
    StatutParticipation["COMPLETE"] = "complete";
    StatutParticipation["ABANDONNE"] = "abandonne";
    StatutParticipation["EXCLU"] = "exclu";
})(StatutParticipation || (exports.StatutParticipation = StatutParticipation = {}));
var TypeObjectif;
(function (TypeObjectif) {
    TypeObjectif["CALORIES_BRULEES"] = "calories_brulees";
    TypeObjectif["TEMPS_ENTRAINEMENT"] = "temps_entrainement";
    TypeObjectif["NOMBRE_SESSIONS"] = "nombre_sessions";
    TypeObjectif["DISTANCE_PARCOURUE"] = "distance_parcourue";
    TypeObjectif["POIDS_SOULEVE"] = "poids_souleve";
    TypeObjectif["REPETITIONS_TOTALES"] = "repetitions_totales";
    TypeObjectif["FREQUENCE_CARDIAQUE_MAX"] = "frequence_cardiaque_max";
    TypeObjectif["PROGRESSION_FORCE"] = "progression_force";
    TypeObjectif["FLEXIBILITE"] = "flexibilite";
})(TypeObjectif || (exports.TypeObjectif = TypeObjectif = {}));
var TypeRegleSpeciale;
(function (TypeRegleSpeciale) {
    TypeRegleSpeciale["BONUS_WEEKEND"] = "bonus_weekend";
    TypeRegleSpeciale["MALUS_ABSENCE"] = "malus_absence";
    TypeRegleSpeciale["MULTIPLICATEUR_GROUPE"] = "multiplicateur_groupe";
    TypeRegleSpeciale["DEFI_QUOTIDIEN"] = "defi_quotidien";
    TypeRegleSpeciale["PROGRESSION_LINEAIRE"] = "progression_lineaire";
})(TypeRegleSpeciale || (exports.TypeRegleSpeciale = TypeRegleSpeciale = {}));
var TypeConditionVictoire;
(function (TypeConditionVictoire) {
    TypeConditionVictoire["OBJECTIFS_MINIMUM"] = "objectifs_minimum";
    TypeConditionVictoire["CLASSEMENT"] = "classement";
    TypeConditionVictoire["TEMPS_LIMITE"] = "temps_limite";
    TypeConditionVictoire["PARTICIPATION_REGULIERE"] = "participation_reguliere";
    TypeConditionVictoire["PROGRESSION_CONTINUE"] = "progression_continue";
})(TypeConditionVictoire || (exports.TypeConditionVictoire = TypeConditionVictoire = {}));
var NiveauDifficulte;
(function (NiveauDifficulte) {
    NiveauDifficulte["DEBUTANT"] = "debutant";
    NiveauDifficulte["INTERMEDIAIRE"] = "intermediaire";
    NiveauDifficulte["AVANCE"] = "avance";
    NiveauDifficulte["EXPERT"] = "expert";
})(NiveauDifficulte || (exports.NiveauDifficulte = NiveauDifficulte = {}));
//# sourceMappingURL=defis.interface.js.map