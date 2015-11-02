(function() {
  'use strict';

  angular
    .module('searchDirective', [])
    .directive('searchPanel', function() {
      return {
        restrict: 'E',
        templateUrl: 'search-panel.html'
      };
    });
})();