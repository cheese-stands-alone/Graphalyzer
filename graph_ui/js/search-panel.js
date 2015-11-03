(function() {
  'use strict';

  angular
    .module('searchDirective', [])
    .directive('searchPanel', function() {
      return {
        restrict: 'E',
        scope: {searchQuery: '='},
        templateUrl: 'search-panel.html',
        controller: function($scope) {
          this.search = function() {          
            var conn = new WebSocket("ws://rwhite226.duckdns.org:1618/ws");

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

            conn.send(JSON.stringify(request));
          }
        },
        controllerAs: 'graphSearchHandler'
      };
    });
})();