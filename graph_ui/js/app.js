/**
 * Main entry point for web client JS
 * 
 * @author Andrew Bowler
 */
(function() {
  'use strict';
  angular
    .module('graphalyzer', ['ngVis', 'searchDirective'])
    .controller('GraphController', GraphController)
    .run(function($rootScope) {
      // WebSocket service

      $rootScope.ws = new WebSocket("ws://rwhite226.duckdns.org:1618/ws");

      $rootScope.ws.onmessage = function(event) {
        console.log(event.data);
      }
    });

  GraphController.$inject['$scope', 'VisDataSet'];

  function GraphController($scope, VisDataSet) {
    $scope.options = {
      autoResize: true
    };
    
    $scope.data = {
      "nodes": [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
      ],
      "edges": [
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
      ]
    };
  }
})();
