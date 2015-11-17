'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
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

  componentDidMount: function() {
    this.websocket.onmessage = handleWSMessage;
  },

  handleWSMessage: function(event) {
    var response = event.data;
    if (response !== null) {
      this.setState({graphData: response});
    }
  },

  render: function() {
    return (
      <div>
        <GraphPanel 
          graphData={this.state.graphData}
        />
        <SearchPanel 
          websocket={this.props.websocket}
        />
        <NodeInfoPanel />
      </div>
    );
  }
});

ReactDOM.render(
  <Graphalyzer />,
  document.getElementById('main')
);
