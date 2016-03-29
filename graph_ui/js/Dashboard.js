/**
 * Dashboard.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel;
var Settings = require('./Settings.js');
var NewSearchPanel = require('./NewSearchPanel.js');
var ExportURL = require('./ExportURL.js');

var Dashboard = React.createClass({
  render: function() {
    return (
      <Panel header='Dashboard' bsStyle='primary'>
        <Settings/>
      </Panel>
    );
  }
});

module.exports = Dashboard;