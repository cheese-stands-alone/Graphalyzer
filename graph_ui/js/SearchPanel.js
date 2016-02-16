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
      filterOption: 'none',
      filterProperty: '',
      filterValue: '',
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
      filterOption: this.refs.filterOption.getValue(),
      filterProperty: this.refs.filterProperty.getValue(),
      filterValue: this.refs.filterValue.getValue()
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
                label='Filter Property' 
                ref='filterProperty' 
                value={this.state.filterProperty} 
                onChange={this.updateFields}
              />
              <select ref='filterOption' onChange={this.change} value={this.state.filterOption}>
              	<option value="none">No Value</option>
              	<option value=">">&gt;</option>
              	<option value="<">&lt;</option>
              	<option value="=">=</option>
              </select>
              <Input 
                type='text' 
                label='Filter Value' 
                ref='filterValue' 
                value={this.state.filterValue} 
                onChange={this.updateFields}
              />
              <Button onClick={this.props.filter(this.state.filterProperty, this.state.filterOption, this.state.filterValue)}>Filter</Button>
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
