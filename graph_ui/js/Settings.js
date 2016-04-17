/**
 * Settings.js
 *
 * Modal for users to set Graphalyzer parameters, including selecting 
 * graphs, subgraph and filter parameters
 * 
 * @author Andrew Bowler, Alberto Gomez-Estrada, Michael Sgroi, Taylor Welter
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Button = ReactBootstrap.Button,
    Modal = ReactBootstrap.Modal,
    Panel = ReactBootstrap.Panel;
var GraphLoader = require('./GraphLoader.js');
var SubgraphInput = require('./SubgraphInput.js');
var FilterPanel = require('./FilterPanel.js');

 /**
   * Sets initial values, parsing them from the url if existent
   */
var Settings = React.createClass({
  getInitialState: function() {
	  
	  //Sets selectedGraphVal to default and parses url to check for value to use if deep linked
	  var selectedGraphVal = null;
	  var renderInitialVal = false;
      if(this.getParameterByName('selectedGraph') != null){
		  selectedGraphVal = this.getParameterByName('selectedGraph');
		  renderInitialVal = true;
	  }
	  
	  //Sets filterVal to default and parses url to check for value to use if deep linked
	  var filterVal = {
        property: null,
        option: null,
        value: null
      };
      if(this.getParameterByName('filter') != null){
		  filterVal = JSON.parse(this.getParameterByName('filter'));
	  }
	  
	  //Sets subgraphVal to default and parses url to check for value to use if deep linked
	  var subgraphVal = false;
      if(this.getParameterByName('subgraph') != null){
		  subgraphVal = JSON.parse(this.getParameterByName('subgraph'));
	  }
	  
	  //If a graph was given in the url, we need to render the graph so we save the boolean true to load it in render later
	  this.renderInitial = renderInitialVal;
    return {
      filter: filterVal,
      selectedGraph: selectedGraphVal,
      subgraph: subgraphVal,
      show: false
    };
  },
  
  /**
   * Parses url using regex to find the given variable name
   * Returns null for no variable, empty string for no value, or the parsed value if existent
   */
  getParameterByName: function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  
  /**
   * Closes the modal when clicking the close button
   */
  close: function() {
    this.setState({
      show: false
    });
  },

  /**
   * Sets app's state before requesting a graph from the server
   */
  draw: function() {
    var self = this;
    var graph;
    this.close();

    if (this.state.selectedGraph) {
      graph = {
        filter: self.state.filter,
        selectedGraph: self.state.selectedGraph
      };

      if (this.state.subgraph && !this.state.disabled) {
        if (this.state.subgraph.depth > 0){
          graph.subgraph = this.state.subgraph;
		}
      }
      this.props.requestGraph(graph);
    }
  },

  /**
   * Sets the currently selected graph
   */
  selectGraph: function(graph, disabled) {
    this.setState({
      selectedGraph: graph,
      disabled: disabled
    });
  },

  /**
   * Updates filter state - for other components
   */
  updateFilter: function(filter) {
    this.setState({
      filter: filter
    });
  },

  /**
   * Updates subgraph state - for other components
   */
  updateSubgraph: function(subgraph, disabled) {
    this.setState({
      subgraph: subgraph
    });
  },

  render: function() {
	//Checks to see if this is the first time loading the page and if so, calls draw for initial graph state parameters
    if(this.renderInitial){
      this.renderInitial = false;
      this.draw();
    }
  
    return (
      <div className='modal-container'>
        <Button 
          bsStyle='primary'
          onClick={() => this.setState({show: true})}
        >Settings
        </Button>
        <Modal
          show={this.state.show}
          container={this}
          aria-labelledby='settings-title'>
          <Modal.Header id='settings-modal-header'>
            <Modal.Title id='settings-title'>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Panel header='Load Graph' bsStyle='primary'>
              <GraphLoader
                getGraphList={this.props.getGraphList}
                graphList={this.props.graphList}
                selectGraph={this.selectGraph}
              />
              <SubgraphInput
                updateSubgraph={this.updateSubgraph}
              />
            </Panel>
            <Panel header='Filter Graph' bsStyle='primary'>
              <FilterPanel
                clearFilter={this.props.clearFilter}
                updateFilter={this.updateFilter}
              />
            </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle='primary' onClick={this.draw}>Draw</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

module.exports = Settings;
