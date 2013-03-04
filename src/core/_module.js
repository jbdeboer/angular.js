'use strict';

goog.require('angular');
goog.require('angular.module');

goog.provide('angular.core.module');

angular.core.module = angular.module('core', []).
    value({
      '$filter': noop,
      '$sniffer': {}
    }).
    factory('$rootElement', ['$window', function(window) {
      return [window.document.body.parentNode];
    }]).
    factory('$directiveInjector', ['$injector', function($injector) {
      return $injector.limit('directive:');
    }], true);


//TODO(misko): clean up
angular.module('ng');
/**
 * @param {*} arg
 */
function jqLite(arg) {
  throw Error('No jqLite provided');
}

/**
 * @param {string} name
 * @param {*=} value
 */
jqLite.prototype.prop = function(name, value) {
  throw Error();
}
