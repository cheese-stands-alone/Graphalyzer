/**
 * ExportURL.js
 *
 * @author Andrew Bowler, Alberto Gomez-Estrada
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    Button = ReactBootstrap.Button;
var Settings = require('./Settings.js');
var GraphalyzerAddress = "http://graphalyzer.wk-dev.wdesk.org/";
var currentState = {};

var ExportURL = React.createClass({

  setCurrentValues: function() {
  	var temp = this.props.getCurrentState();

  	currentState["selectedGraph"] = JSON.stringify(temp.currentGraph).replace(/"([^"]+(?="))"/g, '$1');
  	currentState["filter"] = JSON.stringify(temp.filter);
  	currentState["subgraph"] = JSON.stringify(temp.subgraph);
  },

  createURL: function() {
  	if(currentState["selectedGraph"] == "null") {
  		return encodeURI(GraphalyzerAddress);
  	} else{
	  	var URL = GraphalyzerAddress + "?";

	  	for(var i in currentState){
	  		if(currentState[i] != undefined) {
	  			URL += i + "=" + currentState[i] + "&";
	  		}
	  	}

	  	URL = URL.replace(/[^=&]+=(&|$)/g,"").replace(/&$/,"");
	  	return encodeURI(URL);
  	}
  },
  
  copyToClipboard: function() {
  	this.setCurrentValues();

  	var placeholder = document.createElement("input");
  	
  	document.body.appendChild(placeholder);
  	placeholder.setAttribute("id", "placeholder");
  	document.getElementById("placeholder").value=this.createURL(); 
  	placeholder.select();
  	document.execCommand("copy");
  	document.body.removeChild(placeholder);
  },

  render: function() {
    return (
      <Button id='URLButton' bsStyle='primary' onClick={this.copyToClipboard}>Export URL</Button>
    );
  }

});

module.exports = ExportURL;