/**
 * GraphLoader.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Button = ReactBootstrap.Button,
    ButtonGroup = ReactBootstrap.ButtonGroup,
    DropdownButton = ReactBootstrap.DropdownButton,
    Glyphicon = ReactBootstrap.Glyphicon,
    MenuItem = ReactBootstrap.MenuItem;

var GraphLoader = React.createClass({
  render: function() {
    var self = this;
    var graphs = [];

    // TODO: get graph list into this component
    if (this.props.graphList) {
      for (var i = 0; i < this.props.graphList.length; i++) {
        graphs.push(
          <MenuItem eventKey={i} key={i}>{this.props.graphList[i].Graph}</MenuItem>
        );
      }
    } else graphs = <MenuItem key={i} eventKey={1}>No graphs available. Please refresh.</MenuItem>;

    return (
      <div>
        <ButtonGroup>
          <DropdownButton
            onSelect={function(event, eventKey) {self.getGraph(eventKey);}} 
            id='graph-list-dropdown' 
            title='Select a graph'>
            {graphs}
          </DropdownButton>
          <Button onClick={this.props.getGraphList}><Glyphicon glyph='refresh'/></Button>
        </ButtonGroup>
      </div>
    );
  }
});

module.exports = GraphLoader;