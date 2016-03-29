/**
 * GraphLoader.js
 *
 * @author Andrew Bowler
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

  render: function() {
    var self = this;
    var graphs = [];
    graphs.push(
      <option key={-1} value={-1}>Select a graph</option>
    );

    // TODO: get graph list into this component
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

  selectGraph: function() {
    var idx = this.refs.selectGraph.getValue();
    if (this.props.graphList && idx > -1)
      this.props.selectGraph(this.props.graphList[idx].Graph);
    else
      this.props.selectGraph(null);
  }
});

module.exports = GraphLoader;
