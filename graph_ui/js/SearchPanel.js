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
    ButtonGroup = ReactBootstrap.ButtonGroup,
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem,
    Panel = ReactBootstrap.Panel,
    Input = ReactBootstrap.Input,
    Button = ReactBootstrap.Button,
    Alert = ReactBootstrap.Alert,
    Glyphicon = ReactBootstrap.Glyphicon;

var SearchPanel = React.createClass({
  getInitialState: function() {
    return {
      nodeName: '',
      degrees: '',
      request_type: 'getgraph',
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
      'request': self.state.request_type,
      'status': '',
      'error': '',
      'payload': self.props.graphList[key].Graph,
      'message': ''
    };

    this.props.logger(
      'Requesting graph ' 
      + '\'' + this.props.graphList[key].Graph + '\''
    );
    this.props.sendWebSocketMessage(request);
  },

  componentDidMount: function() {
    this.props.getGraphList();
  },

  updateFields: function() {
    this.setState({
      nodeName: this.refs.nodeName.getValue(),
      degrees: this.refs.degrees.getValue(),
      request_type: this.refs.request_type.getValue()
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
              <Input
                type='select'
                label='Graph Request Type'
                ref='request_type'
                value={this.state.request_type}
                onChange={this.updateFields}
              >
                <option value='getgraph'>Normal</option>
                <option value='getgraphchunk'>Chunked</option>
              </Input>
            </ListGroupItem>
            <ListGroupItem>
              <ButtonGroup>
                <DropdownButton
                  onSelect={function(event, eventKey) {self.getGraph(eventKey);}} 
                  id='bg-nested-dropdown' 
                  title='Select a graph'>
                  {graphs}
                </DropdownButton>
                <Button onClick={this.props.getGraphList}><Glyphicon glyph='refresh'/></Button>
              </ButtonGroup>
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
              <Button bsStyle='success' onClick={this.props.reset}>Reset Graph</Button>
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
