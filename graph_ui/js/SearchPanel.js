var React = require('react');
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Input = require('react-bootstrap').Input;

var SearchPanel = React.createClass({
  render: function() {
    return (
      <ListGroup>
        <ListGroupItem>
          <Input type='text' label='Graph Name' />
        </ListGroupItem>
        <ListGroupItem>
          <Input type='text' label='Node Name' />
        </ListGroupItem>
        <ListGroupItem>
          <Input type='text' label='Degrees' />
        </ListGroupItem>
      </ListGroup>
    );
  }
});

module.exports = SearchPanel;
