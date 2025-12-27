"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatutInvitation = exports.NiveauDifficulte = exports.StatutClient = exports.ObjectifFitness = exports.NiveauActivite = exports.Sexe = void 0;
var Sexe;
(function (Sexe) {
    Sexe["HOMME"] = "homme";
    Sexe["FEMME"] = "femme";
    Sexe["AUTRE"] = "autre";
})(Sexe || (exports.Sexe = Sexe = {}));
var NiveauActivite;
(function (NiveauActivite) {
    NiveauActivite["SEDENTAIRE"] = "sedentaire";
    NiveauActivite["LEGER"] = "leger";
    NiveauActivite["MODERE"] = "modere";
    NiveauActivite["INTENSE"] = "intense";
    NiveauActivite["TRES_INTENSE"] = "tres_intense";
})(NiveauActivite || (exports.NiveauActivite = NiveauActivite = {}));
var ObjectifFitness;
(function (ObjectifFitness) {
    ObjectifFitness["PERTE_POIDS"] = "perte_poids";
    ObjectifFitness["PRISE_MASSE"] = "prise_masse";
    ObjectifFitness["ENDURANCE"] = "endurance";
    ObjectifFitness["FORCE"] = "force";
    ObjectifFitness["FLEXIBILITE"] = "flexibilite";
    ObjectifFitness["SANTE_GENERALE"] = "sante_generale";
    ObjectifFitness["COMPETITION"] = "competition";
})(ObjectifFitness || (exports.ObjectifFitness = ObjectifFitness = {}));
var StatutClient;
(function (StatutClient) {
    StatutClient["ACTIF"] = "actif";
    StatutClient["INACTIF"] = "inactif";
    StatutClient["SUSPENDU"] = "suspendu";
})(StatutClient || (exports.StatutClient = StatutClient = {}));
var NiveauDifficulte;
(function (NiveauDifficulte) {
    NiveauDifficulte["DEBUTANT"] = "debutant";
    NiveauDifficulte["INTERMEDIAIRE"] = "intermediaire";
    NiveauDifficulte["AVANCE"] = "avance";
    NiveauDifficulte["EXPERT"] = "expert";
})(NiveauDifficulte || (exports.NiveauDifficulte = NiveauDifficulte = {}));
var StatutInvitation;
(function (StatutInvitation) {
    StatutInvitation["EN_ATTENTE"] = "en_attente";
    StatutInvitation["ACCEPTEE"] = "acceptee";
    StatutInvitation["REFUSEE"] = "refusee";
})(StatutInvitation || (exports.StatutInvitation = StatutInvitation = {}));
//# sourceMappingURL=client.interface.js.map