/**
 * SearchPanel.js
 *
 * Input panel for users to search the graph for nodes based on 
 * property key/value pairs, or node ID by default
 * 
 * @author Andrew Bowler, Taylor Welter
 *
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Well = ReactBootstrap.Well,
    Input = ReactBootstrap.Input,
    Glyphicon = ReactBootstrap.Glyphicon;

var SearchPanel = React.createClass({
  getInitialState: function() {
    return {
      searchOptions: {
        key: '',
        value: ''
      }
    };
  },

  /**
   * Update state from input value change
   */
  search: function() {
    this.props.searchNode(this.state.searchOptions, function() {
      this.setState(this.getInitialState());      
    }.bind(this));
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
        <Well bsSize='small'>
          <Input 
            label='Search:'
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
            addonAfter={
              <Glyphicon 
                bsStyle='primary'
                glyph='search'
                onClick={this.props.searchNode.bind(null, this.state.searchOptions)}
              />
            }
          />
        </Well>
      </div>
    );
  }
});

module.exports = SearchPanel;
