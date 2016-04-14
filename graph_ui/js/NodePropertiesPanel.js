/**
 * NodePropertiesPanel.js
 *
 * Lists all of the properties of a selected node
 *
 * @author Andrew Bowler, Taylor Welter
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem;

var NodePropertiesPanel = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.selectedNode != nextProps.selectedNode;
  },

  render: function() {
    var component = [];
    for (var nodeProp in this.props.selectedNode) {
      if (nodeProp != 'color') {
        component.push(
          <ListGroupItem header={nodeProp}>
            {this.props.selectedNode[nodeProp]}
          </ListGroupItem>
        );
      }
    }

    var properties;

    if (component.length)
      properties = component;
    else
      properties = (
        <ListGroupItem>
          <p>Select a node.</p>
        </ListGroupItem>
      );

    var nodePanel = 
    <Panel header='Node Properties' bsStyle='primary'>
      <ListGroup fill>
        {properties}
      </ListGroup>
    </Panel>;

    return (
      <div>
        {nodePanel}
      </div>
    );
  }
});

module.exports = NodePropertiesPanel;
