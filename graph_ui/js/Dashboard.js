/**
 * Dashboard.js
 *
 * Main functional panel on the UI. 
 * Interfaces with the Settings Panel, the Search Panel, 
 * as well as the Export URL and Reset buttons.
 *
 * @author Andrew Bowler, Taylor Welter
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    Button = ReactBootstrap.Button;
var Settings = require('./Settings.js');
var SearchPanel = require('./SearchPanel.js');
var ExportURL = require('./ExportURL.js');

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
        <ExportURL
          getCurrentState={this.props.getCurrentState}
        />
        <Button id='resetButton' bsStyle='warning' onClick={this.props.reset}>Reset Graph</Button>
      </Panel>
    );
  }
});

module.exports = Dashboard;
