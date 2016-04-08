/**
 * ExportURL.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    Button = ReactBootstrap.Button;
var Settings = require('./Settings.js');

var ExportURL = React.createClass({
  
  copyToClipboard: function() {
  	alert("Function worked!");
  },

  render: function() {
    return (
      <Button id='URLButton' bsStyle='primary' onClick={this.copyToClipboard}>Export URL</Button>
    );
  }

});

module.exports = ExportURL;