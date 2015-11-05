/**
 * Search Panel directive. Executes a search query based on the 
 * input fields by sending a request to the server over WebSocket.
 * 
 * @author Andrew Bowler
 */
(function() {
  'use strict';

  angular
    .module('searchDirective', [])
    .directive('searchPanel', function() {
      return {
        restrict: 'E',
        scope: {searchQuery: '='},
        templateUrl: 'search-panel.html',
        controller: function($scope, $rootScope) {
          $scope.query = {
            graphName: '',
            nodeName: '',
            degrees: ''
          };

          $scope.searchErr = false;

          this.search = function() {
            if ($scope.query.graphName === '') {
              $scope.searchErr = true;
              return;
            } else {
              $scope.searchErr = false;

              var request = {  
                "message_id": "",
                "sender_id": "",
                "time": "",
                "request": "getgraph",
                "status": "",
                "error": "",
                "payload": $scope.query.graphName,
                "message": ""
              };
              
              $rootScope.ws.send(JSON.stringify(request));
            }
          }
        },
        controllerAs: 'graphSearchHandler'
      };
    });
})();
