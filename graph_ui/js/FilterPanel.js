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
      filterOption: 'none',
      filterProperty: '',
      filterValue: ''
    };
  },

  updateFields: function() {
    var self = this;
    this.setState({
      filterOption: self.refs.filterOption.getValue(),
      filterProperty: self.refs.filterProperty.getValue(),
      filterValue: self.refs.filterValue.getValue()
    });
  },

  checkFilter: function() {
    this.props.checkFilter(this.state.filterOption, 
                           this.state.filterProperty, 
                           this.state.filterValue);
  },

  render: function() {
    return (
      <div>
        <Input 
          type='text' 
          placeholder='Filter Property' 
          ref='filterProperty' 
          value={this.state.filterProperty} 
          onChange={this.updateFields}
        />
        <Input
          type='select'
          onChange={this.updateFields}
          ref='filterOption'>
          <option value='Remove Nodes Without'>Remove Nodes Without</option>
          <option value='Pattern Match'>Pattern Match</option>
          <option value='>'>&gt;</option>
          <option value='<'>&lt;</option>
          <option value='='>=</option>
        </Input>
        <Input 
          type='text' 
          placeholder='Filter Value' 
          ref='filterValue' 
          value={this.state.filterValue} 
          onChange={this.updateFields}
        />
        <Button 
          bsStyle='success' 
          onClick={this.props.clearFiltering
          }>Clear Filter
        </Button>
      </div>
    );
  }
});

module.exports = FilterPanel;
