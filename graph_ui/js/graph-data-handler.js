/**
 *
 * @author Albeto Gomez-Estrada
 */
(function() {
  'use strict';
  angular
    .module('dataHandler', [])
    .directive('handler', function() {
      return {
        restrict: 'E',
        scope: {
          payload: '='
        },
        controller: function($scope, graphDataHandler) {
          
        },
        controllerAs: 'graphDataController'
      };
    });
})();
