"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeTarif = exports.EtatEquipement = exports.StatutSalle = void 0;
var StatutSalle;
(function (StatutSalle) {
    StatutSalle["EN_ATTENTE"] = "en_attente";
    StatutSalle["APPROUVE"] = "approuve";
    StatutSalle["REFUSE"] = "refuse";
    StatutSalle["SUSPENDU"] = "suspendu";
    StatutSalle["FERME"] = "ferme";
})(StatutSalle || (exports.StatutSalle = StatutSalle = {}));
var EtatEquipement;
(function (EtatEquipement) {
    EtatEquipement["EXCELLENT"] = "excellent";
    EtatEquipement["BON"] = "bon";
    EtatEquipement["MOYEN"] = "moyen";
    EtatEquipement["MAUVAIS"] = "mauvais";
    EtatEquipement["HORS_SERVICE"] = "hors_service";
})(EtatEquipement || (exports.EtatEquipement = EtatEquipement = {}));
var TypeTarif;
(function (TypeTarif) {
    TypeTarif["JOURNEE"] = "journee";
    TypeTarif["SEMAINE"] = "semaine";
    TypeTarif["MOIS"] = "mois";
    TypeTarif["ANNEE"] = "annee";
})(TypeTarif || (exports.TypeTarif = TypeTarif = {}));
//# sourceMappingURL=salle.interface.js.map