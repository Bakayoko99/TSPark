"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatutDocument = exports.TypeDocument = exports.StatutProprietaire = void 0;
var StatutProprietaire;
(function (StatutProprietaire) {
    StatutProprietaire["ACTIF"] = "actif";
    StatutProprietaire["INACTIF"] = "inactif";
    StatutProprietaire["SUSPENDU"] = "suspendu";
    StatutProprietaire["EN_VERIFICATION"] = "en_verification";
})(StatutProprietaire || (exports.StatutProprietaire = StatutProprietaire = {}));
var TypeDocument;
(function (TypeDocument) {
    TypeDocument["CARTE_IDENTITE"] = "carte_identite";
    TypeDocument["JUSTIFICATIF_DOMICILE"] = "justificatif_domicile";
    TypeDocument["EXTRAIT_KBIS"] = "extrait_kbis";
    TypeDocument["ASSURANCE"] = "assurance";
    TypeDocument["AUTORISATION_EXPLOITATION"] = "autorisation_exploitation";
})(TypeDocument || (exports.TypeDocument = TypeDocument = {}));
var StatutDocument;
(function (StatutDocument) {
    StatutDocument["EN_ATTENTE"] = "en_attente";
    StatutDocument["VALIDE"] = "valide";
    StatutDocument["REFUSE"] = "refuse";
})(StatutDocument || (exports.StatutDocument = StatutDocument = {}));
//# sourceMappingURL=proprietaire.interface.js.map