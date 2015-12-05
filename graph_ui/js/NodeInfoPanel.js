var React = require('react');

var NodeInfoPanel = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.selectedNode != nextProps.selectedNode;
  },

  render: function() {
    var component = [];
    for (var nodeProp in this.props.selectedNode) {
      component.push(<p>{nodeProp} {this.props.selectedNode[nodeProp]}</p>)
    }

    return (
      <div>
        {component}
      </div>
    );
  }
});

module.exports = NodeInfoPanel;
