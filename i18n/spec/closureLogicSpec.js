var logic = require('../src/closureLogic.js');
var converter = require('../src/converter.js');
findLocaleId = logic.findLocaleId;
extractNumberSymbols = logic.extractNumberSymbols;
extractCurrencySymbols = logic.extractCurrencySymbols;
extractDateTimeSymbols = logic.extractDateTimeSymbols;

describe("findLocaleId", function () {
  it("should find the id from numbers", function() {
    expect(findLocaleId("NumberFormatSymbols_en_GB", "num")).toEqual("en_GB");
  });


  it("should find the id from datetime", function() {
    expect(findLocaleId("DateTimeSymbols_en_ISO", "datetime")).toEqual("en_ISO");
  });


  it("should throw an error otherwise", function() {
    expect(function() {
      findLocaleId("str", "otherwise")
    }).toThrow("unknown type in findLocaleId: otherwise");
  });
});

describe("extractNumberSymbols", function () {
  it("should extract number data", function() {
    var CONTENT = [
      "goog.provide('goog.i18n.NumberFormatSymbols_en_GB');",
      "goog.i18n.NumberFormatSymbols_en_GB = {",
      "DECIMAL_SEP: '.',",
      "GROUP_SEP: ',',",
      "PERCENT: '%',",
      "ZERO_DIGIT: '0',",
      "PLUS_SIGN: '+',",
      "MINUS_SIGN: '-',",
      "EXP_SYMBOL: 'E',",
      "PERMILL: '\u2030',",
      "INFINITY: '\u221E',",
      "NAN: 'NaN',",
      "DECIMAL_PATTERN: '#,##0.###',",
      "SCIENTIFIC_PATTERN: '#E0',",
      "PERCENT_PATTERN: '#,##0%',",
      "CURRENCY_PATTERN: '\u00A4#,##0.00',",
      "DEF_CURRENCY_CODE: 'GBP' };"
    ].join('\n');

    var currencySymbols = {'GBP':[2, '£', 'GB£']};

    var expectedNumberFormats = converter.convertNumberData(
        {
          DECIMAL_SEP:'.',
          GROUP_SEP:',',
          DECIMAL_PATTERN:'#,##0.###',
          CURRENCY_PATTERN:'\u00A4#,##0.00',
          DEF_CURRENCY_CODE: 'GBP'
        }, currencySymbols
    );

    var localeInfo = {};
    extractNumberSymbols(CONTENT, localeInfo, currencySymbols);

    expect(localeInfo).toEqual({
      'en_GB': { NUMBER_FORMATS: expectedNumberFormats }
    });
  })
});

describe("extractCurrencySymbols", function () {
  it("should extract currency data", function() {
    var CONTENT = [
      "goog.i18n.currency.CurrencyInfo = {",
      "  'GBP':[2, '£', 'GB£'],",
      "};",
      "goog.i18n.currency.CurrencyInfoTier2 = {",
      "  'AOA':[2, 'Kz', 'Kz'],",
      "};"
    ].join('\n');

    var localeInfo = {};
    expect(extractCurrencySymbols(CONTENT)).toEqual({
      'GBP':[2, '£', 'GB£'],
      'AOA':[2, 'Kz', 'Kz']
    });
  });
});


describe("extractDateTimeSymbols", function () {
  it("should extract date time data", function() {
    var CONTENT = [
"goog.i18n.DateTimeSymbols_fr_CA = {",
"  ERAS: ['av. J.-C.', 'ap. J.-C.'],",
"  ERANAMES: ['avant Jésus-Christ', 'après Jésus-Christ'],",
"  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],",
"  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O',",
"      'N', 'D'],",
"  MONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',",
"      'août', 'septembre', 'octobre', 'novembre', 'décembre'],",
"  STANDALONEMONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',",
"      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],",
"  SHORTMONTHS: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.',",
"      'août', 'sept.', 'oct.', 'nov.', 'déc.'],",
"  STANDALONESHORTMONTHS: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',",
"      'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],",
"  WEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',",
"      'samedi'],",
"  STANDALONEWEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi',",
"      'vendredi', 'samedi'],",
"  SHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],",
"  STANDALONESHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.',",
"      'sam.'],",
"  NARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],",
"  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],",
"  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],",
"  QUARTERS: ['1er trimestre', '2e trimestre', '3e trimestre', '4e trimestre'],",
"  AMPMS: ['AM', 'PM'],",
"  DATEFORMATS: ['EEEE d MMMM y', 'd MMMM y', 'yyyy-MM-dd', 'yy-MM-dd'],",
"  TIMEFORMATS: ['HH \'h\' mm \'min\' ss \'s\' zzzz', 'HH:mm:ss z', 'HH:mm:ss',",
"      'HH:mm'],",
"  FIRSTDAYOFWEEK: 6,",
"  WEEKENDRANGE: [5, 6],",
"  FIRSTWEEKCUTOFFDAY: 2",
"};"
    ].join('\n');

    var localeInfo = {};
    extractDateTimeSymbols(CONTENT, localeInfo);

    expect(localeInfo).toEqual({});
  })
});


