angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],"SHORTMONTH":["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sep","Okt","Nov","Dis"],"DAY":["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],"SHORTDAY":["Ahd","Isn","Sel","Rab","Kha","Jum","Sab"],"AMPMS":["PG","PTG"],"medium":"dd/MM/yyyy h:mm:ss a","short":"d/MM/yy h:mm a","fullDate":"EEEE, d MMMM y","longDate":"d MMMM y","mediumDate":"dd/MM/yyyy","shortDate":"d/MM/yy","mediumTime":"h:mm:ss a","shortTime":"h:mm a"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"(\u00A4","negSuf":")","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"RM"},"id":"ms"});
}]);