/**
 * app.js
 * 
 * @author Andrew Bowler, Alberto Gomez-Estrada, Taylor Welter
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Vis = require('vis');
var ReactBootstrap = require('react-bootstrap'),
    GraphalyzerPanel = ReactBootstrap.Panel,
    Grid = ReactBootstrap.Grid,
    Col = ReactBootstrap.Col,
    Row = ReactBootstrap.Row,
    Alert = ReactBootstrap.Alert;
var GraphPanel = require('./GraphPanel.js');
var SearchPanel = require('./SearchPanel.js');
var NodePropertiesPanel = require('./NodePropertiesPanel.js');

var Graphalyzer = React.createClass({

  getDefaultProps: function() {
    return {
      websocket: new WebSocket('ws://rwhite226.duckdns.org:1618/ws')
    };
  },

  getInitialState: function() {
    return {
      id: '',
      graphList: [],
      graphData: {},
      selectedNode: {},
      wsError: null
    };
  },

  initGraph: function(data) {
    var dataSet = {
      nodes: new Vis.DataSet(data.nodes),
      edges: new Vis.DataSet(data.edges)
    };
    this.setState({graphData: dataSet});
  },

  waitForWS: function(ws, callback) {
    var self = this;
    setTimeout(
      function () {
        if (ws.readyState === 1) {
          if(callback != null) callback();
          return;
        } else self.waitForWS(ws, callback);
      }, 5); // wait 5 milisecond for the connection...
  },

  sendWebSocketMessage: function(request) {
    var self = this;
    this.waitForWS(self.props.websocket, function() {
      self.props.websocket.send(JSON.stringify(request));
    });
  },

  getGraphList: function(data) {
    var request = {  
      'message_id': '',
      'sender_id': '',
      'time': '',
      'request': 'listgraphs',
      'status': '',
      'error': '',
      'payload': '',
      'message': ''
    };

    this.sendWebSocketMessage(request);
  },

  handleWSMessage: function(event) {
    var response = event.data;
    if (response !== null) {
      var responseJSON = JSON.parse(response);
      console.log(responseJSON);
      var action = responseJSON.message.client_request_type;
      if (action == 'error') return;
      else if (action == 'getgraph') {
        this.initGraph(responseJSON.payload);
      } else if (action == 'listgraphs') {
        this.setState({graphList: responseJSON.payload});
      } else if (action == 'newid') {
        this.setState({id: responseJSON.payload});
      } else return;
    }
  },

  updateSelectedNode: function(node) {
    this.setState({selectedNode: node});
  },

  componentDidMount: function() {
    var self = this;
    this.props.websocket.onmessage = this.handleWSMessage;
    this.props.websocket.onerror = function(event) {
      self.setState({wsError: <Alert bsStyle='danger'>There was a problem with the server. Check the console.</Alert>});
    };
  },

  render: function() {
    return (
      <Grid>
        <Col lg={12}>
          {this.state.wsError}
          <GraphalyzerPanel header='Graphalyzer' bsStyle='primary'>
            <Col lg={9}>
              <GraphPanel graphData={this.state.graphData} updateSelectedNode={this.updateSelectedNode} />
            </Col>
            <Col lg={3}>
              <Row>
                <SearchPanel websocket={this.props.websocket} graphList={this.state.graphList} getGraphList={this.getGraphList}/>
              </Row>
              <Row>
                <NodePropertiesPanel selectedNode={this.state.selectedNode} />
              </Row>
            </Col>
          </GraphalyzerPanel>
        </Col>
      </Grid>
    );
  }
});

ReactDOM.render(
  <Graphalyzer />,
  document.getElementById('main')
);
