/**
 * GraphPanel.js
 *
 * @author Andrew Bowler, Alberto Gomez-Estrada
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Graph = require('./Graph.js');
var LoadingBar = require('./LoadingBar.js');
var Styles = require('./Styles.js');

var GraphPanel = React.createClass({
  /**
   * Calculates the loading bar progress based 
   * on number of chunks of graph data processed.
   */
  calculateLoadingBarProgress: function() {
    if (this.props.totalChunks) {
      var maxWidth = 496;
      var minWidth = 20;
      var widthFactor = parseInt(this.props.currentChunk) / parseInt(this.props.totalChunks);
      var width = Math.max(minWidth, maxWidth * widthFactor);
      var text = Math.round(widthFactor * 100) + '%';
      var result = {
        width: width,
        text: text
      };
      return result;
    } else {
      var result = {
        width: 0,
        text: '0%'
      };
      return result;
    }
  },

  render: function() {
    var progress = this.calculateLoadingBarProgress();
    var percentageText = progress.text;
    var barWidth = progress.width;
    var barStyle = Styles.barStyle;
    barStyle.width = barWidth;
    return (
      <div>
        <Graph 
          filter={this.props.filter}
          graphData={this.props.graphData} 
          logger={this.props.logger} 
          updateSelectedNode={this.props.updateSelectedNode}
        />
        <LoadingBar
          barStyle={barStyle}
          percentageText={percentageText}
        />
      </div>
    );
  }
});

module.exports = GraphPanel;
