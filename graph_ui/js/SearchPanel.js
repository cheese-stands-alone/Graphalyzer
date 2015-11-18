'use strict';

var React = require('react');
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Input = require('react-bootstrap').Input;
var SubmitButton = require('react-bootstrap').Button;

var SearchPanel = React.createClass({
  getInitialState: function() {
    return {
      graphName: '',
      nodeName: '',
      degrees: '',
    };
  },

  updateFields: function() {
    this.setState({
      graphName: this.refs.graphName.getValue(),
      nodeName: this.refs.nodeName.getValue(),
      degrees: this.refs.degrees.getValue()
    });
  },

  // TODO add logic for node and degrees when the respective backend logic is implemented
  search: function() {
    var self = this;
    var request = {  
      'message_id': '',
      'sender_id': '',
      'time': '',
      'request': 'getgraph',
      'status': '',
      'error': '',
      'payload': self.state.graphName,
      'message': ''
    };

    this.props.websocket.send(JSON.stringify(request));
  },

  render: function() {
    return (
      <ListGroup>
        <ListGroupItem>
          <Input 
            type='text' 
            label='Graph Name' 
            ref='graphName' 
            value={this.state.graphName} 
            onChange={this.updateFields}
          />
        </ListGroupItem>
        <ListGroupItem>
          <Input 
            type='text' 
            label='Node Name' 
            ref='nodeName' 
            value={this.state.nodeName} 
            onChange={this.updateFields}
          />
        </ListGroupItem>
        <ListGroupItem>
          <Input 
            type='text' 
            label='Degrees' 
            ref='degrees' 
            value={this.state.degrees} 
            onChange={this.updateFields}
          />
        </ListGroupItem>
        <ListGroupItem>
          <SubmitButton bsStyle='primary' onClick={this.search}>Search</SubmitButton>
        </ListGroupItem>
      </ListGroup>
    );
  }
});

module.exports = SearchPanel;
