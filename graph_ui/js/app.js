/**
 * Main entry point for web client JS
 */

(function() {
  var app = angular.module('graphalyzer', ['ngVis']);

  app.controller('GraphController', ['$scope', 'VisDataSet',
    function($scope, VisDataSet) {

      $scope.onSelect = function(items) {
        // debugger;
        alert('select');
      };

      $scope.onClick = function(props) {
        //debugger;
        alert('Click');
      };

      $scope.onDoubleClick = function(props) {
        // debugger;
        alert('DoubleClick');
      };

      $scope.rightClick = function(props) {
        alert('Right click!');
        props.event.preventDefault();
      };
      
      $scope.options = {
        autoResize: true,
        height: '800',
        width: '100%'
      };
      
      $scope.data = {
        "nodes": 
        [
          {id: 1, label: 'Node 1'},
          {id: 2, label: 'Node 2'},
          {id: 3, label: 'Node 3'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'}
        ],
        "edges":
        [
          {from: 1, to: 3},
          {from: 1, to: 2},
          {from: 2, to: 4},
          {from: 2, to: 5}
        ]
      }
    }
  ]);
})();
