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
      nodeName: '',
      degrees: '',
      searchErr: false,
      searchErrMessage: ''
    };
  },

  getGraph: function(key) {
    var self = this;
    var request = {  
      'message_id': '',
      'sender_id': '',
      'time': '',
      'request': 'getgraph',
      'status': '',
      'error': '',
      'payload': self.props.graphList[key].Graph,
      'message': ''
    };

    self.props.sendWebSocketMessage(request);
  },

  componentDidMount: function() {
    this.props.getGraphList();
  },

  updateFields: function() {
    this.setState({
      nodeName: this.refs.nodeName.getValue(),
      degrees: this.refs.degrees.getValue()
    });
  },

  render: function() {
    var errPanel;
    var graphDropdown;
    var graphs = [];
    if (this.state.searchErr) errPanel = <SearchErrorPanel message={this.state.searchErrMessage} />;

    if (this.props.graphList) {
      for (var i = 0; i < this.props.graphList.length; i++) {
        graphs.push(
          <MenuItem eventKey={i} key={i}>{this.props.graphList[i].Graph}</MenuItem>
        );
      }
    } else graphs = <MenuItem key={i} eventKey={1}>No graphs available. Please refresh.</MenuItem>;

    var self = this;
    return (
      <div>
        <Panel header='Search' bsStyle='primary'>
          <ListGroup fill>
            <ListGroupItem>
              <DropdownButton onSelect={function(event, eventKey) {self.getGraph(eventKey)}} id={'dropdown-basic'} title="Select a graph">
                {graphs}
              </DropdownButton>
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
