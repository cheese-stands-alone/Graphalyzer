'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var GraphPanel = require('./GraphPanel.js');
var SearchPanel = require('./SearchPanel.js');
var NodeInfoPanel = require('./NodeInfoPanel.js');

var Graphalyzer = React.createClass({
  render: function() {
    return (
      <div>
        <GraphPanel />
        <SearchPanel />
        <NodeInfoPanel />
      </div>
    );
  }
});

ReactDOM.render(
  <Graphalyzer />,
  document.getElementById('main')
);
