'use strict';

goog.require('angular.core.module');
goog.require('angular.core.$log');

goog.provide('angular.core.$exceptionHandler');
goog.provide('angular.core.$ExceptionHandlerProvider');


/**
 * @ngdoc function
 * @name ng.$exceptionHandler
 * @requires $log
 *
 * @description
 * Any uncaught exception in angular expressions is delegated to this service.
 * The default implementation simply delegates to `$log.error` which logs it into
 * the browser console.
 *
 * In unit tests, if `angular-mocks.js` is loaded, this service is overridden by
 * {@link ngMock.$exceptionHandler mock $exceptionHandler}
 *
 * @constructor
 */
angular.core.$ExceptionHandlerProvider = function() {
  /**
   * @type {Array}
   */
  this.$get = ['$log', function($log){
    /**
     * @param {Error} exception Exception associated with the error.
     * @param {string=} cause optional information about the context in which
     *       the error was thrown.
     */
    return function(exception, cause) {
      $log.error.apply($log, arguments);
    };
  }];
};

angular.core.module.provider('$exceptionHandler',
    angular.core.$ExceptionHandlerProvider);

