var React = require('react');
var Vis = require('vis');

var GraphPanel = React.createClass({
  componentDidUpdate: function() {
    if (Object.keys(this.props.graphData).length === 2) {
      console.log('valid graph');
      this.setState({network: new Vis.Network(this.props.element, this.props.graphData, this.props.options)});
    }
    else {
      console.log('invalid graph');
      this.setState({network: 
        <div>
          <p>Graph failed to load.</p>
        </div>
      });
    }
  },

  getDefaultProps: function() {
    return {
      graphData: {},
      element: document.getElementById('graph'),
      options: {
        height: '100%',
        width: '100%',
        interaction: {
          dragNodes: false
        }
      }
    };
  },

  getInitialState: function() {
    return {
      network: <div><p>Please load a graph.</p></div>
    };
  },

  render: function() {
    return (
      <div>
        {this.state.network}
      </div>
    );
  }
});

module.exports = GraphPanel;
