var React = require('react');
var Vis = require('vis');

var GraphPanel = React.createClass({
  getDefaultProps: function() {
    return {
      options: {
        edges: {
          arrows: {
            to: {
              scaleFactor: 0.5
            }
          }
        },
        height: '100%',
        interaction: {
          dragNodes: false
        },
        width: '100%'
      }
    };
  },

  render: function() {
    var renderedComponent;
    if (this.props.panelMessage) {    
      renderedComponent = (
        <div>
          {this.props.panelMessage}
        </div>
      );
    } else {
      console.log('We got a graph!');
      console.log(this.props.graphData);
      renderedComponent = <div></div>
      var network = new Vis.Network(document.getElementById('graph'), this.props.graphData, this.props.options);      
    }

    return renderedComponent;
  }
});

module.exports = GraphPanel;
