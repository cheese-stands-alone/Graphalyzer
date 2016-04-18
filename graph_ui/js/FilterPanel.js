/**
 * FilterPanel.js
 *
 * Filters a graph based on a property contained within a node or edge,
 * an option or qualifier on the filtering: 
 * (remove nodes without, pattern matching, greater than, less than, equal to),
 * as well as a quantifier or value to attribute to the option/qualifier.
 * 
 * @author Andrew Bowler, Taylor Welter
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Input = ReactBootstrap.Input,
    Button = ReactBootstrap.Button;

var FilterPanel = React.createClass({
  getInitialState: function() {
    return {
      filter: {
        option: 'none',
        property: '',
        value: ''
      }
    };
  },

  updateFields: function() {
    var self = this;
    this.setState({
      filter: {      
        option: self.refs.option.getValue(),
        property: self.refs.property.getValue(),
        value: self.refs.value.getValue()
      }
    }, function() {
      this.props.updateFilter(this.state.filter);
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <Input 
          type='text' 
          placeholder='Filter Property' 
          ref='property' 
          value={this.state.filter.property} 
          onChange={this.updateFields}
        />
        <Input
          type='select'
          onChange={this.updateFields}
          ref='option'>
          <option value='Remove Nodes Without'>Remove Nodes Without</option>
          <option value='Pattern Match'>Pattern Match</option>
          <option value='>'>&gt;</option>
          <option value='<'>&lt;</option>
          <option value='='>=</option>
        </Input>
        <Input 
          type='text' 
          placeholder='Filter Value' 
          ref='value' 
          value={this.state.filter.value} 
          onChange={this.updateFields}
        />
        <Button 
          bsStyle='primary' 
          onClick={this.props.clearFilter}>
          Clear Filter
        </Button>
      </div>
    );
  }
});

module.exports = FilterPanel;
