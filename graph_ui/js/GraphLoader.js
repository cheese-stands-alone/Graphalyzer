/**
 * GraphLoader.js
 *
 * Presents a list of graphs from the server for the user to select
 * 
 * @author Andrew Bowler, Taylor Welter
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Button = ReactBootstrap.Button,
    Glyphicon = ReactBootstrap.Glyphicon,
    Input = ReactBootstrap.Input;

var GraphLoader = React.createClass({
  componentDidMount: function() {
    this.props.getGraphList();
  },

  /**
   * Select a graph from the list
   */
  selectGraph: function() {
    var idx = this.refs.selectGraph.getValue();
    if (this.props.graphList && idx > -1)
      this.props.selectGraph(this.props.graphList[idx].Graph);
    else
      this.props.selectGraph(null);
  },

  render: function() {
    var self = this;
    var graphs = [];
    graphs.push(
      <option key={-1} value={-1}>Select a graph</option>
    );

    if (this.props.graphList) {
      for (var i = 0; i < this.props.graphList.length; i++) {
        graphs.push(
          <option key={i} value={i}>{this.props.graphList[i].Graph}</option>
        );
      }
    } else graphs = <option key={-1} value={-1}>No graphs available. Please refresh.</option>;

    return (
      <div>
        <Input 
          type='select'
          onChange={this.selectGraph}
          ref='selectGraph'
          >{graphs}
        </Input>
        <Button onClick={this.props.getGraphList}><Glyphicon glyph='refresh'/></Button>
      </div>
    );
  },
});

module.exports = GraphLoader;
