var React = require('react');
var ReactDOM = require('react-dom');
var Vis = require('vis');

var Graph = React.createClass({
  componentDidMount: function() {
    var element = ReactDOM.findDOMNode(this);
    this.setState({
      network: new Vis.Network(element, this.props.graphData, this.props.options)
    });
  },

  componentDidUpdate: function() {
    console.log('Setting data.');
    this.state.network.setData({
      nodes: this.props.graphData.nodes, 
      edges: this.props.graphData.edges
    });
    console.log('New data set');
  },

  getDefaultProps: function() {
    return {
      options: {
        edges: {
          arrows: {
            to: {
              scaleFactor: 0.5
            }
          }
        },
        height: '100%',
        interaction: {
          dragNodes: false
        },
        width: '100%'
      }
    };
  },

  getInitialState: function() {
    return {
      network: {}
    };
  },

  render: function() {
    return (<div></div>);
  }
});

module.exports = Graph;
