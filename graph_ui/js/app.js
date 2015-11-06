/**
 * Main entry point for web client JS
 * 
 * @author Andrew Bowler
 */
(function() {
  'use strict';
  angular
    .module('graphalyzer', ['ngVis', 'searchDirective', 'nodeProperties', 'dataHandler'])
    .service('graphDataHandler', function() {
})
    .service('selectedNodeService', function() {
      var selectedNode = {};

      return {
        getSelectedNode: function() {
          return selectedNode;
        },

        setSelectedNode: function(newNode) {
          selectedNode = newNode;
        }
      };
    })
    .controller('GraphController', ['$scope', 'VisDataSet', 'selectedNodeService', function($scope, VisDataSet, selectedNodeService) {
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

      $scope.events = {
        onload: function(network) {
          network.on('selectNode', function(node) {
            selectedNodeService.setSelectedNode(node);
          });

          network.on('deselectNode', function(node) {
            selectedNodeService.setSelectedNode({});
          });
        }
      };
    }])
    .run(function($rootScope) {
      // WebSocket service

      $rootScope.ws = new WebSocket("ws://rwhite226.duckdns.org:1618/ws");

      $rootScope.ws.onmessage = function(event) {
        console.log(event.data);
      }
    });
})();
