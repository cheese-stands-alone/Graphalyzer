/**
 * SearchPanel.js
 *
 * @author Andrew Bowler, Taylor Welter
 *
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Well = ReactBootstrap.Well,
    Input = ReactBootstrap.Input,
	Glyphicon = ReactBootstrap.Glyphicon,
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
        <Well bsSize="small">
          <Input 
		    label="Search:"
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
			  <Button 
	            bsStyle='info'
				bsSize="xsmall"
	            onClick={this.props.searchNode.bind(null, this.state.searchOptions)}> 
			    <Glyphicon glyph="search" />
              </Button>
			}
          />
        </Well>
      </div>
    );
  }
});

module.exports = SearchPanel;
