/**
 * Settings.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var GraphLoader = require('./GraphLoader.js');
var SubgraphPanel = require('./SubgraphPanel.js');
var FilterPanel = require('./FilterPanel.js');

var Settings = React.createClass({
  render: function() {
    return (
      <GraphLoader/>
      <SubgraphPanel/>
      <FilterPanel/>
    );
  }
});