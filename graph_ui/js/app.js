'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var GraphalyzerPanel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var GraphPanel = require('./GraphPanel.js');
var SearchPanel = require('./SearchPanel.js');
var NodeInfoPanel = require('./NodeInfoPanel.js');

var Graphalyzer = React.createClass({

  getDefaultProps: function() {
    return {
      websocket: new WebSocket('ws://rwhite226.duckdns.org:1618/ws')
    };
  },

  getInitialState: function() {
    return {
      graphData: {},
      selectedNode: {},
      panelMessage: 'Please load a graph'
    };
  },

  handleWSMessage: function(event) {
    var response = event.data;
    if (response != null) {
      var responseJSON = JSON.parse(response);
      console.log(responseJSON);
      if (responseJSON.error) {
        this.setState({
          panelMessage: 'Graph could not be loaded. Error message: ' + responseJSON.error
        });
      } else {
        var data = responseJSON.payload;
        if (data.nodes) {      
          this.setState({
            panelMessage: '',
            graphData: data
          });
        } else {
          this.setState({
            panelMessage: 'Please load a graph'
          });
        }
      }
    }
  },

  updateSelectedNode: function(node) {
    this.setState({selectedNode: node});
  },

  componentDidMount: function() {
    this.props.websocket.onmessage = this.handleWSMessage;
  },

  render: function() {
    return (
      <Grid>
        <Col lg={12}>
          <GraphalyzerPanel header='Graphalyzer' bsStyle='primary'>
            <Col lg={9}>
              <div id='graph'>
                <GraphPanel id='graph' panelMessage={this.state.panelMessage} graphData={this.state.graphData}/>
              </div>
            </Col>
            <Col lg={3}>
              <Row>
                <SearchPanel websocket={this.props.websocket} />
              </Row>
              <Row>
                <NodeInfoPanel />
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
