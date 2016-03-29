/**
 * SubgraphInput.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Input = ReactBootstrap.Input;

var SubgraphInput = React.createClass({
  getInitialState: function() {
    return {
      disabled: true,
      subgraph: {
        id: '',
        degrees: ''
      }
    };
  },

  render: function() {
    return (
      <div>
        <Input type='checkbox' label='Get Subgraph' onChange={this.toggleDisable}/>
        <Input 
          type='text' 
          placeholder='Source Node ID' 
          ref='subgraphID' 
          value={this.state.subgraph.id} 
          onChange={this.updateFields}
          disabled={this.state.disabled}
        />
        <Input 
          type='text'
          placeholder='Degrees of Connectivity'
          ref='subgraphDegrees'
          value={this.state.subgraph.degrees}
          onChange={this.updateFields}
          disabled={this.state.disabled}
        />
      </div>
    );
  },

  toggleDisable: function() {
    var disabled = this.state.disabled;
    this.setState({disabled: !disabled});
  },

  updateFields: function() {
    var self = this;
    var newState = React.addons.update(this.state, {
      subgraph: {
        id: {$set: self.refs.subgraphID.getValue()},
        degrees: {$set: self.refs.subgraphDegrees.getValue()}
      }
    });
    this.setState(newState);
  },
});

module.exports = SubgraphInput;
