/*
 * Main entry point for web client JS
 * 
 * @author Andrew Bowler, Taylor Welter, Alberto Gomez-Estrada
 */
(function() {
  'use strict';
  angular
    .module('graphalyzer', ['ngVis', 'searchDirective'])
    .service('graphDataHandler', function() {
      var graphData = {};

      return {
        getGraphData: function() {
          return graphData;
        },

        setGraphData: function(data) {
          graphData = data; // this needs to be $scope.data in the graph controller, whenever this changes, $scope.data has to be changed
        },
      };
    })
    .controller('GraphController', ['$rootScope', '$scope', 'VisDataSet', 'graphDataHandler',
      function($rootScope, $scope, VisDataSet, graphDataHandler, network) {

      // App-level properties
      $rootScope.fields = {
        selectedNode: {}
      };

      $scope.options = {
        autoResize: true
      };
      
      // This is initially empty and should be changed whenever the graphDataHandler service's graphData is changed
      $scope.data = null;
  
      function update() {
        $scope.data = $rootScope.data;
        VisDataSet.Draw($scope.data, $scope.options);
      }

      $rootScope.update = update;

      $scope.events = {
        // get the network object
        onload: function(network) {
          network.on('selectNode', function(node) {
            $rootScope.$apply(function() {
              $rootScope.fields.selectedNode = node;
            });
          });

          network.on('deselectNode', function(node) {
            $rootScope.$apply(function() {
              // Empty string if no node was selected
              $rootScope.fields.selectedNode = '';
            });
          });
        }
      };
    }])
    .run(['$rootScope', 'graphDataHandler', function($rootScope, graphDataHandler, GraphController){
      // WebSocket service

      $rootScope.ws = new WebSocket("ws://rwhite226.duckdns.org:1618/ws");
      $rootScope.ws.onmessage = function(event) {
        var data = JSON.parse(event.data);
        var graphData = data.payload;
        graphDataHandler.setGraphData(graphData);
        $rootScope.data = graphData;
        $rootScope.update();
      }
    }]);
})();
