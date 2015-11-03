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
        controller: function($scope) {
          this.search = function() {

            // TODO: add input validation checks - such as empty graphName

            // TODO: move this websocket into app.js, so the web client has exactly one websocket         
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

            conn.onopen = function(event) {
              console.log("onopen called");
              conn.send(JSON.stringify(request));
            };

            // temporary, this will be moved to the GraphDataHandler
            // the GraphSearchHandler only sends requests, it doesn't receive
            conn.onmessage = function(event) {
              console.log(event.data);
            }
          }
        },
        controllerAs: 'graphSearchHandler'
      };
    });
})();