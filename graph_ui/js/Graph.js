/**
 * Graph.js
 *
 * @author Andrew Bowler, Alberto Gomez-Estrada
 */

'use strict';

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

  shouldComponentUpdate: function(nextProps, nextState) {
    return (
      this.props.totalChunks != nextProps.currentChunk 
      || this.props.graphData != nextProps.graphData
    );
  },

  componentDidUpdate: function() {
    this.state.network.setData({
      nodes: this.props.graphData.nodes, 
      edges: this.props.graphData.edges
    });

    this.state.network.on('selectNode', function(event) {
      var nodeID = event.nodes[0];
      var node = this.state.network.body.data.nodes.get(nodeID);
      this.props.updateSelectedNode(node);
    }.bind(this));
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
