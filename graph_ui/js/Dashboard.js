/**
 * Dashboard.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var Settings = require('./Settings.js');
var NewSearchPanel = require('./NewSearchPanel.js');
var ExportURL = require('./ExportURL.js');

var Dashboard = React.createClass({
  render: function() {
    return (
      <Settings/>
      <NewSearchPanel/>
      <ExportURL/>
    );
  }
});

module.exports = Dashboard;