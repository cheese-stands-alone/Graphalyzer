'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var GraphalyzerPanel = require('react-bootstrap').Panel;
var GraphPanel = require('./GraphPanel.js');
var SearchPanel = require('./SearchPanel.js');
var NodeInfoPanel = require('./NodeInfoPanel.js');


var Graphalyzer = React.createClass({
  getDefaultProps: function() {
    return {
      websocket: new WebSocket("ws://rwhite226.duckdns.org:1618/ws")
    };
  },

  getInitialState: function() {
    return {
      graphData: {},
      selectedNode: {}
    };
  },

  handleWSMessage: function(event) {
    var response = event.data;
    if (response !== null) {
      this.setState({graphData: response});
    }
  },

  componentDidMount: function() {
    this.props.websocket.onmessage = this.handleWSMessage;
  },

  render: function() {
    return (
      <GraphalyzerPanel header='Graphalyzer' bsStyle='primary'>
        <GraphPanel 
          graphData={this.state.graphData}
        />
        <SearchPanel 
          websocket={this.props.websocket}
        />
        <NodeInfoPanel />
      </ GraphalyzerPanel>
    );
  }
});

ReactDOM.render(
  <Graphalyzer />,
  document.getElementById('main')
);
