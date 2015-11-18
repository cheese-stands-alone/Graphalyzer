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
      websocket: new WebSocket("ws://rwhite226.duckdns.org:1618/ws")
    };
  },

  getInitialState: function() {
    return {
      graphData: {},
      selectedNode: {}
    };
  },

  handleWSMessage: function(event) {
    var response = event.data;
    if (response !== null) {
      this.setState({graphData: response});
    }
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
              <GraphPanel graphData={this.state.graphData} />
            </Col>
            <Col lg={3}>
              <Row>
                <SearchPanel websocket={this.props.websocket} />
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
