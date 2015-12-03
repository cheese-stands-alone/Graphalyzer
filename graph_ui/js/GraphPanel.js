var React = require('react');
var Vis = require('vis');

var GraphPanel = React.createClass({
  getInitialState: function() {
    return {
      panelMessage: <div id='graph'><p>Please load a graph.</p></div>
    };
  },

  render: function() {
    return (
      <div>
        {this.state.panelMessage || null}
      </div>
    );
  }
});

module.exports = GraphPanel;
