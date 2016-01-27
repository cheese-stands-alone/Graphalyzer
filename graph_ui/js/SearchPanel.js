/**
 * SearchPanel.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem,
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem,
    Panel = ReactBootstrap.Panel,
    Input = ReactBootstrap.Input,
    SubmitButton = ReactBootstrap.Button,
    Alert = ReactBootstrap.Alert;

var SearchPanel = React.createClass({
  getInitialState: function() {
    return {
      graphName: '',
      nodeName: '',
      degrees: '',
      searchErr: false,
      searchErrMessage: ''
    };
  },

  updateFields: function() {
    this.setState({
      graphName: this.refs.graphName.getValue(),
      nodeName: this.refs.nodeName.getValue(),
      degrees: this.refs.degrees.getValue()
    });
  },

  validateInput: function() {
    if (!this.state.graphName) {
      this.setState({
        searchErr: true,
        searchErrMessage: 'You must input a graph name.'
      });
      return false;
    } else {
      this.setState({
        searchErr: false,
        searchErrMessage: ''
      });
      return true;
    }
  },

  // TODO add logic for node and degrees when the respective backend logic is implemented
  search: function() {
    if (!this.validateInput()) return;
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
    var errPanel;
    if (this.state.searchErr) errPanel = <SearchErrorPanel message={this.state.searchErrMessage} />;

    return (
      <div>
        <Panel header='Search' bsStyle='primary'>
          <ListGroup fill>
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
          {errPanel}
        </Panel>
      </div>
    );
  }
});

var SearchErrorPanel = React.createClass({
  render: function() {
    return <Alert bsStyle='danger'>{this.props.message}</Alert>
  }
});

module.exports = SearchPanel;
