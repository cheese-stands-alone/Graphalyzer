/**
 * Settings.js
 *
 * @author Andrew Bowler, Taylor Welter
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

var Settings = React.createClass({
  getInitialState: function() {
	  
	  
	  	  
	  var selectedGraphVal = null;
	  var renderInitialVal = false;
      if(this.getParameterByName('selectedGraph') != null){
		  selectedGraphVal = this.getParameterByName('selectedGraph');
		  renderInitialVal = true;
	  }
	  
	  var filterVal = {
        property: null,
        option: null,
        value: null
      };
      if(this.getParameterByName('filter') != null){
		  filterVal = JSON.parse(this.getParameterByName('filter'));
	  }
	  
	  var subgraphVal = false;
      if(this.getParameterByName('subgraph') != null){
		  subgraphVal = JSON.parse(this.getParameterByName('subgraph'));
	  }
	  
	  this.renderInitial = renderInitialVal;
    return {
      filter: filterVal,
      selectedGraph: selectedGraphVal,
      subgraph: subgraphVal,
      show: false
    };
  },
  
  getParameterByName: function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  
  close: function() {
    this.setState({
      show: false
    });
  },

  draw: function() {
    var self = this;
    var graph;
    this.close();
    if (this.state.selectedGraph) {
      graph = {
        filter: self.state.filter,
        selectedGraph: self.state.selectedGraph
      };
      
      if (this.state.subgraph) {
        if (this.state.subgraph.depth > 0){
          graph.subgraph = this.state.subgraph;
		}
      }
      this.props.requestGraph(graph);
    }
  },

  selectGraph: function(graph) {
    this.setState({
      selectedGraph: graph
    });
  },

  updateFilter: function(filter) {
    this.setState({
      filter: filter
    });
  },

  updateSubgraph: function(subgraph) {
    this.setState({
      subgraph: subgraph
    });
  },

  render: function() {
  
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
