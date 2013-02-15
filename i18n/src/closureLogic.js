var converter = require('./converter.js');

exports.extractNumberSymbols = extractNumberSymbols;
exports.extractCurrencySymbols = extractCurrencySymbols;
exports.extractDateTimeSymbols = extractDateTimeSymbols;
exports.pluralExtractor = pluralExtractor;
exports.outputLocale = outputLocale;
exports.correctedLocaleId = correctedLocaleId;
exports.findLocaleId = findLocaleId;

var goog = { provide: function() {},
  require: function() {},
  i18n: {currency: {}, pluralRules: {}} };

function findLocaleId(str, type) {
  if (type === 'num') {
    return (str.match(/^NumberFormatSymbols_(.+)$/) || [])[1];
  }

  if (type != 'datetime') { throw new Error('unknown type in findLocaleId: ' + type); }

  return (str.match(/^DateTimeSymbols_(.+)$/) || [])[1];
}


function getInfoForLocale(localeInfo, localeID) {
  if (!localeInfo[localeID]) {
    localeInfo[localeID] = {};
    //localeIds.push(localeID);
  }
  return localeInfo[localeID];
}

function extractNumberSymbols(content, localeInfo, currencySymbols) {
//eval script in the current context so that we get access to all the symbols
  eval(content.toString());
  for (var propName in goog.i18n) {
    var localeID = findLocaleId(propName, 'num');
    if (localeID) {
      var info = getInfoForLocale(localeInfo, localeID);
      info.NUMBER_FORMATS =
          converter.convertNumberData(goog.i18n[propName], currencySymbols);
    }
  }
}

function extractCurrencySymbols(content) {
  eval(content.toString());
  var currencySymbols = goog.i18n.currency.CurrencyInfo;
  currencySymbols.__proto__ = goog.i18n.currency.CurrencyInfoTier2;

  return currencySymbols;
}

function extractDateTimeSymbols(content, localeInfo) {
  eval(content.toString());
  for (var propName in goog.i18n) {
    var localeID = findLocaleId(propName, 'datetime');
    if (localeID) {
      var info = getInfoForLocale(localeInfo, localeID);
      localeInfo[localeID].DATETIME_FORMATS =
          converter.convertDatetimeData(goog.i18n[propName]);
    }
  }
}

function pluralExtractor(content) {
  for (var i = 0; i < localeIds.length; i++) {
    //We don't need to care about country ID because the plural rules in more specific id are
    //always the same as those in its language ID.
    // e.g. plural rules for en_SG is the same as those for en.
    goog.LOCALE = localeIds[i].match(/[^_]+/)[0];
    eval(content);
    console.log(goog.LOCALE + ' ' + goog.i18n.pluralRules.toString());
    if (!goog.i18n.pluralRules.select) {
      console.log('No select for lang [' + goog.LOCALE + ']');
      continue;
    }
    var temp = goog.i18n.pluralRules.select.toString().
        replace(/goog.i18n.pluralRules.Keyword/g, 'PLURAL_CATEGORY').replace(/\n/g, '');

    ///@@ is a crazy place holder to be replaced before writing to file
    localeInfo[localeIds[i]].pluralCat = "@@" + temp + "@@";
  }
}

function correctedLocaleId(localeID) {
// e.g. from zh_CN to zh-CN, from en_US to en-US
  return localeID.replace(/_/g, '-').toLowerCase();
}

function outputLocale(localeID) {
  var fallBackID = localeID.match(/[A-Za-z]+/)[0],
      localeObj = localeInfo[localeID],
      fallBackObj = localeInfo[fallBackID];

  // fallBack to language formats when country format is missing
  // e.g. if NUMBER_FORMATS of en_xyz is not present, use the NUMBER_FORMATS of en instead
  if (!localeObj.NUMBER_FORMATS) {
    localeObj.NUMBER_FORMATS = fallBackObj.NUMBER_FORMATS;
  }

  if (!localeObj.DATETIME_FORMATS) {
    localeObj.DATETIME_FORMATS = fallBackObj.DATETIME_FORMATS;
  }
  localeObj.id = correctedLocaleId(localeID);

  var prefix =
      'angular.module("ngLocale", [], ["$provide", function($provide) {\n' +
          'var PLURAL_CATEGORY = {' +
          'ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"' +
          '};\n' +
          '$provide.value("$locale", ';

  var suffix = ');\n}]);';

  var content = JSON.stringify(localeInfo[localeID]).replace(/\¤/g, '\\u00A4').
      replace(/"@@|@@"/g, '');

  return prefix + content + suffix;
}
