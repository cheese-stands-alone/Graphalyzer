/**
 * Dashboard.js
 *
 * @author Andrew Bowler, Taylor Welter
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input;
var Settings = require('./Settings.js');
var SearchPanel = require('./SearchPanel.js');
var ExportURL = require('./ExportURL.js');

// TODO: Finalize this design
var Dashboard = React.createClass({
  render: function() {
    return (
      <Panel header='Dashboard' bsStyle='primary'>
        <Settings
          getGraphList={this.props.getGraphList}
          graphList={this.props.graphList}
          requestGraph={this.props.requestGraph}
          filter={this.props.filter}
          clearFilter={this.props.clearFilter}
        />
		<br/>
		<SearchPanel
          searchNode={this.props.searchNode}
        />
        <Button id='URLButton' bsStyle='success'>Export URL</Button>
        <Button id='resetButton' bsStyle='warning' onClick={this.props.reset}>Reset Graph</Button>
      </Panel>
    );
  }
});

module.exports = Dashboard;
