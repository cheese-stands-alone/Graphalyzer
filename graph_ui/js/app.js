/**
 * app.js
 *
 * Root component of Graphalyzer
 * 
 * @author Andrew Bowler, Alberto Gomez-Estrada, Michael Sgroi, Taylor Welter
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
var Dashboard = require('./Dashboard.js');

var Graphalyzer = React.createClass({
  getDefaultProps: function() {
    return {
      websocket: new WebSocket('ws://52.3.104.50:80/ws/')
    };
  },

  getInitialState: function() {
    return {
      currentGraph: null,
      filter: {},
      filterActive: false,
      id: '',
      graphList: [],
      graphData: {
        nodes: new Vis.DataSet(),
        edges: new Vis.DataSet()
      },
      nodeInFocus: null,
      tmpGraphData: {},
      totalChunks: 0,
      currentChunk: 0,
      selectedNode: {},
      wsError: null,
    };
  },

  componentDidMount: function() {
    var self = this;
    this.props.websocket.onmessage = this.handleWSMessage;
    this.props.websocket.onerror = function(event) {
      self.setState({wsError: <Alert bsStyle='danger'>There was a problem with the server. Check the console.</Alert>});
    };
  },

  /**
   * Stores the provided graph data (contains node and edge arrays) 
   * into the app's current state
   */
  addDataToGraph: function(data) {
    var self = this;
    var newNodeSet, newEdgeSet;
    if (!this.state.tmpGraphData.nodes && !this.state.tmpGraphData.edges) {
      this.setState({
        tmpGraphData: {
          nodes: new Vis.DataSet(),
          edges: new Vis.DataSet()
        }
      });
    }
    if (data.message.currchunk && data.message.totalchunk) {
      if (data.payload.nodes) {
        newNodeSet = data.payload.nodes;
        this.state.tmpGraphData.nodes.add(newNodeSet);
      }
      if (data.payload.edges) {
        newEdgeSet = data.payload.edges;
        this.state.tmpGraphData.edges.add(newEdgeSet);
      }
      this.logger(
        data.message.currchunk + ' chunk(s) out of ' + 
        data.message.totalchunk + 
        ' received.'
      );
      this.setState({
        currentChunk: data.message.currchunk,
        totalChunks: data.message.totalchunk,
      });
      if (this.state.currentChunk == this.state.totalChunks) {
        this.logger('Begin drawing graph');
        this.setState({
          graphData: {
            nodes: self.state.tmpGraphData.nodes,
            edges: self.state.tmpGraphData.edges
          }
        });
      }
    } else {
      this.logger('Begin drawing graph');
      this.setState({
        graphData: {
          nodes: new Vis.DataSet(data.payload.nodes),
          edges: new Vis.DataSet(data.payload.edges)
        }
      });
    }
  },

  /**
   * Clears any filters within the current graph data and removes colors
   */
  clearFilter: function() {
    if (this.state.graphData) {
      var nodeIDs = this.state.graphData.nodes.get({returnType: 'Object'});
      var removeFilterFromNodes = [];
      for (var nodeID in nodeIDs) {
        if (this.state.graphData.nodes.get(nodeID).color != '#97C2FC') {
          removeFilterFromNodes.push({
            id: nodeID,
            color: '#97C2FC'
          });
        }
      }
      this.state.graphData.nodes.update(removeFilterFromNodes);
      this.setState({
        filter: {},
        filterActive: false
      });
    }
  },

  /**
   * Sets the current filter state for other components
   */
  filter: function(property, option, value) {
    this.setState({
      filter: {
        property: property,
        option: option,
        value: value
      },
      filterActive: true
    });
  },

  /**
   * Returns the value of the parameters for the current instance
   * of Graphalyzer. In effect, the parameters required to replicate
   * the current session. Used in ExportURL.js.
   */
  getCurrentState: function() {
    return this.state;
  },

  /**
   * Requests a list of graphs currently stored on the server
   */
  getGraphList: function() {
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
    this.logger('Requesting list of graphs');
    this.sendWebSocketMessage(request);
  },

  /**
   * Handles all WebSocket messages from the server, updating current 
   * graph data, graph lists, or the session ID depending on the response
   */
  handleWSMessage: function(event) {
    this.logger('Message received from server');
    var response = event.data;
    if (response !== null) {
      var responseJSON = JSON.parse(response);
      if (responseJSON.error) {
        this.logger('Server returned error: ' + responseJSON.error);
        return;
      }

      var action = responseJSON.message.client_request_type;
      if (action == 'error') return;
      else if (action == 'getgraphchunk' || action == 'getsubgraph')
        this.addDataToGraph(responseJSON);
      else if (action == 'listgraphs') {
        this.logger('List of graphs received');
        this.setState({
          graphList: responseJSON.payload
        });
      } else if (action == 'newid') {
        this.logger('New ID received from server');
        this.setState({
          id: responseJSON.payload
        });
      } else return;
    }
  },

  /**
   * Prints timestamped debug messages to the browser console
   */
  logger: function(message) {
    var date = new Date();
    console.log('[' + 
      date.getUTCFullYear() + '-' + 
      date.getUTCMonth() + '-' + 
      date.getUTCDate() + ' ' + 
      date.getUTCHours() + ':' + 
      date.getUTCMinutes() + ':' + 
      date.getUTCSeconds() + ':' + 
      date.getUTCMilliseconds() + ']  ' + 
      message
    );
  },

  /**
   * Requests graph data from the server from the given graph object, 
   * which may contain subgraph parameters
   */
  requestGraph: function(graph) {
    var request = {
      'message_id': '',
      'sender_id': '',
      'time': '',
      'status': '',
      'error': '',
      'message': ''
    };

    if (graph.subgraph) {
      request['request'] = 'getsubgraph';
      request['payload'] = {
        'depth': graph.subgraph.depth,
        'graphid': graph.selectedGraph,
        'node': graph.subgraph.nodeID
      };
    } else {
      if (this.state.currentGraph == graph.selectedGraph && this.state.filter == graph.filter) return;
      request['request'] = 'getgraphchunk';
      request['payload'] = graph.selectedGraph;
    }

    this.logger(
      'Requesting graph ' 
      + '\'' + graph.selectedGraph + '\''
    );

    this.setState({
      currentGraph: graph.selectedGraph,
      filter: graph.filter,
      subgraph: graph.subgraph
    });

    this.sendWebSocketMessage(request);
  },

  /**
   * Resets the application to its initial state
   */
  reset: function() {
    this.setState(this.getInitialState());
  },

  /**
   * Searches for a node in the graph data based on a provided 
   * key/value pair
   */
  searchNode: function(params) {
    if (!this.state.graphData)
      return;
    var key = params.key;
    var value = params.value;
    var nodeInFocus;
    if (value) {
      var nodes = this.state.graphData.nodes.get({returnType: 'Object'});
      for (var nodeID in nodes) {
        var node = this.state.graphData.nodes.get(nodeID);
        if (node[key]) {
          if (node[key] == value) {
            this.updateNodeInFocus(node);
            break;
          }
        } else {
          if (node.id == value) {
            this.updateNodeInFocus(node);
            break;
          }
        }
      }
    }
  },

  /**
   * Sends a WebSocket message to the server
   */
  sendWebSocketMessage: function(request) {
    var self = this;
    this.waitForWS(self.props.websocket, function() {
      self.props.websocket.send(JSON.stringify(request));
    });
  },

  /**
   * Updates selected node - for other components
   */
  updateSelectedNode: function(node) {
    this.setState({selectedNode: node});
  },

  /**
   * Updates node in focus on the canvas - for other components
   */
  updateNodeInFocus: function(node) {
    this.setState({
      nodeInFocus: node
    });
  },

  /**
   * Refreshes connection to the WebSocket server
   */
  waitForWS: function(ws, callback) {
    var self = this;
    setTimeout(
      function () {
        if (ws.readyState === 1) {
          if (callback != null) callback();
          return;
        } else self.waitForWS(ws, callback);
      }, 5);
  },

  render: function() {
    return (
      <Grid>
        <Col lg={12}>
          {this.state.wsError}
          <GraphalyzerPanel header='Graphalyzer' bsStyle='primary'>
            <Col lg={9}>
              <GraphPanel 
                filter={this.state.filter}
                filterActive={this.state.filterActive}
                graphData={this.state.graphData} 
                currentChunk={this.state.currentChunk} 
                totalChunks={this.state.totalChunks} 
                logger={this.logger} 
                nodeInFocus={this.state.nodeInFocus}
                updateNodeInFocus={this.updateNodeInFocus}
                updateSelectedNode={this.updateSelectedNode} 
              />
            </Col>
            <Col lg={3}>
              <Row>
                <Dashboard
                  getGraphList={this.getGraphList}
                  graphList={this.state.graphList}
                  logger={this.logger}
                  requestGraph={this.requestGraph}
                  filter={this.filter}
                  clearFilter={this.clearFilter}
                  reset={this.reset}
                  getCurrentState={this.getCurrentState}
                  searchNode={this.searchNode}
                />
              </Row>
              <Row>
                <NodePropertiesPanel 
                  logger={this.logger}
                  selectedNode={this.state.selectedNode} 
                />
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
