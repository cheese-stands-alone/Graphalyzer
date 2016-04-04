/**
 * SearchPanel.js
 *
 * @author Andrew Bowler, Taylor Welter
 *
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    Input = ReactBootstrap.Input,
    Button = ReactBootstrap.Button;

var SearchPanel = React.createClass({
  getInitialState: function() {
    return {
      searchOptions: {
        key: '',
        value: ''
      }
    };
  },

  updateFields: function() {
    var self = this;
    this.setState({
      searchOptions: {
        key: self.refs.searchKey.getValue(),
        value: self.refs.searchValue.getValue()
      }
    });
  },

  render: function() {
    return (
      <div>
        <Panel header='Search Panel' bsStyle='info'>
          <Input 
            type='text' 
            placeholder='Property (ID if left blank)' 
            ref='searchKey' 
            value={this.state.searchOptions.key} 
            onChange={this.updateFields}
          />
          <Input 
            type='text'
            placeholder='Value'
            ref='searchValue'
            value={this.state.searchOptions.value}
            onChange={this.updateFields}
          />
          <Button 
            bsStyle='info' 
            onClick={this.props.searchNode.bind(null, this.state.searchOptions)}
            >Search
          </Button>
        </Panel>
      </div>
    );
  }
});

module.exports = SearchPanel;
