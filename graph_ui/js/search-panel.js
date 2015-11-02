(function() {
  'use strict';

  angular
    .module('searchDirective', [])
    .directive('searchPanel', function() {
      return {
        restrict: 'E',
        templateUrl: 'search-panel.html',
        controller: function() {
          this.search = function() {
            console.log('Search!!!');
          }
        },
        controllerAs: 'graphSearchHandler'
      };
    });
})();