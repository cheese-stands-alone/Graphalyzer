var React = require('react');
var Graph = require('./Graph.js');

var GraphPanel = React.createClass({
  getInitialState: function() {
    return {
      panelMessage: <div id='graph'><p>Please load a graph.</p></div>
    };
  },

  render: function() {
    return (
      <div>
        <Graph graphData={this.props.graphData}/>
      </div>
    );
  }
});

module.exports = GraphPanel;
