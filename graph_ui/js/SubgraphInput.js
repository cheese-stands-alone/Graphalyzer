/**
 * SubgraphInput.js
 *
 * Allows users to specify subgraph parameters by source node ID and 
 * depth ranging from 1-5
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var ReactStateUpdate = require('react-addons-update');
var ReactBootstrap = require('react-bootstrap'),
    Input = ReactBootstrap.Input;

var SubgraphInput = React.createClass({
  getInitialState: function() {
    return {
      disabled: true,
      subgraph: {
        nodeID: '',
        depth: ''
      }
    };
  },

  /**
   * Toggles disabled attribute of this component in the HTML
   */
  toggleDisable: function() {
    var disabled = this.state.disabled;
    this.setState({disabled: !disabled});
  },

  /**
   * Update state from input value change
   */
  updateFields: function() {
    var self = this;
    var newState = ReactStateUpdate(this.state, {
      subgraph: {
        nodeID: {$set: self.refs.sourceNodeID.getValue()},
        depth: {$set: self.refs.depth.getValue()}
      }
    });
    this.setState(newState, function() {
      this.props.updateSubgraph(this.state.subgraph)
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <Input type='checkbox' label='Get Subgraph' onChange={this.toggleDisable}/>
        <Input 
          type='text' 
          placeholder='Source Node ID' 
          ref='sourceNodeID' 
          value={this.state.subgraph.nodeID} 
          onChange={this.updateFields}
          disabled={this.state.disabled}
        />
        <Input
          type='select'
          placeholder='Depth (in nodes)'
          ref='depth'
          value={this.state.subgraph.depth}
          onChange={this.updateFields}
          disabled={this.state.disabled}>
          <option key={-1} value={-1} disabled defaultValue>Depth (in nodes)</option>
          <option key={0} value={1}>1</option>
          <option key={1} value={2}>2</option>
          <option key={2} value={3}>3</option>
          <option key={3} value={4}>4</option>
          <option key={4} value={5}>5</option>
        </Input>
      </div>
    );
  },
});

module.exports = SubgraphInput;
