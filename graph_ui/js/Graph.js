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

  hasFilterOptions: function() {
    if (this.props.filter) {
      return this.props.filter.property && this.props.filter.option && this.props.filter.value;
    } else return false;
  },

  /**
   * If there are any filter options passed in, perform filtering. Otherwise do nothing.
   */
  doFilter: function() {
    if(this.hasFilterOptions() && !this.isGraphEmpty()) {
      var property = this.props.filter.property;
      var nodeObjects = this.props.graphData.nodes;
      var nodeIDs = this.props.graphData.nodes.get({returnType: 'Object'});
      var propertyToFilter;
      switch (this.props.filter.option) {
        case '>':
          for (var nodeID in nodeIDs) {
            propertyToFilter = this.props.graphData.nodes.get(nodeID)[property];
            if (parseInt(propertyToFilter) > this.props.filter.value)
              nodeObjects.update({id: nodeID, color: 'red'});
            else 
              nodeObjects.update({id: nodeID, color: 'gray'});
          }
          break;
        case '=':
          for (var nodeID in nodeIDs) {
            propertyToFilter = this.props.graphData.nodes.get(nodeID)[property];
            if (parseInt(propertyToFilter) == this.props.filter.value)
              nodeObjects.update({id: nodeID, color: 'red'});
            else 
              nodeObjects.update({id: nodeID, color: 'gray'});
          }
          break;
        case '<':
          for (var nodeID in nodeIDs) {
            propertyToFilter = this.props.graphData.nodes.get(nodeID)[property];
            if (parseInt(propertyToFilter) < this.props.filter.value)
              nodeObjects.update({id: nodeID, color: 'red'});
            else 
              nodeObjects.update({id: nodeID, color: 'gray'});
          }
          break;
        default:
          break;
      }
    }
  },

  isGraphEmpty: function() {
    return this.props.graphData.nodes.length == 0 && this.props.graphData.edges.length == 0;
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return (this.props.graphData != nextProps.graphData) || (this.props.filter != nextProps.filter);
  },

  componentDidUpdate: function() {
    this.state.network.setData({
      nodes: this.props.graphData.nodes,
      edges: this.props.graphData.edges
    });

    this.doFilter();

    this.state.network.on('selectNode', function(event) {
      var nodeID = event.nodes[0];
      var node = this.state.network.body.data.nodes.get(nodeID);
      this.props.updateSelectedNode(node);
    }.bind(this));

    this.state.network.on('deselectNode', function(event) {
      this.props.updateSelectedNode({});
    }.bind(this));

    // Called when Vis is finished drawing the graph
    this.state.network.on('afterDrawing', function(event) {
      this.props.logger('Graph finished drawing');
    }.bind(this));
  },

  getDefaultProps: function() {
    return {
      options: {
        nodes: {
          shape: 'dot',
          fixed: true
        },
        edges: {
          arrows: {
            to: {
              scaleFactor: 0.5
            }
          },
          color: '#848484',
          smooth: {
            type: 'continuous'
          }
        },
        physics: false,
        interaction: {
          dragNodes: false,
        }
      }
    }
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
