/**
 * Settings.js
 *
 * @author Andrew Bowler
 */

'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Button = ReactBootstrap.Button,
    Modal = ReactBootstrap.Modal;
var GraphLoader = require('./GraphLoader.js');
var SubgraphPanel = require('./SubgraphPanel.js');
var FilterPanel = require('./FilterPanel.js');

var Settings = React.createClass({
  getInitialState: function() {
    return {
      show: false
    };
  },

  render: function() {
    let close = () => this.setState({ show: false});

    return (
      <div className='modal-container'>
        <Button 
          bsStyle='success'
          onClick={() => this.setState({ show: true})}
          >Settings
        </Button>
        <Modal
          show={this.state.show}
          container={this}
          aria-labelledby='settings-title'
        >
          <Modal.Header>
            <Modal.Title id='settings-title'>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>One fine ass body...</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='primary' onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = Settings;
