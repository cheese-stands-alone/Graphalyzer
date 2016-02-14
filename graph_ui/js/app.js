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
      graphData: {
        nodes: new Vis.DataSet(),
        edges: new Vis.DataSet()
      },
      totalChunks: 0,
      currentChunk: 0,
      selectedNode: {},
      wsError: null,
    };
  },

  addDataToGraph: function(data) {
    var self = this;
    console.log(data);
    var newNodeSet, newEdgeSet, totalNodes, totalEdges;
    if (data.message.currchunk && data.message.totalchunk) {
      newState.currentChunk = data.message.currchunk;
      newState.totalChunks = data.message.totalchunk;
      if (data.payload.nodes) {
        newNodeSet = data.payload.nodes;
        totalNodes = this.state.graphData.nodes;
        totalNodes.push(newNodeSet);
      }
      if (data.payload.edges) {
        newEdgeSet = data.payload.edges;
        totalEdges = this.state.graphData.edges;
        totalEdges.push(newEdgeSet);
      }
      this.setState({
        graphData: {
          nodes: totalNodes,
          edges: totalEdges
        },
        currentChunk: data.message.currchunk,
        totalChunks: data.message.totalchunk,
      }, function() {
        self.state.graphData.nodes.add(data.payload.nodes);
        self.state.graphData.edges.add(data.payload.edges);
      });
    } else {
      this.setState({
        graphData: {
          nodes: data.payload.nodes,
          edges: data.payload.edges
        }
      });
    }
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
      var action = responseJSON.message.client_request_type;
      if (action == 'error') return;
      else if (action == 'getgraph') {
        this.addDataToGraph(responseJSON);
      } else if (action == 'listgraphs') {
        this.setState({
          graphList: responseJSON.payload
        });
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
              <GraphPanel 
                graphData={this.state.graphData} 
                currentChunk={this.state.currentChunk} 
                totalChunks={this.state.totalChunks} 
                updateSelectedNode={this.updateSelectedNode} 
              />
            </Col>
            <Col lg={3}>
              <Row>
                <SearchPanel 
                  graphList={this.state.graphList} 
                  getGraphList={this.getGraphList} 
                  sendWebSocketMessage={this.sendWebSocketMessage}
                />
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
