/**
 * Functionality for the node info side display panel
 *
 * @author Taylor Welter - tdwelter
 */
(function() {
  'use strict';
  angular
    .module('nodeProperties', [])
    .directive('nodePanel', function() {
      return {
        restrict: 'E',
        scope: {
          selectedNode: '='
        },
        templateUrl: 'node-panel.html',
        controller: function($scope, selectedNodeService) {
          

        },
        controllerAs: 'NodePanelController'
      };
    });
})();