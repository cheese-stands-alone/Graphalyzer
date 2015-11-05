/**
 * Functionality for the node info side display panel
 *
 * @author Taylor Welter - tdwelter
 */
(function() {
  'use strict';
  angular
    .module('nodeProperties', ['ngVis'])
    .directive('nodePanel', nodePanel)
    .controller('NodeInfoController', NodeInfoController);

    function nodePanel() {
      return {
        restrict: 'E',
        scope: {
          selectedNode: '='
        },
        templateUrl: 'node-panel.html',
        controller: NodeInfoController,
        controllerAs: 'NodePanelController'
      };
    }

    NodeInfoController.$inject['$scope', 'VisDataSet'];

    function NodeInfoController($scope)
    {
      var nodeInfo = [];
      // However this vis selectNode function is invoked
      node = network.on('selectNode', onSelectNode);
      network.on('deselectNode', onDeselectNode);
      for(var key in node)
      {
        if(node.hasOwnProperty(key))
        {
          nodeInfo.push(key);
          nodeInfo.push(node[key]);
        }
        // This structures the array as {property1, entry1, property2, entry2 ... propertyN, entryN}
      }
    }

    function onSelectNode(nodeInfo)
    {
      // Sanity check, REMOVE
      alert("Did you select a node?");
      // Push the HTML to list the information, RE: nodeInfo array
    }

    function onDeselectNode()
    {
      // Sanity check, REMOVE
      alert("Did you deselect a node?");
      // Remove the HTML to list the information, get ready for them to click another node
      // Possibly resize the window pane
    }
})();