angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["sánzá ya yambo","sánzá ya míbalé","sánzá ya mísáto","sánzá ya mínei","sánzá ya mítáno","sánzá ya motóbá","sánzá ya nsambo","sánzá ya mwambe","sánzá ya libwa","sánzá ya zómi","sánzá ya zómi na mɔ̌kɔ́","sánzá ya zómi na míbalé"],"SHORTMONTH":["yan","fbl","msi","apl","mai","yun","yul","agt","stb","ɔtb","nvb","dsb"],"DAY":["eyenga","mokɔlɔ mwa yambo","mokɔlɔ mwa míbalé","mokɔlɔ mwa mísáto","mokɔlɔ ya mínéi","mokɔlɔ ya mítáno","mpɔ́sɔ"],"SHORTDAY":["eye","ybo","mbl","mst","min","mtn","mps"],"AMPMS":["ntɔ́ngɔ́","mpókwa"],"medium":"d MMM y HH:mm:ss","short":"d/M/yyyy HH:mm","fullDate":"EEEE d MMMM y","longDate":"d MMMM y","mediumDate":"d MMM y","shortDate":"d/M/yyyy","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":".","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"","posSuf":" \u00A4","negPre":"-","negSuf":" \u00A4","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"FrCD"},"id":"ln"});
}]);