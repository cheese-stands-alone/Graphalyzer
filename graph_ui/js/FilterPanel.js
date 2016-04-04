/**
 * FilterPanel.js
 *
 * @author Andrew Bowler, Taylor Welter
 */

 //TODO: Deal with the filter logic--merge it into graph drawing or what have you

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
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
    });

    this.props.updateFilter(this.state.filter);
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
          onClick={this.props.clearFiltering
          }>Clear Filter
        </Button>
      </div>
    );
  }
});

module.exports = FilterPanel;
