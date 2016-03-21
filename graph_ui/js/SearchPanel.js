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
    var self = this;
    this.setState({
      filterOption: self.refs.filterOption.getValue(),
      filterProperty: self.refs.filterProperty.getValue(),
      filterValue: self.refs.filterValue.getValue(),
      nodeName: this.refs.nodeName.getValue(),
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
                  id='graph-list-dropdown' 
                  title='Select a graph'>
                  {graphs}
                </DropdownButton>
                <Button onClick={this.props.getGraphList}><Glyphicon glyph='refresh'/></Button>
              </ButtonGroup>
            </ListGroupItem>
            <ListGroupItem>
              <Input 
                type='text' 
                placeholder='Node Name' 
                ref='nodeName' 
                value={this.state.nodeName} 
                onChange={this.updateFields}
              />
            </ListGroupItem>
            <ListGroupItem>
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
              <ButtonGroup>
                <Button 
                  bsStyle='success'
                  onClick={
                    this.props.filter.bind(null, this.state.filterProperty, this.state.filterOption, this.state.filterValue)
                  }>Filter
                </Button>
                <Button 
                  bsStyle='success' 
                  onClick={this.props.clearFiltering
                  }>Clear Filter
                </Button>
              </ButtonGroup>
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
