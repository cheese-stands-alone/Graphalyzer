/**
 * GraphPanel.js
 *
 * @author Andrew Bowler, Alberto Gomez-Estrada
 */

'use strict';

var React = require('react');
var Graph = require('./Graph.js');
var Styles = require('./Styles.js');

var GraphPanel = React.createClass({
  render: function() {
    return (
      <div>
        <Graph 
          filter={this.props.filter}
          graphData={this.props.graphData} 
          logger={this.props.logger} 
          updateSelectedNode={this.props.updateSelectedNode}
        />
        <div id='loadingBar' style={Styles.loadingBarStyle}>
          <div className='outerBorder' style={Styles.outerBorderStyle}>
            <div id='text' style={Styles.textStyle}>0%</div>
            <div id='border' style={Styles.borderStyle}>
                <div id='bar' style={Styles.barStyle} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GraphPanel;
