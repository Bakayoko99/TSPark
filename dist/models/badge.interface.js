"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeEffetSpecial = exports.TypeRegleObtention = exports.TypeConditionBadge = exports.StatutBadge = exports.CategorieBadge = exports.RareteBadge = void 0;
// Enums
var RareteBadge;
(function (RareteBadge) {
    RareteBadge["COMMUN"] = "commun";
    RareteBadge["PEU_COMMUN"] = "peu_commun";
    RareteBadge["RARE"] = "rare";
    RareteBadge["EPIQUE"] = "epique";
    RareteBadge["LEGENDAIRE"] = "legendaire";
    RareteBadge["MYTHIQUE"] = "mythique";
})(RareteBadge || (exports.RareteBadge = RareteBadge = {}));
var CategorieBadge;
(function (CategorieBadge) {
    CategorieBadge["PROGRESSION"] = "progression";
    CategorieBadge["ACHIEVEMENT"] = "achievement";
    CategorieBadge["SOCIAL"] = "social";
    CategorieBadge["COMPETITION"] = "competition";
    CategorieBadge["EXPLORATION"] = "exploration";
    CategorieBadge["DEDICATION"] = "dedication";
    CategorieBadge["SPECIAL_EVENT"] = "special_event";
    CategorieBadge["MILESTONE"] = "milestone";
})(CategorieBadge || (exports.CategorieBadge = CategorieBadge = {}));
var StatutBadge;
(function (StatutBadge) {
    StatutBadge["ACTIF"] = "actif";
    StatutBadge["INACTIF"] = "inactif";
    StatutBadge["ARCHIVE"] = "archive";
    StatutBadge["BETA"] = "beta";
})(StatutBadge || (exports.StatutBadge = StatutBadge = {}));
var TypeConditionBadge;
(function (TypeConditionBadge) {
    TypeConditionBadge["DEFIS_COMPLETES"] = "defis_completes";
    TypeConditionBadge["DEFIS_CREES"] = "defis_crees";
    TypeConditionBadge["CALORIES_BRULEES"] = "calories_brulees";
    TypeConditionBadge["TEMPS_ENTRAINEMENT"] = "temps_entrainement";
    TypeConditionBadge["SESSIONS_CONSECUTIVES"] = "sessions_consecutives";
    TypeConditionBadge["EXERCICE_SPECIFIQUE"] = "exercice_specifique";
    TypeConditionBadge["NIVEAU_ATTEINT"] = "niveau_atteint";
    TypeConditionBadge["AMIS_INVITES"] = "amis_invites";
    TypeConditionBadge["CLASSEMENT_POSITION"] = "classement_position";
    TypeConditionBadge["PREMIERE_FOIS"] = "premiere_fois";
    TypeConditionBadge["STREAK_JOURS"] = "streak_jours";
    TypeConditionBadge["PARTICIPATION_EVENEMENT"] = "participation_evenement";
    TypeConditionBadge["SCORE_TOTAL"] = "score_total";
    TypeConditionBadge["BADGES_OBTENUS"] = "badges_obtenus";
    TypeConditionBadge["SALLES_VISITEES"] = "salles_visitees";
    TypeConditionBadge["TYPES_EXERCICES_VARIES"] = "types_exercices_varies";
})(TypeConditionBadge || (exports.TypeConditionBadge = TypeConditionBadge = {}));
var TypeRegleObtention;
(function (TypeRegleObtention) {
    TypeRegleObtention["IMMEDIAT"] = "immediat";
    TypeRegleObtention["PERIODIQUE"] = "periodique";
    TypeRegleObtention["CUMULATIVE"] = "cumulative";
    TypeRegleObtention["PROGRESSIVE"] = "progressive";
})(TypeRegleObtention || (exports.TypeRegleObtention = TypeRegleObtention = {}));
var TypeEffetSpecial;
(function (TypeEffetSpecial) {
    TypeEffetSpecial["MULTIPLICATEUR_POINTS"] = "multiplicateur_points";
    TypeEffetSpecial["BONUS_EXPERIENCE"] = "bonus_experience";
    TypeEffetSpecial["ACCES_SPECIAL"] = "acces_special";
    TypeEffetSpecial["REDUCTION_COUT"] = "reduction_cout";
    TypeEffetSpecial["BOOST_PROGRESSION"] = "boost_progression";
})(TypeEffetSpecial || (exports.TypeEffetSpecial = TypeEffetSpecial = {}));
//# sourceMappingURL=badge.interface.js.map