#!/usr/bin/env node
'use strict';

var Q  = require('qq'),
    qfs  = require('q-fs'),
    converter = require('./converter.js'),
    util = require('./util.js'),
    logic = requrie('./closureLogic.js'),
    localeInfo = {},
    localeIds = [],
    currencySymbols,
    goog = { provide: function() {},
             require: function() {},
             i18n: {currency: {}, pluralRules: {}} };


var NG_LOCALE_DIR = '../src/ngLocale/';


function readSymbols() {
  console.log('Created directory ' + NG_LOCALE_DIR);
  var promiseA = Q.defer(),
      promiseB = Q.defer();

  qfs.read(__dirname + '/../closure/currencySymbols.js', 'b').then(function(content) {
    logic.extractCurrencySymbols(content);
    qfs.read(__dirname + '/../closure/numberSymbols.js', 'b').then(function(content) {
          logic.extractNumberSymbols(content, localeInfo);
          promiseA.resolve();
        });
    }, function (reason) { promiseA.reject('A: ' + reason); });


    qfs.read(__dirname + '/../closure/datetimeSymbols.js', 'b').then(function(content) {
        console.log('Read 3');

      logic.extractDateTime(content);
      console.log('b resolve');

        promiseB.resolve();
    }, function (reason) { promiseB.reject('B: ' + reason); });

    return Q.join(promiseA.promise, promiseB.promise, noop);
}

function printError(msg) {
    return function(reason) { console.log(msg + (reason ? ' because ' + reason : '')); }
}


createFolder(NG_LOCALE_DIR).then(
    readSymbols,
    printError('Could not create directory')
).then(function() {
  console.log('Stage 2');
  var promise = Q.defer();

  qfs.read(__dirname + '/../closure/pluralRules.js').then(function(content) {
    logic.pluralExtractor(content);
    promise.resolve();
  });

  return promise.promise;
}, printError('Stage 2')).then(function() {
  console.log('Stage 3');
  var writePromises = [];
  localeIds.forEach(function(localeID) {
    var toWrite = logic.outputLocale(localeID);
    var correctedLocaleId = logic.correctedLocaleId(localeID);
    var promise = Q.defer();
    writePromises.push(promise);
    var filename = NG_LOCALE_DIR + 'angular-locale_' + correctedLocaleId + '.js'
    qfs.write(filename, toWrite).then(
        function () {
          promise.resolve();
          console.log('Wrote ' + filename);
        },
        function () {
          console.log('error');
        }
    );
    console.log('started ' + filename);

  });
  console.log('Generated ' + localeIds.length + ' locale files!');
  return writePromises[0];
  return Q.all(writePromises);
}).done();

function noop() {};

/**
* Make a folder under current directory.
* @param folder {string} name of the folder to be made
*/
function createFolder(folder) {
  return qfs.isDirectory(__dirname + '/' + folder).then(function(isDir) {
    if (!isDir) return qfs.makeDirectory(__dirname + '/' + folder);
  });
}
