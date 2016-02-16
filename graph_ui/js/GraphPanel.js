/**
 * GraphPanel.js
 *
 * @author Andrew Bowler, Alberto Gomez-Estrada
 */

'use strict';

var React = require('react');
var Graph = require('./Graph.js');

var GraphPanel = React.createClass({
  render: function() {
    return (
      <div>
        <Graph 
          filter={this.props.filter}
          graphData={this.props.graphData} 
          logger={this.props.logger} 
          updateSelectedNode={this.props.updateSelectedNode}
        />
      </div>
    );
  }
});

module.exports = GraphPanel;
