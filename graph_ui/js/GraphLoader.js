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
    Input = ReactBootstrap.Input,
    MenuItem = ReactBootstrap.MenuItem;

var GraphLoader = React.createClass({
  componentDidMount: function() {
    this.props.getGraphList();
  },

  getInitialState: function() {
    return {
      graphSelected: null
    };
  },

  render: function() {
    var self = this;
    var graphs = [];
    graphs.push(
      <option value={-1}>Select a graph</option>
    );

    // TODO: get graph list into this component
    if (this.props.graphList) {
      for (var i = 0; i < this.props.graphList.length; i++) {
        graphs.push(
          <option value={i}>{this.props.graphList[i].Graph}</option>
        );
      }
    } else graphs = <option value={i}>No graphs available. Please refresh.</option>;

    return (
      <div>
        <ButtonGroup>
          <Input 
            type='select'
            onChange={this.selectGraph}
            ref='selectGraph'
            >{graphs}
          </Input>
          {/*
            <DropdownButton
              onSelect={function(event, eventKey) {self.selectGraph(eventKey);}} 
              id='graph-list-dropdown' 
              title='Select a graph'>
              {graphs}
            </DropdownButton>
        */}
          <Button onClick={this.props.getGraphList}><Glyphicon glyph='refresh'/></Button>
        </ButtonGroup>
      </div>
    );
  },

  selectGraph: function() {
    var idx = this.refs.selectGraph.getValue();
    if (this.props.graphList) {
      var self = this;
      this.setState({
        graphSelected: self.props.graphList[idx].Graph
      });
    }
  }
});

module.exports = GraphLoader;