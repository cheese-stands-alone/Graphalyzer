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

// TODO: All these line breaks are kinda janky, maybe make a button group or something
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
        <Button bsStyle='success'>Export URL</Button>
        <br/>
        <br/>
        <Button bsStyle='warning' onClick={this.props.reset}>Reset Graph</Button>
      </Panel>
    );
  }
});

module.exports = Dashboard;
