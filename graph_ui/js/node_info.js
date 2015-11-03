/**
 * Functionality for the node info side display panel
 *
 * @author Taylor Welter - tdwelter
 */
(function()
    'use strict';
    angular
        .module('nodeproperties', ['ngVis'])
        .controller('NodeInfoController', NodeInfoController);

        function NodeInfoController() 
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
            }
        }

        function onSelectNode(nodeInfo)
        {
            // Push the HTML to list the information, RE: nodeInfo array
        }

        function onDeselectNode()
        {
            // Remove the HTML to list the information, get ready for them to click another node
            // Possibly resize the window pane
        }
})();

/***********************************TemporaryPsuedocode************************************
 * Function: displayNodeInformation
 * 
 *     // probably using select node
 *     while a node is selected:
 *         display the information from the nodes on info panel
 * 
 *         for each attribute of the node:	
 *             // Display everything for now, cull information later
 *             display the associated information
 * 
 *             // Q: Where do I receive this information?
 *             // A: Seems like the return of the selectNode
 *      otherwise: // on deselectNode
 *          the panel should probably not be visible 
 *          // or display helpful generic information or something
 ******************************************************************************************