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
      return this.props.filter.property && this.props.filter.option;
    } else return false;
  },

  filterOut: function(nodeID) {
    this.props.graphData.nodes.update({
      id: nodeID, 
      color: 'rgba(150, 150, 150, 0.50)'
    });
  },

  highlight: function(nodeID) {
    this.props.graphData.nodes.update({
      id: nodeID, 
      color: 'red'
    });
  },

  /**
   * Tests the node's property-value for matching with regular expressions
   */
  testPropertyValueForMatch: function(nodeID) {
    var property = this.props.filter.property;
    var propertyToFilter = this.props.graphData.nodes.get(nodeID)[property];
    return propertyToFilter && new RegExp(this.props.filter.value).test(propertyToFilter);
  },

  /**
   * Test the node's property keys for matching with regular expressions
   */
  testPropertiesForMatch: function(nodeID) {
    var regex = new RegExp(this.props.filter.property);
    for (var prop in this.props.graphData.nodes.get(nodeID)) {
      if (regex.test(prop))
        return true;
    }
    return false;
  },

  /**
   * If there are any filter options passed in, perform filtering. Otherwise do nothing.
   */
  doFilter: function() {
    var property = this.props.filter.property;
    var nodeIDs = this.props.graphData.nodes.get({returnType: 'Object'});
    var propertyToFilter;
    switch (this.props.filter.option) {
      case 'Remove Nodes Without':
        for (var nodeID in nodeIDs) {
          if (this.props.graphData.nodes.get(nodeID)[property])
            this.highlight(nodeID);
          else 
            this.filterOut(nodeID);
        }
        break;
      case 'Pattern Match':
        for (var nodeID in nodeIDs) {
          if (this.props.filter.value) {
            if (this.testPropertyValueForMatch(nodeID))
              this.highlight(nodeID);
            else 
              this.filterOut(nodeID);             
          } else {
            if (this.testPropertiesForMatch(nodeID))
              this.highlight(nodeID);
            else
              this.filterOut(nodeID);
          }
        }
        break;
      case '>':
        for (var nodeID in nodeIDs) {
          propertyToFilter = this.props.graphData.nodes.get(nodeID)[property];
          if (parseInt(propertyToFilter) > this.props.filter.value) 
            this.highlight(nodeID);
          else
            this.filterOut(nodeID);
        }
        break;
      case '=':
        for (var nodeID in nodeIDs) {
          propertyToFilter = this.props.graphData.nodes.get(nodeID)[property];
          if (parseInt(propertyToFilter) == this.props.filter.value)
            this.highlight(nodeID);
          else
            this.filterOut(nodeID);
        }
        break;
      case '<':
        for (var nodeID in nodeIDs) {
          propertyToFilter = this.props.graphData.nodes.get(nodeID)[property];
          if (parseInt(propertyToFilter) < this.props.filter.value)
            this.highlight(nodeID);
          else
            this.filterOut(nodeID);
        }
        break;
      default:
        break;
    }
  },

  focusOnNode: function() {
    if (this.props.nodeInFocus) {
      var options = {
        animation: true,
        scale: 3.0
      };
      this.state.network.focus(this.props.nodeInFocus.id, options);
      var arr = [this.props.nodeInFocus.id];
      this.state.network.selectNodes(arr);
      this.props.updateSelectedNode(this.props.nodeInFocus);
    }
  },

  isGraphEmpty: function() {
    return this.props.graphData.nodes.length == 0 && this.props.graphData.edges.length == 0;
  },

  shouldComponentUpdate: function(nextProps, nextState) {
      return (this.props.graphData != nextProps.graphData) ||
      (this.props.filter != nextProps.filter) || 
      (this.props.totalChunks != nextProps.currentChunk) ||
      (this.props.nodeInFocus != nextProps.nodeInFocus);
  },

  componentDidUpdate: function() {
    if (this.props.graphData != this.state.oldData) {
      this.setState({
        oldData: this.props.graphData
      });
      this.state.network.setData({
        nodes: this.props.graphData.nodes,
        edges: this.props.graphData.edges
      });
    }
    this.state.network.releaseNode();

    if (this.hasFilterOptions() && !this.isGraphEmpty() && !this.state.filterActive)
      this.doFilter();
    this.focusOnNode();

    this.state.network.on('selectNode', function(event) {
      var nodeID = event.nodes[0];
      var node = this.state.network.body.data.nodes.get(nodeID);
      this.props.updateSelectedNode(node);
    }.bind(this));

    this.state.network.on('deselectNode', function(event) {
      this.props.updateSelectedNode({});
      this.props.updateNodeInFocus({});
      this.state.network.releaseNode();
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
          color: '#97C2FC',
          borderWidth: 0,
          borderWidthSelected: 1,
          shape: 'dot',
          size: 10
        },
        edges: {
          arrows: {
            to: {
              scaleFactor: 0.5
            }
          },
          color: '#848484',
          smooth: false
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
      network: {},
      oldData: {}
    };
  },

  render: function() {
    return (<div></div>);
  }
});

module.exports = Graph;
