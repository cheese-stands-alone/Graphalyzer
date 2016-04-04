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
  close: function() {
    this.setState({
      show: false
    });
  },

  draw: function() {
    this.close();
    if (this.state.selectedGraph)
      this.props.requestGraph(this.state.selectedGraph, this.state.filter);
  },

  getInitialState: function() {
    return {
      filter: {
        property: null,
        option: null,
        value: null
      },
      selectedGraph: null,
      show: false
    };
  },

  updateFilter: function(filter) {
    this.setState({
      filter: filter
    });
  },

  render: function() {
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
              <SubgraphInput/>
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

  selectGraph: function(graph) {
    this.setState({
      selectedGraph: graph
    });
  },
});

module.exports = Settings;
