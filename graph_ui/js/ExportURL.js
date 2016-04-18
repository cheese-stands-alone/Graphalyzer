/**
 * ExportURL.js
 *
 * @author Andrew Bowler, Alberto Gomez-Estrada
 */

'use strict';

  /**
   * Creates the URL for linking to a specific instance
   * of Graphalyzer. The URL to Graphalyzer can be changed
   * by solely editing the value of the var GraphalyzerAddress.
   * The var currentState is a hashmap containing the paramaters to be 
   * exported in the form key = input name e.g. "selectedGraph" and 
   * value = the parameter's value. 
   */

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    Button = ReactBootstrap.Button;
var Settings = require('./Settings.js');
var GraphalyzerAddress = "http://graphalyzer.wk-dev.wdesk.org/";
var currentState = {};

var ExportURL = React.createClass({

  /**
   * Stores the current state of the graph panel
   * within this scope. Function is called within
   * ExportURL.js and can be modified to handle
   * any value by adding a line in the format of 
   * the present ones.  
   */

  setCurrentValues: function() {
  	var temp = this.props.getCurrentState();

  	currentState["selectedGraph"] = JSON.stringify(temp.currentGraph).replace(/"([^"]+(?="))"/g, '$1');
  	currentState["filter"] = JSON.stringify(temp.filter);
  	currentState["subgraph"] = JSON.stringify(temp.subgraph);
  },

  /**
   * Parses the URL with Regex expressions that remove
   * trailing '&'s and '&='s. This function can be modified
   * to add any value as an input by adding an entry to the 
   * currentState[] hashmap in the form of key = input name and
   * value = input value. If the panel is blank, just retuns
   * URL to Graphalyzer.
   */

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

  /**
   * Creates a dummy element to facilitate
   * selecting text, then copies that text to the clipboard.
   * After copying, deletes dummy element.
   */
  
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